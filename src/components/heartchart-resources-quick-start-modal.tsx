"use client";

import type { ReactElement } from "react";

import { HeartChartModalShell } from "@/components/heartchart-modal-shell";
import { VideoPlayer } from "@/components/video-player";

interface HeartChartResourcesQuickStartModalProps {
  trigger: ReactElement;
  posterSrc?: string;
  videoSrc?: string;
  captionsSrc?: string;
}

const HEARTCHART_MODAL_VIDEO_POSTER_SRC = "/heartchart-modal-video-poster.jpeg";

const QUICK_START_TRANSCRIPT =
  "Looks like you are ready to have your church experience HeartChart. The Quick Start Guide explains how to lead the weekend-service moment and use the supporting resources.";

export function HeartChartResourcesQuickStartModal({
  trigger,
  posterSrc = HEARTCHART_MODAL_VIDEO_POSTER_SRC,
  videoSrc,
  captionsSrc,
}: HeartChartResourcesQuickStartModalProps) {
  return (
    <HeartChartModalShell
      title="Quick Start Guide"
      description={QUICK_START_TRANSCRIPT}
      trigger={trigger}
      size="lg"
      framed={false}
      showDivider={false}
      bodyClassName="px-6 pt-0 pb-6 sm:px-8 sm:pb-8"
    >
      <VideoPlayer
        poster={posterSrc}
        src={videoSrc}
        captionsSrc={captionsSrc}
        staticDurationLabel="08:24"
        title="Quick Start Guide video"
        surface="flat"
      />
    </HeartChartModalShell>
  );
}

export type { HeartChartResourcesQuickStartModalProps };
