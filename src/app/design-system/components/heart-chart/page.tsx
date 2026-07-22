import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { HeartChartSummary } from "@/components/heartchart-summary";

import {
  FigmaReference,
  Section,
  StateList,
  StatusBadge,
  TokenList,
} from "../../_components/showcase";

const TOKENS = [
  "shadow-card",
  "rounded-2xl",
  "rounded-md",
  "bg-background",
  "border",
  "bg-muted/50",
  "text-foreground",
  "text-muted-foreground",
  "bg-muted-foreground",
  "bg-muted",
  "status-success",
  "status-success-strong",
  "status-warning",
  "status-warning-subtle",
];

const STATES = ["Low", "Growing", "Exceptional"];

export default function HeartChartSummaryShowcasePage() {
  return (
    <div className="flex flex-col gap-2">
      <Link
        href="/design-system/components"
        className="inline-flex w-fit items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="size-4" />
        Back to Components
      </Link>

      <div className="flex flex-col gap-4 border-b py-8">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h1 className="text-3xl font-semibold tracking-tight">
            HeartChartSummary
          </h1>
          <StatusBadge status="Draft" />
        </div>
        <p className="text-muted-foreground max-w-2xl text-sm">
          Church-wide HeartChart participation snapshot for an admin
          dashboard: how many individuals have completed the HeartChart
          assessment out of the church&apos;s total attenders, and where that
          participation level falls on an Early → Active → Strong →
          Exceptional scale. Gives a church admin an at-a-glance read on
          engagement plus one-tap entry points into related actions (a
          contextual tip, historical trend, and the share link for driving
          more completions).
        </p>
        <p className="text-muted-foreground text-xs">
          Source: <code className="bg-muted rounded px-1 py-0.5">src/components/heartchart-summary.tsx</code>
        </p>
      </div>

      <Section title="Live examples" description="Sample data across the three defined participation levels.">
        <div className="rounded-lg border p-6">
          <div className="flex flex-col gap-6">
            <HeartChartSummary percentage={1} completedCount={7} totalAttenders={2800} />
            <HeartChartSummary percentage={58} completedCount={1512} totalAttenders={2800} />
            <HeartChartSummary percentage={100} completedCount={2912} totalAttenders={2800} />
          </div>
        </div>
      </Section>

      <Section
        title="Variants"
        description="None — visual treatment is entirely driven by the derived participation level (see States), not a caller-chosen variant."
      >
        <p className="text-muted-foreground text-sm">
          This intentionally diverges from the Figma component, which exposes
          the level as a manually-set <code className="bg-muted rounded px-1 py-0.5">state</code> variant
          (Growing/Low/Exceptional) — deriving it from <code className="bg-muted rounded px-1 py-0.5">percentage</code> instead
          keeps it a single source of truth that can&apos;t drift out of sync.
        </p>
      </Section>

      <Section
        title="States"
        description="Participation level is derived from the percentage prop using the thresholds from Figma's own dev annotations on node 1640:23474."
      >
        <StateList states={STATES} />
        <div className="mt-2 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b text-xs text-muted-foreground">
                <th className="py-2 pr-4 font-medium">percentage</th>
                <th className="py-2 pr-4 font-medium">Level</th>
                <th className="py-2 pr-4 font-medium">Highlighted segment</th>
                <th className="py-2 font-medium">Color</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b">
                <td className="py-2 pr-4">0</td>
                <td className="py-2 pr-4">Early (fallback — no visual design yet)</td>
                <td className="py-2 pr-4">Early</td>
                <td className="py-2">status-warning (fallback)</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4">1–44</td>
                <td className="py-2 pr-4">Low</td>
                <td className="py-2 pr-4">Active</td>
                <td className="py-2">status-warning-subtle → status-warning</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4">45–74</td>
                <td className="py-2 pr-4">Growing</td>
                <td className="py-2 pr-4">Strong</td>
                <td className="py-2">status-success-strong → status-success</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">75–100</td>
                <td className="py-2 pr-4">Exceptional</td>
                <td className="py-2 pr-4">Exceptional</td>
                <td className="py-2">status-success-strong → status-success</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-muted-foreground text-sm">
          The component has no loading/empty/error state of its own — it&apos;s
          a pure presentational read of caller-supplied numbers. Each of the
          three action buttons (Quick Tip / Last 4 Weeks / Share Your Link) is
          optional-callback-driven and always renders, whether or not a
          handler is passed.
        </p>
      </Section>

      <Section title="Props / API">
        <div className="overflow-x-auto rounded-lg border">
          <pre className="overflow-x-auto p-4 text-xs">
{`interface HeartChartSummaryProps {
  /** 0–100. Independent of completedCount/totalAttenders. */
  percentage: number;
  completedCount: number;
  totalAttenders: number;
  onQuickTip?: () => void;
  onViewLastFourWeeks?: () => void;
  onShareLink?: () => void;
  className?: string;
}`}
          </pre>
        </div>
        <p className="text-muted-foreground text-sm">
          <code className="bg-muted rounded px-1 py-0.5">percentage</code> is
          independent of <code className="bg-muted rounded px-1 py-0.5">completedCount</code>/
          <code className="bg-muted rounded px-1 py-0.5">totalAttenders</code> — it is not
          computed as their ratio. All three are treated as independent
          caller-supplied numbers; display is capped at 100 defensively.
        </p>
      </Section>

      <Section title="Design tokens used">
        <TokenList tokens={TOKENS} />
      </Section>

      <Section title="Accessibility notes">
        <ul className="text-muted-foreground list-disc space-y-2 pl-5 text-sm">
          <li>
            The donut chart and segmented scale bar are supplementary
            visualizations of numbers already rendered as text (the big stat
            number, the attendee sentence, the segment labels) — the SVG
            donut is marked <code className="bg-muted rounded px-1 py-0.5">aria-hidden</code>,
            as is the scale bar&apos;s decorative marker, so nothing is
            announced twice or as an unlabeled graphic.
          </li>
          <li>
            The &quot;Live Data&quot; badge conveys status via the dot + text
            label together, not color alone.
          </li>
          <li>
            The highlighted scale segment is distinguished by both a fill
            color and its position/gradient; all four segment labels remain
            visible as text regardless of which is active.
          </li>
          <li>
            All three action buttons render through the shared{" "}
            <code className="bg-muted rounded px-1 py-0.5">Button</code>{" "}
            component, inheriting its keyboard focus, focus-visible ring, and
            visible text labels (no icon-only buttons requiring extra
            <code className="bg-muted rounded px-1 py-0.5">aria-label</code>s).
          </li>
        </ul>
      </Section>

      <Section title="Responsive behavior">
        <p className="text-muted-foreground text-sm">
          Not yet responsive below its Figma-authored desktop width (the
          source frame is a fixed 564px) — a known follow-up, not a
          deliberate fixed-width decision. The card itself is otherwise
          fluid-width (<code className="bg-muted rounded px-1 py-0.5">w-full</code>)
          so it can be dropped into a responsive grid once a consuming
          dashboard route exists.
        </p>
      </Section>

      <Section title="Figma reference">
        <FigmaReference reference='AMFM Portal — node 1993:36348 ("HeartChart Summary" component set — Growing 1640:23457/1670:36217, Low 1670:36549, Exceptional 1670:36610 variants)' />
      </Section>

      <p className="text-muted-foreground pb-8 text-xs">
        Full contract:{" "}
        <code className="bg-muted rounded px-1 py-0.5">
          COMPONENTS.md#heartchartsummary
        </code>
      </p>
    </div>
  );
}
