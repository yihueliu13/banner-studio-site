# Story 步驟圖片

## 用途

Block 04 Scroll-Pinned Story（5 個步驟講「Banner 怎麼做出來」）的步驟示意圖。

## 數量

**5 張** step 圖，每個步驟各 1 張。

## 對應步驟（依 Story.tsx 順序）

| Step | 內容 | 建議圖示意 |
|------|------|----------|
| 1 | 在 Notion 填 5 個欄位 | Notion 表單畫面 / 填表動作 |
| 2 | 30-60 秒產出 2 組候選文案 | AI 生成文案的截圖 / 候選清單 |
| 3 | 12 種風格 14 種主體 自由組合 | 風格 / 主體選單 grid |
| 4 | 自動組裝 + WCAG 檢查 | 組裝中的 banner / 對比度檢查 |
| 5 | Google Chat 通知 Drive 下載 | Chat 卡片通知 / Drive 連結 |

## 對應檔案

替換 `app/components/Story.tsx` 內 `steps` 陣列的 `image` 欄位。

## 命名建議

```
step-1-notion-form.webp
step-2-ai-copy.webp
step-3-style-subject.webp
step-4-assemble-wcag.webp
step-5-chat-drive.webp
```

## 規格要求

| 項目 | 標準 |
|------|------|
| 尺寸 | 1400 × 800（廣角）或 1000 × 750（接近 4:3）|
| 格式 | **WebP 優先** |
| 大小 | 每張 < 150 KB |

## 程式怎麼引用

```ts
// app/components/Story.tsx
const steps = [
  {
    navLabel: "填需求",
    cardTitle: "...",
    image: "/images/story/step-1-notion-form.webp",
  },
  // ...
];
```
