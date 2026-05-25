"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import VideoBase from "@/components/common/VideoBase";
import SectionTitle from "@/components/common/SectionTitle";
import DailyTrends from "./DailyTrends";
import {
  INITIAL_CUMULATIVE_NUMBER,
  tickCumulativeNumber,
  randInt,
  type CumulativeNumberData,
} from "@/lib/mockData";

const INITIAL_WEEK = { episodes: 3000, minutes: 11300 };

/**
 * 视频算力成本与模型吞吐量
 */
export default function NumberPanel() {
  const [data, setData] = useState<CumulativeNumberData>(
    INITIAL_CUMULATIVE_NUMBER,
  );
  const [week, setWeek] = useState(INITIAL_WEEK);

  useEffect(() => {
    const timer = setInterval(() => {
      setData((prev) => tickCumulativeNumber(prev));
      setWeek((prev) => ({
        episodes: prev.episodes + randInt(1, 3),
        minutes: prev.minutes + randInt(1, 3),
      }));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const indicators = [
    {
      video: "/assets/video/ljtp.mp4",
      value: data.images,
      label: "今日累计图片数",
    },
    {
      video: "/assets/video/ljsp.mp4",
      value: data.videos,
      label: "今日累计视频数",
    },
    {
      video: "/assets/video/ljjj.mp4",
      value: data.dramas,
      label: "今日累计剧集数",
    },
  ];

  const thisWeek = [
    {
      value: week.episodes,
      label: "本周总集数",
    },
    {
      value: week.minutes,
      label: "本周总分钟数",
    },
  ];
  // /assets/images/dz-bz.png
  return (
    <section className="relative rounded-lg flex flex-col flex-1 min-h-0 -mt-2">
      <SectionTitle title="数字产能概览" />
      {/* 内容区：紧贴标题，三块在剩余空间内均匀分布 */}
      <div className="flex-1 flex flex-col justify-between min-h-0 pt-3 pb-1">
      {/* 今日累计 */}
      <div className="grid grid-cols-3 gap-2 px-3">
        {indicators.map((item, i) => (
          <div key={i} className="flex flex-col items-center">
            {/* 动效图标 */}
            <div className="relative w-16 h-16">
              <VideoBase videorc={item.video} />
            </div>
            {/* 数字 */}
            <div
              className="digit-font font-bold leading-none"
              style={{ color: "#e8f0fe", fontSize: "37px" }}
            >
              {item.value}
            </div>
            {/* 标签 */}
            <div
              className="mt-1.5"
              style={{ color: "#8ba3c7", fontSize: "13px" }}
            >
              {item.label}
            </div>
          </div>
        ))}
      </div>

      {/* 本周数 */}
      <div className="grid grid-cols-2 gap-3 px-3">
        {thisWeek.map((item, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div
              className="relative w-full"
              style={{ aspectRatio: "296 / 96" }}
            >
              <Image
                src="/assets/images/dz-bz.png"
                alt=""
                fill
                className="object-contain"
              />
              <div
                className="absolute inset-0 bottom-3 flex items-center justify-center digit-font font-bold leading-none"
                style={{ color: "#e8f0fe", fontSize: "37px" }}
              >
                {item.value}
              </div>
            </div>
            <div style={{ color: "#8ba3c7", fontSize: "13px" }}>
              {item.label}
            </div>
          </div>
        ))}
      </div>

      {/* 同比上周 */}
      <DailyTrends />
      </div>
    </section>
  );
}
