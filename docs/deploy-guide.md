---
role: runbook
version: 1.0
status: active
last_updated: 2026-04-26
description: Kay 的 Banner Studio 部署 SOP — Apps Script + Google Chat webhook + Vercel 一條龍照做
---

# Banner Studio 部署 SOP

> **這份是給你照著做的 step-by-step,不是工程師文件。每一步預估時間 + 看到什麼算對 + 卡住怎麼救。**

## 0. 一張圖看完全流程

```
你要做的順序:
  ① Apps Script 部署 Sheet webhook(拿一條 URL)
        ↓
  ② Google Chat 開 webhook(拿另一條 URL)
        ↓
  ③ 把這 2 條 URL 設到 Vercel 環境變數
        ↓
  ④ Vercel 連 GitHub repo → 自動 deploy → 拿 production URL
        ↓
  ⑤ 開 production URL 自己填表單測試
        ↓
  ⑥ Lighthouse 跑分(我來)
```

**全部時間預估:1.5-2 小時**(順利的話,卡關會多)

**順利會看到**:你 Google Chat 收到「🎨 Banner Studio 新申請」卡片 + Sheet 多一筆紀錄。

---

## ① Apps Script 部署 Sheet webhook(預估 20 分鐘)

> **目標**:拿到一條像 `https://script.google.com/macros/s/XXXXX/exec` 的 URL,複製貼到記事本。

### Step 1.1 開 Google Sheet
1. 打開 https://sheets.new(直接開新試算表)
2. 改名:「Banner Studio 申請紀錄」
3. **第 1 列加標題**(逐欄打):
   - A1: `submittedAt`
   - B1: `name`
   - C1: `dept`
   - D1: `email`
   - E1: `notion`
   - F1: `status`(這欄之後你手動標「已開通」)

### Step 1.2 開 Apps Script
1. Sheet 上方選單:**擴充功能 → Apps Script**
2. 會跳新分頁,自動帶一個 `Code.gs`
3. **把預設的 `function myFunction()` 全選刪掉**
4. 貼上下面這段(直接整段複製):

```javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    sheet.appendRow([
      data.submittedAt || new Date().toISOString(),
      data.name || '',
      data.dept || '',
      data.email || '',
      data.notion || '',
      ''  // status 欄位空白,你之後手動填「已開通」
    ]);
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

5. **儲存**(Cmd+S 或左上角磁碟片 icon),會問專案名,打「Banner Studio Webhook」

### Step 1.3 部署成 Web App
1. 右上「**部署 → 新增部署**」
2. 左邊齒輪選「**網頁應用程式**」(Web app)
3. 填:
   - 說明:`v1`
   - 執行身分:**我**(your email)
   - 誰可以存取:**任何人**(必選,Vercel 才能呼叫)
4. **部署**
5. 第一次會跳「請授權」→ 點「審查權限」→ 選你的 Google 帳號 → 跳警告(因為是自寫 script)→ 點「**進階 → 前往 Banner Studio Webhook(不安全)**」→ 允許
6. 完成後會看到一條 URL,**長這樣**:
   ```
   https://script.google.com/macros/s/AKfycby......./exec
   ```
7. **複製整條 URL**,貼到記事本標「**SHEETS_WEBHOOK_URL**」

### Step 1.4 自己測一下(很重要)
打 Mac Terminal 跑:
```bash
curl -X POST "你剛剛複製的 URL" \
  -H "Content-Type: application/json" \
  -d '{"submittedAt":"2026-04-26","name":"測試","dept":"行銷","email":"test@x.com","notion":"test"}'
```

**看到什麼算對**:
- Terminal 印出 `{"success":true}`
- 開 Sheet,第 2 列多一筆「測試 / 行銷 / test@x.com / test」

⚠️ **卡住怎麼救**:
- 印出 `Authorization required` → Step 1.3 第 5 步權限沒給對,重來
- 印出 HTML 一大堆 → 沒部署成 Web app 或「誰可以存取」沒選「任何人」

---

## ② Google Chat webhook(預估 10 分鐘)

> **目標**:拿到一條像 `https://chat.googleapis.com/v1/spaces/.../messages?key=...&token=...` 的 URL。

### Step 2.1 建一個只有你的 Chat 群組
1. Google Chat → 新增聊天空間 → 建立空間
2. 名字:「Banner Studio 申請通知」
3. 只加自己一個人就好

### Step 2.2 加 Webhook
1. 空間名稱旁邊下拉箭頭 → **Apps 與整合**
2. **新增 Webhook**
3. 填:
   - 名稱:`Banner Studio`
   - 頭像 URL:留空 OK
4. **儲存**
5. 跳出一條 URL,**複製整條**,貼到記事本標「**CHAT_WEBHOOK**」

