import { describe, expect, it } from "vitest";

import { validateComponentContracts } from "./component-contracts.mjs";

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
});
