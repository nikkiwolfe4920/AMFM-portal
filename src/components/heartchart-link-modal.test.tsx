import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { HeartChartLinkModal } from "./heartchart-link-modal";

describe("HeartChartLinkModal", () => {
  it("composes the HeartChart link design from the shared shell and link card", () => {
    render(
      <HeartChartLinkModal
        trigger={<button type="button">Share Your Link</button>}
        url="https://myhc.com/abcdefg"
        qrImageSrc="/heartchart-link-qr.svg"
        onCopyUrl={vi.fn()}
        onShareUrl={vi.fn()}
        onDownloadQr={vi.fn()}
        onAddCampus={vi.fn()}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Share Your Link" }));

    const dialog = screen.getByRole("dialog", { name: "Share your HeartChart link" });

    expect(dialog).toHaveClass("sm:max-w-[800px]");
    expect(within(dialog).getByText(/Share these unique links or QR codes/)).toBeInTheDocument();
    expect(within(dialog).getByText("Quick tip:")).toBeInTheDocument();
    expect(
      within(dialog).queryByRole("link", { name: "Upload your logo in settings" })
    ).not.toBeInTheDocument();
    expect(dialog.querySelector("[data-slot='heartchart-link-card']")).toBeInTheDocument();
    expect(within(dialog).getByRole("textbox", { name: "Your unique HeartChart URL" })).toHaveValue(
      "https://myhc.com/abcdefg"
    );
    expect(within(dialog).getByRole("img", { name: "QR code for HeartChart URL" })).toHaveAttribute(
      "src",
      expect.stringContaining("/heartchart-link-qr.svg")
    );
    expect(
      dialog
        .querySelector("[data-slot='heartchart-brand-preview']")
        ?.querySelector("img")
    ).toHaveAttribute("src", expect.stringContaining("/heartchart-link-phone-preview.png"));
    expect(within(dialog).getByRole("button", { name: "Add a campus" })).toHaveClass(
      "text-sm",
      "py-1.5"
    );
  });

  it("does not show the demo QR asset unless a matching QR source is supplied", () => {
    render(
      <HeartChartLinkModal
        trigger={<button type="button">Open modal</button>}
        url="https://myhc.com/real-campus"
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Open modal" }));

    expect(
      screen.getByRole("img", { name: "QR code for HeartChart URL" })
    ).not.toHaveAttribute("src");
  });

  it("disables callback-owned actions when handlers are not supplied", () => {
    render(
      <HeartChartLinkModal
        trigger={<button type="button">Open modal</button>}
        url="https://myhc.com/abcdefg"
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Open modal" }));

    expect(screen.getByRole("button", { name: "Copy HeartChart URL" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Share HeartChart URL" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Download QR code" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Add a campus" })).toBeDisabled();
  });

  it("renders the settings CTA only when a caller-supplied destination is provided", () => {
    render(
      <HeartChartLinkModal
        trigger={<button type="button">Open modal</button>}
        url="https://myhc.com/abcdefg"
        settingsHref="https://example.com/settings"
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Open modal" }));

    const settingsLink = screen.getByRole("link", { name: "Upload your logo in settings" });

    expect(settingsLink).toHaveAttribute("href", "https://example.com/settings");
    expect(settingsLink).toHaveAttribute("data-slot", "button");
    expect(settingsLink).toHaveClass("text-text-brand", "px-0", "py-0");
  });

  it("wraps caller-supplied preview content as decorative desktop-only content", () => {
    render(
      <HeartChartLinkModal
        trigger={<button type="button">Open modal</button>}
        url="https://myhc.com/abcdefg"
        preview={<div data-testid="custom-preview">Custom preview</div>}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Open modal" }));

    const previewSlot = screen
      .getByTestId("custom-preview")
      .closest("[data-slot='heartchart-link-modal-preview']");

    expect(previewSlot).toHaveAttribute("aria-hidden", "true");
    expect(previewSlot).toHaveClass("hidden", "md:block");
  });

  it("delegates modal actions without owning side effects", () => {
    const onAddCampus = vi.fn();
    const onCopy = vi.fn();
    const onShare = vi.fn();
    const onDownloadQr = vi.fn();

    render(
      <HeartChartLinkModal
        trigger={<button type="button">Open modal</button>}
        url="https://myhc.com/abcdefg"
        onAddCampus={onAddCampus}
        onCopyUrl={onCopy}
        onShareUrl={onShare}
        onDownloadQr={onDownloadQr}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Open modal" }));
    fireEvent.click(screen.getByRole("button", { name: "Copy HeartChart URL" }));
    fireEvent.click(screen.getByRole("button", { name: "Share HeartChart URL" }));
    fireEvent.click(screen.getByRole("button", { name: "Download QR code" }));
    fireEvent.click(screen.getByRole("button", { name: "Add a campus" }));

    expect(onCopy).toHaveBeenCalledTimes(1);
    expect(onShare).toHaveBeenCalledTimes(1);
    expect(onDownloadQr).toHaveBeenCalledTimes(1);
    expect(onAddCampus).toHaveBeenCalledTimes(1);
  });
});
