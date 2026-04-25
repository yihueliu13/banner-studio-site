---
role: roadmap
status: active
last_updated: 2026-04-25
---

# banner-studio-site Roadmap

> 大階段 milestone。細碎待辦在 [`backlog.md`](backlog.md)。

## 🟡 M1｜D3 一日衝刺(主結構)

**目標**:Next.js 14 專案建好 + 11 個 block 全部出來(視覺 80% 對齊主 spec、Block 04 + 08.5 互動 70%)。

**狀態**:🟡 進行中

**預計完成**:2026-04-26(週日)

**依賴**:無

**交付清單**
- [ ] `create-next-app` 建 app/ + Tailwind 設定
- [ ] color tokens / typography tokens 寫進 globals.css(Tailwind config)
- [ ] Block 01 Top Nav(scroll 變白底 + blur)
- [ ] Block 02 Hero(兩行標題去標點 + marquee + CTA)
- [ ] Block 03 Stats Strip(3 個 counter)
- [ ] Block 04 Scroll-Pinned Story(Level B 起跳,Lenis 點擊滑中心)
- [ ] Block 05 Feature Grid + Lightbox
- [ ] Block 07 Manifesto
- [ ] Block 08 Data Testimonials(GSAP hover 桌機)
- [ ] Block 08.5 Scale Showcase(Z 軸 reveal,mobile 降級)
- [ ] Block 10 FAQ Accordion
- [ ] Block 09 Final CTA + 表單(雙 webhook API route)
- [ ] Block 11 Footer

---

## 🟡 M2｜Polish + 真機測試(4/27-28)

**目標**:視覺對齊主 spec 95%、Mobile / Lighthouse 達標、蒐圖完成。

**狀態**:⚪ 未開始

**預計完成**:2026-04-28(週二)

**依賴**:M1 完成

**交付清單**
- [ ] iPhone 14 Pro / iPhone SE / iPad 真機測試(主 spec Mobile QA Checklist)
- [ ] Lighthouse 跑 preview URL,Mobile Performance ≥ 85、A11y ≥ 95
- [ ] OG image 生(用 Banner Agent 吃自己狗糧)+ favicon
- [ ] robots.txt: Disallow
- [ ] 蒐圖完成(若 D3 未蒐齊)

---

## 🟡 M3｜上線交件(4/29 週三)

**目標**:Vercel production 上線 + 發業務 Chat 廣播。

**狀態**:⚪ 未開始

**預計完成**:2026-04-29(週三)

**依賴**:M2 完成

**交付清單**
- [ ] Vercel 連 GitHub repo + 設 env vars(CHAT_WEBHOOK, SHEETS_WEBHOOK_URL)
- [ ] Google Apps Script 部署 Sheet webhook
- [ ] Production URL 拿到 + 連 production 跑一次申請流程確認雙 webhook 通
- [ ] Google Chat 群組廣播給業務團隊

---

## ⚪ M4｜Hotfix Buffer(4/30 週四)

**目標**:留一天修上線後業務反映的問題。5/1 連假。

**狀態**:⚪ 未開始

**預計完成**:2026-04-30(週四)

**依賴**:M3 完成

**交付清單**
- [ ] 蒐集業務當天回饋
- [ ] 緊急 bug 修(若有)
- [ ] 連假前留乾淨的 production

---

## ✅ 已完成 milestone

| Milestone | 完成日 | 摘要 |
|-----------|--------|------|
| M0 Spec 完成 | 2026-04-25 | v11.1 主 spec、Block 04 深挖、v10 視覺 reference 全部 ready |
