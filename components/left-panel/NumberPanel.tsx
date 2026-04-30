"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import VideoBase from "@/components/common/VideoBase";
import SectionTitle from "@/components/common/SectionTitle";
import DailyTrends from "./DailyTrends";
import {
  INITIAL_CUMULATIVE_NUMBER,
  getCumulativeNumberMock,
  type CumulativeNumberData,
} from "@/lib/mockData";

/**
 * 视频算力成本与模型吞吐量
 */
export default function NumberPanel() {
  const [data, setData] = useState<CumulativeNumberData>(
    INITIAL_CUMULATIVE_NUMBER,
  );

  useEffect(() => {
    setData(getCumulativeNumberMock());
    const timer = setInterval(() => {
      setData(getCumulativeNumberMock());
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
      value: data.images,
      label: "本周总集数",
    },
    {
      value: data.images,
      label: "本周总分钟数",
    },
  ];
  // /assets/images/dz-bz.png
  return (
    <section className="relative rounded-lg flex flex-col -mt-2">
      <SectionTitle title="数字产能概览" />
      {/* 今日累计 */}
      <div className="grid grid-cols-3 gap-2 px-3 pb-3 -mt-3">
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

      {/* 本周数 */}
      <div className="grid grid-cols-2 gap-3 px-3 pb-3 mt-2">
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
                style={{ color: "#e8f0fe", fontSize: "32px" }}
              >
                {item.value}
              </div>
            </div>
            <div style={{ color: "#8ba3c7", fontSize: "12px" }}>
              {item.label}
            </div>
          </div>
        ))}
      </div>

      {/* 同比上周 */}
      <DailyTrends />
    </section>
  );
}
