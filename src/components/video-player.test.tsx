import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { VideoPlayer } from "./video-player";

describe("VideoPlayer", () => {
  it("renders a browser-identifiable seek control with an accessible label", () => {
    render(<VideoPlayer poster="/login-background.jpg" title="Sample video" />);

    const seek = screen.getByRole("slider", { name: "Seek" });

    expect(seek).toHaveAttribute("id");
    expect(seek).toHaveAttribute("name", "video-seek");
    expect(seek).toHaveAttribute("aria-valuetext", "00:00 of 00:00");
  });
});
