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
});
