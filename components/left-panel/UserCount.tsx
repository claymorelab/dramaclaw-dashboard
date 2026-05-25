"use client";

import SectionTitle from "@/components/common/SectionTitle";
import Image from "next/image";

const VALUES = [213, 73];
const LABELS = ["用户总量", "活跃用户数"];

/**
 * 用户数统计
 */
export default function UserCount() {
  const values = VALUES;

  return (
    <section className="relative rounded-lg flex flex-col grow ">
      <SectionTitle title="用户数统计" />
      <div className="grid grid-cols-2 gap-4 pl-2 pr-10 pb-3 grow items-center">
        {values.map((value, i) => (
          <div key={i} className="flex justify-center">
            <div
              className="relative"
              style={{ width: "140px", aspectRatio: "197 / 184" }}
            >
              <Image
                src="/assets/images/dz-yh.png"
                alt=""
                fill
                className="object-contain"
              />
              {/* 数字 + 标签:悬浮在底座上方 */}
              <div className="absolute left-18 bottom-8 inset-0 z-10 flex flex-col  justify-center -translate-y-2 pointer-events-none">
                <div
                  className="digit-font font-bold leading-none"
                  style={{ color: "#e8f0fe", fontSize: "32px" }}
                >
                  {value}
                </div>
                <div
                  className="mt-1"
                  style={{ color: "#8ba3c7", fontSize: "11px" }}
                >
                  {LABELS[i]}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
