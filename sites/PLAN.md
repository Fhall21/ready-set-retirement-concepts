# TEN SITES — SCENE-BY-SCENE DIRECTION

Ten complete, standalone landing sites for Ready Set Retirement. Each is a different answer to
the same brief. They differ on **three axes at once** — aesthetic, scroll mechanic, and audience —
so the set is a genuine range of options, not one idea in ten costumes.

Read `BRIEF.md` first. It is the contract. This file is the direction.

| # | Site | Aesthetic | Signature scroll mechanic | Audience |
|---|------|-----------|---------------------------|----------|
| 01 | The Long Light | A24 documentary, warm 35mm | Canvas frame-scrub film with letterboxed cinema panel | Individuals |
| 02 | Second Horizon | Kubrick minimal, deep space | Scrubbed celestial arc over a fixed horizon | Individuals |
| 03 | The Handover | Industrial brutalist, declassified | Pinned horizontal career timeline | Business |
| 04 | Unretired | Swiss poster, type-only | Word-by-word kinetic type with polarity inversion | Individuals |
| 05 | The Quiet Room | Warm tactile paper, Kinfolk | Self-drawing SVG thread down the page | Individuals |
| 06 | Tide | Oceanic, deep navy | Canvas wave field driven by scroll velocity | Business |
| 07 | Third Act | 70mm title cards, cream on black | Letterbox aperture opening and closing per act | Both |
| 08 | Vitals | Clinical instrument panel | Scroll-drawn diagnostic chart and risk gauges | Individuals |
| 09 | The Map | Vintage survey cartography | Marker travelling an SVG route via MotionPath | Both |
| 10 | After Hours | Modern lux, gradient mesh | Continuous 24-hour colour-temperature scrub | Business |

Assets already generated (Higgsfield, 10/10 credits spent) sit in each site's `assets/`.
Sites not listed below have no assets and must build every visual from code. That constraint is
the point — six of these ten cannot look templated because there is no template for type,
canvas and SVG doing this job.

---

## 01 — THE LONG LIGHT
**Slug** `01-the-long-light` · **Assets** `assets/frame-01.jpg`, `frame-02.jpg`, `frame-03.jpg`
**Skill lens** `/impeccable` — craft mode.

The flagship. A short film that happens to sell a consult.

**Aesthetic.** Full black page. A single letterboxed cinema panel, 2.39:1, sitting at about 76vw
centred, never full-bleed — the frames are 1376px wide and must not be stretched past their
resolution. Everything outside the panel is `#08070A`. Type is a high-contrast editorial serif
(Fraunces, optical size axis cranked up) against a grotesque for UI (Space Grotesk). Palette
pulled from the frames themselves: `--amber #E8A13A`, `--teal #2E5F63`, `--bone #F2EDE4`.
Permanent film grain overlay — an SVG `feTurbulence` fractal noise at ~6% opacity, animated by
stepping `seed` on a 12fps interval, not 60fps. Subtle vignette. No rounded corners anywhere.

**The mechanic.** Three photographic frames become a film through deliberate cuts, not fake
tweening. The cinema panel pins for roughly 320vh. Inside it, a `<canvas>` cross-dissolves
between the three frames on a scrubbed timeline while simultaneously running a scroll-linked
Ken Burns push — `scale` 1.0 → 1.12 with a slow drift toward the sun's position. Between frames,
the dissolve is fast and hard (0.08 of the timeline) so it reads as a cut, with a one-beat
dip to black at each transition. Draw frames with `drawImage` and cover-fit maths; composite the
outgoing frame with `globalAlpha`. Preload all three and do not start the ScrollTrigger until
`decode()` resolves on all of them.

**Scenes.**
1. **Cold open** (0–100vh). Black. The panel is a thin horizontal line of light, 2px tall,
   centred. Nothing else. On first scroll the line opens vertically into the full 2.39:1 panel
   as the aperture would — `scaleY` from 0.003 to 1 — revealing frame 01 mid-push. Over the top,
   in the black above the panel, one line of Fraunces at `clamp(2.5rem, 6vw, 5.5rem)`:
   *"You have planned for the money."* It holds, then the line below fades up in the black under
   the panel: *"Now plan for the person."*
