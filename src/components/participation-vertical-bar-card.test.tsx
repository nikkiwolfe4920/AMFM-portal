import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ParticipationVerticalBarCard } from "./participation-vertical-bar-card";

const DATA = [
  { label: "<18", value: 10 },
  { label: "18-24", value: 20 },
];

describe("ParticipationVerticalBarCard", () => {
  it("renders the title and each category's label/value as real text", () => {
    render(
      <ParticipationVerticalBarCard title="Age Groups" icon={<span />} data={DATA} />
    );

    expect(screen.getByText("Age Groups")).toBeInTheDocument();
    expect(screen.getByText("<18")).toBeInTheDocument();
    expect(screen.getByText("18-24")).toBeInTheDocument();
    expect(screen.getByText("10%")).toBeInTheDocument();
    expect(screen.getByText("20%")).toBeInTheDocument();
  });

  it("renders an empty-state message when there is no data", () => {
    render(
      <ParticipationVerticalBarCard title="Age Groups" icon={<span />} data={[]} />
    );

    expect(screen.getByText("No data yet.")).toBeInTheDocument();
  });
});
