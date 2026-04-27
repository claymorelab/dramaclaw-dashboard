"use client";

import HeaderBar from "./HeaderBar";
import FooterBar from "./FooterBar";
import DashboardBorder from "./DashboardBorder";
import ScaleWrapper from "./ScaleWrapper";
import LeftPanel from "../left-panel/LeftPanel";
import RightPanel from "../right-panel/RightPanel";
import CenterArea from "../center-area/CenterArea";
import VideoBase from "../common/VideoBase";

/**
 * 数字驾驶舱主容器 — 固定设计稿 1920×1134，外层 ScaleWrapper 负责等比缩放
 */
export default function Dashboard() {
  return (
    <ScaleWrapper>
      <div className="relative w-full h-full overflow-hidden flex flex-col">
        {/* 顶部标题栏 */}
        <HeaderBar />

        {/* 主体内容区 - 三栏布局 */}
        <main className="relative flex-1 flex px-12 py-2 gap-4 overflow-hidden">
          {/* 左侧面板 */}
          <div className="relative w-[25%] flex-shrink-0 h-full">
            <div className="h-full overflow-hidden">
              <LeftPanel />
            </div>
            <video
              src="/assets/video/stream-left.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute -top-20 left-full h-[120%] w-40 object-cover pointer-events-none z-10"
              style={{ mixBlendMode: "screen", opacity: 0.5 }}
            />
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
            <video
              src="/assets/video/stream-right.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute -top-20 right-full h-[120%] w-40 object-cover pointer-events-none z-10"
              style={{ mixBlendMode: "screen", opacity: 0.5 }}
            />
          </div>
        </main>

        {/* 底部装饰 */}
        <FooterBar />

        {/* 边框装饰 — 放最后，靠 DOM 顺序压在所有内容之上 */}
        <DashboardBorder />
      </div>
    </ScaleWrapper>
  );
}
