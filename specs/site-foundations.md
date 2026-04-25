---
role: spec
version: 1.0
status: active
last_updated: 2026-04-25
extends: ../docs/banner-studio-full-copy-and-spec.md
description: 全站底層規範 — A11y / SEO + OG / Loading-Error-Success states / Performance + Browser Support / Analytics
---

# Site Foundations — 全站底層規範

> 從主 spec v11.3 拆出(2026-04-25)。原 5 個章節留 stub `@specs/site-foundations.md`。
> 整合 A11y / SEO / States / Performance / Analytics 5 個非 block 的全站規範。

---

## ♿ Accessibility (A11y) 規格 ⭐ v11.1

### HTML 語意化
- `<html lang="zh-Hant">` 明確聲明語系
- 每個 section 用 `<section aria-labelledby="...">`
- Hero `<h1>` 全站只能一個
- 各 section 用 `<h2>`,內部小標 `<h3>`
- Lists 用 `<ul>` / `<ol>`,不要用 `<div>` 假裝
- Footer 用 `<footer>`,Nav 用 `<nav aria-label="主導覽">`

### Focus States ⭐ 必須有可見 focus
```css
*:focus-visible {
  outline: 2px solid var(--brand);
  outline-offset: 2px;
  border-radius: 4px;
}
.btn:focus-visible {
  outline: 2px solid var(--brand);
  outline-offset: 4px;  /* 按鈕外緣多一點 */
}
.form-input:focus-visible {
  outline: none;        /* 用 box-shadow 取代 */
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.15);
}
```

### ARIA Labels
| 元素 | aria 屬性 |
|------|----------|
| Nav 漢堡選單 button | `aria-label="開啟選單"` / `aria-expanded="true/false"` |
| Story sidebar item | `aria-current="step"` 標當前 |
| FAQ accordion | `aria-expanded` + `aria-controls` |
| Lightbox close | `aria-label="關閉"` |
| Form input | `<label for>` 對應,必填加 `aria-required="true"` |
| Form error | `<p id="email-error" role="alert">` + input `aria-describedby="email-error"` |
| Loading spinner | `aria-live="polite"` + `aria-label="送出中"` |
| Decorative icon | `aria-hidden="true"`(如 sidebar 滑鼠 SVG)|

### 鍵盤導航
- Tab order 跟視覺順序一致
- Lightbox:開啟時 focus trap 在 modal,ESC 關閉
- FAQ accordion:Enter / Space 展開,Arrow up/down 切換
- Form:Enter 送出,欄位間 Tab 切換

### 顏色對比度(WCAG AA)
| 組合 | 對比度 | 通過? |
|------|-------|-------|
| `#1C1917` text on `#FAFAF9` bg | 17.4:1 | ✅ AAA |
| `#57534E` secondary on `#FAFAF9` | 7.5:1 | ✅ AAA |
| `#A8A29E` muted on `#FAFAF9` | 3.0:1 | ⚠️ 只能用大字級 (≥18px) |
| `#FF963B` brand on white | 2.6:1 | ❌ 不能當 body text,只能當大字 / button bg |
| `#FF963B` brand on `#1C1917` | 6.7:1 | ✅ AAA(btn-primary 黑底橘字 OK)|
| White on `#FF963B`(橘卡片)| 2.6:1 | ❌ Final CTA 文字不能用白色 |
| Black on `#FF963B` | 9.0:1 | ✅ AAA(v9.11 改黑字正確)|

### Skip Link(mobile 友善)
首屏左上角加 skip link:
```html
<a href="#main-content" class="skip-link">跳至主內容</a>
```
```css
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--text-primary);
  color: white;
  padding: 8px 16px;
  z-index: 1000;
  transition: top 200ms;
}
.skip-link:focus {
  top: 0;
}
```

### Reduced Motion 支援
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  .scale-metric { transform: none !important; opacity: 1 !important; }
  .reveal { opacity: 1 !important; transform: none !important; }
}
```

JS 也需偵測:
```js
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
  // 跳過 GSAP hover、Z 軸 reveal、scroll-linked counter
}
```

---

## 🔍 SEO + Open Graph 規格 ⭐ v11.1

### `<head>` 必填

```html
<head>
  <!-- 基本 -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>Banner Studio · 露天 AI Banner 產線</title>
  <meta name="description" content="露天內部 AI Banner 自動產線。3 分鐘產出一張 banner、72% 一次通過、單筆成本 $0.04 USD。一個設計師做的,給不會設計的人用。">

  <!-- Theme color (browser UI 染色) -->
  <meta name="theme-color" content="#FF963B">

  <!-- Favicon -->
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">

  <!-- Open Graph (Slack / LINE / Facebook 預覽) -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="Banner Studio · 露天 AI Banner 產線">
  <meta property="og:description" content="3 分鐘產出一張 banner、72% 一次通過、單筆成本 $0.04 USD。">
  <meta property="og:image" content="https://banner-studio-site.vercel.app/og-image.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:url" content="https://banner-studio-site.vercel.app">
  <meta property="og:site_name" content="Banner Studio">
  <meta property="og:locale" content="zh_TW">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Banner Studio · 露天 AI Banner 產線">
  <meta name="twitter:description" content="3 分鐘產出一張 banner、72% 一次通過率。">
  <meta name="twitter:image" content="https://banner-studio-site.vercel.app/og-image.png">

  <!-- 內部站不要 SEO 公開索引 -->
  <meta name="robots" content="noindex, nofollow">
