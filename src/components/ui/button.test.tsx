import { render, screen } from "@testing-library/react";
import { Plus } from "lucide-react";
import { describe, expect, it } from "vitest";

import { Button } from "./button";

describe("Button", () => {
  it("matches the Figma default button type and padding contract", () => {
    render(<Button>Log in</Button>);

    expect(screen.getByRole("button", { name: "Log in" })).toHaveClass(
      "h-[46px]",
      "text-base",
      "px-4",
      "py-2"
    );
  });

  it("uses the shared Figma small CTA size instead of a fixed 32px control", () => {
    render(<Button size="sm">Small</Button>);

    expect(screen.getByRole("button", { name: "Small" })).toHaveClass(
      "h-[42px]",
      "text-sm",
      "px-3",
      "py-2"
    );
    expect(screen.getByRole("button", { name: "Small" })).not.toHaveClass("h-8");
  });

  it("exposes the tighter Figma modal-footer CTA size", () => {
    render(<Button size="compact">Compact</Button>);

    expect(screen.getByRole("button", { name: "Compact" })).toHaveClass(
      "h-[38px]",
      "text-sm",
      "px-3",
      "py-1.5"
    );
  });

  it("exposes an inline Figma text-button size for icon-leading links", () => {
    render(
      <Button variant="link" size="inline" asChild>
        <a href="/settings">
          <Plus aria-hidden="true" />
          Upload your logo in settings
        </a>
      </Button>
    );

    expect(screen.getByRole("link", { name: "Upload your logo in settings" })).toHaveClass(
      "[&>svg:not([class*='size-'])]:size-5",
      "h-auto",
      "gap-1.5",
      "px-0",
      "py-0",
      "text-sm"
    );
  });

  it("defaults link variants to inline sizing so callers do not patch link geometry", () => {
    render(<Button variant="link">Forgot password</Button>);

    expect(screen.getByRole("button", { name: "Forgot password" })).toHaveClass(
      "h-auto",
      "px-0",
      "py-0",
      "text-sm"
    );
    expect(screen.getByRole("button", { name: "Forgot password" })).not.toHaveClass(
      "h-[46px]",
      "px-4",
      "py-2",
      "text-base"
    );
  });

  it("uses Figma's neutral bordered treatment for outline buttons", () => {
    render(
      <Button variant="outline" size="control">
        <Plus aria-hidden="true" />
        Download QR
      </Button>
    );

    expect(screen.getByRole("button", { name: "Download QR" })).toHaveClass(
      "border-button-outline-border",
      "bg-button-outline-bg",
      "text-button-outline-fg",
      "shadow-xs",
      "[&>svg]:text-button-outline-icon",
      "h-11",
      "gap-1.5",
      "px-3.5",
      "py-2.5"
    );
    expect(screen.getByRole("button", { name: "Download QR" })).not.toHaveClass(
      "shadow-button-inset"
    );
  });

  it("exposes a reversed outline variant for dark or brand-filled surfaces", () => {
    render(
      <Button variant="outlineReversed">
        <Plus aria-hidden="true" />
        Upgrade
      </Button>
    );

    expect(screen.getByRole("button", { name: "Upgrade" })).toHaveClass(
      "border-button-outline-reversed-border",
      "bg-button-outline-reversed-bg",
      "text-button-outline-reversed-fg",
      "hover:bg-button-outline-reversed-hover-bg",
      "[&>svg]:text-button-outline-reversed-icon",
      "shadow-none"
    );
    expect(screen.getByRole("button", { name: "Upgrade" })).not.toHaveClass(
      "border-button-outline-border",
      "text-button-outline-fg",
      "shadow-button-inset"
    );
  });

  it("uses the shared Figma icon size for icon-leading buttons", () => {
    render(
      <Button variant="outline" size="compact">
        <Plus aria-hidden="true" />
        See How It Works
      </Button>
    );

    expect(screen.getByRole("button", { name: "See How It Works" })).toHaveClass(
      "[&>svg:not([class*='size-'])]:size-5",
      "gap-1.5",
      "h-[38px]",
      "text-sm"
    );
  });

  it("maps the Figma large icon-leading CTA to a fixed 50px size", () => {
    render(
      <Button size="lg">
        <Plus aria-hidden="true" />
        Get Started
      </Button>
    );

    expect(screen.getByRole("button", { name: "Get Started" })).toHaveClass(
      "h-[50px]",
      "text-base",
      "px-6",
      "py-2.5"
    );
  });

  it("exposes a larger icon-only outline action for row and card controls", () => {
    render(<Button variant="outline" size="iconLg" aria-label="Download" />);

    expect(screen.getByRole("button", { name: "Download" })).toHaveClass(
      "border",
      "border-button-outline-border",
      "bg-button-outline-bg",
      "text-button-outline-fg",
      "shadow-xs",
      "[&>svg]:text-button-outline-icon",
      "size-12"
    );
    expect(screen.getByRole("button", { name: "Download" })).not.toHaveClass(
      "shadow-button-inset"
    );
  });

  it("exposes a trailing utility segment for input-embedded action buttons", () => {
    render(
      <Button variant="utilitySegment" size="controlSegment">
        <Plus aria-hidden="true" />
        Copy
      </Button>
    );

    expect(screen.getByRole("button", { name: "Copy" })).toHaveClass(
      "h-full",
      "gap-1.5",
      "border-l",
      "border-y-0",
      "border-r-0",
      "rounded-l-none",
      "shadow-none"
    );
    expect(screen.getByRole("button", { name: "Copy" })).not.toHaveClass(
      "shadow-button-inset"
    );
  });

  it("uses the Figma primary-button icon token for default variant icons", () => {
    render(
      <Button>
        <Plus aria-hidden="true" />
        Add a campus
      </Button>
    );

    expect(screen.getByRole("button", { name: "Add a campus" })).toHaveClass(
      "[&>svg]:text-button-primary-icon"
    );
  });

  it("keeps the primary icon token scoped to the default variant", () => {
    render(
      <Button variant="outline">
        <Plus aria-hidden="true" />
        Add a campus
      </Button>
    );

    expect(screen.getByRole("button", { name: "Add a campus" })).not.toHaveClass(
      "[&>svg]:text-button-primary-icon"
    );
    expect(screen.getByRole("button", { name: "Add a campus" })).toHaveClass(
      "[&>svg]:text-button-outline-icon"
    );
  });

  it("keeps generic disabled opacity for variants without custom disabled states", () => {
    render(
      <Button variant="secondary" disabled>
        Secondary
      </Button>
    );

    expect(screen.getByRole("button", { name: "Secondary" })).toHaveClass(
      "disabled:opacity-50"
    );
    expect(screen.getByRole("button", { name: "Secondary" })).not.toHaveClass(
      "disabled:opacity-100"
    );
  });

  it("rejects loading when composed as a child element", () => {
    expect(() =>
      render(
        // @ts-expect-error This deliberately covers the documented invalid prop pairing.
        <Button asChild loading>
          <a href="/login">Log in</a>
        </Button>
      )
    ).toThrow("Button does not support loading when asChild is true");
  });
});
