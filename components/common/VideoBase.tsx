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
  "absolute top-1/2 left-1/2 w-[110%] h-[110%] -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-none";

export default function VideoBase({ videorc, className }: VideoBaseProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
  }, []);

  return (
    <video
      ref={videoRef}
      src={videorc}
      autoPlay
      loop
      muted
      playsInline
      style={{
        mixBlendMode: "screen",
        filter: "brightness(1.2) contrast(1.2)",
        pointerEvents: "none",
      }}
      className={className ?? DEFAULT_LAYOUT}
    />
  );
}
