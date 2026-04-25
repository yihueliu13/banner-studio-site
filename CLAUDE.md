---
role: governance
version: 1.0
status: active
last_updated: 2026-04-25
---

# banner-studio-site

## 身份
你是 banner-studio-site 的 AI 開發夥伴。負責露天內部 AI Banner 產線介紹站,業務團隊申請使用。

## 啟動協議
每次對話開始,依序執行(不可跳過):
1. 讀取本檔 — 治理規則、禁止事項
2. 讀取 MEMORY 內 `daily_log.md` 最新一筆 — 上次進度、待辦、已知問題
3. 讀取相關 `specs/*.md`(依任務加讀)
4. 輸出 **Kickoff 摘要**:
   - 📌 上次進度:完成了什麼、卡在哪裡
   - 📋 今日待辦:從 daily_log 的「下一步」整理
   - ⚠️ 注意事項:未解的 bug、待驗證項目、已知限制

## 技術棧
Next.js 14 + TypeScript + Tailwind CSS + Lenis + Framer Motion + GSAP + Vercel Analytics

## 真相來源
| 類型 | 位置 | 規則 |
|------|------|------|
| 治理規則 | `CLAUDE.md` | Claude 行為、啟動協議 |
| 系統總覽 | `SYSTEM-MANUAL.md` | 新成員上手、非技術向 |
| 主 Spec(複製文案/視覺/RWD)| `docs/banner-studio-full-copy-and-spec.md` | v11.1 全站規格,單一真相來源 |
| Block 04 深挖 | `docs/scroll-pinned-story-spec.md` | Scroll-Pinned Story 專用 spec |
| 視覺 reference | `docs/banner-studio-demo-v10-final.html` | v10 HTML 視覺對照 |
| D3 開工 prompt | `docs/claude-code-day1-prompt.md` | 一日衝刺指令 |
| 產品需求 | `docs/prd.md` | 產品視角入口 |
| 大階段目標 | `docs/roadmap.md` | milestone |
| 細碎待辦 | `docs/backlog.md` | P0/P1/P2 任務清單 |
| 工程規格 | `specs/<domain>/*.md` | 改行為前必讀對應 spec |
| 文件分類規則 | `specs/_taxonomy.md` | 繼承全域 taxonomy + 本專案補充 |
| 每日進度 | MEMORY 內 `daily_log.md` | 跨對話讀取,不在專案根 |

## 依任務加讀(動手前必須先讀完相關 spec,不可憑記憶改)
| 任務類型 | 必讀檔案 |
|---------|---------|
| 任何 block 視覺/文案(主)| `docs/banner-studio-full-copy-and-spec.md` **+ `docs/banner-studio-demo-v10-final.html`(必對照)** |
| Token / globals.css / Tailwind 設計 | spec §60-220 + `docs/banner-studio-demo-v10-final.html` 行 11-168(token 定義 + .btn 系列) |
| Block 04 Scroll-Pinned Story | `docs/scroll-pinned-story-spec.md` + `docs/banner-studio-demo-v10-final.html` |
| Block 08.5 Scale Showcase | `specs/blocks/scale-showcase.md`(Z 軸 JS / 6 metric / 9 踩雷) |
| Block 09 Final CTA + 表單 + Webhook | `specs/blocks/final-cta-form.md` |
| Block 10 FAQ Accordion | `specs/blocks/faq-accordion.md` |
| RWD / mobile 行為 | `specs/rwd-responsive.md` |
| 全站底層 A11y / SEO / States / Performance / Analytics | `specs/site-foundations.md` |

## ⚠️ 視覺實作硬規則(R1 教訓)
- **任何 block / token / 樣式實作前,必須對照 `docs/banner-studio-demo-v10-final.html`** 的對應 CSS 和 HTML 結構
- spec 是文字描述 + 範例,demo 是視覺真相 — 兩者衝突時以 **demo 為準**(它是已經視覺通過的版本)
- 寫完每個 block / 樣式區塊後 grep demo HTML 對應 class 名,逐項驗證 padding / font-weight / transition / hover state
- 違反這條會發生 v11.2 假升版同類型錯誤(看 changelog 但沒看實作)

