"use client";

import { useEffect, useState } from "react";
import SectionTitle from "@/components/common/SectionTitle";
import FlipDigit from "@/components/common/FlipDigit";
import VideoBase from "@/components/common/VideoBase";
import {
  INITIAL_TOTAL_PLAY,
  INITIAL_PLATFORM_PLAY,
  getTotalPlayMock,
  getPlatformPlayMock,
  type TotalPlayData,
  type PlatformPlayData,
} from "@/lib/mockData";

/**
 * 全网累计播放量 — 数字翻转牌 + 分平台播放
 */
export default function TotalPlayAmount() {
  const [total, setTotal] = useState<TotalPlayData>(INITIAL_TOTAL_PLAY);
  const [platform, setPlatform] = useState<PlatformPlayData>(
    INITIAL_PLATFORM_PLAY,
  );

  useEffect(() => {
    setTotal(getTotalPlayMock());
    setPlatform(getPlatformPlayMock());
    const timer = setInterval(() => {
      setTotal(getTotalPlayMock());
      setPlatform(getPlatformPlayMock());
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const digits = String(total.value).padStart(8, "0").split("");

  return (
    <section className="relative rounded-lg overflow-hidden flex flex-col">
      <SectionTitle type={3} />

      <div className="flex flex-col flex-1 px-4 py-2 gap-4">
        {/* 数字翻转牌 */}
        <div className="flex items-center justify-center gap-1">
          {digits.map((d, i) => (
            <FlipDigit key={i} value={d} />
          ))}
          <span className="text-sm ml-1" style={{ color: "#8ba3c7" }}>
            次
          </span>
        </div>

        {/* 分平台播放 */}
        <div className="flex justify-around">
          {[
            {
              name: "抖音",
              value: platform.douyin,
              video: "/assets/video/dy.mp4",
            },
            {
              name: "快手",
              value: platform.kuaishou,
              video: "/assets/video/ks.mp4",
            },
            {
              name: "微信剧场",
              value: platform.wechat,
              video: "/assets/video/wechat.mp4",
            },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="relative w-28 h-24">
                <VideoBase videorc={item.video} className="absolute inset-0 " />
              </div>
              <span
                className="digit-font text-lg font-bold"
                style={{ color: "#e8f0fe" }}
              >
                {item.value}
              </span>
              <span className="text-xs" style={{ color: "#8ba3c7" }}>
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
