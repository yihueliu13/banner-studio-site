# Features Grid + Lightbox 圖片

## 用途

Features 區塊（Block 05）的圖片版功能展示。
- **小圖（thumb）**：grid 卡片內的縮圖
- **大圖（fullImg）**：點開 lightbox modal 後顯示

## 數量

**7 個 feature 卡片**，每個 feature 各有 1 張 thumb + 1 張 fullImg = **共 ~14 張**。
（少數 feature 可能 thumb + fullImg 用同一張，依 Features.tsx 陣列實際定義為準）

## 對應檔案

替換 `app/components/Features.tsx` 內 `features` 陣列的 `thumb` 跟 `fullImg` 欄位。

## 命名建議

```
style-grid-thumb.webp        # 小圖
style-grid-full.webp         # 大圖
pc-mobile-thumb.webp
pc-mobile-full.webp
copy-candidate-thumb.webp
copy-candidate-full.webp
wcag-contrast-thumb.webp
wcag-contrast-full.webp
manual-upload-thumb.webp
manual-upload-full.webp
chat-notify-thumb.webp
chat-notify-full.webp
```

或編號版：`feature-1-thumb.webp` / `feature-1-full.webp`...

## 規格要求

| 用途 | 尺寸 | 大小 |
|------|------|------|
| thumb（小圖）| 553 × 316 或 553 × 415 | < 80 KB |
| fullImg（大圖，lightbox）| 1200 × 750 或 1400 × 800 | < 200 KB |

| 項目 | 標準 |
|------|------|
| 格式 | **WebP 優先** |
| thumb 比例 | 對齊 spec / globals.css feature-image 區塊（不要 stretch）|
| fullImg 比例 | 對齊 spec lightbox 規格 |

## 程式怎麼引用

```ts
// app/components/Features.tsx
const features = [
  {
    title: "12 種視覺風格",
    shortBody: "...",
    fullBody: "...",
    thumb: "/images/features/style-grid-thumb.webp",
    fullImg: "/images/features/style-grid-full.webp",
  },
  // ...
];
```
