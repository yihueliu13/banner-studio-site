"use client";

import { useEffect, useRef } from "react";
import { useLenis } from "lenis/react";

type Accent = "orange" | "blue";
type Arrow = "down" | "up";
type Metric =
  | {
      kind: "counter";
      target: number;
      decimals?: number;
      prefix?: string;
      unit: string;
      accent: Accent;
      arrow: Arrow;
      label: string;
    }
  | {
      kind: "static";
      text: string;
      unit?: string;
      accent: Accent;
      arrow: Arrow;
      label: string;
    };

const metrics: Metric[] = [
  {
    kind: "counter",
    target: 3,
    unit: "min",
    accent: "orange",
    arrow: "down",
    label: "平均產製時間\n從 4 小時 → 3 分鐘",
  },
  {
    kind: "counter",
    target: 72,
    unit: "%",
    accent: "blue",
    arrow: "up",
    label: "一次通過率\nPRD 目標 60%,實測 72%",
  },
  {
    kind: "counter",
    target: 16,
    unit: "K+",
    accent: "orange",
    arrow: "down",
    label: "Python 主 Code 行數\n41 個檔案",
  },
  {
    kind: "counter",
    target: 14,
    unit: "K+",
    accent: "blue",
    arrow: "up",
    label: "文件總行數\n60 個 Markdown 檔",
  },
  {
    kind: "static",
    text: "1:1",
    accent: "orange",
    arrow: "down",
    label: "Code : 文件 密度\n一般專案為 10:1",
  },
  {
    kind: "counter",
    target: 4,
    prefix: "$0.0",
    unit: "",
    accent: "blue",
    arrow: "up",
    label: "單筆 banner 成本\n每 100 張約台幣 120 元",
  },
];

export default function ScaleShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const metricRefs = useRef<(HTMLDivElement | null)[]>([]);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // Reveal observer for header(metric 自己用 Z 軸 reveal 不依賴 .reveal)
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
    root
      .querySelectorAll(".scale-intro.reveal")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Z 軸 scroll-linked depth reveal + counter 同步
  // (對齊 demo line 1739-1815)
  const updateScaleMetricsDepth = () => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const windowHeight = window.innerHeight;
    metricRefs.current.forEach((metric, index) => {
      if (!metric) return;
      const rect = metric.getBoundingClientRect();
      const triggerStart = windowHeight * 0.95;
      const triggerEnd = windowHeight * 0.25;
      const range = triggerStart - triggerEnd;
      const staggerOffset = index * 0.08;

      let progress = (triggerStart - rect.top) / range;
      progress = progress - staggerOffset;
      progress = Math.max(0, Math.min(1, progress));

      // ease-out-expo
      const eased = progress === 0 ? 0 : 1 - Math.pow(2, -10 * progress);

      if (isMobile) {
        // Mobile 降級:translateY + fade,不做 3D
        const translateY = 60 - 60 * eased;
        metric.style.transform = `translateY(${translateY}px)`;
        metric.style.opacity = String(eased);
        metric.style.filter = "none";
      } else {
        const z = -1500 + 1500 * eased;
        const scale = 0.2 + 0.8 * eased;
        const blur = 30 - 30 * eased;
        metric.style.transform = `translateZ(${z}px) scale(${scale})`;
        metric.style.opacity = String(eased);
        metric.style.filter = `blur(${blur}px)`;
      }

      // Counter 同步:desktop 用 eased 爬升,mobile 直接顯示終值
      // (mobile 沒 perspective,scroll-linked 數字爬升體驗差,直接顯示完整數字)
      const counter = counterRefs.current[index];
      if (counter && counter.dataset.target) {
        const target = parseFloat(counter.dataset.target);
        const decimals = parseInt(counter.dataset.decimals ?? "0", 10);
        const value = isMobile ? target : target * eased;
        counter.textContent = value.toFixed(decimals);
      }
    });
  };

  // RAF 節流的 scroll handler
  const rafPending = useRef(false);
  const onScroll = () => {
    if (rafPending.current) return;
    rafPending.current = true;
    requestAnimationFrame(() => {
      updateScaleMetricsDepth();
      rafPending.current = false;
    });
  };

  // 同時綁 Lenis scroll 和原生 scroll(雙保險,對齊 demo line 1808-1810)
  useLenis(() => onScroll());
  useEffect(() => {
    const handler = () => onScroll();
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    // 初始計算一次
    updateScaleMetricsDepth();
    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="scale-showcase" ref={sectionRef}>
      <div className="container">
        <div className="scale-layout">
          {/* 左:大標 + 描述 */}
          <div className="scale-intro reveal">
            <h2>
              真實規模
              <br />
              真實數字
            </h2>
            <p>
              Banner Studio 背後是完整的 Banner Agent 系統 — 由一個設計師和
              Claude Code 用 SDD 流程打造,達到接近大廠內部工具的治理密度。
            </p>
          </div>

          {/* 右:6 個 metric(2×3 grid) */}
          <div className="scale-numbers">
            {metrics.map((m, i) => (
              <div
                key={i}
                ref={(el) => {
                  metricRefs.current[i] = el;
                }}
                className="scale-metric"
              >
                <div className={`scale-metric-value accent-${m.accent}`}>
                  {m.kind === "counter" ? (
                    <>
                      {m.prefix && <span>{m.prefix}</span>}
                      <span
                        ref={(el) => {
                          counterRefs.current[i] = el;
                        }}
                        className="counter-num"
                        data-target={m.target}
                        data-decimals={m.decimals ?? 0}
                      >
                        0
                      </span>
                      <span className="unit">{m.unit}</span>
                    </>
                  ) : (
                    <>
                      <span>{m.text}</span>
                      <span className="unit">{m.unit ?? ""}</span>
                    </>
                  )}
                </div>
                <div className="scale-metric-meta">
                  <span className={`scale-metric-arrow ${m.arrow}`}>
                    {m.arrow === "down" ? "↘" : "↗"}
                  </span>
                  <span
                    className="scale-metric-label"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {m.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
