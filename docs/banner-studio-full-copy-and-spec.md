# Banner Studio — Full Copy & Spec

**Version**: v11.4 (2026-04-25 D2 拆檔治理 — Block 08.5 / 09 / 10 拆到 specs/blocks/, A11y/SEO/States/Performance/Analytics 合併到 specs/site-foundations.md, RWD 拆到 specs/rwd-responsive.md;主檔 2024 → ~700 行)
**Owner**: Kay · 露天 UIUX Team × Sales
**For**: D3-D7 Claude Code vibe coding
**Deployment target**: 5/1 (週五) Vercel

---

## 🎯 全站基本設定

### Container 規則
| Section | max-width | 左右 padding |
|---------|-----------|--------------|
| **Navbar** | **100% 滿版** | **32px** |
| Hero | 1366px | 24px |
| Final CTA 卡片 | 90% 視窗寬 | 96px (內) |
| **Footer** | **100% 滿版** | **32px**（跟 Navbar 一致）|
| 其他所有 section | 1080px | 24px |

### Color Tokens
- `--brand`: `#FF963B` (露天橘)
- `--brand-hover`: `#EA7A1F`
- `--neutral-900` / `--text-primary`: `#1C1917`
- `--neutral-600` / `--text-secondary`: `#57534E`
- `--neutral-400` / `--text-muted`: `#A8A29E`
- `--bg-page`: `#FAFAF9`
- `--bg-card`: `#FFFFFF`
- `--bg-story-card`: `#EEEDE8`
- `--border-subtle`: `#E7E5E4`
- `--accent-blue`: `#3B5FD6` (Scale Showcase 藍色 metric)
- `--form-input-bg`: `#33343B` (Final CTA 表單欄位深灰)

### Typography Strategy（雙字型）

```css
--font-display: "Geist", "Inter", system-ui, sans-serif;
--font-body: "Inter", "Noto Sans TC", system-ui, sans-serif;
```

D3 用 `next/font/google` + `geist` package 載入。

### Typography Scale
- Hero title: `clamp(40px, 6vw, 56px)` / weight 600 / line-height 1.1 / **font-display**
- Manifesto h2: `clamp(48px, 7vw, 88px)` / **font-display**
- Story header h2: `clamp(40px, 5vw, 56px)` / **font-display**
- Section header h2: 48px / **font-display**
- Final CTA h2: `clamp(36px, 4.5vw, 56px)` / **font-display**
- Scale Showcase h2: `clamp(40px, 5vw, 56px)` / **font-display**
- Scale metric value: `clamp(72px, 8vw, 104px)` / weight 500 / letter-spacing -0.04em / **font-display**
- Stat number: 72px / weight **500** / **font-display**
- Story card title: 24px / weight 600 / **font-display**
- Sidebar nav item: 22px / weight 500 / **font-display**
- Feature title: 20px / weight 600 / **font-display**

### Motion Tokens
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo)
- Lenis smooth scroll: duration 1.4s
- Card enter: translateY(60px) → 0, opacity 0 → 1, 1200ms

### Animation Duration Scale ⭐ v11.1
```css
--duration-instant: 100ms     /* tooltip 顯示、focus state */
--duration-fast: 200ms        /* button hover、icon 旋轉 */
--duration-base: 400ms        /* 一般 transition、accordion */
--duration-slow: 600ms        /* card hover、scroll-triggered */
--duration-slower: 800ms      /* hero reveal、image cross-fade */
--duration-slowest: 1200ms    /* manifesto reveal、long scroll */
```

### Spacing Scale（4px base unit） ⭐ v11.1
```css
--space-1: 4px        --space-2: 8px        --space-3: 12px
--space-4: 16px       --space-5: 20px       --space-6: 24px
--space-8: 32px       --space-10: 40px      --space-12: 48px
--space-16: 64px      --space-20: 80px      --space-24: 96px
--space-32: 128px     --space-40: 160px
```

對應 Tailwind 預設 spacing scale，Claude Code 直接用 `p-4 / gap-6 / mb-12` 即可。