2. **The walk** (100–220vh). Frame 01 → 02. She is far down the jetty now. Caption in the lower
   black band, small caps, letterspaced: *forty years of planning for a date. About ten minutes
   planning for a life.* The push-in continues across the cut so the motion feels continuous
   even though the frame changed.
3. **The turn** (220–320vh). Frame 02 → 03. She turns to face camera. This is the emotional
   hinge; hold it. Copy sits beside the panel, not over her face: the dark-side argument —
   direction, identity, purpose, connection — as four lines that each fade in at 0.1 opacity
   and scrub to 1.0 in sequence.
4. **Release** (320vh+). Panel unpins and the page becomes ordinary, generous, editorial.
   Two-column: Dr San's positioning against her credentials set as a single justified paragraph
   in 13px small caps, not a list.
5. **Testimonial.** The Entsch quote, full width, Fraunces at 34px, attributed underneath in
   the grotesque. No portrait, no card, no quote-mark graphic.
6. **The two doors.** Individuals / Business as two large hover panels that expand horizontally
   into each other — 50/50 at rest, 65/35 on hover, `flex-basis` transition at 700ms.
7. **Close.** Back to black. The aperture line closes. The CTA is the only thing left lit.

**Reduced motion.** Panel does not pin. The three frames stack vertically as three plain
figures with their captions. It still reads as a photo essay.

---

## 02 — SECOND HORIZON
**Slug** `02-second-horizon` · **Assets** none — all code.
**Skill lens** `/impeccable`.

The counter-argument to "sunset years": the sun does not set, it moves to a second horizon.

**Aesthetic.** Deep space minimal, Kubrick symmetry. Background `#05060A` grading to `#0D1420`
at the horizon line. One accent: a warm white-gold `#FFE9C4` that behaves like a light source,
never like a brand colour. Type is a single family — Instrument Serif for display at enormous
sizes, and its own regular weight for body, no second family. Everything is centred on a strict
vertical axis. Hairline rules at 1px `rgba(255,255,255,.14)`. Enormous negative space; a section
may be one sentence and 90vh of nothing.

**The mechanic.** A fixed full-viewport `<canvas>` behind everything holds three layers:
a star field of ~400 points at three parallax depths, a hard horizon line at 62vh, and a light
body — a soft radial gradient disc. Scroll drives one master value, `t` from 0 to 1, which
controls the disc's position along a **parabolic arc** that dips below the horizon around
`t=0.55` and rises again to a second, higher position by `t=1`. Sky colour, star opacity and the
horizon glow all interpolate off the same `t`. One ScrollTrigger on the whole document with
`scrub: 1.2` writing to a single object; the canvas RAF loop reads it. Do not create ten triggers.

**Scenes.**
1. **First light** (t 0–0.15). Disc high and warm. Centred: *"They call it the sunset years."*
   The word *sunset* is set in italic and is the only italic on the site.
2. **Descent** (t 0.15–0.5). The disc visibly falls as you scroll. Copy tracks it down the page,
   each line entering at low opacity and resolving: the losses. Direction. Identity. Purpose.
   Connection. Sky darkens measurably; stars come up. This should feel genuinely unsettling.
3. **Below the line** (t 0.5–0.62). Full dark. Stars at maximum. A single centred line in the
   near-black: *"For a lot of people, this is the part nobody planned."* Hold it for 60vh of
   nothing. The bravest moment on the site is the empty space after that sentence.
4. **The second horizon** (t 0.62–0.85). The disc rises — but from a different point on the arc,
   and it rises higher. Copy: education as the thing that moves the horizon. Dr San's method.
5. **Full light** (t 0.85–1). Sky at its warmest of the whole page, warmer than the opening.
   Services listed as a plain numbered list in the serif, no cards. Entsch testimonial.
   CTA is a single outlined button, generous padding, that fills with the warm white on hover.

**Reduced motion.** Canvas renders one static mid-arc composition. Content is a normal document.

---

