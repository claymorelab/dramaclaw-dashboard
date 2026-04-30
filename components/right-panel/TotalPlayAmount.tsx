"use client";

import { useEffect, useState } from "react";
import SectionTitle from "@/components/common/SectionTitle";
import FlipDigit from "@/components/common/FlipDigit";
import VideoBase from "@/components/common/VideoBase";
import Image from "next/image";
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
  const [tokens, setTokens] = useState(1000);

  useEffect(() => {
    setTotal(getTotalPlayMock());
    setPlatform(getPlatformPlayMock());
    const timer = setInterval(() => {
      setTotal(getTotalPlayMock());
      setPlatform(getPlatformPlayMock());
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTokens((v) => Math.min(9999, v + 100));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const digits = String(total.value).padStart(8, "0").split("");

  return (
    <section className="relative rounded-lg overflow-hidden flex flex-col">
      <SectionTitle title="全网累计播放量" />

      <div className="flex flex-col flex-1 px-3 py-2 gap-4">
        {/* 数字翻转牌 */}
        <div className="flex items-center ml-6 gap-1">
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
              video: "/assets/video/dylj.mp4",
            },
            {
              name: "快手",
              value: platform.kuaishou,
              video: "/assets/video/kslj.mp4",
            },
            {
              name: "微信剧场",
              value: platform.wechat,
              video: "/assets/video/jclj.mp4",
            },
            {
              name: "其余平台",
              value: platform.other,
              video: "/assets/video/qylj.mp4",
            },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="relative w-20 h-20">
                <VideoBase videorc={item.video} className="absolute inset-0 " />
              </div>
              <span
                className="digit-font font-bold -mt-6"
                style={{ color: "#e8f0fe", fontSize: "32px" }}
              >
                {item.value}
              </span>
              <span className="text-xs mt-0.5" style={{ color: "#8ba3c7" }}>
                {item.name}
              </span>
            </div>
          ))}
        </div>
        {/* 累计 Tokens */}
        <div className="flex flex-col items-center gap-1">
          <div className="relative w-2/3" style={{ aspectRatio: "634 / 135" }}>
            <Image
              src="/assets/images/dz-mx.png"
              alt=""
              fill
              className="object-contain"
            />
            <div
              className="absolute inset-0 flex top-2 justify-center digit-font font-bold leading-none"
              style={{ color: "#e8f0fe", fontSize: "32px" }}
            >
              {tokens}
            </div>
          </div>
          <div style={{ color: "#8ba3c7", fontSize: "12px" }}>
            累计调用模型Tokens(亿)
          </div>
        </div>
      </div>
    </section>
  );
}
