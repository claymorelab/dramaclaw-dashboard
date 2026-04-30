"use client";

import { useEffect, useState } from "react";
import SectionTitle from "@/components/common/SectionTitle";
import Image from "next/image";

const INITIAL_VALUES = [3000, 1000];
const LABELS = ["用户总量", "活跃用户数"];
const MAX_VALUE = 10000;
const TICK_MS = 5000;

/**
 * 用户数统计 — 每 10s 数字递增,封顶 10000
 */
export default function UserCount() {
  const [values, setValues] = useState<number[]>(INITIAL_VALUES);

  useEffect(() => {
    const timer = setInterval(() => {
      setValues((prev) =>
        prev.map((v) =>
          Math.min(MAX_VALUE, v + Math.floor(Math.random() * 40) + 10),
        ),
      );
    }, TICK_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative rounded-lg flex flex-col grow ">
      <SectionTitle title="用户数统计" />
      <div className="grid grid-cols-2 gap-4 px-6 pb-3 grow items-center">
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
