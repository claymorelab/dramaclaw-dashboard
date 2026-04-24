'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { NOTICES } from '@/lib/mockData';

/**
 * 中间区域 - 滚动通知 + 中央留白
 */
export default function CenterArea() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % NOTICES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-start pt-8 gap-6">
      {/* 滚动通知栏 — 使用切图背景 + 通知图标 */}
      <div className="relative w-full max-w-2xl h-10 flex items-center">
        <Image
          src="/assets/images/通知栏@2x.png"
          alt=""
          fill
          className="object-contain"
        />
        <div className="absolute inset-0 flex items-center px-8 z-10 gap-2">
          <Image
            src="/assets/images/通知@2x.png"
            alt="通知"
            width={18}
            height={18}
            className="flex-shrink-0"
          />
          <p className="text-sm truncate" style={{ color: '#e8f0fe' }}>
            {NOTICES[currentIndex].text}
          </p>
        </div>
      </div>

      {/* 中央留白区域 */}
      <div className="flex-1 flex items-center justify-center">
        <p className="text-2xl" style={{ color: 'rgba(0, 212, 255, 0.15)', fontFamily: "'Montserrat Alternates', sans-serif" }}>DramaClaw</p>
      </div>
    </div>
  );
}
