// ═══════════════════════════════════════════════════════════════════
// Petrus FOH — Per-user watermark
// ═══════════════════════════════════════════════════════════════════
// Overlays the signed-in user's name + today's date, tiled faintly across
// the page. It does NOT stop screenshots — nothing can — but any capture
// or photo of the screen is "signed" with the account that took it, which
// is the real deterrent. Pointer events pass through, so it never blocks
// clicks. Requires auth.js (for `auth`) to be loaded first.
// ═══════════════════════════════════════════════════════════════════

(function () {
  'use strict';
  if (typeof auth === 'undefined') return;

  function build(label) {
    var old = document.getElementById('petrus-watermark');
    if (old) old.remove();

    // Build a tiled SVG as the background so it repeats cheaply.
    var text = label;
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" width="320" height="200">'
      + '<text x="0" y="100" transform="rotate(-30 160 100)" '
      + 'fill="rgba(92,26,26,0.10)" font-family="Inter,Segoe UI,sans-serif" '
      + 'font-size="15" font-weight="500">' + text + '</text></svg>';
    var url = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));

    var el = document.createElement('div');
    el.id = 'petrus-watermark';
    el.style.cssText = [
      'position:fixed', 'inset:0', 'z-index:2147483000',
      'pointer-events:none',               // clicks go through
      'background-image:url("' + url + '")',
      'background-repeat:repeat',
      'opacity:1'
    ].join(';');
    document.body.appendChild(el);
  }

  function labelFor(user) {
    var name = (user.displayName) || user.email.split('@')[0].replace(/\./g, ' ');
    name = name.replace(/\b\w/g, function (c) { return c.toUpperCase(); });
    var d = new Date();
    var date = d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    var time = d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    return name + ' · ' + date + ' ' + time;
  }

  auth.onAuthStateChanged(function (user) {
    if (!user) {
      var el = document.getElementById('petrus-watermark');
      if (el) el.remove();
      return;
    }
    var label = labelFor(user);
    if (document.body) build(label);
    else document.addEventListener('DOMContentLoaded', function () { build(label); });
  });
})();
