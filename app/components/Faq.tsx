"use client";

import { useEffect, useRef, useState } from "react";

type FaqItem = {
  q: string;
  a: string;
};

const faqs: FaqItem[] = [
  {
    q: "AI 產出真的符合需求嗎？",
    a: "不保證每次都完美。每個階段都有 2 組候選和重做機制。實測 72% 一次過、剩下 28% 微調文案或重跑底圖。",
  },
  {
    q: "會有額度限制嗎？",
    a: "技術上沒有額度限制。每 100 張 banner 的 AI API 成本大約台幣 120 元。\n\n但如果你一天產 1000 張只是為了測試玩樂，Kay 會來找你喝茶 ☕",
  },
  {
    q: "設計師會不會討厭我用這個？",
    a: "不會。這工具處理的是「尺寸對齊、文字排版、對比度檢查、多版型產出」這些設計師本來就不想重複做的事。",
  },
];

export default function Faq() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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

  const toggle = (i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <section className="faq" id="faq" ref={sectionRef}>
      <div className="container">
        <div className="section-header reveal" style={{ marginBottom: 64 }}>
          <div className="eyebrow" style={{ marginBottom: 16 }}>
            常見問題
          </div>
          <h2>關於 Banner Studio</h2>
        </div>
        <div className="faq-list">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            const answerId = `faq-answer-${i}`;
            return (
              <div
                key={i}
                className={`faq-item${isOpen ? " open" : ""}`}
              >
                <button
                  className="faq-question"
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => toggle(i)}
                >
                  <h3>{item.q}</h3>
                  <span className="faq-icon" aria-hidden="true">
                    +
                  </span>
                </button>
                <div className="faq-answer" id={answerId} role="region">
                  <p className="faq-answer-inner">{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
