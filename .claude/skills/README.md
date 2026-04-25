# Project Skills

專案專屬的 skill。全域 skill 放 `~/.claude/skills/`,這裡放只在本專案用的。

## 建立 skill

每個 skill 是一個資料夾,內含 `SKILL.md`,frontmatter 格式:

```yaml
---
name: skill-name
description: 簡短描述
user_invocable: true
---
```

## 何時放這邊 vs 全域

| 範圍 | 位置 | 例子 |
|------|------|------|
| **專案專屬** | `<專案>/.claude/skills/` | `/deploy-banner-studio` |
| **跨專案通用** | `~/.claude/skills/` | `/commit`、`/daily`、`/setup-project` |

判斷口訣:**「在 Banner Agent / Ruten DS 裡也要用嗎?要 → 全域 / 不要 → 專案」**

詳細規則見 `~/.claude/docs/project-file-taxonomy.md` §5(Hooks vs Rules)邏輯類似。
