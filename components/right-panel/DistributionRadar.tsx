'use client';

import SectionTitle from '@/components/common/SectionTitle';
import VideoBase from '@/components/common/VideoBase';

/**
 * 跨平台分发雷达图 — 使用动效资源
 */
export default function DistributionRadar() {
  return (
    <section className="relative rounded-lg overflow-hidden flex flex-col"
      style={{ background: 'rgba(10, 25, 60, 0.6)', border: '1px solid rgba(0, 180, 255, 0.15)' }}>
      <SectionTitle type={5} />

      <div className="flex-1 relative overflow-hidden">
        <VideoBase videoSrc="/assets/videos/雷达分发.mp4" className="absolute inset-0 w-full h-full object-contain" />
      </div>
    </section>
  );
}
