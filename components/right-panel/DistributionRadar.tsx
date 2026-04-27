"use client";

import SectionTitle from "@/components/common/SectionTitle";
import VideoBase from "@/components/common/VideoBase";

/**
 * 跨平台分发雷达图 — 使用动效资源
 */
export default function DistributionRadar() {
  return (
    <section className="relative rounded-lg overflow-hidden flex flex-col flex-1 min-h-0">
      <SectionTitle type={5} />

      <div className="flex-1 relative overflow-hidden">
        <VideoBase
          videorc="/assets/video/right-bottom.mp4"
          className="absolute inset-0 w-full h-full object-contain"
        />
      </div>
    </section>
  );
}
