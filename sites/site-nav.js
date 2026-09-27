/* Dev-only version bar for the multi-page site. Remove before production.
   Loaded from any page depth; paths are absolute because the dev server serves sites/ at /. */
(async function () {
  var data = await fetch("/site-versions.json", { cache: "no-store" }).then(function (r) { return r.json(); }).catch(function () { return null; });
  if (!data || new URLSearchParams(location.search).has("clean")) return;
  var path = location.pathname;
  var cur = data.versions.filter(function (v) { return path.indexOf(v.root) === 0; })[0];
  if (!cur) return;
  var sub = path.slice(cur.root.length); // e.g. "about/" — kept when switching versions

  var css = document.createElement("style");
  css.textContent =
    "#site-vbar{position:fixed;right:16px;bottom:16px;z-index:9999;font:500 12px/1 system-ui,sans-serif;display:flex;gap:6px;align-items:center;" +
    "background:rgba(20,16,30,.88);color:#fff;border-radius:999px;padding:6px 8px 6px 12px;box-shadow:0 4px 16px rgba(0,0,0,.2)}" +
    "#site-vbar a{color:#fff;opacity:.75;text-decoration:none}#site-vbar a:hover{opacity:1}" +
    "#site-vbar select{font:inherit;color:#fff;background:transparent;border:1px solid rgba(255,255,255,.3);border-radius:999px;padding:4px 8px}" +
    "#site-vbar option{color:#000}@media print{#site-vbar{display:none}}";
  document.head.appendChild(css);

  var bar = document.createElement("div");
  bar.id = "site-vbar";
  bar.setAttribute("aria-label", "Site version (dev only)");
  bar.innerHTML = '<a href="/">Gallery</a><select aria-label="Site version"></select>';
  var sel = bar.querySelector("select");
  data.versions.forEach(function (v) {
    var o = new Option(v.label + " · " + v.subtitle, v.id, false, v.id === cur.id);
    sel.appendChild(o);
  });
  sel.onchange = function () {
    var v = data.versions.filter(function (x) { return x.id === sel.value; })[0];
    location.href = v.root + sub + location.search + location.hash;
  };
  document.body.appendChild(bar);
})();
