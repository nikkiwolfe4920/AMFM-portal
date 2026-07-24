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

  it("renders an empty-state message when there is no data", () => {
    render(<FullWidthBarChart data={[]} />);

    expect(screen.getByText("No data yet.")).toBeInTheDocument();
  });
});
