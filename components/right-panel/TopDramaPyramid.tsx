'use client';

import Image from 'next/image';
import SectionTitle from '@/components/common/SectionTitle';
import VideoBase from '@/components/common/VideoBase';
import { getTopDramasMock, type TopDrama } from '@/lib/mockData';

/**
 * 爆款短剧孵化矩阵 — 金字塔排行榜
 */
export default function TopDramaPyramid() {
  const dramas = getTopDramasMock();

  return (
    <section className="relative rounded-lg overflow-hidden flex flex-col"
      style={{ background: 'rgba(10, 25, 60, 0.6)', border: '1px solid rgba(0, 180, 255, 0.15)' }}>
      <SectionTitle type={4} />

      <div className="flex-1 relative flex items-center justify-between px-4">
        {/* 排名列表 - 靠左 */}
        <div className="flex flex-col gap-5 py-4 relative z-10">
          {dramas.map((drama) => (
            <div key={drama.rank} className="flex items-center gap-3 transform hover:translate-x-1 transition-transform cursor-pointer">
              <Image
                src={`/assets/images/top${drama.rank}@2x.png`}
                alt={`第${drama.rank}名`}
                width={36}
                height={36}
                className="flex-shrink-0"
              />
              <div className="flex flex-col">
                <span className="digit-font text-sm font-bold" style={{ color: '#00e0ff' }}>{drama.plays}</span>
                <span className="text-xs mt-0.5" style={{ color: '#e8f0fe' }}>{drama.title}</span>
              </div>
            </div>
          ))}
        </div>

        {/* 金字塔动效 - 靠右 */}
        <div className="relative w-48 h-48 -mr-4">
          <VideoBase videoSrc="/assets/videos/金字塔.mp4" className="absolute inset-0 w-full h-full" />
        </div>
      </div>
    </section>
  );
}
