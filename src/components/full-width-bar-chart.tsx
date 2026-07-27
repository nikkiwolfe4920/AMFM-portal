import { cn } from "@/lib/utils";

interface FullWidthBarChartProps {
  data: { label: string; value: number }[];
  className?: string;
}

/**
 * Top-axis scale: the smallest of these steps whose 6 intervals reach the
 * data's max value becomes the axis step — pixel-verified against Figma's
 * "BarLineChart" node `1243:23077`, whose `yAxisTop` renders 0/5%/10%/15%/
 * 20%/25%/30% (step 5, 6 intervals) for a max data value of 23.
 */
const AXIS_STEP_CANDIDATES = [5, 10, 15, 20, 25, 50, 100];
const AXIS_TICK_COUNT = 6;

function getAxisStep(maxValue: number) {
  return (
    AXIS_STEP_CANDIDATES.find((step) => step * AXIS_TICK_COUNT >= maxValue) ??
    AXIS_STEP_CANDIDATES[AXIS_STEP_CANDIDATES.length - 1]
  );
}

/**
 * Ranked, full-bleed horizontal bar chart companion to
 * CommitmentConnectionChart (Figma's "BarLineChart", node `1243:23077`) —
 * see COMPONENTS.md#fullwidthbarchart. Renders a top percentage axis with
 * dashed vertical gridlines behind the bars (Figma's `yAxisTop`/`xLines`),
 * and positions each bar's percentage label immediately after its own
 * fill end rather than in a fixed trailing column.
 */
function FullWidthBarChart({ data, className }: FullWidthBarChartProps) {
  const max = Math.max(...data.map((item) => item.value), 1);
  const axisStep = getAxisStep(max);
  const axisMax = axisStep * AXIS_TICK_COUNT;
  const ticks = Array.from({ length: AXIS_TICK_COUNT + 1 }, (_, index) => index * axisStep);

  return (
    <div className={cn("flex w-full flex-col gap-4", className)}>
      {data.length === 0 ? (
        <p className="text-sm text-muted-foreground">No data yet.</p>
      ) : (
        <>
          <div className="flex items-center gap-2">
            <span aria-hidden="true" className="w-full-width-bar-label shrink-0" />
            <div className="flex flex-1 justify-between text-chart-label font-medium tracking-label text-muted-foreground">
              {ticks.map((tick, index) => (
                <span
                  key={tick}
                  className={cn("w-8 text-center", index === ticks.length - 1 && "text-right")}
                >
                  {tick === 0 ? "0" : `${tick}%`}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex shrink-0 flex-col gap-6">
              {data.map((item) => (
                <span
                  key={item.label}
                  className="flex h-6 w-full-width-bar-label items-center justify-end text-right text-sm font-semibold text-text-secondary"
                >
                  {item.label}
                </span>
              ))}
            </div>

            <div className="relative flex flex-1 flex-col gap-6">
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex justify-between">
                {ticks.map((tick, index) => (
                  <div
                    key={tick}
                    className={cn("h-full", index === 0 ? "border-l border-border-secondary" : "border-l border-dashed border-border-secondary")}
                  />
                ))}
              </div>

              {data.map((item) => {
                const percentOfAxis = (item.value / axisMax) * 100;

                return (
                  <div key={item.label} className="relative h-6">
                    <div
                      className="h-full rounded-r-sm bg-gradient-to-r from-primary to-chart-bar-fill-to opacity-80"
                      style={{ width: `${percentOfAxis}%` }}
                    />
                    <span
                      className="absolute top-1/2 ml-1 -translate-y-1/2 whitespace-nowrap text-xs font-semibold tracking-label text-foreground/70"
                      style={{ left: `${percentOfAxis}%` }}
                    >
                      {item.value}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export { FullWidthBarChart };
