---
role: spec
version: 1.0
status: active
last_updated: 2026-04-25
extends: ../../docs/banner-studio-full-copy-and-spec.md
description: Block 09 Final CTA + 表單 + 雙 webhook 資料持久化架構(Chat + Sheet + Apps Script + Next.js API route)
---

# Block 09 — Final CTA + 表單

> 從主 spec v11.3 拆出(2026-04-25)。原章節留 stub `@specs/blocks/final-cta-form.md`。

## 卡片底色:露天橘 ⭐ v9.10

```css
.final-cta-card {
  width: 90%;
  margin: 0 auto;
  padding: 96px 96px;
  background: var(--brand);              /* 露天橘 */
  color: var(--text-primary);            /* 黑字 */
  border-radius: 32px;
  position: relative;
  overflow: hidden;
}
.final-cta-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 80% 30%, rgba(255, 255, 255, 0.08) 0%, transparent 60%);
  pointer-events: none;
}
```

## 卡片內所有文字:黑色 ⭐ v9.11

```css
.final-cta-intro h2 { color: var(--text-primary); }
.final-cta-subtitle { color: rgba(28, 25, 23, 0.75); }
.final-cta-points li { color: var(--text-primary); }
.final-cta-points li::before { color: var(--text-primary); }   /* ✓ 黑色 */
.form-label { color: var(--text-primary); }
.form-label .required { color: var(--text-primary); }
.form-meta { color: rgba(28, 25, 23, 0.6); }
.form-success-icon { background: rgba(28, 25, 23, 0.1); color: var(--text-primary); }
.form-success p { color: rgba(28, 25, 23, 0.7); }
```

## 表單欄位:#33343B 無框 ⭐ v9.10

```css
.form-input {
  background: #33343B;
  border: none;             /* ⭐ 無邊框 */
  border-radius: 12px;
  padding: 14px 16px;
  font-size: 15px;
  color: white;
  outline: none;
  transition: all 300ms var(--ease-out-expo);
}
.form-input::placeholder { color: rgba(255,255,255,0.4); }
.form-input:hover { background: #3A3B43; }
.form-input:focus {
  background: #3D3E47;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.15);
}
```

## 送出按鈕:白底黑字、寬度 50% ⭐ v9.10

```css
.form-submit-row {
  align-items: flex-start;   /* 按鈕靠左 */
}
.form-submit {
  background: white;
  color: var(--text-primary);
  width: 50%;                /* ⭐ 寬度減半 */
  padding: 16px 32px;
  border: none;
  border-radius: 9999px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  animation: pulse 3s var(--ease-out-expo) infinite;
}
.form-submit:hover {
  background: #F5F5F4;
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15);
}
/* Mobile 回 100% */
@media (max-width: 640px) {
  .form-submit { width: 100%; }
}

/* Pulse 改白色光環 (因為按鈕是白底) */
@keyframes pulse {
  0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.5); }
  50% { transform: scale(1.04); box-shadow: 0 0 0 16px rgba(255, 255, 255, 0); }
}
```

## Form-meta 文案
```
申請 24 小時內開通 · 有問題 Google Chat 找 Kay
```

---

## 🗄️ 資料持久化架構 ⭐ v11.0

### 雙 Webhook 設計

```
業務填表 → POST /api/apply → ① Google Chat webhook(即時通知 Kay)
                          → ② Google Sheet webhook(累積申請紀錄)
                          → 回傳 success
```

### 為什麼兩個都要

- **Chat 通知**:Kay 立刻知道有人申請,可以馬上加進 Notion DB
- **Sheet 紀錄**:所有申請累積,可以看「總申請數」「部門分佈」,**考績佐證直接撈這個**

### Google Sheet 結構

Sheet 欄位:
```
A: Timestamp        (自動填)
B: 姓名
C: 部門
D: Email
E: Notion ID         ← Notion workspace 帳號 email(如 kay@ruten.com.tw),不是 user UUID
F: 處理狀態         (Kay 手動標,預設留空)
```

### Google Apps Script Webhook

Sheet → Extensions → Apps Script,貼:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.name || '',
    data.dept || '',
    data.email || '',
    data.notion || '',
    ''  // 處理狀態,預設空
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

Deploy → New deployment → **Web app** → Execute as: Me / Who has access: **Anyone** → 拿到 URL,設成 Vercel env var `SHEETS_WEBHOOK_URL`。

### Next.js API Route(`app/api/apply/route.ts`)

```typescript
export async function POST(req: Request) {
  const data = await req.json();

  // 簡單 email 格式驗證
  if (!data.email?.includes('@')) {
    return Response.json({ error: 'Invalid email' }, { status: 400 });
  }

  // 並行送兩個 webhook
  const [chatRes, sheetRes] = await Promise.allSettled([
    // ① Google Chat 通知
    fetch(process.env.CHAT_WEBHOOK!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cardsV2: [{
          card: {
            header: { title: '🎨 Banner Studio 新申請' },
            sections: [{
              widgets: [
                { decoratedText: { topLabel: '姓名', text: data.name } },
                { decoratedText: { topLabel: '部門', text: data.dept } },
                { decoratedText: { topLabel: 'Email', text: data.email } },
                { decoratedText: { topLabel: 'Notion ID', text: data.notion } },
              ]
            }]
          }
        }]
      }),
    }),
    // ② Google Sheet 累積
    fetch(process.env.SHEETS_WEBHOOK_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),
  ]);

  // 容錯:就算 Sheet 失敗,Chat 通知到了也算成功
  if (chatRes.status === 'rejected' && sheetRes.status === 'rejected') {
    return Response.json({ error: 'Both webhooks failed' }, { status: 500 });
  }

  return Response.json({ success: true });
}
```

### Vercel Env Vars(部署時設)

```
CHAT_WEBHOOK=https://chat.googleapis.com/v1/spaces/.../messages?key=...
SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/.../exec
```

### Kay 的後續工作流

收到 Chat 通知 → 開 Sheet 看細節 → 手動加進 Notion DB(`bef2ca4469914de1b5cf5610043132db`)→ 在 Sheet F 欄標「已開通」

詳細表單 states(Loading / Error / Success)見 `@specs/site-foundations.md` States 段。
詳細 RWD 規格見 `@specs/rwd-responsive.md` Block 09 段。
