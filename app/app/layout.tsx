import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

// LCP 候選圖(Hero marquee 第一張) - desktop 才 preload(mobile 看不到 marquee)
const HERO_LCP_IMG =
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=400&fit=crop";

export const metadata: Metadata = {
  title: "Banner Studio · 露天 AI Banner 產線",
  description:
    "露天內部 AI Banner 自動產線。3 分鐘產出一張 banner、72% 一次通過、單筆成本 $0.04 USD。一個設計師做的,給不會設計的人用。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <head>
        <link
          rel="preload"
          as="image"
          href={HERO_LCP_IMG}
          fetchPriority="high"
          media="(min-width: 768px)"
        />
      </head>
      <body className="antialiased">
        <SmoothScroll>
          <Nav />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
