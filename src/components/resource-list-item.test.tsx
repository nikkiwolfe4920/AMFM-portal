import { render, screen } from "@testing-library/react";
import { Share2 } from "lucide-react";
import { describe, expect, it } from "vitest";

import { ResourceListItem } from "./resource-list-item";

describe("ResourceListItem", () => {
  it("uses the active utility-icon token for row and download icons", () => {
    render(
      <ResourceListItem
        icon={Share2}
        title="Promotional Graphics"
        description="Ready-to-share graphics for your launch."
        href="/resources/promotional-graphics"
        actionLabel="Download Promotional Graphics"
      />
    );

    expect(screen.getByRole("link", { name: "Download Promotional Graphics" })).toHaveClass(
      "border-button-outline-border",
      "shadow-xs",
      "[&>svg]:text-button-outline-icon",
      "size-12"
    );
    expect(screen.getByRole("link", { name: "Download Promotional Graphics" })).not.toHaveClass(
      "shadow-button-inset"
    );
    expect(document.querySelector("[data-slot='resource-list-item-icon']")).toHaveClass(
      "text-fg-quaternary"
    );
  });
});
