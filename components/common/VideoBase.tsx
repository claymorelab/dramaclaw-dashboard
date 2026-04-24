'use client';

import { useEffect, useRef } from 'react';

interface VideoBaseProps {
  videoSrc: string;
  className?: string;
}

/**
 * 动效底座 — 循环播放 MP4 动效，screen 混合模式滤黑底
 */
export default function VideoBase({ videoSrc, className = '' }: VideoBaseProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
  }, []);

  return (
    <video
      ref={videoRef}
      src={videoSrc}
      autoPlay
      loop
      muted
      playsInline
      className={className}
      style={{ mixBlendMode: 'screen', width: '100%', height: '100%', objectFit: 'contain' }}
    />
  );
}
