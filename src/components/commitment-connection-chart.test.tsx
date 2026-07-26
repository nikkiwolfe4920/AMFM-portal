import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CommitmentConnectionChart } from "./commitment-connection-chart";

describe("CommitmentConnectionChart", () => {
  it("renders the highlighted zone and every zone label as real text", () => {
    const { container } = render(
      <CommitmentConnectionChart
        responseCount={1}
        highlightedZone="Steady"
        zoneLabels={{ thriving: "Thriving", broken: "Broken" }}
      />
    );

    expect(screen.getByText("Steady")).toBeInTheDocument();
    expect(screen.getByText("Thriving")).toBeInTheDocument();
    expect(screen.getByText("Broken")).toBeInTheDocument();
    expect(container.querySelector("[data-slot='commitment-connection-chart']")).toHaveAttribute(
      "role",
      "img"
    );
  });

  it("uses the verified Figma scattergram asset with an accessible chart summary", () => {
    const { container } = render(
      <CommitmentConnectionChart
        responseCount={1}
        highlightedZone="Steady"
        zoneLabels={{ thriving: "Thriving" }}
      />
    );

    const chart = container.querySelector("[data-slot='commitment-connection-chart']");
    const image = screen.getByAltText("");

    expect(chart).toHaveAccessibleName(/1 plotted response/i);
    expect(image).toHaveAttribute("src", "/relationship-health-scattergram.png");
  });
});