</head>
```

### Next.js 14 metadata API 寫法
```tsx
// app/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://banner-studio-site.vercel.app'),
  title: 'Banner Studio · 露天 AI Banner 產線',
  description: '露天內部 AI Banner 自動產線。3 分鐘產出一張 banner、72% 一次通過、單筆成本 $0.04 USD。一個設計師做的,給不會設計的人用。',
  themeColor: '#FF963B',
  robots: { index: false, follow: false },  // 內部站
  openGraph: {
    type: 'website',
    locale: 'zh_TW',
    siteName: 'Banner Studio',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.png'],
  },
};
```

### OG 圖規格(D7 polish 階段做)
- **尺寸**:1200 × 630px
- **檔案**:`public/og-image.png`
- **內容建議**:
  - 露天橘色底
  - 大字「Banner Studio」(Geist 96px 黑字)
  - 副標「4 小時 → 3 分鐘」
  - 右下角「露天 UIUX × Sales」
- **生成方式**:用 Banner Agent 自己產一張(吃自己的狗糧)。失敗用 Figma 手刻。

### Favicon 規格
- `favicon.svg`:32 × 32 SVG,露天橘色 "B" 字母
- `apple-touch-icon.png`:180 × 180 PNG,圓角會由 iOS 自動套

### Sitemap / robots.txt
- 內部站 **不需要** sitemap.xml
- `public/robots.txt`:
  ```
  User-agent: *
  Disallow: /
  ```

---

## ⚡ Loading / Error / Success States 規格 ⭐ v11.1

### 表單 Loading State

送出按鈕點下後:
```tsx
const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

<button disabled={status === 'loading'}>
  {status === 'loading' ? (
    <>
      <Spinner /> 送出中...
    </>
  ) : '送出申請'}
