/* Shared shell engine — loaded by every 09-felix page (home + services/individual, services/organisation,
   about, contact). Page-agnostic: reads its own presets.json/copy.json/slots/ from wherever the page lives,
   and injects the shared nav + footer from shared/. A page sets window.RSR_ROOT before this script runs:
   the relative path from the PAGE back to the 09-felix folder that contains shared/ ("" for home,
   "../" for about/contact, "../../" for services/<x>). See ../PAGE-CONTRACT.md.

   Slot loader. Each [data-slot] element in <main> is one section. Layout variants are files
   slots/<slot>/<n>.html (n = 1..manifest.counts[slot], 0 = off): ?<slot>=0
   Copy alternates: ?c_<slot>=<variant> from copy.json. Presets: ?preset=<name>. v4: the mixer is hidden by default; add ?mixer to load it.
   Each fragment slots/<slot>/<n>.html = markup + <style> + <script> that sets
   window.slotInit["<slot>"] = function(root, reduced){...}. Init runs inside a
   gsap.context scoped to the slot, so swapping (or a GSAP ScrollTrigger refresh) reverts every tween/trigger. */
(function(){
  var ROOT = window.RSR_ROOT || "";
  // Dev-only multi-page version bar (sites/site-nav.js). Remove this line for production.
  document.head.appendChild(Object.assign(document.createElement("script"),{src:"/site-nav.js",defer:true}));

  function injectShell(){
    var navEl = document.getElementById("site-nav"), footEl = document.getElementById("site-footer");
    var jobs = [];
    if (navEl) jobs.push(fetch(ROOT+"shared/nav.html",{cache:"no-store"}).then(function(r){return r.text();}).then(function(html){
      navEl.outerHTML = html.split("{{ROOT}}").join(ROOT);
    }));
    if (footEl) jobs.push(fetch(ROOT+"shared/footer.html",{cache:"no-store"}).then(function(r){return r.text();}).then(function(html){
      footEl.innerHTML = html.split("{{ROOT}}").join(ROOT);
    }));
    return Promise.all(jobs).then(initNav);
  }

  function initNav(){
    var btn = document.querySelector(".nav-drop-btn");
    if (!btn) return;
    var menu = document.getElementById(btn.getAttribute("aria-controls"));
    function close(){ btn.setAttribute("aria-expanded","false"); menu.hidden = true; }
    function open(){ btn.setAttribute("aria-expanded","true"); menu.hidden = false; }
    btn.addEventListener("click", function(e){
      e.stopPropagation();
      btn.getAttribute("aria-expanded") === "true" ? close() : open();
    });
    document.addEventListener("click", function(e){ if (!e.target.closest(".nav-drop")) close(); });
    document.addEventListener("keydown", function(e){ if (e.key === "Escape") { close(); btn.focus(); } });
  }

  var Vitals = window.Vitals = {
    slots: Array.prototype.map.call(document.querySelectorAll("main [data-slot]"), function(el){ return el.dataset.slot; }),
    ctx: {}, manifest: null, copy: {},
    /* Copy variants: copy.json {slot:{variant:{key:text}}}. URL ?c_<slot>=<variant>; "a" (or absent) = the
       page's default pick, already written into the fragment. Elements opt in with data-copy="<slot>.<key>";
       "" hides the element. */
    copyState: function(){
      var q = new URL(location.href).searchParams, c = {};
      this.slots.forEach(function(k){ c[k] = q.get("c_"+k) || "a"; });
      return c;
    },
    applyCopy: function(el, slot, v){
      var set = (this.copy[slot] || {})[v];
      el.dataset.copy = v;
      if (!set) return;
      el.querySelectorAll('[data-copy^="'+slot+'."]').forEach(function(n){
        var t = set[n.getAttribute("data-copy").slice(slot.length+1)];
        if (t == null) return;
        n.hidden = (t === ""); if (t !== "") n.innerHTML = t;
      });
    },
    reduced: matchMedia("(prefers-reduced-motion: reduce)").matches,
    state: function(){
      var q = new URL(location.href).searchParams, s = {};
      this.slots.forEach(function(k){ s[k] = q.has(k) ? +q.get(k) : 1; });
      return s;
    },
    load: async function(slot, n, cv){
      var el = document.querySelector('[data-slot="'+slot+'"]');
      if (!n) { if (this.ctx[slot]) this.ctx[slot].revert(); el.innerHTML = ""; el.dataset.variant = 0; return; }
      var res = await fetch("slots/"+slot+"/"+n+".html", {cache:"no-store"});
      var html = res.ok ? await res.text() : '<div class="wrap" style="padding:3rem 0">Missing '+slot+'/'+n+'</div>';
      if (this.ctx[slot]) this.ctx[slot].revert();
      delete window.slotInit[slot];
      el.innerHTML = html;
      el.dataset.variant = n;
      this.applyCopy(el, slot, cv || "a"); // before slotInit, so SplitText etc. split the new words
      el.querySelectorAll("script").forEach(function(old){   // innerHTML scripts don't run
        var s = document.createElement("script"); s.textContent = old.textContent; old.replaceWith(s);
      });
      var init = window.slotInit[slot], reduced = this.reduced;
      this.ctx[slot] = gsap.context(function(){ if (init) init(el, reduced); }, el);
    },
    apply: async function(state, push, copy){
      copy = Object.assign(this.copyState(), copy || {});
      if (push) { var u = new URL(location.href); this.slots.forEach(function(k){
        if (state[k] !== 1) u.searchParams.set(k, state[k]); else u.searchParams.delete(k); // defaults stay out of the URL
        if (copy[k] && copy[k] !== "a") u.searchParams.set("c_"+k, copy[k]); else u.searchParams.delete("c_"+k);
      }); u.searchParams.delete("preset"); history.replaceState(null, "", u); }
      await Promise.all(this.slots.map(function(k){
        var el = document.querySelector('[data-slot="'+k+'"]');
        return (el.dataset.variant == state[k] && (!state[k] || el.dataset.copy === copy[k])) ? null : Vitals.load(k, state[k], copy[k]);
      }));
      document.fonts.ready.then(function(){ ScrollTrigger.sort(); ScrollTrigger.refresh(); }); // slots load async: sort triggers into page order or pins go stale
      this.copyNow = copy;
      document.dispatchEvent(new CustomEvent("vitals:change", {detail: state}));
    }
  };
  window.slotInit = {};
  gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin);

  Promise.all([injectShell(), Promise.all(["presets.json","copy.json"].map(function(f){
    return fetch(f,{cache:"no-store"}).then(function(r){return r.ok ? r.json() : {};}).catch(function(){ return {}; });
  }))]).then(function(all){
    var res = all[1];
    var m = res[0]; Vitals.manifest = m; Vitals.copy = res[1];
    var q = new URL(location.href).searchParams, st = Vitals.state(), cp = {};
    var pn = q.get("preset"); // bare URL (no preset, no slot or copy params) loads presets.default
    if (!pn && !Vitals.slots.some(function(k){ return q.has(k) || q.has("c_"+k); })) pn = "default";
    if (pn && m.presets && m.presets[pn]) { st = Object.assign(st, m.presets[pn].slots); cp = m.presets[pn].copy || {}; }
    Vitals.apply(st, true, cp);
    if (q.has("mixer")) { // v4: mixer is opt-in (?mixer). v3 loaded it unless ?clean.
       var s = document.createElement("script"); s.src = ROOT+"shared/mixer.js"; document.body.appendChild(s); }
  });
})();
