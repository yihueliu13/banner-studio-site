# Banner Studio — Full Copy & Spec

**Version**: v11.1 (2026-04-25 D2 完整版 + RWD + DB + A11y + SEO + States + Analytics)
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
| 07 | Manifesto | 滿版 | Unsplash 底圖 + 黑漸層 |
| 08 | Data Testimonials | 1080px | 3 張 metric card + **GSAP scale hover** |
| **08.5** | **Scale Showcase** ⭐ | 1080px | Z 軸 scroll-linked depth reveal + counter 同步 |
| **10** | **FAQ Accordion** ⭐ 移前 | 768px | 先解疑慮 |
| **09** | **Final CTA + 表單** ⭐ 移後 | 90% 寬 **橘色卡片** | 黑字 + 深灰欄位 + 白底按鈕 |
| 11 | Footer | **100% 滿版** | 跟 Nav 一致 + pill |

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
不用排期設計、不用會 Photoshop / Figma,沒時間用 AI 生圖、想文案。在 Notion 填 5 個欄位,AI 幫你把文案、底圖、組裝全做完。
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

---

## 04. Scroll-Pinned Story ⭐

**見獨立檔案 `scroll-pinned-story-spec.md`**

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

## 08.5. Scale Showcase ⭐

（保持 v8.x 規格，內容不動 — Z 軸 scroll-linked depth reveal + counter 同步驅動 5 屬性）

請參考前版 spec 的 Block 08.5 完整段落（包含 6 metric 列表、Framer Motion 範例 code、踩雷清單）。

---

## 09. Final CTA + 表單 ⭐ v9.10-9.11 大改造

### 卡片底色：露天橘 ⭐ v9.10

```css
.final-cta-card {
  width: 90%;
  margin: 0 auto;
  padding: 96px 96px;
  background: var(--brand);              /* 露天橘 */
  color: var(--text-primary);            /* 黑字 */
  border-radius: 32px;
  position: relative;
  overflow: hidden;
}
.final-cta-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 80% 30%, rgba(255, 255, 255, 0.08) 0%, transparent 60%);
  pointer-events: none;
}
```

### 卡片內所有文字：黑色 ⭐ v9.11

```css
.final-cta-intro h2 { color: var(--text-primary); }
.final-cta-subtitle { color: rgba(28, 25, 23, 0.75); }
.final-cta-points li { color: var(--text-primary); }
.final-cta-points li::before { color: var(--text-primary); }   /* ✓ 黑色 */
.form-label { color: var(--text-primary); }
.form-label .required { color: var(--text-primary); }
.form-meta { color: rgba(28, 25, 23, 0.6); }
.form-success-icon { background: rgba(28, 25, 23, 0.1); color: var(--text-primary); }
.form-success p { color: rgba(28, 25, 23, 0.7); }
```

### 表單欄位：#33343B 無框 ⭐ v9.10

```css
.form-input {
  background: #33343B;
  border: none;             /* ⭐ 無邊框 */
  border-radius: 12px;
  padding: 14px 16px;
  font-size: 15px;
  color: white;
  outline: none;
  transition: all 300ms var(--ease-out-expo);
}
.form-input::placeholder { color: rgba(255,255,255,0.4); }
.form-input:hover { background: #3A3B43; }
.form-input:focus {
  background: #3D3E47;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.15);
}
```

### 送出按鈕：白底黑字、寬度 50% ⭐ v9.10

```css
.form-submit-row {
  align-items: flex-start;   /* 按鈕靠左 */
}
.form-submit {
  background: white;
  color: var(--text-primary);
  width: 50%;                /* ⭐ 寬度減半 */
  padding: 16px 32px;
  border: none;
  border-radius: 9999px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  animation: pulse 3s var(--ease-out-expo) infinite;
}
.form-submit:hover {
  background: #F5F5F4;
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15);
}
/* Mobile 回 100% */
@media (max-width: 640px) {
  .form-submit { width: 100%; }
}

/* Pulse 改白色光環 (因為按鈕是白底) */
@keyframes pulse {
  0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.5); }
  50% { transform: scale(1.04); box-shadow: 0 0 0 16px rgba(255, 255, 255, 0); }
}
```

### Form-meta 文案
```
申請 24 小時內開通 · 有問題 Google Chat 找 Kay
```

