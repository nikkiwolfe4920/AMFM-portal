import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CommitmentConnectionChart } from "./commitment-connection-chart";

describe("CommitmentConnectionChart", () => {
  it("renders the highlighted zone and every zone label as real text", () => {
    render(
      <CommitmentConnectionChart
        dataPoints={[{ commitment: 60, connection: 55 }]}
        highlightedZone="Steady"
        zoneLabels={{ thriving: "Thriving", broken: "Broken" }}
      />
    );

    expect(screen.getByText("Steady")).toBeInTheDocument();
    expect(screen.getByText("Thriving")).toBeInTheDocument();
    expect(screen.getByText("Broken")).toBeInTheDocument();
  });

  it("marks the scatter plot SVG as decorative", () => {
    const { container } = render(
      <CommitmentConnectionChart
        dataPoints={[]}
        highlightedZone="Steady"
        zoneLabels={{ thriving: "Thriving" }}
      />
    );

    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });
});
