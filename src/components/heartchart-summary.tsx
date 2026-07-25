import * as React from "react";
import { Lightbulb, QrCode, TrendingUp } from "lucide-react";

import { HeartChartLogo } from "@/app/login/_components/heartchart-logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ParticipationLevel = "early" | "low" | "growing" | "exceptional";

interface ScaleSegment {
  label: string;
  level: ParticipationLevel;
}

const SCALE_SEGMENTS: ScaleSegment[] = [
  { label: "Early", level: "early" },
  { label: "Active", level: "low" },
  { label: "Strong", level: "growing" },
  { label: "Exceptional", level: "exceptional" },
];

/**
 * Thresholds from Figma's own dev annotations on node 1640:23474 — see
 * COMPONENTS.md#heartchartsummary for why this is derived rather than a prop.
 */
function getParticipationLevel(percentage: number): ParticipationLevel {
  if (percentage <= 0) return "early";
  if (percentage < 45) return "low";
  if (percentage < 75) return "growing";
  return "exceptional";
}

function getTone(level: ParticipationLevel): "success" | "warning" {
  return level === "growing" || level === "exceptional" ? "success" : "warning";
}

/**
 * Value range each level covers, per the same Figma dev annotation as
 * getParticipationLevel. Used to place the marker at its position *within*
 * the active quarter-segment (not naively at `percentage`% of the full bar)
 * — see ParticipationScale.
 */
const LEVEL_RANGES: Record<ParticipationLevel, { min: number; max: number }> = {
  early: { min: 0, max: 0 },
  low: { min: 1, max: 44 },
  growing: { min: 45, max: 74 },
  exceptional: { min: 75, max: 100 },
};

function getMarkerPosition(percentage: number, level: ParticipationLevel): number {
  const segmentIndex = SCALE_SEGMENTS.findIndex((segment) => segment.level === level);
  const { min, max } = LEVEL_RANGES[level];
  const withinSegment = max === min ? 0 : (percentage - min) / (max - min);
  return (segmentIndex + withinSegment) * 25;
}

interface HeartChartSummaryProps {
  /** 0–100. Independent of completedCount/totalAttenders — see COMPONENTS.md. */
  percentage: number;
  completedCount: number;
  totalAttenders: number;
  onQuickTip?: () => void;
  onViewLastFourWeeks?: () => void;
  onShareLink?: () => void;
  className?: string;
}

