import { cn } from "@/lib/utils";

interface FullWidthBarChartProps {
  data: { label: string; value: number }[];
  className?: string;
}

/**
 * Ranked, full-bleed horizontal bar chart companion to
 * CommitmentConnectionChart — see COMPONENTS.md#fullwidthbarchart. Reuses
 * the existing `primary` brand token rather than a new chart token (Figma's
 * bar color is an exact match to `primary`'s source hex) — see DESIGN.md
 * Known gaps for the approximation this entails.
 */
function FullWidthBarChart({ data, className }: FullWidthBarChartProps) {
  const max = Math.max(...data.map((item) => item.value), 1);

  return (
    <div className={cn("flex w-full flex-col gap-3", className)}>
      {data.length === 0 ? (
        <p className="text-sm text-muted-foreground">No data yet.</p>
      ) : (
        data.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <span className="w-24 shrink-0 text-xs text-muted-foreground">
              {item.label}
            </span>
            <div className="h-3 flex-1 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${(item.value / max) * 100}%` }}
              />
            </div>
            <span className="w-10 shrink-0 text-right text-xs font-medium text-foreground">
              {item.value}%
            </span>
          </div>
        ))
      )}
    </div>
  );
}

export { FullWidthBarChart };
