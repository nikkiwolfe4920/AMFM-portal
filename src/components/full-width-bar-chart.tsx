import { cn } from "@/lib/utils";

interface FullWidthBarChartProps {
  data: { label: string; value: number }[];
  className?: string;
}

/**
 * Ranked, full-bleed horizontal bar chart companion to
 * CommitmentConnectionChart (Figma's "BarLineChart", node `1243:23077`) —
 * see COMPONENTS.md#fullwidthbarchart. The bar fill is a confirmed two-stop
 * gradient at 80% opacity (utility-brand-600, an exact match to the
 * existing `primary` token, reused rather than duplicated, to
 * utility-brand-800 via the new `chart-bar-fill-to` token) — resolves the
 * previously-flagged "not reliably resolvable" gap, see DESIGN.md Known gaps.
 */
function FullWidthBarChart({ data, className }: FullWidthBarChartProps) {
  const max = Math.max(...data.map((item) => item.value), 1);

  return (
    <div className={cn("flex w-full flex-col gap-6", className)}>
      {data.length === 0 ? (
        <p className="text-sm text-muted-foreground">No data yet.</p>
      ) : (
        data.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <span className="w-[74px] shrink-0 text-sm font-semibold text-text-secondary">
              {item.label}
            </span>
            <div className="h-6 flex-1">
              <div
                className="h-full rounded-r-sm bg-gradient-to-r from-primary to-chart-bar-fill-to opacity-80"
                style={{ width: `${(item.value / max) * 100}%` }}
              />
            </div>
            <span className="w-10 shrink-0 text-right text-xs font-semibold tracking-[0.24px] text-foreground/70">
              {item.value}%
            </span>
          </div>
        ))
      )}
    </div>
  );
}

export { FullWidthBarChart };
