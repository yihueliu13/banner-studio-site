#!/bin/bash
# 把 docs/exports/ 的 standalone HTML + PDF 同步到 app/public/(Vercel 部署用)
# Claude Design 重 export 後跑這支腳本即可
set -e

PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC_DIR="$PROJECT_ROOT/docs/exports"
DST_DIR="$PROJECT_ROOT/app/public"

HTML_SRC="$SRC_DIR/Banner Studio Quick Start.html"
PDF_SRC="$SRC_DIR/Banner 自動產生 — 業務 Quick Start.pdf"

if [ ! -f "$HTML_SRC" ]; then
  echo "❌ 找不到 standalone HTML: $HTML_SRC"
  echo "請先從 Claude Design 重新 Export as standalone HTML 到 docs/exports/"
  exit 1
fi

if [ ! -f "$PDF_SRC" ]; then
  echo "❌ 找不到 PDF: $PDF_SRC"
  echo "請先從 Claude Design 重新 Export as PDF 到 docs/exports/"
  exit 1
fi

cp "$HTML_SRC" "$DST_DIR/quick-start.html"
cp "$PDF_SRC" "$DST_DIR/quick-start.pdf"

# Patch:幫封面兩個 CTA 按鈕加 click handler(Claude Design 匯出時沒接事件)
python3 "$PROJECT_ROOT/tools/patch-quick-start-html.py" "$DST_DIR/quick-start.html"

echo "✅ 同步完成"
echo "   HTML: $(du -h "$DST_DIR/quick-start.html" | cut -f1) → app/public/quick-start.html"
echo "   PDF:  $(du -h "$DST_DIR/quick-start.pdf" | cut -f1) → app/public/quick-start.pdf"
echo ""
echo "下一步(部署):"
echo "  git add app/public/quick-start.* docs/exports/"
echo "  git commit -m '更新: Quick Start 教學重新匯出'"
echo "  git push"
