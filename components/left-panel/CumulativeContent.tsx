'use client';

import { useEffect, useState } from 'react';
import VideoBase from '@/components/common/VideoBase';
import SectionTitle from '@/components/common/SectionTitle';
import { getCumulativeMock, type CumulativeData } from '@/lib/mockData';

/**
 * 累计生成数字内容 — 3个指标 + 动效底座
 */
export default function CumulativeContent() {
  const [data, setData] = useState<CumulativeData>(getCumulativeMock());

  useEffect(() => {
    const timer = setInterval(() => {
      setData(getCumulativeMock());
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const indicators = [
    { video: '/assets/videos/累计生成时长.mp4', value: data.duration, label: '累计生成时长' },
    { video: '/assets/videos/累计生成集数.mp4', value: data.episodes, label: '累计生成集数' },
    { video: '/assets/videos/累计生成部数.mp4', value: data.series, label: '累计生成帧数' },
  ];

  return (
    <section className="relative rounded-lg overflow-hidden flex flex-col"
      style={{ background: 'rgba(10, 25, 60, 0.6)', border: '1px solid rgba(0, 180, 255, 0.15)' }}>
      <SectionTitle type={1} />

      {/* 三个指标 */}
      <div className="flex-1 grid grid-cols-3 gap-2 p-3">
        {indicators.map((item, i) => (
          <div key={i} className="flex flex-col items-center justify-center gap-1">
            {/* 动效图标 */}
            <div className="relative w-16 h-16 mb-1">
              <VideoBase videoSrc={item.video} className="absolute inset-0" />
            </div>
            {/* 数字 */}
            <span className="digit-font text-2xl font-bold" style={{ color: '#e8f0fe' }}>
              {item.value}
            </span>
            {/* 标签 */}
            <span className="text-xs" style={{ color: '#8ba3c7' }}>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
