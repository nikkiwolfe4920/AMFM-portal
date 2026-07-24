import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { WeDoCard } from "./we-do-card";

describe("WeDoCard", () => {
  it("renders the couple count, quote, and action buttons", () => {
    render(
      <WeDoCard coupleCount={363} quote="Test quote" onSeeResults={vi.fn()} onShareCode={vi.fn()} />
    );

    expect(screen.getByText("363")).toBeInTheDocument();
    expect(screen.getByText(/Test quote/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "See Results" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Share Your Code" })).toBeInTheDocument();
  });

  it("calls the optional callbacks when actions are clicked", () => {
    const onSeeResults = vi.fn();
    const onShareCode = vi.fn();
    render(
      <WeDoCard
        coupleCount={1}
        quote="Test quote"
        onSeeResults={onSeeResults}
        onShareCode={onShareCode}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "See Results" }));
    fireEvent.click(screen.getByRole("button", { name: "Share Your Code" }));

    expect(onSeeResults).toHaveBeenCalledTimes(1);
    expect(onShareCode).toHaveBeenCalledTimes(1);
  });

  it("singularizes the couple label for a count of 1", () => {
    render(<WeDoCard coupleCount={1} quote="Test quote" />);

    expect(screen.getByText("Couple")).toBeInTheDocument();
  });

  it("highlights the given phrase within the quote", () => {
    render(
      <WeDoCard
        coupleCount={363}
        quote="When it comes to being a listener, I would rate myself: Excellent."
        highlightedPhrase="being a listener"
      />
    );

    const highlighted = screen.getByText("being a listener");
    expect(highlighted.tagName).toBe("SPAN");
    expect(screen.getByText(/I would rate myself: Excellent/)).toBeInTheDocument();
  });

  it("renders the quote plainly when the highlighted phrase isn't found", () => {
    render(<WeDoCard coupleCount={363} quote="Test quote" highlightedPhrase="missing phrase" />);

    expect(screen.getByText("Test quote", { exact: false })).toBeInTheDocument();
  });

  it("renders a decorative quotation mark above the pull-quote", () => {
    const { container } = render(<WeDoCard coupleCount={363} quote="Test quote" />);

    const quoteMark = container.querySelector('svg[aria-hidden="true"]');
    expect(quoteMark).not.toBeNull();
  });

  it("shows the default quote source and omits the next-pulse label when not provided", () => {
    render(<WeDoCard coupleCount={363} quote="Test quote" />);

    expect(screen.getByText(/Your Current WeDo Pulse/)).toBeInTheDocument();
    expect(screen.queryByText(/Next Pulse in/)).not.toBeInTheDocument();
  });

  it("renders a custom quote source and next-pulse label when provided", () => {
    render(
      <WeDoCard
        coupleCount={363}
        quote="Test quote"
        quoteSource="Custom Source"
        nextPulseLabel="2d 10h"
      />
    );

    expect(screen.getByText(/Custom Source/)).toBeInTheDocument();
    expect(screen.getByText("Next Pulse in 2d 10h")).toBeInTheDocument();
  });
});
