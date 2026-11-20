/* Restaurant Ops brand mark: "Restaurant Ops by <author> | <restaurant logo>".
   Include after platform.js on every page. It replaces the plain restaurant logo in the page
   header (screen only) and fills the header bars that had a logo drawn in CSS. */
(function () {
  var cs = document.currentScript;
  var base = (cs && cs.src) ? cs.src.replace(/[^\/]*$/, '') : '';
  var P = window.PLATFORM || { name: 'Restaurant', accent: 'Ops', by: 'Fiorella Atencio', restaurant: { name: 'Petrus', logo: 'petrus-logo.png' } };
  var R = P.restaurant || {};
  function url(p) { try { return new URL(p, base).href; } catch (e) { return p; } }
  var logoUrl = url(R.logo || 'petrus-logo.png');
  var homeUrl = url('index.html');

  var css = '@media screen{'
    + '.brandmark{--bh:48px;display:inline-flex;align-items:center;gap:calc(var(--bh)*.34);color:inherit;text-decoration:none;cursor:pointer;vertical-align:middle}'
    + '.bm-plat{display:flex;flex-direction:column;align-items:flex-start}'
    + ".bm-name{font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:calc(var(--bh)*.46);line-height:1;letter-spacing:-.3px;color:#23210f;white-space:nowrap;text-transform:none}"
    + '.bm-name em{font-style:italic;color:#9d9650}'
    + ".bm-by{font-family:'Inter','Segoe UI',sans-serif;font-size:max(7px,calc(var(--bh)*.16));font-weight:400;letter-spacing:.24em;text-transform:uppercase;color:#5e5829;margin-top:calc(var(--bh)*.1);white-space:nowrap}"
    + '.bm-dv{flex:0 0 auto;width:1px;height:calc(var(--bh)*.8);background:#d3cfa6}'
    + '.brandmark .bm-rest{display:block;height:var(--bh)!important;width:auto!important;max-width:none}'
    + '.m-top .brandmark{--bh:46px}'
    + '.site-header .brandmark,.topbar .brandmark{--bh:56px}'
    + '.tb .brandmark,.top-bar .brandmark{--bh:52px}'
    + '.brandmark.dark{--bh:38px}'
    + '.brandmark.dark .bm-name{color:#fff}.brandmark.dark .bm-name em{color:#9bb7d9}'
    + '.brandmark.dark .bm-by{color:#bcd0ea}.brandmark.dark .bm-dv{background:rgba(255,255,255,.35)}'
    + ".bm-rest-text{font-family:'Cormorant Garamond',Georgia,serif;font-weight:600;font-size:calc(var(--bh)*.6);letter-spacing:.14em;color:#fff;line-height:1}"
    + '.top-bar.has-brand>a{margin-left:auto}.top-bar.has-brand>span:empty{display:none}'
    + '.tb.has-brand::before,.top-bar.has-brand::before,.topbar.has-brand::before{display:none!important}'
    + '@media (max-width:640px){'
    + '.brandmark{--bh:38px!important;flex-direction:column;gap:7px;align-items:center}'
    + '.bm-dv{display:none}.bm-plat{align-items:center}'
    + '.bm-name{font-size:21px}.bm-by{font-size:8px}'
    + '}'
    + '}';
  var st = document.createElement('style');
  st.id = 'brand-style';
  st.textContent = css;
  document.head.appendChild(st);

  // Browser-tab icon: "R" + italic "O" (Restaurant Ops) on a white disc. Same icon on every page.
  // (?v= makes browsers drop the old cached icon when the artwork changes.)
  Array.prototype.forEach.call(document.querySelectorAll('link[rel~="icon"]'), function (l) { l.parentNode.removeChild(l); });
  [['16', 'favicon-16.png'], ['32', 'favicon-32.png'], ['48', 'favicon-48.png']].forEach(function (a) {
    var l = document.createElement('link');
    l.rel = 'icon'; l.type = 'image/png'; l.setAttribute('sizes', a[0] + 'x' + a[0]);
    l.href = url(a[1]) + '?v=ro1';
    document.head.appendChild(l);
  });

  function lockup(logoSrc, dark) {
    var w = document.createElement('span');
    w.className = 'brandmark' + (dark ? ' dark' : '');
    var plat = document.createElement('span'); plat.className = 'bm-plat';
    var name = document.createElement('span'); name.className = 'bm-name';
    name.appendChild(document.createTextNode((P.name || 'Restaurant') + ' '));
    var em = document.createElement('em'); em.textContent = P.accent || 'Ops'; name.appendChild(em);
    var by = document.createElement('span'); by.className = 'bm-by'; by.textContent = (P.by || '');
    plat.appendChild(name); plat.appendChild(by);
    var dv = document.createElement('span'); dv.className = 'bm-dv';
    var img;
    if (dark) { img = document.createElement('span'); img.className = 'bm-rest-text'; img.textContent = (R.name || '').toUpperCase(); }
    else { img = document.createElement('img'); img.className = 'bm-rest'; img.src = logoSrc || logoUrl; img.alt = R.name || ''; }
    w.appendChild(plat); w.appendChild(dv); w.appendChild(img);
    return w;
  }
  function skip(el) {
    return el.closest('.brandbar,.brandmark,#printRoot,#dishPrintRoot,.dp-overlay,.sheet,.print-sheet');
  }
  function init() {
    // 1) Pages whose header already has the restaurant logo as an image.
    document.querySelectorAll('.logo img, .m-logo img').forEach(function (img) {
      if (skip(img) || !/petrus-logo\.png/.test(img.getAttribute('src') || '')) return;
      img.replaceWith(lockup(img.src));
    });
    // 2) Header bars whose logo was drawn by CSS.
    document.querySelectorAll('.tb, .top-bar, body > .topbar').forEach(function (bar) {
      if (skip(bar) || bar.querySelector('.brandmark') || bar.querySelector('.logo')) return;
      var m = lockup(logoUrl, bar.getAttribute('data-brand') === 'dark');
      m.setAttribute('role', 'link'); m.setAttribute('tabindex', '0');
      m.addEventListener('click', function () { window.location.href = homeUrl; });
      m.addEventListener('keydown', function (e) { if (e.key === 'Enter') window.location.href = homeUrl; });
      bar.insertBefore(m, bar.firstChild);
      bar.classList.add('has-brand');
    });
  }
  // ---- App name, icon and tab icon (same on every page, so a bookmark or "Add to Home Screen"
  // gets "Restaurant Ops" and the RO icon wherever it is saved from). ----
  function setMeta(name, content) {
    var m = document.querySelector('meta[name="' + name + '"]');
    if (!m) { m = document.createElement('meta'); m.setAttribute('name', name); document.head.appendChild(m); }
    m.setAttribute('content', content);
  }
  function ensureLink(rel, href, sizes) {
    var sel = 'link[rel="' + rel + '"]' + (sizes ? '[sizes="' + sizes + '"]' : '');
    var l = document.querySelector(sel);
    if (!l) { l = document.createElement('link'); l.setAttribute('rel', rel); if (sizes) l.setAttribute('sizes', sizes); document.head.appendChild(l); }
    l.setAttribute('href', href);
    if (rel === 'icon') l.setAttribute('type', 'image/png');
  }
  function appIdentity() {
    var appName = ((P.name || 'Restaurant') + ' ' + (P.accent || 'Ops')).trim();
    setMeta('apple-mobile-web-app-title', appName);
    setMeta('application-name', appName);
    setMeta('apple-mobile-web-app-capable', 'yes');
    setMeta('apple-mobile-web-app-status-bar-style', 'default');
    setMeta('mobile-web-app-capable', 'yes');
    ensureLink('manifest', url('manifest.json'));
    ensureLink('apple-touch-icon', url('icons/icon-192.png?v=ro1'));
    [16, 32, 48].forEach(function (s) { ensureLink('icon', url('favicon-' + s + '.png?v=ro1'), s + 'x' + s); });
  }
  appIdentity();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
