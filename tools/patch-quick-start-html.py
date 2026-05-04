#!/usr/bin/env python3
"""幫 Claude Design standalone HTML 注入 CTA click handler。

Claude Design 匯出的封面 2 個按鈕(開始學習 / 看完整流程)沒接事件,
注入一段 JS 監聽 click 並呼叫 deck-stage 的 next() / _go()。

用法:python3 tools/patch-quick-start-html.py <html-path>
"""
import sys
import pathlib

PATCH = """<script>
(function() {
  document.addEventListener('click', function(e) {
    var stage = document.querySelector('deck-stage');
    if (!stage) return;
    var btn = e.target.closest('button');
    if (!btn) return;
    var txt = (btn.textContent || '').trim();
    if (txt === '開始學習') {
      e.preventDefault();
      stage.next();
    } else if (txt.indexOf('看完整流程') === 0) {
      e.preventDefault();
      if (typeof stage._go === 'function') {
        stage._go(2, 'api');  // 第 3 張 slide(流程圖)
      } else {
        stage.next();
        setTimeout(function() { stage.next(); }, 100);
      }
    }
  });
})();
</script>"""

PATCH_MARKER = "// Quick Start CTA patch"

def main():
    if len(sys.argv) != 2:
        print("Usage: patch-quick-start-html.py <html-path>")
        sys.exit(1)

    path = pathlib.Path(sys.argv[1])
    if not path.exists():
        print(f"❌ 檔案不存在: {path}")
        sys.exit(1)

    content = path.read_text(encoding="utf-8")

    # 防止重複注入
    if "stage._go(2" in content:
        print(f"ℹ️  patch 已存在,跳過: {path.name}")
        return

    if "</body>" not in content:
        print(f"❌ 找不到 </body> tag: {path.name}")
        sys.exit(1)

    new_content = content.replace("</body>", PATCH + "\n</body>", 1)
    path.write_text(new_content, encoding="utf-8")
    print(f"✅ patch 注入成功: {path.name}")

if __name__ == "__main__":
    main()
