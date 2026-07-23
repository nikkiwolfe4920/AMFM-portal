import * as React from "react";

import { cn } from "@/lib/utils";

interface BlurOverlayProps extends React.PropsWithChildren {
  className?: string;
}

/**
 * Renders `children` as an inert, faded backdrop — blurred and dimmed,
 * fading to the surrounding surface color toward the bottom — so real
 * content reads as "there, but not yet actionable" behind a centered
 * empty-state call-to-action, rather than being hidden outright.
 *
 * Always decorative: the wrapped content is `aria-hidden` and
 * non-interactive (`pointer-events-none`) — never nest a real control a
 * user is expected to reach in here. Pair it with a separate, real
 * (non-`aria-hidden`) rendering of the same content if an interactive
 * version needs to exist elsewhere on the page.
 */
export function BlurOverlay({ className, children }: BlurOverlayProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("relative overflow-hidden", className)}
    >
      <div className="pointer-events-none blur-[2px] opacity-30 select-none">
        {children}
      </div>
      <div className="from-background/0 to-background pointer-events-none absolute inset-0 bg-gradient-to-b" />
    </div>
  );
}
