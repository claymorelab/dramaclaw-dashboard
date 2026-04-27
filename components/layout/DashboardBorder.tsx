import Image from 'next/image';

/**
 * 大屏边框装饰组件 — 使用切图
 * 切图已包含四角装饰、小圆点、侧边装饰线
 */
export default function DashboardBorder() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Image
        src="/assets/images/border.png"
        alt=""
        fill
        className="object-contain"
        priority
      />
    </div>
  );
}