### Step 2.3 自己測一下
Terminal 跑:
```bash
curl -X POST "你剛剛複製的 URL" \
  -H "Content-Type: application/json" \
  -d '{"text":"測試 Banner Studio webhook"}'
```

**看到什麼算對**:
- Chat 群組裡跳出「測試 Banner Studio webhook」訊息

⚠️ **卡住怎麼救**:
- 401/403 → URL 複製錯,重去 Apps 與整合複製
- 沒收到訊息但 Terminal 沒 error → 看群組通知設定

---

## ③ Vercel 部署(預估 25 分鐘)

> **目標**:拿到一條 production URL,例如 `banner-studio-site.vercel.app`。

### Step 3.1 註冊 / 登入 Vercel
1. https://vercel.com → Sign Up(用 GitHub 帳號登入,跟你 push code 同一個)
2. 第一次會問選 Plan,選**Hobby (Free)**
3. 進 dashboard

### Step 3.2 Import GitHub repo
1. 右上「**Add New → Project**」
2. 找 `yihueliu13/banner-studio-site`(沒看到的話授權 GitHub repo 給 Vercel)
3. **Import**

### Step 3.3 設定 Project
1. **Framework Preset**:Vercel 應該自動偵測「Next.js」(會出現黑色三角 icon),不用改
2. **Root Directory**:點「Edit」 → 改成 `app`(因為我們的 Next.js 在 app/ 子資料夾)
3. **Build Command**:留 default(`next build`)
4. **Output Directory**:留 default(`.next`)
5. **Install Command**:確認是 `pnpm install`(不是 npm)
   - 不對的話點 Edit 改成 `pnpm install`

### Step 3.4 加環境變數(最關鍵這步)
1. 滑到下面「**Environment Variables**」
2. 加 2 個:
   - **Key**: `CHAT_WEBHOOK`
   - **Value**: 貼步驟 ② 拿的 URL
   - 環境:**Production / Preview / Development** 全勾
   - 點 Add
3. 再加:
   - **Key**: `SHEETS_WEBHOOK_URL`
   - **Value**: 貼步驟 ① 拿的 URL
   - 環境全勾
   - 點 Add
4. 確認 Variables 列表有 2 條

### Step 3.5 Deploy
1. 點底部 **Deploy** 按鈕
2. 等 1-3 分鐘(會看到 build log)
3. 看到 🎉 confetti + production URL 就成功

**看到什麼算對**:
- URL 長這樣:`https://banner-studio-site.vercel.app` 或 `banner-studio-site-yihueliu13.vercel.app`
- 點開能看到網站(11 個 block 都在)

⚠️ **卡住怎麼救**:
- Build failed → 看 log 截圖傳給我
- Deploy 成功但網站只有「404」 → Root Directory 沒設 `app`,去 Settings 改

---

## ④ 真實測試(預估 10 分鐘)

> **目標**:確認從表單送出 → Chat 通知 + Sheet 紀錄 一條龍通。

### Step 4.1 用桌機測
1. 開 Vercel production URL
2. 滑到底「下一個 banner / 3 分鐘搞定」橘卡片
3. 填:
   - 姓名:`測試 Kay`
   - 部門:`UIUX`
   - Email:`你自己的 email`
   - Notion ID:`@kay`
4. **送出申請**
5. 等 1-2 秒

**看到什麼算對**:
- 橘卡片變成大勾勾 ✓ + 「申請已送出」
- Google Chat 群組收到「🎨 Banner Studio 新申請」卡片
- Sheet 第 2/3/N 列多一筆紀錄

⚠️ **卡住怎麼救**:
- 顯示「送出失敗」紅色框 → 開 DevTools(F12) → Network 看 `/api/apply` response,截圖給我
- Chat 沒通知但 Sheet 有 → CHAT_WEBHOOK 環境變數錯
- Sheet 沒紀錄但 Chat 有 → SHEETS_WEBHOOK_URL 錯
- 兩邊都沒 → 看 Vercel Project → Logs 找錯

### Step 4.2 用手機測(iPhone Safari)
- 同樣流程在 iPhone Safari 跑一遍
- 看 input 自動 zoom 嗎?(不該 zoom,因 font-size 16px)
- 看下 Final CTA 卡片有沒有貼邊正常

---

## ⑤ Lighthouse 跑分(我來)

部署成功 + production URL 給我,我用 Playwright 跑:
- Mobile Performance ≥ 85
- A11y ≥ 95
- Best Practices ≥ 90
- SEO ≥ 90

跑完輸出報告 + 修可改的問題。

---

## ⑥ 收尾

1. 把 production URL 貼到 daily_log
2. backlog 把「Vercel 部署」勾掉
3. 發 Google Chat 業務群組通知:「Banner Studio 上線了,網址 XXX,自己去申請」

---

## 📞 卡關隨時找我

每一步看到任何不對勁、截圖、error 訊息,直接貼上來。

不用憋著自己摸,直接問。
