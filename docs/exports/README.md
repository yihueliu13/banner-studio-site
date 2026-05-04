# Quick Start 教學匯出檔(源檔備份)

Claude Design 匯出的 Quick Start 教學原始檔放這。

## 檔案

| 檔案 | 來源動作 | 用途 |
|------|--------|------|
| `Banner Studio Quick Start.html` | Claude Design → Export as standalone HTML | **線上版源檔**(內含 css/js/圖片,4.9 MB)|
| `Banner 自動產生 — 業務 Quick Start.pdf` | Claude Design → Export as PDF | **PDF 下載源檔**(9.1 MB)|
| `Quick Start.html` | Claude Design 副產物 | 不含資源版,需配合 deck.css / deck-stage.js / icons.js |
| `Quick Start (standalone-src).html` | Claude Design 副產物 | standalone 原始碼 |
| `Quick Start-print.html` | Claude Design 副產物 | 列印用版型 |
| `deck.css` / `deck-stage.js` / `icons.js` | Claude Design 副產物 | 上面 53 KB 版本的依賴檔 |

> 上線只用前兩個（standalone HTML + PDF）。其他副產物保留以備不時之需，可不動。

## 重新匯出流程（Claude Design 改了內容後）

```bash
# 1. Claude Design 改完 → Share 面板
#    - Export as standalone HTML → 存到 ~/Downloads/Quick start/
#    - Export as PDF → 存到桌面

# 2. 蓋掉這資料夾的檔（兩個 source 檔）
mv ~/Downloads/Quick\ start/* docs/exports/
mv ~/Desktop/Banner\ 自動產生*.pdf docs/exports/

# 3. 跑 sync 腳本（自動複製到 app/public/）
bash tools/sync-quick-start.sh

# 4. commit + push
git add app/public/quick-start.* docs/exports/
git commit -m "更新: Quick Start 教學重新匯出"
git push
```

Vercel 自動 deploy 後 `https://banner-studio-site.vercel.app/quick-start.html` 立即更新。

## 部署後 URL

| 用途 | URL |
|------|-----|
| 線上看（standalone HTML）| https://banner-studio-site.vercel.app/quick-start.html |
| PDF 下載 | https://banner-studio-site.vercel.app/quick-start.pdf |

兩個入口在官網 Footer「快速連結 → Quick Start 教學 [線上][PDF]」。
