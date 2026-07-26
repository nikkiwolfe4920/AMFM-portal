import { describe, expect, it } from "vitest";

import { scanRawDesignValues } from "./raw-values.mjs";

const completeRawValueException = {
  id: "google-icon-blue-brand-fill",
  rule: "no-raw-hex-design-values",
  value: "#4285F4",
  filePath: "src/app/login/_components/google-icon.tsx",
  component: "GoogleIcon",
  source: "Google brand mark SVG fill from the official multi-color logo artwork.",
  rationale: "Third-party brand color must remain exact and should not be remapped to AMFM semantic tokens.",
  alternatives: "Semantic AMFM color tokens were rejected because this is third-party logo artwork, not product UI styling.",
  blastRadius: "GoogleIcon SVG path fill only.",
  owner: "Design system governance",
  dateAdded: "2026-07-25",
  status: "permanent",
  promotionTrigger: "Revisit only if Google brand artwork changes or the icon becomes an external asset.",
};

describe("design-system raw design-value rule", () => {
  it("fails raw hex colors in production source", () => {
    const result = scanRawDesignValues({
      files: [
        {
          filePath: "src/components/example-card.tsx",
          sourceText: 'export const color = "#ffffff";\n',
        },
      ],
    });

    expect(result.errors).toEqual([
      expect.objectContaining({
        rule: "no-raw-hex-design-values",
        value: "#ffffff",
      }),
    ]);
  });

  it("ignores hex values inside explanatory comments", () => {
    const result = scanRawDesignValues({
      files: [
        {
          filePath: "src/tokens/colors.css",
          sourceText: "/* Figma source: #ffffff */\n:root { --background: oklch(1 0 0); }\n",
        },
      ],
    });

    expect(result.errors).toEqual([]);
  });

  it("fails raw pixel values in inline style objects", () => {
    const result = scanRawDesignValues({
      files: [
        {
          filePath: "src/components/example-card.tsx",
          sourceText:
            'export function ExampleCard() { return <div style={{ gap: "7px" }} />; }\n',
        },
      ],
    });

    expect(result.errors).toEqual([
      expect.objectContaining({
        rule: "no-raw-design-values",
        value: "gap: \"7px\"",
      }),
    ]);
  });

  it("fails raw CSS design declarations outside token files", () => {
    const result = scanRawDesignValues({
      files: [
        {
          filePath: "src/app/example.css",
          sourceText: ".example { margin-top: 7px; color: rgb(0 0 0); }\n",
        },
      ],
    });

    expect(result.errors).toEqual([
      expect.objectContaining({
        rule: "no-raw-design-values",
        value: "margin-top: 7px",
      }),
      expect.objectContaining({
        rule: "no-raw-design-values",
        value: "color: rgb(0 0 0)",
      }),
    ]);
  });

  it("allows raw color function definitions inside token files", () => {
    const result = scanRawDesignValues({
      files: [
        {
          filePath: "src/tokens/colors.css",
          sourceText: ":root { --background: oklch(1 0 0); }\n",
        },
      ],
    });

    expect(result.errors).toEqual([]);
  });

  it("allows a complete registered raw-value exception but reports it visibly", () => {
    const result = scanRawDesignValues({
      files: [
        {
          filePath: "src/app/login/_components/google-icon.tsx",
          sourceText: '<path fill="#4285F4" />\n',
        },
      ],
      exceptions: [completeRawValueException],
    });

    expect(result.errors).toEqual([]);
    expect(result.exceptions).toEqual([
      expect.objectContaining({
        rule: "no-raw-hex-design-values",
        value: "#4285F4",
        exceptionId: "google-icon-blue-brand-fill",
      }),
    ]);
  });

  it("does not let one raw-value exception allow multiple identical values in the same file", () => {
    const result = scanRawDesignValues({
      files: [
        {
          filePath: "src/app/login/_components/google-icon.tsx",
          sourceText: [
            '<path fill="#4285F4" />',
            '<path stroke="#4285F4" />',
          ].join("\n"),
        },
      ],
      exceptions: [completeRawValueException],
    });

    expect(result.exceptions).toEqual([
      expect.objectContaining({
        rule: "no-raw-hex-design-values",
        value: "#4285F4",
        exceptionId: "google-icon-blue-brand-fill",
      }),
    ]);
    expect(result.errors).toEqual([
      expect.objectContaining({
        rule: "no-raw-hex-design-values",
        value: "#4285F4",
      }),
    ]);
  });

  it("does not allow a raw-value exception to whitelist another file", () => {
    const result = scanRawDesignValues({
      files: [
        {
          filePath: "src/components/example-card.tsx",
          sourceText: '<div style={{ color: "#4285F4" }} />\n',
        },
      ],
      exceptions: [completeRawValueException],
    });

    expect(result.errors).toEqual([
      expect.objectContaining({
        rule: "no-raw-hex-design-values",
        value: "#4285F4",
      }),
    ]);
    expect(result.exceptions).toEqual([]);
  });

  it("does not flag data-driven inline measurements as design literals", () => {
    const result = scanRawDesignValues({
      files: [
        {
          filePath: "src/components/example-chart.tsx",
          sourceText:
            "export function ExampleChart({ value }) { return <div style={{ width: `${value}%` }} />; }\n",
        },
      ],
    });

    expect(result.errors).toEqual([]);
  });

  it("does not flag non-style data objects as design declarations", () => {
    const result = scanRawDesignValues({
      files: [
        {
          filePath: "src/app/design-system/foundations/page.tsx",
          sourceText: 'const BREAKPOINTS = [{ name: "sm", width: "640px" }];\n',
        },
      ],
    });

    expect(result.errors).toEqual([]);
  });

  it("does not flag arbitrary nonvisual class strings as raw declarations", () => {
    const result = scanRawDesignValues({
      files: [
        {
          filePath: "src/app/_components/dposystem-story.tsx",
          sourceText:
            'export function Story() { return <div className="[scrollbar-width:none] focus-visible:ring-[3px]" />; }\n',
        },
      ],
    });

    expect(result.errors).toEqual([]);
  });
});
