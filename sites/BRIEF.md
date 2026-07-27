# READY SET RETIREMENT — SHARED BUILD CONTRACT

Read this before building any site. Every one of the 10 concepts obeys this file.
Concept-specific direction lives in `PLAN.md`.

---

## 1. THE CLIENT

**Ready Set Retirement** — Dr Sandra Walden-Pearson ("Dr San"), Far North Queensland, Australia.
Category: **psychosocial retirement education**. Not financial advice. The explicit positioning is
"the yin to financial planning's yang."

Credentials (use sparingly, never as a wall of acronyms):
PhD (Business) · MBA (HR) · BA Dip Ed · Certified Professional Retirement Coach ·
Certified Associate Meta Coach · Certified Resilience Coach · HART Coach ·
Resilience First Aid Responder · Accredited Mental Health First Aider (incl. Workplace) ·
Accredited Cinergy Conflict Coach.

Trademarked phrases — reproduce exactly, including the mark:
- human-centred retirement planning™
- readysetretirement psychosocial planning®

### The two audiences
- **Individuals** — people 3–10 years out from retiring, or already in it and finding it sour.
- **Business** — HR / workforce planners facing Australia's "Silver Tsunami": mastery walking out
  the door, at recruitment, productivity, culture and morale cost.

### The one idea every site must land
> We spend forty years financially planning for retirement and about ten minutes planning
> who we will be when it arrives.

Retirement has a recognised **dark side**: loss of direction, identity, purpose and social
connection. Education de-risks it. That is the whole argument. Money funds lifestyle;
it cannot buy quality of life.

### Real testimonial — usable verbatim, attribute exactly
> "Financial planning for retirement is well known. I hadn't heard about psychosocial education
> focused on human-centred retirement planning — in 30 years of politics. In talking with Dr San
> I realised the critical need to plan for the human side of retirement. With hand on heart,
> I can honestly say that engaging Dr San has been life changing."
>
> **Hon. Warren Entsch** — Former Federal Member for Leichhardt

### Calls to action
Primary: **Complimentary 30-minute consult** → `/contact`
Secondary varies by concept: *Download the readiness map*, *Brief your board*, *Book a workshop*.

### Services
Training · workshops · seminars · 1:1 coaching · group coaching · consulting · speaking.

---

## 2. VOICE

Australian English throughout — **centred, recognised, realise, organisation, programme→program**.
Warm, adult, unsentimental. Dr San is a peer, not a guru.

**Banned**: "unlock", "journey" (as a noun for retirement), "empower your best life",
"golden years", "sunset years", stock-photo optimism, exclamation marks, emoji, em-dash pile-ups,
"in today's fast-paced world", any sentence that could appear on a superannuation brochure.

**Wanted**: short declaratives. Specific nouns. A little bite. The copy should sound like someone
who has watched capable people fall apart six months after their farewell cake and decided to do
something about it.

---

## 3. TECHNICAL CONTRACT — NON-NEGOTIABLE

- **One self-contained `index.html` per site.** Inline `<style>` and `<script>`. No build step,
  no bundler, no framework, no npm. Opening the file in a browser must just work.
- **GSAP 3.12.5 from CDN**, exactly these tags, in this order, before your script:
  ```html
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  ```
  Add `ScrollToPlugin.min.js` / `MotionPathPlugin.min.js` only if your concept needs them.
  **SplitText and ScrollSmoother are premium — do not use them.** Split characters yourself
  with a five-line `wrapChars()` helper.
- **Fonts from Google Fonts only** (`fonts.googleapis.com`), max two families per site.
  **Inter is banned.** Pick per concept from `PLAN.md`.
- **No Tailwind, no CSS frameworks.** Hand-written CSS with custom properties.
- **No external images** unless `PLAN.md` explicitly assigns you one. Build visuals from
  SVG, `<canvas>`, CSS gradients and type. This is a feature, not a limitation — it is why
  these sites will not look like everyone else's.
- No emoji anywhere in code, comments, or rendered output.

### Motion rules
- Every scroll-linked effect uses `ScrollTrigger` with `scrub: 1` (or `scrub: true` for
  frame-accurate scrubs). Never animate on a raw `scroll` listener.
- Anything that pins **must** declare a matching `end` and must not trap the user. Test that
  you can scroll past every pinned section.
- Transform and opacity only for anything running at 60fps. Never scrub `top`, `left`,
  `width`, `height`, `filter: blur()` on large elements, or `box-shadow`.
- `gsap.ticker` / `requestAnimationFrame` for canvas. Canvas must be sized to
  `devicePixelRatio` and re-sized on `resize`.
- **`prefers-reduced-motion: reduce` must be honoured.** Wrap the timeline setup in a check:
  if reduced motion is on, kill the scrubs, show all content in its final state, and let the
  page be an ordinary long-scroll document. A site that is unusable with reduced motion on
  is a failed build.

