import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { SnapshotVideoCard } from "./snapshot-video-card";

describe("SnapshotVideoCard", () => {
  it("renders a static non-interactive design preview when handlers are omitted", () => {
    const { container } = render(
      <SnapshotVideoCard title="Quick Snapshot" description="Some description" />
    );

    expect(screen.getByText("Some description")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Play Quick Snapshot video" })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Next Ministry Steps" })
    ).not.toBeInTheDocument();
    expect(container.firstElementChild).toHaveClass("rounded-xl", "border", "p-6");
    expect(
      container.querySelector("[data-slot='snapshot-video-card-thumbnail']")
    ).toBeInTheDocument();
    expect(screen.getByAltText("")).toHaveAttribute(
      "src",
      "/relationship-health-snapshot-video.png"
    );
  });

  it("calls supplied handlers when play and CTA actions are wired", () => {
    const onPlay = vi.fn();
    const onNextSteps = vi.fn();
    render(
      <SnapshotVideoCard
        title="Quick Snapshot"
        description="Some description"
        onPlay={onPlay}
        onNextSteps={onNextSteps}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Play Quick Snapshot video" }));
    fireEvent.click(screen.getByRole("button", { name: "Next Ministry Steps" }));

    expect(onPlay).toHaveBeenCalledTimes(1);
    expect(onNextSteps).toHaveBeenCalledTimes(1);
  });
});
