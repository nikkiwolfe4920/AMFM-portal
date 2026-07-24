import * as React from "react";

import { cn } from "@/lib/utils";

interface ParticipationVerticalBarCardProps {
  title: string;
  icon: React.ReactNode;
  data: { label: string; value: number }[];
  className?: string;
}

const GRIDLINE_ROWS = 4;

/**
 * Vertical bar chart tile for a single categorical distribution (e.g. Age
 * Groups) — see COMPONENTS.md#participationverticalbarcard.
 */
function ParticipationVerticalBarCard({
  title,
  icon,
  data,
  className,
}: ParticipationVerticalBarCardProps) {
  const max = Math.max(...data.map((item) => item.value), 1);

  return (
    <div className={cn("flex h-full flex-col gap-6 rounded-xl border p-6", className)}>
      <div className="flex items-center gap-2">
        <span aria-hidden="true" className="flex text-foreground">
          {icon}
        </span>
        <span className="text-base font-bold text-foreground">{title}</span>
      </div>

      {data.length === 0 ? (
        <p className="text-sm text-muted-foreground">No data yet.</p>
      ) : (
        <div className="relative flex h-40 flex-1 items-end justify-between gap-2">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 grid"
            style={{ gridTemplateRows: `repeat(${GRIDLINE_ROWS}, minmax(0, 1fr))` }}
          >
            {Array.from({ length: GRIDLINE_ROWS }).map((_, index) => (
              <div key={index} className="border-t border-border-secondary" />
            ))}
          </div>

          {data.map((item) => (
            <div key={item.label} className="relative flex flex-1 flex-col items-center gap-2">
              <span className="text-sm font-bold text-primary">{item.value}%</span>
              <div className="flex h-32 w-full items-end">
                <div
                  className="w-full rounded-t-md bg-gradient-to-b from-chart-participation-fill-from to-chart-participation-fill-to"
                  style={{ height: `${(item.value / max) * 100}%` }}
                />
              </div>
              <span className="text-center text-sm font-medium text-foreground">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export { ParticipationVerticalBarCard };
