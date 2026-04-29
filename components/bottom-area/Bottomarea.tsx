"use client";
import Image from "next/image";
import type { DashboardMode } from "@/components/layout/Dashboard";

const TABS = [
  { id: "datascreen", src: "/assets/images/datascreen.png", alt: "数据大屏" },
  { id: "dramaclaw", src: "/assets/images/dramaclaw.png", alt: "短剧创作" },
] as const satisfies ReadonlyArray<{
  id: DashboardMode;
  src: string;
  alt: string;
}>;

const ACTIVE_FX =
  "brightness-125 scale-105 drop-shadow-[0_0_10px_rgba(0,224,255,0.6)]";
const INACTIVE_FX =
  "brightness-75 hover:brightness-125 hover:scale-105 hover:drop-shadow-[0_0_10px_rgba(0,224,255,0.6)]";

interface BottomAreaProps {
  mode: DashboardMode;
  onChange: (m: DashboardMode) => void;
}

export default function BottomArea({ mode, onChange }: BottomAreaProps) {
  return (
    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3 z-30">
      {TABS.map((tab) => (
        <Image
          key={tab.id}
          src={tab.src}
          alt={tab.alt}
          width={120}
          height={56}
          onClick={() => onChange(tab.id)}
          className={`cursor-pointer pointer-events-auto transition-all duration-200 ${
            mode === tab.id ? ACTIVE_FX : INACTIVE_FX
          }`}
        />
      ))}
    </div>
  );
}