### Border Radius Scale ⭐ v11.1
```css
--radius-sm: 4px      /* tag、pill 內小元素 */
--radius-md: 8px      /* button 內小 icon */
--radius-lg: 12px     /* form input、tag */
--radius-xl: 16px     /* feature card image、small card */
--radius-2xl: 24px    /* mobile lightbox */
--radius-3xl: 28px    /* testimonial card、story card */
--radius-4xl: 32px    /* final cta card */
--radius-full: 9999px /* button、pill、chip */
```

### Shadow Scale ⭐ v11.1
```css
--shadow-xs:  0 1px 2px rgba(0,0,0,0.04)                         /* form input focus */
--shadow-sm:  0 4px 8px rgba(0,0,0,0.03), 0 1px 2px rgba(0,0,0,0.02)
                                                                  /* light card resting */
--shadow-md:  0 12px 28px rgba(0,0,0,0.05), 0 4px 8px rgba(0,0,0,0.03)
                                                                  /* testimonial hover */
--shadow-lg:  0 20px 40px rgba(0,0,0,0.08), 0 8px 16px rgba(0,0,0,0.04)
                                                                  /* lightbox modal */
--shadow-xl:  0 30px 60px rgba(0,0,0,0.12), 0 12px 24px rgba(0,0,0,0.06)
                                                                  /* drop shadow heavy */
--shadow-brand: 0 12px 28px rgba(255,150,59,0.35)                /* btn-primary hover */
--shadow-cta:   0 32px 64px rgba(255,150,59,0.20), 0 8px 24px rgba(0,0,0,0.08)
                                                                  /* final cta card 浮起感 */
```

### Z-Index Scale ⭐ v11.1
```css
--z-base: 1                /* normal stacking */
--z-sticky: 10             /* scroll-pinned story sidebar */
--z-fixed: 50              /* sticky elements */
--z-nav: 100               /* top nav */
--z-overlay: 200           /* page overlay */
--z-modal-backdrop: 300    /* lightbox 背景 */
--z-modal: 400             /* lightbox content */
--z-popover: 500           /* tooltip、dropdown */
--z-toast: 600             /* notification、success message */
--z-debug: 9999            /* 開發 debug banner */
```

### Breakpoint Scale ⭐ v11.1
```css
--bp-sm: 480px       /* small mobile */
--bp-md: 768px       /* mobile / tablet 分界 */
--bp-lg: 1024px      /* tablet / small desktop */
--bp-xl: 1100px      /* desktop 標準 */
--bp-2xl: 1366px     /* large desktop / hero max */
```

對應 media query：
```css
/* Mobile first */
@media (min-width: 480px)  { /* sm */ }
@media (min-width: 768px)  { /* md */ }
@media (min-width: 1100px) { /* xl - desktop default */ }

/* Desktop first(本專案用這個方向) */
@media (max-width: 1099px) { /* tablet */ }
@media (max-width: 767px)  { /* mobile */ }
@media (max-width: 479px)  { /* small mobile */ }
```

---

## 🔠 大標題去標點規則 ⭐ 全站統一

**所有 h1 / h2 大標題不使用標點符號**。語氣斷句靠空格或換行。內文 `<p>` 和卡片內描述文字**保留全形標點**「，」「。」（不用半形）。

| Section | 標題 |
|---------|------|
| Hero | `你以為要 4 小時的 banner` / `現在 3 分鐘` |
| Story h2 | `5 個步驟 3 分鐘` |
| Story step 1 | `在 Notion 填 5 個欄位` |
| Story step 2 | `30-60 秒產出 3 組候選文案` |
| Story step 3 | `12 種風格 5 種主體 自由組合` |
| Story step 4 | `自動組裝 + WCAG 檢查` |
| Story step 5 | `Google Chat 通知 Drive 下載` |
| Features h2 | `一個工具 把業務團隊從 banner 地獄救出來` |
| Manifesto | `一個設計師做的` / `給不會設計的人用` |
| Testimonials h2 | `不用信我們 看數據` |
| Scale Showcase h2 | `真實規模 / 真實數字` |
| FAQ h2 | `關於 Banner Studio` |
| Final CTA h2 | `下一個 banner / 3 分鐘搞定` |

