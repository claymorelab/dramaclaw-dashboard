'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { getDailyMinutesMock, type DailyMinutesData } from '@/lib/mockData';

const ReactECharts = dynamic(() => import('echarts-for-react'), { ssr: false });

/**
 * 每日生成分钟数 — 面积曲线图
 */
export default function DailyMinutesChart() {
  const [data, setData] = useState<DailyMinutesData>(getDailyMinutesMock());

  useEffect(() => {
    const timer = setInterval(() => {
      setData(getDailyMinutesMock());
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const maxValue = Math.max(...data.values);
  const maxIdx = data.values.indexOf(maxValue);

  const option = {
    grid: { top: 15, right: 10, bottom: 20, left: 35 },
    tooltip: {
      trigger: 'axis',
      formatter: (params: any) => `${params[0].name}<br/>${params[0].value} 分钟`,
    },
    xAxis: {
      type: 'category',
      data: data.dates,
      axisLine: { lineStyle: { color: 'rgba(0, 180, 255, 0.2)' } },
      axisLabel: { color: '#8ba3c7', fontSize: 10 },
    },
    yAxis: {
      type: 'value',
      max: 80,
      splitLine: { lineStyle: { color: 'rgba(0, 180, 255, 0.1)' } },
      axisLabel: { color: '#8ba3c7', fontSize: 10 },
    },
    series: [
      {
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { color: '#00e0ff', width: 2 },
        itemStyle: { color: '#00e0ff' },
        areaStyle: {
          color: {
            type: 'linear' as const,
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(0, 224, 255, 0.3)' },
              { offset: 1, color: 'rgba(0, 224, 255, 0.02)' },
            ],
          },
        },
        data: data.values.map((v, i) => ({
          value: v,
          label: i === maxIdx ? {
            show: true,
            position: 'top' as const,
            formatter: `${v}分钟`,
            color: '#00e0ff',
            fontSize: 10,
            backgroundColor: 'rgba(0, 20, 50, 0.8)',
            padding: [2, 6],
            borderRadius: 3,
          } : undefined,
        })),
      },
    ],
  };

  return (
    <section className="relative rounded-lg overflow-hidden flex flex-col"
      style={{ background: 'rgba(10, 25, 60, 0.6)', border: '1px solid rgba(0, 180, 255, 0.15)' }}>
      <div className="px-4 py-2">
        <h3 className="text-sm" style={{ color: '#e8f0fe' }}>每日生成分钟数（同比上周）</h3>
      </div>
      <div className="flex-1">
        <ReactECharts option={option} style={{ height: '100%', width: '100%' }} notMerge />
      </div>
    </section>
  );
}
