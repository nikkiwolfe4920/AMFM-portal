import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ModalTextSection } from "./modal-text-section";

describe("ModalTextSection", () => {
  it("renders a labelled modal text section with optional divider styling", () => {
    const { container } = render(
      <ModalTextSection title="Growing Momentum">
        <p>Momentum is on your side.</p>
      </ModalTextSection>
    );

    const section = container.querySelector("[data-slot='modal-text-section']");

    expect(
      screen.getByRole("heading", { name: "Growing Momentum" })
    ).toBeInTheDocument();
    expect(section).toHaveAccessibleName("Growing Momentum");
    expect(section).toHaveClass("border-t", "pt-6");
    expect(screen.getByText("Momentum is on your side.")).toBeInTheDocument();
  });

  it("can render without a divider for already-separated modal areas", () => {
    const { container } = render(
      <ModalTextSection title="Resources" divided={false}>
        <p>Use this section inside a custom surface.</p>
      </ModalTextSection>
    );

    expect(container.querySelector("[data-slot='modal-text-section']")).not.toHaveClass(
      "border-t"
    );
  });
});
