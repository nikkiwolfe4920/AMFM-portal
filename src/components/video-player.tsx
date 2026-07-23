"use client";

import { Maximize2, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface VideoPlayerProps {
  src?: string;
  poster: string;
  title: string;
  captionsSrc?: string;
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
  className,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);

  useEffect(() => {
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
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const seek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const value = Number(event.target.value);
    video.currentTime = value;
    setCurrentTime(value);
  };

  const remaining = Math.max(duration - currentTime, 0);
  const playedPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const bufferedPercent = duration > 0 ? (buffered / duration) * 100 : 0;

  return (
    <div
      role="region"
      aria-label={title}
      className={cn(
        "border-black/10 relative aspect-video w-full overflow-hidden rounded-2xl border shadow-[0px_16px_32px_-4px_rgba(0,0,0,0.7)]",
        className
      )}
    >
      <video
        ref={videoRef}
        poster={poster}
        src={src}
        playsInline
        className="absolute inset-0 size-full object-cover"
      >
        {captionsSrc ? (
          <track kind="captions" srcLang="en" src={captionsSrc} default />
        ) : null}
      </video>

      {!isPlaying ? (
        <button
          type="button"
          onClick={togglePlay}
          aria-label="Play video"
          className="absolute inset-0 flex cursor-pointer items-center justify-center"
        >
          <span className="bg-overlay/30 flex size-16 items-center justify-center rounded-full backdrop-blur-[8px]">
            <Play className="size-5 text-white" fill="currentColor" aria-hidden />
          </span>
        </button>
      ) : null}

      <div className="to-overlay/30 absolute inset-x-0 bottom-0 flex flex-col bg-gradient-to-b from-transparent px-5 pt-10 pb-4">
        <div className="flex items-center gap-0.5">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause" : "Play"}
            className="flex items-center justify-center rounded-sm p-2"
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
            className="flex items-center justify-center rounded-sm p-2"
          >
            {isMuted ? (
              <VolumeX className="size-4 text-white" aria-hidden />
            ) : (
              <Volume2 className="size-4 text-white" aria-hidden />
            )}
          </button>
          <div className="flex flex-1 items-center gap-2 px-1">
            <p className="text-xs font-semibold tracking-[0.24px] whitespace-nowrap text-white tabular-nums">
              {formatTime(currentTime)}
            </p>
            <div className="relative h-2 flex-1">
              <div className="bg-overlay/30 absolute inset-0 rounded-full backdrop-blur-[4px]" />
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
            <p className="w-10 text-xs font-semibold tracking-[0.24px] whitespace-nowrap text-white tabular-nums">
              -{formatTime(remaining)}
            </p>
          </div>
          <button
            type="button"
            onClick={() => videoRef.current?.requestFullscreen()}
            aria-label="Fullscreen"
            className="flex items-center justify-center rounded-sm p-2"
          >
            <Maximize2 className="size-4 text-white" aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}
