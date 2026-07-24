import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ParticipationHorizontalBarCard } from "./participation-horizontal-bar-card";

const DATA = [
  { label: "Single", value: 9 },
  { label: "Married", value: 42 },
];

describe("ParticipationHorizontalBarCard", () => {
  it("renders the title and each row's label/value as real text", () => {
    render(
      <ParticipationHorizontalBarCard
        title="Relationship Status"
        icon={<span />}
        data={DATA}
      />
    );

    expect(screen.getByText("Relationship Status")).toBeInTheDocument();
    expect(screen.getByText("Single")).toBeInTheDocument();
    expect(screen.getByText("9%")).toBeInTheDocument();
    expect(screen.getByText("Married")).toBeInTheDocument();
    expect(screen.getByText("42%")).toBeInTheDocument();
  });

  it("renders an empty-state message when there is no data", () => {
    render(
      <ParticipationHorizontalBarCard title="Kids" icon={<span />} data={[]} />
    );

    expect(screen.getByText("No data yet.")).toBeInTheDocument();
  });
});
