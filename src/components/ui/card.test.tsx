import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CardAction, CardDescription, CardHeader, CardTitle } from "./card";

describe("Card", () => {
  it("names the shared header grid instead of preserving upstream arbitrary grid values", () => {
    render(
      <CardHeader>
        <CardTitle>Church Profile</CardTitle>
        <CardDescription>Update your church information</CardDescription>
        <CardAction>
          <button type="button">Edit</button>
        </CardAction>
      </CardHeader>
    );

    const header = screen.getByText("Church Profile").closest("[data-slot='card-header']");

    expect(header).toHaveClass(
      "grid-rows-card-header",
      "has-data-[slot=card-action]:grid-cols-card-header-action"
    );
    expect(header).not.toHaveClass(
      "grid-rows-[auto_auto]",
      "has-data-[slot=card-action]:grid-cols-[1fr_auto]"
    );
  });
});
