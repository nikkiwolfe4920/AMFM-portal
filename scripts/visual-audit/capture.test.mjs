import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { EventEmitter } from "node:events";
import { describe, expect, it } from "vitest";

import {
  createReviewBoard,
  freezeVisualState,
  resolveClip,
  runActions,
  terminateChromeProcess,
} from "./capture.mjs";

describe("visual audit review board", () => {
  it("renders a baseline-unavailable row without overclaiming a three-source run", async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "visual-audit-"));
    fs.mkdirSync(path.join(root, "src/components"), { recursive: true });
    fs.mkdirSync(path.join(root, "figma"), { recursive: true });
    fs.writeFileSync(
      path.join(root, "src/components/heartchart-link-modal.tsx"),
      'export function HeartChartLinkModal() { return <div className="bg-background text-text-secondary gap-4">Modal</div>; }\n',
    );
    fs.writeFileSync(
      path.join(root, "figma/component-map.json"),
      JSON.stringify(
        {
          HeartChartLinkModal: {
            figmaComponent: "AMFM Portal — node 1903:19737",
            documentation: "COMPONENTS.md#heartchartlinkmodal",
            implementation: "src/components/heartchart-link-modal.tsx",
          },
        },
        null,
        2,
      ),
    );
    const manifest = {
      baseline: {
        commit: "12ff0e440ab990747af17169166a70b09c16fce7",
      },
      targets: [
        {
          id: "heartchart-link-modal",
          label: "HeartChart link modal",
          route: "/design-system/components/heart-chart-link-modal",
          baselineUnavailableReason: "No baseline implementation for this newly added modal.",
          viewport: { width: 1440, height: 1100 },
          figma: {
            url: "https://www.figma.com/design/tg3U3gNcIYMn9aY9JYrIZc/AMFM-Portal?node-id=1903-19737&m=dev",
          },
          relatedFiles: ["src/components/heartchart-link-modal.tsx"],
        },
      ],
    };

    const output = await createReviewBoard({
      manifest,
      args: {
        runId: "test-run",
        outDir: root,
        repoRoot: root,
        skipCapture: true,
      },
    });

    const html = fs.readFileSync(path.join(output.root, "review-board.html"), "utf8");
    expect(html).toContain("Two-source review: Figma reference and current branch code.");
    expect(html).toContain("Baseline unavailable for every target in this run.");
    expect(html).toContain("1. Figma");
    expect(html).toContain("2. Baseline code");
    expect(html).toContain("3. Current code");
    expect(html).toContain("heartchart-link-modal");
    expect(html).toContain("src/components/heartchart-link-modal.tsx");
    expect(html).toContain("No baseline implementation for this newly added modal.");
    expect(html).toContain("Implementation dossier");
    expect(html).toContain("Component-map matches");
    expect(html).toContain("COMPONENTS.md#heartchartlinkmodal");
    expect(html).toContain("bg-background");
    expect(html).toContain("text-text-secondary");
    expect(html).toContain("export function HeartChartLinkModal");
  });

  it("renders a three-source summary when a baseline target exists", async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "visual-audit-"));
    fs.mkdirSync(path.join(root, "src/components"), { recursive: true });
    fs.writeFileSync(
      path.join(root, "src/components/button.tsx"),
      'export function Button() { return <button className="bg-primary text-primary-foreground">Button</button>; }\n',
    );
    const manifest = {
      baseline: {
        commit: "12ff0e440ab990747af17169166a70b09c16fce7",
      },
      targets: [
        {
          id: "button",
          label: "Button",
          route: "/design-system/components#button",
          viewport: { width: 1440, height: 900 },
          figma: {
            url: "https://www.figma.com/design/tg3U3gNcIYMn9aY9JYrIZc/AMFM-Portal?node-id=3722-19475&m=dev",
          },
          relatedFiles: ["src/components/button.tsx"],
        },
      ],
    };

    const output = await createReviewBoard({
      manifest,
      args: {
        runId: "test-three-source",
        outDir: root,
        repoRoot: root,
        skipCapture: true,
      },
    });

    const html = fs.readFileSync(path.join(output.root, "review-board.html"), "utf8");
    expect(html).toContain(
      "Three-source review: Figma reference, baseline code, and current branch code.",
    );
    expect(html).toContain("Baseline: 12ff0e440ab990747af17169166a70b09c16fce7.");
    expect(html).toContain("src/components/button.tsx");
  });

  it("runs target actions through the page before capture", async () => {
    const calls = [];
    const page = {
      async send(method, params) {
        calls.push({ method, params });
        return { result: { value: { ok: true } } };
      },
    };

    await runActions(page, [
      { type: "clickText", text: "Open with settings CTA", afterMs: 0 },
      { type: "waitForSelector", selector: "[role='dialog']", timeoutMs: 50 },
      { type: "waitForText", selector: "[role='dialog']", text: "Share your HeartChart link", timeoutMs: 50 },
    ]);

    expect(calls).toHaveLength(3);
    expect(calls[0].params.expression).toContain("Open with settings CTA");
    expect(calls[1].params.expression).toContain("[role='dialog']");
    expect(calls[2].params.expression).toContain("Share your HeartChart link");
  });

  it("freezes animations and transitions before capture", async () => {
    const calls = [];
    const page = {
      async send(method, params) {
        calls.push({ method, params });
        return {};
      },
    };

    await freezeVisualState(page);

    expect(calls).toHaveLength(1);
    expect(calls[0].params.expression).toContain("data-visual-audit-freeze");
    expect(calls[0].params.expression).toContain("animation: none");
    expect(calls[0].params.expression).toContain("transition: none");
    expect(calls[0].params.expression).toContain("data-nextjs-dev-tools-button");
  });

  it("resolves a selector clip within the viewport with margin", async () => {
    const page = {
      async send(method, params) {
        expect(method).toBe("Runtime.evaluate");
        expect(params.expression).toContain("[role='dialog']");
        expect(params.expression).toContain("window.scrollX");
        expect(params.expression).toContain("window.scrollY");
        return {
          result: {
            value: {
              x: 112.5,
              y: 250.2,
              width: 420.4,
              height: 300.4,
              viewportX: 0,
              viewportY: 200,
            },
          },
        };
      },
    };

    await expect(
      resolveClip(page, {
        selector: "[role='dialog']",
        margin: 16,
        viewport: { width: 500, height: 340 },
      }),
    ).resolves.toEqual({
      x: 96,
      y: 234,
      width: 404,
      height: 306,
      scale: 1,
    });
  });

  it("fails capture clipping when the selector is missing", async () => {
    const page = {
      async send() {
        return { result: { value: null } };
      },
    };

    await expect(resolveClip(page, { selector: "[role='dialog']" })).rejects.toThrow(
      "clipSelector not found",
    );
  });

  it("escalates Chrome shutdown when graceful termination does not exit", async () => {
    const child = new EventEmitter();
    const signals = [];
    child.exitCode = null;
    child.kill = (signal) => {
      signals.push(signal);
      if (signal === "SIGKILL") {
        child.exitCode = 0;
        setTimeout(() => child.emit("exit", 0), 0);
      }
      return true;
    };

    await terminateChromeProcess(child, {
      gracefulTimeoutMs: 1,
      forceTimeoutMs: 50,
    });

    expect(signals).toEqual(["SIGTERM", "SIGKILL"]);
  });
});
