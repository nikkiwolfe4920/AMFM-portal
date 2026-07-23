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
    <div className="relative flex min-h-screen w-full flex-col overflow-hidden">
      <div className="absolute inset-0 bg-[url('/login-background.jpg')] bg-cover bg-center" />

      <div
        className={cn(
          "relative flex flex-1 flex-col items-center justify-center overflow-hidden",
          scrim === "flat" && "backdrop-blur-[20px]",
          className
        )}
      >
        {scrim === "flat" ? (
          <div className="bg-overlay absolute inset-0 opacity-85 backdrop-blur-[8px]" />
        ) : (
          // rgba(10,13,18,*) is the `overlay` token's rgb equivalent — Tailwind
          // arbitrary gradients can't reference a CSS custom property here.
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(10,13,18,0.7)_0%,rgba(10,13,18,0.9)_100%)]" />
        )}
        {children}
      </div>
    </div>
  );
}
