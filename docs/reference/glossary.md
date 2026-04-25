---
role: reference
version: 1.0
status: active
last_updated: 2026-04-25
---

# Banner Studio 術語白話對照表

> 給 Kay(非工程師)用。AI 在對話用到這些詞,第一次出現會在括號裡指這份。
> 不確定就回來查,直接問也可以。

## 開發 / 部署

| 術語 | 白話 | 用在哪 |
|------|------|--------|
| **commit** | 把這次改動「存檔」進 git 版本控制,有訊息說明改了什麼 | 「做完一個 block 就 commit」 |
| **push** | 把本地 commit 推到 GitHub 雲端 | 「commit + push」 |
| **repo** | repository 的縮寫,GitHub 上一個專案的容器 | 「GitHub repo 上線」 |
| **branch / main** | 程式碼的「分線」,main 是主線 | 「初始分支 main」 |
| **gh repo create** | 用命令列在 GitHub 建新 repo 的指令 | git init 後接這個 |
| **deploy / 部署** | 把網站丟上線讓人看得到 | 「Vercel 部署」 |
| **production** | 正式上線給使用者看的版本(對 development 開發中) | 「production URL」 |
| **preview / preview URL** | Vercel 給每次推 commit 自動建的測試網址 | 「Lighthouse 跑 preview URL」 |
| **env var(環境變數)** | 不寫死在程式裡的設定值,通常放敏感資料(API key)| `CHAT_WEBHOOK` |
| **build** | 把程式碼編譯打包成可上線的檔案 | `pnpm build` |
| **CDN** | 把靜態檔案散到全球各地伺服器加速載入 | Lenis CDN |
| **dynamic import** | 程式碼分塊載入,需要時才下載(不一次全載)| 「Lenis / GSAP 桌機才載入用 dynamic import」 |

## 前端框架 / 工具

| 術語 | 白話 | 用在哪 |
|------|------|--------|
| **Next.js** | React 的框架,內建路由 / SSR / 部署優化(本專案用 14 版) | 主框架 |
| **App Router** | Next.js 13+ 的新路由系統,資料夾就是路由 | `app/` 資料夾 |
| **TypeScript / TS** | 加了「型別檢查」的 JavaScript,寫錯會立刻警告 | 全站用 TS |
| **Tailwind / Tailwind CSS** | 用 class 寫樣式的 CSS 工具(`p-4` = padding 16px)| 全站用 |
| **Lenis** | 讓網頁滾動絲滑流暢的 JS 函式庫(像 chckn.app 那種感覺)| Block 04 / 08.5 用 |
| **GSAP** | 動畫函式庫,做專業級彈性 / spring 物理感動畫 | Testimonials hover |
| **Framer Motion** | React 用的動畫函式庫,語法比 GSAP 簡單 | D7 React 階段取代 GSAP |
| **next/image** | Next.js 的圖片 component,自動轉 webp / lazy load / 響應式 | 所有圖片用這個 |
| **next/font** | Next.js 的字型 loader,自動 preload + 自託管 | Geist / Inter 字型 |

## 響應式 / 行動裝置

| 術語 | 白話 | 用在哪 |
|------|------|--------|
| **RWD(Responsive Web Design)** | 響應式設計,網站在手機 / 平板 / 桌機都能正常看 | RWD 三段式 |
| **breakpoint** | 切版的「分界點」,例如螢幕 < 768px 變手機版 | sm / md / lg |
| **viewport** | 瀏覽器可視範圍(手機螢幕 = 一個 viewport)| `< 768px` |
| **devtools / Chrome DevTools** | Chrome 內建的開發者工具,F12 打開,可模擬手機螢幕 | 「切 375x667 測」 |
| **375x667** | iPhone SE 的螢幕尺寸 | 每個 block 寫完當下測 |
| **matchMedia** | JS 偵測「目前螢幕是不是手機 / 支援 hover」的 API | Testimonials hover 偵測 |
| **prefers-reduced-motion** | 使用者系統設定「減少動畫」(無障礙)時動畫要關掉 | 容錯規則 |

## 後端 / API / 資料

| 術語 | 白話 | 用在哪 |
|------|------|--------|
| **API route** | Next.js 的「後端入口」,寫在 `app/api/xxx/route.ts` | `/api/apply` 表單 |
| **webhook** | 第三方系統留的網址,丟資料過去就能觸發動作 | Chat / Sheet webhook |
| **Promise.allSettled** | JS 同時跑多個任務,**全部跑完才回**(不管成功失敗)| 雙 webhook 容錯 |
| **Apps Script** | Google 的 JS 環境,寫在試算表內,可當 webhook 接收端 | Sheet webhook |

