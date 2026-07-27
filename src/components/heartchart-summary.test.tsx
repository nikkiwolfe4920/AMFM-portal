import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { HeartChartSummary } from "./heartchart-summary";

describe("HeartChartSummary", () => {
  it("defaults to the constrained standalone card width", () => {
    const { container } = render(
      <HeartChartSummary
        percentage={58}
        completedCount={230}
        totalAttenders={800}
      />
    );

    expect(container.firstElementChild).toHaveClass("max-w-heartchart-card");
  });

  it("can render fluid width when the parent grid owns sizing", () => {
    const { container } = render(
      <HeartChartSummary
        width="fluid"
        percentage={58}
        completedCount={230}
        totalAttenders={800}
      />
    );

    expect(container.firstElementChild).not.toHaveClass("max-w-heartchart-card");
  });

  it("uses the shared outline Button contract for summary actions", () => {
    render(
      <HeartChartSummary
        percentage={58}
        completedCount={230}
        totalAttenders={800}
        onQuickTip={vi.fn()}
        onViewLastFourWeeks={vi.fn()}
        onShareLink={vi.fn()}
      />
    );

    for (const name of ["Quick Tip", "Last 4 Weeks", "Share Your Link"]) {
      expect(screen.getByRole("button", { name })).toHaveClass(
        "h-9.5",
        "text-sm",
        "border-button-outline-border",
        "text-button-outline-fg",
        "[&>svg]:text-button-outline-icon"
      );
      expect(screen.getByRole("button", { name })).not.toHaveClass(
        "text-muted-foreground"
      );
    }
  });

  it("uses the supporting-copy token for the participation-level eyebrow", () => {
    render(
      <HeartChartSummary
        percentage={58}
        completedCount={230}
        totalAttenders={800}
      />
    );

    expect(screen.getByText("CHURCH-WIDE PARTICIPATION LEVEL")).toHaveClass(
      "text-text-tertiary"
    );
  });

  it("mirrors the donut ring so its value arc sweeps counter-clockwise from 12 o'clock, matching Figma", () => {
    const { container } = render(
      <HeartChartSummary
        percentage={58}
        completedCount={230}
        totalAttenders={800}
      />
    );

    const donutSvg = container.querySelector("svg");
    expect(donutSvg).toHaveClass("rotate-90", "-scale-x-100");
  });
});