### Quality floor
- Responsive down to 390px wide. Pinned/horizontal sections should degrade to plain stacked
  vertical sections under 900px unless the concept is explicitly mobile-first.
- Real semantic HTML: one `<h1>`, landmarks, `<button>` for buttons, `alt` on anything meaningful.
- Focus states visible. Contrast at least 4.5:1 for body copy. Decorative canvas gets
  `aria-hidden="true"`.
- No horizontal overflow on the `<body>`. Ever.
- No placeholder text. No `lorem ipsum`. No `TODO`. Every section is finished copy.
- No dead links: `href="#..."` anchors that resolve, or `/contact`.

### Typographic floor
- Body copy 17–20px, line-height 1.5–1.65, measure 60–75 characters. Never full-bleed paragraphs.
- Display type: `clamp()` with a real fluid range. **An `<h1>` must never wrap past three lines
  at any viewport.** Widen the container before you shrink the font.
- One accent colour used with discipline. If you need a second, you probably need better spacing.
- Section rhythm: minimum `clamp(6rem, 12vh, 12rem)` of vertical breathing between chapters.

### The anti-slop check — a build that does any of these is rejected
- Purple-to-blue gradient on a dark hero.
- Three identical rounded cards with an icon, a bold noun and two lines of grey text.
- A pill badge above the h1 saying something like "Trusted by 500+ retirees".
- Glassmorphism used as decoration rather than as a spatial idea.
- Meta-labels like "SECTION 01 / OUR PROCESS".
- Fake logos, fake statistics, invented client names, invented awards.
- Buttons whose text colour matches their background.

Statistics: the Silver Tsunami and the psychosocial risks are real, but **do not invent
numbers with decimal points and attribute them to a body.** Either cite a real, well-known
public fact in general terms ("Australians are retiring at the fastest rate in the nation's
history") or make the point qualitatively.

---

### Brand assets — the real ones
Supplied by the client and held in `previous_resources/assets/` (web-ready derivatives in
`previous_resources/assets/derived/`, distributed into each site's own `assets/`):

- `logo.svg` — the wordmark. Brand purple `#6F3794`, brand gold `#ECC24D` on *set*.
  Recoloured per site so it never arrives as a foreign object in a palette it does not
  belong to: `logo-film.svg` (bone + gold, dark grounds), `logo-solid-purple.svg`
  (light grounds — the gold is unreadable on paper, so it does not appear there),
  `logo-map.svg` (map ink + ochre-deep).

### The colour rule
**Purple is the psychosocial. Gold is the go-signal.** Each site gets one role for each at
most, and only where the role is structural:

| Site | Purple owns | Gold owns |
|---|---|---|
| 01 The Long Light | — (the film's grade is warm; purple would break it) | the whole accent layer |
| 02 Second Horizon | the night sky's cold end | every interactive element |
| 04 Unretired | the inverted chapters, full bleed | the CTA rule — it exists only inside the purple |
| 05 The Quiet Room | the thread, and every link | — |
| 07 Third Act | — (deep red is the roadshow convention) | the distributor mark |
| 08 Vitals | the restored state, and every action | the deficit state, taken down to `#7E600F` to read on cream |
| 09 The Map | the hazard overprint — a genuine second plate | — |
- `drsan.jpg` — studio headshot of **Dr Sandra Walden-Pearson**, plain grey backdrop.
  Genuine photograph, captioned "Dr San — Psychosocial Retirement Educator" on the live site.
- `drsan-office.jpg` — full-length, in the doorway of her home study in Far North Queensland.
  Genuine photograph.

These two may be captioned and alt-texted as Dr San, because they are her. Photographer credit
sits with Frontrow Foto; if any of these sites ships publicly, confirm the licence.

Where photography goes is a judgement, not a checklist. It belongs where a human being is the
subject of the section and nowhere else. Three of the seven sites are built on the premise that
there are no photographs in them at all; putting one in would be vandalism, not warmth.

### Image integrity — hard rule
The photographs in `01-the-long-light/assets/frame-*.jpg` and `05-the-quiet-room/assets/table.jpg`
are AI-generated. The woman in the `01-the-long-light` frames is a
**representative subject, not Dr San**. Never caption, alt-text, imply or lay out any generated
photograph as a portrait of Dr Sandra Walden-Pearson or of any named real person, and never
present one as a documentary photograph of a real client, office or event. Alt text describes
what is depicted in generic terms ("a woman in her sixties at the end of a jetty at sunset").
Dr San is referred to in words only until the client supplies her real photograph.

---

## 4. DELIVERABLE

`sites/NN-slug/index.html` — one file, complete, opens and runs.
If your concept was assigned image or video assets, they are already in `sites/NN-slug/assets/`.

Before you call it done, re-read section 3's quality floor and the anti-slop check, and fix
what fails.
