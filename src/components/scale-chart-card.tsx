import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ScaleChartCardProps {
  percentage: number;
  question: string;
  nationalAverage: number;
  onWhyDoesThisMatter?: () => void;
  className?: string;
}

/**
 * Headline percentage + 0–100% scale plotted against a National Average
 * marker — see COMPONENTS.md#scalechartcard. Only the confirmed "Default"
 * variant is implemented; do not add a second variant without confirming
 * one directly against the Figma component set (see that entry's
 * Implementation rules).
 */
function ScaleChartCard({
  percentage,
  question,
  nationalAverage,
  onWhyDoesThisMatter,
  className,
}: ScaleChartCardProps) {
  const clampedValue = Math.min(100, Math.max(0, percentage));
  const clampedAverage = Math.min(100, Math.max(0, nationalAverage));

  return (
    <div className={cn("flex flex-col gap-3 rounded-md border p-4", className)}>
      <p className="text-3xl leading-none font-semibold text-foreground">
        {clampedValue}%
      </p>
      <p className="text-sm text-muted-foreground">{question}</p>

      <div className="mt-1 flex flex-col gap-1.5">
        <div className="relative h-2 w-full rounded-full bg-chart-scale-blue-50">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-chart-scale-blue-400"
            style={{ width: `${clampedValue}%` }}
          />
          <span
            aria-hidden="true"
            className="absolute top-1/2 h-3 w-0.5 -translate-y-1/2 bg-foreground"
            style={{ left: `${clampedAverage}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-[10px] text-muted-foreground">
          <span>0%</span>
          <span>National Average: {clampedAverage}%</span>
          <span>100%</span>
        </div>
      </div>

      <Button
        variant="link"
        size="inline"
        onClick={onWhyDoesThisMatter}
        className="self-start"
      >
        Why does this matter?
      </Button>
    </div>
  );
}

export { ScaleChartCard };
