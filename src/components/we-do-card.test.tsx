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
});
