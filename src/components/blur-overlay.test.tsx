import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { BlurOverlay } from "./blur-overlay";

describe("BlurOverlay", () => {
  it("keeps decorative content inert without lowering text contrast through opacity", () => {
    render(
      <BlurOverlay>
        <p>Decorative content</p>
      </BlurOverlay>
    );

    const root = document.querySelector("[data-slot='blur-overlay']");
    const content = document.querySelector("[data-slot='blur-overlay-content']");

    expect(root).toHaveAttribute("aria-hidden", "true");
    expect(content).toHaveClass("pointer-events-none", "blur-[2px]", "select-none");
    expect(content).not.toHaveClass("opacity-30");
    expect(screen.getByText("Decorative content")).toBeInTheDocument();
  });
});
