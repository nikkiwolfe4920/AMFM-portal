import { render, screen } from "@testing-library/react";
import { Plus } from "lucide-react";
import { describe, expect, it } from "vitest";

import { InputActionGroup } from "./input-action-group";
import { Label } from "./label";

describe("InputActionGroup", () => {
  it("renders a labelled input with an attached action button using shared button geometry", () => {
    render(
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="campus-name">Campus name</Label>
        <InputActionGroup
          id="campus-name"
          name="campusName"
          placeholder="Campus name"
          actionLabel="Add"
          actionIcon={<Plus aria-hidden />}
        />
      </div>
    );

    const input = screen.getByRole("textbox", { name: "Campus name" });
    const button = screen.getByRole("button", { name: "Add" });

    expect(input).toHaveAttribute("placeholder", "Campus name");
    expect(input).toHaveAttribute("data-slot", "input-action-group-control");
    expect(button).toHaveAttribute("data-slot", "button");
    expect(button).toHaveClass("rounded-l-none");
    expect(button).toHaveClass("[&>svg]:text-button-primary-icon");
  });

  it("supports a more specific accessible action name than the visible label", () => {
    render(
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="campus-name">Campus name</Label>
        <InputActionGroup
          id="campus-name"
          name="campusName"
          actionLabel="Add"
          actionAriaLabel="Add campus"
        />
      </div>
    );

    expect(screen.getByRole("button", { name: "Add campus" })).toHaveTextContent("Add");
  });
});
