import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { GlobalNav } from "./global-nav";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("GlobalNav", () => {
  it("marks placeholder routes and disables their prefetch", () => {
    render(<GlobalNav defaultOpen />);

    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "data-route-status",
      "implemented"
    );
    expect(screen.getByRole("link", { name: "HeartChart Resources" })).toHaveAttribute(
      "data-route-status",
      "implemented"
    );

    const dashboardLink = screen.getByRole("link", { name: "Our Data Dashboard" });
    expect(dashboardLink).toHaveAttribute("data-route-status", "placeholder");
    expect(dashboardLink).toHaveAttribute("data-prefetch", "disabled");

    const trainingLink = screen.getByRole("link", { name: "Training" });
    expect(trainingLink).toHaveAttribute("data-route-status", "placeholder");
    expect(trainingLink).toHaveAttribute("data-prefetch", "disabled");

    expect(screen.getByRole("link", { name: /Marriage Ministry Profile/ })).toHaveAttribute(
      "data-route-status",
      "external"
    );
  });

  it("marks account menu routes as placeholders when the flyout is opened", () => {
    render(<GlobalNav defaultOpen />);

    fireEvent.pointerDown(screen.getByRole("button", { name: /Olivia Rhye/ }));

    const profileLink = screen.getByRole("menuitem", { name: "Personal Profile" });
    expect(profileLink).toHaveAttribute("data-route-status", "placeholder");
    expect(profileLink).toHaveAttribute("data-prefetch", "disabled");
  });
});
