import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const montserratAlt = localFont({
  src: "../public/fonts/MontserratAlternates-Medium-16.otf",
  weight: "500",
  style: "normal",
  display: "swap",
  variable: "--font-montserrat-alt",
});

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
    <html lang="zh-CN" className={`h-full ${montserratAlt.variable}`}>
      <body className="min-h-full w-full overflow-hidden">{children}</body>
    </html>
  );
}
