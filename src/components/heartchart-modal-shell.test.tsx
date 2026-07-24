import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HeartChartModalShell } from "./heartchart-modal-shell";

describe("HeartChartModalShell", () => {
  it("opens a titled modal shell with reusable body and footer slots", () => {
    render(
      <HeartChartModalShell
        title="Quick Tip"
        description="Video resource: Quick Tip."
        trigger={<button type="button">Open quick tip</button>}
        headerContent={<p>Optional header content</p>}
        footer={<button type="button">Go to resources</button>}
      >
        <p>Growing Momentum</p>
      </HeartChartModalShell>
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Open quick tip" }));

    const dialog = screen.getByRole("dialog", { name: "Quick Tip" });
    const body = within(dialog)
      .getByText("Growing Momentum")
      .closest("[data-slot='heartchart-modal-body']");
    const footer = within(dialog)
      .getByRole("button", { name: "Go to resources" })
      .closest("[data-slot='heartchart-modal-footer']");
    const primitiveFooter = within(dialog)
      .getByRole("button", { name: "Go to resources" })
      .closest("[data-slot='dialog-footer']");

    expect(within(dialog).getByRole("heading", { name: "Quick Tip" })).toBeInTheDocument();
    expect(within(dialog).getByText("Video resource: Quick Tip.")).toHaveClass("sr-only");
    expect(within(dialog).getByText("Optional header content")).toBeInTheDocument();
    expect(body).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
    expect(primitiveFooter).toBeInTheDocument();
    expect(primitiveFooter).toHaveClass("items-center", "sm:items-center", "sm:justify-end");
    expect(within(dialog).getByRole("button", { name: "Go to resources" })).toBeInTheDocument();
    expect(within(dialog).getByRole("button", { name: "Close" })).toBeInTheDocument();
  });

  it("maps Figma modal widths and overlay treatment at the shell boundary", () => {
    render(
      <HeartChartModalShell
        title="HeartChart link"
        trigger={<button type="button">Open link modal</button>}
        size="xl"
      >
        <p>Shareable link</p>
      </HeartChartModalShell>
    );

    fireEvent.click(screen.getByRole("button", { name: "Open link modal" }));

    const dialog = screen.getByRole("dialog", { name: "HeartChart link" });
    const overlay = document.querySelector("[data-slot='dialog-overlay']");

    expect(dialog).toHaveClass("sm:max-w-[800px]");
    expect(overlay).toHaveClass("bg-overlay/85", "backdrop-blur-[8px]");
  });

  it("moves initial focus to the modal title instead of the first body control", () => {
    render(
      <HeartChartModalShell
        title="Share your HeartChart link"
        trigger={<button type="button">Open link modal</button>}
      >
        <label htmlFor="share-url">Your unique HeartChart URL</label>
        <input id="share-url" readOnly value="https://myhc.com/abcdefg" />
      </HeartChartModalShell>
    );

    fireEvent.click(screen.getByRole("button", { name: "Open link modal" }));

    const dialog = screen.getByRole("dialog", { name: "Share your HeartChart link" });

    expect(
      within(dialog).getByRole("heading", { name: "Share your HeartChart link" })
    ).toHaveFocus();
    expect(
      within(dialog).getByRole("textbox", { name: "Your unique HeartChart URL" })
    ).not.toHaveFocus();
  });

  it("supports plain modals and divider-free headers without changing content slots", () => {
    render(
      <HeartChartModalShell
        title="Quick Start Guide"
        trigger={<button type="button">Open quick start</button>}
        size="lg"
        framed={false}
        showDivider={false}
      >
        <div data-testid="quick-start-video">Video</div>
      </HeartChartModalShell>
    );

    fireEvent.click(screen.getByRole("button", { name: "Open quick start" }));

    const dialog = screen.getByRole("dialog", { name: "Quick Start Guide" });

    expect(dialog).toHaveClass("sm:max-w-[768px]");
    expect(dialog).toHaveClass("grid-rows-[auto_minmax(0,1fr)_auto]");
    expect(dialog.querySelector("[data-slot='heartchart-modal-frame']")).not.toBeInTheDocument();
    expect(dialog.querySelector("[data-slot='heartchart-modal-divider']")).not.toBeInTheDocument();
    expect(within(dialog).getByTestId("quick-start-video")).toBeInTheDocument();
  });

  it("caps tall modal content and scrolls the body slot intentionally", () => {
    render(
      <HeartChartModalShell
        title="Last 4 weeks"
        trigger={<button type="button">Open chart modal</button>}
        footer={<button type="button">Done</button>}
      >
        <div style={{ height: 2000 }}>Tall chart content</div>
      </HeartChartModalShell>
    );

    fireEvent.click(screen.getByRole("button", { name: "Open chart modal" }));

    const dialog = screen.getByRole("dialog", { name: "Last 4 weeks" });
    const frame = dialog.querySelector("[data-slot='heartchart-modal-frame']");
    const body = within(dialog)
      .getByText("Tall chart content")
      .closest("[data-slot='heartchart-modal-body']");

    expect(dialog).toHaveClass("max-h-[calc(100vh-2rem)]", "grid-rows-[auto_auto_minmax(0,1fr)_auto]");
    expect(frame).toHaveClass("max-h-[calc(100vh-3rem)]", "grid", "grid-rows-[auto_auto_minmax(0,1fr)_auto]");
    expect(body).toHaveClass("min-h-0", "overflow-y-auto");
  });
});
