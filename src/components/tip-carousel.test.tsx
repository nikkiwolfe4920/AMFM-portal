import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { TipCarousel, type TipCarouselItem } from "./tip-carousel";

const items: TipCarouselItem[] = [
  { title: "Start with personal invites", description: "Invite a few people directly." },
  { title: "Use natural moments", description: "Bring it up in normal ministry rhythms." },
  { title: "Make it easy", description: "Keep the link ready." },
];

describe("TipCarousel", () => {
  it("renders visible tip cards and wraps through next/previous controls", () => {
    const { container } = render(<TipCarousel items={items} ariaLabel="Invitation tips" />);

    expect(screen.getByLabelText("Invitation tips")).toBeInTheDocument();
    expect(container.querySelectorAll("[data-slot='tip-carousel-card']")).toHaveLength(2);
    expect(screen.getByText("Start with personal invites")).toBeInTheDocument();
    expect(screen.getByText("Use natural moments")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Next tip" }));

    expect(screen.getByText("Use natural moments")).toBeInTheDocument();
    expect(screen.getByText("Make it easy")).toBeInTheDocument();
    expect(screen.queryByText("Start with personal invites")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Previous tip" }));

    expect(screen.getByText("Start with personal invites")).toBeInTheDocument();
  });

  it("keeps the second default card hidden until the small breakpoint", () => {
    const { container } = render(<TipCarousel items={items} ariaLabel="Invitation tips" />);
    const cards = container.querySelectorAll("[data-slot='tip-carousel-card']");

    expect(cards[1]).toHaveClass("hidden", "sm:flex");
  });

  it("keeps paging enabled for two default items because mobile shows one card", () => {
    const twoItems = items.slice(0, 2);
    const { container } = render(<TipCarousel items={twoItems} ariaLabel="Invitation tips" />);

    expect(screen.getByRole("button", { name: "Previous tip" })).not.toBeDisabled();
    expect(screen.getByRole("button", { name: "Next tip" })).not.toBeDisabled();
    expect(container.querySelector("[data-slot='tip-carousel-card']")).toHaveTextContent(
      "Start with personal invites"
    );

    fireEvent.click(screen.getByRole("button", { name: "Next tip" }));

    expect(container.querySelector("[data-slot='tip-carousel-card']")).toHaveTextContent(
      "Use natural moments"
    );
  });

  it("disables pagination controls when there is only one visible page", () => {
    render(
      <TipCarousel
        items={[items[0]]}
        ariaLabel="Single invitation tip"
        previousLabel="Previous invitation tip"
        nextLabel="Next invitation tip"
      />
    );

    expect(screen.getByRole("button", { name: "Previous invitation tip" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Next invitation tip" })).toBeDisabled();
  });
});
