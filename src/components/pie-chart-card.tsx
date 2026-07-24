import { cn } from "@/lib/utils";

interface PieChartSegment {
  label: string;
  value: number;
  /**
   * A full CSS custom property reference (e.g. "--color-chart-pie-purple-700")
   * from src/tokens/colors.css, consumed directly via `var()` — segment
   * counts/colors are caller-supplied data, so Tailwind's static class
   * scanner can't pick up a dynamically-built utility class name here. This
   * still resolves to a real named design token, not a hardcoded hex.
   */
  color: string;
}

interface PieChartCardProps {
  /** Visually-hidden accessible label for this chart (no visible per-chart title in Figma). */
  title: string;
  centerStat: string;
  segments: PieChartSegment[];
  className?: string;
}

/**
 * Multi-segment donut chart tile with a headline center stat and a text
 * legend — see COMPONENTS.md#piechartcard. The surrounding
 * All/Couples/Singles HorizontalTabs live on the parent Card's header (per
 * Card's existing multi-control CardAction pattern), not inside this tile.
 */
function PieChartCard({ title, centerStat, segments, className }: PieChartCardProps) {
  const total = segments.reduce((sum, segment) => sum + segment.value, 0) || 1;
  const size = 160;
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const arcs = segments.reduce<
    (PieChartSegment & { dash: number; offset: number })[]
  >((acc, segment) => {
    const dash = (segment.value / total) * circumference;
    const consumed = acc.reduce((sum, arc) => sum + arc.dash, 0);
    return [...acc, { ...segment, dash, offset: circumference - consumed }];
  }, []);

  return (
    <div className={cn("flex flex-col items-center gap-6", className)}>
      <h3 className="sr-only">{title}</h3>

      <div className="flex flex-col items-center gap-3">
        <div className="relative size-40 shrink-0" aria-hidden="true">
          <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className="-rotate-90"
          >
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              strokeWidth={strokeWidth}
              className="stroke-border-secondary"
              fill="none"
            />
            {arcs.map((arc) => (
              <circle
                key={arc.label}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                strokeWidth={strokeWidth}
                strokeDasharray={`${arc.dash} ${circumference - arc.dash}`}
                strokeDashoffset={arc.offset}
                style={{ stroke: `var(${arc.color})` }}
              />
            ))}
          </svg>
        </div>
        <p className="max-w-60 text-center text-sm font-medium text-foreground">
          {centerStat}
        </p>
      </div>

      <ul className="flex w-full flex-col gap-2">
        {segments.map((segment) => (
          <li key={segment.label} className="flex items-center gap-2 text-xs">
            <span
              aria-hidden="true"
              className="size-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: `var(${segment.color})` }}
            />
            <span className="flex-1 text-muted-foreground">{segment.label}</span>
            <span className="font-medium text-foreground">{segment.value}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export { PieChartCard };
export type { PieChartSegment };
