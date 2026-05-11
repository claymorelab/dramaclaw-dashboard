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
 * 每分钟算力成本
 */
export default function ComputeCost() {
  const [data, setData] = useState<ComputeCostData>(INITIAL_COMPUTE_COST);

  // useEffect(() => {
  //   setData(getComputeCostMock());
  //   const timer = setInterval(() => {
  //     setData(getComputeCostMock());
  //   }, 3000);
  //   return () => clearInterval(timer);
  // }, []);

  return (
    <section className="relative rounded-lg flex flex-col py-2">
      <SectionTitle title="每分钟算力成本" />

      <div className="flex-1 flex gap-4 mt-2">
        {[
          { value: data.dramaClawCost, name: "DramaClaw" },
          { value: data.otherPlatformCost, name: "其余平台" },
        ].map((item, i) => (
          <div key={i} className="flex-1 flex flex-col items-center group">
            {/* 底座动效 + 悬浮文字 */}
            <div className="relative w-20 h-20 transition-transform">
              <VideoBase
                videorc="/assets/video/dz.mp4"
                className="absolute top-[65%] left-1/2 w-[110%] h-[110%] -translate-x-1/2 -translate-y-1/2 object-cover"
              />
              {/* 数字 + 单位:悬浮在视频中间 */}
              <div className="absolute inset-0 z-10 flex flex-col bottom-12 items-center justify-center pointer-events-none">
                <div
                  className="digit-font font-bold leading-none mb-0.5 color-override"
                  style={{
                    color: i === 0 ? "#00e0ff" : "#ffffff",
                    fontSize: "32px",
                    textShadow:
                      i === 0 ? "0 0 10px rgba(0, 224, 255, 0.5)" : "none",
                  }}
                >
                  {item.value}
                </div>
                <div
                  style={{ color: "#ffffff", fontSize: "11px", opacity: 0.8 }}
                >
                  元/分钟
                </div>
              </div>
            </div>
            {/* 平台名 */}
            <div
              className="mt-2"
              style={{ color: "#e8f0fe", fontSize: "12px" }}
            >
              {item.name}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
