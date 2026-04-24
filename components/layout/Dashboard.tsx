'use client';

import HeaderBar from './HeaderBar';
import FooterBar from './FooterBar';
import DashboardBorder from './DashboardBorder';
import ScaleWrapper from './ScaleWrapper';
import LeftPanel from '../left-panel/LeftPanel';
import RightPanel from '../right-panel/RightPanel';
import CenterArea from '../center-area/CenterArea';

/**
 * 数字驾驶舱主容器 — 固定设计稿 1920×1134，外层 ScaleWrapper 负责等比缩放
 */
export default function Dashboard() {
  return (
    <ScaleWrapper>
      <div className="relative w-full h-full overflow-hidden flex flex-col">

      {/* 边框装饰 */}
      <DashboardBorder />

      {/* 顶部标题栏 */}
      <HeaderBar />

      {/* 主体内容区 - 三栏布局 */}
      <main className="flex-1 flex px-4 py-2 gap-4 z-20 overflow-hidden">
        {/* 左侧面板 */}
        <div className="w-[25%] flex flex-col gap-3 overflow-hidden">
          <LeftPanel />
        </div>

        {/* 中间区域 */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <CenterArea />
        </div>

        {/* 右侧面板 */}
        <div className="w-[25%] flex flex-col gap-3 overflow-hidden">
          <RightPanel />
        </div>
      </main>

      {/* 底部装饰 */}
      <FooterBar />
      </div>
    </ScaleWrapper>
  );
}
