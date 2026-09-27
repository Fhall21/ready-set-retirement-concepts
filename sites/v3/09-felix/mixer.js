/* Mixer: floating panel over Felix's page. Every row is one section.
   Layout tab: each section is on (1) or off. Copy tab: "a" = Felix's pick (baked into the fragment),
   then the alternates in copy.json (plain / words / built).
   Keys: 1–9 focus a row (1 hero, 2 monday, 3 pause, 4 dials, 5 speech, 6 cover, 7 audience, 8 practitioner, 9 consult),
   ←/→ cycle it (layout or copy, per the open tab), P cycles presets, M hides the panel. */
(function(){
  var V = window.Vitals, m = V.manifest, focus = "hero", tab = "layout";
  function cvars(k){ return ["a"].concat(Object.keys(V.copy[k] || {})); } // copy variants for a slot
  var css = document.createElement("style");
  css.textContent = [
    ".mx{position:fixed;left:12px;bottom:12px;z-index:9999;font:500 13px/1.2 var(--sans);color:#1b1622;",
    "background:rgba(255,255,255,.94);backdrop-filter:blur(10px);border:1px solid rgba(0,0,0,.12);border-radius:14px;",
    "box-shadow:0 12px 40px -12px rgba(0,0,0,.35);padding:10px;width:min(290px,calc(100vw - 24px))}",
    ".mx.min .mx-body{display:none}",
    ".mx-top{display:flex;gap:6px;align-items:center}",
    ".mx-top b{flex:1;font-weight:700}",
    ".mx button,.mx select{font:inherit;border:1px solid rgba(0,0,0,.14);background:#fff;border-radius:8px;padding:5px 8px;cursor:pointer;color:inherit}",
    ".mx button:hover{background:#f3eefa}",
    ".mx-row{display:grid;grid-template-columns:1fr 28px 44px 28px;gap:4px;align-items:center;margin-top:6px;padding:2px 4px;border-radius:8px}",
    ".mx-row.f{background:#f3eefa}",
    ".mx-row span:nth-child(3){text-align:center;font-family:var(--num);font-size:12px}",
    ".mx-body>select{width:100%;margin-top:8px}",
    ".mx-foot{display:flex;gap:6px;margin-top:8px}.mx-foot button{flex:1}",
    ".mx-foot button[aria-pressed=true],.mx-tabs button[aria-pressed=true]{background:#1b1622;color:#fff}",
    ".mx-tabs{display:flex;gap:4px;margin-top:8px}.mx-tabs button{flex:1}",
    ".mx[data-tab=copy] .mx-row[data-t=layout],.mx[data-tab=layout] .mx-row[data-t=copy]{display:none}"
  ].join("");
  document.head.appendChild(css);

  var el = document.createElement("div");
  el.className = "mx"; el.setAttribute("role","region"); el.setAttribute("aria-label","Variant mixer");
  var rows = ["layout","copy"].map(function(t){ return V.slots.map(function(k,i){
    return '<div class="mx-row" data-t="'+t+'" data-k="'+k+'"><span>'+(i+1)+' · '+k+'</span><button data-d="-1" aria-label="Previous '+k+' '+t+'">‹</button><span></span><button data-d="1" aria-label="Next '+k+' '+t+'">›</button></div>';
  }).join(""); }).join("");
  var opts = '<option value="">Preset…</option>' + Object.keys(m.presets).map(function(p){
    return '<option value="'+p+'">'+p.toUpperCase()+' · '+m.presets[p].name+'</option>';
  }).join("");
  el.dataset.tab = tab;
  el.innerHTML = '<div class="mx-top"><b>Mixer</b><button data-min aria-label="Toggle mixer">–</button></div>'+
    '<div class="mx-body"><div class="mx-tabs"><button data-tab="layout">Layout</button><button data-tab="copy">Copy</button></div>'+rows+'<select aria-label="Preset">'+opts+'</select>'+
    '<div class="mx-foot"><button data-pal="a">A</button><button data-pal="b">B</button><button data-copy>Copy link</button></div></div>';
  document.body.appendChild(el);

  function paint(){
    var s = V.state(), c = V.copyState();
    el.querySelectorAll(".mx-row").forEach(function(r){
      var k = r.dataset.k;
      if (r.dataset.t === "copy") r.children[2].textContent = cvars(k).length > 1 ? c[k] : "—";
      else r.children[2].textContent = s[k] ? s[k]+"/"+m.counts[k] : "off";
      r.classList.toggle("f", k === focus);
    });
    var p = document.documentElement.dataset.pal;
    el.dataset.tab = tab;
    el.querySelectorAll("[data-tab]").forEach(function(b){ if (b.tagName === "BUTTON") b.setAttribute("aria-pressed", String(b.dataset.tab === tab)); });
    var ks = Object.keys(m.presets), cur = ks.find(function(p){ return V.slots.every(function(k){ return m.presets[p].slots[k] === s[k] && ((m.presets[p].copy || {})[k] || "a") === c[k]; }); });
    el.querySelector(".mx-body>select").value = cur || "";
    el.querySelectorAll("[data-pal]").forEach(function(b){ b.setAttribute("aria-pressed", String(b.dataset.pal === p)); });
  }
  function step(k, d){
    if (tab === "copy") {
      var vs = cvars(k), c = {}; if (vs.length < 2) return;
      c[k] = vs[(vs.indexOf(V.copyState()[k]) + d + vs.length) % vs.length];
      return V.apply(V.state(), true, c);
    }
    var s = V.state(), n = m.counts[k];
    var skip = (m.skip && m.skip[k]) || [];
    do { s[k] = (s[k]+d+n+1) % (n+1); } while (skip.indexOf(s[k]) > -1); // 0 = hidden; skip = cut variants
    V.apply(s, true);
  }
  function preset(p){ // a preset sets the whole page: copy not named in it goes back to "a"
    if (!m.presets[p]) return;
    var c = {}; V.slots.forEach(function(k){ c[k] = (m.presets[p].copy || {})[k] || "a"; });
    V.apply(Object.assign(V.state(), m.presets[p].slots), true, c);
  }

  el.addEventListener("click", function(e){
    var b = e.target.closest("button"); if (!b) return;
    var r = b.closest(".mx-row");
    if (r) { focus = r.dataset.k; step(r.dataset.k, +b.dataset.d); }
    else if (b.dataset.tab) { tab = b.dataset.tab; paint(); }
    else if (b.hasAttribute("data-min")) el.classList.toggle("min");
    else if (b.dataset.pal) { document.documentElement.dataset.pal = b.dataset.pal; try{localStorage.setItem("rsr-pal", b.dataset.pal);}catch(_){} paint(); }
    else if (b.hasAttribute("data-copy")) navigator.clipboard.writeText(location.href).then(function(){ b.textContent = "Copied"; setTimeout(function(){ b.textContent = "Copy link"; }, 1200); });
  });
  el.querySelector("select").addEventListener("change", function(e){ preset(e.target.value); });
  document.addEventListener("keydown", function(e){
    if (/INPUT|TEXTAREA|SELECT/.test(e.target.tagName) || e.metaKey || e.ctrlKey) return;
    var i = +e.key;
    if (i >= 1 && i <= Math.min(9, V.slots.length)) { focus = V.slots[i-1]; paint(); }
    else if (e.key === "ArrowRight" || e.key === "ArrowLeft") { e.preventDefault(); step(focus, e.key === "ArrowRight" ? 1 : -1); }
    else if (e.key === "p" || e.key === "P") {
      var ks = Object.keys(m.presets), cur = ks.findIndex(function(p){ return V.slots.every(function(k){ return m.presets[p].slots[k] === V.state()[k] && ((m.presets[p].copy || {})[k] || "a") === V.copyState()[k]; }); });
      preset(ks[(cur+1) % ks.length]);
    }
    else if (e.key === "m" || e.key === "M") el.classList.toggle("min");
  });
  document.addEventListener("vitals:change", paint);
  paint();
})();
