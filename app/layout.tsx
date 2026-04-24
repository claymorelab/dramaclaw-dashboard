import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DramaClaw 数据中心",
  description: "DramaClaw 数字驾驶舱大屏",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full">
      <body className="min-h-full w-full overflow-hidden">{children}</body>
    </html>
  );
}
