import * as React from "react";

import { cn } from "@/lib/utils";

interface ParticipationVerticalBarCardProps {
  title: string;
  icon: React.ReactNode;
  data: { label: string; value: number }[];
  className?: string;
}

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
        <div className="flex flex-1 items-end justify-between gap-2">
          {data.map((item) => (
            <div key={item.label} className="flex flex-1 flex-col items-center gap-2">
              <span className="text-xs font-medium text-muted-foreground">
                {item.value}%
              </span>
              <div className="flex h-32 w-full items-end">
                <div
                  className="w-full rounded-t-sm bg-chart-participation-fill"
                  style={{ height: `${(item.value / max) * 100}%` }}
                />
              </div>
              <span className="text-center text-[10px] text-muted-foreground">
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
