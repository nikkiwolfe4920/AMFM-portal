import { cn } from "@/lib/utils";

interface CommitmentConnectionChartProps {
  /** Each point's position, 0–100 on both axes. */
  dataPoints: { commitment: number; connection: number }[];
  highlightedZone: string;
  /** Zone key -> display label, placed evenly around the chart's boundary in key order. */
  zoneLabels: Record<string, string>;
  className?: string;
}

const SIZE = 320;
const CENTER = SIZE / 2;
const RADIUS = CENTER - 48;

/**
 * Quadrant scatter/bubble chart mapping people along Commitment × Connection
 * — see COMPONENTS.md#commitmentconnectionchart. Zone label positions are
 * distributed evenly around the circle from `zoneLabels`' key order (Figma's
 * exact per-zone angular placement wasn't independently verifiable in this
 * pass — see that entry's Implementation rules) rather than hardcoding
 * specific unverified angles per zone name.
 */
function CommitmentConnectionChart({
  dataPoints,
  highlightedZone,
  zoneLabels,
  className,
}: CommitmentConnectionChartProps) {
  const zoneEntries = Object.entries(zoneLabels);

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <div className="flex items-stretch gap-2">
        <span
          aria-hidden="true"
          className="flex shrink-0 [writing-mode:vertical-rl] items-center justify-center rotate-180 text-[10px] font-semibold tracking-widest text-muted-foreground uppercase"
        >
          Commitment
        </span>

        <div className="relative" style={{ width: SIZE, height: SIZE }}>
          <svg
            width={SIZE}
            height={SIZE}
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            aria-hidden="true"
            className="overflow-visible"
          >
            <circle
              cx={CENTER}
              cy={CENTER}
              r={RADIUS}
              className="fill-none stroke-border"
            />
            <line
              x1={CENTER}
              y1={CENTER - RADIUS}
              x2={CENTER}
              y2={CENTER + RADIUS}
              className="stroke-border"
              strokeDasharray="2 4"
            />
            <line
              x1={CENTER - RADIUS}
              y1={CENTER}
              x2={CENTER + RADIUS}
              y2={CENTER}
              className="stroke-border"
              strokeDasharray="2 4"
            />

            {dataPoints.map((point, index) => {
              const cx = CENTER + ((point.connection - 50) / 50) * RADIUS;
              const cy = CENTER - ((point.commitment - 50) / 50) * RADIUS;
              return (
                <circle
                  key={index}
                  cx={cx}
                  cy={cy}
                  r={2.5}
                  className="fill-primary/50"
                />
              );
            })}

            <circle
              cx={CENTER}
              cy={CENTER}
              r={48}
              strokeWidth={2}
              className="fill-background stroke-primary"
            />
          </svg>

          <span className="pointer-events-none absolute inset-0 flex items-center justify-center px-16 text-center text-sm font-semibold tracking-wide text-foreground uppercase">
            {highlightedZone}
          </span>

          {zoneEntries.map(([key, label], index) => {
            const angle =
              (index / zoneEntries.length) * 2 * Math.PI - Math.PI / 2;
            const labelRadius = RADIUS + 28;
            const x = CENTER + Math.cos(angle) * labelRadius;
            const y = CENTER + Math.sin(angle) * labelRadius;
            return (
              <span
                key={key}
                className="absolute -translate-x-1/2 -translate-y-1/2 text-center text-[10px] font-medium tracking-wide text-muted-foreground uppercase"
                style={{ left: x, top: y }}
              >
                {label}
              </span>
            );
          })}
        </div>
      </div>

      <span
        aria-hidden="true"
        className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase"
      >
        Connection
      </span>
    </div>
  );
}

export { CommitmentConnectionChart };
