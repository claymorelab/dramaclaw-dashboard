'use client';

import Image from 'next/image';

type SectionTitleType = 1 | 2 | 3 | 4 | 5;

interface SectionTitleProps {
  /** 小标题编号，对应切图文件 */
  type: SectionTitleType;
  /** 组件类名 */
  className?: string;
}

/**
 * 区块标题组件 — 使用设计稿切图
 */
export default function SectionTitle({ type, className = '' }: SectionTitleProps) {
  return (
    <div className={`relative ${className}`} style={{ height: '36px', flexShrink: 0 }}>
      <Image
        src={`/assets/images/小标题${type}@2x.png`}
        alt=""
        fill
        className="object-contain"
        priority={type <= 2}
      />
    </div>
  );
}
