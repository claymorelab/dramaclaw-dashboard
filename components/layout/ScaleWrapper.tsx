'use client';

import { useEffect, useRef, useState } from 'react';

const BASE_WIDTH = 1920;
const BASE_HEIGHT = 1134;

export default function ScaleWrapper({ children }: { children: React.ReactNode }) {
  const [scale, setScale] = useState(1);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const update = () => {
      const next = Math.min(window.innerWidth / BASE_WIDTH, window.innerHeight / BASE_HEIGHT);
      setScale(next);
    };
    const onResize = () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at center, #0d1b3e 0%, #070d1f 60%, #040914 100%)' }}>
      <div
        style={{
          width: BASE_WIDTH,
          height: BASE_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          flexShrink: 0,
        }}
      >
        {children}
      </div>
    </div>
  );
}
