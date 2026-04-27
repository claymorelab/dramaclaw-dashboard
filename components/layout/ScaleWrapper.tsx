"use client";

import { useEffect, useRef, useState } from "react";

const BASE_WIDTH = 1920;
const BASE_HEIGHT = 1134;

export default function ScaleWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [scale, setScale] = useState(1);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const update = () => {
      const next = Math.min(
        window.innerWidth / BASE_WIDTH,
        window.innerHeight / BASE_HEIGHT,
      );
      setScale(next);
    };
    const onResize = () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center overflow-hidden"
      style={{ background: "#040914" }}
    >
      <div
        style={{
          position: "relative",
          width: BASE_WIDTH,
          height: BASE_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          flexShrink: 0,
          overflow: "hidden",
        }}
      >
        <video
          src="/assets/video/%E8%A7%86%E9%A2%91%E8%83%8C%E6%99%AF.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        <img
          src="/assets/images/bg-warper.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