## 03 — THE HANDOVER
**Slug** `03-the-handover` · **Assets** `assets/empty-office.jpg`
**Skill lens** `/industrial-brutalist-ui` then `/impeccable` for the pass.

For HR directors and workforce planners. Cold, factual, slightly confronting. This is the one
that gets forwarded to a board.

**Aesthetic.** Declassified operations document. `#0A0A0A` on `#E4E1DA` for the light sections,
inverted for the dark. Monospace throughout — JetBrains Mono for data and labels, Archivo
Condensed for headlines set enormous and tight (`letter-spacing: -0.03em`, `line-height: 0.86`).
Signal orange `#FF4A17` used only on genuinely critical items, maybe six times on the whole page.
Visible 12-column grid — actual hairlines drawn as a fixed background layer so the structure
is exposed, not implied. Rules, brackets, index numbers, registration marks. Boxes with 1px
borders and no radius. The single photograph is desaturated further with CSS and sits in a
bordered frame with a caption in 11px mono beneath it, like a document plate.

**The mechanic.** A pinned **horizontal** section: a career timeline running 1985 → 2035 that
translates on the x-axis as you scroll vertically, pinned for ~400vh. Along it, event markers
rise as you pass them. The last third of the track is drawn in orange and labelled
`UNPLANNED — PSYCHOSOCIAL EXPOSURE`. Implement with a single ScrollTrigger, `pin: true`,
`scrub: 1`, animating `x` on the track by `-(track.scrollWidth - innerWidth)`. Under 900px it
becomes a normal vertical list — do not try to make horizontal scroll work on a phone.

**Scenes.**
1. **Header block.** Not a hero. A document header: title left, a right-aligned block of
   `CLASSIFICATION / SUBJECT / PREPARED BY / DATE` in mono. The h1 is
   *"MASTERY IS LEAVING THE BUILDING."*
2. **Plate 01.** The empty-office photograph, framed, captioned
   *`FIG. 01 — Corner office, 18:40. Thirty-one years of institutional knowledge, boxed.`*
3. **The exposure.** Four numbered findings in a strict two-column grid: recruitment cost,
   productivity, culture, morale. Numerals set at 120px in Archivo Condensed, text beside them
   at 16px mono. No icons. No cards.
4. **The timeline.** The pinned horizontal section described above.
5. **The intervention.** What psychosocial retirement education actually is, laid out as a
   spec sheet: two columns, dotted leader lines between term and definition.
6. **Attestation.** The Entsch quote set as a document exhibit — bordered box, mono attribution
   block beneath with his full title.
7. **Action block.** Full-bleed orange. Black text. `BRIEF YOUR BOARD` / `30 MIN / NO FEE`.

**Reduced motion.** Timeline becomes a vertical list of dated entries.

---

## 04 — UNRETIRED
**Slug** `04-unretired` · **Assets** none — type only. Not one image, not one icon.
**Skill lens** `/design-taste-frontend` (the taste skill).

The most ambitious formal exercise in the set. A landing page made entirely of words moving.

**Aesthetic.** Swiss poster maximalism. Two states only: black on `#F5F3EF`, and its exact
inversion. The page flips polarity three times, hard, at chapter boundaries — no crossfade,
a 120ms cut. Type is Bricolage Grotesque for display (its variable width axis is the whole
design system) and nothing else; body copy is the same family at 400. Display sizes are absurd
on purpose: `clamp(3.5rem, 13vw, 15rem)` with `line-height: 0.82`. Words break the viewport
edges deliberately — a heading may be clipped at the right margin and that is correct.

**The mechanic.** Character-level kinetic typography. Write a `wrapChars(el)` helper that
splits text nodes into `<span class="ch">` (SplitText is premium — do not use it). Then:
- **Word swap:** a fixed line where one word is a stack of five words; scrub `yPercent` on the
  stack so the sentence rewrites itself as you scroll. *"Retirement costs you your ___"* →
  direction / identity / purpose / status / people.
- **Opacity scrub:** paragraph characters from 0.12 to 1.0 in a stagger tied to scroll position.
- **Polarity inversion:** at three points, a ScrollTrigger toggles a class on `<html>` that
  flips two custom properties. Everything on the page is defined in terms of `--ink` and
  `--paper`, so the whole site inverts in one line.
