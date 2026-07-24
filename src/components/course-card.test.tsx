import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { CourseCard } from "./course-card";

describe("CourseCard", () => {
  it("uses a contrast-safe step-one header with white text matching Steps 2/3", () => {
    render(
      <CourseCard
        step={1}
        eyebrow="Before the weekend service"
        title="Get Your Team Ready"
        videoCtaLabel="See How It Works"
        checklist={["Share your QR code and link"]}
      />
    );

    const header = document.querySelector("[data-slot='course-card-step-header']");

    expect(header).toHaveClass("bg-brand-700", "text-white");
    expect(screen.getByText("STEP 1")).toBeInTheDocument();
  });

  it("uses the shared neutral Figma button treatment for the video CTA", () => {
    render(
      <CourseCard
        step={1}
        eyebrow="Before the weekend service"
        title="Get Your Team Ready"
        videoCtaLabel="See How It Works"
        onWatchVideo={vi.fn()}
        checklist={["Share your QR code and link"]}
      />
    );

    const cta = screen.getByRole("button", { name: "See How It Works" });

    expect(cta).toHaveClass(
      "shadow-xs",
      "text-button-outline-fg",
      "gap-1.5",
      "h-[38px]",
      "text-sm",
      "[&>svg:not([class*='size-'])]:size-5"
    );
    expect(cta).not.toHaveClass("shadow-button-inset");
  });
});
