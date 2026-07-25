import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { StatusSnapshotCard } from "./status-snapshot-card";

const DATA = [
  { label: "Single", value: 9 },
  { label: "Married", value: 42 },
];

describe("StatusSnapshotCard", () => {
  it("renders the title and each row's label/value as real text", () => {
    render(
      <StatusSnapshotCard variant="relationship" title="Relationship Status" data={DATA} />
    );

    expect(screen.getByText("Relationship Status")).toBeInTheDocument();
    expect(screen.getByText("Single")).toBeInTheDocument();
    expect(screen.getByText("9%")).toBeInTheDocument();
    expect(screen.getByText("Married")).toBeInTheDocument();
    expect(screen.getByText("42%")).toBeInTheDocument();
  });

  it("renders the kids variant with its own icon and title", () => {
    const { container } = render(<StatusSnapshotCard variant="kids" title="Kids" data={DATA} />);

    expect(screen.getByText("Kids")).toBeInTheDocument();
    const icon = container.querySelector('img[aria-hidden="true"]');
    expect(icon).toHaveAttribute("src", expect.stringContaining("kids-icon.svg"));
  });

  it("renders an empty-state message when there is no data", () => {
    render(<StatusSnapshotCard variant="relationship" title="Relationship Status" data={[]} />);

    expect(screen.getByText("No data yet.")).toBeInTheDocument();
  });
});