</button>
```

CSS:
```css
.form-submit:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  animation: none;       /* 拿掉 pulse */
}
.spinner {
  width: 16px; height: 16px;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
```

### 表單 Error States

#### 欄位驗證錯誤(前端即時)
- Email 格式錯:欄位下方紅字「請輸入有效的 Email」
- 必填空白:欄位 border 變紅 + 下方「此欄位為必填」
- 出現方式:onBlur 觸發,不要 onChange(太煩)

```tsx
{errors.email && (
  <p id="email-error" role="alert" className="form-error">
    {errors.email}
  </p>
)}
```

```css
.form-error {
  font-size: 12px;
  color: #FCA5A5;     /* 在橘底上要用淺紅,深紅看不見 */
  margin-top: 4px;
}
.form-input.has-error {
  background: rgba(252, 165, 165, 0.15);
  box-shadow: 0 0 0 2px rgba(252, 165, 165, 0.5);
}
```

#### API 失敗
雙 webhook 都失敗時,表單下方顯示:
```
😕 送出失敗,請稍後再試,或直接 Google Chat 找 Kay
```

不要把技術細節(500 / timeout)給業務看。

### 表單 Success State

送出成功後 fade out 表單,顯示成功訊息(spec 已有):
```
✓ (橘色圓 72×72)
申請已送出
Kay 已收到通知,24 小時內會把你加進 Notion 和 Chat 群組。
```

5 秒後**不要**自動跳走,讓人看清楚。

### 圖片 Loading State

所有 `<img>` / `<Image>` 預設灰底 placeholder:
```css
img {
  background: var(--neutral-100);
}
```

Next.js Image 加 `placeholder="blur"` + `blurDataURL`(自動產低解析)。

### Page Loading(Next.js)

`app/loading.tsx`:
```tsx
export default function Loading() {
  return (
    <div className="page-loader" aria-live="polite">
      <div className="spinner-large" />
      <p>載入中...</p>
    </div>
  );
}
```

實際上 Next.js SSR 後幾乎不會看到,但 PWA / 慢網路會用到。

---

## 🚀 Performance + Browser Support 目標 ⭐ v11.1

### Lighthouse 目標(Production URL 跑)

| Metric | Mobile 目標 | Desktop 目標 |
|--------|-----------|-------------|
| Performance | **≥ 85** | ≥ 95 |
| Accessibility | **≥ 95** | ≥ 95 |
| Best Practices | ≥ 90 | ≥ 95 |
| SEO | ≥ 90 | ≥ 95 |

### Core Web Vitals
| Metric | 目標 | 實際做法 |
|--------|------|---------|
| **LCP** (Largest Contentful Paint) | < 2.5s | Hero 圖用 next/image priority、字型 preload |
| **CLS** (Cumulative Layout Shift) | < 0.1 | 圖片寫死 width/height、字型用 `font-display: optional` |
| **INP** (Interaction to Next Paint) | < 200ms | hover GSAP 用 GPU、避免大量 re-render |
| **FCP** (First Contentful Paint) | < 1.8s | 第一個 viewport 不要等 Lenis、GSAP 載入 |
| **TBT** (Total Blocking Time) | < 200ms | code splitting、defer 非關鍵 JS |

### Optimization Checklist
- [ ] 所有圖片用 `next/image`(自動 webp + lazy + responsive)
- [ ] 字型用 `next/font` 自動 preload + 自託管(不直接 link Google Fonts)
- [ ] GSAP 用 dynamic import(`import('gsap')`)只在桌機載入
- [ ] Lenis 用 dynamic import 只在桌機載入
- [ ] Block 08.5 / Block 04 component 用 `<Suspense>` 拆 chunk
- [ ] CSS 用 Tailwind JIT,build 後 < 50KB
- [ ] 全站 JS bundle < 200KB(gzipped)
- [ ] 加 `<link rel="preconnect" href="https://images.unsplash.com">`

### Browser Support 矩陣

| 瀏覽器 | 最低版本 | 為什麼 |
|--------|---------|-------|
| Chrome | 110+ | OKLCH、container queries |
| Safari | 16.4+ | OKLCH、`@container` |
| Firefox | 113+ | OKLCH |
| Edge | 110+ | 同 Chrome |
| iOS Safari | 16.4+ | iPhone 8 + 以上都 cover |
| Android Chrome | 110+ | 同 desktop Chrome |

**降級策略**:用 `@supports` 偵測,舊瀏覽器用 fallback:
```css
.testimonial-card { background: #FAFAF9; }
@supports (background: oklch(0.5 0.1 50)) {
  .testimonial-card:hover { background: oklch(94% 0.012 70); }
}
```

⚠️ 露天業務同事大多用 Chrome / iOS Safari,**IE / 舊版 Safari 不需要支援**。

---

## 📊 Analytics 埋點規格 ⭐ v11.1

### 工具選擇

| 選項 | 優點 | 缺點 |
|------|------|------|
| **Google Analytics 4** | 免費、容易接、報表齊全 | 設定複雜、隱私疑慮 |
| **Vercel Analytics** | 一鍵啟用、Web Vitals 內建 | 要付費(免費版限量)|
| **Plausible / Umami** | 簡潔、隱私友善 | 要自架或付費 |

**內部站建議**:用 **Vercel Analytics 免費版**就夠(每月 2500 events),不需要 GA4。

### 埋點事件

| 事件名 | 觸發 | 屬性 |
|--------|------|------|
| `page_view` | 進站 | path, referrer |
| `cta_click` | 點任何 CTA | location(hero/manifesto/nav)|
| `story_step_click` | 點 sidebar item | step_number |
| `feature_card_click` | 點 feature card 開 lightbox | feature_id |
| `faq_open` | 展開 FAQ | question_id |
| `form_start` | 第一次 focus 任何欄位 | — |
| `form_submit` | 點送出 | dept, success/fail |
| `form_success` | 收到 webhook 200 | — |
| `form_error` | 表單失敗 | error_type |
| `external_link_click` | 點 footer 外部連結 | link_name |

### Vercel Analytics 整合
```tsx
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

<body>
  {children}
  <Analytics />
  <SpeedInsights />
</body>
```

### Custom Event
```tsx
import { track } from '@vercel/analytics';

<button onClick={() => {
  track('cta_click', { location: 'hero' });
  // 然後 scroll to apply
}}>
  申請使用
</button>
```

### 隱私聲明
不蒐集 PII(個人資料)。表單填的姓名/Email 只送 webhook **不送 Analytics**。

考績呈報數據時用:
1. **Google Sheet** 撈申請數量、部門分佈
2. **Vercel Analytics** 撈訪問數、轉換率(form_submit / page_view)
