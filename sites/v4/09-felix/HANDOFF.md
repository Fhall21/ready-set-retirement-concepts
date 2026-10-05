# v4 / 09-felix: locked defaults, fresh start

**What it is.** A clean copy of `sites/v3/09-felix/` taken in October 2026 with every page collapsed to its `default` preset. `sites/v3/` is untouched and remains the lab with all the alternates. v4 is where the launch version is refined from here. Registered in `sites/site-versions.json` as "Site 2" (root `/v4/09-felix/`), next to Site 1 (v3).

**How it was made.** Per page, only the default layout of each slot was kept, renumbered to `slots/<slot>/1.html`, and the rest deleted. Slots that were off in the default are gone (contact `details`, contact `next`, about `mission`), and so are their wrappers in `index.html` (the contact `scroll-margin` rule was trimmed to `#book,#message`). Default copy picks that were b/c/d were written straight into the fragments and removed from `copy.json`, so the default copy is `a` everywhere. `copy.json` keeps only alternates for slots and keys that still exist. `presets.json` has all counts 1 and a single `default`; all `skip` maps are removed. Book buttons still go to `contact/#book` (the booking wrapper carries `id="book"`).

**Retained layout per slot**
- Home: hero 1, monday 1, pause 1, dials 1, speech 1, cover 1, audience 1, practitioner 1, consult 1 (already one layout each in v3).
- Individual (v3 layout to now 1): hero 5, why 6, method 5, get 2, faq 1, cta 5. Copy baked in: hero d, why c.
- Organisation: hero 2 (copy b baked in), problem 5, programmes 7, format 5, proof 4, cta 4.
- About: opening 1, backstory 1, turning 6, values 5, drsan 1, cta 4 (mission dropped).
- Contact: hero 5, booking 1, form 3 (details and next dropped).

**Mixer is hidden by default.** `shared/engine.js` loads `shared/mixer.js` only when the URL has `?mixer` (the inverse of v3, where `?clean` hid it). The bare URL still loads `presets.default`. Inside the mixer, keys (1-9 rows, arrows, P, M) are unchanged. With one layout per slot the mixer's Layout tab only toggles a section on/off, and the Copy tab switches between the remaining alternates (a = default). The dev version bar (`/site-nav.js`) still shows; `?clean` hides it.

**Caveat.** For individual hero and why, and organisation hero, alternates that lack a key now fall back to the baked default text instead of the old `a` text.

**Carried-over TODO(Felix)** (search `TODO(Felix)` in the folder): footer contact details (`shared/footer.html`), contact hero card placeholders, booking widget and confirmation (`contact/slots/booking/1.html`), form wiring (`contact/slots/form/1.html`), about turning/backstory facts, organisation proof, programmes and format placeholders, individual method, get and faq confirmations with Dr San. The v3 HANDOFF's launch notes still apply: remove the dev bar line in `engine.js` and the mixer script for production. Per-page `HANDOFF.md` files are copied from v3 and describe the lab (mixer, skip maps, other presets); treat them as history.
