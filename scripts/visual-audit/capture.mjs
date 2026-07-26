#!/usr/bin/env node

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const DEFAULT_MANIFEST = "design-system/audits/visual-comparisons/targets.json";
const DEFAULT_CHROME_BIN = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

function parseArgs(argv) {
  const args = {
    manifest: DEFAULT_MANIFEST,
    runId: new Date().toISOString().replace(/[-:]/g, "").replace(/\..+/, "Z"),
    outDir: null,
    repoRoot: process.cwd(),
    beforeUrl: null,
    afterUrl: null,
    chromeBin: process.env.CHROME_BIN || DEFAULT_CHROME_BIN,
    skipCapture: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--manifest") args.manifest = argv[++index];
    else if (arg === "--run-id") args.runId = argv[++index];
    else if (arg === "--out-dir") args.outDir = argv[++index];
    else if (arg === "--repo-root") args.repoRoot = argv[++index];
    else if (arg === "--before-url") args.beforeUrl = argv[++index];
    else if (arg === "--after-url") args.afterUrl = argv[++index];
    else if (arg === "--chrome-bin") args.chromeBin = argv[++index];
    else if (arg === "--skip-capture") args.skipCapture = true;
    else throw new Error(`Unknown argument: ${arg}`);
  }

  return args;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function toFileUrl(filePath, fromDir) {
  const relative = path.relative(fromDir, filePath).split(path.sep).join("/");
  return relative.startsWith(".") ? relative : `./${relative}`;
}

function joinUrl(baseUrl, route) {
  const base = new URL(baseUrl);
  return new URL(route, base).toString();
}

function screenshotName(target, source) {
  const width = target.viewport?.width ?? 1440;
  const height = target.viewport?.height ?? 1100;
  return `${target.id}-${source}-${width}x${height}.png`;
}

function jsString(value) {
  return JSON.stringify(String(value));
}

export async function runActions(page, actions = []) {
  for (const action of actions) {
    if (action.type === "clickText") {
      const result = await page.send("Runtime.evaluate", {
        expression: `(() => {
          const text = ${jsString(action.text)};
          const candidates = Array.from(document.querySelectorAll("button, a, [role='button']"));
          const element = candidates.find((candidate) => candidate.textContent.trim() === text);
          if (!element) return { ok: false, message: "No clickable element with text: " + text };
          element.click();
          return { ok: true };
        })()`,
        returnByValue: true,
      });
      const value = result.result?.value;
      if (!value?.ok) {
        throw new Error(value?.message ?? `clickText failed: ${action.text}`);
      }
      await wait(action.afterMs ?? 250);
      continue;
    }

    if (action.type === "waitForSelector") {
      const result = await withTimeout(
        page.send("Runtime.evaluate", {
          expression: `new Promise((resolve) => {
            const selector = ${jsString(action.selector)};
            if (document.querySelector(selector)) {
              resolve({ ok: true });
              return;
            }
            const observer = new MutationObserver(() => {
              if (document.querySelector(selector)) {
                observer.disconnect();
                resolve({ ok: true });
              }
            });
            observer.observe(document.documentElement, { childList: true, subtree: true });
            setTimeout(() => {
              observer.disconnect();
              resolve({ ok: false, message: "Selector not found: " + selector });
            }, ${Number(action.timeoutMs ?? 5000)});
          })`,
          awaitPromise: true,
          returnByValue: true,
        }),
        Number(action.timeoutMs ?? 5000) + 1000,
        `waitForSelector ${action.selector}`,
      );
      const value = result.result?.value;
      if (!value?.ok) {
        throw new Error(value?.message ?? `waitForSelector failed: ${action.selector}`);
      }
      continue;
    }

    if (action.type === "waitForText") {
      const result = await withTimeout(
        page.send("Runtime.evaluate", {
          expression: `new Promise((resolve) => {
            const selector = ${action.selector ? jsString(action.selector) : "null"};
            const text = ${jsString(action.text)};
            const includesText = () => {
              const root = selector ? document.querySelector(selector) : document.body;
              return Boolean(root?.textContent?.includes(text));
            };
            if (includesText()) {
              resolve({ ok: true });
              return;
            }
            const observer = new MutationObserver(() => {
              if (includesText()) {
                observer.disconnect();
                resolve({ ok: true });
              }
            });
            observer.observe(document.documentElement, { childList: true, subtree: true, characterData: true });
            setTimeout(() => {
              observer.disconnect();
              resolve({ ok: false, message: "Text not found: " + text });
            }, ${Number(action.timeoutMs ?? 5000)});
          })`,
          awaitPromise: true,
          returnByValue: true,
        }),
        Number(action.timeoutMs ?? 5000) + 1000,
        `waitForText ${action.text}`,
      );
      const value = result.result?.value;
      if (!value?.ok) {
        throw new Error(value?.message ?? `waitForText failed: ${action.text}`);
      }
      continue;
    }

    throw new Error(`Unknown visual audit action: ${action.type}`);
  }
}

export async function freezeVisualState(page) {
  await page.send("Runtime.evaluate", {
    expression: `(() => {
      if (document.querySelector("[data-visual-audit-freeze]")) return;
      const style = document.createElement("style");
      style.setAttribute("data-visual-audit-freeze", "true");
      style.textContent = \`
        *,
        *::before,
        *::after {
          animation: none !important;
          transition: none !important;
          caret-color: transparent !important;
        }

        nextjs-portal,
        [data-nextjs-dialog-overlay],
        [data-nextjs-toast],
        [data-nextjs-dev-tools-button],
        [data-nextjs-dev-tools-panel] {
          display: none !important;
        }
      \`;
      document.head.append(style);
    })()`,
  });
}

export async function resolveClip(page, { selector, margin = 0, viewport }) {
  if (!selector) return null;

  const result = await page.send("Runtime.evaluate", {
    expression: `(() => {
      const selector = ${jsString(selector)};
      const element = document.querySelector(selector);
      if (!element) return null;
      const rect = element.getBoundingClientRect();
      return {
        x: rect.x + window.scrollX,
        y: rect.y + window.scrollY,
        width: rect.width,
        height: rect.height,
        viewportX: window.scrollX,
        viewportY: window.scrollY
      };
    })()`,
    returnByValue: true,
  });

  const rect = result.result?.value;
  if (!rect) {
    throw new Error(`clipSelector not found: ${selector}`);
  }

  const safeMargin = Math.max(0, Number(margin) || 0);
  const viewportWidth = viewport?.width ?? 1440;
  const viewportHeight = viewport?.height ?? 1100;
  const viewportX = Number(rect.viewportX) || 0;
  const viewportY = Number(rect.viewportY) || 0;
  const x = Math.max(viewportX, Math.floor(rect.x - safeMargin));
  const y = Math.max(viewportY, Math.floor(rect.y - safeMargin));
  const right = Math.min(
    viewportX + viewportWidth,
    Math.ceil(rect.x + rect.width + safeMargin),
  );
  const bottom = Math.min(
    viewportY + viewportHeight,
    Math.ceil(rect.y + rect.height + safeMargin),
  );

  return {
    x,
    y,
    width: Math.max(1, right - x),
    height: Math.max(1, bottom - y),
    scale: 1,
  };
}

async function assertReachable(url) {
  let response;
  try {
    response = await fetch(url, { redirect: "follow" });
  } catch (error) {
    throw new Error(`Cannot reach ${url}: ${error.message}`);
  }

  if (!response.ok) {
    throw new Error(`Cannot capture ${url}: HTTP ${response.status}`);
  }
}

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function withTimeout(promise, ms, label) {
  let timeout;
  const timer = new Promise((_, reject) => {
    timeout = setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms);
  });
  return Promise.race([promise, timer]).finally(() => clearTimeout(timeout));
}

