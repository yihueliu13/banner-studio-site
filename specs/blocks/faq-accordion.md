---
role: spec
version: 1.0
status: active
last_updated: 2026-04-25
extends: ../../docs/banner-studio-full-copy-and-spec.md
description: Block 10 FAQ Accordion 完整規格(3 Q&A + HTML/CSS/JS + A11y + 動畫)
---

# Block 10 — FAQ Accordion

> 從主 spec v11.3 拆出(2026-04-25)。原章節留 stub `@specs/blocks/faq-accordion.md`。

## 為什麼移到 Final CTA 之前
v10.0 順序變更:**先解疑慮,再讓人填表單**。FAQ 在 Block 09 之前,讓使用者填申請前最後一波疑慮被處理掉。

## Container
- 768px container(**比其他 block 窄**,閱讀體驗最佳)
- `padding: 128px 0`

## Copy

**Section header:**
- Eyebrow: `常見問題`
- Title: **`關於 Banner Studio`**

**3 個 Q&A:**

| # | Q | A |
|---|---|---|
| 1 | `AI 產出真的符合需求嗎?` | `不保證每次都完美。每個階段都有 3 組候選和重做機制。實測 72% 一次過、剩下 28% 微調文案或重跑底圖。` |
| 2 | `會有額度限制嗎?` | `技術上沒有額度限制。每 100 張 banner 的 AI API 成本大約台幣 120 元。`<br><br>`但如果你一天產 1000 張只是為了測試玩樂,Kay 會來找你喝茶 ☕` |
| 3 | `設計師會不會討厭我用這個?` | `不會。這工具處理的是「尺寸對齊、文字排版、對比度檢查、多版型產出」這些設計師本來就不想重複做的事。` |

> Q2 答案有換行(`\n\n`),CSS 用 `white-space: pre-line` 才會渲染出來。

## HTML 結構
```html
<section class="faq" id="faq">
  <div class="container">
    <div class="section-header reveal">
      <div class="eyebrow" style="margin-bottom:16px;">常見問題</div>
      <h2>關於 Banner Studio</h2>
    </div>
    <div class="faq-list">
      <div class="faq-item">
        <button class="faq-question">
          <h3>AI 產出真的符合需求嗎?</h3>
          <span class="faq-icon">+</span>
        </button>
        <div class="faq-answer">
          <p class="faq-answer-inner">不保證每次都完美。每個階段都有 3 組候選和重做機制。實測 72% 一次過、剩下 28% 微調文案或重跑底圖。</p>
        </div>
      </div>
      <!-- 重複 2 次 -->
    </div>
  </div>
</section>
```

## CSS(從 demo 抽)
```css
.faq { padding: 128px 0; }
.faq-list { max-width: 768px; margin: 0 auto; }
.faq-item { border-bottom: 1px solid var(--border-subtle); }
.faq-question {
  width: 100%;
  background: none; border: none;
  padding: 24px 0;
  display: flex; justify-content: space-between; align-items: center;
  cursor: pointer; text-align: left;
}
.faq-question h3 {
  font-size: 20px; font-weight: 600;
  color: var(--text-primary);
  transition: color 300ms var(--ease-out-expo);
}
.faq-item:hover .faq-question h3 { color: var(--brand); }
.faq-icon {
  font-size: 32px;
  color: var(--brand);
  transition: transform 500ms var(--ease-out-expo);
  flex-shrink: 0;
  margin-left: 24px;
  line-height: 1;
}
.faq-item.open .faq-icon { transform: rotate(45deg); }   /* + 旋轉成 × */
.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 600ms var(--ease-out-expo);
}
.faq-item.open .faq-answer { max-height: 500px; }
.faq-answer-inner {
  padding: 0 0 24px;
  color: var(--text-secondary);
  line-height: 1.7;
  white-space: pre-line;        /* ⭐ 讓 Q2 的 \n\n 換行生效 */
}
```

## JS(accordion 行為,**單開模式**)
```javascript
document.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.faq-question').addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    // 先全關(單開模式)
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});
```

## A11y
- `<button class="faq-question">` 用 `<button>` 不是 `<div>`(鍵盤可聚焦、Enter 可觸發)
- 加 `aria-expanded="false"`,open 時改成 `true`(JS 同步切換)
- `aria-controls="faq-answer-{id}"` 指向對應的 answer div
- focus 狀態:`outline: 2px solid var(--brand); outline-offset: 4px`
- icon `+` 加 `aria-hidden="true"`(純視覺)

## 動畫
- `+` icon 旋轉 45° 變成 `×`:`transform: rotate(45deg)`,500ms `ease-out-expo`
- max-height 0 → 500px,600ms `ease-out-expo`
- hover 時 h3 變橘色(300ms)

詳細 RWD 規格見 `@specs/rwd-responsive.md` Block 10 段。
