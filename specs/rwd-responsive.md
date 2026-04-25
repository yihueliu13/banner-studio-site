---
role: spec
version: 1.0
status: active
last_updated: 2026-04-25
extends: ../docs/banner-studio-full-copy-and-spec.md
description: RWD 響應式規格 — Block-by-Block mobile/tablet 行為、降級規則、共用 polish、QA checklist
---

# RWD 響應式規格 ⭐ v10.1

> 從主 spec v11.3 拆出(2026-04-25)。原章節留 stub `@specs/rwd-responsive.md`。

## Breakpoints 三段式
```css
/* Desktop default */     ≥ 1100px
/* Tablet */               768px - 1099px
/* Mobile */               < 768px
/* Small mobile */         < 480px
```

## 全站通則

### 觸控目標尺寸(Apple HIG / Material 標準)
- 所有可點擊元素最小 **44 × 44 px**(含 nav links / sidebar items / accordion / form inputs / buttons)
- Inline link 例外(保持文字尺寸即可,但 padding 區可擴展)

### Hover 替代
- Mobile **沒有** hover 概念,所有 `:hover` 互動需要對等的 `:active` / `tap` 替代
- Testimonials GSAP hover → mobile **完全不執行**(用 `matchMedia('(hover: hover)')` 偵測)
- Feature card hover → 同上,mobile 改成「點擊直接開 Lightbox」
- Button :hover transform → mobile 改成 `:active { transform: scale(0.98) }`

### Container padding
| Breakpoint | Nav / Footer | Hero / Sections |
|-----------|--------------|----------------|
| Desktop ≥ 1100 | 32px | 24px |
| Tablet 768-1099 | 24px | 24px |
| Mobile < 768 | 20px | 20px |
| Small < 480 | 16px | 16px |

### Typography 縮放
所有 `clamp()` 函數會自動縮放,但需驗證:
- Hero title `clamp(40px, 6vw, 56px)` → mobile 約 32-40px
- Section h2 → mobile 應 ≥ 32px(不能太小,否則沒有 marketing 衝擊力)
- Body text 最小 14px(Mobile WCAG 標準)

---

## Block-by-Block RWD 規格

### 01. Top Nav

| 螢幕 | 行為 |
|------|------|
| Desktop | 100% 滿版 + 32px padding,顯示 menu items |
| Tablet | 同 desktop 但 padding 24px |
| Mobile | **隱藏 menu items,顯示漢堡選單**(D7 polish 做) |
| Mobile(簡版) | D3-D6 階段 menu items 直接隱藏,只留 Logo + 「申請使用」按鈕 |

```css
@media (max-width: 768px) {
  .nav-menu { display: none; }
  /* 或改為點漢堡 */
}
```

### 02. Hero

| 螢幕 | 佈局 |
|------|------|
| Desktop | 兩欄 1.2fr / 1fr,左文字右 marquee |
| Tablet (768-1099) | 兩欄但比例改 1fr / 1fr,marquee 高度縮到 480px |
| Mobile (< 768) | **單欄**,文字在上、marquee 在下(高度 320px) |
| Small (< 480) | **隱藏 marquee**,純文字 + CTA |

理由:marquee 在 mobile 直排會佔太多空間,小螢幕直接拿掉,文字 + CTA 即可。

```css
@media (max-width: 768px) {
  .hero-grid { grid-template-columns: 1fr; gap: 40px; }
  .hero-marquee { height: 320px; }
}
@media (max-width: 480px) {
  .hero-marquee { display: none; }
  .hero-cta { flex-direction: column; }
  .hero-cta .btn { width: 100%; }
}
```

### 03. Stats Strip

| 螢幕 | 佈局 |
|------|------|
| Desktop | 三欄 1fr / 1fr / 1fr |
| Tablet | 三欄但 padding 縮小 |
| Mobile (< 768) | **三欄改單欄**,每個 stat 之間用 divider 分隔 |
| Small | 同 mobile |

```css
@media (max-width: 768px) {
  .stats-grid { grid-template-columns: 1fr; gap: 48px; }
  .stat-item { text-align: center; }
}
```

### 04. Scroll-Pinned Story ⭐ 最複雜

| 螢幕 | 行為 |
|------|------|
| Desktop | sidebar 200px sticky + 卡片 1fr |
| Tablet (768-1099) | **sidebar 變橫向 sticky 在頂端**(top: 80px),卡片在下方 |
| Mobile (< 768) | **完全隱藏 sidebar**,純粹卡片直排 |

#### Mobile 降級理由
- Sticky sidebar 在小螢幕上會擋畫面
- 5 張卡片直排即可,不需要 navigator
- **滑鼠 icon 動畫**:在 desktop / tablet 顯示,mobile **隱藏整個 sidebar 自然就沒了**

