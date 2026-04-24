'use client';

import DailyEpisodesChart from './DailyEpisodesChart';
import DailyMinutesChart from './DailyMinutesChart';

/**
 * 每日趋势图表组合容器
 */
export default function DailyTrends() {
  return (
    <div className="flex-1 flex flex-col gap-3 min-h-0">
      <div className="flex-1 min-h-[180px]">
        <DailyEpisodesChart />
      </div>
      <div className="flex-1 min-h-[150px]">
        <DailyMinutesChart />
      </div>
    </div>
  );
}
