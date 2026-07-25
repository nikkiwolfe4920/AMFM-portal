import { describe, expect, it } from "vitest";

import { scanArbitraryValues } from "./arbitrary-values.mjs";
import { validateExceptionRegistry } from "./exceptions.mjs";

const completeException = {
  id: "fixture-card-gap-7",
  className: "gap-[7px]",
  filePath: "src/components/example-card.tsx",
  component: "ExampleCard",
  source: "Figma node 1:2, explicit 7px fixture for checker test",
  rationale: "Fixture proves a complete exception remains visible instead of silently passing.",
  alternatives: "gap-1.5 and gap-2 were checked in the fixture scenario.",
  blastRadius: "Fixture only.",
  owner: "Design system governance",
  dateAdded: "2026-07-24",
  status: "temporary",
  promotionTrigger: "Promote to a named spacing token if a second real component needs it.",
};

describe("design-system arbitrary-value rule", () => {
  it("fails an undocumented arbitrary visual value", () => {
    const result = scanArbitraryValues({
      files: [
        {
          filePath: "src/components/example-card.tsx",
          sourceText: '<div className="grid gap-[7px] data-[state=open]:animate-in" />',
        },
      ],
      exceptions: [],
    });

    expect(result.errors).toEqual([
      expect.objectContaining({
        rule: "no-undocumented-arbitrary-visual-values",
        className: "gap-[7px]",
      }),
    ]);
    expect(result.errors).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ className: "data-[state=open]:animate-in" }),
      ])
    );
  });

  it("fails incomplete arbitrary-value exceptions", () => {
    const registry = {
      version: 1,
      exceptions: [{ ...completeException, rationale: "" }],
    };

    expect(validateExceptionRegistry(registry).errors).toEqual([
      expect.objectContaining({
        rule: "complete-arbitrary-value-exception-metadata",
        id: "fixture-card-gap-7",
        field: "rationale",
      }),
    ]);
  });

  it("fails malformed exception registry metadata", () => {
    const result = scanArbitraryValues({
      files: [],
      exceptionRegistry: {
        version: 2,
        exceptions: [],
      },
    });

    expect(result.errors).toEqual([
      expect.objectContaining({
        rule: "valid-arbitrary-value-exception-registry",
      }),
    ]);
  });

  it("allows a complete registered exception but reports it as an exception", () => {
    const result = scanArbitraryValues({
      files: [
        {
          filePath: "src/components/example-card.tsx",
          sourceText: '<div className="grid gap-[7px]" />',
        },
      ],
      exceptions: [completeException],
    });

    expect(result.errors).toEqual([]);
    expect(result.exceptions).toEqual([
      expect.objectContaining({
        className: "gap-[7px]",
        exceptionId: "fixture-card-gap-7",
      }),
    ]);
  });
});