---

### 🗄️ 資料持久化架構 ⭐ v11.0 新增

#### 雙 Webhook 設計

```
業務填表 → POST /api/apply → ① Google Chat webhook(即時通知 Kay)
                          → ② Google Sheet webhook(累積申請紀錄)
                          → 回傳 success
```

#### 為什麼兩個都要

- **Chat 通知**:Kay 立刻知道有人申請,可以馬上加進 Notion DB
- **Sheet 紀錄**:所有申請累積,可以看「總申請數」「部門分佈」,**考績佐證直接撈這個**

#### Google Sheet 結構

Sheet 欄位:
```
A: Timestamp        (自動填)
B: 姓名
C: 部門
D: Email
E: Notion ID
F: 處理狀態         (Kay 手動標,預設留空)
```

#### Google Apps Script Webhook

Sheet → Extensions → Apps Script,貼:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.name || '',
    data.dept || '',
    data.email || '',
    data.notion || '',
    ''  // 處理狀態,預設空
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

Deploy → New deployment → **Web app** → Execute as: Me / Who has access: **Anyone** → 拿到 URL,設成 Vercel env var `SHEETS_WEBHOOK_URL`。

#### Next.js API Route(`app/api/apply/route.ts`)

```typescript
export async function POST(req: Request) {
  const data = await req.json();

  // 簡單 email 格式驗證
  if (!data.email?.includes('@')) {
    return Response.json({ error: 'Invalid email' }, { status: 400 });
  }

  // 並行送兩個 webhook
  const [chatRes, sheetRes] = await Promise.allSettled([
    // ① Google Chat 通知
    fetch(process.env.CHAT_WEBHOOK!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cardsV2: [{
          card: {
            header: { title: '🎨 Banner Studio 新申請' },
            sections: [{
              widgets: [
                { decoratedText: { topLabel: '姓名', text: data.name } },
                { decoratedText: { topLabel: '部門', text: data.dept } },
                { decoratedText: { topLabel: 'Email', text: data.email } },
                { decoratedText: { topLabel: 'Notion ID', text: data.notion } },
              ]
            }]
          }
        }]
      }),
    }),
    // ② Google Sheet 累積
    fetch(process.env.SHEETS_WEBHOOK_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),
  ]);

  // 容錯:就算 Sheet 失敗,Chat 通知到了也算成功
  if (chatRes.status === 'rejected' && sheetRes.status === 'rejected') {
    return Response.json({ error: 'Both webhooks failed' }, { status: 500 });
  }

  return Response.json({ success: true });
}
```

#### Vercel Env Vars(部署時設)

```
CHAT_WEBHOOK=https://chat.googleapis.com/v1/spaces/.../messages?key=...
SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/.../exec
```

#### Kay 的後續工作流

收到 Chat 通知 → 開 Sheet 看細節 → 手動加進 Notion DB(`bef2ca4469914de1b5cf5610043132db`)→ 在 Sheet F 欄標「已開通」

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

## ♿ Accessibility (A11y) 規格 ⭐ v11.1

### HTML 語意化
- `<html lang="zh-Hant">` 明確聲明語系
- 每個 section 用 `<section aria-labelledby="...">`
- Hero `<h1>` 全站只能一個
- 各 section 用 `<h2>`，內部小標 `<h3>`
- Lists 用 `<ul>` / `<ol>`，不要用 `<div>` 假裝
- Footer 用 `<footer>`，Nav 用 `<nav aria-label="主導覽">`

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
| Form input | `<label for>` 對應，必填加 `aria-required="true"` |
| Form error | `<p id="email-error" role="alert">` + input `aria-describedby="email-error"` |
| Loading spinner | `aria-live="polite"` + `aria-label="送出中"` |
| Decorative icon | `aria-hidden="true"`（如 sidebar 滑鼠 SVG）|

### 鍵盤導航
- Tab order 跟視覺順序一致
- Lightbox：開啟時 focus trap 在 modal，ESC 關閉
- FAQ accordion：Enter / Space 展開，Arrow up/down 切換
- Form：Enter 送出，欄位間 Tab 切換

