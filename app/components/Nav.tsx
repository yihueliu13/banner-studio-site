"use client";

import { useEffect, useState } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      id="nav"
      aria-label="主導覽"
      className={[
        "fixed top-0 left-0 right-0 z-nav",
        "py-4 transition-all duration-slow ease-out-expo",
        scrolled
          ? "bg-white/85 backdrop-blur-[16px] backdrop-saturate-[180%] shadow-[0_1px_0_rgba(0,0,0,0.04)]"
          : "bg-transparent",
      ].join(" ")}
    >
      <div className="flex items-center justify-between px-4 sm:px-5 md:px-6 xl:px-8">
        {/* Logo */}
        <a href="#" className="logo">
          <span>Banner Studio</span>
          <span className="logo-dot" aria-hidden="true" />
        </a>

        {/* Desktop menu(md+ 顯示) */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#story" className="nav-link">
            怎麼運作
          </a>
          <a href="#features" className="nav-link">
            功能
          </a>
          <a href="#faq" className="nav-link">
            常見問題
          </a>
          <a href="#apply" className="btn btn-primary">
            申請使用
          </a>
        </div>

        {/* Mobile-only 申請使用(縮版) */}
        <a
          href="#apply"
          className="md:hidden btn btn-primary"
          style={{ padding: "8px 16px", fontSize: "14px" }}
        >
          申請使用
        </a>
      </div>
    </nav>
  );
}
