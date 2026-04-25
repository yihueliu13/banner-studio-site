---
role: prd
version: 0.1
status: draft
last_updated: 2026-04-25
---

# banner-studio-site PRD

> 主 PRD:產品需求 + 子 spec 目錄入口
>
> 詳細視覺 / 文案 / RWD spec 在 `docs/banner-studio-full-copy-and-spec.md`(v11.1)

## 1. 目標

露天內部 AI Banner 產線介紹站,業務團隊申請使用。

**為誰做?**
露天業務團隊(Sales),需要產 banner 但不會設計、沒時間排期。

**解決什麼問題?**
- 過去 banner 要排設計師的隊、4 小時起跳
- 業務不會 Photoshop / Figma、沒時間自己生圖
- Banner Agent(姊妹專案)已經做完,但業務不知道、沒入口申請

**成功指標**
- 上線一週內 ≥ 10 筆申請
- 申請 → 開通流程 ≤ 24 小時
- Lighthouse Mobile Performance ≥ 85、A11y ≥ 95

## 2. 範圍

**包含**
- 一頁式 marketing site(11 個 block,順序見主 spec)
- 申請表單(姓名 / 部門 / Email / Notion ID)
- 雙 webhook(Chat 通知 + Sheet 累積)
- RWD(Desktop / Tablet / Mobile 三段式)
- A11y、SEO、Analytics 埋點

**不包含**(刻意排除)
- 不做後台管理介面(Kay 直接看 Sheet 即可)
- 不做使用者登入(內部信任)
- 不做多語系(只有繁中)
- 不做 SEO 公開索引(內部站 robots: noindex)

## 3. 子 spec 目錄

```
- §視覺/文案/RWD/A11y/SEO/Analytics → @banner-studio-full-copy-and-spec.md (v11.1 主 spec)
- §Block 04 Scroll-Pinned Story 深挖 → @scroll-pinned-story-spec.md
- §視覺 reference HTML            → @banner-studio-demo-v10-final.html
- §D3 開工 prompt                 → @claude-code-day1-prompt.md
```

## 4. Roadmap

詳見 [`roadmap.md`](roadmap.md)。

## 5. 待辦

詳見 [`backlog.md`](backlog.md)。

## 6. 變更紀錄

| 日期 | 版本 | 變更 |
|------|------|------|
| 2026-04-25 | 0.1 | 初版骨架,連結到既有主 spec |