### 顏色對比度（WCAG AA）
| 組合 | 對比度 | 通過？ |
|------|-------|-------|
| `#1C1917` text on `#FAFAF9` bg | 17.4:1 | ✅ AAA |
| `#57534E` secondary on `#FAFAF9` | 7.5:1 | ✅ AAA |
| `#A8A29E` muted on `#FAFAF9` | 3.0:1 | ⚠️ 只能用大字級 (≥18px) |
| `#FF963B` brand on white | 2.6:1 | ❌ 不能當 body text，只能當大字 / button bg |
| `#FF963B` brand on `#1C1917` | 6.7:1 | ✅ AAA（btn-primary 黑底橘字 OK）|
| White on `#FF963B`（橘卡片）| 2.6:1 | ❌ Final CTA 文字不能用白色 |
| Black on `#FF963B` | 9.0:1 | ✅ AAA（v9.11 改黑字正確）|

### Skip Link（mobile 友善）
首屏左上角加 skip link：
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

JS 也需偵測：
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

### OG 圖規格（D7 polish 階段做）
- **尺寸**：1200 × 630px
- **檔案**：`public/og-image.png`
- **內容建議**：
  - 露天橘色底
  - 大字「Banner Studio」（Geist 96px 黑字）
  - 副標「4 小時 → 3 分鐘」
  - 右下角「露天 UIUX × Sales」
- **生成方式**：用 Banner Agent 自己產一張（吃自己的狗糧）。失敗用 Figma 手刻。

### Favicon 規格
- `favicon.svg`：32 × 32 SVG，露天橘色 "B" 字母
- `apple-touch-icon.png`：180 × 180 PNG，圓角會由 iOS 自動套

### Sitemap / robots.txt
- 內部站 **不需要** sitemap.xml
- `public/robots.txt`：
  ```
  User-agent: *
  Disallow: /
  ```

---

## ⚡ Loading / Error / Success States 規格 ⭐ v11.1

### 表單 Loading State

送出按鈕點下後：
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

CSS：
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

#### 欄位驗證錯誤（前端即時）
- Email 格式錯：欄位下方紅字「請輸入有效的 Email」
- 必填空白：欄位 border 變紅 + 下方「此欄位為必填」
- 出現方式：onBlur 觸發，不要 onChange（太煩）

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
雙 webhook 都失敗時，表單下方顯示：
```
😕 送出失敗,請稍後再試,或直接 Google Chat 找 Kay
```

不要把技術細節（500 / timeout）給業務看。

### 表單 Success State

送出成功後 fade out 表單，顯示成功訊息（spec 已有）：
```
✓ (橘色圓 72×72)
申請已送出
Kay 已收到通知,24 小時內會把你加進 Notion 和 Chat 群組。
```

5 秒後**不要**自動跳走，讓人看清楚。

### 圖片 Loading State

所有 `<img>` / `<Image>` 預設灰底 placeholder：
```css
img {
  background: var(--neutral-100);
}
```

Next.js Image 加 `placeholder="blur"` + `blurDataURL`（自動產低解析）。

### Page Loading（Next.js）

`app/loading.tsx`：
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

實際上 Next.js SSR 後幾乎不會看到，但 PWA / 慢網路會用到。

---

## 🚀 Performance + Browser Support 目標 ⭐ v11.1

### Lighthouse 目標（Production URL 跑）

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
- [ ] 所有圖片用 `next/image`（自動 webp + lazy + responsive）
- [ ] 字型用 `next/font` 自動 preload + 自託管（不直接 link Google Fonts）
- [ ] GSAP 用 dynamic import（`import('gsap')`）只在桌機載入
- [ ] Lenis 用 dynamic import 只在桌機載入
- [ ] Block 08.5 / Block 04 component 用 `<Suspense>` 拆 chunk
- [ ] CSS 用 Tailwind JIT，build 後 < 50KB
- [ ] 全站 JS bundle < 200KB（gzipped）
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

**降級策略**：用 `@supports` 偵測，舊瀏覽器用 fallback：
```css
.testimonial-card { background: #FAFAF9; }
@supports (background: oklch(0.5 0.1 50)) {
  .testimonial-card:hover { background: oklch(94% 0.012 70); }
}
```

⚠️ 露天業務同事大多用 Chrome / iOS Safari，**IE / 舊版 Safari 不需要支援**。

---

## 📊 Analytics 埋點規格 ⭐ v11.1

