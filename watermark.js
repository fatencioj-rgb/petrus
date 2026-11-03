// ═══════════════════════════════════════════════════════════════════
// Petrus FOH — On-demand per-user watermark
// ═══════════════════════════════════════════════════════════════════
// The page stays clean (no permanent watermark). When a screenshot attempt
// is detected (see anti-capture.js), we briefly overlay the signed-in user's
// name + timestamp, tiled across the screen, so a capture taken at that
// moment is "signed" with the account that took it.
//
// NOTE (honest limitation): a web page cannot know the exact instant a
// screenshot is taken. This fires on the shortcut/behaviour that usually
// accompanies a capture, so it often — but not always — lands in the image.
// Requires auth.js (for `auth`) loaded first.
// ═══════════════════════════════════════════════════════════════════

(function () {
  'use strict';

  // Remember the current user's label so we can stamp instantly on demand.
  var currentLabel = 'Petrus · Internal';

  function labelFor(user) {
    var name = (user.displayName) || user.email.split('@')[0].replace(/\./g, ' ');
    name = name.replace(/\b\w/g, function (c) { return c.toUpperCase(); });
    var d = new Date();
    var date = d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    var time = d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    return name + ' · ' + date + ' ' + time;
  }

  if (typeof auth !== 'undefined') {
    auth.onAuthStateChanged(function (user) {
      if (user) currentLabel = labelFor(user);
    });
  }

  // Build (or refresh) the tiled watermark overlay and show it.
  function show(durationMs) {
    var label = currentLabel;
    var old = document.getElementById('petrus-watermark');
    if (old) old.remove();

    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" width="320" height="200">'
      + '<text x="0" y="100" transform="rotate(-30 160 100)" '
      + 'fill="rgba(92,26,26,0.22)" font-family="Inter,Segoe UI,sans-serif" '
      + 'font-size="15" font-weight="600">' + label + '</text></svg>';
    var url = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));

    var el = document.createElement('div');
    el.id = 'petrus-watermark';
    // Sit ABOVE the capture-warning overlay so the name lands on top in any
    // screenshot taken while the warning is up.
    el.style.cssText = [
      'position:fixed', 'inset:0', 'z-index:2147483647',
      'pointer-events:none',
      'background-image:url("' + url + '")',
      'background-repeat:repeat'
    ].join(';');
    (document.body || document.documentElement).appendChild(el);

    if (durationMs !== 0) {
      setTimeout(function () {
        var w = document.getElementById('petrus-watermark');
        if (w) w.remove();
      }, durationMs || 5000);
    }
  }

  function hide() {
    var w = document.getElementById('petrus-watermark');
    if (w) w.remove();
  }

  // Exposed for anti-capture.js to call on a detected capture attempt.
  window.petrusShowWatermark = show;
  window.petrusHideWatermark = hide;
})();
