import { describe, expect, it } from "vitest";

import { formatHumanReport } from "./report.mjs";

describe("design-system checker report", () => {
  it("prints a concise actionable failure summary", () => {
    const report = formatHumanReport({
      mode: "changed",
      filesChecked: ["src/components/example-card.tsx"],
      sourceFilesScanned: ["src/components/example-card.tsx"],
      errors: [
        {
          rule: "no-undocumented-arbitrary-visual-values",
          filePath: "src/components/example-card.tsx",
          className: "gap-[7px]",
          message: "gap-[7px] is undocumented.",
        },
      ],
      exceptions: [],
    });

    expect(report).toContain("Design system check failed");
    expect(report).toContain("no-undocumented-arbitrary-visual-values");
    expect(report).toContain("src/components/example-card.tsx");
    expect(report).toContain("gap-[7px]");
  });
});
