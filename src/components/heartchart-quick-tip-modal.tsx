"use client";

import type { ReactElement } from "react";
import { FileHeart } from "lucide-react";

import { HeartChartModalShell } from "@/components/heartchart-modal-shell";
import { ModalTextSection } from "@/components/modal-text-section";
import { Button } from "@/components/ui/button";
import { VideoPlayer } from "@/components/video-player";

interface HeartChartQuickTipModalProps {
  trigger: ReactElement;
  posterSrc?: string;
  videoSrc?: string;
  captionsSrc?: string;
  onGoToResources?: () => void;
}

const HEARTCHART_MODAL_VIDEO_POSTER_SRC = "/heartchart-modal-video-poster.jpeg";

export function HeartChartQuickTipModal({
  trigger,
  posterSrc = HEARTCHART_MODAL_VIDEO_POSTER_SRC,
  videoSrc,
  captionsSrc,
  onGoToResources,
}: HeartChartQuickTipModalProps) {
  return (
    <HeartChartModalShell
      title="Quick Tip"
      description="Quick Tip video and participation guidance."
      trigger={trigger}
      size="sm"
      bodyClassName="flex flex-col gap-6 px-6 py-6"
      footer={
        <Button
          type="button"
          size="control"
          onClick={onGoToResources}
          disabled={!onGoToResources}
        >
          <FileHeart aria-hidden />
          Go to HeartChart Resources
        </Button>
      }
    >
      <VideoPlayer
        poster={posterSrc}
        src={videoSrc}
        captionsSrc={captionsSrc}
        staticDurationLabel="08:24"
        title="Quick Tip video"
        surface="flat"
      />

      <ModalTextSection title="Growing Momentum">
        <p>
          Momentum is on your side—now widen the net. Reinforce it from the
          platform, equip small group leaders, and follow up midweek.
        </p>
        <p>
          We’ve got simple tools and templates to help you reach those who
          haven’t jumped in yet.
        </p>
      </ModalTextSection>
    </HeartChartModalShell>
  );
}

export type { HeartChartQuickTipModalProps };
