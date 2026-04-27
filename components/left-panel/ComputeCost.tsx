"use client";

import { useEffect, useState } from "react";
import VideoBase from "@/components/common/VideoBase";
import SectionTitle from "@/components/common/SectionTitle";
import {
  INITIAL_COMPUTE_COST,
  getComputeCostMock,
  type ComputeCostData,
} from "@/lib/mockData";

/**
 * 视频算力成本与模型吞吐量
 */
export default function ComputeCost() {
  const [data, setData] = useState<ComputeCostData>(INITIAL_COMPUTE_COST);

  useEffect(() => {
    setData(getComputeCostMock());
    const timer = setInterval(() => {
      setData(getComputeCostMock());
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative rounded-lg overflow-hidden flex flex-col">
      <SectionTitle type={2} />

      <div className="flex-1 flex flex-col p-3 gap-4">
        {/* 两个成本指标 */}
        <div className="flex gap-4">
          {/* DramaClaw */}
          <div className="flex-1 flex justify-center group">
            <div className="relative w-46 h-46 transition-transform group-hover:scale-110">
              {/* 底层视频 */}
              <VideoBase videorc="/assets/video/drama.mp4" />

              {/* 悬浮文字层：数字 + 元/分钟 — 居中偏上 */}
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-1 pointer-events-none -translate-y-16">
                <span
                  className="digit-font text-2xl font-bold"
                  style={{
                    color: "#00e0ff",
                    textShadow: "0 0 10px rgba(0, 224, 255, 0.5)",
                  }}
                >
                  {data.dramaClawCost}
                </span>
                <span
                  className="text-[10px] scale-90"
                  style={{ color: "#8ba3c7" }}
                >
                  元/分钟
                </span>
              </div>

              {/* 底部标签：贴在视频底部 */}
              <span
                className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 text-xs font-medium whitespace-nowrap pointer-events-none"
                style={{ color: "#e8f0fe" }}
              >
                DramaClaw
              </span>
            </div>
          </div>

          {/* 其余平台 */}
          <div className="flex-1 flex justify-center group">
            <div className="relative w-46 h-46 transition-transform group-hover:scale-110">
              {/* 底层视频 */}
              <VideoBase videorc="/assets/video/other.mp4" />

              {/* 悬浮文字层：数字 + 元/分钟 — 居中偏上 */}
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-1 pointer-events-none -translate-y-16">
                <span
                  className="digit-font text-2xl font-bold"
                  style={{ color: "#e8f0fe" }}
                >
                  {data.otherPlatformCost}
                </span>
                <span
                  className="text-[10px] scale-90"
                  style={{ color: "#8ba3c7" }}
                >
                  元/分钟
                </span>
              </div>

              {/* 底部标签：贴在视频底部 */}
              <span
                className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 text-xs whitespace-nowrap pointer-events-none"
                style={{ color: "#8ba3c7" }}
              >
                其余平台
              </span>
            </div>
          </div>
        </div>

        {/* Tokens 总量 */}
        <div className="relative overflow-hidden rounded-lg flex-1 min-h-[120px] flex flex-col justify-center">
          {/* 底层视频：占满宽度 */}
          <VideoBase
            videorc="/assets/video/left-bottom.mp4"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* 上层文字：悬浮在视频之上 */}
          <div className="relative z-10 flex flex-col items-center text-center px-4 py-2.5">
            <span
              className="digit-font text-xl font-bold"
              style={{
                color: "#00e0ff",
                textShadow: "0 0 8px rgba(0, 224, 255, 0.4)",
              }}
            >
              1500亿 Tokens
            </span>
            <p className="text-[10px]" style={{ color: "#8ba3c7" }}>
              累计调用大模型总量
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