class CdpClient {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.nextId = 1;
    this.pending = new Map();
    this.waiters = new Map();
    this.opened = new Promise((resolve, reject) => {
      this.ws.addEventListener("open", resolve, { once: true });
      this.ws.addEventListener("error", reject, { once: true });
    });
    this.ws.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      if (message.id && this.pending.has(message.id)) {
        const { resolve, reject } = this.pending.get(message.id);
        this.pending.delete(message.id);
        if (message.error) reject(new Error(message.error.message));
        else resolve(message.result ?? {});
        return;
      }

      const waiters = this.waiters.get(message.method);
      if (!waiters) return;
      for (const waiter of waiters.splice(0)) {
        waiter.resolve(message.params ?? {});
      }
    });
  }

  async send(method, params = {}) {
    await this.opened;
    const id = this.nextId;
    this.nextId += 1;
    this.ws.send(JSON.stringify({ id, method, params }));
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
    });
  }

  waitForEvent(method, timeoutMs) {
    const promise = new Promise((resolve) => {
      if (!this.waiters.has(method)) this.waiters.set(method, []);
      this.waiters.get(method).push({ resolve });
    });
    return withTimeout(promise, timeoutMs, method);
  }

  async close(timeoutMs = 1000) {
    if (this.ws.readyState === 3) return;

    const closed = new Promise((resolve) => {
      this.ws.addEventListener("close", resolve, { once: true });
      this.ws.addEventListener("error", resolve, { once: true });
    });

    if (this.ws.readyState < 2) {
      this.ws.close();
    }

    await Promise.race([closed, wait(timeoutMs)]);
  }
}

