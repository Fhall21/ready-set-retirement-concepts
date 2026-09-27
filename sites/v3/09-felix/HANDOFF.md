# 09 Felix — handoff

**What it is.** The standalone Ready Set Retirement page built from Felix's picks in the 08-vitals lab (`?preset=felix`, 27 Sep 2026). Open `sites/v3/09-felix/` with no URL params and you get that page. 08-vitals stays as the lab with every variant.

**How it was made.**
- Each section keeps only the layout Felix picked, renumbered to `slots/<slot>/1.html`: hero 18, monday 1, pause 2, dials 4, speech 1, cover 3, audience 4, practitioner 3, consult 3. Method and thread are dropped because they were off in the felix preset.
- Felix's copy picks are written straight into the fragments, so they are the default text ("a").
- `copy.json` keeps only the alternates that still fit these layouts: `plain`, `words`, and `built` (the 08 wording from before the copy rounds). Every alternate is a full set, so switching one back and forth is lossless.
- `presets.json` has `default` (Felix's page), `plain` and `words`. All counts are 1.
- The mixer has one row per section. The Layout tab switches each row between 1 and off, and the Copy tab starts at `a`. Keys: 1–9 pick a row, ←/→ cycle it, P cycles presets, M hides the panel. `?clean` hides the mixer.
- The footer is written for the live site: brand, practice line, Explore links, Services, a booking call to action, a plain disclaimer (not financial, legal, medical or counselling advice; Lifeline 13 11 14), and the copyright line.

**TODO before launch.**
- Contact details: Dr San's email, phone and ABN. None were in the reference material, so none are shown. There is one `TODO(Felix)` HTML comment at the top of the footer.
- Booking link: all "Book" buttons point to `#consult`. Point them to `/contact` or the booking tool once it exists, including the consult section's button.
- The GSAP scripts are loaded from the jsDelivr CDN, and the dev version bar is `/site-nav.js`, injected by `shared/engine.js` (versions listed in `sites/site-versions.json`). Remove that line and the mixer script for production.
