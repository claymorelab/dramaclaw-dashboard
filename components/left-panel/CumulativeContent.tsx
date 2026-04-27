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
 * 累计生成数字内容 — 3个指标 + 动效底座
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
      video: "/assets/video/time.mp4",
      value: data.duration,
      label: "累计生成时长",
    },
    {
      video: "/assets/video/episode.mp4",
      value: data.episodes,
      label: "累计生成集数",
    },
    {
      video: "/assets/video/bs.mp4",
      value: data.series,
      label: "累计生成部数",
    },
  ];

  return (
    <section className="relative rounded-lg flex flex-col">
      <SectionTitle type={1} />

      {/* 三个指标 */}
      <div className="grid grid-cols-3 gap-2 px-3 pb-3">
        {indicators.map((item, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-start gap-1"
          >
            {/* 动效图标 */}
            <div className="relative w-36 h-36 mb-1">
              <VideoBase videorc={item.video} className="absolute inset-0" />
            </div>
            {/* 数字 */}
            <span
              className="digit-font text-2xl font-bold"
              style={{ color: "#e8f0fe" }}
            >
              {item.value}
            </span>
            {/* 标签 */}
            <span className="text-xs" style={{ color: "#8ba3c7" }}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
