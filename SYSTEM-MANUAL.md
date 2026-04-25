---
role: system-manual
status: active
last_updated: 2026-04-25
---

# banner-studio-site · 系統總覽

> 給新成員 / 非技術人員快速理解這個專案在做什麼、怎麼運作、文件放哪。

## 一句話
露天內部 AI Banner 產線介紹站,業務團隊申請使用。

## 產出是什麼
一個一頁式 marketing site,讓露天業務團隊看到 Banner Agent 能做什麼、實測數據,然後**填表申請使用**。表單送出後同時推 Google Chat 通知 Kay + 寫 Google Sheet 累積紀錄。

## 技術棧
Next.js 14 (App Router) + TypeScript + Tailwind CSS + Lenis (smooth scroll) + Framer Motion + GSAP + Vercel Analytics + Speed Insights

部署:Vercel,2026-04-29(週三)上線。

## 檔案結構

```
banner-studio-site/
├─ CLAUDE.md               # Claude 治理規則(AI 入口)
├─ SYSTEM-MANUAL.md        # 本檔:系統總覽(人類入口)
├─ README.md               # GitHub 門面
├─ .env.example            # 環境變數範例
├─ .gitignore
│
├─ .claude/                # Claude Code 工具設定
│  ├─ settings.json
│  └─ skills/              # 專案專屬 skill(暫無)
│
├─ docs/                   # 人類文件 + 既有 spec
│  ├─ banner-studio-full-copy-and-spec.md   # 主 spec v11.1(單一真相)
│  ├─ scroll-pinned-story-spec.md           # Block 04 深挖
│  ├─ banner-studio-demo-v10-final.html     # v10 視覺 reference
│  ├─ claude-code-day1-prompt.md            # D3 衝刺 prompt
│  ├─ prd.md
│  ├─ roadmap.md
│  ├─ backlog.md
│  ├─ changelog/
│  └─ reference/
│
├─ specs/                  # 工程規格(待長出)
│  ├─ _taxonomy.md
│  └─ governance/
│
├─ app/                    # Next.js App Router(create-next-app 後建)
└─ public/                 # 靜態資源
```

> daily_log 不在專案內,統一在 MEMORY(跨專案管理)。

## 真相來源(哪裡改什麼)

| 要改什麼 | 改哪 | 為什麼 |
|---------|------|-------|
| 文案、視覺規格、RWD | `docs/banner-studio-full-copy-and-spec.md` | 主 spec v11.1 |
| Block 04 互動細節 | `docs/scroll-pinned-story-spec.md` | 深挖 spec |
| 視覺對照 | `docs/banner-studio-demo-v10-final.html` | 在瀏覽器開來看 |
| 產品目標 | `docs/prd.md` | 產品視角單一入口 |
| 大階段目標 | `docs/roadmap.md` | milestone 規劃 |
| 細碎待辦 | `docs/backlog.md` | 日常任務追蹤 |
| Claude 行為 | `CLAUDE.md` | 治理規則、啟動協議 |
| 文件分類規則 | `specs/_taxonomy.md` | 繼承全域 + 本專案補充 |

## 怎麼跑起來

```bash
# 安裝(實作層建立後)
pnpm install

# 開發
pnpm dev          # http://localhost:3000

# 生產 build
pnpm build
pnpm start

# 環境變數
cp .env.example .env.local
# 填入 CHAT_WEBHOOK 和 SHEETS_WEBHOOK_URL
```

## 設計決策摘要

- **為什麼一頁式**:內部站給業務看,動線越短越好,直接卷到底就能申請
- **為什麼用 Lenis + GSAP**:做出 chckn.app 等級的卷軸體感(Block 04 + 08.5 都吃這個)
- **為什麼桌機才載 Lenis/GSAP**:iOS 慣性會跟 Lenis 打架 + 行動裝置 GPU 算 3D transform 易卡
- **為什麼雙 webhook(Chat + Sheet)**:Chat 即時通知 Kay,Sheet 累積考績佐證
- **為什麼 Production noindex**:內部站,不要被 Google 索引

## 相關文件
- [`CLAUDE.md`](CLAUDE.md) — Claude 治理
- [`docs/banner-studio-full-copy-and-spec.md`](docs/banner-studio-full-copy-and-spec.md) — 主 spec
- [`docs/prd.md`](docs/prd.md) — PRD
- [`docs/roadmap.md`](docs/roadmap.md) — Roadmap
- [`specs/`](specs/) — 工程規格
