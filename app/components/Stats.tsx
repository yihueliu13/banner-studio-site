"use client";

import { useEffect, useRef } from "react";

type Stat = {
  target: number;
  suffix: string;
  label: string;
};

const stats: Stat[] = [
  { target: 120, suffix: "+", label: "已產出 banner" },
  { target: 3, suffix: "min", label: "平均產製時間" },
  { target: 72, suffix: "%", label: "一次通過率" },
];

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    // Reveal observer(對齊 demo line 1884-1889)
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -100px 0px" }
    );
    root.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

    // Counter observer(對齊 demo line 1891-1911)
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const counter = entry.target as HTMLElement;
          const target = parseInt(counter.dataset.target ?? "0", 10);
          const duration = 1800;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // ease-out-expo 對齊 demo
            const eased = 1 - Math.pow(2, -10 * progress);
            counter.textContent = String(Math.floor(target * eased));
            if (progress < 1) requestAnimationFrame(animate);
            else counter.textContent = String(target);
          };
          requestAnimationFrame(animate);
          counterObserver.unobserve(counter);
        });
      },
      { threshold: 0.5 }
    );
    root.querySelectorAll(".counter").forEach((el) => counterObserver.observe(el));

    return () => {
      revealObserver.disconnect();
      counterObserver.disconnect();
    };
  }, []);

  return (
    <section className="stats" ref={sectionRef}>
      <div className="container">
        <div className="stats-eyebrow">業務團隊實際數據</div>
        <div className="stats-grid">
          {stats.map((s, i) => (
            <div className="stat reveal" key={i}>
              <div className="stat-number">
                <span className="counter" data-target={s.target}>
                  0
                </span>
                <span className="suffix">{s.suffix}</span>
              </div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