function parseBrowserEndpoint(line) {
  const match = line.match(/DevTools listening on (ws:\/\/[^\s]+)/);
  return match?.[1] ?? null;
}

async function launchChrome({ chromeBin, userDataDir }) {
  const chrome = spawn(
    chromeBin,
    [
      "--headless",
      "--disable-gpu",
      "--disable-background-networking",
      "--disable-extensions",
      "--disable-dev-shm-usage",
      "--no-default-browser-check",
      "--no-first-run",
      "--remote-debugging-port=0",
      `--user-data-dir=${userDataDir}`,
      "about:blank",
    ],
    { stdio: ["ignore", "pipe", "pipe"] },
  );

  const endpoint = await withTimeout(
    new Promise((resolve, reject) => {
      let stderr = "";
      chrome.stderr.on("data", (chunk) => {
        stderr += chunk.toString();
        const parsed = parseBrowserEndpoint(stderr);
        if (parsed) resolve(parsed);
      });
      chrome.once("error", reject);
      chrome.once("exit", (code) => {
        if (code !== 0) reject(new Error(`Chrome exited before DevTools started: ${code}`));
      });
    }),
    15000,
    "Chrome launch",
  );

  return { chrome, endpoint };
}

function waitForProcessExit(child, timeoutMs = 5000) {
  if (!child || child.exitCode !== null) return Promise.resolve();

  return withTimeout(
    new Promise((resolve) => {
      child.once("exit", resolve);
    }),
    timeoutMs,
    "Chrome shutdown",
  );
}

async function requestBrowserClose(browser, timeoutMs = 1000) {
  if (!browser) return;

  try {
    await withTimeout(browser.send("Browser.close"), timeoutMs, "Browser.close");
  } catch {
    // Chrome may close the websocket before acknowledging Browser.close.
  }

  await browser.close(timeoutMs);
}

export async function terminateChromeProcess(
  child,
  { gracefulTimeoutMs = 2000, forceTimeoutMs = 1000 } = {},
) {
  if (!child || child.exitCode !== null) return;

  child.kill("SIGTERM");
  try {
    await waitForProcessExit(child, gracefulTimeoutMs);
    return;
  } catch {
    // Fall through to SIGKILL when Chrome ignores graceful shutdown.
  }

  if (child.exitCode === null) {
    child.kill("SIGKILL");
  }

  try {
    await waitForProcessExit(child, forceTimeoutMs);
  } catch {
    // The caller should still be able to finish writing audit artifacts.
  }
}