### Eyebrow 統一橘色 ⭐
所有 section 上方的小字 eyebrow（13px uppercase）統一用 `var(--brand)` 橘色。包括 `.eyebrow` 和 `.stats-eyebrow`。

---

## 🎨 Button 系統（v9.13 定案）

| Class | 樣式 | 用在哪 |
|-------|------|-------|
| **`.btn-primary`** | **黑底 橘字** | Nav「申請使用」、Hero「申請使用」、Manifesto「申請使用 →」 |
| **`.btn-secondary`** | **橘邊框 黑字 透明底** | Hero「先看怎麼運作 →」 |
| **`.btn-brand`** | **橘底 黑字** | （備用，未在主 Demo 使用）|

```css
.btn-primary {
  background: var(--text-primary);   /* 黑底 */
  color: var(--brand);                /* 橘字 */
}
.btn-secondary {
  background: transparent;
  color: var(--text-primary);         /* 黑字 */
  border: 1.5px solid var(--brand);   /* 橘邊框 */
}
.btn-brand {
  background: var(--brand);           /* 橘底 */
  color: var(--text-primary);         /* 黑字 */
}
```

⚠️ **Manifesto** 雖然背景是黑色底圖，但 btn-primary 的「黑底橘字」在底圖上仍然顯眼，**不需要反色覆寫**。

---

## 📐 Block 結構總覽（v10.0 順序）

| # | Block | Container | 備註 |
|---|-------|-----------|------|
| 01 | Top Nav | 100% | scroll 變白底 + blur |
| 02 | Hero | 1366px | 兩行標題 56px + marquee + **subtitle 不限寬度** |
| 03 | Stats Strip | 1080px | 3 個 counter / Geist 500 / 漸層 suffix / **eyebrow 橘色** |
| 04 | Scroll-Pinned Story | 1080px | ⭐ 見專用 spec + **Sidebar active 滑鼠 icon** |
| 05 | Feature Grid | 1080px | 圖片版 + Lightbox（**不能 overflow:hidden**）|
| ~~06~~ | ~~（D1 廢案）~~ | — | 編號保留以維持版本對齊,內容已併入 05 Reframe |
| 07 | Manifesto | 滿版 | Unsplash 底圖 + 黑漸層 |
| 08 | Data Testimonials | 1080px | 3 張 metric card + **GSAP scale hover** |
| **08.5** | **Scale Showcase** ⭐ | 1080px | Z 軸 scroll-linked depth reveal + counter 同步 |
| **10** | **FAQ Accordion** ⭐ 移前 | 768px | 先解疑慮 |
| **09** | **Final CTA + 表單** ⭐ 移後 | 90% 寬 **橘色卡片** | 黑字 + 深灰欄位 + 白底按鈕 |
| 11 | Footer | **100% 滿版** | 跟 Nav 一致 + pill |

---

## 📦 子 spec 目錄(v11.4 拆檔)

| 主題 | 檔案 |
|------|------|
| Block 04 Scroll-Pinned Story | `@docs/scroll-pinned-story-spec.md` |
| Block 08.5 Scale Showcase | `@specs/blocks/scale-showcase.md` |
| Block 09 Final CTA + 表單 + Webhook | `@specs/blocks/final-cta-form.md` |
| Block 10 FAQ Accordion | `@specs/blocks/faq-accordion.md` |
| 全站底層(A11y / SEO / States / Performance / Analytics) | `@specs/site-foundations.md` |
| RWD 響應式 Block-by-Block | `@specs/rwd-responsive.md` |

---

## 01. Top Nav

### Container
- 100% 寬，padding `0 32px`（**跟 Footer 一致，不用 1080px container**）
- `position: fixed; top:0; z-index:100;`
- 預設 `background: transparent`
- 滾動 > 80px 加 `.scrolled` → 白底 85% + `backdrop-filter: blur(16px) saturate(180%)` + 1px 黑線
- `transition: all 600ms var(--ease-out-expo)`

