/* ── CONTENT PROTECTION ──
   To temporarily disable (e.g. for editing), set ENABLED = false
   ─────────────────────────────────────────── */
(function () {
  'use strict';

  var ENABLED = true;
  if (!ENABLED) return;

  /* 1. Disable right-click context menu */
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
  });

  /* 2. Disable keyboard shortcuts */
  document.addEventListener('keydown', function (e) {
    var key = e.key.toLowerCase();
    /* Ctrl/Cmd + C, A, U, S, P, X */
    if ((e.ctrlKey || e.metaKey) && ['c','a','u','s','p','x'].indexOf(key) !== -1) {
      e.preventDefault();
    }
    /* F12 */
    if (e.key === 'F12') { e.preventDefault(); }
    /* Ctrl+Shift+I / J / C (DevTools) */
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && ['i','j','c'].indexOf(key) !== -1) {
      e.preventDefault();
    }
    /* PrintScreen key (best-effort — OS may still capture) */
    if (e.key === 'PrintScreen') { e.preventDefault(); }
  });

  /* 3. Disable text selection via mouse */
  document.addEventListener('selectstart', function (e) {
    e.preventDefault();
  });

  /* 4. Disable image / element drag */
  document.addEventListener('dragstart', function (e) {
    e.preventDefault();
  });

  /* 5. Inject CSS — disable user-select site-wide */
  var style = document.createElement('style');
  style.textContent = [
    '*, *::before, *::after {',
    '  -webkit-user-select: none !important;',
    '  -ms-user-select: none !important;',
    '  user-select: none !important;',
    '}',
    'img { pointer-events: none; -webkit-user-drag: none; }'
  ].join('\n');
  document.head.appendChild(style);

}());