## 工作模式
- 照 spec 不發揮,有疑問問,卡 30 分鐘停下來
- 中文回應
- 做完一個 block 就 commit + push,commit message 寫清楚做了什麼

## 技術規則
- Lenis / GSAP **桌機才載入**(用 `dynamic import`)
- Testimonials hover 用 `matchMedia('(hover: hover)')` 偵測,**mobile 不執行**
- Block 08.5 Z 軸 reveal 在 mobile **降級為 translateY + fade**(不算 perspective)
- 圖片用 `next/image`,字型用 `next/font`(自託管,不直接 link Google Fonts)
- 大標題(h1/h2)**不加標點**,內文用全形「,」「。」(非半形)
  - **規則範圍**:只管「網站視覺呈現的文案」(JSX / content / spec 文案)
  - 治理文件(本檔 / README / SYSTEM-MANUAL / backlog / roadmap 等)不強制,半形可

## 白話規則(對應全域 CLAUDE.md 最高硬規則)
- AI 對 Kay(非工程師)說話**第一次出現的英文 / 術語**必須加括號白話解釋
- 不確定查 [`docs/reference/glossary.md`](docs/reference/glossary.md)(80+ 詞對照表)
- Kay 反問「這是什麼 / 不懂 / 太複雜」→ 立刻白話補

## Mobile 優先檢查
- **每個 block 寫完當下** chrome devtools 切 375x667 確認(不要等到最後)
- 觸控目標 ≥ 44 × 44px
- form input 字級 ≥ 16px(iOS 防自動 zoom)、min-height ≥ 48px

## 部署時程
- **D3 一日衝刺:4/26(週日,明天)** — 主結構 11 個 block 全出來
- **4/27-28** — polish + 真機測試 + 蒐圖
- **4/29(週三)Vercel 上線 + 發業務 Chat** ← 交件日(原訂 5/1 提前,因 5/1 連假)
- **4/30** — hotfix buffer,留一天修上線後問題
- 5/1 連假
- env vars: `CHAT_WEBHOOK` + `SHEETS_WEBHOOK_URL`(Vercel dashboard 設)
- Production URL 拿到後 Kay 真機測試 + Lighthouse(Mobile Performance ≥ 85, A11y ≥ 95)

## 容錯規則
- API 雙 webhook(Chat + Sheet)用 `Promise.allSettled`,**單一失敗仍可成功**
- 表單 **loading / error / success** 三種 state 都要有(不可只做 happy path)
- `prefers-reduced-motion: reduce` 必須支援(GSAP hover、Z 軸 reveal、scroll-linked counter 全跳過)

## 驗證定義
- /verify = `pnpm build` 通過 + chrome devtools 切 375x667 跑首頁互動 + Lighthouse 跑一次
- /review 重點看:HR(去標點/全形)+ token 使用一致 + RWD 三段式 + A11y 必備項

## 改完必做
| 檢查項 | 方法 |
|--------|------|
| 文案/變數零殘留 | grep 全專案,舊版 v9 / v10 文案不可殘留 |
| Build 通過 | `pnpm build` |
| Mobile 375x667 跑過 | chrome devtools |
| Lighthouse | Vercel preview URL 跑 |

## 禁止事項
- **不發揮、不擅自加 spec 沒寫的功能** ← 本專案最高硬規
- 不刪現有功能,除非明確要求
- 不加不必要的依賴套件(已定 6 個,不再加)
- 改流程邏輯前沒讀 spec 一律退回
- 不 hardcode 機密資訊(CHAT_WEBHOOK 等用 env)

---

@~/.claude/docs/project-file-taxonomy.md