### 結構
```
[ Logo ●橘點 ]                    [ 怎麼運作 | 功能 | 常見問題 |  申請使用 ]
```

### Copy
- Logo: `Banner Studio` + 8px 橘色圓點 dot
- Menu links（依序）：
  - `怎麼運作` → `#story`
  - `功能` → `#features`
  - `常見問題` → `#faq`
  - `申請使用` → `#apply`（用 `.btn .btn-primary`，**不是 nav-link**）

### CSS（從 demo 抽）
```css
.nav {
  position: fixed; top:0; left:0; right:0;
  z-index: 100;
  padding: 16px 0;
  transition: all 600ms var(--ease-out-expo);
  background: transparent;
}
.nav > .container { max-width: 100%; padding: 0 32px; }
.nav.scrolled {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(16px) saturate(180%);
  box-shadow: 0 1px 0 rgba(0,0,0,0.04);
}
.nav-inner {
  display: flex; justify-content: space-between; align-items: center;
}
.logo {
  font-weight: 600; font-size: 20px; letter-spacing: -0.01em;
  display: flex; align-items: center; gap: 8px;
}
.logo-dot {
  width: 8px; height: 8px;
  background: var(--brand);
  border-radius: 50%;
}
.nav-menu { display: flex; align-items: center; gap: 32px; }
.nav-link {
  font-size: 15px; font-weight: 500;
  color: var(--text-primary);
  text-decoration: none;
  transition: opacity 200ms var(--ease-out-expo);
}
.nav-link:hover { opacity: 0.6; }
```

### Scroll behavior（JS）
```javascript
const nav = document.getElementById('nav');
lenis.on('scroll', ({ scroll }) => {
  nav.classList.toggle('scrolled', scroll > 80);
});
```
> 用 Lenis 的 scroll event，**不是 window 原生 scroll**，避免跟 Lenis 平滑滾動打架。

### A11y
- `<nav>` semantic tag
- 「申請使用」按鈕用 `<a class="btn btn-primary">`，不要用 `<button>`（要錨點跳轉）
- nav-link focus 狀態：`outline: 2px solid var(--brand); outline-offset: 4px`

### RWD
詳見 `@specs/rwd-responsive.md` Block 01 段(漢堡選單、logo 縮小)。

---

## 02. Hero

### Title
```
你以為要 4 小時的 banner
現在 3 分鐘
```
（兩行，無標點）

### Subtitle (v10.0 ⭐ 寬度跟標題一致，不再 max-width: 480px)
```
不用排期設計、不用會 Photoshop / Figma，沒時間用 AI 生圖、想文案。在 Notion 填 5 個欄位，AI 幫你把文案、底圖、組裝全做完。
```

### CTA
- `[申請使用]` btn-primary btn-lg → #apply
- `先看怎麼運作 →` btn-secondary btn-lg → #story

### Micro
```
已在業務團隊跑過 100+ 筆 · 平均 3 分鐘 · 誠實的 70% 一次過率
```

---

## 03. Stats Strip

### Eyebrow（橘色 ⭐ v10.0）
```
業務團隊實際數據
```

### Numbers
| 數字 | 單位 | Label |
|------|------|-------|
| 120 | + | 已產出 banner |
| 3 | min | 平均產製時間 |
| 72 | % | 一次通過率 |

### 字型細節
- Geist weight 500（瘦版）
- Suffix（+, min, %）漸層色

### ⚠️ 跟 Block 08.5 Scale Showcase 數字的定位差異

兩個區塊都有數字，但**講不同故事、不衝突**：

| 區塊 | 角色 | 數字內容 | 受眾 |
|------|------|---------|------|
| **03. Stats Strip** | **業務指標**（產品成果） | 120+ banner / 3 min / 72% | 給「考慮要不要用」的業務團隊 |
| **08.5. Scale Showcase** | **工程規格**（系統治理密度） | 16K+ Code / 14K+ Docs / 1:1 / $0.04 | 給「想知道這東西認真程度」的同行 / 上層 |