- **Weight axis scrub:** on the final headline, scrub `font-variation-settings` wdth/wght as
  the section passes. This is the payoff — the word physically thickens.

**Scenes.**
1. **UNRETIRED** at full viewport width, characters entering on a stagger from `yPercent: 110`.
2. **The word swap** described above, pinned for 250vh.
3. *Invert.* Dark chapter: the dark side. One long paragraph, opacity-scrubbed, no other element.
4. *Invert.* Light chapter: what education does. Set as a numbered list where the numerals are
   the display size and the text is small — the reverse of the expected hierarchy.
5. **Entsch quote** as the largest type on the page, broken across five lines, attribution tiny.
6. *Invert.* Final chapter: the weight-axis headline, then the CTA as plain underlined text
   at display size. No button. The link *is* the design.

**Reduced motion.** All characters at final state, no inversion animation, no pinning. It becomes
a beautifully typeset static poster site, which it should be anyway.

---

## 05 — THE QUIET ROOM
**Slug** `05-the-quiet-room` · **Assets** `assets/table.jpg`
**Skill lens** `/impeccable`.

The gentlest of the ten. For the person already six months in and quietly not coping.

**Aesthetic.** Paper and linen. Background `#F7F4EE` with a very subtle repeating SVG fibre
texture. Ink is `#2B2A26`, never pure black. Accents: clay `#B4694E`, sage `#7C8B72`, used at
low saturation. Type: Newsreader for everything, with `font-optical-sizing` doing real work —
display at optical size 40, body at 14. Generous measure, 66 characters. Wide margins; content
occupies about 58% of viewport width on desktop and is offset left, with the right column
reserved for marginalia set in 13px italic — like notes in a book. Nothing has a shadow.
Nothing has a border radius above 2px.

**The mechanic.** A single continuous **thread** — one SVG path, hand-authored bezier, running
the entire height of the document down the left margin, weaving past each section. It draws
itself with `stroke-dasharray`/`stroke-dashoffset` scrubbed to scroll. At each section it passes,
it makes a small knot (a tight loop in the path) and the section's content fades up. Sub-mechanic:
paragraphs use a slow `y: 24 → 0` with opacity, `scrub: 1.5`, so reading feels like the page is
settling rather than performing. The photograph appears once, at the emotional centre, and is
revealed by a `clip-path` inset that opens from the centre — no scale, no parallax.

**Scenes.**
1. **Opening.** No hero. Just a line of text 40vh down the page, as if a book has been opened
   mid-chapter: *"The farewell cake was in March."*
2. **Recognition.** Three short passages, each a paragraph, describing the actual texture of
   psychosocial loss — Monday morning with nowhere to be, the friendships that were structural
   rather than chosen, being introduced without a job title. This is the most important writing
   on any of the ten sites. It must be specific and true and must not console prematurely.
3. **The photograph.** Full-measure, clip-path reveal. Caption in the margin.
4. **The turn.** *"None of this means the decision was wrong. It means it was unaccompanied."*
5. **What Dr San does.** Written as prose, not features. The services appear as a sentence
   listing them, with each service name underlined as a link.
6. **Entsch quote,** set small and quiet, in the margin position — deliberately understated here
   because loudness would break the room.
7. **Close.** A single line and a text link. *"There is a version of this that is good. It takes
   preparation and it takes time, and there is enough of both."*

**Reduced motion.** Thread renders fully drawn. Everything visible.

---

## 06 — TIDE
**Slug** `06-tide` · **Assets** none — canvas.
**Skill lens** `/overdrive` then `/impeccable`.

The Silver Tsunami, argued as an oceanographic fact rather than a scare metaphor.

**Aesthetic.** Deep water. `#04121C` → `#0A2A3D` → foam `#DCEAE8`. One warm accent, a buoy
orange `#F2762E`, used exclusively for the things that are *at risk*. Type: Chivo for display
(wide, confident, slightly technical) and Chivo Mono for figures. The whole page is composed
in horizontal bands like water strata, each band a different depth of blue, and content sits
on the band boundaries.

