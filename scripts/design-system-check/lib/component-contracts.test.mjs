import { describe, expect, it } from "vitest";

import { validateComponentContracts } from "./component-contracts.mjs";

function completeContractExclusion(overrides = {}) {
  return {
    id: "login-form-route-orchestration",
    filePath: "src/app/login/_components/login-form.tsx",
    component: "LoginForm",
    category: "route-orchestration",
    source: "Route-local form assembly inspected during full-source design-system audit.",
    rationale:
      "LoginForm owns local form state and submits behavior while composing documented primitives; it is not a reusable Figma component contract.",
    alternatives:
      "Document the reused primitives instead; promote a subcomponent if the same visual form pattern gains a second route.",
    blastRadius: "Limited to the login route assembly file.",
    owner: "Design system governance",
    dateAdded: "2026-07-25",
    status: "permanent",
    reviewTrigger:
      "Review if this file is reused outside the login route or becomes a Figma component/pattern.",
    ...overrides,
  };
}

describe("design-system component contract rule", () => {
  it("fails a changed component file without a component-map entry", () => {
    const result = validateComponentContracts({
      changedFiles: ["src/components/undocumented-card.tsx"],
      componentMap: {},
      componentsMarkdown: "",
      fileExists: () => true,
    });

    expect(result.errors).toEqual([
      expect.objectContaining({
        rule: "component-files-require-component-map-entry",
        filePath: "src/components/undocumented-card.tsx",
      }),
    ]);
  });

  it("uses source-neutral wording for component-map coverage errors", () => {
    const result = validateComponentContracts({
      changedFiles: ["src/components/undocumented-card.tsx"],
      componentMap: {},
      componentsMarkdown: "",
      fileExists: () => true,
    });

    expect(result.errors).toEqual([
      expect.objectContaining({
        message:
          "src/components/undocumented-card.tsx does not have a figma/component-map.json implementation entry.",
      }),
    ]);
  });

  it("fails a changed PascalCase component file without a component-map entry", () => {
    const result = validateComponentContracts({
      changedFiles: ["src/components/UndocumentedCard.tsx"],
      componentMap: {},
      componentsMarkdown: "",
      fileExists: () => true,
    });

    expect(result.errors).toEqual([
      expect.objectContaining({
        rule: "component-files-require-component-map-entry",
        filePath: "src/components/UndocumentedCard.tsx",
      }),
    ]);
  });

  it("fails a changed colocated app component file without a component-map entry", () => {
    const result = validateComponentContracts({
      changedFiles: ["src/app/login/_components/new-card.tsx"],
      componentMap: {},
      componentsMarkdown: "",
      fileExists: () => true,
    });

    expect(result.errors).toEqual([
      expect.objectContaining({
        rule: "component-files-require-component-map-entry",
        filePath: "src/app/login/_components/new-card.tsx",
      }),
    ]);
  });

  it("does not require component-map entries for design-system internal helper files", () => {
    const result = validateComponentContracts({
      changedFiles: [
        "src/app/design-system/_components/showcase.tsx",
        "src/app/design-system/components/_components/demo.tsx",
      ],
      componentMap: {},
      componentsMarkdown: "",
      fileExists: () => true,
    });

    expect(result.errors).toEqual([]);
  });

  it("passes an exact component-contract exclusion but keeps it visible", () => {
    const result = validateComponentContracts({
      changedFiles: ["src/app/login/_components/login-form.tsx"],
      componentMap: {},
      componentsMarkdown: "",
      contractExclusionRegistry: {
        version: 1,
        exclusions: [completeContractExclusion()],
      },
      fileExists: () => true,
    });

    expect(result.errors).toEqual([]);
    expect(result.exceptions).toEqual([
      expect.objectContaining({
        rule: "component-files-require-component-map-entry",
        filePath: "src/app/login/_components/login-form.tsx",
        exceptionId: "login-form-route-orchestration",
      }),
    ]);
  });

  it("fails incomplete component-contract exclusions", () => {
    const result = validateComponentContracts({
      changedFiles: ["src/app/login/_components/login-form.tsx"],
      componentMap: {},
      componentsMarkdown: "",
      contractExclusionRegistry: {
        version: 1,
        exclusions: [completeContractExclusion({ rationale: "" })],
      },
      fileExists: () => true,
    });

    expect(result.errors).toEqual([
      expect.objectContaining({
        rule: "complete-component-contract-exclusion-metadata",
        field: "rationale",
      }),
    ]);
    expect(result.exceptions).toEqual([]);
  });

  it("fails component-contract exclusions with unsupported categories", () => {
    const result = validateComponentContracts({
      changedFiles: ["src/app/login/_components/login-form.tsx"],
      componentMap: {},
      componentsMarkdown: "",
      contractExclusionRegistry: {
        version: 1,
        exclusions: [completeContractExclusion({ category: "misc" })],
      },
      fileExists: () => true,
    });

    expect(result.errors).toEqual([
      expect.objectContaining({
        rule: "complete-component-contract-exclusion-metadata",
        field: "category",
      }),
    ]);
    expect(result.exceptions).toEqual([]);
  });

  it("does not let a component-contract exclusion suppress another file", () => {
    const result = validateComponentContracts({
      changedFiles: ["src/app/login/_components/new-card.tsx"],
      componentMap: {},
      componentsMarkdown: "",
      contractExclusionRegistry: {
        version: 1,
        exclusions: [completeContractExclusion()],
      },
      fileExists: () => true,
    });

    expect(result.errors).toEqual([
      expect.objectContaining({
        rule: "component-files-require-component-map-entry",
        filePath: "src/app/login/_components/new-card.tsx",
      }),
    ]);
    expect(result.exceptions).toEqual([]);
  });

  it("fails component-map entries pointing at missing implementation files", () => {
    const result = validateComponentContracts({
      changedFiles: [],
      componentMap: {
        MissingCard: {
          implementation: "src/components/missing-card.tsx",
          documentation: "COMPONENTS.md#missingcard",
        },
      },
      componentsMarkdown: "## MissingCard\n",
      fileExists: () => false,
    });

    expect(result.errors).toEqual([
      expect.objectContaining({
        rule: "component-map-implementation-path-exists",
        componentName: "MissingCard",
      }),
    ]);
  });

  it("fails component-map entries without COMPONENTS.md documentation", () => {
    const result = validateComponentContracts({
      changedFiles: ["src/components/example-card.tsx"],
      componentMap: {
        ExampleCard: {
          implementation: "src/components/example-card.tsx",
        },
      },
      componentsMarkdown: "## ExampleCard\n",
      fileExists: () => true,
    });

    expect(result.errors).toEqual([
      expect.objectContaining({
        rule: "component-map-documentation-required",
        componentName: "ExampleCard",
      }),
    ]);
  });

  it("fails component-map entries pointing documentation outside COMPONENTS.md", () => {
    const result = validateComponentContracts({
      changedFiles: [],
      componentMap: {
        ExampleCard: {
          implementation: "src/components/example-card.tsx",
          documentation: "README.md#examplecard",
        },
      },
      componentsMarkdown: "## ExampleCard\n",
      fileExists: () => true,
    });

    expect(result.errors).toEqual([
      expect.objectContaining({
        rule: "component-map-documentation-path-is-components-md",
        componentName: "ExampleCard",
      }),
    ]);
  });

  it("fails component-map entries pointing at another component's docs anchor", () => {
    const result = validateComponentContracts({
      changedFiles: ["src/components/new-card.tsx"],
      componentMap: {
        NewCard: {
          implementation: "src/components/new-card.tsx",
          documentation: "COMPONENTS.md#button",
        },
      },
      componentsMarkdown: "## Button\n## NewCard\n",
      fileExists: () => true,
    });

    expect(result.errors).toEqual([
      expect.objectContaining({
        rule: "component-map-documentation-anchor-matches-component",
        componentName: "NewCard",
        documentation: "COMPONENTS.md#button",
      }),
    ]);
  });

  it("fails component-map entries with prose Figma references but no structured Figma sources", () => {
    const result = validateComponentContracts({
      changedFiles: [],
      componentMap: {
        ExampleCard: {
          implementation: "src/components/example-card.tsx",
          documentation: "COMPONENTS.md#examplecard",
          figmaComponent:
            'AMFM Portal — node 3724:20992 ("Modal/Settings/Church Profile")',
        },
      },
      componentsMarkdown: "## ExampleCard\n",
      fileExists: () => true,
    });

    expect(result.errors).toEqual([
      expect.objectContaining({
        rule: "component-map-figma-sources-required",
        componentName: "ExampleCard",
      }),
    ]);
  });

  it("does not require structured Figma sources for components without a Figma reference", () => {
    const result = validateComponentContracts({
      changedFiles: [],
      componentMap: {
        ExampleCard: {
          implementation: "src/components/example-card.tsx",
          documentation: "COMPONENTS.md#examplecard",
          figmaComponent: "",
        },
      },
      componentsMarkdown: "## ExampleCard\n",
      fileExists: () => true,
    });

    expect(result.errors).toEqual([]);
  });

  it("fails incomplete structured Figma source metadata", () => {
    const result = validateComponentContracts({
      changedFiles: [],
      componentMap: {
        ExampleCard: {
          implementation: "src/components/example-card.tsx",
          documentation: "COMPONENTS.md#examplecard",
          figmaSources: [
            {
              fileKey: "tg3U3gNcIYMn9aY9JYrIZc",
              nodeId: "3724-20992",
              name: "Modal/Settings/Church Profile",
              url: "https://www.figma.com/design/tg3U3gNcIYMn9aY9JYrIZc/AMFM-Portal?node-id=3724-20992&m=dev",
              role: "primary",
              lastVerified: "07/25/2026",
            },
          ],
        },
      },
      componentsMarkdown: "## ExampleCard\n",
      fileExists: () => true,
    });

    expect(result.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          rule: "component-map-figma-source-node-id-format",
          componentName: "ExampleCard",
        }),
        expect.objectContaining({
          rule: "component-map-figma-source-role-valid",
          componentName: "ExampleCard",
        }),
        expect.objectContaining({
          rule: "component-map-figma-source-date-valid",
          componentName: "ExampleCard",
        }),
      ])
    );
  });

  it("fails structured Figma source URLs that do not match the source node", () => {
    const result = validateComponentContracts({
      changedFiles: [],
      componentMap: {
        ExampleCard: {
          implementation: "src/components/example-card.tsx",
          documentation: "COMPONENTS.md#examplecard",
          figmaSources: [
            {
              fileKey: "tg3U3gNcIYMn9aY9JYrIZc",
              nodeId: "3724:20992",
              name: "Modal/Settings/Church Profile",
              url: "https://www.figma.com/design/wrong-file/AMFM-Portal?node-id=3724-20992&m=dev",
              role: "primary-reference",
              lastVerified: "2026-07-25",
            },
          ],
        },
      },
      componentsMarkdown: "## ExampleCard\n",
      fileExists: () => true,
    });

    expect(result.errors).toEqual([
      expect.objectContaining({
        rule: "component-map-figma-source-url-matches",
        componentName: "ExampleCard",
      }),
    ]);
  });

  it("fails malformed visual target references", () => {
    const result = validateComponentContracts({
      changedFiles: [],
      componentMap: {
        ExampleCard: {
          implementation: "src/components/example-card.tsx",
          documentation: "COMPONENTS.md#examplecard",
          visualTargets: ["example-card", ""],
        },
      },
      componentsMarkdown: "## ExampleCard\n",
      fileExists: () => true,
    });

    expect(result.errors).toEqual([
      expect.objectContaining({
        rule: "component-map-visual-targets-valid",
        componentName: "ExampleCard",
      }),
    ]);
  });

  it("fails visual target references that are missing from the target registry", () => {
    const result = validateComponentContracts({
      changedFiles: [],
      componentMap: {
        ExampleCard: {
          implementation: "src/components/example-card.tsx",
          documentation: "COMPONENTS.md#examplecard",
          visualTargets: ["missing-example-card"],
        },
      },
      componentsMarkdown: "## ExampleCard\n",
      visualTargetIds: new Set(["example-card"]),
      fileExists: () => true,
    });

    expect(result.errors).toEqual([
      expect.objectContaining({
        rule: "component-map-visual-target-exists",
        componentName: "ExampleCard",
        visualTarget: "missing-example-card",
      }),
    ]);
  });

  it("passes visual target references that exist in the target registry", () => {
    const result = validateComponentContracts({
      changedFiles: [],
      componentMap: {
        ExampleCard: {
          implementation: "src/components/example-card.tsx",
          documentation: "COMPONENTS.md#examplecard",
          visualTargets: ["example-card"],
        },
      },
      componentsMarkdown: "## ExampleCard\n",
      visualTargetIds: new Set(["example-card"]),
      fileExists: () => true,
    });

    expect(result.errors).toEqual([]);
  });

  it("passes when changed component code, component map, and COMPONENTS.md agree", () => {
    const result = validateComponentContracts({
      changedFiles: ["src/components/example-card.tsx"],
      componentMap: {
        ExampleCard: {
          implementation: "src/components/example-card.tsx",
          documentation: "COMPONENTS.md#examplecard",
        },
      },
      componentsMarkdown: "## ExampleCard\n",
      fileExists: () => true,
    });

    expect(result.errors).toEqual([]);
  });

  it("passes structured Figma sources and visual target references", () => {
    const result = validateComponentContracts({
      changedFiles: ["src/components/example-card.tsx"],
      componentMap: {
        ExampleCard: {
          implementation: "src/components/example-card.tsx",
          documentation: "COMPONENTS.md#examplecard",
          figmaSources: [
            {
              fileKey: "tg3U3gNcIYMn9aY9JYrIZc",
              nodeId: "3724:20992",
              name: "Modal/Settings/Church Profile",
              url: "https://www.figma.com/design/tg3U3gNcIYMn9aY9JYrIZc/AMFM-Portal?node-id=3724-20992&m=dev",
              role: "primary-reference",
              lastVerified: "2026-07-25",
            },
          ],
          visualTargets: ["example-card"],
        },
      },
      componentsMarkdown: "## ExampleCard\n",
      fileExists: () => true,
    });

    expect(result.errors).toEqual([]);
  });
});