#### 卡片 Layout 統一直排
- Desktop 的 stack/split 混合佈局(Step 1/3/5 stack, Step 2/4 split)→ **mobile 全部變 stack**(圖在上,文字在下)

```css
@media (max-width: 1099px) {
  .story-grid { grid-template-columns: 1fr; }
  .story-sidebar {
    position: sticky;
    top: 80px;
    z-index: 10;
    background: var(--bg-page);
    padding: 16px 0;
    /* 改橫向 */
    flex-direction: row;
    overflow-x: auto;
    gap: 24px;
  }
}
@media (max-width: 768px) {
  .story-sidebar { display: none; }
  /* 卡片全部 layout-stack */
  .story-card.layout-split { grid-template-columns: 1fr; }
}
```

### 05. Feature Grid + Lightbox

| 螢幕 | 佈局 |
|------|------|
| Desktop | 3 欄 |
| Tablet | **2 欄** |
| Mobile | **單欄** |

#### Lightbox Modal mobile 行為
- 打開 modal:`position: fixed; inset: 0`,全螢幕(不是 max-width 1100px)
- 圖片 `max-height: 60vh`(避免太佔螢幕,留空間給文字)
- Close button:右上角 **48 × 48 px**(觸控目標尺寸)
- 改用 `touchstart` 事件 detect 滑動關閉(往下拉關閉)

```css
@media (max-width: 1099px) {
  .feature-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
}
@media (max-width: 640px) {
  .feature-grid { grid-template-columns: 1fr; }
  .lightbox-content {
    max-width: 100%;
    max-height: 100%;
    border-radius: 0;
    margin: 0;
  }
  .lightbox-close { width: 48px; height: 48px; }
}
```

### 07. Manifesto

| 螢幕 | 行為 |
|------|------|
| Desktop | 滿版底圖 + 黑漸層 + 兩行 88px h2 |
| Mobile | 同結構,h2 自動縮到約 56px(clamp 處理)|

#### 注意
- 底圖 mobile 要確認上下漸層**夠暗**(Unsplash 圖片在小螢幕對比可能跑掉)
- CTA 按鈕在 mobile 改 `width: 100%`

```css
@media (max-width: 480px) {
  .manifesto-cta .btn { width: 100%; }
  .manifesto-meta { font-size: 13px; }
}
```

### 08. Testimonials

| 螢幕 | 佈局 |
|------|------|
| Desktop | 3 欄 |
| Tablet | 3 欄保留(卡片內容夠精簡)|
| Mobile (< 768) | **單欄** |

#### Hover 處理 ⭐ 重要
GSAP hover **不在 mobile 執行**:

```js
const isMobile = !window.matchMedia('(hover: hover)').matches;

document.querySelectorAll('.testimonial-card').forEach(card => {
  if (isMobile) return;  // ⭐ mobile 完全跳過
  // ... 桌機才綁 mouseenter / mouseleave
});
```

或在 React:
```tsx
const canHover = useMediaQuery('(hover: hover)');
{canHover && <HoverEffect />}
```

```css
@media (max-width: 768px) {
  .testimonial-grid { grid-template-columns: 1fr; gap: 16px; }
}
```

### 08.5 Scale Showcase ⭐ 必須降級

| 螢幕 | 行為 |
|------|------|
| Desktop | Z 軸 perspective 1500px reveal + counter 同步 |
| Tablet | 保留 Z 軸但 perspective 縮小到 800px |
| Mobile (< 768) | **完全降級為 translateY + fade**,不用 perspective |

#### 為什麼 mobile 要降級
- Perspective 在小螢幕(< 480px)會把字放大到糊掉
- Mobile GPU 算 3D transform 容易卡頓
- 6 個數字直排已經很長,不需要再加 z 軸戲劇性

#### 降級實作
```js
const isMobile = window.innerWidth < 768;

if (isMobile) {
  // 純 translateY + fade,不算 z / scale / blur
  metrics.forEach(metric => {
    const rect = metric.getBoundingClientRect();
    const progress = ...;  // 同樣的 progress 算法
    metric.style.transform = `translateY(${(1-progress) * 40}px)`;
    metric.style.opacity = progress;
  });
} else {
  // 桌機完整 Z 軸 reveal
}
```

#### Mobile Layout
- 6 個 metric 從 2 × 3 grid 改為 **1 × 6 grid**(直排)
- 不再「左右交錯橘藍」,全部置中
- 數字字級從 clamp(72-104px) 自動縮到約 56-72px

```css
@media (max-width: 768px) {
  .scale-numbers { grid-template-columns: 1fr; gap: 56px; }
  .scale-showcase { perspective: none; }
  .scale-metric {
    transform: none !important;
    opacity: 1;
    filter: none;
  }
  .scale-metric-value { font-size: clamp(56px, 12vw, 72px); }
}
```

