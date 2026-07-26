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

function completeRawValueException(overrides = {}) {
  return {
    id: "example-card-white-inline-color",
    rule: "no-raw-hex-design-values",
    value: "#ffffff",
    filePath: "src/components/example-card.tsx",
    component: "ExampleCard",
    source: "Fixture source for runner-level raw-value exception coverage.",
    rationale: "Fixture proves raw-value exceptions stay explicit and visible through the runner.",
    alternatives: "A semantic color token was used in the passing control case.",
    blastRadius: "Runner fixture only.",
    owner: "Design system governance",
    dateAdded: "2026-07-25",
    status: "temporary",
    promotionTrigger: "Remove if runner raw-value exception coverage moves to a more realistic fixture.",
    ...overrides,
  };
}

function completeContractExclusion(overrides = {}) {
  return {
    id: "dashboard-content-route-orchestration",
    filePath: "src/app/dashboard/_components/dashboard-content.tsx",
    component: "DashboardContent",
    category: "route-orchestration",
    source: "Runner fixture for file-backed component-contract exclusion coverage.",
    rationale:
      "DashboardContent composes documented dashboard components and owns route-local state; it is not a reusable Figma component contract.",
    alternatives:
      "Document the dashboard cards and controls it composes; promote a reusable shell only after a second route needs it.",
    blastRadius: "Runner fixture only.",
    owner: "Design system governance",
    dateAdded: "2026-07-25",
    status: "permanent",
    reviewTrigger:
      "Review if this route assembly is reused outside the dashboard route.",
    ...overrides,
  };
}

describe("design-system checker runner", () => {
  it("fails unsupported scan scopes instead of silently falling back", () => {
    const root = makeTempRepo();

    expect(() =>
      runDesignSystemCheck({
        root,
        scope: "everything",
      })
    ).toThrow(/Unsupported design-system check scope/);
  });

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

  it("reports raw-value exceptions through the runner", () => {
    const root = makeTempRepo();
    fs.writeFileSync(
      path.join(root, "src/components/example-card.tsx"),
      'export function ExampleCard() { return <div style={{ color: "#ffffff" }} />; }\n'
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

    const result = runDesignSystemCheck({
      root,
      changedFiles: ["src/components/example-card.tsx"],
    });

    expect(result.errors).toEqual([]);
    expect(result.exceptions).toEqual([
      expect.objectContaining({
        rule: "no-raw-hex-design-values",
        value: "#ffffff",
        exceptionId: "example-card-white-inline-color",
      }),
    ]);
  });

  it("reports component-contract exclusions through the runner", () => {
    const root = makeTempRepo();
    fs.writeFileSync(
      path.join(root, "src/components/example-card.tsx"),
      'export function ExampleCard() { return <div className="gap-2" />; }\n'
    );
    fs.mkdirSync(path.join(root, "src/app/dashboard/_components"), {
      recursive: true,
    });
    fs.writeFileSync(
      path.join(root, "src/app/dashboard/_components/dashboard-content.tsx"),
      'export function DashboardContent() { return <main className="gap-2" />; }\n'
    );
    fs.writeFileSync(
      path.join(root, "design-system/audits/component-contract-exclusions.json"),
      JSON.stringify(
        {
          version: 1,
          exclusions: [completeContractExclusion()],
        },
        null,
        2
      )
    );

    const result = runDesignSystemCheck({
      root,
      changedFiles: ["src/app/dashboard/_components/dashboard-content.tsx"],
    });

    expect(result.errors).toEqual([]);
    expect(result.exceptions).toEqual([
      expect.objectContaining({
        rule: "component-files-require-component-map-entry",
        filePath: "src/app/dashboard/_components/dashboard-content.tsx",
        exceptionId: "dashboard-content-route-orchestration",
      }),
    ]);
  });

  it("validates component-map visual targets against the visual audit registry", () => {
    const root = makeTempRepo();
    fs.mkdirSync(path.join(root, "design-system/audits/visual-comparisons"), {
      recursive: true,
    });
    fs.writeFileSync(
      path.join(root, "design-system/audits/visual-comparisons/targets.json"),
      JSON.stringify(
        { schemaVersion: 1, targets: [{ id: "example-card" }] },
        null,
        2
      )
    );
    fs.writeFileSync(
      path.join(root, "figma/component-map.json"),
      JSON.stringify(
        {
          ExampleCard: {
            implementation: "src/components/example-card.tsx",
            documentation: "COMPONENTS.md#examplecard",
            visualTargets: ["missing-example-card"],
          },
        },
        null,
        2
      )
    );
    fs.writeFileSync(
      path.join(root, "src/components/example-card.tsx"),
      'export function ExampleCard() { return <div className="gap-2" />; }\n'
    );

    const result = runDesignSystemCheck({
      root,
      changedFiles: ["src/components/example-card.tsx"],
    });

    expect(result.errors).toEqual([
      expect.objectContaining({
        rule: "component-map-visual-target-exists",
        componentName: "ExampleCard",
        visualTarget: "missing-example-card",
      }),
    ]);
  });

  it("can run in full-source mode without depending on changed files", () => {
    const root = makeTempRepo();
    fs.writeFileSync(
      path.join(root, "src/components/example-card.tsx"),
      'export function ExampleCard() { return <div className="gap-[7px]" />; }\n'
    );
    fs.mkdirSync(path.join(root, "src/app/dashboard/_components"), {
      recursive: true,
    });
    fs.writeFileSync(
      path.join(root, "src/app/dashboard/_components/dashboard-card.tsx"),
      'export function DashboardCard() { return <section className="gap-2" />; }\n'
    );

    const result = runDesignSystemCheck({
      root,
      scope: "full-source",
      changedFiles: [],
    });

    expect(result.mode).toBe("full-source");
    expect(result.sourceFilesScanned).toEqual([
      "src/app/dashboard/_components/dashboard-card.tsx",
      "src/components/example-card.tsx",
    ]);
    expect(result.errors).toEqual([
      expect.objectContaining({
        rule: "no-undocumented-arbitrary-visual-values",
        className: "gap-[7px]",
      }),
      expect.objectContaining({
        rule: "component-files-require-component-map-entry",
        filePath: "src/app/dashboard/_components/dashboard-card.tsx",
      }),
    ]);
  });
});
