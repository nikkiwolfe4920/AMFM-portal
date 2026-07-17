import type * as React from "react";

import { cn } from "@/lib/utils";

interface PhotoBackdropProps {
  className?: string;
}

/**
 * Full-bleed background photo + dark scrim, shared by /login and / (the
 * onboarding-style surfaces built on the same Figma photo background).
 */
export function PhotoBackdrop({
  className,
  children,
}: React.PropsWithChildren<PhotoBackdropProps>) {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-hidden">
      <div className="absolute inset-0 bg-[url('/login-background.jpg')] bg-cover bg-center" />

      <div
        className={cn(
          "relative flex flex-1 flex-col items-center justify-center overflow-hidden backdrop-blur-[20px]",
          className
        )}
      >
        <div className="bg-overlay absolute inset-0 opacity-85 backdrop-blur-[8px]" />
        {children}
      </div>
    </div>
  );
}
