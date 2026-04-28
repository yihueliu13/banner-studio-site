// Hero marquee banner 資料(純資料,不依賴 React)
// SSOT: layout.tsx 用 banners[0].img 做 LCP preload,Hero.tsx 渲染 marquee
// 改順序 / 換圖時只動這一份,兩處自動同步

export type Banner = { text: string; img: string };

// ⚠️ text 為 D-7 換正式產品圖時依檔名暫補的中性文案,Kay 確認視覺後依露天實際 banner 文案調整
export const banners: Banner[] = [
  {
    text: "ACG 鋼彈模型",
    img: "/images/hero/banner-acg-gundam-01.webp",
  },
  {
    text: "TCG 卡牌專區",
    img: "/images/hero/banner-tcg-pull-02.webp",
  },
  {
    text: "廚房家電節",
    img: "/images/hero/banner-kitchen-appliance-03.webp",
  },
  {
    text: "漫畫收藏特輯",
    img: "/images/hero/banner-manga-collection-04.webp",
  },
  {
    text: "日本直送代購",
    img: "/images/hero/banner-japan-import-05.webp",
  },
  {
    text: "寵物生活用品",
    img: "/images/hero/banner-pet-life-06.webp",
  },
  {
    text: "居家煥新季",
    img: "/images/hero/banner-home-makeover-07.webp",
  },
  {
    text: "二手書專區",
    img: "/images/hero/banner-usedbook-08.webp",
  },
];
