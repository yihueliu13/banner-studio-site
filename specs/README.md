# Specs

設計決策與技術規格。**給工程師和 Claude 看**,改程式碼前的唯一真相來源。

## 結構

```
specs/
├─ _taxonomy.md        # 文件分類規則(繼承全域 + 本專案補充)
├─ governance/         # 工作流程(暫無)
└─ <domain-N>/         # 待 D3 開工後依需要長出
```

## 主 spec 例外

`docs/banner-studio-full-copy-and-spec.md` 雖然是 spec 性質,但因為**同時是視覺 reference + 文案稿**,人類也常開來看,所以保留在 `docs/`,不搬到 `specs/`。

詳見 [`_taxonomy.md`](_taxonomy.md)。

## `_taxonomy.md` 是什麼

文件分類規則,繼承全域 `~/.claude/docs/project-file-taxonomy.md`,並補充本專案特有 domain 定義。

每次新增檔案前,AI 會查 `_taxonomy.md` 判斷該放哪。**不要繞過**。

## 適合放什麼

- ✅ API contract / route 規格 → `<domain>/`
- ✅ 表單驗證規則 → `<domain>/`
- ✅ 配置流程(新增 X 的標準步驟)→ `governance/`
- ✅ 測試計畫 → `governance/test-cases.md`

## 不適合放什麼

- ❌ 主 spec 視覺/文案 → 已在 `docs/banner-studio-full-copy-and-spec.md`
- ❌ 使用者教學 → 放 `docs/reference/`
- ❌ 變更紀錄 → 放 `docs/changelog/`
- ❌ 產品目標 / 需求 → 放 `docs/prd.md`

## 規則

- 改行為前先改 spec,再改程式碼
- spec 是單一真相來源,不要在 MEMORY 或別處重複寫設計細節
- 檔名用 kebab-case
- 每個 spec 檔案開頭加 frontmatter(role / version / status / last_updated)

詳細規則見 `~/.claude/docs/project-file-taxonomy.md`。
