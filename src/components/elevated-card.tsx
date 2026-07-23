import * as React from "react";

import { cn } from "@/lib/utils";

interface ElevatedCardProps extends React.ComponentProps<"div"> {
  /** Classes for the inner bordered panel (e.g. to override the default border). */
  innerClassName?: string;
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
  children,
  ...props
}: ElevatedCardProps) {
  return (
    <div
      className={cn("rounded-2xl bg-background p-2 shadow-card", className)}
      {...props}
    >
      <div
        className={cn(
          "border-border h-full w-full rounded-md border",
          innerClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}
