'use client';

import CumulativeContent from './CumulativeContent';
import DailyTrends from './DailyTrends';
import ComputeCost from './ComputeCost';

/**
 * 左侧面板容器
 */
export default function LeftPanel() {
  return (
    <div className="flex flex-col gap-3 h-full">
      <CumulativeContent />
      <DailyTrends />
      <ComputeCost />
    </div>
  );
}
