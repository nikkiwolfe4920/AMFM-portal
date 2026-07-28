import { PlayCircle } from "lucide-react";

import { ChartScaleMarker } from "@/components/chart-scale-marker";
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
    <div
      className={cn(
        "flex flex-col items-center gap-6 rounded-md border px-8 pt-6 pb-8 text-center",
        className
      )}
    >
      <div className="flex flex-col gap-1">
        <p className="font-display text-display-lg font-light text-chart-scale-blue-700">
          {clampedValue}%
        </p>
        <p className="text-base font-semibold text-foreground">{question}</p>
      </div>

      <div className="flex w-full flex-col gap-1.5">
        <div className="relative h-6 w-full rounded-md bg-gradient-to-r from-chart-scale-blue-25 to-chart-scale-blue-50">
          <span
            className="absolute bottom-full mb-1.5 -translate-x-1/2 text-chart-label font-semibold tracking-label whitespace-nowrap text-muted-foreground"
            style={{ left: `${clampedAverage}%` }}
          >
            {clampedAverage}% National Average
          </span>
          <div
            className="absolute inset-y-0 left-0 rounded-md bg-gradient-to-r from-chart-scale-blue-400 to-chart-scale-blue-100"
            style={{ width: `${clampedValue}%` }}
          />
          <ChartScaleMarker position={clampedAverage} />
        </div>
        <div className="flex items-center justify-between text-chart-label font-medium tracking-label text-muted-foreground">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>

      <Button
        variant="link"
        size="inline"
        className="text-text-tertiary"
        onClick={onWhyDoesThisMatter}
      >
        <PlayCircle />
        Why does this matter?
      </Button>
    </div>
  );
}

export { ScaleChartCard };
