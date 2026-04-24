'use client';

import TotalPlayAmount from './TotalPlayAmount';
import TopDramaPyramid from './TopDramaPyramid';
import DistributionRadar from './DistributionRadar';

/**
 * 右侧面板容器
 */
export default function RightPanel() {
  return (
    <div className="flex flex-col gap-3 h-full">
      <TotalPlayAmount />
      <TopDramaPyramid />
      <DistributionRadar />
    </div>
  );
}
