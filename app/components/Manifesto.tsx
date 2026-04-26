"use client";

import { useEffect, useRef } from "react";

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section className="manifesto" ref={sectionRef}>
      <div className="manifesto-bg" aria-hidden="true" />
      <div className="container">
        <h2 className="reveal">一個設計師做的</h2>
        <h2 className="reveal">給不會設計的人用</h2>
        <div className="manifesto-cta reveal">
          <a href="#apply" className="btn btn-primary btn-lg">
            申請使用 →
          </a>
          <p className="manifesto-meta">
            Made by UIUX Team,專為露天業務團隊打造
          </p>
        </div>
      </div>
    </section>
  );
}
