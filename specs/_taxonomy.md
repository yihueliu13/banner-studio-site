---
role: taxonomy
version: 1.0
status: active
last_updated: 2026-04-25
extends: ~/.claude/docs/project-file-taxonomy.md
---

# banner-studio-site 文件分類規則

## 繼承全域規則

@~/.claude/docs/project-file-taxonomy.md

> 全域 taxonomy 已涵蓋:4 維度分類 / 檔案對照表 / 版本號 / frontmatter / hooks vs rules / git 備份 / 寫檔宣告協議 / setup-project 觸發。

## 本專案特有 domain

| Domain | 用途 | 路徑 | 範例檔 |
|--------|------|------|--------|
| (待補) | (D3 開工後依需要長出,目前主 spec 集中在 docs/) | `specs/<domain>/` | — |

## 本專案特有規則

- **主 spec 例外**:`docs/banner-studio-full-copy-and-spec.md` 是 v11.1 既有檔案,**放在 docs/ 而非 specs/**(因為它同時是視覺 reference + spec,人類也常開來看)。改它不需要搬到 specs/。
- 未來若拆出獨立的工程規格(例如 API contract、表單驗證規則),才在 `specs/<domain>/` 建檔。

## 變更紀錄

| 日期 | 版本 | 變更 |
|------|------|------|
| 2026-04-25 | 1.0 | 初版(繼承全域 v1.0)+ 主 spec 例外註記 |
