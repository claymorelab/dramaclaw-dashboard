"use client";

import Image, { type StaticImageData } from "next/image";
import title1 from "../../public/assets/images/section-title-1.png";
import title2 from "../../public/assets/images/section-title-2.png";
import title3 from "../../public/assets/images/section-title-3.png";
import title4 from "../../public/assets/images/section-title-4.png";
import title5 from "../../public/assets/images/section-title-5.png";

type SectionTitleType = 1 | 2 | 3 | 4 | 5;

interface SectionTitleProps {
  /** 小标题编号，对应切图文件 */
  type: SectionTitleType;
  /** 组件类名 */
  className?: string;
}

const TITLE_MAP: Record<SectionTitleType, StaticImageData> = {
  1: title1,
  2: title2,
  3: title3,
  4: title4,
  5: title5,
};

/**
 * 区块标题组件 — 使用设计稿切图，按图片原始比例显示
 */
export default function SectionTitle({
  type,
  className = "",
}: SectionTitleProps) {
  return (
    <div
      className={`${className} relative w-full overflow-hidden`}
      style={{ aspectRatio: "7 / 1" }}
    >
      <Image
        src={TITLE_MAP[type]}
        alt=""
        fill
        className="object-cover"
        sizes="480px"
        priority={type <= 2}
      />
    </div>
  );
}
