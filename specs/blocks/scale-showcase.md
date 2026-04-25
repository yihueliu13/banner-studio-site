---
role: spec
version: 1.0
status: active
last_updated: 2026-04-25
extends: ../../docs/banner-studio-full-copy-and-spec.md
description: Block 08.5 Scale Showcase 完整規格(Z 軸 scroll-linked depth reveal + counter 同步 + 9 踩雷)
---

# Block 08.5 — Scale Showcase

> 從主 spec v11.3 拆出(2026-04-25)。原章節留 stub `@specs/blocks/scale-showcase.md`。

## Container
- 1080px container,`padding: 160px 0; background: white`
- **關鍵**:父層加 `perspective: 1500px; perspective-origin: 50% 50%`(給子元素 3D 透視)
- `overflow: hidden`(避免 Z 軸 reveal 時內容溢出)

## Layout
- 2 欄 grid:`grid-template-columns: 1fr 1.4fr; gap: 120px`
- 左:scale-intro(標題 + 描述)
- 右:scale-numbers(6 個 metric,2×3 grid,`gap: 80px 64px`)
- 兩層 grid 都加 `transform-style: preserve-3d`(讓 Z 軸傳遞)

## Copy

**Intro 區(左欄):**
- H2: `真實規模<br>真實數字`(兩行)
- P: `Banner Studio 背後是完整的 Banner Agent 系統 — 由一個設計師和 Claude Code 用 SDD 流程打造,達到接近大廠內部工具的治理密度。`

**6 個 Metric(右欄,2×3):**

| # | 數值 | 單位 | 顏色 | 箭頭 | Label |
|---|------|------|------|------|-------|
| 1 | `3` (counter from 0) | `min` | accent-orange | ↘ down | `平均產製時間`<br>`從 4 小時 → 3 分鐘` |
| 2 | `72` (counter from 0) | `%` | accent-blue | ↗ up | `一次通過率`<br>`PRD 目標 60%,實測 72%` |
| 3 | `16` (counter from 0) | `K+` | accent-orange | ↘ down | `Python 主 Code 行數`<br>`41 個檔案` |
| 4 | `14` (counter from 0) | `K+` | accent-blue | ↗ up | `文件總行數`<br>`60 個 Markdown 檔` |
| 5 | `1:1`(**靜態,不 counter**) | — | accent-orange | ↘ down | `Code : 文件 密度`<br>`一般專案為 10:1` |
| 6 | `$0.04` (prefix `$0.0` + counter `4`) | — | accent-blue | ↗ up | `單筆 banner 成本`<br>`每 100 張約台幣 120 元` |

> **箭頭語意**:↘ down 表示「指標降低 = 好事」(時間少、code 行數低);↗ up 表示「指標提升 = 好事」(通過率高、文件多)。
> ↘ 用橘色 `var(--brand)`,↗ 用藍色 `#3B5FD6`。

## Typography
- intro h2: `clamp(40px, 5vw, 56px)`,weight 600,letter-spacing -0.025em
- metric value: `clamp(72px, 8vw, 104px)`,weight 500,`font-variant-numeric: tabular-nums`
- unit 用漸層色(從黑到 brand color),`-webkit-background-clip: text`

## CSS(從 demo 抽,重點)
```css
.scale-showcase {
  padding: 160px 0;
  background: white;
  perspective: 1500px;            /* ⭐ 關鍵 */
  perspective-origin: 50% 50%;
  overflow: hidden;
}
.scale-layout {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 120px;
  transform-style: preserve-3d;
  align-items: start;
}
.scale-numbers {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px 64px;
  transform-style: preserve-3d;
}
.scale-metric {
  display: flex; flex-direction: column;
  transform-style: preserve-3d;
  will-change: transform, opacity, filter;
  /* 起始狀態(JS 載入前 fallback) */
  transform: translateZ(-1000px) scale(0.3);
  opacity: 0;
  filter: blur(24px);
}
.scale-metric-value {
  font-size: clamp(72px, 8vw, 104px);
  font-weight: 500;
  letter-spacing: -0.04em;
  line-height: 1;
  font-variant-numeric: tabular-nums;
  margin-bottom: 24px;
}
.scale-metric-value.accent-orange .unit {
  background: linear-gradient(135deg, var(--text-primary) 40%, var(--brand) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.scale-metric-value.accent-blue .unit {
  background: linear-gradient(135deg, var(--text-primary) 40%, #3B5FD6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.scale-metric-arrow.down { color: var(--brand); }
.scale-metric-arrow.up   { color: #3B5FD6; }
```

