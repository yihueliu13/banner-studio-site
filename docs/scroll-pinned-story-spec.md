# Block 04: Scroll-Pinned Story — 深挖 Spec

**Version**: v7 (chckn 正確結構版)
**參考**: https://chckn.app/?ref=minimal.gallery#home-reward
**難度**: ⭐⭐⭐⭐⭐ (D4 一整天預算)

---

## 🎯 核心結構（chckn 正確版）

**⚠️ 重要澄清**：這不是「sticky 一張圖+文字切換」，而是：
- **Sidebar 在左上 sticky**（固定不動，跟隨 section）
- **右側 5 張卡片垂直排列**（每張獨立卡片，有自己的圖 + 文字）
- **滾動時卡片自然往上滑出、下一張進入**
- **點擊 sidebar 任一項**，對應卡片滑到**視窗垂直中心**

---

## 📐 版面

### Container
- max-width: **1080px**
- padding: 0 24px
- Section padding: 160px 0

### Grid
```css
.story-main {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 80px;
  align-items: start;
}
```

### Header (置中, margin-bottom 120px)
```
<h2>5 個步驟,3 分鐘。</h2>
<p>你只要填需求和點「確認」。AI 和 Cloud Function 做剩下的事。</p>
```
- h2: clamp(40px, 5vw, 56px) weight 600
- p: 20px line-height 1.5 color muted

---

## 📍 Sidebar（左上 sticky）

### Position
```css
.story-sidebar {
  position: sticky;
  top: 120px;              /* ⚠️ 不是 top:50% 也不是中央 */
  display: flex;
  flex-direction: column;
  gap: 20px;
}
```

### Items
5 個 button, 分別對應 5 個 Step:
1. 填需求
2. 產文案
3. 產底圖
4. 自動組裝
5. 下載使用

### Styling
```css
.story-nav-item {
  font-size: 22px;
  font-weight: 500;
  letter-spacing: -0.015em;
  color: #D6D3D1;          /* 預設淡灰 */
  text-align: left;
  cursor: pointer;
  transition: color 500ms var(--ease-out-expo);
}
.story-nav-item.active {
  color: #1C1917;           /* 當前項目變深色 */
}
.story-nav-item:hover:not(.active) {
  color: #78716C;
}
```

---

## 🎴 右側卡片

### Container
```css
.story-cards {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
```

### 卡片基底
```css
.story-card {
  background: #EEEDE8;      /* 淺灰 */
  border-radius: 32px;
  padding: 40px;
  overflow: hidden;
}
```

### ⚠️ 混合佈局：stack 與 split 交錯

**分配規則**：
- Step 1, 3, 5 → `layout-stack`（文字在上、圖在下滿版）
- Step 2, 4 → `layout-split`（左文字 + 右圖）

這讓頁面有視覺節奏變化，大小交錯，不無聊。

### Variant A: layout-stack
```css
.story-card.layout-stack {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.story-card.layout-stack .story-card-content {
  max-width: 580px;        /* 文字不要太寬好讀 */
}
.story-card.layout-stack .story-card-image {
  width: 100%;
  aspect-ratio: 16 / 9;    /* 寬版橫圖 */
  border-radius: 24px;
}
```

### Variant B: layout-split
```css
.story-card.layout-split {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 40px;
  align-items: center;
}
.story-card.layout-split .story-card-image {
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 20px;
}
```

### 卡片內文字
```css
.story-card-title {
  font-size: 24px;
  font-weight: 600;
  letter-spacing: -0.015em;
  margin-bottom: 16px;
  line-height: 1.25;
}
.story-card-body {
  font-size: 16px;
  line-height: 1.65;
  color: #57534E;
}
```

### 卡片圖片
```css
.story-card-image {
  overflow: hidden;
  background: #F5F5F4;
  display: block;
  position: relative;
}
.story-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
```

---

## 🎬 動態行為（三個關鍵動作）

### 動作 1: 卡片進入視窗 → 圖 slide-in
**觸發**：IntersectionObserver, threshold 0.2, rootMargin `'0px 0px -100px 0px'`

**動畫**：
```css
.story-card-image {
  transform: translateY(60px);
  opacity: 0;
  transition: transform 1200ms var(--ease-out-expo),
              opacity 900ms var(--ease-out-expo);
}
.story-card.is-visible .story-card-image {
  transform: translateY(0);
  opacity: 1;
}

.story-card-content {
  transform: translateY(30px);
  opacity: 0;
  transition: transform 1000ms var(--ease-out-expo) 200ms,
              opacity 800ms var(--ease-out-expo) 200ms;
}
.story-card.is-visible .story-card-content {
  transform: translateY(0);
  opacity: 1;
}
```

**邏輯**：
```js
const cardVisibleObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    }
  });
}, {
  threshold: 0.2,
  rootMargin: '0px 0px -100px 0px'
});
storyCards.forEach(card => cardVisibleObserver.observe(card));
```

**效果**：每張卡片進入視窗時，圖先從下方 60px slide 上來，文字 150ms 後淡入。

---

### 動作 2: Sidebar 高亮跟隨當前卡片
**觸發**：IntersectionObserver, rootMargin `'-40% 0px -40% 0px'`

**邏輯**：
```js
const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const step = parseInt(entry.target.dataset.step);
      navItems.forEach((item, i) => {
        item.classList.toggle('active', i === step);
      });
    }
  });
}, {
  rootMargin: '-40% 0px -40% 0px',
  threshold: 0
});
storyCards.forEach(card => activeObserver.observe(card));
```

**原理**：
- rootMargin `-40% top -40% bottom` 創造一條視窗中央「40% 到 60%」的偵測帶
- 當某張卡片進入這條帶，觸發 intersect
- 該卡片對應的 sidebar item 變 active

