// Inline SVG icon swap — replaces <i class="fas fa-XXX"></i> with <svg> at runtime
// All icons from Lucide (MIT) — simple, clean stroke style that suits the brand
(function () {
  const ICONS = {
    'arrow-right': '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    'arrow-left': '<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',
    'arrow-down': '<path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>',
    'user': '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    'robot': '<rect x="3" y="8" width="18" height="12" rx="3"/><path d="M12 8V4"/><circle cx="12" cy="3" r="1"/><circle cx="9" cy="13" r="1.2" fill="currentColor"/><circle cx="15" cy="13" r="1.2" fill="currentColor"/><path d="M9 17h6"/>',
    'database': '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/>',
    'comments': '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>',
    'id-badge': '<rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="12" cy="11" r="3"/><path d="M7 18c0-2 2.5-3 5-3s5 1 5 3"/><path d="M9 4V2h6v2"/>',
    'circle-info': '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><circle cx="12" cy="8" r="0.8" fill="currentColor"/>',
    'triangle-exclamation': '<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><circle cx="12" cy="17" r="0.8" fill="currentColor"/>',
    'link': '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
    'bolt': '<path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z"/>',
    'clipboard-list': '<rect x="6" y="4" width="12" height="18" rx="2"/><path d="M9 4V3a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1"/><line x1="9" y1="11" x2="15" y2="11"/><line x1="9" y1="15" x2="15" y2="15"/><circle cx="7.5" cy="11" r="0.6" fill="currentColor"/><circle cx="7.5" cy="15" r="0.6" fill="currentColor"/>',
    'pen-to-square': '<path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/>',
    'image': '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="9" r="1.5"/><path d="m21 15-5-5L5 21"/>',
    'circle-check': '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
    'ruler-combined': '<path d="M3 21V8a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 6V3"/><path d="M14 6V4"/><path d="M6 9H3"/><path d="M6 14H4"/>',
    'file-image': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><circle cx="10" cy="13" r="2"/><path d="m20 17-1.5-1.5L13 21"/>',
    'align-left': '<line x1="3" y1="6" x2="14" y2="6"/><line x1="3" y1="12" x2="20" y2="12"/><line x1="3" y1="18" x2="14" y2="18"/>',
    'ban': '<circle cx="12" cy="12" r="10"/><line x1="5" y1="5" x2="19" y2="19"/>',
    'google-drive': '<path d="m12 2 8 14h-7L8 7z"/><path d="M2 16h7l3 5h-7z"/><path d="M22 16h-9l-3 5h9z"/>',
    'check': '<path d="M20 6 9 17l-5-5"/>',
    'xmark': '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    'key': '<path d="M21 2 13 10"/><circle cx="8" cy="14" r="6"/><path d="m17 6 3 3"/><path d="m14 9 3 3"/>',
    'bug': '<rect x="8" y="6" width="8" height="14" rx="4"/><path d="M12 6V4"/><path d="M9 4h6"/><path d="M5 11H3"/><path d="M21 11h-2"/><path d="M5 16H3"/><path d="M21 16h-2"/><path d="M5 6 3 4"/><path d="m19 6 2-2"/>',
    'rotate': '<path d="M3 12a9 9 0 1 1 3 6.7"/><path d="M3 21v-5h5"/>',
    'palette': '<circle cx="12" cy="12" r="9"/><circle cx="7.5" cy="10.5" r="1" fill="currentColor"/><circle cx="12" cy="7.5" r="1" fill="currentColor"/><circle cx="16.5" cy="10.5" r="1" fill="currentColor"/><path d="M12 21a3 3 0 0 1 0-6 2 2 0 0 0 2-2c0-1 .5-2 2-2h2"/>'
  };

  function makeSvg(name, classList) {
    const inner = ICONS[name];
    if (!inner) return null;
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    svg.setAttribute('aria-hidden', 'true');
    svg.classList.add('iconsvg');
    classList.forEach(c => svg.classList.add(c));
    svg.innerHTML = inner;
    return svg;
  }

  function swap(root) {
    const els = root.querySelectorAll('i.fas, i.fab, i.far');
    els.forEach(el => {
      const classes = Array.from(el.classList);
      const iconClass = classes.find(c => c.startsWith('fa-'));
      if (!iconClass) return;
      const name = iconClass.replace('fa-', '');
      const passClasses = classes.filter(c => !['fas', 'fab', 'far'].includes(c) && !c.startsWith('fa-'));
      const svg = makeSvg(name, passClasses);
      if (svg) el.replaceWith(svg);
    });
  }

  function run() {
    swap(document);
    // also swap inside any deck-stage shadow DOMs
    document.querySelectorAll('deck-stage').forEach(ds => {
      if (ds.shadowRoot) swap(ds.shadowRoot);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
