import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PhotoBackdrop } from "./photo-backdrop";

describe("PhotoBackdrop", () => {
  it("uses named backdrop image and flat scrim effect tokens", () => {
    render(
      <PhotoBackdrop>
        <p>Backdrop content</p>
      </PhotoBackdrop>
    );

    expect(document.querySelector("[data-slot='photo-backdrop']")).toHaveClass(
      "relative",
      "overflow-hidden"
    );
    expect(document.querySelector("[data-slot='photo-backdrop-image']")).toHaveClass(
      "bg-login-photo",
      "bg-cover",
      "bg-center"
    );
    expect(document.querySelector("[data-slot='photo-backdrop-content']")).toHaveClass(
      "backdrop-blur-photo"
    );
    expect(document.querySelector("[data-slot='photo-backdrop-scrim']")).toHaveClass(
      "bg-overlay",
      "opacity-85",
      "backdrop-blur-sm"
    );
    expect(screen.getByText("Backdrop content")).toBeInTheDocument();
  });

  it("uses the named radial scrim token without adding the flat blur treatment", () => {
    render(
      <PhotoBackdrop scrim="radial">
        <p>Radial content</p>
      </PhotoBackdrop>
    );

    expect(document.querySelector("[data-slot='photo-backdrop-content']")).not.toHaveClass(
      "backdrop-blur-photo"
    );
    expect(document.querySelector("[data-slot='photo-backdrop-scrim']")).toHaveClass(
      "bg-photo-backdrop-radial-scrim"
    );
    expect(screen.getByText("Radial content")).toBeInTheDocument();
  });
});
