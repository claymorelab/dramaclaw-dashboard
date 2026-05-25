"use client";

import DailyEpisodesChart from "./DailyEpisodesChart";
import DailyMinutesChart from "./DailyMinutesChart";

/**
 * 每日趋势图表组合容器
 */
export default function DailyTrends() {
  return (
    <div className="flex flex-col gap-3">
      {/* <div className="min-h-[180px]">
        <DailyEpisodesChart />
      </div> */}
      <div className="h-[195px]">
        <DailyMinutesChart />
      </div>
    </div>
  );
}
