"use client";

import { useEffect, useRef } from "react";
import { useLenis } from "lenis/react";

type Layout = "stack" | "split";
type Step = {
  navLabel: string;
  title: string;
  body: string;
  image: string;
  imageAlt: string;
  layout: Layout;
};

const steps: Step[] = [
  {
    navLabel: "填需求",
    title: "在 Notion 填 5 個欄位",
    body: "活動名稱、促銷重點、目標受眾、語氣風格、版型。其他欄位都可以讓 AI 自己決定。",
    image: "/images/story/step-1-fill-form.webp",
    imageAlt: "在 Notion 填表",
    layout: "stack",
  },
  {
    navLabel: "產文案",
    title: "30-60 秒產出 2 組候選文案",
    body: "H1 大標、H2 小標、CTA 各 2 版,挑一個勾確認就好。不滿意?改一個字再勾也行,系統會用你的版本繼續跑。",
    image: "/images/story/step-2-copy.webp",
    imageAlt: "文案候選",
    layout: "split",
  },
  {
    navLabel: "產底圖",
    title: "12 種風格 14 種主體 自由組合",
    body: "清新美妝、質感家電、活潑童趣、急迫促銷、溫馨生活...或讓 AI 看完你的活動需求,自動幫你判斷該用哪一種。PC + M 兩種版型一次產完。",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1400&h=800&fit=crop",
    imageAlt: "12 種風格 grid",
    layout: "stack",
  },
  {
    navLabel: "自動組裝",
    title: "自動組裝 + WCAG 檢查",
    body: "文字和底圖自動拼起來,檢查對比度是否達到無障礙標準、文字有沒有超出邊界。不合格的系統直接退回重做,醜 banner 上不了架。",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&h=750&fit=crop",
    imageAlt: "WCAG 對比度檢查",
    layout: "split",
  },
  {
    navLabel: "下載使用",
    title: "Google Chat 通知 Drive 下載",
    body: "每階段完成 Google Chat 會提醒你。點連結進 Notion 審核,成品連結直接通往 Drive。不滿意?點「退回」重跑該階段。",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1400&h=800&fit=crop",
    imageAlt: "Chat 通知",
    layout: "stack",
  },
];

function MouseIcon() {
  return (
    <svg
      className="nav-mouse-icon"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect
        x="6"
        y="2"
        width="12"
        height="20"
        rx="6"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <line
        x1="12"
        y1="6"
        x2="12"
        y2="10"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Story() {
  const lenis = useLenis();
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const navRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean) as HTMLElement[];
    const navs = navRefs.current.filter(Boolean) as HTMLButtonElement[];

    // Card visible reveal(對齊 demo line 1857-1862)
    const cardVisibleObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -100px 0px" }
    );
    cards.forEach((c) => cardVisibleObserver.observe(c));

    // Active highlight 跟隨當前卡片(對齊 demo line 1864-1872)
    const activeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const step = parseInt(
            (entry.target as HTMLElement).dataset.step ?? "0",
            10
          );
          navs.forEach((n, i) => n.classList.toggle("active", i === step));
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );
    cards.forEach((c) => activeObserver.observe(c));

    // Story header reveal(用 .visible class)
    const headerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            headerObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -100px 0px" }
    );
    if (headerRef.current) headerObserver.observe(headerRef.current);

    return () => {
      cardVisibleObserver.disconnect();
      activeObserver.disconnect();
      headerObserver.disconnect();
    };
  }, []);

  // Sidebar 點擊滑卡片到視窗中央(對齊 demo line 1874-1882)
  const handleNavClick = (i: number) => {
    const card = cardRefs.current[i];
    if (!card) return;
    const cardHeight = card.offsetHeight;
    const windowHeight = window.innerHeight;
    const offset = -((windowHeight - cardHeight) / 2);
    if (lenis) {
      lenis.scrollTo(card, { offset });
    } else {
      // Level B fallback:Lenis 沒 ready 用瀏覽器原生
      card.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section className="story" id="story">
      <div className="container">
        <div className="story-header reveal" ref={headerRef}>
          <h2>5 個步驟 3 分鐘</h2>
          <p>你只要填需求和點「確認」。AI 和 Cloud Function 做剩下的事。</p>
        </div>
        <div className="story-main">
          <nav className="story-sidebar" aria-label="Story 步驟導覽">
            {steps.map((s, i) => (
              <button
                key={i}
                ref={(el) => {
                  navRefs.current[i] = el;
                }}
                className={`story-nav-item${i === 0 ? " active" : ""}`}
                data-jump={i}
                onClick={() => handleNavClick(i)}
                aria-current={i === 0 ? "step" : undefined}
              >
                <MouseIcon />
                <span>{s.navLabel}</span>
              </button>
            ))}
          </nav>
          <div className="story-cards">
            {steps.map((s, i) => (
              <article
                key={i}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className={`story-card layout-${s.layout}`}
                data-step={i}
              >
                <div className="story-card-content">
                  <h3 className="story-card-title">{s.title}</h3>
                  <p className="story-card-body">{s.body}</p>
                </div>
                <div className="story-card-image">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.image} alt={s.imageAlt} loading="lazy" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
