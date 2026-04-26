"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";

type Feature = {
  title: string;
  shortBody: string;
  fullBody: string;
  thumb: string;
  fullImg: string;
};

const features: Feature[] = [
  {
    title: "12 種視覺風格",
    shortBody: "清新、質感、活潑、急迫、溫馨... 17 種選一個,或讓 AI 自動判斷。",
    fullBody:
      "清新、質感、活潑、急迫、溫馨... 17 種選一個,或讓 AI 自動判斷。Figma 設計 token 同步,不走調。",
    thumb: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=600&fit=crop",
    fullImg: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&h=800&fit=crop",
  },
  {
    title: "PC + M 雙版型",
    shortBody: "一次產完 PC 和 Mobile 兩種版型。座標從 Figma 同步,永遠對齊最新規範。",
    fullBody:
      "一次產完 PC 和 Mobile 兩種版型。座標從 Figma 同步,永遠對齊最新規範,設計工程不用再手動校對。",
    thumb: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&h=600&fit=crop",
    fullImg: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1200&h=800&fit=crop",
  },
  {
    title: "3 組文案候選",
    shortBody: "H1/H2/CTA 各 3 版。不滿意直接切換,或退回重跑。",
    fullBody: "H1/H2/CTA 各 3 版。不滿意直接切換,或退回重跑。AI 會學你挑的版本,下次建議更準。",
    thumb: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=600&fit=crop",
    fullImg: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&h=800&fit=crop",
  },
  {
    title: "WCAG 對比度檢查",
    shortBody: "大標 3:1、小標 4.5:1。對比度不夠、字數超限、字超出邊界,系統擋下重做。",
    fullBody:
      "大標 3:1、小標 4.5:1。對比度不夠、字數超限、字超出邊界,系統擋下重做。無障礙標準不靠人眼把關。",
    thumb: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    fullImg: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
  },
  {
    title: "手動上傳替代路徑",
    shortBody: "AI 生的圖不滿意?按規範準備自己的底圖,上傳 Drive 貼連結。",
    fullBody:
      "AI 生的圖不滿意?按規範準備自己的底圖,上傳 Drive 貼連結。系統一樣幫你做對比度檢查和組裝。",
    thumb: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop",
    fullImg: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&h=800&fit=crop",
  },
  {
    title: "Google Chat 自動通知",
    shortBody: "每階段完成,Chat 群組直接叫你審核。成品連結一鍵下載到 Drive。",
    fullBody:
      "每階段完成,Chat 群組直接叫你審核。成品連結一鍵下載到 Drive。流程透明,進度一目了然。",
    thumb: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop",
    fullImg: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&h=800&fit=crop",
  },
];

export default function Features() {
  const lenis = useLenis();
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState<Feature | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -100px 0px" }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    cardRefs.current.forEach((c) => c && observer.observe(c));
    return () => observer.disconnect();
  }, []);

  // Lenis stop / start + body overflow + ESC 關閉
  useEffect(() => {
    if (active) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && active) setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, lenis]);

  return (
    <>
      <section className="features" id="features">
        <div className="container">
          <div className="section-header reveal" ref={headerRef}>
            <div className="eyebrow" style={{ marginBottom: 16 }}>
              功能總覽
            </div>
            <h2>一個工具 把業務團隊從 banner 地獄救出來</h2>
            <p>Kay 做設計系統的時候,受不了 banner 要反覆排期和改尺寸,所以做了這個。</p>
          </div>
          <div className="feature-grid">
            {features.map((f, i) => (
              <div
                key={i}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="feature-card reveal"
                onClick={() => setActive(f)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActive(f);
                  }
                }}
                aria-label={`查看 ${f.title} 詳情`}
              >
                <div className="feature-image">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={f.thumb} alt={f.title} loading="lazy" />
                </div>
                <div className="feature-text">
                  <h3 className="feature-title">{f.title}</h3>
                  <p className="feature-body">{f.shortBody}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <div
        className={`lightbox${active ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="lightbox-title"
        onClick={(e) => {
          if (e.target === e.currentTarget) setActive(null);
        }}
      >
        <button
          className="lightbox-close"
          aria-label="關閉"
          onClick={() => setActive(null)}
        >
          ✕
        </button>
        <div className="lightbox-content">
          <div className="lightbox-image">
            {active && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={active.fullImg} alt={active.title} />
            )}
          </div>
          <div className="lightbox-text">
            <h3 id="lightbox-title">{active?.title}</h3>
            <p>{active?.fullBody}</p>
          </div>
        </div>
      </div>
    </>
  );
}
