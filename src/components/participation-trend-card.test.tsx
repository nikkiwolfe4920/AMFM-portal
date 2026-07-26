import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  ParticipationTrendCard,
  ParticipationTrendChart,
  type ParticipationTrendPoint,
} from "./participation-trend-card";

const points: ParticipationTrendPoint[] = [
  { label: "Mar 23", value: 1 },
  { label: "Mar 30", value: 0 },
  { label: "Apr 5", value: 4 },
  { label: "Apr 12", value: 2 },
  { label: "Apr 19", value: 4 },
];

describe("ParticipationTrendChart", () => {
  it("renders an accessible SVG chart with edge-aligned axis labels", () => {
    const { container } = render(
      <ParticipationTrendChart
        points={points}
        ariaLabel="Daily completions from March 23 through April 19."
        xAxisLabels={["Mar 23", "Apr 5", "Apr 19"]}
      />
    );

    expect(
      screen.getByRole("img", {
        name: "Daily completions from March 23 through April 19.",
      })
    ).toBeInTheDocument();

    const labels = Array.from(
      container.querySelectorAll("[data-slot='participation-trend-axis-label']")
    );
    expect(labels[0]).toHaveTextContent("Mar 23");
    expect(labels[0]).toHaveAttribute("text-anchor", "start");
    expect(labels.at(-1)).toHaveTextContent("Apr 19");
    expect(labels.at(-1)).toHaveAttribute("text-anchor", "end");
  });

  it("keeps high data values inside the chart viewport", () => {
    const { container } = render(
      <ParticipationTrendChart
        points={[
          { label: "Apr 17", value: 1 },
          { label: "Apr 18", value: 10 },
          { label: "Apr 19", value: 3 },
        ]}
        ariaLabel="Daily completions with a spike."
        xAxisLabels={["Apr 17", "Apr 18", "Apr 19"]}
        maxValue={4}
      />
    );

    const yCoordinates = container
      .querySelector("polyline")
      ?.getAttribute("points")
      ?.split(" ")
      .map((coordinate) => Number(coordinate.split(",")[1]));

    expect(yCoordinates).toBeDefined();
    expect(Math.min(...yCoordinates!)).toBeGreaterThanOrEqual(8);
  });
});

describe("ParticipationTrendCard", () => {
  it("pairs the date range, total metric, and trend chart", () => {
    render(
      <ParticipationTrendCard
        dateRange="March 23 – April 19"
        total={62}
        totalLabel="Total this month"
        points={points}
        chartAriaLabel="Daily completions from March 23 through April 19."
        xAxisLabels={["Mar 23", "Apr 5", "Apr 19"]}
      />
    );

    expect(
      screen.getByRole("heading", { name: "March 23 – April 19" })
    ).toBeInTheDocument();
    expect(screen.getByText("62")).toBeInTheDocument();
    expect(screen.getByText("Total this month")).toBeInTheDocument();
  });
});
