import Image from 'next/image';

/**
 * 底部装饰条组件 — 使用切图
 */
export default function FooterBar() {
  return (
    <footer className="relative w-full z-20" style={{ height: '40px' }}>
      <Image
        src="/assets/images/底部@2x.png"
        alt=""
        fill
        className="object-contain"
        priority
      />
    </footer>
  );
}
