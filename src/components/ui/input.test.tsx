import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Input } from "./input";

describe("Input", () => {
  it("uses the shared form-control transition utility instead of a bracketed transition list", () => {
    render(<Input aria-label="Email" />);

    const input = screen.getByRole("textbox", { name: "Email" });
    expect(input).toHaveClass("transition-control");
    expect(input).not.toHaveClass("transition-[color,box-shadow]");
  });
});
