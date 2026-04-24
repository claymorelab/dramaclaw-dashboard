'use client';

import { useEffect, useState } from 'react';
import VideoBase from '@/components/common/VideoBase';
import SectionTitle from '@/components/common/SectionTitle';
import { getComputeCostMock, type ComputeCostData } from '@/lib/mockData';

/**
 * 视频算力成本与模型吞吐量
 */
export default function ComputeCost() {
  const [data, setData] = useState<ComputeCostData>(getComputeCostMock());

  useEffect(() => {
    const timer = setInterval(() => {
      setData(getComputeCostMock());
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative rounded-lg overflow-hidden flex flex-col"
      style={{ background: 'rgba(10, 25, 60, 0.6)', border: '1px solid rgba(0, 180, 255, 0.15)' }}>
      <SectionTitle type={2} />

      <div className="flex-1 flex flex-col p-3 gap-4">
        {/* 两个成本指标 */}
        <div className="flex gap-4">
          {/* DramaClaw */}
          <div className="flex-1 flex flex-col items-center group">
            <span className="digit-font text-2xl font-bold" style={{ color: '#00e0ff', textShadow: '0 0 10px rgba(0, 224, 255, 0.5)' }}>{data.dramaClawCost}</span>
            <span className="text-[10px] scale-90" style={{ color: '#8ba3c7' }}>元/分钟</span>
            <div className="relative w-16 h-16 mt-1 transition-transform group-hover:scale-110">
              <VideoBase videoSrc="/assets/videos/drama算力.mp4" className="absolute inset-0" />
            </div>
            <span className="text-xs mt-1 font-medium" style={{ color: '#e8f0fe' }}>DramaClaw</span>
          </div>

          {/* 其余平台 */}
          <div className="flex-1 flex flex-col items-center group">
            <span className="digit-font text-2xl font-bold" style={{ color: '#e8f0fe' }}>{data.otherPlatformCost}</span>
            <span className="text-[10px] scale-90" style={{ color: '#8ba3c7' }}>元/分钟</span>
            <div className="relative w-16 h-16 mt-1 transition-transform group-hover:scale-110">
              <VideoBase videoSrc="/assets/videos/其余平台算力.mp4" className="absolute inset-0" />
            </div>
            <span className="text-xs mt-1" style={{ color: '#8ba3c7' }}>其余平台</span>
          </div>
        </div>

        {/* Tokens 总量 */}
        <div className="flex items-center gap-4 rounded-lg px-4 py-2.5 relative overflow-hidden"
          style={{ 
            background: 'linear-gradient(90deg, rgba(0, 50, 100, 0.4) 0%, rgba(0, 20, 40, 0.2) 100%)', 
            border: '1px solid rgba(0, 180, 255, 0.2)',
            boxShadow: 'inset 0 0 15px rgba(0, 180, 255, 0.1)'
          }}>
          <div className="relative w-10 h-10 flex-shrink-0">
            <VideoBase videoSrc="/assets/videos/模型吞吐.mp4" className="absolute inset-0" />
          </div>
          <div className="flex flex-col">
            <span className="digit-font text-xl font-bold" style={{ color: '#00e0ff', textShadow: '0 0 8px rgba(0, 224, 255, 0.4)' }}>
              1500亿 Tokens
            </span>
            <p className="text-[10px]" style={{ color: '#8ba3c7' }}>累计调用大模型总量</p>
          </div>
        </div>
      </div>
    </section>
  );
}
