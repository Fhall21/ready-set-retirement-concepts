/* Contact page behaviour, shared by every layout variant of the booking and form slots.
   Loaded once by contact/index.html (before shared/engine.js). Slot fragments call
   RSRContact.booking(el) / RSRContact.form(el) from their slotInit. No network: the booking
   widget is a static mock and forms end in a friendly on-page confirmation.

   Booking markup contract (inside one [data-booking] element):
     [data-cal-title] [data-cal-prev] [data-cal-next] [data-cal-grid]   month view, or
     [data-cal-strip]                                                  a strip of the next open weekdays
     [data-slots-label] [data-slots] [data-continue]                   times for the picked day
     [data-step="pick"|"details"|"done"]  [data-back]  [data-summary]  [data-restart]
   Form markup contract: <form data-enquiry novalidate> with .cx-field wrappers, optional
   input[name=who] radios toggling [data-when="me"|"org"], and a sibling [data-done] panel. */
(function(){
  var TZ_NOTE = "Queensland time";
  var DAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  var MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  var TIMES = [[9,0],[9,30],[10,30],[11,0],[13,30],[14,0],[15,30],[16,0]];

  function startOfDay(d){ return new Date(d.getFullYear(), d.getMonth(), d.getDate()); }
  function key(d){ return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate(); }
  function hash(n){ n = (n ^ 61) ^ (n >>> 16); n = n + (n << 3); n = n ^ (n >>> 4); n = Math.imul(n, 0x27d4eb2d); return (n ^ (n >>> 15)) >>> 0; }
  function seed(d){ return d.getFullYear()*400 + d.getMonth()*32 + d.getDate(); }
  function fmtTime(t){ var h = t[0] % 12 || 12; return h + ":" + (t[1] < 10 ? "0" : "") + t[1] + (t[0] < 12 ? " am" : " pm"); }
  function fmtDay(d){ return DAYS[d.getDay()] + " " + d.getDate() + " " + MONTHS[d.getMonth()]; }

  var today = startOfDay(new Date());
  var first = new Date(today); first.setDate(first.getDate() + 2);          // earliest bookable: the day after tomorrow
  var last = new Date(today.getFullYear(), today.getMonth() + 3, 0);        // end of the month after next

  /* Mock availability: weekdays only, roughly three in four open, a few times each. Deterministic by date. */
  function times(d){
    if (d < first || d > last || d.getDay() === 0 || d.getDay() === 6) return [];
    var h = hash(seed(d));
    if (h % 4 === 0) return [];
    return TIMES.filter(function(_, i){ return (h >> (i + 3)) % 3 !== 0; });
  }

  function booking(root){
    var box = root.querySelector("[data-booking]");
    if (!box || box.dataset.ready) return;
    box.dataset.ready = "1";
    var q = function(s){ return box.querySelector(s); };
    var grid = q("[data-cal-grid]"), strip = q("[data-cal-strip]"), title = q("[data-cal-title]"),
        prev = q("[data-cal-prev]"), next = q("[data-cal-next]"), slotsEl = q("[data-slots]"),
        slotsLabel = q("[data-slots-label]"), cont = q("[data-continue]");
    var view = new Date(first.getFullYear(), first.getMonth(), 1), picked = null, pickedTime = null;

    // Start on the first open day so times are showing straight away.
    for (var d = new Date(first); d <= last; d.setDate(d.getDate() + 1)) { if (times(d).length) { picked = new Date(d); break; } }
    if (picked) view = new Date(picked.getFullYear(), picked.getMonth(), 1);
    // Month view only: if the current month has just a day or two left, open on next month so the
    // first thing people see is a calendar full of choices, not a page of greyed-out dates.
    if (grid && picked) {
      var open = 0, endM = new Date(view.getFullYear(), view.getMonth() + 1, 0);
      for (var c = new Date(picked); c <= endM; c.setDate(c.getDate() + 1)) if (times(c).length) open++;
      if (open < 4) {
        view = new Date(view.getFullYear(), view.getMonth() + 1, 1);
        for (var e = new Date(view); e <= last; e.setDate(e.getDate() + 1)) { if (times(e).length) { picked = new Date(e); break; } }
      }
    }

    function dayButton(d, label){
      var b = document.createElement("button"), t = times(d);
      b.type = "button"; b.className = "cx-day"; b.dataset.k = key(d);
      b.innerHTML = label;
      b.setAttribute("aria-label", fmtDay(d) + (t.length ? ", " + t.length + " times free" : ", no times free"));
      if (!t.length) b.disabled = true;
      if (key(d) === key(today)) b.classList.add("is-today");
      if (picked && key(d) === key(picked)) { b.setAttribute("aria-pressed","true"); } else { b.setAttribute("aria-pressed","false"); }
      b.addEventListener("click", function(){ pick(new Date(d)); });
      return b;
    }

    function renderMonth(){
      if (!grid) return;
      grid.innerHTML = "";
      title.textContent = MONTHS[view.getMonth()] + " " + view.getFullYear();
      ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].forEach(function(w){
        var s = document.createElement("span"); s.className = "cx-wd"; s.textContent = w; s.setAttribute("aria-hidden","true"); grid.appendChild(s);
      });
      var lead = (view.getDay() + 6) % 7;
      for (var i = 0; i < lead; i++) { var e = document.createElement("span"); e.className = "cx-blank"; grid.appendChild(e); }
      var dim = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
      for (var n = 1; n <= dim; n++) {
        var d = new Date(view.getFullYear(), view.getMonth(), n);
        grid.appendChild(dayButton(d, '<span>' + n + '</span>'));
      }
      prev.disabled = view <= new Date(today.getFullYear(), today.getMonth(), 1);
      next.disabled = new Date(view.getFullYear(), view.getMonth() + 1, 1) > last;
      rove();
    }

    function renderStrip(){
      if (!strip) return;
      strip.innerHTML = "";
      var count = 0;
      for (var d = new Date(first); d <= last && count < 10; d.setDate(d.getDate() + 1)) {
        if (d.getDay() === 0 || d.getDay() === 6) continue;
        var dd = new Date(d);
        strip.appendChild(dayButton(dd, '<span class="cx-dw">' + DAYS[dd.getDay()].slice(0,3) + '</span><span class="cx-dn">' + dd.getDate() + '</span><span class="cx-dm">' + MONTHS[dd.getMonth()].slice(0,3) + '</span>'));
        count++;
      }
      rove();
    }

    /* Roving tabindex: one day button is tabbable, arrows move between open days. */
    function rove(){
      var host = grid || strip, btns = [].slice.call(host.querySelectorAll(".cx-day:not(:disabled)"));
      host.querySelectorAll(".cx-day").forEach(function(b){ b.tabIndex = -1; });
      var cur = host.querySelector('.cx-day[aria-pressed="true"]:not(:disabled)') || btns[0];
      if (cur) cur.tabIndex = 0;
    }
    function onKey(e){
      var host = e.currentTarget, all = [].slice.call(host.querySelectorAll(".cx-day"));
      var i = all.indexOf(document.activeElement); if (i < 0) return;
      var step = {ArrowRight:1, ArrowLeft:-1, ArrowDown: grid ? 7 : 1, ArrowUp: grid ? -7 : -1}[e.key];
      if (!step) return;
      e.preventDefault();
      for (var j = i + step; j >= 0 && j < all.length; j += step) {
        if (!all[j].disabled) { all.forEach(function(b){ b.tabIndex = -1; }); all[j].tabIndex = 0; all[j].focus(); return; }
      }
    }
    if (grid) grid.addEventListener("keydown", onKey);
    if (strip) strip.addEventListener("keydown", onKey);

    function renderSlots(){
      slotsEl.innerHTML = "";
      pickedTime = null; if (cont) cont.disabled = true; live();
      if (!picked) { slotsLabel.textContent = "Pick a day to see the times"; return; }
      slotsLabel.textContent = fmtDay(picked);
      times(picked).forEach(function(t){
        var b = document.createElement("button");
        b.type = "button"; b.className = "cx-time"; b.textContent = fmtTime(t);
        b.setAttribute("aria-pressed","false");
        b.addEventListener("click", function(){
          slotsEl.querySelectorAll(".cx-time").forEach(function(x){ x.setAttribute("aria-pressed","false"); });
          b.setAttribute("aria-pressed","true"); pickedTime = t; live();
          if (cont) cont.disabled = false; else go("details");
        });
        slotsEl.appendChild(b);
      });
    }

    /* Optional live read-outs ([data-live-day], [data-live-time]) for layouts that echo the choice. */
    function live(){
      box.querySelectorAll("[data-live-day]").forEach(function(s){ s.textContent = picked ? fmtDay(picked) : "—"; s.classList.toggle("is-set", !!picked); });
      box.querySelectorAll("[data-live-time]").forEach(function(s){ s.textContent = pickedTime ? fmtTime(pickedTime) : "Choose a time"; s.classList.toggle("is-set", !!pickedTime); });
    }

    function pick(d){
      picked = d;
      (grid || strip).querySelectorAll(".cx-day").forEach(function(b){ b.setAttribute("aria-pressed", b.dataset.k === key(d) ? "true" : "false"); });
      rove(); renderSlots();
    }

    function go(step, quiet){
      box.querySelectorAll("[data-step]").forEach(function(s){ s.hidden = s.dataset.step !== step; });
      box.dataset.at = step;
      var when = fmtDay(picked) + ", " + (pickedTime ? fmtTime(pickedTime) : "");
      box.querySelectorAll("[data-summary]").forEach(function(s){ s.textContent = when + " (" + TZ_NOTE + ")"; });
      if (quiet) return;
      var focusTo = box.querySelector('[data-step="' + step + '"] [data-focus]');
      if (focusTo) focusTo.focus({preventScroll:true});
      var r = box.getBoundingClientRect();
      if (r.top < 0) box.scrollIntoView({block:"start", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"});
    }

    if (prev) prev.addEventListener("click", function(){ view = new Date(view.getFullYear(), view.getMonth() - 1, 1); renderMonth(); });
    if (next) next.addEventListener("click", function(){ view = new Date(view.getFullYear(), view.getMonth() + 1, 1); renderMonth(); });
    if (cont) cont.addEventListener("click", function(){ if (pickedTime) go("details"); });
    box.querySelectorAll("[data-back]").forEach(function(b){ b.addEventListener("click", function(){ go("pick"); }); });
    box.querySelectorAll("[data-restart]").forEach(function(b){ b.addEventListener("click", function(){
      var f = box.querySelector("form"); if (f) f.reset(); renderSlots(); go("pick");
    }); });

    var df = box.querySelector('[data-step="details"] form');
    if (df) validate(df, function(data){
      box.querySelectorAll("[data-first-name]").forEach(function(s){ s.textContent = (data.name || "").trim().split(/\s+/)[0] || "there"; });
      box.querySelectorAll("[data-email]").forEach(function(s){ s.textContent = data.email || ""; });
      go("done");
    });

    renderMonth(); renderStrip(); renderSlots(); go("pick", true);
  }

  /* ---------- form validation (booking details step + enquiry form) ---------- */
  var MSG = {
    name: "Please add your name.",
    email: "Please add your email so Dr San can reply.",
    emailBad: "That email doesn’t look quite right. Could you check it?",
    org: "Please add the organisation’s name.",
    message: "Please add a line or two so Dr San knows how to help.",
    fallback: "Please fill this in."
  };
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function errFor(input){
    var field = input.closest(".cx-field") || input.parentNode, id = (input.id || input.name) + "-err";
    var el = field.querySelector(".cx-err");
    if (!el) { el = document.createElement("p"); el.className = "cx-err"; el.id = id; el.setAttribute("aria-live","polite"); field.appendChild(el); }
    var desc = (input.getAttribute("aria-describedby") || "").split(" ").filter(Boolean);
    if (desc.indexOf(id) < 0) { desc.push(id); input.setAttribute("aria-describedby", desc.join(" ")); }
    return el;
  }
  function check(input){
    if (input.disabled || input.closest("[hidden]")) return "";
    var v = (input.value || "").trim(), msg = "";
    if (input.required && !v) msg = input.dataset.msg || MSG[input.name] || MSG.fallback;
    else if (input.type === "email" && v && !EMAIL_RE.test(v)) msg = MSG.emailBad;
    var el = errFor(input);
    el.textContent = msg; el.hidden = !msg;
    if (!msg) input.removeAttribute("aria-invalid"); else input.setAttribute("aria-invalid","true");
    return msg;
  }
  function validate(form, onOk){
    var tried = false;
    var inputs = function(){ return [].slice.call(form.querySelectorAll("input:not([type=radio]):not([type=checkbox]),textarea,select")); };
    form.addEventListener("submit", function(e){
      e.preventDefault(); tried = true;
      var bad = inputs().filter(function(i){ return check(i); });
      if (bad.length) { bad[0].focus(); return; }
      var data = {}; new FormData(form).forEach(function(v, k){ data[k] = v; });
      onOk(data, form);
    });
    form.addEventListener("input", function(e){ if (tried && e.target.matches("input,textarea")) check(e.target); });
    form.addEventListener("focusout", function(e){ if (tried && e.target.matches("input,textarea")) check(e.target); });
  }

  function enquiry(root){
    var form = root.querySelector("form[data-enquiry]");
    if (!form || form.dataset.ready) return;
    form.dataset.ready = "1";
    var done = root.querySelector("[data-done]");

    function sync(){
      var who = (form.querySelector("input[name=who]:checked") || {}).value || "me";
      form.dataset.who = who;
      form.querySelectorAll("[data-when]").forEach(function(g){
        var on = g.dataset.when === who;
        g.hidden = !on;
        g.querySelectorAll("input,textarea,select").forEach(function(i){ i.disabled = !on; });
      });
    }
    form.addEventListener("change", function(e){ if (e.target.name === "who") sync(); });
    sync();

    validate(form, function(data){
      if (!done) return;
      done.querySelectorAll("[data-first-name]").forEach(function(s){ s.textContent = (data.name || "").trim().split(/\s+/)[0] || "there"; });
      done.querySelectorAll("[data-email]").forEach(function(s){ s.textContent = data.email || ""; });
      done.querySelectorAll("[data-for]").forEach(function(s){ s.hidden = s.dataset.for !== form.dataset.who; });
      form.hidden = true; done.hidden = false;
      var h = done.querySelector("[tabindex='-1']") || done; h.focus({preventScroll:true});
      var r = done.getBoundingClientRect(); if (r.top < 0) done.scrollIntoView({block:"center"});
    });
    if (done) done.querySelectorAll("[data-again]").forEach(function(b){ b.addEventListener("click", function(){
      form.reset(); sync();
      form.querySelectorAll(".cx-err").forEach(function(e){ e.textContent = ""; e.hidden = true; });
      form.querySelectorAll("[aria-invalid]").forEach(function(i){ i.removeAttribute("aria-invalid"); });
      done.hidden = true; form.hidden = false;
      var f = form.querySelector("input:not([type=radio]),textarea"); if (f) f.focus();
    }); });
  }

  window.RSRContact = { booking: booking, form: enquiry };
})();
