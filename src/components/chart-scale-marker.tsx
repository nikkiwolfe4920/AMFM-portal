import { cn } from "@/lib/utils";

interface ChartScaleMarkerProps {
  /** Position along the track, as a 0–100 percentage from the left edge. */
  position: number;
  className?: string;
}

/**
 * Downward-pointing triangle + thin vertical stem marking a reference point
 * on a horizontal 0–100% scale track — shared by HeartChartSummary's
 * ParticipationScale (participation level) and ScaleChartCard (National
 * Average) so both scale-bar charts on the dashboard use one marker
 * implementation. See COMPONENTS.md#chartscalemarker.
 */
function ChartScaleMarker({ position, className }: ChartScaleMarkerProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute -top-2 bottom-heartchart-marker z-3 w-3 -translate-x-1/2",
        className
      )}
      style={{ left: `${position}%` }}
    >
      <div className="mx-auto flex h-full w-3 flex-col items-center">
        <div className="size-0 shrink-0 border-x-6 border-t-8 border-x-transparent border-t-muted-foreground" />
        <div className="w-heartchart-marker-stem flex-1 bg-muted-foreground" />
      </div>
    </div>
  );
}

export { ChartScaleMarker };
