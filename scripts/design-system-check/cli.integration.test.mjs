import { execFileSync, spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

const checkerCliPath = path.resolve(
  process.cwd(),
  "scripts/design-system-check/index.mjs"
);

function git(root, args) {
  return execFileSync("git", args, {
    cwd: root,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
}

function makeDogfoodRepo() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "amfm-design-check-cli-"));

  fs.mkdirSync(path.join(root, "src/components"), { recursive: true });
  fs.mkdirSync(path.join(root, "figma"), { recursive: true });
  fs.mkdirSync(path.join(root, "design-system/audits"), { recursive: true });

  fs.writeFileSync(
    path.join(root, "COMPONENTS.md"),
    [
      "# Components",
      "",
      "## DogfoodCard",
      "",
      "This prose mentions `gap-[7px]` as a historical note, but prose alone is not an exception.",
      "",
    ].join("\n")
  );
  fs.writeFileSync(
    path.join(root, "figma/component-map.json"),
    JSON.stringify(
      {
        DogfoodCard: {
          implementation: "src/components/dogfood-card.tsx",
          documentation: "COMPONENTS.md#dogfoodcard",
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

  git(root, ["init"]);
  git(root, ["config", "user.email", "checker@example.com"]);
  git(root, ["config", "user.name", "Design Checker"]);
  git(root, ["add", "."]);
  git(root, ["commit", "-m", "baseline"]);

  return root;
}

function writeDogfoodComponent(root, source) {
  fs.writeFileSync(path.join(root, "src/components/dogfood-card.tsx"), source);
}

function runChecker(root) {
  return spawnSync(process.execPath, [checkerCliPath, "--base", "HEAD", "--json"], {
    cwd: root,
    encoding: "utf8",
  });
}

function runFullSourceReport(root) {
  return spawnSync(
    process.execPath,
    [checkerCliPath, "--scope", "full-source", "--report-only", "--json"],
    {
      cwd: root,
      encoding: "utf8",
    }
  );
}

function runCheckerWithArgs(root, args) {
  return spawnSync(process.execPath, [checkerCliPath, ...args], {
    cwd: root,
    encoding: "utf8",
  });
}

function parseJson(stdout) {
  return JSON.parse(stdout);
}

function completeException(overrides = {}) {
  return {
    id: "dogfood-card-gap-7",
    rule: "no-undocumented-arbitrary-visual-values",
    className: "gap-[7px]",
    filePath: "src/components/dogfood-card.tsx",
    component: "DogfoodCard",
    source: "Figma node 1:2, fixture value used to prove exception reporting.",
    rationale: "Fixture proves the CLI reports complete exceptions instead of silently normalizing arbitrary values.",
    alternatives: "Used gap-2 in the passing control case.",
    blastRadius: "Dogfood fixture only.",
    owner: "Design system governance",
    dateAdded: "2026-07-24",
    status: "temporary",
    promotionTrigger: "Remove after CLI dogfood proof remains covered by another integration test.",
    ...overrides,
  };
}

function completeRawValueException(overrides = {}) {
  return {
    id: "dogfood-card-white-inline-color",
    rule: "no-raw-hex-design-values",
    value: "#ffffff",
    filePath: "src/components/dogfood-card.tsx",
    component: "DogfoodCard",
    source: "CLI fixture source for raw-value exception coverage.",
    rationale: "Fixture proves raw-value exceptions stay explicit and visible in CLI output.",
    alternatives: "Use a semantic token for product UI styling; this fixture is intentionally exceptional.",
    blastRadius: "Dogfood fixture only.",
    owner: "Design system governance",
    dateAdded: "2026-07-25",
    status: "temporary",
    promotionTrigger: "Remove if CLI raw-value exception coverage moves to a more realistic fixture.",
    ...overrides,
  };
}

describe("design-system checker CLI dogfood", () => {
  it("fails a changed production component with an arbitrary value even when prose mentions it", () => {
    const root = makeDogfoodRepo();
    writeDogfoodComponent(
      root,
      'export function DogfoodCard() { return <div className="gap-[7px]" />; }\n'
    );

    const result = runChecker(root);
    const report = parseJson(result.stdout);

    expect(result.status).toBe(1);
    expect(report.sourceFilesScanned).toEqual(["src/components/dogfood-card.tsx"]);
    expect(report.errors).toEqual([
      expect.objectContaining({
        rule: "no-undocumented-arbitrary-visual-values",
        className: "gap-[7px]",
      }),
    ]);
  });

  it("passes a changed production component that uses system utilities", () => {
    const root = makeDogfoodRepo();
    writeDogfoodComponent(
      root,
      'export function DogfoodCard() { return <div className="flex gap-2 rounded-md border bg-background text-foreground" />; }\n'
    );

    const result = runChecker(root);
    const report = parseJson(result.stdout);

    expect(result.status).toBe(0);
    expect(report.sourceFilesScanned).toEqual(["src/components/dogfood-card.tsx"]);
    expect(report.errors).toEqual([]);
    expect(report.exceptions).toEqual([]);
  });

  it("fails a changed production component with a raw hex value", () => {
    const root = makeDogfoodRepo();
    writeDogfoodComponent(
      root,
      'export function DogfoodCard() { return <div style={{ color: "#ffffff" }} />; }\n'
    );

    const result = runChecker(root);
    const report = parseJson(result.stdout);

    expect(result.status).toBe(1);
    expect(report.errors).toEqual([
      expect.objectContaining({
        rule: "no-raw-hex-design-values",
        value: "#ffffff",
      }),
    ]);
  });

  it("passes a complete raw-value exception but keeps it visible in JSON output", () => {
    const root = makeDogfoodRepo();
    writeDogfoodComponent(
      root,
      'export function DogfoodCard() { return <div style={{ color: "#ffffff" }} />; }\n'
    );
    fs.writeFileSync(
      path.join(root, "design-system/audits/exceptions.json"),
      JSON.stringify(
        {
          version: 1,
          exceptions: [completeRawValueException()],
        },
        null,
        2
      )
    );

    const result = runChecker(root);
    const report = parseJson(result.stdout);

    expect(result.status).toBe(0);
    expect(report.errors).toEqual([]);
    expect(report.exceptions).toEqual([
      expect.objectContaining({
        rule: "no-raw-hex-design-values",
        value: "#ffffff",
        exceptionId: "dogfood-card-white-inline-color",
      }),
    ]);
  });

  it("fails a changed production component without a component-map implementation entry", () => {
    const root = makeDogfoodRepo();
    fs.writeFileSync(
      path.join(root, "figma/component-map.json"),
      JSON.stringify({}, null, 2)
    );
    writeDogfoodComponent(
      root,
      'export function DogfoodCard() { return <div className="gap-2" />; }\n'
    );

    const result = runChecker(root);
    const report = parseJson(result.stdout);

    expect(result.status).toBe(1);
    expect(report.errors).toEqual([
      expect.objectContaining({
        rule: "component-files-require-component-map-entry",
        filePath: "src/components/dogfood-card.tsx",
      }),
    ]);
  });

  it("fails when an arbitrary-value exception is incomplete", () => {
    const root = makeDogfoodRepo();
    writeDogfoodComponent(
      root,
      'export function DogfoodCard() { return <div className="gap-[7px]" />; }\n'
    );
    fs.writeFileSync(
      path.join(root, "design-system/audits/exceptions.json"),
      JSON.stringify(
        {
          version: 1,
          exceptions: [completeException({ rationale: "" })],
        },
        null,
        2
      )
    );

    const result = runChecker(root);
    const report = parseJson(result.stdout);

    expect(result.status).toBe(1);
    expect(report.errors).toEqual([
      expect.objectContaining({
        rule: "complete-design-system-exception-metadata",
        field: "rationale",
      }),
    ]);
  });

  it("passes a complete arbitrary-value exception but keeps it visible in JSON output", () => {
    const root = makeDogfoodRepo();
    writeDogfoodComponent(
      root,
      'export function DogfoodCard() { return <div className="gap-[7px]" />; }\n'
    );
    fs.writeFileSync(
      path.join(root, "design-system/audits/exceptions.json"),
      JSON.stringify(
        {
          version: 1,
          exceptions: [completeException()],
        },
        null,
        2
      )
    );

    const result = runChecker(root);
    const report = parseJson(result.stdout);

    expect(result.status).toBe(0);
    expect(report.errors).toEqual([]);
    expect(report.exceptions).toEqual([
      expect.objectContaining({
        rule: "no-undocumented-arbitrary-visual-values",
        className: "gap-[7px]",
        exceptionId: "dogfood-card-gap-7",
      }),
    ]);
  });

  it("reports full-source findings without failing the process in report-only mode", () => {
    const root = makeDogfoodRepo();
    writeDogfoodComponent(
      root,
      'export function DogfoodCard() { return <div className="gap-[7px]" />; }\n'
    );
    git(root, ["add", "src/components/dogfood-card.tsx"]);
    git(root, ["commit", "-m", "add dogfood card"]);

    const result = runFullSourceReport(root);
    const report = parseJson(result.stdout);

    expect(result.status).toBe(0);
    expect(report.mode).toBe("full-source");
    expect(report.sourceFilesScanned).toEqual(["src/components/dogfood-card.tsx"]);
    expect(report.errors).toEqual([
      expect.objectContaining({
        rule: "no-undocumented-arbitrary-visual-values",
        className: "gap-[7px]",
      }),
    ]);
  });

  it("prints a concise error for unsupported scopes", () => {
    const root = makeDogfoodRepo();

    const result = runCheckerWithArgs(root, ["--scope", "everything"]);

    expect(result.status).toBe(1);
    expect(result.stderr).toContain(
      'Unsupported design-system check scope: everything. Use "changed" or "full-source".'
    );
    expect(result.stderr).not.toContain("at runDesignSystemCheck");
  });
});
