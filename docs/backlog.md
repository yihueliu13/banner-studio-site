---
role: backlog
status: active
last_updated: 2026-04-25
---

# banner-studio-site Backlog

> 單一真相來源。新項目從這裡加、改、歸檔。
> 用 `/backlog` 快速檢視。

## 🔴 P0(本週必做 / D3 衝刺)

| 狀態 | 項目 | 建立 | 備註 |
|------|------|------|------|
| ⬜ | `create-next-app` 建 app/ + 設 Tailwind | 2026-04-25 | D3 早上 |
| ⬜ | 寫 design tokens 到 Tailwind config(色、字、shadow、radius、spacing)| 2026-04-25 | 對應主 spec §全站基本設定 |
| ⬜ | Block 01-03(Nav / Hero / Stats)| 2026-04-25 | D3 上午 |
| ⬜ | Block 04 Scroll-Pinned Story | 2026-04-25 | D4 一整天預算,卡 30min 退 Level B |
| ⬜ | Block 05 + Block 07-08 | 2026-04-25 | D5 |
| ⬜ | Block 08.5 Scale Showcase Z 軸 reveal | 2026-04-25 | mobile 必須降級 |
| ⬜ | Block 09 Final CTA + 雙 webhook API route | 2026-04-25 | Promise.allSettled |
| ⬜ | Block 10 + 11 + lightbox + 全站 reveal | 2026-04-25 | D6 |
| ⬜ | Vercel 部署 + env vars | 2026-04-25 | M2 |
| ⬜ | Apps Script 部署 Sheet webhook | 2026-04-25 | M2 |
| ⬜ | Mobile 真機 + Lighthouse | 2026-04-25 | M2 |

## 🟡 P1(交件後 polish)

| 狀態 | 項目 | 建立 | 備註 |
|------|------|------|------|
| ⬜ | OG image 生成(用 Banner Agent 吃自己狗糧)| 2026-04-25 | D7 polish |
| ⬜ | Favicon SVG 設計 | 2026-04-25 | D7 polish |
| ⬜ | Mobile 漢堡選單 | 2026-04-25 | D3-D6 階段直接隱藏 menu items |
| ⬜ | Block 04 Level A 完整版(若衝刺退到 Level B) | 2026-04-25 | 看 D3 完成度 |

## 📱 Mobile RWD 統一 Polish(D3 末 / D5)— Kay 拍板策略

⚠️ **D3 衝刺策略**:每個 block 寫完只做「最小可行 mobile 降級」(避免爆版),**不堅持 polish**。所有 block 主結構出完後**統一收尾**。

- [ ] **Hero**:小螢幕 marquee 高度 + CTA 垂直堆疊微調
- [ ] **Stats**:3 個數字 mobile 字級可能太大,需 clamp 縮小
- [ ] **Story**:tablet sidebar 橫向 sticky 視覺、mobile 卡片 layout-split fallback 細節
- [ ] **Feature Grid + Lightbox**:tablet 2 欄 / mobile 1 欄、lightbox modal 全螢幕 + 大 close button
- [ ] **Manifesto**:mobile h2 clamp 縮放確認、底圖漸層在小螢幕對比是否夠暗
- [ ] **Testimonials**:GSAP hover 在 mobile 不執行(matchMedia 偵測)
- [ ] **Scale Showcase**:mobile 完全降級為 translateY + fade(spec 規定)
- [ ] **Final CTA + 表單**:mobile 95% 寬 / small 100% / 表單欄位 ≥48px / 字級 ≥16px(iOS 防 zoom)
- [ ] **FAQ Accordion**:button row ≥56px(觸控)
- [ ] **Footer**:三欄改單欄
- [ ] **iPhone SE 375x667 真機沒橫向 scroll**
- [ ] **iPhone 14 Pro 390x844 各 block 直排正常**

統一收尾的 trigger:**所有 block 主結構出完(B/C/D 階段全收)** 後一次跑 Mobile QA Checklist(對齊 spec §RWD Mobile QA Checklist)。

## D5 / D7 Design Token Polish(A-2 留下的尾巴)

- [ ] **D5**:補 OKLCH @supports 實際使用場景
  - 候選 1:Final CTA 卡片 active state glow
  - 候選 2:Feature card is-selected state
  - 不要用 testimonial-card hover(違反 v9.9「純 transform 不動 background」)

- [ ] **D7**:tailwind.config.ts colors / fontFamily 改用 var() 吃 globals.css
  - 現況:colors 跟 :root vars 雙來源,未來改 token 要兩邊同步
  - 改法:`brand: { DEFAULT: "var(--brand)" }` 統一從 globals.css 讀
  - D3 衝刺不動,風險大於效益

## 🟢 P2(評估 / 之後再說)

| 狀態 | 項目 | 建立 | 備註 |
|------|------|------|------|
| ⬜ | A/B 測試表單轉換率 | 2026-04-25 | 等資料夠 |
| ⬜ | Vercel Analytics 報表整理(考績用)| 2026-04-25 | 上線後一個月 |

## ⚪ 舊待辦(低優先 / 延後)

| 狀態 | 項目 | 建立 | 備註 |
|------|------|------|------|
| ⬜ | — | — | — |

## 🔁 持續規則(永久循環,不會完成)

- 每寫完一個 block 切 mobile 375x667 測一次,不要等到最後
- prefers-reduced-motion 永遠加進新動畫
- 新 webhook / API route 用 Promise.allSettled 容錯

---

## ✅ 已完成歸檔

| 項目 | 完成 | Commit | 備註 |
|------|------|--------|------|
| Spec v11.1 完成 + Block 04 深挖 + v10 demo | 2026-04-25 | — | 進 M1 前置 |
| 專案骨架(setup-project)| 2026-04-25 | (待補) | CLAUDE.md / SYSTEM-MANUAL / docs / specs |
| D-2 Block 09 Final CTA + 表單 + Webhook stub | 2026-04-26 | (待補) | 4 欄表單 + setTimeout 800ms stub,D6 接 `/api/apply` |
| D-3 Block 10 FAQ Accordion | 2026-04-26 | (待補) | 3 Q&A + 單開模式 + + → × 旋轉 + max-height transition + A11y |
| D-4 Block 11 Footer | 2026-04-26 | (待補) | 滿版黑底 + 3 欄(Brand/快速連結/找 Kay)+ 橘 pill「需申請」 |
| D-5 wave 1 Mobile RWD Polish | 2026-04-26 | b70f828 | Scale counter mobile 卡 0 / Stats 字級 / Features h2 三項;375x667 + 390x844 雙 viewport 無 overflow |
