import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { MarriageChampionsPageShell } from "./marriage-champions-page-shell";

describe("MarriageChampionsPageShell", () => {
  it("uses a scale-backed heading minimum width instead of an arbitrary value", () => {
    render(
      <MarriageChampionsPageShell>
        <p>Shell content</p>
      </MarriageChampionsPageShell>
    );

    expect(
      screen.getByRole("heading", { name: "Our Marriage Champions" })
    ).toHaveClass("min-w-80");
    expect(screen.getByText("Shell content")).toBeInTheDocument();
  });
});
