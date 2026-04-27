// Hero marquee banner 資料(純資料,不依賴 React)
// SSOT: layout.tsx 用 banners[0].img 做 LCP preload,Hero.tsx 渲染 marquee
// 改順序 / 換圖時只動這一份,兩處自動同步

export type Banner = { text: string; img: string };

export const banners: Banner[] = [
  {
    text: "春季女裝 85 折",
    img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=400&fit=crop",
  },
  {
    text: "母親節滿千折百",
    img: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&h=400&fit=crop",
  },
  {
    text: "新品上市獨家預購",
    img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
  },
  {
    text: "週年慶會員專屬",
    img: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=600&h=400&fit=crop",
  },
  {
    text: "Flash Sale",
    img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&h=400&fit=crop",
  },
  {
    text: "New Arrival",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=400&fit=crop",
  },
  {
    text: "Limited Offer",
    img: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&h=400&fit=crop",
  },
  {
    text: "Brand Day",
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=400&fit=crop",
  },
];
