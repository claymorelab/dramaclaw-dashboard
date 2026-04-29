"use client";

import Image from "next/image";
import { NOTICES } from "@/lib/mockData";

/**
 * 中间区域 - 跑马灯通知栏 + 中央主视觉
 */
export default function CenterArea() {
  // 复制一份用于无缝循环:轨道滚动到 -50% 时,第二份正好落在起点位置
  const items = [...NOTICES, ...NOTICES];

  return (
    <div className="relative flex flex-col items-center justify-start pt-8 gap-6 flex-1">
      {/* 跑马灯通知栏 — 多条数据连续滚动,首尾无缝衔接,条目之间留间距 */}
      <div className="relative w-full max-w-2xl h-10 flex items-center z-10">
        <Image
          src="/assets/images/notice-bar.png"
          alt=""
          fill
          className="object-contain"
        />
        <div className="absolute inset-0 px-8 overflow-hidden flex items-center leading-none">
          <div className="marquee-loop inline-flex items-center whitespace-nowrap flex-shrink-0">
            {items.map((notice, i) => (
              <div
                key={i}
                className="inline-flex items-center gap-2 mr-10 flex-shrink-0"
              >
                <Image
                  src="/assets/images/notice.png"
                  alt="通知"
                  width={18}
                  height={18}
                  className="flex-shrink-0"
                />
                <p
                  className="text-sm whitespace-nowrap color-override"
                  style={{ color: "#e8f0fe" }}
                >
                  {notice.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 中央留白区域 */}
      <div className="flex-1 flex items-center justify-center"></div>
    </div>
  );
}