> **不要在 Stats Strip 放工程數字**（程式行數、文件密度），會稀釋業務訊息；
> **不要在 Scale Showcase 重複業務指標**（產製時間 3min、通過率 72%），但 Scale 第 1、2 個 metric 確實重複了 — 那是刻意的，因為 Scale 的視覺敘事是「業務指標 → 工程規格」由小到大堆疊，前兩個當錨點，後四個才是放大鏡。

---

## 04. Scroll-Pinned Story ⭐

**見獨立檔案 `@docs/scroll-pinned-story-spec.md`**

### Sidebar 滑鼠 Icon ⭐ v9 新增

Active sidebar item **左邊**出現露天橘色實體滑鼠 SVG icon，CSS animation 1.6s 循環模擬擺動。

#### SVG (圓角矩形 + 滾輪)
```html
<svg class="nav-mouse-icon" viewBox="0 0 24 24" fill="none">
  <rect x="6" y="2" width="12" height="20" rx="6" stroke="currentColor" stroke-width="2"/>
  <line x1="12" y1="6" x2="12" y2="10" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
</svg>
```

#### CSS
```css
.story-nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  /* ... */
}
.nav-mouse-icon {
  width: 20px;
  height: 20px;
  color: var(--brand);
  opacity: 0;
  transform: translateX(-8px);
  transition: opacity 400ms, transform 400ms;
}
.story-nav-item.active .nav-mouse-icon {
  opacity: 1;
  transform: translateX(0);
  animation: mouseHint 1.6s ease-in-out infinite;
}
@keyframes mouseHint {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  20%      { transform: translateY(-3px) rotate(-6deg); }
  50%      { transform: translateY(2px) rotate(4deg); }
  80%      { transform: translateY(-2px) rotate(-3deg); }
}
```

### 5 個 Step 文案（**標題去標點**）

| # | Title | Body | Layout |
|---|-------|------|--------|
| 01 | **在 Notion 填 5 個欄位** | 活動名稱、促銷重點、目標受眾、語氣風格、版型。其他欄位都可以讓 AI 自己決定。 | stack |
| 02 | **30-60 秒產出 3 組候選文案** | H1 大標、H2 小標、CTA 各 3 版,挑一個勾確認就好。 | split |
| 03 | **12 種風格 5 種主體 自由組合** | 清新美妝、質感家電、活潑童趣...AI 自動判斷。PC + M 一次產完。 | stack |
| 04 | **自動組裝 + WCAG 檢查** | 文字底圖自動拼起來,檢查對比度、文字超界。不合格直接退回重做。 | split |
| 05 | **Google Chat 通知 Drive 下載** | 每階段 Chat 提醒。Notion 審核,Drive 下載。 | stack |

---

## 05. Feature Grid + Lightbox

⚠️ **重要踩雷（v9.12）**：`.feature-card` **不能設定 `overflow: hidden`**，否則 reveal 動畫的 translateY mask 會把卡片下方文字切掉。

```css
.feature-card {
  background: transparent;
  border-radius: 28px;
  padding: 0;
  cursor: pointer;
  transition: transform 500ms var(--ease-out-expo);
  /* ❌ 不可加 overflow: hidden */
}
```

### Section Copy
- Eyebrow: `功能總覽`
- Title: **`一個工具 把業務團隊從 banner 地獄救出來`**（無標點）
- Subtitle: `Kay 做設計系統的時候,受不了 banner 要反覆排期和改尺寸,所以做了這個。`（**全形逗號**）

### 6 張卡片資料（內文用全形逗號）

| # | Title | Body |
|---|-------|------|
| 1 | 12 種視覺風格 | 清新、質感、活潑、急迫、溫馨...17 種選一個,或讓 AI 自動判斷。|
| 2 | PC + M 雙版型 | 一次產完 PC 和 Mobile 兩種版型。座標從 Figma 同步。|
| 3 | 3 組文案候選 | H1/H2/CTA 各 3 版。不滿意直接切換,或退回重跑。|
| 4 | WCAG 對比度檢查 | 大標 3:1、小標 4.5:1。對比度不夠擋下重做。|
| 5 | 手動上傳替代路徑 | AI 不滿意?按規範準備自己的底圖,上傳 Drive 貼連結。|
| 6 | Google Chat 自動通知 | 每階段完成 Chat 群組叫你審核。|

