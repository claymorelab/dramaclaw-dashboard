'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface FlipDigitProps {
  value: string;
}

/**
 * 单个翻转数字 — CSS 翻转动画
 */
export default function FlipDigit({ value }: FlipDigitProps) {
  const [display, setDisplay] = useState(value);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (value !== display) {
      setAnimating(true);
      const timer = setTimeout(() => {
        setDisplay(value);
        setAnimating(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [value, display]);

  return (
    <div className="relative w-8 h-10 flex items-center justify-center">
      <Image
        src="/assets/images/digit-bg.png"
        alt=""
        fill
        className="object-contain"
      />
      <span className="digit-font relative z-10 text-xl font-bold"
        style={{
          color: '#e8f0fe',
          textShadow: '0 0 8px rgba(0, 224, 255, 0.5)',
          transform: animating ? 'rotateX(90deg)' : 'rotateX(0deg)',
          transition: 'transform 0.3s ease-in-out',
        }}>
        {display}
      </span>
    </div>
  );
}
