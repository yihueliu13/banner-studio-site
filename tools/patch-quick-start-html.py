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
  // 建立 §1-§6 章節頁 → slide index 對照表
  function buildSectionIndexMap() {
    var map = {};
    var sections = document.querySelectorAll('deck-stage > section');
    sections.forEach(function(sec, i) {
      var label = sec.getAttribute('data-label') || '';
      var m = label.match(/§([1-6])/);
      if (m) map[m[1]] = i;
    });
    return map;
  }

  function applyCursorHints(map) {
    // 目錄 / 跳轉表的 row(tr/li),含 §1-§6 → 加 pointer
    document.querySelectorAll('tr, li').forEach(function(row) {
      var t = (row.textContent || '').trim();
      var m = t.match(/§([1-6])/);
      if (m && map[m[1]] != null) {
        row.style.cursor = 'pointer';
      }
    });
  }

  function init() {
    var stage = document.querySelector('deck-stage');
    if (!stage) { setTimeout(init, 50); return; }
    var sectionIndexMap = buildSectionIndexMap();
    applyCursorHints(sectionIndexMap);

    document.addEventListener('click', function(e) {
      // 1) 封面 CTA 按鈕
      var btn = e.target.closest('button');
      if (btn) {
        var bt = (btn.textContent || '').trim();
        if (bt === '開始學習') {
          e.preventDefault();
          stage.next();
          return;
        }
        if (bt.indexOf('看完整流程') === 0) {
          e.preventDefault();
          if (typeof stage._go === 'function') {
            stage._go(2, 'api');
          } else {
            stage.next();
            setTimeout(function() { stage.next(); }, 100);
          }
          return;
        }
      }

      // 2) 目錄 / 跳轉表 row 點擊跳 § 章節
      var row = e.target.closest('tr, li');
      if (row) {
        var t = (row.textContent || '').trim();
        var m = t.match(/§([1-6])/);
        if (m && sectionIndexMap[m[1]] != null) {
          e.preventDefault();
          if (typeof stage._go === 'function') {
            stage._go(sectionIndexMap[m[1]], 'api');
          }
        }
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
</script>"""

PATCH_MARKER = "buildSectionIndexMap"

def main():
    if len(sys.argv) != 2:
        print("Usage: patch-quick-start-html.py <html-path>")
        sys.exit(1)

    path = pathlib.Path(sys.argv[1])
    if not path.exists():
        print(f"❌ 檔案不存在: {path}")
        sys.exit(1)

    content = path.read_text(encoding="utf-8")

    # 防止重複注入(用 marker)
    if PATCH_MARKER in content:
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
