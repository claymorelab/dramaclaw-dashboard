"use client";

import { useEffect, useState } from "react";
import VideoBase from "@/components/common/VideoBase";
import SectionTitle from "@/components/common/SectionTitle";
import {
  INITIAL_CUMULATIVE,
  getCumulativeMock,
  type CumulativeData,
} from "@/lib/mockData";

/**
 * 数字资产概览
 */
export default function CumulativeContent() {
  const [data, setData] = useState<CumulativeData>(INITIAL_CUMULATIVE);

  useEffect(() => {
    setData(getCumulativeMock());
    const timer = setInterval(() => {
      setData(getCumulativeMock());
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const indicators = [
    {
      video: "/assets/video/zsc.mp4",
      value: data.duration,
      label: "累计生成时长",
    },
    {
      video: "/assets/video/zbs.mp4",
      value: data.episodes,
      label: "累计生成集数",
    },
    {
      video: "/assets/video/ip.mp4",
      value: data.series,
      label: "累计生成部数",
    },
  ];

  return (
    <section className="relative rounded-lg flex flex-col">
      <SectionTitle title="数字资产概览" />

      {/* 三个指标 */}
      <div className="grid grid-cols-3 gap-2 px-3 pb-3 -mt-6">
        {indicators.map((item, i) => (
          <div key={i} className="flex flex-col items-center">
            {/* 动效图标 */}
            <div className="relative w-14 h-14">
              <VideoBase videorc={item.video} />
            </div>
            {/* 数字 */}
            <div
              className="digit-font font-bold leading-none"
              style={{ color: "#e8f0fe", fontSize: "32px" }}
            >
              {item.value}
            </div>
            {/* 标签 */}
            <div
              className="mt-1"
              style={{ color: "#8ba3c7", fontSize: "12px" }}
            >
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
