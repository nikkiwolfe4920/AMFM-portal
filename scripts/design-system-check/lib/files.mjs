import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const PRODUCTION_SOURCE_PATTERN = /^src\/.+\.(?:ts|tsx|css)$/;

export function resolveRepoPath(root, filePath) {
  const repoRoot = path.resolve(root);
  const resolved = path.resolve(repoRoot, filePath);

  if (resolved !== repoRoot && !resolved.startsWith(`${repoRoot}${path.sep}`)) {
    throw new Error(`Refusing to read outside repository root: ${filePath}`);
  }

  return resolved;
}

export function fileExists(root, filePath) {
  return fs.existsSync(resolveRepoPath(root, filePath));
}

export function readText(root, filePath, fallback = "") {
  const fullPath = resolveRepoPath(root, filePath);
  if (!fs.existsSync(fullPath)) return fallback;
  return fs.readFileSync(fullPath, "utf8");
}

export function readJson(root, filePath, fallback = undefined) {
  const source = readText(root, filePath, "");
  if (!source) return fallback;
  return JSON.parse(source);
}

export function isProductionSourceFile(filePath) {
  return (
    PRODUCTION_SOURCE_PATTERN.test(filePath) &&
    !filePath.endsWith(".test.ts") &&
    !filePath.endsWith(".test.tsx") &&
    !filePath.includes("/__fixtures__/") &&
    !filePath.includes("/test/")
  );
}

export function readScanFiles(root, filePaths) {
  return filePaths
    .filter(isProductionSourceFile)
    .filter((filePath) => fileExists(root, filePath))
    .map((filePath) => ({
      filePath,
      sourceText: readText(root, filePath),
    }));
}

function gitOutput(root, args, { failureMessage } = {}) {
  try {
    return execFileSync("git", args, {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    throw new Error(
      failureMessage ?? `Git command failed: git ${args.join(" ")}`
    );
  }
}

export function getChangedFiles(root, baseRef = "origin/main") {
  const mergeBase = gitOutput(root, ["merge-base", "HEAD", baseRef], {
    failureMessage: `Unable to resolve base ref ${baseRef}. Fetch the ref or pass --base <valid-ref>.`,
  });
  const tracked = gitOutput(root, [
    "diff",
    "--name-only",
    "--diff-filter=ACMRTUXB",
    mergeBase,
    "HEAD",
  ]);
  const workingTree = gitOutput(root, [
    "diff",
    "--name-only",
    "--diff-filter=ACMRTUXB",
  ]);
  const staged = gitOutput(root, [
    "diff",
    "--cached",
    "--name-only",
    "--diff-filter=ACMRTUXB",
  ]);
  const untracked = gitOutput(root, [
    "ls-files",
    "--others",
    "--exclude-standard",
  ]);

  return [
    ...new Set([tracked, workingTree, staged, untracked].join("\n").split("\n")),
  ]
    .map((filePath) => filePath.trim())
    .filter(Boolean)
    .sort();
}
