import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FullWidthBarChart } from "./full-width-bar-chart";

describe("FullWidthBarChart", () => {
  it("renders each zone's label and percentage as real text", () => {
    render(
      <FullWidthBarChart
        data={[
          { label: "Thriving", value: 33 },
          { label: "Broken", value: 3 },
        ]}
      />
    );

    expect(screen.getByText("Thriving")).toBeInTheDocument();
    expect(screen.getByText("33%")).toBeInTheDocument();
    expect(screen.getByText("Broken")).toBeInTheDocument();
    expect(screen.getByText("3%")).toBeInTheDocument();
  });

  it("renders a top percentage axis scaled to 6 nice intervals above the max value", () => {
    render(
      <FullWidthBarChart
        data={[
          { label: "Strong", value: 23 },
          { label: "Broken", value: 3 },
        ]}
      />
    );

    // max 23 -> step 5 -> axis 0/5%/10%/15%/20%/25%/30%, matching the
    // confirmed Figma reference (node 1243:23077) for this same dataset.
    expect(screen.getByText("0")).toBeInTheDocument();
    for (const tick of ["5%", "10%", "15%", "20%", "25%", "30%"]) {
      expect(screen.getByText(tick)).toBeInTheDocument();
    }
  });

  it("renders an empty-state message when there is no data", () => {
    render(<FullWidthBarChart data={[]} />);

    expect(screen.getByText("No data yet.")).toBeInTheDocument();
  });
});
