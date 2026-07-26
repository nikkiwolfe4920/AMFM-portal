import Image from "next/image";

import { cn } from "@/lib/utils";

interface CommitmentConnectionChartProps {
  /** Representative response count shown in the accessible chart summary. */
  responseCount: number;
  highlightedZone: string;
  /** Zone key -> display label, placed evenly around the chart's boundary in key order. */
  zoneLabels: Record<string, string>;
  className?: string;
}

const SCATTERGRAM_IMAGE = {
  src: "/relationship-health-scattergram.png",
  width: 685,
  height: 695,
};

/**
 * Quadrant scatter/bubble chart mapping people along Commitment × Connection
 * — see COMPONENTS.md#commitmentconnectionchart. The visible graphic is the
 * verified Figma raster asset because the source frame uses an illustrated,
 * hand-labelled scattergram rather than a generic geometric SVG chart.
 */
function CommitmentConnectionChart({
  responseCount,
  highlightedZone,
  zoneLabels,
  className,
}: CommitmentConnectionChartProps) {
  const zoneNames = Object.values(zoneLabels);
  const responseLabel =
    responseCount === 1 ? "1 plotted response" : `${responseCount} plotted responses`;
  const accessibleSummary = `Commitment and connection scattergram with ${responseLabel}. Highlighted zone: ${highlightedZone}. Zones shown: ${zoneNames.join(", ")}.`;

  return (
    <figure
      data-slot="commitment-connection-chart"
      role="img"
      aria-label={accessibleSummary}
      className={cn("w-full", className)}
    >
      <Image
        src={SCATTERGRAM_IMAGE.src}
        alt=""
        width={SCATTERGRAM_IMAGE.width}
        height={SCATTERGRAM_IMAGE.height}
        unoptimized
        className="h-auto w-full"
      />
      <figcaption className="sr-only">
        <span>{highlightedZone}</span>
        {zoneNames.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </figcaption>
    </figure>
  );
}

export { CommitmentConnectionChart };
