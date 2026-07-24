import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { HorizontalTabs } from "./tabs";

const TABS = [
  { label: "Couples", value: "couples" },
  { label: "Singles", value: "singles" },
];

describe("HorizontalTabs", () => {
  it("renders a real ARIA tablist/tab pattern, not a hand-rolled button group", () => {
    render(
      <HorizontalTabs tabs={TABS} value="couples" onValueChange={vi.fn()} />
    );

    expect(screen.getByRole("tablist")).toBeInTheDocument();
    const tabs = screen.getAllByRole("tab");
    expect(tabs).toHaveLength(2);
    expect(screen.getByRole("tab", { name: "Couples" })).toHaveAttribute(
      "aria-selected",
      "true"
    );
    expect(screen.getByRole("tab", { name: "Singles" })).toHaveAttribute(
      "aria-selected",
      "false"
    );
  });

  it("calls onValueChange when a tab is activated", () => {
    const onValueChange = vi.fn();
    render(
      <HorizontalTabs
        tabs={TABS}
        value="couples"
        onValueChange={onValueChange}
      />
    );

    const singlesTab = screen.getByRole("tab", { name: "Singles" });
    fireEvent.mouseDown(singlesTab, { button: 0 });

    expect(onValueChange).toHaveBeenCalledWith("singles");
  });
});
