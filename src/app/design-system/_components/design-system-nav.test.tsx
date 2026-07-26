import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { DesignSystemNav } from "./design-system-nav";

const mockPathname = vi.hoisted(() => ({ value: "/design-system" }));

vi.mock("next/navigation", () => ({
  usePathname: () => mockPathname.value,
}));

describe("DesignSystemNav", () => {
  it("marks Overview active only on the design-system root", () => {
    mockPathname.value = "/design-system";

    render(<DesignSystemNav />);

    expect(screen.getByRole("link", { name: "Overview" })).toHaveAttribute(
      "aria-current",
      "page"
    );
    expect(screen.getByRole("link", { name: "Components" })).not.toHaveAttribute(
      "aria-current"
    );
  });

  it("keeps the parent section active for nested design-system pages", () => {
    mockPathname.value = "/design-system/components/heart-chart";

    render(<DesignSystemNav />);

    expect(screen.getByRole("link", { name: "Components" })).toHaveAttribute(
      "aria-current",
      "page"
    );
    expect(screen.getByRole("link", { name: "Overview" })).not.toHaveAttribute(
      "aria-current"
    );
  });
});
