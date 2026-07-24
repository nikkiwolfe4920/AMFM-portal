import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FooterCta } from "./footer-cta";

describe("FooterCta", () => {
  it("uses the shared reversed outline Button variant for its brand-surface CTA", () => {
    render(
      <FooterCta
        heading="Start using all the tools today."
        ctaLabel="Upgrade to Premium"
      />
    );

    expect(screen.getByRole("button", { name: "Upgrade to Premium" })).toHaveClass(
      "h-[42px]",
      "text-sm",
      "border-button-outline-reversed-border",
      "text-button-outline-reversed-fg",
      "[&>svg]:text-button-outline-reversed-icon",
      "shrink-0"
    );
    expect(screen.getByRole("button", { name: "Upgrade to Premium" })).not.toHaveClass(
      "border-primary-foreground/30",
      "text-primary-foreground",
      "[&>svg]:text-primary-foreground"
    );
  });
});
