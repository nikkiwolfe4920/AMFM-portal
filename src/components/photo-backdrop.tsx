import type * as React from "react";

import { cn } from "@/lib/utils";

interface PhotoBackdropProps {
  className?: string;
  /**
   * "flat" (default): the original /login-derived treatment — bg-overlay/85
   * tint over a two-layer blur. "radial": the /welcome first-run screen's
   * treatment — an unblurred radial vignette. See COMPONENTS.md#photobackdrop.
   */
  scrim?: "flat" | "radial";
}

/**
 * Full-bleed background photo + dark scrim, shared by any onboarding-style
 * surface built on the same Figma photo background (currently /login, /,
 * /signup, /create-profile, and /welcome).
 */
export function PhotoBackdrop({
  className,
  scrim = "flat",
  children,
}: React.PropsWithChildren<PhotoBackdropProps>) {
  return (
    <div
      data-slot="photo-backdrop"
      className="relative flex min-h-screen w-full flex-col overflow-hidden"
    >
      <div
        data-slot="photo-backdrop-image"
        className="bg-login-photo absolute inset-0 bg-cover bg-center"
      />

      <div
        data-slot="photo-backdrop-content"
        className={cn(
          "relative flex flex-1 flex-col items-center justify-center overflow-hidden",
          scrim === "flat" && "backdrop-blur-photo",
          className
        )}
      >
        {scrim === "flat" ? (
          <div
            data-slot="photo-backdrop-scrim"
            className="bg-overlay absolute inset-0 opacity-85 backdrop-blur-sm"
          />
        ) : (
          <div
            data-slot="photo-backdrop-scrim"
            className="bg-photo-backdrop-radial-scrim absolute inset-0"
          />
        )}
        {children}
      </div>
    </div>
  );
}
