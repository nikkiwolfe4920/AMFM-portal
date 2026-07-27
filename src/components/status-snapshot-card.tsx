import Image from "next/image";

import { cn } from "@/lib/utils";

type StatusSnapshotVariant = "relationship" | "kids";

interface StatusSnapshotCardProps {
  /** Selects the icon and gradient token pair — see COMPONENTS.md#statussnapshotcard. */
  variant: StatusSnapshotVariant;
  title: string;
  data: { label: string; value: number }[];
  className?: string;
}

const VARIANT_ICON: Record<
  StatusSnapshotVariant,
  { src: string; width: number; height: number }
> = {
  relationship: { src: "/relationship-status-icon.svg", width: 22, height: 20 },
  kids: { src: "/kids-icon.svg", width: 22, height: 21 },
};

/**
 * "to" stop is Figma's literal `colors/background/bg-primary` (pure white)
 * for both variants, so it fades `to-background` directly rather than a
 * fixed per-variant near-white token — see the token comment in
 * src/tokens/colors.css for why.
 */
const VARIANT_GRADIENT: Record<StatusSnapshotVariant, string> = {
  relationship: "from-chart-status-relationship-from to-background",
  kids: "from-chart-status-kids-from to-background",
};

/**
 * Bar-width scaling — pixel-verified via Figma MCP get_metadata on node
 * 4255:30880 (`_statistic-item` → "Bar fill" → "bar", 240px-wide rows across
 * both the Relationship Status and Kids columns). Each row's bar is scaled
 * relative to its own list's max value, floored at MIN_WIDTH_PERCENT and
 * capped at MAX_WIDTH_PERCENT (the list's own max value never reaches the
 * row's full width — Figma reserves a fixed 40px/240px = 1/6 gap even for
 * the largest bar). Fit against all 11 rows across both variants (Married
 * 42%→200px, K-5th Grade 38%→200px, down to Engaged 3%→75px) with ~1-2px
 * average error — see COMPONENTS.md's Implementation rules for the fit.
 */
const MIN_WIDTH_PERCENT = 28;
const MAX_WIDTH_PERCENT = (5 / 6) * 100;

/**
 * Horizontal bar list for a single categorical distribution — two variants
 * pixel-verified against Figma node 4255:30880: Relationship Status
 * (sage-gray gradient) and Kids (lavender gradient). Each bar spans the
 * row's full height with rounded corners on the trailing (right) edge only,
 * fading from its variant color at that leading edge to white at the label
 * end. Replaces the older, generic `ParticipationHorizontalBarCard` for
 * these two dashboard tiles — see COMPONENTS.md#statussnapshotcard.
 */
function StatusSnapshotCard({
  variant,
  title,
  data,
  className,
}: StatusSnapshotCardProps) {
  const icon = VARIANT_ICON[variant];
  const max = Math.max(...data.map((item) => item.value), 1);

  return (
    <div className={cn("flex h-full flex-col gap-4 rounded-md border p-6", className)}>
      <div className="flex items-center gap-2">
        <Image
          src={icon.src}
          alt=""
          aria-hidden="true"
          width={icon.width}
          height={icon.height}
          unoptimized
          className="h-5 w-auto shrink-0"
        />
        <span className="text-sm font-semibold text-foreground">{title}</span>
      </div>

      {data.length === 0 ? (
        <p className="text-sm text-muted-foreground">No data yet.</p>
      ) : (
        <div className="flex flex-1 flex-col border-t border-border-secondary">
          {data.map((item) => {
            const widthPercent =
              MIN_WIDTH_PERCENT + (item.value / max) * (MAX_WIDTH_PERCENT - MIN_WIDTH_PERCENT);
            return (
              <div
                key={item.label}
                className="relative flex items-center justify-between gap-3 border-b border-border-secondary py-3"
              >
                <div
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-y-0 left-0 rounded-r-md bg-gradient-to-l",
                    VARIANT_GRADIENT[variant]
                  )}
                  style={{ width: `${widthPercent}%` }}
                />
                <span className="relative tracking-label text-xs text-text-secondary">
                  {item.label}
                </span>
                <span className="relative shrink-0 text-xs font-semibold tracking-label text-text-secondary">
                  {item.value}%
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export { StatusSnapshotCard };
export type { StatusSnapshotVariant };