### 工具選擇

| 選項 | 優點 | 缺點 |
|------|------|------|
| **Google Analytics 4** | 免費、容易接、報表齊全 | 設定複雜、隱私疑慮 |
| **Vercel Analytics** | 一鍵啟用、Web Vitals 內建 | 要付費（免費版限量）|
| **Plausible / Umami** | 簡潔、隱私友善 | 要自架或付費 |

**內部站建議**：用 **Vercel Analytics 免費版**就夠（每月 2500 events），不需要 GA4。

### 埋點事件

| 事件名 | 觸發 | 屬性 |
|--------|------|------|
| `page_view` | 進站 | path, referrer |
| `cta_click` | 點任何 CTA | location（hero/manifesto/nav）|
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
不蒐集 PII（個人資料）。表單填的姓名/Email 只送 webhook **不送 Analytics**。

考績呈報數據時用：
1. **Google Sheet** 撈申請數量、部門分佈
2. **Vercel Analytics** 撈訪問數、轉換率（form_submit / page_view）

---

## 📦 D3 開工檔案清單

`~/Desktop/banner-studio-site/docs/`：

1. `banner-studio-full-copy-and-spec.md` — **本檔（v10.0）**
2. `scroll-pinned-story-spec.md` — Block 04 深挖
3. `claude-code-day1-prompt.md` — D3-D7 Claude Code prompt
4. `banner-studio-demo-v10-final.html` — **v10.0 視覺 reference**

### CDN 依賴
- Lenis (smooth scroll)
- **GSAP 3.12.5** ⭐ v9.9 新增（Testimonials hover 用）
- D7 React 版用 Framer Motion 取代 GSAP

---

## 📱 RWD 響應式規格 ⭐ v10.1

### Breakpoints 三段式
```css
/* Desktop default */     ≥ 1100px
/* Tablet */               768px - 1099px
/* Mobile */               < 768px
/* Small mobile */         < 480px
```

### 全站通則

#### 觸控目標尺寸（Apple HIG / Material 標準）
- 所有可點擊元素最小 **44 × 44 px**（含 nav links / sidebar items / accordion / form inputs / buttons）
- Inline link 例外（保持文字尺寸即可，但 padding 區可擴展）

#### Hover 替代
- Mobile **沒有** hover 概念，所有 `:hover` 互動需要對等的 `:active` / `tap` 替代
- Testimonials GSAP hover → mobile **完全不執行**（用 `matchMedia('(hover: hover)')` 偵測）
- Feature card hover → 同上，mobile 改成「點擊直接開 Lightbox」
- Button :hover transform → mobile 改成 `:active { transform: scale(0.98) }`

#### Container padding
| Breakpoint | Nav / Footer | Hero / Sections |
|-----------|--------------|----------------|
| Desktop ≥ 1100 | 32px | 24px |
| Tablet 768-1099 | 24px | 24px |
| Mobile < 768 | 20px | 20px |
| Small < 480 | 16px | 16px |

#### Typography 縮放
所有 `clamp()` 函數會自動縮放，但需驗證：
- Hero title `clamp(40px, 6vw, 56px)` → mobile 約 32-40px
- Section h2 → mobile 應 ≥ 32px（不能太小，否則沒有 marketing 衝擊力）
- Body text 最小 14px（Mobile WCAG 標準）

---

### Block-by-Block RWD 規格

#### 01. Top Nav

| 螢幕 | 行為 |
|------|------|
| Desktop | 100% 滿版 + 32px padding，顯示 menu items |
| Tablet | 同 desktop 但 padding 24px |
| Mobile | **隱藏 menu items，顯示漢堡選單**（D7 polish 做） |
| Mobile（簡版） | D3-D6 階段 menu items 直接隱藏，只留 Logo + 「申請使用」按鈕 |

```css
@media (max-width: 768px) {
  .nav-menu { display: none; }
  /* 或改為點漢堡 */
}
```

#### 02. Hero

| 螢幕 | 佈局 |
|------|------|
| Desktop | 兩欄 1.2fr / 1fr，左文字右 marquee |
| Tablet (768-1099) | 兩欄但比例改 1fr / 1fr，marquee 高度縮到 480px |
| Mobile (< 768) | **單欄**，文字在上、marquee 在下（高度 320px） |
| Small (< 480) | **隱藏 marquee**，純文字 + CTA |

