import Image from 'next/image';

/**
 * 底部装饰条组件 — 使用切图
 */
export default function FooterBar() {
  return (
    <footer className="relative w-full" style={{ height: '40px' }}>
      <Image
        src="/assets/images/footer.png"
        alt=""
        fill
        className="object-contain"
        priority
      />
    </footer>
  );
}
