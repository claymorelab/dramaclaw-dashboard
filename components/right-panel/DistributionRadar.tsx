"use client";

import SectionTitle from "@/components/common/SectionTitle";
import VideoBase from "@/components/common/VideoBase";

/**
 * 跨平台分发雷达图 — 使用动效资源
 */
export default function DistributionRadar() {
  return (
    <section className="relative rounded-lg overflow-hidden flex flex-col flex-1 min-h-0 mt-4">
      <SectionTitle title="跨平台分发雷达图" />

      <div className="flex-1 relative overflow-hidden">
        <VideoBase
          videorc="/assets/video/right-bottom.mp4"
          className="absolute top-1/2 left-1/2 w-[140%] h-[140%] -translate-x-1/2 -translate-y-1/2 object-contain opacity-80"
        />
      </div>
    </section>
  );
}
