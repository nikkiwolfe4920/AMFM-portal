import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { DposystemStory } from "./dposystem-story";

describe("DposystemStory", () => {
  it("keeps the horizontal carousel scroll behavior without exposing native scrollbars", () => {
    render(<DposystemStory />);

    const carousel = screen.getByRole("region", { name: "DPOsystem overview" });
    const track = carousel.querySelector('[data-slot="dposystem-story-track"]');

    expect(track).toHaveClass(
      "overflow-x-auto",
      "[scrollbar-width:none]",
      "[&::-webkit-scrollbar]:hidden"
    );
  });
});
