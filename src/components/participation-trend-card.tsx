import * as React from "react";

import { cn } from "@/lib/utils";

interface ParticipationTrendPoint {
  label: string;
  value: number;
}

interface ParticipationTrendChartProps extends React.ComponentProps<"div"> {
  points: ParticipationTrendPoint[];
  ariaLabel: string;
  xAxisLabels: string[];
  maxValue?: number;
}

interface ParticipationTrendCardProps extends Omit<React.ComponentProps<"section">, "title"> {
  dateRange: string;
  total: number | string;
  totalLabel: string;
  points: ParticipationTrendPoint[];
  chartAriaLabel: string;
  xAxisLabels: string[];
  maxValue?: number;
}

const CHART_WIDTH = 512;
const CHART_HEIGHT = 168;
const LEFT_PAD = 24;
const RIGHT_PAD = 0;
const TOP_PAD = 8;
const BOTTOM_PAD = 32;

function ParticipationTrendCard({
  dateRange,
  total,
  totalLabel,
  points,
  chartAriaLabel,
  xAxisLabels,
  maxValue = 4,
  className,
  ...props
}: ParticipationTrendCardProps) {
  const headingId = React.useId();

  return (
    <section
      data-slot="participation-trend-card"
      className={cn("flex flex-col gap-4", className)}
      aria-labelledby={headingId}
      {...props}
    >
      <div className="flex items-end justify-between gap-4">
        <h3 id={headingId} className="text-lg font-semibold text-foreground">
          {dateRange}
        </h3>
        <div data-slot="participation-trend-total" className="text-right">
          <p className="text-3xl leading-none font-semibold text-foreground">
            {total}
          </p>
          <p className="text-sm font-medium text-muted-foreground">
            {totalLabel}
          </p>
        </div>
      </div>

      <ParticipationTrendChart
        points={points}
        ariaLabel={chartAriaLabel}
        xAxisLabels={xAxisLabels}
        maxValue={maxValue}
      />
    </section>
  );
}

function ParticipationTrendChart({
  points,
  ariaLabel,
  xAxisLabels,
  maxValue,
  className,
  ...props
}: ParticipationTrendChartProps) {
  const plotWidth = CHART_WIDTH - LEFT_PAD - RIGHT_PAD;
  const plotHeight = CHART_HEIGHT - TOP_PAD - BOTTOM_PAD;
  const baselineY = TOP_PAD + plotHeight;
  const highestPointValue = points.reduce(
    (highest, point) => Math.max(highest, point.value),
    0
  );
  const safeMaxValue = Math.max(
    Math.ceil(maxValue ?? 4),
    Math.ceil(highestPointValue),
    1
  );

  const coords = points.map((point, index) => {
    const x =
      points.length > 1
        ? LEFT_PAD + (plotWidth / (points.length - 1)) * index
        : LEFT_PAD + plotWidth / 2;
    const y = baselineY - (Math.max(point.value, 0) / safeMaxValue) * plotHeight;

    return { ...point, x, y };
  });
  const linePoints = coords.map((point) => `${point.x},${point.y}`).join(" ");
  const areaPoints = [
    `${LEFT_PAD},${baselineY}`,
    ...coords.map((point) => `${point.x},${point.y}`),
    `${LEFT_PAD + plotWidth},${baselineY}`,
  ].join(" ");

  return (
    <div
      role="img"
      aria-label={ariaLabel}
      data-slot="participation-trend-chart"
      className={cn("w-full", className)}
      {...props}
    >
      <svg
        viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
        className="h-auto w-full overflow-visible"
      >
        {getYAxisValues(safeMaxValue).map((value) => {
          const y = baselineY - (value / safeMaxValue) * plotHeight;

          return (
            <g key={value}>
              <line
                x1={LEFT_PAD}
                x2={LEFT_PAD + plotWidth}
                y1={y}
                y2={y}
                className="stroke-border-secondary"
              />
              <text x={0} y={y + 4} className="fill-fg-quaternary text-xs">
                {value}
              </text>
            </g>
          );
        })}
        {xAxisLabels.map((label, index) => {
          const x =
            xAxisLabels.length > 1
              ? LEFT_PAD + (plotWidth / (xAxisLabels.length - 1)) * index
              : LEFT_PAD + plotWidth / 2;
          const textAnchor =
            index === 0
              ? "start"
              : index === xAxisLabels.length - 1
                ? "end"
                : "middle";

          return (
            <g key={label}>
              <line
                x1={x}
                x2={x}
                y1={TOP_PAD}
                y2={baselineY}
                className="stroke-border-secondary"
              />
              <text
                data-slot="participation-trend-axis-label"
                x={x}
                y={CHART_HEIGHT - 8}
                textAnchor={textAnchor}
                className="fill-fg-quaternary text-xs"
              >
                {label}
              </text>
            </g>
          );
        })}
        {coords.length > 0 && (
          <>
            <polygon points={areaPoints} className="fill-primary/10" />
            <polyline
              points={linePoints}
              fill="none"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="stroke-primary"
            />
          </>
        )}
      </svg>
    </div>
  );
}

function getYAxisValues(maxValue: number) {
  return Array.from({ length: maxValue + 1 }, (_, index) => maxValue - index);
}

export { ParticipationTrendCard, ParticipationTrendChart };
export type {
  ParticipationTrendCardProps,
  ParticipationTrendChartProps,
  ParticipationTrendPoint,
};
