import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ScaleChartCard } from "./scale-chart-card";

describe("ScaleChartCard", () => {
  it("renders the percentage, question, and national average as real text", () => {
    render(
      <ScaleChartCard
        percentage={31}
        question="Lack a strong support system?"
        nationalAverage={35}
      />
    );

    expect(screen.getByText("31%")).toBeInTheDocument();
    expect(
      screen.getByText("Lack a strong support system?")
    ).toBeInTheDocument();
    expect(screen.getByText("35% National Average")).toHaveClass(
      "text-chart-label"
    );
  });

  it("renders a fixed 0%/50%/100% scale caption, not a restated national average", () => {
    render(
      <ScaleChartCard
        percentage={31}
        question="Lack a strong support system?"
        nationalAverage={35}
      />
    );

    expect(screen.getByText("0%")).toBeInTheDocument();
    expect(screen.getByText("50%")).toBeInTheDocument();
    expect(screen.getByText("100%")).toBeInTheDocument();
    expect(screen.queryByText(/National Average: 35%/)).not.toBeInTheDocument();
  });

  it("always renders the 'Why does this matter?' action, even without a handler, styled as neutral tertiary text", () => {
    render(
      <ScaleChartCard percentage={10} question="Question" nationalAverage={20} />
    );

    expect(
      screen.getByRole("button", { name: "Why does this matter?" })
    ).toHaveClass("text-text-tertiary");
  });

  it("calls onWhyDoesThisMatter when the action is clicked", () => {
    const onWhyDoesThisMatter = vi.fn();
    render(
      <ScaleChartCard
        percentage={10}
        question="Question"
        nationalAverage={20}
        onWhyDoesThisMatter={onWhyDoesThisMatter}
      />
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Why does this matter?" })
    );

    expect(onWhyDoesThisMatter).toHaveBeenCalledTimes(1);
  });
});
