import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ChartScaleMarker } from "./chart-scale-marker";

describe("ChartScaleMarker", () => {
  it("renders as decorative (aria-hidden), positioned via left percentage", () => {
    const { container } = render(<ChartScaleMarker position={35} />);

    const marker = container.firstElementChild;
    expect(marker).toHaveAttribute("aria-hidden", "true");
    expect(marker).toHaveStyle({ left: "35%" });
  });

  it("renders a downward triangle plus a thin vertical stem, both muted-foreground", () => {
    const { container } = render(<ChartScaleMarker position={0} />);

    expect(
      container.querySelector(".border-t-muted-foreground")
    ).toBeInTheDocument();
    expect(
      container.querySelector(".w-heartchart-marker-stem.bg-muted-foreground")
    ).toBeInTheDocument();
  });
});
