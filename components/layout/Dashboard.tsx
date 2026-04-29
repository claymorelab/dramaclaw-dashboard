"use client";

import { useRef, useState } from "react";
import HeaderBar from "./HeaderBar";
import FooterBar from "./FooterBar";
import DashboardBorder from "./DashboardBorder";
import ScaleWrapper from "./ScaleWrapper";
import LeftPanel from "../left-panel/LeftPanel";
import RightPanel from "../right-panel/RightPanel";
import CenterArea from "../center-area/CenterArea";
import BottomArea from "../bottom-area/Bottomarea";

export type DashboardMode = "datascreen" | "dramaclaw";

/**
 * 数字驾驶舱主容器 — 固定设计稿 1920×1134，外层 ScaleWrapper 负责等比缩放
 */
export default function Dashboard() {
  const [mode, setMode] = useState<DashboardMode>("datascreen");
  const isDataScreen = mode === "datascreen";

  const videoRef = useRef<HTMLVideoElement>(null);
  // 浏览器自动播放策略要求 muted=true 才能 autoplay,所以默认静音
  const [muted, setMuted] = useState(true);

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    const next = !muted;
    v.muted = next;
    setMuted(next);
    // 某些浏览器在切换 muted 后会暂停,这里强制继续播放
    v.play().catch(() => {});
  };

  return (
    <ScaleWrapper>
      <div className="relative w-full h-full overflow-hidden flex flex-col">
        {/* 背景层 — 仅在数据大屏模式显示 */}
        {isDataScreen && (
          <>
            <video
              ref={videoRef}
              src="/assets/video/bg.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />
            <img
              src="/assets/images/bg-warper.png"
              alt=""
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />
          </>
        )}

        {/* 顶部标题栏 */}
        <HeaderBar />

        {/* 主体内容区 */}
        {isDataScreen ? (
          <main className="relative flex-1 flex px-12 py-2 gap-4 overflow-hidden">
            {/* 左侧面板 */}
            <div className="relative w-[25%] flex-shrink-0 h-full">
              <div className="h-full overflow-hidden">
                <LeftPanel />
              </div>
            </div>

            {/* 中间区域 */}
            <div className="flex-1 flex flex-col overflow-hidden">
              <CenterArea />
            </div>

            {/* 右侧面板 */}
            <div className="relative w-[25%] flex-shrink-0 h-full">
              <div className="h-full overflow-hidden">
                <RightPanel />
              </div>
            </div>
          </main>
        ) : (
          <main className="relative flex-1 overflow-hidden">
            <iframe
              src="https://dramaclaw.ai/home"
              className="w-full h-full border-0"
              title="DramaClaw"
            />
          </main>
        )}

        {/* 切换按钮 — 与模式无关，始终位于 main 下方相同位置 */}
        <BottomArea mode={mode} onChange={setMode} />

        {/* 底部装饰 */}
        <FooterBar />

        {/* 边框装饰 — 放最后，靠 DOM 顺序压在所有内容之上 */}
        <DashboardBorder />

        {/* 声音开关 — 仅在数据大屏模式显示,放在边框之后保证可点击 */}
        {isDataScreen && (
          <button
            type="button"
            onClick={toggleMute}
            aria-label={muted ? "开启声音" : "关闭声音"}
            className="absolute bottom-24 right-16 z-40 w-10 h-10 flex items-center justify-center rounded-full border border-cyan-400/40 bg-black/40 backdrop-blur-sm text-cyan-300 hover:bg-cyan-400/20 hover:text-white transition"
          >
            {muted ? (
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </svg>
            )}
          </button>
        )}
      </div>
    </ScaleWrapper>
  );
}
