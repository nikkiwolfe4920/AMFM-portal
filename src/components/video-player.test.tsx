import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { VideoPlayer } from "./video-player";

describe("VideoPlayer", () => {
  it("renders browser-identifiable media controls when a video source exists", () => {
    render(
      <VideoPlayer
        poster="/login-background.jpg"
        src="/sample-video.mp4"
        title="Sample video"
      />
    );

    expect(document.querySelector("[data-slot='video-player']")).toHaveClass(
      "shadow-media-card"
    );
    expect(document.querySelector("[data-slot='video-player-play-indicator']")).toHaveClass(
      "backdrop-blur-sm"
    );
    expect(document.querySelector("[data-slot='video-player-scrubber-track']")).toHaveClass(
      "backdrop-blur-xs"
    );

    const seek = screen.getByRole("slider", { name: "Seek" });

    expect(seek).toHaveAttribute("id");
    expect(seek).toHaveAttribute("name", "video-seek");
    expect(seek).toHaveAttribute("aria-valuetext", "00:00 of 00:00");
    expect(screen.getByRole("button", { name: "Play video" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Play" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Mute" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Fullscreen" })).toBeInTheDocument();
  });

  it("renders a static poster preview without fake media controls when no source exists", () => {
    render(
      <VideoPlayer
        poster="/login-background.jpg"
        title="Sample video"
        staticDurationLabel="08:24"
      />
    );

    expect(document.querySelector("[data-slot='video-player']")).toHaveClass(
      "shadow-media-card"
    );
    expect(document.querySelector("[data-slot='video-player-play-indicator']")).toHaveClass(
      "backdrop-blur-sm"
    );
    expect(document.querySelector("[data-slot='video-player-static-controls']")).toBeInTheDocument();
    expect(document.querySelector("[data-slot='video-player-scrubber-track']")).toHaveClass(
      "backdrop-blur-xs"
    );
    expect(
      document.querySelector("[data-slot='video-player-static-scrubber-thumb']")
    ).toHaveClass("bg-white");
    expect(screen.getByText("-08:24")).toBeInTheDocument();

    expect(screen.queryByRole("slider", { name: "Seek" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Play video" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Play" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Mute" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Fullscreen" })).not.toBeInTheDocument();
  });

  it("can render a flat surface for modal-embedded media", () => {
    render(
      <VideoPlayer
        poster="/login-background.jpg"
        title="Flat sample video"
        surface="flat"
      />
    );

    expect(document.querySelector("[data-slot='video-player']")).toHaveClass(
      "border-0",
      "shadow-none"
    );
    expect(document.querySelector("[data-slot='video-player']")).not.toHaveClass(
      "shadow-media-card"
    );
  });
});
