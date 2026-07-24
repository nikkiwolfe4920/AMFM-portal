import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { TopHero } from "./top-hero";

describe("TopHero", () => {
  it("pins the CTA to the Figma default-sized outline Button contract", () => {
    render(
      <TopHero
        eyebrowHeading="Let's prepare for your"
        highlightHeading="HeartChart Weekend"
        description="Three simple steps to get your people engaged."
        ctaLabel="Watch the Overview"
        onCtaClick={vi.fn()}
      />
    );

    expect(screen.getByRole("button", { name: "Watch the Overview" })).toHaveClass(
      "border-button-outline-border",
      "text-button-outline-fg",
      "h-[46px]",
      "text-base"
    );
  });
});