async function captureChrome({
  chromeBin,
  url,
  outputPath,
  viewport,
  actions,
  clipSelector,
  clipMargin,
}) {
  if (!fs.existsSync(chromeBin)) {
    throw new Error(`Chrome binary not found: ${chromeBin}`);
  }

  await assertReachable(url);
  ensureDir(path.dirname(outputPath));

  const width = viewport?.width ?? 1440;
  const height = viewport?.height ?? 1100;
  const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "visual-audit-chrome-"));
  let chrome;
  let browser;
  let page;

  try {
    const launched = await launchChrome({ chromeBin, userDataDir });
    chrome = launched.chrome;
    browser = new CdpClient(launched.endpoint);
    await browser.opened;

    const { targetId } = await browser.send("Target.createTarget", {
      url: "about:blank",
    });
    const pagesUrl = launched.endpoint.replace(/^ws:\/\//, "http://").replace(/\/devtools\/browser\/.+$/, "/json/list");
    const pages = await (await fetch(pagesUrl)).json();
    const pageInfo = pages.find((candidate) => candidate.id === targetId);
    if (!pageInfo?.webSocketDebuggerUrl) {
      throw new Error(`Could not resolve page DevTools endpoint for ${url}`);
    }

    page = new CdpClient(pageInfo.webSocketDebuggerUrl);
    await page.opened;
    await page.send("Page.enable");
    await page.send("Runtime.enable");
    await page.send("Emulation.setDeviceMetricsOverride", {
      width,
      height,
      deviceScaleFactor: 1,
      mobile: false,
    });

    const load = page.waitForEvent("Page.loadEventFired", 20000);
    await page.send("Page.navigate", { url });
    await load;
    await page.send("Runtime.evaluate", {
      expression: "document.fonts && document.fonts.ready ? document.fonts.ready.then(() => true) : true",
      awaitPromise: true,
    });
    await freezeVisualState(page);
    await wait(750);
    await runActions(page, actions);
    await wait(500);
    const clip = await resolveClip(page, {
      selector: clipSelector,
      margin: clipMargin,
      viewport: { width, height },
    });

    const screenshot = await page.send("Page.captureScreenshot", {
      format: "png",
      fromSurface: true,
      captureBeyondViewport: false,
      ...(clip ? { clip } : {}),
    });
    fs.writeFileSync(outputPath, Buffer.from(screenshot.data, "base64"));
    const size = fs.statSync(outputPath).size;
    if (size < 1024) {
      throw new Error(`Screenshot is unexpectedly small for ${url}: ${size} bytes`);
    }
  } finally {
    await page?.close();
    await requestBrowserClose(browser);
    await terminateChromeProcess(chrome);
    chrome?.stdout?.destroy();
    chrome?.stderr?.destroy();
    fs.rmSync(userDataDir, { recursive: true, force: true });
  }
}

function imageCell({ title, imagePath, boardDir, detail }) {
  if (imagePath && fs.existsSync(imagePath)) {
    return `
      <figure>
        <figcaption>${escapeHtml(title)}</figcaption>
        <img src="${toFileUrl(imagePath, boardDir)}" alt="${escapeHtml(title)} screenshot" />
      </figure>
    `;
  }

  return `
    <div class="missing">
      <strong>${escapeHtml(title)}</strong>
      <span>${escapeHtml(detail ?? "No screenshot captured for this source yet.")}</span>
    </div>
  `;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function isPreviewableFile(filePath) {
  return /\.(css|mjs|ts|tsx)$/.test(filePath) && !/\.test\./.test(filePath);
}

function resolvePreviewFiles(target) {
  const configured = target.codePreviewFiles;
  if (Array.isArray(configured) && configured.length > 0) {
    return configured;
  }

  return (target.relatedFiles ?? [])
    .filter(isPreviewableFile)
    .filter((filePath) => filePath.startsWith("src/"))
    .slice(0, 5);
}

function readCurrentFilePreview(repoRoot, filePath, maxChars = 28000) {
  const resolvedRoot = path.resolve(repoRoot);
  const absolutePath = path.resolve(resolvedRoot, filePath);
  const relativePath = path.relative(resolvedRoot, absolutePath);
  if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
    return {
      filePath,
      exists: false,
      content: "",
      message: "Skipped path outside repo root.",
    };
  }

  if (!fs.existsSync(absolutePath)) {
    return {
      filePath,
      exists: false,
      content: "",
      message: "File does not exist in the current worktree.",
    };
  }

  const content = fs.readFileSync(absolutePath, "utf8");
  const truncated = content.length > maxChars;
  return {
    filePath,
    exists: true,
    content: truncated ? `${content.slice(0, maxChars)}\n\n/* truncated by dossier preview */\n` : content,
    lineCount: content.split("\n").length,
    truncated,
  };
}

function readComponentMap(repoRoot) {
  const componentMapPath = path.resolve(repoRoot, "figma/component-map.json");
  if (!fs.existsSync(componentMapPath)) return {};
  return readJson(componentMapPath);
}

function componentMapMatches(componentMap, filePaths) {
  const filePathSet = new Set(filePaths ?? []);
  return Object.entries(componentMap)
    .filter(([, entry]) => filePathSet.has(entry.implementation))
    .map(([name, entry]) => ({ name, ...entry }));
}

