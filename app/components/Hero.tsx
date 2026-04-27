"use client";

import { useEffect, useRef } from "react";

type Banner = { text: string; img: string };

const banners: Banner[] = [
  {
    text: "春季女裝 85 折",
    img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=400&fit=crop",
  },
  {
    text: "母親節滿千折百",
    img: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&h=400&fit=crop",
  },
  {
    text: "新品上市獨家預購",
    img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
  },
  {
    text: "週年慶會員專屬",
    img: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=600&h=400&fit=crop",
  },
  {
    text: "Flash Sale",
    img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&h=400&fit=crop",
  },
  {
    text: "New Arrival",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=400&fit=crop",
  },
  {
    text: "Limited Offer",
    img: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&h=400&fit=crop",
  },
  {
    text: "Brand Day",
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=400&fit=crop",
  },
];

function MarqueeCol({
  list,
  direction,
  eagerFirst = false,
}: {
  list: Banner[];
  direction: "up" | "down";
  eagerFirst?: boolean;
}) {
  // 重複 3 次以實現無縫 loop(對齊 demo line 1728)
  const tripled = [...list, ...list, ...list];
  return (
    <div
      className={[
        "marquee-col",
        direction === "up" ? "marquee-col-up" : "marquee-col-down",
      ].join(" ")}
    >
      {tripled.map((b, i) => {
        const isLcpCandidate = eagerFirst && i === 0;
        return (
          <div className="banner-mock" key={i}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={b.img}
              alt={b.text}
              loading={isLcpCandidate ? "eager" : "lazy"}
              fetchPriority={isLcpCandidate ? "high" : "auto"}
            />
            <div className="banner-mock-overlay">{b.text}</div>
          </div>
        );
      })}
    </div>
  );
}

export default function Hero() {
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const microRef = useRef<HTMLParagraphElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reveal 時序對齊 demo line 1704-1709
    const reveal = (el: HTMLElement | null, delay: number) => {
      if (!el) return;
      window.setTimeout(() => el.classList.add("is-revealed"), delay);
    };
    reveal(eyebrowRef.current, 100);
    reveal(titleRef.current, 200);
    reveal(subtitleRef.current, 300);
    reveal(ctaRef.current, 400);
    reveal(microRef.current, 500);
    reveal(marqueeRef.current, 100);
  }, []);

  return (
    <section className="hero">
      <div className="container hero-grid">
        <div>
          <div className="eyebrow hero-eyebrow" ref={eyebrowRef}>
            露天 AI Banner 產線 · 內部使用
          </div>
          <h1 className="hero-title" ref={titleRef}>
            <span className="word">
              <span className="word-inner">你以為要 4 小時的 banner</span>
            </span>
            <br />
            <span className="word">
              <span className="word-inner">現在 3 分鐘</span>
            </span>
          </h1>
          <p className="hero-subtitle" ref={subtitleRef}>
            不用排期設計、不用會 Photoshop / Figma,沒時間用 AI
            生圖、想文案。在 Notion 填 5 個欄位,AI 幫你把文案、底圖、組裝全做完。
          </p>
          <div className="hero-cta" ref={ctaRef}>
            <a href="#apply" className="btn btn-primary btn-lg">
              申請使用
            </a>
            <a href="#story" className="btn btn-secondary btn-lg">
              先看怎麼運作 →
            </a>
          </div>
          <p className="hero-micro" ref={microRef}>
            已在業務團隊跑過 100+ 筆 · 平均 3 分鐘 · 誠實的 70% 一次過率
          </p>
        </div>
        <div className="hero-marquee" ref={marqueeRef}>
          <MarqueeCol list={banners.slice(0, 4)} direction="up" eagerFirst />
          <MarqueeCol list={banners.slice(4)} direction="down" />
        </div>
      </div>
    </section>
  );
}
