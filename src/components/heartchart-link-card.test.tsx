import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { HeartChartLinkCard } from "./heartchart-link-card";

describe("HeartChartLinkCard", () => {
  it("renders a labelled read-only HeartChart URL with QR and actions", () => {
    render(
      <HeartChartLinkCard
        url="https://myhc.com/abcdefg"
        qrImageSrc="/heartchart-logo.svg"
        onCopy={vi.fn()}
        onShare={vi.fn()}
        onDownloadQr={vi.fn()}
      />
    );

    const url = screen.getByRole("textbox", { name: "Your unique HeartChart URL" });

    expect(document.querySelector("[data-slot='heartchart-link-card']")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "QR code for HeartChart URL" })).toBeInTheDocument();
    expect(url).toHaveValue("https://myhc.com/abcdefg");
    expect(url).toHaveAttribute("readonly");
    expect(url).toHaveAttribute("title", "https://myhc.com/abcdefg");
    expect(url).toHaveClass("truncate");
    expect(screen.getByRole("button", { name: "Copy HeartChart URL" })).toBeInTheDocument();
    expect(
      screen
        .getByRole("button", { name: "Share HeartChart URL" })
        .querySelector("svg")
    ).toHaveClass("lucide-external-link");
    expect(screen.getByRole("button", { name: "Copy HeartChart URL" })).toHaveClass(
      "border-l",
      "border-y-0",
      "border-r-0",
      "shadow-none"
    );
    expect(screen.getByRole("button", { name: "Copy HeartChart URL" })).not.toHaveClass(
      "shadow-button-inset"
    );
    expect(screen.getByRole("button", { name: "Download QR code" })).toHaveClass(
      "h-11",
      "shadow-xs"
    );
    expect(screen.getByRole("button", { name: "Download QR code" })).not.toHaveClass(
      "shadow-button-inset"
    );
  });

  it("centers the QR preview and download button in the stacked compact layout", () => {
    render(<HeartChartLinkCard url="https://myhc.com/abcdefg" />);

    const card = document.querySelector("[data-slot='heartchart-link-card']");
    const qr = document.querySelector("[data-slot='heartchart-link-qr']");
    const urlGroup = document
      .querySelector("[data-slot='heartchart-link-url-control']")
      ?.parentElement;
    const actions = document.querySelector("[data-slot='heartchart-link-actions']");
    const share = screen.getByRole("button", { name: "Share HeartChart URL" });
    const download = screen.getByRole("button", { name: "Download QR code" });

    expect(card).toHaveClass("relative", "items-center", "sm:flex-row");
    expect(qr).toHaveClass("self-center", "sm:self-auto");
    expect(urlGroup).toHaveClass("w-full", "sm:w-auto");
    expect(actions).toHaveClass(
      "flex",
      "w-full",
      "justify-center",
      "gap-1",
      "min-[360px]:grid",
      "min-[360px]:grid-cols-[1fr_auto_1fr]",
      "sm:flex",
      "sm:self-stretch",
      "sm:items-end"
    );
    expect(actions).not.toHaveClass("sm:h-[66px]");
    expect(document.querySelector("[data-slot='heartchart-link-url-control']")).toHaveClass(
      "h-11"
    );
    expect(share).toHaveClass("justify-self-end");
    expect(download).toHaveClass("justify-self-center");
    expect(download).toHaveClass("h-11");
  });

  it("disables action buttons when callbacks are not supplied", () => {
    render(<HeartChartLinkCard url="https://myhc.com/abcdefg" />);

    expect(screen.getByRole("button", { name: "Copy HeartChart URL" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Share HeartChart URL" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Download QR code" })).toBeDisabled();
  });

  it("positions the desktop share affordance outside the URL/download row", () => {
    render(<HeartChartLinkCard url="https://myhc.com/abcdefg" />);

    expect(screen.getByRole("button", { name: "Share HeartChart URL" })).toHaveClass(
      "sm:absolute",
      "sm:top-3",
      "sm:right-5"
    );
  });

  it("delegates copy, share, and QR download actions to callers", () => {
    const onCopy = vi.fn();
    const onShare = vi.fn();
    const onDownloadQr = vi.fn();

    render(
      <HeartChartLinkCard
        url="https://myhc.com/abcdefg"
        onCopy={onCopy}
        onShare={onShare}
        onDownloadQr={onDownloadQr}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Copy HeartChart URL" }));
    fireEvent.click(screen.getByRole("button", { name: "Share HeartChart URL" }));
    fireEvent.click(screen.getByRole("button", { name: "Download QR code" }));

    expect(onCopy).toHaveBeenCalledTimes(1);
    expect(onShare).toHaveBeenCalledTimes(1);
    expect(onDownloadQr).toHaveBeenCalledTimes(1);
  });
});
