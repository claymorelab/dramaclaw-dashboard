"use client";

import Image from "next/image";
import SectionTitle from "@/components/common/SectionTitle";
import VideoBase from "@/components/common/VideoBase";
import { getTopDramasMock, type TopDrama } from "@/lib/mockData";

/**
 * 爆款短剧孵化矩阵 — 金字塔排行榜
 */

export default function TopDramaPyramid() {
  const dramas = getTopDramasMock();

  return (
    <section className="relative rounded-lg overflow-hidden flex flex-col">
      <SectionTitle type={4} />

      <div className="flex-1 relative flex items-stretch px-4">
        {/* 排名列表 + 连接线（按金字塔层级对齐） */}
        <div className="flex-1 flex flex-col justify-evenly py-2 relative z-10">
          {dramas.map((drama) => {
            // 每个名次的连接线深入金字塔到对应塔层左缘的距离（px）
            // 金字塔由窄到宽，名次越高线越长，深入到顶部塔尖
            const tierReach = { 1: 90, 2: 62, 3: 35 }[drama.rank] ?? 24;
            const bottom = { 1: 10, 2: 35, 3: 52 }[drama.rank] ?? 0;
            // 连线长度（px）— 按排名调整每条线的可见长度
            const lineLength = { 1: 100, 2: 140, 3: 180 }[drama.rank] ?? 140;
            const right_offset = { 1: 0, 2: 18, 3: 28 }[drama.rank] ?? 8;
            // 文字向上偏移，让其落在连线上方（连线位置不动）
            const textShiftClass =
              { 1: "-translate-y-2", 2: "-translate-y-3", 3: "-translate-y-4" }[
                drama.rank
              ] ?? "-translate-y-0";
            return (
              <div
                key={drama.rank}
                className="relative flex items-center justify-end gap-3 cursor-pointer group"
              >
                <div
                  className={`ml-auto flex items-center gap-3 flex-shrink-0 relative z-10 self-start mb-6 transition-transform group-hover:translate-x-1 ${textShiftClass}`}
                  style={{ marginRight: right_offset }}
                >
                  <Image
                    src={`/assets/images/top${drama.rank}.png`}
                    alt={`第${drama.rank}名`}
                    width={36}
                    height={36}
                    className="flex-shrink-0"
                  />
                  <div className="flex flex-col">
                    <span
                      className="digit-font text-sm font-bold"
                      style={{ color: "#00e0ff" }}
                    >
                      {drama.plays}
                    </span>
                    <span
                      className="text-xs mt-0.5"
                      style={{ color: "#e8f0fe" }}
                    >
                      {drama.title}
                    </span>
                  </div>
                </div>
                {/* 从图片底部出发，延伸到对应塔层的连接线 */}
                <div
                  className="absolute flex items-center pointer-events-none"
                  style={{
                    right: -tierReach,
                    width: lineLength,
                    bottom: bottom,
                    height: 1,
                  }}
                >
                  <div
                    className="flex-1 h-px"
                    style={{
                      background:
                        "linear-gradient(to right, rgba(0,224,255,0) 0%, rgba(0,224,255,0.85) 100%)",
                    }}
                  />
                  <div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{
                      background: "#00e0ff",
                      boxShadow:
                        "0 0 6px #00e0ff, 0 0 12px rgba(0,224,255,0.6)",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* 金字塔动效 - 靠右 */}
        <div className="relative w-56 h-56 -mr-4 flex-shrink-0">
          <VideoBase
            videorc="/assets/video/pyramid.mp4"
            className="absolute inset-0 w-full h-full"
          />
        </div>
      </div>
    </section>
  );
}
