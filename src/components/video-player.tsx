"use client";

import { Maximize2, Pause, Play, Volume2, VolumeX } from "lucide-react";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
} from "react";

import { cn } from "@/lib/utils";

const PLAY_INDICATOR_CLASS_NAME =
  "bg-overlay/30 flex size-16 items-center justify-center rounded-full backdrop-blur-sm";
const CONTROL_BAR_CLASS_NAME =
  "to-overlay/30 absolute inset-x-0 bottom-0 flex flex-col bg-gradient-to-b from-transparent px-5 pt-10 pb-4";
const ICON_CONTROL_CLASS_NAME = "flex items-center justify-center rounded-sm p-2";
const TIME_LABEL_CLASS_NAME =
  "text-xs font-semibold tracking-label whitespace-nowrap text-white tabular-nums";
const SCRUBBER_TRACK_CLASS_NAME =
  "bg-overlay/30 absolute inset-0 rounded-full backdrop-blur-xs";

interface VideoPlayerProps {
  src?: string;
  poster: string;
  title: string;
  captionsSrc?: string;
  staticDurationLabel?: string;
  surface?: "raised" | "flat";
  className?: string;
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

export function VideoPlayer({
  src,
  poster,
  title,
  captionsSrc,
  staticDurationLabel = "00:00",
  surface = "raised",
  className,
}: VideoPlayerProps) {
  const seekControlId = useId();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const hasMediaSource = Boolean(src);

  useEffect(() => {
    if (!hasMediaSource) return;

    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => setCurrentTime(video.currentTime);
    const onLoadedMetadata = () => setDuration(video.duration || 0);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onProgress = () => {
      if (video.buffered.length > 0) {
        setBuffered(video.buffered.end(video.buffered.length - 1));
      }
    };

    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("progress", onProgress);

    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("progress", onProgress);
    };
  }, [hasMediaSource]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!hasMediaSource || !video) return;
    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!hasMediaSource || !video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const seek = (event: ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!hasMediaSource || !video) return;
    const value = Number(event.target.value);
    video.currentTime = value;
    setCurrentTime(value);
  };

  const remaining = Math.max(duration - currentTime, 0);
  const playedPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const bufferedPercent = duration > 0 ? (buffered / duration) * 100 : 0;

  return (
    <div
      data-slot="video-player"
      role="region"
      aria-label={title}
      className={cn(
        "relative aspect-video w-full overflow-hidden rounded-2xl",
        surface === "raised"
          ? "border border-black/10 shadow-media-card"
          : "border-0 shadow-none",
        className
      )}
    >
      <video
        ref={videoRef}
        poster={poster}
        src={src}
        playsInline
        aria-hidden={!hasMediaSource}
        className="absolute inset-0 size-full object-cover"
      >
        {hasMediaSource && captionsSrc ? (
          <track kind="captions" srcLang="en" src={captionsSrc} default />
        ) : null}
      </video>

      {hasMediaSource && !isPlaying ? (
        <button
          type="button"
          onClick={togglePlay}
          aria-label="Play video"
          className="absolute inset-0 flex cursor-pointer items-center justify-center"
        >
          <span
            data-slot="video-player-play-indicator"
            className={PLAY_INDICATOR_CLASS_NAME}
          >
            <Play className="size-5 text-white" fill="currentColor" aria-hidden />
          </span>
        </button>
      ) : !hasMediaSource ? (
        <div
          aria-hidden
          data-slot="video-player-static-play-overlay"
          className="absolute inset-0 flex items-center justify-center"
        >
          <span
            data-slot="video-player-play-indicator"
            className={PLAY_INDICATOR_CLASS_NAME}
          >
            <Play className="size-5 text-white" fill="currentColor" aria-hidden />
          </span>
        </div>
      ) : null}

      {hasMediaSource ? (
        <div className={CONTROL_BAR_CLASS_NAME}>
          <div className="flex items-center gap-0.5">
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause" : "Play"}
              className={ICON_CONTROL_CLASS_NAME}
            >
              {isPlaying ? (
                <Pause className="size-4 text-white" fill="currentColor" aria-hidden />
              ) : (
                <Play className="size-4 text-white" fill="currentColor" aria-hidden />
              )}
            </button>
            <button
              type="button"
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute" : "Mute"}
              className={ICON_CONTROL_CLASS_NAME}
            >
              {isMuted ? (
                <VolumeX className="size-4 text-white" aria-hidden />
              ) : (
                <Volume2 className="size-4 text-white" aria-hidden />
              )}
            </button>
            <div className="flex flex-1 items-center gap-2 px-1">
              <p className={TIME_LABEL_CLASS_NAME}>{formatTime(currentTime)}</p>
              <div className="relative h-2 flex-1">
                <div
                  data-slot="video-player-scrubber-track"
                  className={SCRUBBER_TRACK_CLASS_NAME}
                />
                <div
                  aria-hidden
                  className="absolute inset-y-0 left-0 rounded-full bg-white/30"
                  style={{ width: `${bufferedPercent}%` }}
                />
                <div
                  aria-hidden
                  className="absolute inset-y-0 left-0 rounded-full bg-white"
                  style={{ width: `${playedPercent}%` }}
                />
                <input
                  id={seekControlId}
                  name="video-seek"
                  type="range"
                  min={0}
                  max={duration || 0}
                  step={0.1}
                  value={currentTime}
                  onChange={seek}
                  aria-label="Seek"
                  aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`}
                  className={cn(
                    "absolute inset-0 h-2 w-full cursor-pointer appearance-none bg-transparent",
                    "[&::-webkit-slider-runnable-track]:bg-transparent",
                    "[&::-webkit-slider-thumb]:size-2.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white",
                    "[&::-moz-range-track]:bg-transparent",
                    "[&::-moz-range-thumb]:size-2.5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-white"
                  )}
                />
              </div>
              <p className={cn(TIME_LABEL_CLASS_NAME, "w-10")}>
                -{formatTime(remaining)}
              </p>
            </div>
            <button
              type="button"
              onClick={() => videoRef.current?.requestFullscreen()}
              aria-label="Fullscreen"
              className={ICON_CONTROL_CLASS_NAME}
            >
              <Maximize2 className="size-4 text-white" aria-hidden />
            </button>
          </div>
        </div>
      ) : (
        <div
          aria-hidden
          data-slot="video-player-static-controls"
          className={CONTROL_BAR_CLASS_NAME}
        >
          <div className="flex items-center gap-0.5">
            <span className={ICON_CONTROL_CLASS_NAME}>
              <Play className="size-4 text-white" fill="currentColor" aria-hidden />
            </span>
            <span className={ICON_CONTROL_CLASS_NAME}>
              <Volume2 className="size-4 text-white" aria-hidden />
            </span>
            <div className="flex flex-1 items-center gap-2 px-1">
              <p className={TIME_LABEL_CLASS_NAME}>00:00</p>
              <div className="relative h-2 flex-1">
                <div
                  data-slot="video-player-scrubber-track"
                  className={SCRUBBER_TRACK_CLASS_NAME}
                />
                <div
                  data-slot="video-player-static-scrubber-thumb"
                  className="absolute top-1/2 left-0 size-2.5 -translate-y-1/2 rounded-full bg-white"
                />
              </div>
              <p className={cn(TIME_LABEL_CLASS_NAME, "w-10")}>
                -{staticDurationLabel}
              </p>
            </div>
            <span className={ICON_CONTROL_CLASS_NAME}>
              <Maximize2 className="size-4 text-white" aria-hidden />
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