---

## 07. Manifesto ⭐ 滿版底圖

### Container
- **滿版（100%）**，不用 1080px container
- `padding: 160px 0; min-height: 80vh`
- `text-align: center`，垂直水平置中

### Copy
```
一個設計師做的
給不會設計的人用
```
（兩行 H2，**分開寫成兩個 `<h2>`**，行距 `margin-top: 8px`）

CTA 區：
- Button: `申請使用 →`（`.btn .btn-primary .btn-lg`，連到 `#apply`）
- Meta（CTA 下方 24px）: `Made by UIUX Team，專為露天業務團隊打造`（白色 70% 透明）

### 視覺
- **底圖**：Unsplash 黑白攝影風
  ```
  https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=2000&h=1200&fit=crop
  ```
- 底圖 z-index 0，背景蓋全版
- 黑色漸層遮罩（`::after`）：
  ```
  linear-gradient(180deg,
    rgba(0,0,0,0.3) 0%,
    rgba(0,0,0,0.5) 50%,
    rgba(0,0,0,0.7) 100%)
  ```
  > **由淺到深**，這樣文字可讀性最好（標題在中間/下半，最深的位置）。

### Typography
- H2: `clamp(48px, 7vw, 88px)`，weight 600，letter-spacing `-0.03em`，line-height 1.05
- 顏色：白色（`color: white`）

### CSS（從 demo 抽）
```css
.manifesto {
  padding: 160px 0;
  position: relative;
  text-align: center;
  overflow: hidden;
  min-height: 80vh;
  display: flex; align-items: center; justify-content: center;
}
.manifesto-bg {
  position: absolute; inset: 0;
  background-image: url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=2000&h=1200&fit=crop');
  background-size: cover; background-position: center;
  z-index: 0;
}
.manifesto-bg::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(180deg,
    rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.7) 100%);
}
.manifesto > .container { position: relative; z-index: 1; }
.manifesto h2 {
  font-size: clamp(48px, 7vw, 88px);
  font-weight: 600; letter-spacing: -0.03em; line-height: 1.05;
  color: white;
}
.manifesto h2 + h2 { margin-top: 8px; }
.manifesto-cta { margin-top: 64px; }
.manifesto-meta {
  margin-top: 24px;
  font-size: 14px;
  color: rgba(255,255,255,0.7);
}
```

### ⚠️ 重要：btn-primary 在這裡**不需要反色**
Manifesto 是黑色底圖背景，btn-primary 預設是橘底黑字，本身在黑底上夠搶眼。不要再做 `background: white` 的覆寫，會違反全站 CTA 一致性。

---

## 08. Data Testimonials

### Section Copy
- Eyebrow: `實測數據`
- Title: **`不用信我們 看數據`**
- Subtitle: `Banner Studio 已經在露天業務團隊跑了一段時間。`

### 3 張卡片

| 主數字 | 單位 | Label | Detail |
|--------|------|-------|--------|
| `<` 10 分鐘 | — | 從需求到成品 | 實測平均 3-5 分鐘完成全流程 |
| 72 | % | 一次通過率 | PRD 目標 60%、實測 72% |
| $0.04 USD | — | 單筆 API 成本 | 100 張約 120 元 |

### Hover 動畫 ⭐ v9.9 GSAP 接管

**用 GSAP 不是純 CSS** — CSS transition 開頭沒辦法做 delay 醞釀感且色彩插值機械感重。GSAP 用 spring 物理曲線 + 進場/退場不對稱 timing，視覺感受完全不一樣。

#### CSS (僅做基底，不寫 transition)
```css
.testimonial-card {
  background-color: var(--bg-page);
  border: none;
  border-radius: 28px;
  padding: 40px;
  cursor: pointer;
  /* ⭐ GPU 加速關鍵 */
  will-change: transform, box-shadow;
  transform: translateZ(0);
  backface-visibility: hidden;
}
```