## Z 軸 depth reveal JS(核心邏輯,**完整貼**)

```javascript
const scaleMetrics = document.querySelectorAll('.scale-metric');
const isMobile = window.matchMedia('(max-width: 768px)').matches;

const updateScaleMetricsDepth = () => {
  const windowHeight = window.innerHeight;

  scaleMetrics.forEach((metric, index) => {
    const rect = metric.getBoundingClientRect();

    // progress 算法:
    // - 元素頂部還在視窗下方 = 0(看不到)
    // - 元素頂部到達視窗底部 95% 處 = 進場開始
    // - 元素頂部到達視窗 25% 處 = 進場完成 = 1
    const triggerStart = windowHeight * 0.95;
    const triggerEnd = windowHeight * 0.25;
    const range = triggerStart - triggerEnd;

    // stagger: 每個元素延後 0.08 進度開始
    const staggerOffset = index * 0.08;

    let progress = (triggerStart - rect.top) / range;
    progress = progress - staggerOffset;
    progress = Math.max(0, Math.min(1, progress));

    // ease-out-expo(尾段慢,更戲劇性)
    const eased = progress === 0 ? 0 : 1 - Math.pow(2, -10 * progress);

    // 4 個視覺屬性的當前值
    const z = -1500 + (1500 * eased);
    const scale = 0.2 + (0.8 * eased);
    const blur = 30 - (30 * eased);
    const opacity = eased;

    if (isMobile) {
      // ⭐ Mobile 降級:translateY + fade,不做 3D
      const translateY = 60 - (60 * eased);
      metric.style.transform = `translateY(${translateY}px)`;
      metric.style.opacity = opacity;
      metric.style.filter = 'none';
    } else {
      metric.style.transform = `translateZ(${z}px) scale(${scale})`;
      metric.style.opacity = opacity;
      metric.style.filter = `blur(${blur}px)`;
    }

    // ⭐ Counter 同步:用同一個 eased progress 驅動數字
    const counter = metric.querySelector('.counter-num');
    if (counter) {
      const target = parseFloat(counter.dataset.target);
      const decimals = parseInt(counter.dataset.decimals || '0');
      const current = target * eased;
      counter.textContent = current.toFixed(decimals);
    }
  });
};

// RAF 節流的 scroll handler
let scaleMetricsRafPending = false;
const onScrollUpdateScale = () => {
  if (!scaleMetricsRafPending) {
    scaleMetricsRafPending = true;
    requestAnimationFrame(() => {
      updateScaleMetricsDepth();
      scaleMetricsRafPending = false;
    });
  }
};

// 同時綁 Lenis scroll 和原生 scroll(雙保險)
lenis.on('scroll', onScrollUpdateScale);
window.addEventListener('scroll', onScrollUpdateScale, { passive: true });

// 初始 + resize
updateScaleMetricsDepth();
window.addEventListener('resize', updateScaleMetricsDepth);
```

## 9 個踩雷清單 ⚠️

1. **父層必須有 `perspective`**:忘了寫,translateZ 完全沒效果
2. **每層 grid 都要 `transform-style: preserve-3d`**:少一層 Z 軸就被攤平
3. **Counter 必須跟 Z 軸用同一個 `eased` progress**:分開算會不同步,數字跑得比視覺快
4. **Stagger offset 不要太大**:超過 0.15 後面的 metric 在進場完成前就過視窗了
5. **Mobile 必須降級為 translateY**:3D + blur 在 mobile Safari 會掉 frame
6. **`will-change` 只給有動畫的屬性**:寫 `will-change: all` 會記憶體爆炸
7. **`tabular-nums` 必須加**:counter 動的時候數字寬度會跳,UI 會抖
8. **第 5、6 個 metric 是特例**:5 是純文字 `1:1` 不要用 counter;6 是 `$0.04` 用 prefix + counter(target=4, decimals=0)
9. **同時綁 Lenis 和 window scroll**:只綁 Lenis,某些 trackpad 慣性會漏 frame;雙保險才順

## Mobile 降級
```css
@media (max-width: 768px) {
  .scale-showcase { perspective: none; }
}
@media (max-width: 900px) {
  .scale-layout { grid-template-columns: 1fr; gap: 64px; }
  .scale-numbers { gap: 48px 32px; }
}
```
JS 端用 `isMobile` 旗標切換到 translateY + fade。

詳細 RWD 規格見 `@specs/rwd-responsive.md` Block 08.5 段。
