"use client";

import { useEffect, useRef } from "react";

interface VideoBaseProps {
  videorc: string;
  className?: string;
}

/**
 * 动效底座 — 循环播放 MP4 动效，screen 混合模式滤黑底
 */
const DEFAULT_LAYOUT =
  "absolute top-1/2 left-1/2 w-[110%] h-[110%] -translate-x-1/2 -translate-y-1/2 object-cover";

const VIDEO_FX_BASE =
  "mix-blend-screen brightness-125 contrast-125 pointer-events-none";

export default function VideoBase({ videorc, className }: VideoBaseProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
  }, []);

  const layout = className ?? DEFAULT_LAYOUT;
  const opacityClass = /(^|\s)opacity-/.test(layout) ? "" : "opacity-60";

  return (
    <video
      ref={videoRef}
      src={videorc}
      autoPlay
      loop
      muted
      playsInline
      className={`${layout} ${VIDEO_FX_BASE} ${opacityClass}`}
    />
  );
}
