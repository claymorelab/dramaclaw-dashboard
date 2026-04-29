"use client";

import { useState, useEffect, useRef } from "react";
import type { CSSProperties } from "react";

interface FlipDigitProps {
  value: string;
}

const ANIM_DURATION = 500;

const FACE_BG: CSSProperties = {
  backgroundImage: "url(/assets/images/digit-bg.png)",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
};

const DIGIT_STYLE: CSSProperties = {
  color: "#e8f0fe",
  textShadow: "0 0 8px rgba(0, 224, 255, 0.5)",
  fontSize: "40px",
};

/**
 * 单个翻转数字 — 3D 分屏翻牌动画
 * 静态层显示当前数字;翻转层在动画期间叠加,front=旧数字,back=新数字,
 * rotateX 0→-180 + 中点阴影闪烁,合页中线 + 两侧轴点装饰常驻。
 */
export default function FlipDigit({ value }: FlipDigitProps) {
  const [display, setDisplay] = useState(value);
  const [flipFrom, setFlipFrom] = useState<string | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (value === display) return;
    setFlipFrom(display);
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setDisplay(value);
      setFlipFrom(null);
      timerRef.current = null;
    }, ANIM_DURATION);
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [value, display]);

  const animKey = `${flipFrom}->${value}`;

  return (
    <div
      className="relative w-12 h-14 overflow-hidden rounded-md"
      style={{ perspective: "400px" }}
    >
      {/* 静态层 */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={FACE_BG}
      >
        <span className="digit-font font-bold leading-none" style={DIGIT_STYLE}>
          {display}
        </span>
      </div>

      {/* 翻转层 — 仅动画期间渲染 */}
      {flipFrom !== null && (
        <>
          <div
            key={animKey}
            className="absolute inset-0 flip-anim"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                ...FACE_BG,
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              <span
                className="digit-font font-bold leading-none"
                style={DIGIT_STYLE}
              >
                {flipFrom}
              </span>
            </div>
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                ...FACE_BG,
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateX(180deg)",
              }}
            >
              <span
                className="digit-font font-bold leading-none"
                style={DIGIT_STYLE}
              >
                {value}
              </span>
            </div>
          </div>
          {/* 翻转中点阴影闪烁 */}
          <div
            key={`${animKey}-shadow`}
            className="absolute inset-0 flip-shadow pointer-events-none"
            style={{ zIndex: 15 }}
          />
        </>
      )}

      {/* 合页中线 */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: 4,
          right: 4,
          top: "50%",
          height: 1,
          background: "rgba(0,0,0,0.6)",
          zIndex: 20,
        }}
      />
      {/* 两侧轴点 */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: 2,
          top: "50%",
          width: 6,
          height: 6,
          transform: "translateY(-50%)",
          background: "#0a1838",
          borderRadius: "50%",
          boxShadow: "inset 0 1px 1px rgba(255,255,255,0.08)",
          zIndex: 20,
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          right: 2,
          top: "50%",
          width: 6,
          height: 6,
          transform: "translateY(-50%)",
          background: "#0a1838",
          borderRadius: "50%",
          boxShadow: "inset 0 1px 1px rgba(255,255,255,0.08)",
          zIndex: 20,
        }}
      />
    </div>
  );
}
