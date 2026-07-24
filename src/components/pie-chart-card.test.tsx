import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PieChartCard } from "./pie-chart-card";

const SEGMENTS = [
  { label: "Long-time follower", value: 76, color: "--color-chart-pie-purple-700" },
  { label: "New to following Jesus", value: 9, color: "--color-chart-pie-purple-300" },
];

describe("PieChartCard", () => {
  it("renders the center stat and legend rows as real text, not color alone", () => {
    render(
      <PieChartCard
        title="Faith journey breakdown"
        centerStat="9% of people are new to following Jesus"
        segments={SEGMENTS}
      />
    );

    expect(
      screen.getByText("9% of people are new to following Jesus")
    ).toBeInTheDocument();
    expect(screen.getByText("Long-time follower")).toBeInTheDocument();
    expect(screen.getByText("76%")).toBeInTheDocument();
    expect(screen.getByText("New to following Jesus")).toBeInTheDocument();
    expect(screen.getByText("9%")).toBeInTheDocument();
  });

  it("exposes an accessible (visually-hidden) name for the chart", () => {
    render(
      <PieChartCard
        title="Faith journey breakdown"
        centerStat="Stat"
        segments={SEGMENTS}
      />
    );

    expect(
      screen.getByRole("heading", { name: "Faith journey breakdown" })
    ).toHaveClass("sr-only");
  });
});