#### GSAP（D3 用 vanilla，D7 React 改 Framer Motion）
```js
document.querySelectorAll('.testimonial-card').forEach(card => {
  let hoverTl = null;

  card.addEventListener('mouseenter', () => {
    if (hoverTl) hoverTl.kill();
    hoverTl = gsap.timeline({ defaults: { overwrite: 'auto' } });

    // Scale + 浮起 (主 0.7s)
    hoverTl.to(card, {
      scale: 1.02, y: -6, duration: 0.7, ease: 'expo.out'
    }, 0);

    // 陰影 (慢 0.9s, delay 100ms)
    hoverTl.to(card, {
      boxShadow: '0 12px 28px rgba(0,0,0,0.05), 0 4px 8px rgba(0,0,0,0.03)',
      duration: 0.9, delay: 0.1, ease: 'power2.out'
    }, 0);
  });

  card.addEventListener('mouseleave', () => {
    if (hoverTl) hoverTl.kill();
    gsap.to(card, {
      scale: 1, y: 0, boxShadow: '0 0 0 rgba(0,0,0,0)',
      duration: 0.5, ease: 'power3.out'
    });
  });
});
```

**為什麼純 transform 不動 background**：transform 走 GPU compositor layer，60fps 順暢；background-color 走 CPU paint，會掉幀且色相插值髒。

---

## 08.5. Scale Showcase ⭐ → 拆出

> **完整內容已搬到 `@specs/blocks/scale-showcase.md`**(含 6 metric 表 / Z 軸 JS / 9 踩雷 / Mobile 降級)。
> 改 Block 08.5 行為前必讀該檔。

---

## 10. FAQ Accordion ⭐ → 拆出

> **完整內容已搬到 `@specs/blocks/faq-accordion.md`**(含 3 Q&A / HTML / CSS / JS / A11y / 動畫)。
> 改 FAQ 前必讀該檔。

---

## 09. Final CTA + 表單 ⭐ → 拆出

> **完整內容已搬到 `@specs/blocks/final-cta-form.md`**(含卡片 / 表單欄位 / 送出按鈕 / 雙 webhook 架構 / Apps Script / Next.js API route / Vercel env vars)。
> 改 Final CTA 或表單行為前必讀該檔。

---

## 11. Footer ⭐ v10.0

### Container：跟 Nav 一致 滿版
```css
.footer { background: var(--neutral-900); color: white; padding: 80px 0 32px; }
.footer > .container {
  max-width: 100%;          /* ⭐ 滿版,跟 Nav 一致 */
  padding: 0 32px;
}
```

### Brand
```
Banner Studio
露天 UIUX Team × Sales       ← v9.12 從 Marketing 改 Sales
```

### 快速連結（含 pill）
```
Notion DB 後台 [需申請]      ← 橘色 pill 黑字 11px
Quick Start 教學
```

### Pill 樣式
```css
.footer-pill {
  display: inline-block;
  margin-left: 6px;
  padding: 2px 8px;
  background: var(--brand);
  color: var(--text-primary);
  border-radius: 9999px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.02em;
  vertical-align: middle;
}
```

### 找 Kay
```
Google Chat: @kay     ← v9.x 從 Slack 改 Google Chat
```

### Bottom
```
© 2026 露天 UIUX Team · Internal Use Only
```

---

## ♿ Site Foundations(全站底層) → 拆出

> **A11y / SEO + OG / Loading-Error-Success states / Performance + Browser Support / Analytics 完整規格已搬到 `@specs/site-foundations.md`**。
> 動到全站底層規範前必讀該檔。

---

## 📱 RWD 響應式規格 → 拆出

> **Block-by-Block mobile/tablet 行為、降級規則、共用 Mobile Polish、QA Checklist 已搬到 `@specs/rwd-responsive.md`**。
> 改任何 block 的 mobile 行為前必讀該檔對應段。

---

## 📦 D3 開工檔案清單

`~/Desktop/banner-studio-site/docs/`(主)+ `specs/`(拆出):

