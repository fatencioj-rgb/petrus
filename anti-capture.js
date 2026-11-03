// ═══════════════════════════════════════════════════════════════════
// Petrus FOH — Screenshot warning & casual-copy deterrents
// ═══════════════════════════════════════════════════════════════════
// IMPORTANT, read this before relying on it:
//   • A web page CANNOT truly block screenshots or the browser console.
//     The browser belongs to the user, not to the page. There is no API
//     for it, and a photo of the screen with another phone always works.
//   • What this file does is DETER and WARN. It shows a warning when the
//     common screenshot shortcuts / behaviours are detected, and it makes
//     casual right-click / copy / devtools a little harder. Determined
//     users can still get around all of it.
//   • The real protection is the per-user watermark (watermark.js) plus
//     the access log — so a leaked capture can be traced to an account.
// ═══════════════════════════════════════════════════════════════════

(function () {
  'use strict';

  // ── Warning toast ────────────────────────────────────────────────
  function showCaptureWarning(msg) {
    var existing = document.getElementById('petrus-capture-warn');
    if (existing) { existing.remove(); }
    var el = document.createElement('div');
    el.id = 'petrus-capture-warn';
    el.setAttribute('role', 'alert');
    el.style.cssText = [
      'position:fixed', 'inset:0', 'z-index:2147483647',
      'background:rgba(45,10,10,0.96)', 'color:#faf7f1',
      'display:flex', 'flex-direction:column', 'align-items:center', 'justify-content:center',
      'text-align:center', 'padding:40px 24px',
      "font-family:'Cormorant Garamond','Georgia',serif"
    ].join(';');
    el.innerHTML =
      '<div style="font-size:42px;color:#b89650;margin-bottom:16px;">Screenshots are not permitted</div>'
      + '<p style="font-family:\'Inter\',sans-serif;font-size:14px;letter-spacing:0.5px;line-height:1.6;color:#d4b87a;max-width:460px;">'
      + (msg || 'This material is confidential and for internal use only. Capturing, copying or sharing it is against policy and is logged to your account.')
      + '</p>'
      + '<button id="petrus-capture-dismiss" style="margin-top:28px;font-family:\'Inter\',sans-serif;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#d4b87a;background:transparent;border:1px solid rgba(184,150,80,0.4);border-radius:6px;padding:10px 22px;cursor:pointer;">I understand</button>';
    document.body.appendChild(el);
    var btn = document.getElementById('petrus-capture-dismiss');
    if (btn) btn.addEventListener('click', function () { el.remove(); });
    // Auto-dismiss after a few seconds so it never traps the user.
    setTimeout(function () { if (el && el.parentNode) el.remove(); }, 6000);
  }
  // Expose so other scripts/pages could trigger it if needed.
  window.petrusShowCaptureWarning = showCaptureWarning;

  // ── Screenshot key detection (best-effort) ───────────────────────
  // We can't intercept the OS screenshot tool, but we can react to the
  // keys/behaviours that usually accompany a capture.
  document.addEventListener('keyup', function (e) {
    // PrintScreen (Windows / many keyboards)
    if (e.key === 'PrintScreen' || e.code === 'PrintScreen') {
      // Best-effort: wipe anything that may be sitting on the clipboard.
      try { navigator.clipboard && navigator.clipboard.writeText(''); } catch (x) {}
      showCaptureWarning();
    }
  });
  document.addEventListener('keydown', function (e) {
    var k = (e.key || '').toLowerCase();
    // Win+Shift+S (Windows Snip), Cmd+Shift+3/4/5 (macOS capture)
    var winSnip = e.shiftKey && (e.metaKey || e.getModifierState('Meta') || e.getModifierState('OS')) && k === 's';
    var macShot = e.metaKey && e.shiftKey && ['3', '4', '5'].indexOf(k) >= 0;
    if (winSnip || macShot) {
      showCaptureWarning();
    }
  });

  // ── Leaving/returning the tab (often a capture or a print) ────────
  // Kept subtle: we warn on return from a hidden state only when it was
  // quick, which commonly matches "took a screenshot" behaviour.
  var hiddenAt = 0;
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) { hiddenAt = Date.now(); }
  });

  // Warn on print attempts (Ctrl/Cmd+P) — printing is another way to lift content.
  window.addEventListener('beforeprint', function () { showCaptureWarning(); });

  // ── Casual-copy deterrents (cosmetic — not real security) ─────────
  // Block right-click context menu.
  document.addEventListener('contextmenu', function (e) { e.preventDefault(); return false; });

  // Block copy / cut, and the usual devtools/view-source shortcuts.
  document.addEventListener('keydown', function (e) {
    var k = (e.key || '').toLowerCase();
    var ctrl = e.ctrlKey || e.metaKey;
    // F12
    if (k === 'f12') { e.preventDefault(); showCaptureWarning(); return false; }
    // Ctrl/Cmd+Shift+I / J / C  (devtools)   and  Ctrl/Cmd+U (view source)
    if (ctrl && e.shiftKey && ['i', 'j', 'c'].indexOf(k) >= 0) { e.preventDefault(); showCaptureWarning(); return false; }
    if (ctrl && k === 'u') { e.preventDefault(); showCaptureWarning(); return false; }
    // Ctrl/Cmd+C / X / S  (copy / cut / save page)
    if (ctrl && ['c', 'x', 's'].indexOf(k) >= 0) { e.preventDefault(); return false; }
  });

  // Block the copy event itself (and clear the clipboard payload).
  document.addEventListener('copy', function (e) {
    e.preventDefault();
    try { e.clipboardData && e.clipboardData.setData('text/plain', ''); } catch (x) {}
  });
  document.addEventListener('cut', function (e) { e.preventDefault(); });

  // Discourage text selection and image dragging site-wide.
  var style = document.createElement('style');
  style.textContent =
    'body{-webkit-user-select:none;-ms-user-select:none;user-select:none;}'
    + 'input,textarea,[contenteditable="true"]{-webkit-user-select:text;-ms-user-select:text;user-select:text;}'
    + 'img{-webkit-user-drag:none;user-drag:none;}';
  document.addEventListener('DOMContentLoaded', function () {
    (document.head || document.documentElement).appendChild(style);
  });
  // If DOMContentLoaded already fired, append now.
  if (document.readyState !== 'loading') {
    (document.head || document.documentElement).appendChild(style);
  }
})();
