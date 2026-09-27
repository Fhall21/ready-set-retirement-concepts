/* Mixer: floating panel to cycle each slot's variants and load presets.
   Keys: 1–5 focus a slot, ←/→ cycle it, P cycles presets, M hides the panel. */
(function(){
  var V = window.Vitals, m = V.manifest, focus = "dials";
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
    ".mx-foot button[aria-pressed=true]{background:#1b1622;color:#fff}"
  ].join("");
  document.head.appendChild(css);

  var el = document.createElement("div");
  el.className = "mx"; el.setAttribute("role","region"); el.setAttribute("aria-label","Variant mixer");
  var rows = V.slots.map(function(k,i){
    return '<div class="mx-row" data-k="'+k+'"><span>'+(i+1)+' · '+k+'</span><button data-d="-1" aria-label="Previous '+k+'">‹</button><span></span><button data-d="1" aria-label="Next '+k+'">›</button></div>';
  }).join("");
  var opts = '<option value="">Preset…</option>' + Object.keys(m.presets).map(function(p){
    return '<option value="'+p+'">'+p.toUpperCase()+' · '+m.presets[p].name+'</option>';
  }).join("");
  el.innerHTML = '<div class="mx-top"><b>Mixer</b><button data-min aria-label="Toggle mixer">–</button></div>'+
    '<div class="mx-body">'+rows+'<select aria-label="Preset">'+opts+'</select>'+
    '<div class="mx-foot"><button data-pal="a">A</button><button data-pal="b">B</button><button data-copy>Copy link</button></div></div>';
  document.body.appendChild(el);

  function paint(){
    var s = V.state();
    el.querySelectorAll(".mx-row").forEach(function(r){
      var k = r.dataset.k;
      r.children[2].textContent = s[k] ? s[k]+"/"+m.counts[k] : "off";
      r.classList.toggle("f", k === focus);
    });
    var p = document.documentElement.dataset.pal;
    el.querySelectorAll("[data-pal]").forEach(function(b){ b.setAttribute("aria-pressed", String(b.dataset.pal === p)); });
  }
  function step(k, d){
    var s = V.state(), n = m.counts[k];
    var skip = (m.skip && m.skip[k]) || [];
    do { s[k] = (s[k]+d+n+1) % (n+1); } while (skip.indexOf(s[k]) > -1); // 0 = hidden; skip = cut variants
    V.apply(s, true);
  }
  function preset(p){ if (m.presets[p]) V.apply(Object.assign(V.state(), m.presets[p].slots), true); }

  el.addEventListener("click", function(e){
    var b = e.target.closest("button"); if (!b) return;
    var r = b.closest(".mx-row");
    if (r) { focus = r.dataset.k; step(r.dataset.k, +b.dataset.d); }
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
      var ks = Object.keys(m.presets), cur = ks.findIndex(function(p){ return V.slots.every(function(k){ return m.presets[p].slots[k] === V.state()[k]; }); });
      preset(ks[(cur+1) % ks.length]);
    }
    else if (e.key === "m" || e.key === "M") el.classList.toggle("min");
  });
  document.addEventListener("vitals:change", paint);
  paint();
})();
