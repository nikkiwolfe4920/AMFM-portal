import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { SnapshotVideoCard } from "./snapshot-video-card";

describe("SnapshotVideoCard", () => {
  it("renders the title, description, and a labelled play affordance", () => {
    render(
      <SnapshotVideoCard title="Quick Snapshot" description="Some description" />
    );

    expect(screen.getByText("Some description")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Play Quick Snapshot video" })
    ).toBeInTheDocument();
  });

  it("calls onNextSteps when the CTA is clicked", () => {
    const onNextSteps = vi.fn();
    render(
      <SnapshotVideoCard
        title="Quick Snapshot"
        description="Some description"
        onNextSteps={onNextSteps}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Next Ministry Steps" }));

    expect(onNextSteps).toHaveBeenCalledTimes(1);
  });
});
