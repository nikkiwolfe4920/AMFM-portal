import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { getChangedFiles } from "./files.mjs";

function git(root, args) {
  return execFileSync("git", args, {
    cwd: root,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
}

describe("design-system checker file helpers", () => {
  it("includes staged-only files in changed-file scope", () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "amfm-design-check-git-"));
    fs.mkdirSync(path.join(root, "src/components"), { recursive: true });
    fs.writeFileSync(path.join(root, "README.md"), "baseline\n");

    git(root, ["init"]);
    git(root, ["config", "user.email", "checker@example.com"]);
    git(root, ["config", "user.name", "Design Checker"]);
    git(root, ["add", "README.md"]);
    git(root, ["commit", "-m", "baseline"]);

    fs.writeFileSync(
      path.join(root, "src/components/example-card.tsx"),
      'export function ExampleCard() { return <div className="gap-[7px]" />; }\n'
    );
    git(root, ["add", "src/components/example-card.tsx"]);

    expect(getChangedFiles(root, "HEAD")).toContain(
      "src/components/example-card.tsx"
    );
  });

  it("fails instead of silently passing when the base ref is invalid", () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "amfm-design-check-git-"));
    fs.writeFileSync(path.join(root, "README.md"), "baseline\n");

    git(root, ["init"]);
    git(root, ["config", "user.email", "checker@example.com"]);
    git(root, ["config", "user.name", "Design Checker"]);
    git(root, ["add", "README.md"]);
    git(root, ["commit", "-m", "baseline"]);

    expect(() => getChangedFiles(root, "missing/ref")).toThrow(
      /Unable to resolve base ref/
    );
  });
});
