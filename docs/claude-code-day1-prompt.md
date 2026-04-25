# Banner Studio — 啟動 Prompt (v11.2 短版)

> 給有 Claude Code 經驗的人。一個啟動 prompt + 應急 prompt + 部署 checklist,沒了。

---

## 🟢 啟動 Prompt(複製整段)

```
你好。我是 Kay。今天從 0 部署一個露天內部介紹站「Banner Studio」。

讀 docs/ 三個檔案(主 spec、Block 04 深挖、HTML 視覺 reference),
讀完直接告訴我「ok 我掌握了」就好,不用列確認清單浪費時間。

技術棧:Next.js 14 + TS + Tailwind + Lenis + Framer Motion + GSAP + Vercel Analytics
規則:照 spec 不發揮,有疑問問我,卡 30 分鐘停下來,中文回應

開始。
```

---

## 📂 docs/ 該有的 4 個檔案

```
~/Desktop/banner-studio-site/docs/
├── banner-studio-full-copy-and-spec.md      ← 主 spec v11.1
├── scroll-pinned-story-spec.md              ← Block 04 深挖
├── claude-code-day1-prompt.md               ← 本檔
└── banner-studio-demo-v10-final.html         ← 視覺 reference (用瀏覽器打開對照)
```

⚠️ HTML 檔很重要:Claude Code 會讀文字 spec,但 **視覺細節(間距、動畫節奏、配色)還是看 HTML 最準**。叫它在開工前用 `open docs/banner-studio-demo-v10-final.html` 在瀏覽器打開對照。

---

## 🚨 應急 Prompt(卡關時複製)

### 撞牆
```
卡 [X] 分鐘了,error 是 [貼]。
給我 3 個方案:
A. 完整解 + 預估時間
B. 降級方案 + 失去什麼
C. workaround + 後遺症
```

### 做歪
```
停下來。
你剛做的 [X] 不對,問題是 [Y]。
對照 spec 第 [Z] 段重做,不要自己發揮。
```

### 對照不到
```
這個地方 spec 沒寫清楚,
打開 docs/banner-studio-demo-v10-final.html 看 [block 名稱],
那邊的 [視覺/間距/動畫] 是 source of truth。
```

### 我臨改
```
停一下,改想法:[新需求]。
不要動,先告訴我影響範圍。
```

### 加速
```
還能完整做嗎? 還是直接降級? 你判斷後告訴我選擇。
```

---

## 🚀 部署 Checklist

### 開工前 30 分鐘準備

- [ ] 4 個檔案放進 `~/Desktop/banner-studio-site/docs/`
- [ ] `gh repo create yihueliu13/banner-studio-site --public --source=. --remote=origin`
- [ ] Vercel 帳號連 GitHub,可 import

### Google Sheet DB 建置(15 分鐘)

1. 新建 Google Sheet,命名「Banner Studio 申請紀錄」
2. 第一列填欄位:`Timestamp / 姓名 / 部門 / Email / Notion ID / 處理狀態`
3. Extensions → Apps Script
4. 貼這段 code:
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
       ''
     ]);
     return ContentService
       .createTextOutput(JSON.stringify({ success: true }))
       .setMimeType(ContentService.MimeType.JSON);
   }
   ```
5. Deploy → New deployment → Web app
   - Execute as: **Me**
   - Who has access: **Anyone**
6. 第一次 deploy 會跳授權,點允許
7. 拿到 webhook URL(`https://script.google.com/macros/s/.../exec`)
8. curl 測一下:
   ```bash
   curl -X POST [URL] -H "Content-Type: application/json" \
     -d '{"name":"test","dept":"test","email":"test@test.com","notion":"test"}'
   ```
   Sheet 應該多一行

### Google Chat Webhook(複用 Banner Agent)

從 Banner Agent 的 `.env` 直接複製 `CHAT_WEBHOOK`,不用重設。

### Vercel 部署

1. Vercel → Import Project → 選 banner-studio-site repo
2. Framework Preset: Next.js(自動偵測)
3. Environment Variables:
   ```
   CHAT_WEBHOOK = (從 Banner Agent .env 抄)
   SHEETS_WEBHOOK_URL = (剛拿到的 Apps Script URL)
   ```
4. Deploy → 等 ~3 分鐘
5. 拿到 production URL

### 真機測試

- [ ] iPhone 開 production URL,滑完整站
- [ ] 試填表單送出
- [ ] Google Chat 收到通知 ✓
- [ ] Google Sheet 多一行 ✓
- [ ] Lighthouse Mobile 跑一次,90+

---

## 🔗 業務發布訊息範本(部署後)

```
Hi 各位,

露天內部 Banner 自動產線「Banner Studio」介紹站上線了 🎉

URL: https://banner-studio-site.vercel.app

平均 3 分鐘產出一張 banner、72% 一次通過率、單筆成本 $0.04 USD。
覺得有需要的同事,直接到網站底部填申請表,
24 小時內我會把你加進 Notion 和 Chat 群組。

有問題 Google Chat 找 Kay。

— Kay (UIUX Team)
```

---

## ✅ 上線後

每天看 Sheet,有新申請就:
1. 開 Notion DB 加新人
2. 加進 Chat 群組
3. 在 Sheet F 欄標「已開通」

考績前匯出 Sheet 給主管看「申請數量 / 部門分佈 / 開通率」。

🎯 Go.
