import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

describe("Select", () => {
  it("uses shared form-control and listbox sizing utilities", () => {
    render(
      <Select open value="champion">
        <SelectTrigger aria-label="Role">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="champion">Marriage Champion</SelectItem>
        </SelectContent>
      </Select>
    );

    const trigger = document.body.querySelector('[data-slot="select-trigger"]');
    expect(trigger).toBeInstanceOf(HTMLElement);
    expect(trigger).toHaveClass("transition-control");
    expect(trigger).toHaveClass("*:data-[slot=select-value]:text-left");
    expect(trigger).not.toHaveClass("transition-[color,box-shadow]");

    const listbox = screen.getByRole("listbox");
    expect(listbox).toHaveClass("min-w-32");
    expect(listbox).not.toHaveClass("min-w-[8rem]");

    const viewport = document.body.querySelector('[data-slot="select-viewport"]');
    expect(viewport).toBeInstanceOf(HTMLElement);
    expect(viewport).toHaveClass("min-w-(--radix-select-trigger-width)");
    expect(viewport).not.toHaveClass("min-w-[var(--radix-select-trigger-width)]");
  });
});
