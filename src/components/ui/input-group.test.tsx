import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { InputGroup } from "./input-group";

describe("InputGroup", () => {
  it("uses the shared form-control transition utility on the wrapper", () => {
    render(<InputGroup addon="http://" aria-label="Website" />);

    const input = screen.getByRole("textbox", { name: "Website" });
    const wrapper = input.closest('[data-slot="input-group"]');
    expect(wrapper).toHaveClass("transition-control");
    expect(wrapper).not.toHaveClass("transition-[color,box-shadow]");
  });
});
