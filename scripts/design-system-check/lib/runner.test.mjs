import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { runDesignSystemCheck } from "./runner.mjs";

function makeTempRepo() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "amfm-design-check-"));
  fs.mkdirSync(path.join(root, "src/components"), { recursive: true });
  fs.mkdirSync(path.join(root, "figma"), { recursive: true });
  fs.mkdirSync(path.join(root, "design-system/audits"), { recursive: true });

  fs.writeFileSync(path.join(root, "COMPONENTS.md"), "## ExampleCard\n");
  fs.writeFileSync(
    path.join(root, "figma/component-map.json"),
    JSON.stringify(
      {
        ExampleCard: {
          implementation: "src/components/example-card.tsx",
          documentation: "COMPONENTS.md#examplecard",
        },
      },
      null,
      2
    )
  );
  fs.writeFileSync(
    path.join(root, "design-system/audits/exceptions.json"),
    JSON.stringify({ version: 1, exceptions: [] }, null, 2)
  );

  return root;
}

describe("design-system checker runner", () => {
  it("checks changed production component files and global component-map integrity", () => {
    const root = makeTempRepo();
    fs.writeFileSync(
      path.join(root, "src/components/example-card.tsx"),
      'export function ExampleCard() { return <div className="gap-[7px]" />; }\n'
    );

    const result = runDesignSystemCheck({
      root,
      changedFiles: ["src/components/example-card.tsx"],
    });

    expect(result.errors).toEqual([
      expect.objectContaining({
        rule: "no-undocumented-arbitrary-visual-values",
        className: "gap-[7px]",
      }),
    ]);
  });

  it("does not scan checker test fixtures as production design code", () => {
    const root = makeTempRepo();
    fs.writeFileSync(
      path.join(root, "src/components/example-card.tsx"),
      'export function ExampleCard() { return <div className="gap-2" />; }\n'
    );

    const result = runDesignSystemCheck({
      root,
      changedFiles: ["scripts/design-system-check/lib/example.test.mjs"],
    });

    expect(result.errors).toEqual([]);
  });

  it("enforces raw hex checks through the runner", () => {
    const root = makeTempRepo();
    fs.writeFileSync(
      path.join(root, "src/components/example-card.tsx"),
      'export function ExampleCard() { return <div style={{ color: "#ffffff" }} />; }\n'
    );

    const result = runDesignSystemCheck({
      root,
      changedFiles: ["src/components/example-card.tsx"],
    });

    expect(result.errors).toEqual([
      expect.objectContaining({
        rule: "no-raw-hex-design-values",
        value: "#ffffff",
      }),
    ]);
  });
});
