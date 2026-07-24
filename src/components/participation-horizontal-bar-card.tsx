import * as React from "react";

import { cn } from "@/lib/utils";

interface ParticipationHorizontalBarCardProps {
  title: string;
  icon: React.ReactNode;
  data: { label: string; value: number }[];
  className?: string;
}

/**
 * Horizontal bar/list tile for a single categorical distribution (e.g.
 * Relationship Status, Kids) — see
 * COMPONENTS.md#participationhorizontalbarcard. Confirmed reused twice
 * unmodified on the HeartChart Dashboard frame.
 */
function ParticipationHorizontalBarCard({
  title,
  icon,
  data,
  className,
}: ParticipationHorizontalBarCardProps) {
  const max = Math.max(...data.map((item) => item.value), 1);

  return (
    <div className={cn("flex h-full flex-col gap-4 rounded-md border p-4", className)}>
      <div className="flex items-center gap-2">
        <span aria-hidden="true" className="text-muted-foreground [&>svg]:size-4">
          {icon}
        </span>
        <span className="text-sm font-semibold text-foreground">{title}</span>
      </div>

      {data.length === 0 ? (
        <p className="text-sm text-muted-foreground">No data yet.</p>
      ) : (
        <div className="flex flex-1 flex-col justify-center gap-3">
          {data.map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <span className="w-28 shrink-0 text-xs text-muted-foreground">
                {item.label}
              </span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-chart-participation-fill"
                  style={{ width: `${(item.value / max) * 100}%` }}
                />
              </div>
              <span className="w-10 shrink-0 text-right text-xs font-medium text-foreground">
                {item.value}%
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export { ParticipationHorizontalBarCard };
