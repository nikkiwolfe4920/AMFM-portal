import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { InfoNote } from "./info-note";

describe("InfoNote", () => {
  it("renders an accessible note with decorative icon and caller content", () => {
    const { container } = render(
      <InfoNote>
        Marriage Champions can view HeartChart and AMFM Premium content.
      </InfoNote>
    );

    expect(screen.getByRole("note")).toHaveTextContent(
      "Marriage Champions can view HeartChart and AMFM Premium content."
    );
    expect(container.querySelector("svg[aria-hidden='true']")).toBeInTheDocument();
  });
});
