"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

type Card = {
  num: ReactNode;
  label: string;
  detail: string;
  source: string;
};

const cards: Card[] = [
  {
    num: (
      <>
        <span className="accent">&lt;</span> 10{" "}
        <span className="accent">分鐘</span>
      </>
    ),
    label: "從需求到成品",
    detail: "PRD Success Metric 目標。實測平均 3-5 分鐘完成全流程。",
    source: "PRD v4.3 Success Metrics",
  },
  {
    num: (
      <>
        72<span className="accent">%</span>
      </>
    ),
    label: "一次通過率",
    detail: "PRD 目標 60%、實測 72%。",
    source: "2026-04 實測資料",
  },
  {
    num: (
      <>
        <span className="accent">$</span>0.04 <span className="accent">USD</span>
      </>
    ),
    label: "單筆 API 成本",
    detail: "每 100 張 banner 的 AI 成本約台幣 120 元。",
    source: "PRD v4.3 費用預估",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  // Reveal observer(全站 .reveal pattern)
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
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
    root.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // GSAP hover(只在 hover-capable 裝置,對齊 spec mobile 不執行 GSAP)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(hover: hover)").matches) return;

    let cleanup = () => {};
    (async () => {
      const { gsap } = await import("gsap");
      const root = sectionRef.current;
      if (!root) return;
      const cards = root.querySelectorAll<HTMLElement>(".testimonial-card");

      const handlers: Array<{
        card: HTMLElement;
        enter: () => void;
        leave: () => void;
      }> = [];

      cards.forEach((card) => {
        let hoverTl: gsap.core.Timeline | null = null;
        const enter = () => {
          if (hoverTl) hoverTl.kill();
          hoverTl = gsap.timeline({ defaults: { overwrite: "auto" } });
          // Scale + 浮起(主動作 0.7s expo.out)
          hoverTl.to(
            card,
            { scale: 1.02, y: -6, duration: 0.7, ease: "expo.out" },
            0
          );
          // Shadow(慢一點 0.9s + delay 0.1)
          hoverTl.to(
            card,
            {
              boxShadow:
                "0 12px 28px rgba(0,0,0,0.05), 0 4px 8px rgba(0,0,0,0.03)",
              duration: 0.9,
              delay: 0.1,
              ease: "power2.out",
            },
            0
          );
        };
        const leave = () => {
          if (hoverTl) hoverTl.kill();
          gsap.to(card, {
            scale: 1,
            y: 0,
            boxShadow: "0 0 0 rgba(0,0,0,0)",
            duration: 0.5,
            ease: "power3.out",
          });
        };
        card.addEventListener("mouseenter", enter);
        card.addEventListener("mouseleave", leave);
        handlers.push({ card, enter, leave });
      });

      cleanup = () => {
        handlers.forEach(({ card, enter, leave }) => {
          card.removeEventListener("mouseenter", enter);
          card.removeEventListener("mouseleave", leave);
        });
      };
    })();

    return () => cleanup();
  }, []);

  return (
    <section className="testimonials" ref={sectionRef}>
      <div className="container">
        <div className="section-header reveal">
          <div className="eyebrow" style={{ marginBottom: 16 }}>
            實測數據
          </div>
          <h2>不用信我們 看數據</h2>
          <p>Banner Studio 已經在露天業務團隊跑了一段時間。</p>
        </div>
        <div className="testimonial-grid">
          {cards.map((c, i) => (
            <div className="testimonial-card reveal" key={i}>
              <div className="testimonial-num">{c.num}</div>
              <div className="testimonial-label">{c.label}</div>
              <p className="testimonial-detail">{c.detail}</p>
              <div className="testimonial-source">{c.source}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
