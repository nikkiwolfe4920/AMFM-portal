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

  it("preserves the SVG asset ratio when scaling the decorative arrow", () => {
    const { container } = render(
      <PointerCalloutArrow side="left" emphasis="HeartChart" text="shows your people where they are." />
    );

    const arrow = container.querySelector('img[aria-hidden="true"]');
    expect(arrow).toHaveAttribute("width", "59");
    expect(arrow).toHaveAttribute("height", "58");
    expect(arrow).toHaveClass("h-11", "w-auto");
  });

  it("renders the emphasized phrase at regular weight in the foreground color", () => {
    render(
      <PointerCalloutArrow side="left" emphasis="HeartChart" text="shows your people where they are." />
    );

    const emphasis = screen.getByText("HeartChart");
    expect(emphasis).toHaveClass("font-normal", "text-foreground");
  });

  it("renders the trailing text at light weight in the muted tertiary color", () => {
    render(
      <PointerCalloutArrow side="left" emphasis="HeartChart" text="shows your people where they are." />
    );

    const text = screen.getByText("shows your people where they are.");
    expect(text).toHaveClass("font-light");
    const paragraph = text.closest("p");
    expect(paragraph).toHaveClass("text-text-tertiary", "text-xl", "leading-display-sm");
  });
});