**The mechanic.** A fixed full-viewport `<canvas>` running a summed-sine wave field — six
sine components at different frequencies, amplitudes and phase speeds, rendered as filled paths
with three overlapping translucent layers for depth. Two scroll-derived inputs:
`amplitude`, tied to scroll **position**, and `chop`, tied to scroll **velocity** (read from
ScrollTrigger's `getVelocity()`, smoothed with a lerp) — so scrolling fast makes the water
genuinely rough and stopping lets it settle. That feedback loop is the whole delight of this site.
The waterline itself moves up the viewport as you scroll: sections above the line are "above
water" and legible; as the line rises past a section, the section's text takes on a subtle
`text-shadow` blur and colour shift as though submerged. Do the submersion with a CSS custom
property driven by one ScrollTrigger per section, not per element.

**Scenes.**
1. **Calm.** Waterline low. *"Australia is retiring faster than it ever has."* Wide, calm, flat.
2. **The swell.** Waterline rises. The workforce argument. Numbers set in Chivo Mono at large
   size as the water climbs toward them.
3. **Submerged.** Waterline crosses a full section — the section about lost institutional
   knowledge is literally underwater and slightly harder to read. Deliberate. It gets legible
   again as the line passes. Never let contrast drop below 4.5:1 even at maximum submersion —
   tune the effect to be felt, not to actually obstruct.
4. **Depth chart.** A vertical scale down the side showing depth in years to retirement,
   with markers for the workforce cohorts.
5. **The keel.** What preparation does — the water does not stop, the vessel changes.
   This section sits on the deepest band and is the only one with the orange accent on its CTA.
6. **Surface.** The page resolves back above the waterline: Entsch quote, CTA, footer, calm water.

**Reduced motion.** Canvas draws one still, calm wave state. No submersion effect.

---

## 07 — THIRD ACT
**Slug** `07-third-act` · **Assets** none — pure code, and that is the point on a cinema site.
**Skill lens** `/impeccable`.

The site as a film in three acts, built entirely from title cards.

**Aesthetic.** 70mm roadshow presentation. Pure `#000` field, cream `#EDE6D6` type, a single
deep red `#8C1D18` for act numerals. Display type is Playfair Display at very large sizes with
tight tracking; everything else is Cormorant Garamond. Centred, symmetrical, patient. Real
letterboxing: fixed black bars top and bottom whose height animates. A projector flicker —
a very subtle opacity oscillation on a full-screen white overlay at extremely low alpha,
driven by a sine on the ticker at ~4Hz, never more than 0.015 alpha. Optional 4-perf sprocket
hairline detail down both far edges.

**The mechanic.** The **aperture**. Fixed letterbox bars whose height is scroll-scrubbed.
At act boundaries the bars close fully to black (a wipe to black between acts) and reopen on
the next act's title card. Within acts, the aperture ratio changes: Act I plays at 1.85:1,
Act II squeezes to a claustrophobic 2.76:1 as the argument gets darker, Act III opens to a full
1.33:1 — the frame literally gets more room to breathe as the story resolves. That ratio change
carrying the emotional arc is the idea. Each act's content is a set of title cards that
cross-fade on scrub, one card visible at a time, centred, like intertitles.

**Scenes.**
- **Main title.** `READY SET RETIREMENT` letterspaced across the full width, then, beneath,
  small: *A film about the part nobody rehearses.* Bars open from full black.
- **ACT I — THE PLAN.** Red numeral `I`. Cards: the forty years of financial planning.
  Confident, wide, 1.85:1.
- *Bars close. Black. Two beats.*
- **ACT II — THE DROP.** Numeral `II`. Aperture squeezes to 2.76:1 over the act. Cards get
  shorter and starker: the four losses, one word per card. This is the tightest, quietest part
  of the site.
- *Bars close. Black.*
- **ACT III — THE WORK.** Numeral `III`. Aperture opens wide to 1.33:1. Cards on what education
  does, then Dr San's credentials as a single elegant card.
- **Testimonial** as a full-screen intertitle, the Entsch quote in Playfair at 42px.
- **End credits.** An actual slow-scrolling credit roll — services, formats, contact — that
  auto-scrolls at a fixed rate when it enters the viewport but which the user can override by
  scrolling. Ends on the CTA as the final card.

**Reduced motion.** Fixed 1.85:1 bars, no aperture animation, cards all visible in sequence,
credit roll static.

---

## 08 — VITALS
**Slug** `08-vitals` · **Assets** none — SVG and canvas.
**Skill lens** `/design-taste-frontend`.

Retirement readiness rendered as a medical instrument. Precise, cool, slightly clinical —
which reframes psychosocial risk as a health matter rather than a feelings matter. That reframe
is the strategic bet of this concept and it is aimed squarely at people who distrust soft language.

**Aesthetic.** Instrument panel. `#0C0F0E` ground, `#E9F1EE` type, mint signal `#4FD1A5`,
alert amber `#F5B841`. Type: IBM Plex Sans and IBM Plex Mono. A 4px baseline grid enforced
visibly — hairline horizontal rules every 32px behind panels at 4% opacity. Panels have 1px
borders, tiny corner ticks, and 10px mono labels in the top-left of each. Numbers everywhere,
all real or clearly qualitative — no invented precision.

**The mechanic.** Scroll-drawn diagnostics:
- **The trace.** A long ECG-style SVG polyline running across a pinned panel, drawn by
  `stroke-dashoffset` scrub. It is steady and regular for the working-life portion, then at
  the retirement date it goes flat for an uncomfortable stretch, then recovers into a different
  but healthy rhythm once "education" is applied. One path, three characters. Author the points
  by hand so the shape is intentional.
- **Gauges.** Four radial gauges (SVG arcs, `stroke-dasharray` on a circle) for direction,
  identity, purpose, connection. Each fills on scroll into view — but they fill *downward* to
  a deficit first, which is unsettling and correct, then a second scroll section refills them.
- **Readout.** A monospace counter that counts as you scroll, using a scrubbed tween on an object
  with `onUpdate` writing `textContent`. Count years, not fake percentages.

**Scenes.**
1. **Intake.** A panel header like a chart: `SUBJECT / PRESENTING / ASSESSMENT`. h1:
   *"Financial readiness is one vital sign. It is not the only one."*
2. **The trace,** pinned, as described.
3. **Four deficits.** The gauges, filling to deficit. Each with two lines of plain clinical copy.
4. **Differential.** A two-column comparison: what financial planning covers versus what it
   does not. Set as a real table with hairline rules. Tables are underused and correct here.
5. **Intervention.** Gauges refill. The mint accent appears for the first time in volume.
6. **Practitioner.** Dr San's credentials genuinely suit this aesthetic — set them as a
   credentials panel in mono, one per line, right-aligned. The one place a list is correct.
7. **Referral.** Entsch quote as a case note. CTA panel: `BOOK ASSESSMENT — 30 MIN — NO FEE`.

**Reduced motion.** All traces drawn, all gauges at final value.

---

## 09 — THE MAP
**Slug** `09-the-map` · **Assets** none — SVG.
**Skill lens** `/impeccable`. Requires `MotionPathPlugin` (free).

Retirement planning as a survey — you are here, the ground ahead is mapped, here is the route.

**Aesthetic.** Vintage Australian survey map. Paper `#EDE4D3` with a printed-ink feel, contour
lines in ochre `#B08243` at 1px, water in a faded `#8FA9A4`, ink `#2F2A22`. Type: Sora for
labels set in small caps with wide letterspacing, and Spectral for body — like a map legend and
its explanatory notes. Everything is annotated: grid references, scale bars, a north arrow,
elevation figures. A legend box in a corner that is actually functional and lists the site's own
sections as map features.

**The mechanic.** A hand-authored SVG route path crossing a topographic field. A marker travels
that path via `MotionPathPlugin` with `align` and `autoRotate`, scrubbed to page scroll. The map
container is pinned and pans/zooms — translate and scale the SVG viewport group so the marker
stays roughly centred while the terrain moves beneath it, which is far more convincing than
moving a dot across a static map. Waypoints along the route each trigger a pin-drop annotation
that draws a leader line out to a text block. Contour lines are generated: a JS loop emitting
~40 `<path>` elements from a seeded noise function, so the terrain is real geometry rather than
a decorative background.

**Scenes.**
1. **Legend / cover.** The map sheet's title block: *READY SET RETIREMENT — SHEET 1 OF 1*,
   scale, north arrow, and the h1 set as a map title.
2. **YOU ARE HERE.** Marker at origin, on solid mapped ground: the working life.
3. **The edge of the survey.** The route crosses into a region where contour lines stop and the
   paper is blank, labelled in the old cartographic manner: *UNSURVEYED*. That is retirement
   without psychosocial planning, and it is the strongest single image in the whole set of ten.
4. **Four hazards** as annotated map features along the blank region — direction, identity,
   purpose, connection — each with a pin drop and leader line.
5. **The surveyed route.** The route re-enters mapped ground; contours resume; waypoints are now
   labelled with Dr San's services as stations.
6. **Trig station.** Dr San's credentials as a survey marker plaque.
7. **Destination.** Entsch quote as an annotation. CTA as a stamped block on the map margin.

**Reduced motion.** Marker at the end of the route, all annotations visible, no pinning or pan.

---

## 10 — AFTER HOURS
**Slug** `10-after-hours` · **Assets** none — CSS and canvas gradients.
**Skill lens** `/high-end-visual-design` then `/impeccable`.

The expensive-looking one. Modern, soft, confident — the site that would sit comfortably next to
a private bank. Aimed at business, and specifically at the person who has to sell this internally.

**Aesthetic.** Gradient mesh done properly, which means: no purple-to-blue, no glass cards, no
neon. A slow-shifting mesh of four soft radial gradients whose colours are a full 24-hour
temperature ramp — 05:40 cool blue-violet, 09:00 pale gold, 13:00 near-white warm, 18:20 amber,
21:00 deep ink. Surfaces are near-white `#FAF9F7` or near-black `#0B0B0D` depending on the hour,
so the page's own light/dark state changes with the scroll. Type: Instrument Sans for everything,
with weight and size doing the hierarchy, plus generous `letter-spacing: -0.02em` on display.
Real depth via long, very soft, very low-opacity shadows — `0 40px 80px -20px rgba(0,0,0,.18)` —
never a hard drop shadow.

**The mechanic.** One master scroll value drives a **colour temperature scrub** across the whole
document. Every colour on the page is a `color-mix()` or an interpolated custom property fed from
that single value, updated on a scrubbed tween writing CSS custom properties on `:root`. So the
page moves continuously from pre-dawn to night across its full length, and the text colour,
surface colour, shadow colour and mesh all move together — one system, not ten effects. Add a
clock in the corner, mono, that reads the current scrubbed hour. Secondary mechanic: a magnetic
cursor on interactive elements (translate toward pointer with a lerp, capped at 8px) and
scroll-linked card stacking where three panels overlap and separate.

**Scenes.**
1. **05:40.** Cool, dark, quiet. *"Your most experienced people are already thinking about it."*
2. **09:00.** The page lightens into full day. The business case: pipeline, mastery, cost.
3. **13:00.** Brightest, most confident section. What the programme is — the three stacking
   panels: training and workshops, coaching, consulting and speaking.
4. **18:20.** Warm amber. The human argument, softer register. Dr San's positioning.
5. **21:00.** Deep ink, near-black surfaces. Entsch testimonial in the dark, with the mesh very
   dim. Then the CTA, which is the brightest object on the page at its darkest moment.
6. **Footer** at full night. Clock reads 21:00. Nothing else moves.

**Reduced motion.** Fix the temperature at 13:00, static mesh, no cursor magnetism, no stacking.

---

## HUB

`sites/index.html` — a gallery that opens all ten. Neutral, dark, editorial; it must not compete
with the work. A ten-row list, each row: number, name, one-line aesthetic description, mechanic,
audience. On hover the row expands and a live `<iframe>` preview of that site loads lazily at
0.25 scale. Rows link through. Also carries a short note on the constraint set — no build step,
no frameworks, ten sites, one shared brief — because the constraint is part of the pitch.
