import type { ReactNode } from "react";
import Image from "next/image";
import { ArrowRight, Check, PlayCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

/** Shared step-header background/text — all 3 steps use the same brand fill, see COMPONENTS.md#coursecard. */
const STEP_HEADER_CLASSNAME = "bg-text-brand text-white";

interface CourseCardProps {
  /** Which of the fixed 3 steps this card represents — drives the "STEP {n}" label. */
  step: 1 | 2 | 3;
  /** Uppercase eyebrow over the video cover, e.g. "BEFORE THE WEEKEND SERVICE". */
  eyebrow: string;
  title: ReactNode;
  /** Video-cover backdrop photo — decorative (the eyebrow/title already convey the step's meaning), so it always renders with `alt=""`. */
  imageSrc: string;
  /** Label for the video-cover CTA button, e.g. "See How It Works". */
  videoCtaLabel: string;
  onWatchVideo?: () => void;
  /** Checklist rows — each renders with a leading check icon; compose inline links directly. */
  checklist: ReactNode[];
  /** Hide the header's trailing arrow (Figma hides it on the last step). */
  hideArrow?: boolean;
  className?: string;
}

/**
 * One step in the 3-step "get ready for your HeartChart Weekend" course —
 * see COMPONENTS.md#coursecard. Figma: AMFM Portal "Course Card" component
 * (node 2074:45130), steps 1–3 at nodes 2316:26815 / 2316:26886 / 2318:26954;
 * the shared step-header fill is confirmed at node 3926:27038.
 */
export function CourseCard({
  step,
  eyebrow,
  title,
  imageSrc,
  videoCtaLabel,
  onWatchVideo,
  checklist,
  hideArrow = false,
  className,
}: CourseCardProps) {
  return (
    <div
      className={cn(
        "border-border bg-background flex flex-col overflow-hidden rounded-md border",
        className
      )}
    >
      <div
        data-slot="course-card-step-header"
        className={cn(
          "flex items-center justify-between px-6 py-3",
          STEP_HEADER_CLASSNAME
        )}
      >
        <p className="text-base font-semibold">STEP {step}</p>
        {!hideArrow && (
          <ArrowRight aria-hidden="true" className="size-6" />
        )}
      </div>

      <div className="relative flex aspect-video flex-col justify-between gap-2 px-6 py-8 pr-32">
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
          <Image
            src={imageSrc}
            alt=""
            fill
            unoptimized
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover"
          />
          {/* Figma's video-cover scrim (node 3926:27043 et al.): dark over the text column, clear toward the right. */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
        </div>
        <div className="relative z-10 flex flex-col gap-2">
          <p className="text-xs font-semibold tracking-[0.24px] text-white/70 uppercase">
            {eyebrow}
          </p>
          <p className="font-display text-display-md leading-[2.375rem] font-light text-white">
            {title}
          </p>
        </div>
        <Button
          variant="outline"
          size="compact"
          onClick={onWatchVideo}
          className="relative z-10 w-fit"
        >
          <PlayCircle aria-hidden="true" />
          {videoCtaLabel}
        </Button>
      </div>

      <div className="flex flex-col gap-2 p-8">
        {checklist.map((item, index) => (
          <CourseCardChecklistItem key={index}>
            {item}
          </CourseCardChecklistItem>
        ))}
      </div>
    </div>
  );
}

function CourseCardChecklistItem({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <div className="bg-muted flex size-6 shrink-0 items-center justify-center rounded-full">
        <Check aria-hidden="true" className="text-muted-foreground size-3.5" />
      </div>
      <p className="text-muted-foreground flex-1 text-base">{children}</p>
    </div>
  );
}
