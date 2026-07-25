import { describe, expect, it } from "vitest";

import { scanRawDesignValues } from "./raw-values.mjs";

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
});
