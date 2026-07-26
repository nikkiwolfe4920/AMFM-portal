import { describe, expect, it } from "vitest";

import {
  classifyArbitraryClass,
  extractClassCandidates,
} from "./classify.mjs";

describe("design-system arbitrary class classifier", () => {
  it("flags arbitrary visual values", () => {
    expect(classifyArbitraryClass("gap-[7px]")).toMatchObject({
      kind: "arbitrary-visual-value",
      value: "7px",
    });

    expect(classifyArbitraryClass("bg-[#ffffff]")).toMatchObject({
      kind: "arbitrary-visual-value",
      value: "#ffffff",
    });

    expect(classifyArbitraryClass("shadow-[0_8px_16px_rgba(0,0,0,0.2)]")).toMatchObject({
      kind: "arbitrary-visual-value",
    });

    expect(classifyArbitraryClass("z-[3]")).toMatchObject({
      kind: "arbitrary-visual-value",
      value: "3",
    });

    expect(classifyArbitraryClass("opacity-[0.85]")).toMatchObject({
      kind: "arbitrary-visual-value",
      value: "0.85",
    });

    expect(classifyArbitraryClass("aspect-[4/3]")).toMatchObject({
      kind: "arbitrary-visual-value",
      value: "4/3",
    });

    expect(classifyArbitraryClass("data-[state=open]:gap-[7px]")).toMatchObject({
      kind: "arbitrary-visual-value",
      value: "7px",
    });

    expect(classifyArbitraryClass("aria-[expanded=true]:w-[13px]")).toMatchObject({
      kind: "arbitrary-visual-value",
      value: "13px",
    });

    expect(classifyArbitraryClass("has-[>svg]:grid-cols-[1fr_auto]")).toMatchObject({
      kind: "arbitrary-visual-value",
      value: "1fr_auto",
    });
  });

  it("does not flag bracketed state or selector variants as visual values", () => {
    expect(classifyArbitraryClass("data-[state=open]:animate-in")).toMatchObject({
      kind: "selector-or-state",
    });

    expect(classifyArbitraryClass("has-[>svg]:px-3")).toMatchObject({
      kind: "selector-or-state",
    });
  });

  it("extracts class candidates from common className strings", () => {
    expect(
      extractClassCandidates('className="grid gap-[7px] data-[state=open]:animate-in"')
    ).toEqual(expect.arrayContaining(["gap-[7px]", "data-[state=open]:animate-in"]));
  });

  it("trims punctuation that is adjacent to extracted class candidates", () => {
    expect(
      extractClassCandidates('const examples = ["(blur-[2px],", "gap-[7px])"];')
    ).toEqual(["blur-[2px]", "gap-[7px]"]);
  });

  it("extracts arbitrary class candidates from variant and helper string literals", () => {
    expect(
      extractClassCandidates(
        'const button = cva("inline-flex h-[46px]", { variants: { size: { sm: "h-[42px]" } } });'
      )
    ).toEqual(expect.arrayContaining(["h-[46px]", "h-[42px]"]));
  });

  it("does not extract arbitrary-looking values from obvious prose strings", () => {
    expect(
      extractClassCandidates(
        'const helperText = "Use gap-[7px] here only when documenting a bad export.";'
      )
    ).toEqual([]);

    expect(extractClassCandidates('const classList = "grid gap-[7px]";')).toEqual([
      "gap-[7px]",
    ]);
  });

  it("extracts arbitrary candidates from class lists with common bare Tailwind utilities", () => {
    expect(extractClassCandidates('className="border rounded shadow gap-[7px]"')).toEqual([
      "gap-[7px]",
    ]);
  });

  it("does not extract class candidates from comments", () => {
    expect(
      extractClassCandidates(
        '/* Figma exports "backdrop-blur-[20px]" but this comment is not implementation code. */\nconst card = "gap-2";'
      )
    ).not.toContain("backdrop-blur-[20px]");
  });
});