理由：marquee 在 mobile 直排會佔太多空間，小螢幕直接拿掉，文字 + CTA 即可。

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

#### 03. Stats Strip

| 螢幕 | 佈局 |
|------|------|
| Desktop | 三欄 1fr / 1fr / 1fr |
| Tablet | 三欄但 padding 縮小 |
| Mobile (< 768) | **三欄改單欄**，每個 stat 之間用 divider 分隔 |
| Small | 同 mobile |

```css
@media (max-width: 768px) {
  .stats-grid { grid-template-columns: 1fr; gap: 48px; }
  .stat-item { text-align: center; }
}
```

#### 04. Scroll-Pinned Story ⭐ 最複雜

| 螢幕 | 行為 |
|------|------|
| Desktop | sidebar 200px sticky + 卡片 1fr |
| Tablet (768-1099) | **sidebar 變橫向 sticky 在頂端**（top: 80px），卡片在下方 |
| Mobile (< 768) | **完全隱藏 sidebar**，純粹卡片直排 |

#### Mobile 降級理由
- Sticky sidebar 在小螢幕上會擋畫面
- 5 張卡片直排即可，不需要 navigator
- **滑鼠 icon 動畫**：在 desktop / tablet 顯示，mobile **隱藏整個 sidebar 自然就沒了**

#### 卡片 Layout 統一直排
- Desktop 的 stack/split 混合佈局（Step 1/3/5 stack, Step 2/4 split）→ **mobile 全部變 stack**（圖在上，文字在下）

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

#### 05. Feature Grid + Lightbox

| 螢幕 | 佈局 |
|------|------|
| Desktop | 3 欄 |
| Tablet | **2 欄** |
| Mobile | **單欄** |

#### Lightbox Modal mobile 行為
- 打開 modal：`position: fixed; inset: 0`，全螢幕（不是 max-width 1100px）
- 圖片 `max-height: 60vh`（避免太佔螢幕，留空間給文字）
- Close button：右上角 **48 × 48 px**（觸控目標尺寸）
- 改用 `touchstart` 事件 detect 滑動關閉（往下拉關閉）

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

#### 07. Manifesto

| 螢幕 | 行為 |
|------|------|
| Desktop | 滿版底圖 + 黑漸層 + 兩行 88px h2 |
| Mobile | 同結構，h2 自動縮到約 56px（clamp 處理）|

#### 注意
- 底圖 mobile 要確認上下漸層**夠暗**（Unsplash 圖片在小螢幕對比可能跑掉）
- CTA 按鈕在 mobile 改 `width: 100%`

```css
@media (max-width: 480px) {
  .manifesto-cta .btn { width: 100%; }
  .manifesto-meta { font-size: 13px; }
}
```

#### 08. Testimonials

| 螢幕 | 佈局 |
|------|------|
| Desktop | 3 欄 |
| Tablet | 3 欄保留（卡片內容夠精簡）|
| Mobile (< 768) | **單欄** |

#### Hover 處理 ⭐ 重要
GSAP hover **不在 mobile 執行**：

```js
const isMobile = !window.matchMedia('(hover: hover)').matches;

document.querySelectorAll('.testimonial-card').forEach(card => {
  if (isMobile) return;  // ⭐ mobile 完全跳過
  // ... 桌機才綁 mouseenter / mouseleave
});
```

或在 React：
```tsx
const canHover = useMediaQuery('(hover: hover)');
{canHover && <HoverEffect />}
```

```css
@media (max-width: 768px) {
  .testimonial-grid { grid-template-columns: 1fr; gap: 16px; }
}
```

#### 08.5 Scale Showcase ⭐ 必須降級

| 螢幕 | 行為 |
|------|------|
| Desktop | Z 軸 perspective 1500px reveal + counter 同步 |
| Tablet | 保留 Z 軸但 perspective 縮小到 800px |
| Mobile (< 768) | **完全降級為 translateY + fade**，不用 perspective |

#### 為什麼 mobile 要降級
- Perspective 在小螢幕（< 480px）會把字放大到糊掉
- Mobile GPU 算 3D transform 容易卡頓
- 6 個數字直排已經很長，不需要再加 z 軸戲劇性