---

### 動作 3: 點擊 Sidebar → 卡片滑到視窗垂直中心 ⭐
**這是最關鍵的互動**。

**公式**：
```js
const offset = -((windowHeight - cardHeight) / 2);
```

**解釋**：
- `windowHeight - cardHeight` 是卡片置中時上下應該各有的留白總和
- 除以 2 得到單邊留白
- 負號表示從卡片頂部往上偏移這麼多像素（因為 Lenis scrollTo 的 offset 是「從 target 頂部往上多少」）

**完整實作**：
```js
navItems.forEach((item, i) => {
  item.addEventListener('click', () => {
    const card = storyCards[i];
    const cardHeight = card.offsetHeight;
    const windowHeight = window.innerHeight;
    const offset = -((windowHeight - cardHeight) / 2);
    lenis.scrollTo(card, { offset: offset });
  });
});
```

**Lenis 參數**：
- 預設 duration 1.4s
- 預設 easing: `(t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))`

**效果**：
- 點擊「產底圖」→ 第 3 張卡片**平滑滑到視窗正中央**
- 原本在畫面的卡片往上移出、新卡片從下方進入定位
- 1.4 秒緩入

---

## 🛠 React 實作建議（Next.js）

### Component 結構
```
components/Story/
├── index.tsx          # ScrollPinnedStory (container + logic)
├── Sidebar.tsx        # 5 個 nav button
├── Card.tsx           # 單張卡片 (stack/split 用同一個 component)
└── types.ts           # Step 資料型別
```

### Hook
```ts
// hooks/useScrollToCenter.ts
import { useLenisContext } from './useLenis';

export function useScrollToCenter() {
  const lenis = useLenisContext();
  return (element: HTMLElement) => {
    if (!lenis) return;
    const cardHeight = element.offsetHeight;
    const windowHeight = window.innerHeight;
    const offset = -((windowHeight - cardHeight) / 2);
    lenis.scrollTo(element, { offset });
  };
}
```

### State 管理
```ts
const [activeStep, setActiveStep] = useState(0);
const cardRefs = useRef<(HTMLElement | null)[]>([]);
```

### 資料 (content/story.ts)
```ts
export type StoryStep = {
  id: number;
  navLabel: string;        // sidebar 顯示
  title: string;           // 卡片標題
  body: string;            // 卡片內文
  image: string;           // 圖 URL
  imageAlt: string;
  layout: 'stack' | 'split';
};

export const storySteps: StoryStep[] = [
  {
    id: 0,
    navLabel: '填需求',
    title: '在 Notion 填 5 個欄位',
    body: '活動名稱、促銷重點、目標受眾、語氣風格、版型。其他欄位都可以讓 AI 自己決定。',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1400&h=800&fit=crop',
    imageAlt: '在 Notion 填表',
    layout: 'stack',
  },
  // ...以下 4 個
];
```

---

## ⚠️ 9 個容易踩的雷

1. **Sidebar top 值不能是 `50%`** — 那會放在視窗中央，chckn 是左上 `120px`
2. **卡片要各自獨立，不是 sticky 一張圖切換** — 前 3 版我就錯在這
3. **點擊滑動必須用 Lenis**，不能用 `scrollIntoView()` — 後者沒有 smooth 控制
4. **offset 要即時計算**，不能寫死 — 不同卡片高度不同
5. **IntersectionObserver rootMargin `-40% 0px -40% 0px` 不能改** — 數值改了 sidebar 高亮時機會錯
6. **卡片進場動畫只做一次**，不要來回滑就重放 — 用 `classList.add` 不要 toggle
7. **圖的 aspect-ratio 在 container 上**，不是 img — img 吃 `width: 100%; height: 100%; object-fit: cover`
8. **layout-stack 和 layout-split 用同一個 component**，靠 prop 切換，不要寫兩個 component
9. **Lenis 和 React 18 `<StrictMode>` 會打架** — 記得在 `useEffect` cleanup 時 `lenis.destroy()`

---

## 🎯 三段降級方案（如果時間不夠）

### Level A：完整版（D4 目標）
- ✅ 全部三個動作都實作
- ✅ Lenis smooth scroll
- ✅ 點擊滑中心
- ✅ 混合佈局 stack/split

### Level B：降級（D4 卡住用這版）
- ✅ sidebar + 5 卡片基本結構
- ✅ 卡片進入視窗 slide-in
- ✅ sidebar 高亮
- ❌ 點擊不做 smooth scroll，直接 `element.scrollIntoView({ behavior: 'smooth', block: 'center' })`

### Level C：極簡（D4 放棄用這版，D5 再回來）
- ✅ 5 張卡片垂直排列
- ✅ 有 sidebar 但不 sticky (當成一般 nav)
- ❌ 沒有任何動畫
- ❌ 點擊就 `#anchor` 錨點跳轉

---

## ✅ D4 驗收標準

打開瀏覽器，Section 應該：

1. 滾動到「5 個步驟, 3 分鐘」→ sidebar 卡在左上
2. 繼續往下滾 → 每張卡片進場時圖從下方滑上來
3. Sidebar 當前項自動變黑、其他淡灰
4. **點 sidebar 任一項** → 對應卡片滑到視窗正中央
5. 卡片是**淺灰色塊包圖和文字**，不是純圖
6. Step 1/3/5 是文字在上、圖在下；Step 2/4 是左右並排

---

**建議 D4 workflow**：
1. 早上：做 Level C 骨架（2 小時）
2. 中午：加 slide-in 動畫 + sidebar 高亮（2 小時）
3. 下午：接 Lenis 做點擊滑中心（3 小時）
4. 傍晚：polish + 手機版響應（1 小時）
5. **卡 30 分鐘解不了 → 退到 Level B 提交**
