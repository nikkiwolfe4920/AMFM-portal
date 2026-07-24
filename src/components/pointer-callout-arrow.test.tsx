import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PointerCalloutArrow } from "./pointer-callout-arrow";

describe("PointerCalloutArrow", () => {
  it("renders the emphasized phrase and supporting text", () => {
    render(
      <PointerCalloutArrow
        side="left"
        emphasis="HeartChart"
        text="shows your people where they are."
      />
    );

    expect(screen.getByText("HeartChart")).toBeInTheDocument();
    expect(
      screen.getByText(/shows your people where they are\./)
    ).toBeInTheDocument();
  });

  it("uses the left-pointing arrow asset for side='left'", () => {
    const { container } = render(
      <PointerCalloutArrow side="left" emphasis="HeartChart" text="shows your people where they are." />
    );

    const arrow = container.querySelector('img[aria-hidden="true"]');
    expect(arrow).toHaveAttribute("src", expect.stringContaining("Arrowup-left.svg"));
  });

  it("uses the right-pointing arrow asset for side='right'", () => {
    const { container } = render(
      <PointerCalloutArrow side="right" emphasis="WeDo" text="helps them get where they want to go." />
    );

    const arrow = container.querySelector('img[aria-hidden="true"]');
    expect(arrow).toHaveAttribute("src", expect.stringContaining("Arrowup-right.svg"));
  });

  it("marks the arrow graphic as decorative", () => {
    const { container } = render(
      <PointerCalloutArrow side="left" emphasis="HeartChart" text="shows your people where they are." />
    );

    expect(container.querySelector('img[aria-hidden="true"]')).toHaveAttribute("alt", "");
  });
});