## 視覺 / Design

| 術語 | 白話 | 用在哪 |
|------|------|--------|
| **token / design token** | 設計用的「變數」,例如顏色 `--brand: #FF963B` | Color tokens |
| **WCAG** | 網頁無障礙國際標準(對比度 / 鍵盤 / 螢幕報讀器) | 對比度 4.5:1 |
| **A11y** | accessibility 的縮寫(中間 11 個字母),無障礙 | A11y 規格 |
| **OG / Open Graph** | 連結被分享到 Slack / Line 時顯示的預覽圖 + 標題 | OG image 1200x630 |
| **lightbox** | 點縮圖後跳出全螢幕大圖 + 半透明黑底的 modal | Feature Grid 點開 |
| **modal** | 網頁上跳出的彈窗,蓋住其他內容 | lightbox 是一種 modal |
| **eyebrow** | 標題上方的小字標籤(像眉毛在標題上方)| 「業務團隊實際數據」 |
| **marquee** | 自動跑馬燈動畫,內容從一邊滑到另一邊 | Hero 右側 banner 跑馬燈 |
| **clamp()** | CSS 函式,字級在最小 / 理想 / 最大之間自動縮放 | `clamp(40px, 6vw, 56px)` |

## 動畫 / 互動

| 術語 | 白話 | 用在哪 |
|------|------|--------|
| **scroll-pinned** | 滾動時某元素「釘」在畫面某位置不動 | Block 04 sidebar |
| **scroll-linked** | 動畫進度跟滾動位置綁定(滾多少動多少)| Block 08.5 Z 軸 reveal |
| **IntersectionObserver** | JS 偵測「元素進畫面了沒」的 API | 卡片 reveal 觸發 |
| **reveal** | 元素從隱藏 → 顯現的進場動畫 | translateY + opacity |
| **easing / ease-out-expo** | 動畫的「速度曲線」(快 → 慢 vs 線性)| `cubic-bezier(0.16, 1, 0.3, 1)` |
| **hover** | 滑鼠移上去(手機沒有 hover) | Testimonials hover 桌機才執行 |

## 治理 / 流程(全域 CLAUDE.md 來的)

| 術語 | 白話 | 用在哪 |
|------|------|--------|
| **CLAUDE.md** | 專案治理規則檔,Claude 每次開對話會讀 | 根目錄 |
| **PRD** | Product Requirements Document,產品需求文件 | `docs/prd.md` |
| **spec** | specification,技術規格文件 | `docs/banner-studio-full-copy-and-spec.md` |
| **roadmap** | 大階段時程規劃 | M1 / M2 / M3 / M4 |
| **backlog** | 待辦清單(優先級分 P0 / P1 / P2)| `docs/backlog.md` |
| **frontmatter** | Markdown 檔最上方的 yaml 設定區塊(role / version 等) | 每份檔開頭 |
| **taxonomy** | 分類學,本指文件「該放哪 / 怎麼命名」的規則 | `specs/_taxonomy.md` |
| **SemVer** | 版本號規則 主.次.修(v1.2.3)| code / skill 用 |
| **MINOR / MAJOR / PATCH** | 版本變動等級(MINOR = 加章節 / MAJOR = 大改) | 改 spec 時用 |
| **grep** | 搜尋整個專案文字的命令列工具 | 「grep 零殘留」 |
| **/verify** | 驗證 skill,跑 build / test / 檢查 | 實作完成後跑 |
| **/review** | 審查 skill,三維度品質檢查 | /verify 之後跑 |

## 度量 / 工具

| 術語 | 白話 | 用在哪 |
|------|------|--------|
| **Lighthouse** | Google 的網站健檢工具(Performance / A11y / SEO / Best Practices)| Chrome DevTools 內建 |
| **Core Web Vitals** | Google 衡量網站體驗的 3 個指標(LCP / CLS / INP)| Lighthouse 看 |
| **LCP / CLS / INP / FCP / TBT** | 五個性能指標(載入快慢 / 跳動 / 反應速度等)| 主 spec §性能目標 |
| **Vercel Analytics** | Vercel 內建的訪問量 / 轉換率追蹤 | 內部站用免費版 |
| **埋點 / track event** | 在程式碼裡加「使用者做了 X 動作」的紀錄,事後看數據 | `track('cta_click')` |
| **PII** | Personally Identifiable Information,個資 | 不送 Analytics |

---

## 變更紀錄

| 日期 | 版本 | 變更 |
|------|------|------|
| 2026-04-25 | 1.0 | 初版,涵蓋 setup-project + D3 衝刺會用到的核心術語 80+ 個 |
