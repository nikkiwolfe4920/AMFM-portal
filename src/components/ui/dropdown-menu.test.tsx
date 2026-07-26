import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./dropdown-menu";

describe("DropdownMenu", () => {
  it("uses the spacing-scale minimum width on menu surfaces", () => {
    render(
      <DropdownMenu open>
        <DropdownMenuTrigger asChild>
          <button type="button">Account</button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuSub open>
            <DropdownMenuSubTrigger>More</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Billing</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    expect(screen.getAllByRole("menu")).toHaveLength(2);

    const menu = document.body.querySelector('[data-slot="dropdown-menu-content"]');
    expect(menu).toBeInstanceOf(HTMLElement);
    expect(menu).toHaveClass("min-w-32");
    expect(menu).not.toHaveClass("min-w-[8rem]");

    const subMenu = document.body.querySelector('[data-slot="dropdown-menu-sub-content"]');
    expect(subMenu).toBeInstanceOf(HTMLElement);
    expect(subMenu).toHaveClass("min-w-32");
    expect(subMenu).not.toHaveClass("min-w-[8rem]");
  });
});
