import { Play } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SnapshotVideoCardProps {
  title: string;
  description: string;
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
  onNextSteps,
  className,
}: SnapshotVideoCardProps) {
  return (
    <div className={cn("flex h-full flex-col gap-4", className)}>
      <button
        type="button"
        className="group focus-visible:ring-ring/50 relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-md bg-gradient-to-br from-nav-surface-from to-nav-surface-to outline-none focus-visible:ring-[3px]"
        aria-label={`Play ${title} video`}
      >
        <span className="flex size-12 items-center justify-center rounded-full bg-white/90 text-foreground shadow-sm transition-transform group-hover:scale-105">
          <Play aria-hidden="true" className="size-5 translate-x-0.5" />
        </span>
        <span className="absolute bottom-3 left-3 text-sm font-semibold text-white">
          {title}
        </span>
      </button>

      <p className="text-sm text-text-tertiary">{description}</p>

      <Button size="compact" onClick={onNextSteps} className="self-start">
        Next Ministry Steps
      </Button>
    </div>
  );
}

export { SnapshotVideoCard };
