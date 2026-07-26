import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { DashboardContent } from "./dashboard-content";

describe("DashboardContent", () => {
  it("uses the named participation-profile grid ratio from the dashboard Figma frame", () => {
    render(<DashboardContent />);

    const grid = screen
      .getByText("Age Groups")
      .closest("[data-slot='dashboard-participation-profile-grid']");

    expect(grid).toHaveClass("lg:grid-cols-dashboard-participation");
  });

  it("uses the named relationship-health grid ratio from the dashboard Figma frame", () => {
    const { container } = render(<DashboardContent />);

    const grid = container.querySelector("[data-slot='dashboard-relationship-health-grid']");

    expect(grid).toHaveClass("lg:grid-cols-dashboard-relationship-health");
  });
});