export function HeartChartSummary({
  percentage,
  completedCount,
  totalAttenders,
  onQuickTip,
  onViewLastFourWeeks,
  onShareLink,
  className,
}: HeartChartSummaryProps) {
  const clampedPercentage = Math.min(100, Math.max(0, percentage));
  const level = getParticipationLevel(clampedPercentage);
  const tone = getTone(level);

  return (
    <div className={cn("shadow-card w-full max-w-[564px] rounded-2xl bg-background p-2", className)}>
      <div className="flex flex-col gap-6 rounded-md border bg-background px-4 py-5">
        <div className="flex w-full items-start justify-between gap-4">
          <HeartChartLogo />
          <LiveDataBadge />
        </div>

        <div className="flex w-full flex-col gap-2">
          <div className="flex flex-wrap items-center gap-4 pb-2">
            <ParticipationDonut percentage={clampedPercentage} tone={tone} />
            <div className="flex flex-col gap-1.5">
              <div className="flex items-end gap-2">
                <span
                  className={cn(
                    "text-5xl leading-10 font-semibold tracking-[-0.96px]",
                    tone === "success" ? "text-status-success" : "text-status-warning"
                  )}
                >
                  {completedCount.toLocaleString()}
                </span>
                <span className="pb-0.5 text-base text-muted-foreground">
                  {completedCount === 1 ? "Individual" : "Individuals"}
                </span>
              </div>
              <p className="text-base font-semibold text-muted-foreground">
                of {totalAttenders.toLocaleString()} attenders have completed HeartChart
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 rounded-md border bg-muted/50 px-5 pt-4 pb-5">
            <p className="text-text-tertiary text-xs font-semibold tracking-[0.24px]">
              CHURCH-WIDE PARTICIPATION LEVEL
            </p>
            <ParticipationScale percentage={clampedPercentage} level={level} />
            <div className="flex w-full flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  variant="outline"
                  size="compact"
                  onClick={onQuickTip}
                >
                  <Lightbulb />
                  Quick Tip
                </Button>
                <Button
                  variant="outline"
                  size="compact"
                  onClick={onViewLastFourWeeks}
                >
                  <TrendingUp />
                  Last 4 Weeks
                </Button>
              </div>
              <Button
                variant="outline"
                size="compact"
                onClick={onShareLink}
              >
                <QrCode />
                Share Your Link
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LiveDataBadge() {
  return (
    <div className="inline-flex shrink-0 items-center gap-1 rounded-full border bg-muted/50 py-0.5 pr-2 pl-1.5">
      <span aria-hidden className="inline-flex size-2 rounded-full bg-status-success" />
      <span className="text-xs font-medium tracking-[0.24px] text-foreground">Live Data</span>
    </div>
  );
}

function ParticipationDonut({
  percentage,
  tone,
}: {
  percentage: number;
  tone: "success" | "warning";
}) {
  const gradientId = React.useId();
  const size = 90;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative size-[90px] shrink-0" aria-hidden>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <defs>
          {/* Figma's value arc is a gradient, not a flat stroke — reusing the
              same two-stop pair ParticipationScale's active segment already
              uses for this tone, so the ring and the scale bar read as one
              consistent color story. */}
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
            {tone === "success" ? (
              <>
                <stop offset="0%" className="[stop-color:var(--color-status-success-strong)]" />
                <stop offset="100%" className="[stop-color:var(--color-status-success)]" />
              </>
            ) : (
              <>
                <stop offset="0%" className="[stop-color:var(--color-status-warning-subtle)]" />
                <stop offset="100%" className="[stop-color:var(--color-status-warning)]" />
              </>
            )}
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className="stroke-border-secondary"
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          fill="none"
          stroke={`url(#${gradientId})`}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-base font-medium text-muted-foreground">
        {Math.round(percentage)}%
      </span>
    </div>
  );
}

function ParticipationScale({
  percentage,
  level,
}: {
  percentage: number;
  level: ParticipationLevel;
}) {
  const tone = getTone(level);
  const activeGradient =
    tone === "success"
      ? "bg-gradient-to-t from-status-success-strong to-status-success"
      : "bg-gradient-to-b from-status-warning-subtle to-status-warning";
  const markerPosition = getMarkerPosition(percentage, level);

  return (
    <div className="relative flex h-9 w-full items-start">
      <div
        aria-hidden
        className="absolute top-[-8px] bottom-[3px] z-[3] w-3 -translate-x-1/2"
        style={{ left: `${markerPosition}%` }}
      >
        <div className="mx-auto flex h-full w-3 flex-col items-center">
          <div className="size-0 shrink-0 border-x-[6px] border-t-[8px] border-x-transparent border-t-muted-foreground" />
          <div className="w-[1.5px] flex-1 bg-muted-foreground" />
        </div>
      </div>
      <div className="relative z-[2] flex h-full w-full overflow-hidden rounded-full">
        <div aria-hidden className="pointer-events-none absolute inset-0 rounded-full bg-muted-foreground mix-blend-overlay" />
        {SCALE_SEGMENTS.map((segment, index) => {
          const isActive = segment.level === level;
          return (
            <div
              key={segment.level}
              className={cn(
                "flex h-full flex-1 items-center justify-center border-2 border-background",
                index === 0 && "rounded-l-full",
                index === SCALE_SEGMENTS.length - 1 && "rounded-r-full",
                isActive ? activeGradient : "bg-muted"
              )}
            >
              <span
                className={cn(
                  "text-xs font-medium tracking-[0.24px]",
                  isActive ? "text-white" : "text-muted-foreground"
                )}
              >
                {segment.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
