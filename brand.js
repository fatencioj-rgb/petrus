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

  function lockup(logoSrc) {
    var w = document.createElement('span');
    w.className = 'brandmark';
    var plat = document.createElement('span'); plat.className = 'bm-plat';
    var name = document.createElement('span'); name.className = 'bm-name';
    name.appendChild(document.createTextNode((P.name || 'Restaurant') + ' '));
    var em = document.createElement('em'); em.textContent = P.accent || 'Ops'; name.appendChild(em);
    var by = document.createElement('span'); by.className = 'bm-by'; by.textContent = 'by ' + (P.by || '');
    plat.appendChild(name); plat.appendChild(by);
    var dv = document.createElement('span'); dv.className = 'bm-dv';
    var img = document.createElement('img'); img.className = 'bm-rest'; img.src = logoSrc || logoUrl; img.alt = R.name || '';
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
      var m = lockup(logoUrl);
      m.setAttribute('role', 'link'); m.setAttribute('tabindex', '0');
      m.addEventListener('click', function () { window.location.href = homeUrl; });
      m.addEventListener('keydown', function (e) { if (e.key === 'Enter') window.location.href = homeUrl; });
      bar.insertBefore(m, bar.firstChild);
      bar.classList.add('has-brand');
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