function extractUtilityCandidates(previews) {
  const candidates = new Set();
  const utilityPattern =
    /(?:^|["'`\s])((?:[a-z-]+:)*(?:bg|text|border|shadow|rounded|gap|space|divide|p|px|py|pt|pr|pb|pl|m|mx|my|mt|mr|mb|ml|w|h|min-w|min-h|max-w|max-h|size|font|leading|tracking|grid-cols|col-span|row-span|ring|outline|opacity|blur|backdrop|duration|ease|transition|animate|fill|stroke|object|aspect|z)-[A-Za-z0-9_:/.[\]()%#,-]+)(?=["'`\s])/g;

  for (const preview of previews) {
    if (!preview.exists) continue;
    for (const match of preview.content.matchAll(utilityPattern)) {
      candidates.add(match[1]);
      if (candidates.size >= 80) return [...candidates];
    }
  }

  return [...candidates];
}

function listItems(items, emptyText = "None recorded.") {
  if (!items?.length) {
    return `<p class="empty-note">${escapeHtml(emptyText)}</p>`;
  }

  return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function buildDossierHtml({ target, repoRoot, componentMap }) {
  const previewFiles = resolvePreviewFiles(target);
  const previews = previewFiles.map((filePath) =>
    readCurrentFilePreview(repoRoot, filePath),
  );
  const componentMatches = componentMapMatches(componentMap, target.relatedFiles);
  const utilityCandidates = target.tokens?.length
    ? target.tokens
    : extractUtilityCandidates(previews);

  const codeBlocks = previews
    .map((preview) => {
      const meta = preview.exists
        ? `${preview.lineCount} lines${preview.truncated ? ", truncated" : ""}`
        : preview.message;
      return `
        <details class="code-detail">
          <summary>${escapeHtml(preview.filePath)} <span>${escapeHtml(meta)}</span></summary>
          ${
            preview.exists
              ? `<pre><code>${escapeHtml(preview.content)}</code></pre>`
              : `<p class="empty-note">${escapeHtml(preview.message)}</p>`
          }
        </details>
      `;
    })
    .join("");

  const componentRows = componentMatches
    .map(
      (entry) => `
        <tr>
          <th>${escapeHtml(entry.name)}</th>
          <td>${escapeHtml(entry.implementation)}</td>
          <td>${escapeHtml(entry.documentation)}</td>
        </tr>
      `,
    )
    .join("");

  return `
    <section class="dossier">
      <h3>Implementation dossier</h3>
      <div class="dossier-grid">
        <div>
          <h4>Figma source</h4>
          <dl>
            <div><dt>File</dt><dd>${escapeHtml(target.figmaFileKey ?? "manifest default")}</dd></div>
            <div><dt>Node</dt><dd>${escapeHtml(target.figma?.nodeId ?? "not mapped")}</dd></div>
            <div><dt>Name</dt><dd>${escapeHtml(target.figma?.name ?? "not mapped")}</dd></div>
          </dl>
        </div>
        <div>
          <h4>Code result</h4>
          <dl>
            <div><dt>Route</dt><dd>${escapeHtml(target.route)}</dd></div>
            <div><dt>Clip</dt><dd>${escapeHtml(target.clipSelector ?? "full viewport")}</dd></div>
            <div><dt>Viewport</dt><dd>${escapeHtml(`${target.viewport?.width ?? 1440}x${target.viewport?.height ?? 1100}`)}</dd></div>
          </dl>
        </div>
      </div>
      <div class="dossier-grid">
        <div>
          <h4>Component-map matches</h4>
          ${
            componentRows
              ? `<table><tbody>${componentRows}</tbody></table>`
              : `<p class="empty-note">No related files map directly to figma/component-map.json entries.</p>`
          }
        </div>
        <div>
          <h4>Observed tokens / utilities</h4>
          ${listItems(utilityCandidates, "No token or utility candidates extracted from preview files.")}
        </div>
      </div>
      <div>
        <h4>Related files</h4>
        ${listItems(target.relatedFiles, "No related files recorded.")}
      </div>
      <div>
        <h4>Current code preview</h4>
        ${codeBlocks || `<p class="empty-note">No previewable implementation files recorded for this target.</p>`}
      </div>
    </section>
  `;
}

function buildReviewHtml({ manifest, targets, output, runId, repoRoot }) {
  const boardDir = output.root;
  const componentMap = readComponentMap(repoRoot);
  const rows = targets
    .map((target) => {
      const beforePath = path.join(output.before, screenshotName(target, "before"));
      const afterPath = path.join(output.after, screenshotName(target, "after"));
      const figmaPath = target.figma?.localPath
        ? path.resolve(output.root, target.figma.localPath)
        : path.join(output.figma, `${target.id}-figma.png`);

      return `
        <section class="target">
          <header>
            <div>
              <p class="eyebrow">${escapeHtml(target.id)}</p>
              <h2>${escapeHtml(target.label)}</h2>
              <p class="route">${escapeHtml(target.route)}</p>
            </div>
            <div class="meta">
              <span>${escapeHtml(`${target.viewport?.width ?? 1440}x${target.viewport?.height ?? 1100}`)}</span>
              <a href="${escapeHtml(target.figma?.url ?? "#")}">Figma source</a>
            </div>
          </header>
          <div class="grid">
            ${imageCell({
              title: "1. Figma",
              imagePath: figmaPath,
              boardDir,
              detail: target.figma?.url ?? "No Figma source mapped.",
            })}
            ${imageCell({
              title: "2. Baseline code",
              imagePath: beforePath,
              boardDir,
              detail: target.baselineUnavailableReason,
            })}
            ${imageCell({ title: "3. Current code", imagePath: afterPath, boardDir })}
          </div>
          <details>
            <summary>Trace files</summary>
            <ul>
              ${(target.relatedFiles ?? []).map((file) => `<li>${escapeHtml(file)}</li>`).join("")}
            </ul>
            ${target.notes ? `<p>${escapeHtml(target.notes)}</p>` : ""}
          </details>
          ${buildDossierHtml({ target: { ...target, figmaFileKey: manifest.figmaFileKey }, repoRoot, componentMap })}
        </section>
      `;
    })
    .join("\n");
  const hasBaselineTarget = targets.some((target) => !target.baselineUnavailableReason);
  const reviewSummary = hasBaselineTarget
    ? `Three-source review: Figma reference, baseline code, and current branch code. Baseline: ${escapeHtml(manifest.baseline?.commit ?? "not recorded")}.`
    : `Two-source review: Figma reference and current branch code. Baseline unavailable for every target in this run. Recorded baseline: ${escapeHtml(manifest.baseline?.commit ?? "not recorded")}.`;

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Visual Comparison ${escapeHtml(runId)}</title>
    <style>
      :root {
        color: #181d27;
        background: #f8f9fb;
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }

      body {
        margin: 0;
      }

      main {
        max-width: 1880px;
        margin: 0 auto;
        padding: 32px;
      }

      .intro {
        margin-bottom: 32px;
        color: #535862;
      }

      .intro h1,
      .target h2 {
        color: #181d27;
      }

      .target {
        margin-bottom: 56px;
        padding: 24px;
        border: 1px solid #d5d7da;
        border-radius: 12px;
        background: #fff;
      }

      .target header {
        display: flex;
        gap: 24px;
        align-items: start;
        justify-content: space-between;
        margin-bottom: 20px;
      }

      .eyebrow,
      .route,
      .meta,
      figcaption,
      details {
        color: #717680;
      }

      .eyebrow {
        margin: 0 0 4px;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      h1,
      h2,
      .route {
        margin: 0;
      }

      .route {
        margin-top: 6px;
      }

      .meta {
        display: grid;
        gap: 6px;
        justify-items: end;
        font-size: 14px;
      }

      .grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 24px;
        align-items: start;
      }

      figure {
        margin: 0;
      }

      figcaption {
        margin-bottom: 8px;
        font-size: 14px;
        font-weight: 700;
      }

      img {
        display: block;
        width: 100%;
        max-height: 960px;
        object-fit: contain;
        object-position: top left;
        border: 1px solid #e9eaeb;
        border-radius: 8px;
        background: #fff;
      }

      .missing {
        min-height: 240px;
        display: grid;
        place-content: center;
        gap: 8px;
        padding: 24px;
        border: 1px dashed #d5d7da;
        border-radius: 8px;
        color: #717680;
        text-align: center;
      }

      details {
        margin-top: 16px;
      }

      .dossier {
        margin-top: 24px;
        padding-top: 20px;
        border-top: 1px solid #e9eaeb;
      }

      .dossier h3,
      .dossier h4 {
        margin: 0 0 10px;
        color: #181d27;
      }

      .dossier h3 {
        font-size: 18px;
      }

      .dossier h4 {
        font-size: 14px;
      }

      .dossier-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 20px;
        margin-bottom: 20px;
      }

      dl {
        display: grid;
        gap: 8px;
        margin: 0;
      }

      dl div {
        display: grid;
        grid-template-columns: 72px minmax(0, 1fr);
        gap: 12px;
      }

      dt {
        color: #717680;
        font-size: 12px;
        font-weight: 700;
        text-transform: uppercase;
      }

      dd {
        margin: 0;
        color: #414651;
        overflow-wrap: anywhere;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        font-size: 12px;
      }

      th,
      td {
        padding: 8px;
        border: 1px solid #e9eaeb;
        text-align: left;
        vertical-align: top;
      }

      th {
        width: 140px;
        color: #181d27;
      }

      .dossier ul {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin: 0;
        padding: 0;
        list-style: none;
      }

      .dossier li {
        border: 1px solid #e9eaeb;
        border-radius: 999px;
        padding: 4px 8px;
        color: #535862;
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-size: 12px;
      }

      .empty-note {
        margin: 0;
        color: #717680;
        font-size: 13px;
      }

      .code-detail summary {
        cursor: pointer;
        color: #414651;
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-size: 13px;
      }

      .code-detail summary span {
        color: #717680;
      }

      pre {
        max-height: 760px;
        overflow: auto;
        padding: 16px;
        border: 1px solid #e9eaeb;
        border-radius: 8px;
        background: #0a0d12;
        color: #f5f5f5;
        font-size: 12px;
        line-height: 1.5;
      }

      @media (max-width: 1100px) {
        main {
          padding: 20px;
        }

        .grid {
          grid-template-columns: 1fr;
        }

        .target header {
          display: grid;
        }

        .dossier-grid {
          grid-template-columns: 1fr;
        }

        .meta {
          justify-items: start;
        }
      }
    </style>
  </head>
  <body>
    <main>
      <section class="intro">
        <h1>Visual Comparison ${escapeHtml(runId)}</h1>
        <p>${reviewSummary}</p>
      </section>
      ${rows}
    </main>
  </body>
</html>`;
}

function resolveOutput(args) {
  const root = path.resolve(
    args.outDir ??
      path.join("design-system/audits/.generated/visual-comparisons", args.runId),
  );
  return {
    root,
    figma: path.join(root, "figma"),
    before: path.join(root, "before"),
    after: path.join(root, "after"),
  };
}

export async function createReviewBoard({ manifest, args }) {
  const output = resolveOutput(args);
  const repoRoot = path.resolve(args.repoRoot ?? process.cwd());
  ensureDir(output.figma);
  ensureDir(output.before);
  ensureDir(output.after);

  if (!args.skipCapture) {
    if (!args.beforeUrl || !args.afterUrl) {
      throw new Error("--before-url and --after-url are required unless --skip-capture is set.");
    }

    for (const target of manifest.targets) {
      if (!target.baselineUnavailableReason) {
        await captureChrome({
          chromeBin: args.chromeBin,
          url: joinUrl(args.beforeUrl, target.route),
          outputPath: path.join(output.before, screenshotName(target, "before")),
          viewport: target.viewport,
          actions: target.actions,
          clipSelector: target.clipSelector,
          clipMargin: target.clipMargin,
        });
      }
      await captureChrome({
        chromeBin: args.chromeBin,
        url: joinUrl(args.afterUrl, target.route),
        outputPath: path.join(output.after, screenshotName(target, "after")),
        viewport: target.viewport,
        actions: target.actions,
        clipSelector: target.clipSelector,
        clipMargin: target.clipMargin,
      });
    }
  }

  const resolvedManifest = {
    ...manifest,
    runId: args.runId,
    beforeUrl: args.beforeUrl,
    afterUrl: args.afterUrl,
    outputRoot: output.root,
    generatedAt: new Date().toISOString(),
  };

  fs.writeFileSync(
    path.join(output.root, "manifest.resolved.json"),
    `${JSON.stringify(resolvedManifest, null, 2)}\n`,
  );
  fs.writeFileSync(
    path.join(output.root, "review-board.html"),
    buildReviewHtml({
      manifest,
      targets: manifest.targets,
      output,
      runId: args.runId,
      repoRoot,
    }),
  );

  return output;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const manifest = readJson(args.manifest);
  const output = await createReviewBoard({ manifest, args });
  process.stdout.write(`${path.join(output.root, "review-board.html")}\n`);
}

const isCli = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isCli) {
  main().catch((error) => {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  });
}
