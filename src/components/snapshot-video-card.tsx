import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SnapshotVideoCardProps {
  title: string;
  description: string;
  /** Highlighted-zone name (e.g. "Steady"), rendered above a divider before the video. Omitted entirely if not provided. */
  zoneTitle?: string;
  /** Zone summary sentence (e.g. "292 people (46%) are Comfortable but coasting"), rendered under zoneTitle. */
  zoneHeadline?: string;
  onPlay?: () => void;
  onNextSteps?: () => void;
  className?: string;
}

const SNAPSHOT_VIDEO_THUMBNAIL = {
  src: "/relationship-health-snapshot-video.png",
  width: 508,
  height: 286,
};

/**
 * Short contextual video preview + "Next Ministry Steps" CTA — see
 * COMPONENTS.md#snapshotvideocard. Figma shows a static thumbnail with a
 * play affordance and no visible scrubber, so this renders a static preview
 * (matching CourseCard's video-cover pattern) rather than wiring in
 * VideoPlayer's full native <video> controls.
 */
function SnapshotVideoCard({
  title,
  description,
  zoneTitle,
  zoneHeadline,
  onPlay,
  onNextSteps,
  className,
}: SnapshotVideoCardProps) {
  const thumbnail = (
    <Image
      src={SNAPSHOT_VIDEO_THUMBNAIL.src}
      alt=""
      width={SNAPSHOT_VIDEO_THUMBNAIL.width}
      height={SNAPSHOT_VIDEO_THUMBNAIL.height}
      unoptimized
      className="size-full object-cover"
    />
  );

  const nextStepsContent = (
    <>
      Next Ministry Steps
      <ArrowRight />
    </>
  );

  return (
    <div
      className={cn(
        "flex h-full flex-col gap-6 rounded-xl border bg-background p-6",
        className
      )}
    >
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

      {onPlay ? (
        <button
          type="button"
          className="focus-visible:ring-ring/50 relative flex aspect-video w-full overflow-hidden rounded-md outline-none focus-visible:ring-3"
          aria-label={`Play ${title} video`}
          onClick={onPlay}
        >
          {thumbnail}
        </button>
      ) : (
        <div
          data-slot="snapshot-video-card-thumbnail"
          className="relative flex aspect-video w-full overflow-hidden rounded-md"
          aria-hidden="true"
        >
          {thumbnail}
        </div>
      )}

      <p className="text-sm font-semibold text-foreground">{title}</p>
      <p className="text-sm text-text-tertiary">{description}</p>

      {onNextSteps ? (
        <Button
          variant="outline"
          size="compact"
          onClick={onNextSteps}
          className="self-end"
        >
          {nextStepsContent}
        </Button>
      ) : (
        <span
          className={cn(
            buttonVariants({ variant: "outline", size: "compact" }),
            "self-end"
          )}
          aria-hidden="true"
        >
          {nextStepsContent}
        </span>
      )}
    </div>
  );
}

export { SnapshotVideoCard };
