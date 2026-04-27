# Hero marquee 圖片

## 用途

Hero 區塊的 marquee 跑馬燈，桌機顯示在標題右側兩列直向滾動。

## 數量

**8 張** banner 圖（對應每個促銷情境）。

## 對應檔案

替換 `app/data/hero-banners.ts` 內 `banners` 陣列的 `img` 欄位。

## 命名建議

```
banner-1-spring-women.jpg
banner-2-mothers-day.jpg
banner-3-new-arrival.jpg
banner-4-anniversary.jpg
banner-5-flash-sale.jpg
banner-6-new-arrival-en.jpg
banner-7-limited-offer.jpg
banner-8-brand-day.jpg
```

或短一點：`banner-1.webp` ~ `banner-8.webp`。

## 規格要求

| 項目 | 標準 |
|------|------|
| 尺寸 | 600 × 400px（marquee 顯示尺寸即可，不要太大）|
| 格式 | **WebP 優先**，退求 JPEG |
| 大小 | 每張 < 100 KB（Hero 是首屏，第一張 LCP 候選要更小最好 < 50 KB）|
| 比例 | 3:2（正方矩形）|

## 程式怎麼引用

JSX 用**絕對路徑**（從網站 root 算）：

```ts
// app/data/hero-banners.ts
export const banners: Banner[] = [
  { text: "春季女裝 85 折", img: "/images/hero/banner-1.webp" },
  { text: "母親節滿千折百", img: "/images/hero/banner-2.webp" },
  // ...
];
```

注意路徑開頭是 `/images/...` **不是** `/public/images/...`（Next.js 把 public/ 當網站 root）。

## LCP 提醒

`banners[0]`（第一張）會被 `app/app/layout.tsx` 用 `<link rel="preload">` 標為 LCP 候選圖。
**第一張選最有代表性的 banner，並壓得最小（< 50 KB）**，影響 Lighthouse Performance 分數。
