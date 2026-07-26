"use client";

import { useId, type ReactElement } from "react";

import { HeartChartModalShell } from "@/components/heartchart-modal-shell";
import {
  ParticipationTrendCard,
  type ParticipationTrendPoint,
} from "@/components/participation-trend-card";
import { TipCarousel, type TipCarouselItem } from "@/components/tip-carousel";

interface HeartChartLastFourWeeksModalProps {
  trigger: ReactElement;
}

const TREND_POINTS: ParticipationTrendPoint[] = [
  { label: "Mar 23", value: 1 },
  { label: "Mar 25", value: 1 },
  { label: "Mar 27", value: 1 },
  { label: "Mar 29", value: 3 },
  { label: "Mar 30", value: 0 },
  { label: "Apr 1", value: 0 },
  { label: "Apr 2", value: 3 },
  { label: "Apr 4", value: 3 },
  { label: "Apr 5", value: 4 },
  { label: "Apr 7", value: 3 },
  { label: "Apr 8", value: 1 },
  { label: "Apr 10", value: 0 },
  { label: "Apr 12", value: 2 },
  { label: "Apr 14", value: 2 },
  { label: "Apr 16", value: 2 },
  { label: "Apr 18", value: 1 },
  { label: "Apr 19", value: 4 },
];

const TIP_CARDS: TipCarouselItem[] = [
  {
    title: "Start with personal invites",
    description:
      "Encourage champions to personally reach out to a few couples or individuals who haven’t taken HeartChart yet.",
  },
  {
    title: "Use natural moments",
    description:
      "In small groups, mentoring, or coaching conversations, ask: “Have you taken HeartChart yet?” and invite them on the spot.",
  },
  {
    title: "Make it easy in the moment",
    description:
      "Have the link or QR code ready so people can complete it right then—not later.",
  },
  {
    title: "Follow up midweek",
    description:
      "A simple text like “Hey, thought of you—this would be really helpful for you” goes a long way.",
  },
  {
    title: "Welcome new people quickly",
    description:
      "Equip champions to invite newcomers within their first week or two—it becomes a natural next step.",
  },
  {
    title: "Share why it matters",
    description:
      "When champions briefly share how HeartChart helped them, it increases trust and participation.",
  },
];

export function HeartChartLastFourWeeksModal({
  trigger,
}: HeartChartLastFourWeeksModalProps) {
  const tipsHeadingId = `${useId()}-heartchart-tip-heading`;

  return (
    <HeartChartModalShell
      title="Completed the Last 4 Weeks"
      description="HeartChart participation trend and invitation follow-up guidance."
      trigger={trigger}
      size="md"
      bodyClassName="flex flex-col gap-7 px-6 py-6"
    >
      <div className="flex flex-col gap-3 text-sm">
        <p className="font-semibold text-foreground">
          See how participation is trending. Look for spikes after key moments
          and identify where a simple follow-up could bring more people in.
        </p>
        <p className="text-text-secondary">
          Your champions play a key role here—continuing to invite those who
          missed it or are new to your church.
        </p>
      </div>

      <ParticipationTrendCard
        dateRange="March 23 – April 19"
        total={62}
        totalLabel="Total this month"
        points={TREND_POINTS}
        chartAriaLabel="Daily HeartChart completions from March 23 through April 19."
        xAxisLabels={["Mar 23", "Mar 30", "Apr 5", "Apr 12", "Apr 19"]}
      />

      <section
        data-slot="heartchart-last-four-weeks-tips"
        className="flex flex-col gap-5"
        aria-labelledby={tipsHeadingId}
      >
        <h3
          id={tipsHeadingId}
          className="text-xl font-semibold text-foreground"
        >
          Small, consistent invitations from trusted people create the strongest
          momentum.
        </h3>
        <TipCarousel items={TIP_CARDS} ariaLabel="HeartChart invitation tips" />
      </section>
    </HeartChartModalShell>
  );
}

export type { HeartChartLastFourWeeksModalProps };