### 10. FAQ Accordion

| 螢幕 | 行為 |
|------|------|
| Desktop | 768px 寬置中 |
| Tablet | 同 desktop |
| Mobile | 100% 寬,padding 20px |

#### 觸控注意
- Accordion `<button>` 整個 row 高度至少 56px(觸控友善)
- `+` icon 至少 24px(容易點到)

```css
@media (max-width: 768px) {
  .faq-question {
    min-height: 56px;
    padding: 20px 0;
  }
}
```

### 09. Final CTA + 表單

| 螢幕 | 行為 |
|------|------|
| Desktop | 90% 寬橘卡片 + 兩欄 1fr / 1fr |
| Tablet (768-1099) | 90% 寬保留,padding 縮到 64px,**改單欄**(左文字 + 下表單)|
| Mobile (< 768) | **95% 寬**,padding 40-48px,單欄 |
| Small (< 480) | **100% 寬**(去 margin,讓卡片貼邊),padding 32px 24px,圓角縮到 16px |

#### 表單欄位 mobile
- 4 個欄位(姓名/部門/Email/Notion ID)→ **全部改 1 欄滿版**
- input 高度 ≥ 48px(觸控友善)
- 字級 16px(避免 iOS 自動縮放)
- 送出按鈕 100% 寬

```css
@media (max-width: 1099px) {
  .final-cta-content { grid-template-columns: 1fr; gap: 48px; }
  .final-cta-card { padding: 64px 48px; }
}
@media (max-width: 768px) {
  .final-cta-card {
    width: 95%;
    padding: 56px 32px;
    border-radius: 24px;
  }
  .apply-form { grid-template-columns: 1fr; }
  .form-input {
    font-size: 16px;       /* iOS 防縮放 */
    padding: 14px 16px;
    min-height: 48px;
  }
  .form-submit { width: 100%; }
}
@media (max-width: 480px) {
  .final-cta-card {
    width: 100%;
    border-radius: 16px;
    padding: 40px 24px;
  }
}
```

### 11. Footer

| 螢幕 | 佈局 |
|------|------|
| Desktop | 滿版 + 3 欄 grid |
| Tablet | 滿版 + 3 欄但 gap 縮小 |
| Mobile | 滿版 + **單欄垂直堆疊** |

```css
@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .footer-bottom {
    text-align: center;
    margin-top: 40px;
  }
}
```

---

## 共用 Mobile Polish 細節

### Performance
- Mobile 優先載入小張圖(Unsplash 帶 `?w=800` query param 而非 `?w=1200`)
- Lazy load 所有非首屏 image:`<img loading="lazy">`
- Reveal 動畫在 mobile 縮短(800ms → 500ms),減少 jank

### Scroll
- Lenis smooth scroll 在 iOS 可能會跟系統 inertia 打架
  - 建議 mobile **關閉 Lenis**:`smoothWheel: false, smoothTouch: false`
  - 用 native scroll,CSS `scroll-behavior: smooth` 處理錨點

```js
const lenis = new Lenis({
  duration: 1.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: window.innerWidth >= 768,    // ⭐ mobile 關閉
  smoothTouch: false,                        // 永遠關閉 touch
});
```

### Form input iOS 注意事項
- `<input>` 字級必須 ≥ 16px,否則 iOS 點到自動 zoom
- `inputmode="email"` / `autocomplete="email"` 提升填表體驗
- Email 欄位加 `enterkeyhint="next"`,最後一個欄位 `enterkeyhint="send"`

### Reveal 動畫
- IntersectionObserver `rootMargin` 在 mobile 收緊(移到 -50px),提早觸發

---

## Mobile QA Checklist(D7 polish 階段必跑)

- [ ] iPhone 14 Pro (390 × 844) 各 block 直排正常
- [ ] iPhone SE (375 × 667) 沒有橫向 scroll
- [ ] iPad (768 × 1024) tablet 中間值佈局
- [ ] 所有按鈕觸控目標 ≥ 44 × 44px
- [ ] 表單欄位 ≥ 48px 高、字級 ≥ 16px
- [ ] Block 04 sidebar 在 mobile 完全隱藏
- [ ] Block 08.5 Z 軸 reveal 在 mobile 改用 translateY + fade
- [ ] Testimonials hover 在 mobile **不執行 GSAP**(matchMedia 偵測)
- [ ] Lightbox 在 mobile 全螢幕 + 大 close 按鈕
- [ ] Lenis smoothWheel 在 mobile 關閉
- [ ] 文字 reveal 動畫不會卡頓
- [ ] Footer 三欄改單欄
- [ ] Final CTA 表單 4 欄位改 1 欄、按鈕滿版
