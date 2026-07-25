import { ArrowRight, Play } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SnapshotVideoCardProps {
  title: string;
  description: string;
  /** Highlighted-zone name (e.g. "Steady"), rendered above a divider before the video. Omitted entirely if not provided. */
  zoneTitle?: string;
  /** Zone summary sentence (e.g. "292 people (46%) are Comfortable but coasting"), rendered under zoneTitle. */
  zoneHeadline?: string;
  onNextSteps?: () => void;
  className?: string;
}

/**
 * Short contextual video preview + "Next Ministry Steps" CTA — see
 * COMPONENTS.md#snapshotvideocard. Figma shows a static thumbnail with a
 * play affordance and no visible scrubber, so this renders a static preview
 * (matching CourseCard's video-cover pattern) rather than wiring in
 * VideoPlayer's full native <video> controls — see that entry's
 * Implementation rules for why the composition choice is still open and
 * needs product/design confirmation. The thumbnail photo is unavailable in
 * this environment (same blocked-asset class as TopHero/CourseCard), so a
 * nav-surface gradient placeholder renders in its place.
 */
function SnapshotVideoCard({
  title,
  description,
  zoneTitle,
  zoneHeadline,
  onNextSteps,
  className,
}: SnapshotVideoCardProps) {
  return (
    <div className={cn("flex h-full flex-col gap-6", className)}>
      {(zoneTitle || zoneHeadline) && (
        <div className="flex flex-col gap-1 border-b pb-6">
          {zoneTitle && (
            <h3 className="text-lg font-semibold text-foreground">{zoneTitle}</h3>
          )}
          {zoneHeadline && (
            <p className="text-sm font-medium text-primary">{zoneHeadline}</p>
          )}
        </div>
      )}

      <button
        type="button"
        className="group focus-visible:ring-ring/50 relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-md bg-gradient-to-br from-nav-surface-from to-nav-surface-to outline-none focus-visible:ring-[3px]"
        aria-label={`Play ${title} video`}
      >
        <span className="flex size-12 items-center justify-center rounded-full bg-white/90 text-foreground shadow-sm transition-transform group-hover:scale-105">
          <Play aria-hidden="true" className="size-5 translate-x-0.5" />
        </span>
      </button>

      <p className="text-sm font-semibold text-foreground">{title}</p>
      <p className="text-sm text-text-tertiary">{description}</p>

      <Button
        variant="outline"
        size="compact"
        onClick={onNextSteps}
        className="self-end"
      >
        Next Ministry Steps
        <ArrowRight />
      </Button>
    </div>
  );
}

export { SnapshotVideoCard };
