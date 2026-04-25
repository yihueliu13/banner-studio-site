# Docs

人類文件目錄。**給非技術人員和新成員看**。

## 結構

| 檔案 / 資料夾 | 用途 |
|--------------|------|
| `banner-studio-full-copy-and-spec.md` | **主 spec v11.1**(視覺/文案/RWD/A11y/SEO/Analytics 全在這)|
| `scroll-pinned-story-spec.md` | Block 04 Scroll-Pinned Story 深挖 |
| `banner-studio-demo-v10-final.html` | v10 視覺 reference(瀏覽器開來看)|
| `claude-code-day1-prompt.md` | D3 一日衝刺開工 prompt |
| `prd.md` | 產品需求(目錄入口)|
| `roadmap.md` | 大階段 milestone |
| `backlog.md` | 細碎待辦 P0/P1/P2 |
| `changelog/` | 版本歷史 |
| `reference/` | 視覺卡、手冊 |

## 適合放什麼

- ✅ Setup guide / 上手教學 → `reference/`
- ✅ 架構圖 HTML / 圖片 → `reference/`
- ✅ QA 報告、使用手冊 → `reference/`
- ✅ 部署紀錄、版本變更 → `changelog/YYYY-MM-DD-<事件>.md`

## 不適合放什麼

- ❌ 設計決策 → 放 `specs/`
- ❌ 程式碼註解 → 寫在程式碼裡
- ❌ Claude 的行為規則 → 放 `CLAUDE.md`
- ❌ 每日進度 → 放 MEMORY 的 `daily_log.md`

## PRD vs spec vs design 差別

| 類型 | 回答什麼 | 受眾 |
|------|---------|------|
| **PRD** (`docs/prd.md`) | 這是什麼產品?解決什麼問題?| 產品 / Kay |
| **Spec** (`specs/<domain>/*` + `docs/banner-studio-full-copy-and-spec.md`) | 具體怎麼運作?邊界是什麼?| 工程 / Claude |
| **Reference** (`docs/reference/*`) | 怎麼用?視覺長怎樣?| 設計 / 使用者 |

詳細規則見 `~/.claude/docs/project-file-taxonomy.md`。