**docs/**
1. `banner-studio-full-copy-and-spec.md` — **本檔(v11.4)**
2. `scroll-pinned-story-spec.md` — Block 04 深挖
3. `claude-code-day1-prompt.md` — D3-D7 Claude Code prompt
4. `banner-studio-demo-v10-final.html` — **v10.0 視覺 reference**(檔名保留 v10,內容是 D2 demo final)

**specs/**(v11.4 拆檔)
5. `specs/blocks/scale-showcase.md` — Block 08.5
6. `specs/blocks/faq-accordion.md` — Block 10
7. `specs/blocks/final-cta-form.md` — Block 09 + Webhook
8. `specs/site-foundations.md` — A11y / SEO / States / Performance / Analytics
9. `specs/rwd-responsive.md` — RWD 全規格

### CDN 依賴
- Lenis (smooth scroll)
- **GSAP 3.12.5** ⭐ v9.9 新增（Testimonials hover 用）
- D7 React 版用 Framer Motion 取代 GSAP

---

## 📋 版本歷程

| 版本 | 日期 | 主要變更 |
|------|------|---------|
| v7 | 4/24 | Block 04 chckn 結構、Block 05 圖片版+Lightbox、Block 07 底圖版、Block 08.5 新增、Block 09 表單版 |
| v8.0-8.7 | 4/25 上午 | Z 軸 scroll-linked depth reveal、Geist 字型、Final CTA 卡片化深藍 |
| v8.8 | 4/25 中午 | FAQ ↔ Final CTA 順序對調 |
| v9.0-9.1 | 4/25 下午 | Sidebar 滑鼠 icon（圓角矩形 SVG + 動畫）|
| v9.2-9.7 | 4/25 下午 | Testimonials hover 嘗試 6 版（spotlight / 漸變 / gradient / 暖灰 / GSAP）|
| v9.8 | 4/25 下午 | Testimonials 純 CSS scale（被退回）|
| **v9.9** | 4/25 下午 | **Testimonials GSAP scale spring（鎖定）**|
| v9.10-9.11 | 4/25 下午 | Final CTA 改露天橘卡片 + 表單 #33343B 無框 + 白底按鈕半寬 + 文字全黑 |
| v9.12 | 4/25 下午 | 全形標點、Footer pill「需申請」、UIUX × Sales、stats eyebrow 橘色、Button 三色 |
| v9.13 | 4/25 下午 | Button primary 改黑底橘字 |
| **v10.0** | **4/25 傍晚** | **Hero subtitle 寬度同標題、Footer 滿版同 Nav（部署準備完成）**|
| **v10.1** | **4/25 傍晚** | **補完整 RWD 響應式規格 — Block-by-Block mobile/tablet 行為、降級規則、QA checklist**|
| **v11.0** | **4/25 晚上** | **加 Google Sheet 雙寫架構（Chat + Sheet），Apps Script webhook + Next.js API route 程式碼**|
| **v11.1** | **4/25 晚上** | **補完整 — Spacing/Radius/Shadow/Z-index/Duration/Breakpoint Scale + A11y + SEO/OG + Loading/Error/Success states + Lighthouse + Browser Support + Analytics**|
| ~~v11.2~~ | ~~4/25 D2~~ | ~~（**假升版**:changelog 宣稱補 4 個 block 章節 + Hero 全形 + Stats vs Scale 說明 + 檔案清單對齊,但實際只做了 Block 結構表 06 註記 + Sheet Notion ID 註記 + 版本號變更。已在 v11.3 真補)~~ |
| **v11.3** | **4/25 D2 真補完** | **Block 01 Top Nav / 07 Manifesto / 08.5 Scale Showcase / 10 FAQ Accordion 完整章節 + Hero subtitle 半形→全形 + Stats vs Scale 數字定位區隔 + D3 檔案清單** |
| **v11.4** | **4/25 D2 拆檔治理** | **Block 08.5 / 09 / 10 拆到 `specs/blocks/` + A11y/SEO/States/Performance/Analytics 合併到 `specs/site-foundations.md` + RWD 拆到 `specs/rwd-responsive.md`。主檔 2024 → ~700 行,治理達標** |
