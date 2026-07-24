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

const VARIANT_GRADIENT: Record<StatusSnapshotVariant, string> = {
  relationship: "from-chart-status-relationship-from to-chart-status-relationship-to",
  kids: "from-chart-status-kids-from to-chart-status-kids-to",
};

/**
 * Minimum bar-length floor so low percentages still render as a visible
 * bar rather than an invisible sliver — screenshot-derived ratio, not a
 * pixel-verified Figma value (the source frame isn't reachable via this
 * environment's Figma connection); see COMPONENTS.md's Implementation rules.
 */
const MIN_WIDTH_PERCENT = 35;

/**
 * Horizontal gradient-pill bar list for a single categorical distribution —
 * two variants confirmed from screenshots: Relationship Status (sage-gray
 * gradient) and Kids (lavender gradient). Replaces the older, generic
 * `ParticipationHorizontalBarCard` for these two dashboard tiles — see
 * COMPONENTS.md#statussnapshotcard.
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
    <div className={cn("flex h-full flex-col gap-6 rounded-xl border p-6", className)}>
      <div className="flex items-center gap-2">
        <Image
          src={icon.src}
          alt=""
          aria-hidden="true"
          width={icon.width}
          height={icon.height}
          unoptimized
          className="size-5"
        />
        <span className="text-base font-bold text-foreground">{title}</span>
      </div>

      {data.length === 0 ? (
        <p className="text-sm text-muted-foreground">No data yet.</p>
      ) : (
        <div className="flex flex-1 flex-col">
          {data.map((item, index) => {
            const widthPercent =
              MIN_WIDTH_PERCENT + (item.value / max) * (100 - MIN_WIDTH_PERCENT);
            return (
              <div
                key={item.label}
                className={cn(
                  "flex items-center justify-between gap-3 py-3",
                  index !== data.length - 1 && "border-b border-border-secondary"
                )}
              >
                <div className="relative flex h-12 flex-1 items-center overflow-hidden rounded-full">
                  <div
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-y-0 left-0 rounded-full bg-gradient-to-r",
                      VARIANT_GRADIENT[variant]
                    )}
                    style={{ width: `${widthPercent}%` }}
                  />
                  <span className="relative pl-4 text-sm text-foreground">
                    {item.label}
                  </span>
                </div>
                <span className="shrink-0 text-sm font-bold text-foreground">
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
