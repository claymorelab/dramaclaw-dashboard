import Image from 'next/image';

/**
 * 顶部标题栏组件 — 使用切图
 */
export default function HeaderBar() {
  return (
    <header className="relative w-full z-20" style={{ height: '80px' }}>
      <Image
        src="/assets/images/顶部@2x.png"
        alt=""
        fill
        className="object-contain"
        priority
      />
      {/* 左侧：日期 + 状态 */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 flex items-center gap-4 text-xs z-10" style={{ color: '#8ba3c7' }}>
        <span className="digit-font tracking-widest" style={{ color: '#e8f0fe', fontSize: '13px' }}>2026.5.01</span>
        <span className="opacity-40">|</span>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]"></span>
          <span>AI引擎运转正常</span>
        </div>
      </div>
      {/* 右侧：天气 + 年份 */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 flex items-center gap-6 text-xs z-10" style={{ color: '#8ba3c7' }}>
        <div className="flex items-center gap-2">
          <span>☁</span>
          <span>晴天 18~24°C</span>
        </div>
        <span className="opacity-40">|</span>
        <span>丙午马年</span>
      </div>
    </header>
  );
}
