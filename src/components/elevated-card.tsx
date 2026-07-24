import * as React from "react";

import { cn } from "@/lib/utils";

interface ElevatedCardProps extends React.ComponentProps<"div"> {
  /** Classes for the inner bordered panel (e.g. to override the default border). */
  innerClassName?: string;
  /**
   * Optional layer rendered behind the inner panel, bleeding under the outer
   * shell's padding to the component's true outer edge (e.g. a full-bleed
   * photo) — see `TopHero`, which uses this so its photo fills the whole
   * card instead of stopping at the inner panel, with only a thin border
   * marking the inset. Omit for the default shape (a solid `bg-background`
   * gap between the outer edge and the inner panel).
   */
  background?: React.ReactNode;
}

/**
 * Shared "nested shell" shape — an outer shadow-card shell wrapping an inner
 * bordered panel — used by AuthCard, HeartChartSummary, and (as of this
 * component) the HeartChart Resources page's TopHero and resource cards.
 * Extracted per HeartChartSummary's own documented precedent: "if a third
 * appears, extract it into a shared primitive." AuthCard/HeartChartSummary
 * are not retrofitted onto this in the same change (route-colocated /
 * fixed-light concerns of their own) — see COMPONENTS.md#elevatedcard.
 */
export function ElevatedCard({
  className,
  innerClassName,
  background,
  children,
  ...props
}: ElevatedCardProps) {
  return (
    <div
      className={cn("relative rounded-2xl bg-background p-2 shadow-card", className)}
      {...props}
    >
      {background && (
        // Absolutely positioned against this outer div's own box: since the
        // outer div carries only padding (no border), its containing block
        // for absolute children is flush with the true outer edge, so this
        // bleeds under the p-2 gap instead of stopping at the inner panel.
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-2xl">
          {background}
        </div>
      )}
      <div
        className={cn(
          // relative z-10: per DESIGN.md's "Stacking order on full-bleed
          // backdrops" rule, an absolutely positioned sibling paints above
          // non-positioned content regardless of DOM order — this panel
          // needs its own stacking context to render above `background`.
          "border-border relative z-10 h-full w-full rounded-md border",
          innerClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}
