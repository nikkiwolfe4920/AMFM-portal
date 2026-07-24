import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PointerCallout } from "./pointer-callout";

describe("PointerCallout", () => {
  it("renders its children content", () => {
    render(
      <PointerCallout>
        <p>Callout content</p>
      </PointerCallout>
    );

    expect(screen.getByText("Callout content")).toBeInTheDocument();
  });

  it("marks the pointer/tail graphic as decorative", () => {
    const { container } = render(
      <PointerCallout>
        <p>Callout content</p>
      </PointerCallout>
    );

    const pointer = container.querySelector('[aria-hidden="true"]');
    expect(pointer).not.toBeNull();
  });

  it("renders the diagonal-tail asset and marks it decorative when pointerPosition is bottom-left-diagonal", () => {
    const { container } = render(
      <PointerCallout pointerPosition="bottom-left-diagonal">
        <p>Callout content</p>
      </PointerCallout>
    );

    const pointer = container.querySelector('img[aria-hidden="true"]');
    expect(pointer).not.toBeNull();
    expect(pointer).toHaveAttribute("alt", "");
  });
});
