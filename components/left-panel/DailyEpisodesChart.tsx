'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { INITIAL_DAILY_EPISODES, getDailyEpisodesMock, type DailyEpisodesData } from '@/lib/mockData';

const ReactECharts = dynamic(() => import('echarts-for-react'), { ssr: false });

/**
 * 每日生成集数 — 柱状图（同比上周）
 */
export default function DailyEpisodesChart() {
  const [data, setData] = useState<DailyEpisodesData>(INITIAL_DAILY_EPISODES);

  useEffect(() => {
    setData(getDailyEpisodesMock());
    const timer = setInterval(() => {
      setData(getDailyEpisodesMock());
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const option = {
    grid: { top: 10, right: 10, bottom: 20, left: 35 },
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: data.dates,
      axisLine: { lineStyle: { color: 'rgba(0, 180, 255, 0.2)' } },
      axisLabel: { color: '#8ba3c7', fontSize: 10 },
    },
    yAxis: {
      type: 'value',
      max: 150,
      splitLine: { lineStyle: { color: 'rgba(0, 180, 255, 0.1)' } },
      axisLabel: { color: '#8ba3c7', fontSize: 10 },
    },
    series: [
      {
        name: '本周',
        type: 'bar',
        barWidth: '25%',
        itemStyle: {
          color: new (require('echarts')).graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#00e0ff' },
            { offset: 1, color: '#0066cc' },
          ]),
          borderRadius: [2, 2, 0, 0],
        },
        data: data.thisWeek,
        label: {
          show: true,
          position: 'top',
          color: '#00e0ff',
          fontSize: 10,
        },
      },
      {
        name: '上周',
        type: 'bar',
        barWidth: '25%',
        itemStyle: {
          color: new (require('echarts')).graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#2196f3' },
            { offset: 1, color: '#1565c0' },
          ]),
          borderRadius: [2, 2, 0, 0],
        },
        data: data.lastWeek,
      },
    ],
  };

  return (
    <section className="relative rounded-lg overflow-hidden flex flex-col">
      <div className="px-4 py-2">
        <h3 className="text-sm" style={{ color: '#e8f0fe' }}>每日生成集数（同比上周）</h3>
      </div>
      <div className="flex-1">
        <ReactECharts option={option} style={{ height: '100%', width: '100%' }} notMerge />
      </div>
    </section>
  );
}