#### 降級實作
```js
const isMobile = window.innerWidth < 768;

if (isMobile) {
  // 純 translateY + fade，不算 z / scale / blur
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
- 6 個 metric 從 2 × 3 grid 改為 **1 × 6 grid**（直排）
- 不再「左右交錯橘藍」，全部置中
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

#### 10. FAQ Accordion

| 螢幕 | 行為 |
|------|------|
| Desktop | 768px 寬置中 |
| Tablet | 同 desktop |
| Mobile | 100% 寬，padding 20px |

#### 觸控注意
- Accordion `<button>` 整個 row 高度至少 56px（觸控友善）
- `+` icon 至少 24px（容易點到）

```css
@media (max-width: 768px) {
  .faq-question {
    min-height: 56px;
    padding: 20px 0;
  }
}
```

#### 09. Final CTA + 表單

| 螢幕 | 行為 |
|------|------|
| Desktop | 90% 寬橘卡片 + 兩欄 1fr / 1fr |
| Tablet (768-1099) | 90% 寬保留，padding 縮到 64px，**改單欄**（左文字 + 下表單）|
| Mobile (< 768) | **95% 寬**，padding 40-48px，單欄 |
| Small (< 480) | **100% 寬**（去 margin，讓卡片貼邊），padding 32px 24px，圓角縮到 16px |

#### 表單欄位 mobile
- 4 個欄位（姓名/部門/Email/Notion ID）→ **全部改 1 欄滿版**
- input 高度 ≥ 48px（觸控友善）
- 字級 16px（避免 iOS 自動縮放）
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

#### 11. Footer

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

### 共用 Mobile Polish 細節

#### Performance
- Mobile 優先載入小張圖（Unsplash 帶 `?w=800` query param 而非 `?w=1200`）
- Lazy load 所有非首屏 image：`<img loading="lazy">`
- Reveal 動畫在 mobile 縮短（800ms → 500ms），減少 jank

#### Scroll
- Lenis smooth scroll 在 iOS 可能會跟系統 inertia 打架
  - 建議 mobile **關閉 Lenis**：`smoothWheel: false, smoothTouch: false`
  - 用 native scroll，CSS `scroll-behavior: smooth` 處理錨點

```js
const lenis = new Lenis({
  duration: 1.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: window.innerWidth >= 768,    // ⭐ mobile 關閉
  smoothTouch: false,                        // 永遠關閉 touch
});
```

#### Form input iOS 注意事項
- `<input>` 字級必須 ≥ 16px，否則 iOS 點到自動 zoom
- `inputmode="email"` / `autocomplete="email"` 提升填表體驗
- Email 欄位加 `enterkeyhint="next"`，最後一個欄位 `enterkeyhint="send"`

#### Reveal 動畫
- IntersectionObserver `rootMargin` 在 mobile 收緊（移到 -50px），提早觸發

---

### Mobile QA Checklist（D7 polish 階段必跑）

- [ ] iPhone 14 Pro (390 × 844) 各 block 直排正常
- [ ] iPhone SE (375 × 667) 沒有橫向 scroll
- [ ] iPad (768 × 1024) tablet 中間值佈局
- [ ] 所有按鈕觸控目標 ≥ 44 × 44px
- [ ] 表單欄位 ≥ 48px 高、字級 ≥ 16px
- [ ] Block 04 sidebar 在 mobile 完全隱藏
- [ ] Block 08.5 Z 軸 reveal 在 mobile 改用 translateY + fade
- [ ] Testimonials hover 在 mobile **不執行 GSAP**（matchMedia 偵測）
- [ ] Lightbox 在 mobile 全螢幕 + 大 close 按鈕
- [ ] Lenis smoothWheel 在 mobile 關閉
- [ ] 文字 reveal 動畫不會卡頓
- [ ] Footer 三欄改單欄
- [ ] Final CTA 表單 4 欄位改 1 欄、按鈕滿版

---



- [ ] 4 個檔案放進 `~/Desktop/banner-studio-site/docs/`
- [ ] GitHub repo `yihueliu13/banner-studio-site` 建好
- [ ] `CHAT_WEBHOOK` env var 從 Banner Agent 複製備用
- [ ] **蒐圖延後**到 D5 看 Claude Code 跑出實際 layout 再決定（Kay 自決）

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
