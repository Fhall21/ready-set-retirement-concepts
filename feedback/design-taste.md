# Ready Set Retirement — design taste brief

For the four page-building agents (Services/Individual, Services/Organisation, About, Contact). Read this before writing any layout or copy. Where a source disagrees with this summary, the source (cited inline) wins — this is a distillation, not a replacement.

Sources: `feedback/v3-vitals-log.md` (rounds 1–5), `feedback/copy-direction.md`, `feedback/RESPONSE_second_round.md`, `feedback/Dr_San_for_Felix.md`, memory `rsr-design-taste.md`/`rsr-not-saas.md`/`rsr-copy-taste.md`, `sites/v3/08-vitals/BRIEF.md`+`HANDOFF.md`, `sites/v3/09-felix/HANDOFF.md`+`presets.json`+`PAGES-PLAN.md`, and the shipped code in `sites/v3/09-felix/index.html` and `slots/{hero,dials,cover,speech,practitioner}/1.html`.

## 1. Overall direction

The site should feel like sitting down with Dr San in person: warm, plain-spoken, competent, unhurried — a one-person professional practice, not a SaaS product (`rsr-not-saas.md`; log round 4, "very B2B SaaS like, trying way too hard"). It should read the way a good health-fund statement or medical report reads: familiar, calm, easy to scan, slightly clinical in its precision but never cold (log round 1 & Dr San's own words, `Dr_San_for_Felix.md` #6 Vitals: "familiar and so less threatening"). It must never feel like a startup landing page, a dashboard demo, a gloomy meditation on ageing/endings, or a puzzle the reader has to decode (`RESPONSE_second_round.md` — The Map: "brilliant, but not a good fit… needs to be stress free"). Audience is 55–65, often on a phone, may arrive stressed, and is less digitally literate than a typical SaaS buyer — simplicity always beats cleverness (`rsr-design-taste.md`).

## 2. Winners vs losers — generalised rules

**Hero (log rounds 4–4c).** Losers: diagram-in-hero hybrids (week tables, "Never reviewed" rows, review cards) — rejected as SaaS-like and for "hammering" the Monday/financial argument before it's earned. Winner: hero 18 — full-height professional photo, name+role line, one headline, one ~12-word support line (her own tagline), one button, one quiet link. **Rule: the hero introduces a person, not an argument. One headline, one button — cut everything else, including a second CTA line.** Do not put the core argument (money vs. the four other vital signs) in the hero; it belongs in the first section below the fold, stated once (`copy-direction.md` rule 1–3, "Leave the argument out of the hero").

**Dials/stat table (log rounds 1–2, Dr San #6).** Losers: speedometer/clock/multi-needle dials, before/after split into two separate blocks with paragraphs between (had to "hold the first set in your head"), a manual toggle switch to reveal the after-state. Winner: one health-stat-style table, "Without a plan / With preparation" columns on the *same* rows, changing in front of you on scroll (not user-triggered). **Rule: state changes must be passive (scroll-driven), never require an interaction to understand a point** (`BRIEF.md`: "No phone user flips a toggle... arrive passively as you scroll"). Also: show the "before" state long enough to register before it flips (round 2 learning 7).

**Cover / comparison table (log round 1, `RESPONSE_second_round.md`).** Losers: SaaS comparison table, self-check/plan-check widgets ("this isn't selling a SaaS product"). Winner: literal health-benefits-statement layout — "Covered / Not covered" rows with a flag mark, report header bar, comment line at the bottom. **Rule: familiar documents work only when they ARE the familiar document — a medical report or health-fund statement, not a stylised imitation of one.**

**Speech/pause moments (log rounds 1–2).** Winner: scroll-scrubbed, pinned, minimal-text sequence that slows down to make a number (e.g. "ten minutes") *felt* rather than stated. **Rule: the best motion creates a feeling, not an effect — one authored motion moment per section, not decoration on every element** (`BRIEF.md` bans "identical fade-up on every element").

**Practitioner (log round 5, `Dr_San_for_Felix.md`).** Winner: photo + first-person bio + the one real testimonial (Warren Entsch) given a full-width pull-quote band with its own background, big serif-scale quote mark, clear attribution — not a carousel. **Rule: real proof gets space and weight; never invent quotes or stats; a carousel demotes a single strong testimonial** (log round 5 learning 21).

**Consult/CTA (log rounds 3 & 5).** Losers: AI-sounding chat bubbles, "well before the date" (deadline pressure), tinted panel behind bubbles. Winner: plain, warm invitation — "Ready to chat?" / a friendly, specific 30-minute chat description; desktop can use a left/right split, mobile a clean stacked version. **Rule: no deadline pressure, no interrogation — invitations are plain and friendly.**

**Audience/organisation link (log round 4, `copy-direction.md` rule 6).** Loser: a lead-in sentence ("Planning for a workforce?") before the link. Winner: a single quiet link ("See workshops for organisations"). **Rule: organisations get a small, early, quiet nudge — never equal billing with the individual, never a lead-in.**

**Titles generally (log rounds 1, 3, 5).** Losers: AI-slop parallelisms ("Same ground, two starting points"). Winner: titles that read as a lived moment ("So here's what that first Monday afternoon looks like"). **Rule: titles must sound like something a person would say, tied to a specific moment, never an abstract device.**

**Colour (`RESPONSE_second_round.md`).** Every dark/sombre/monochrome/aged-paper direction was rejected outright across six of seven concept pages. **Rule: every section is light-grounded; colour is bright and energetic, never dark, brown, grey-blue, or aged cream.**

## 3. The concrete visual system (from `sites/v3/09-felix/`)

**Tokens** (`index.html` `:root`, two palettes via `data-pal`, default `a`):
- Palette A (violet/coral): `--ground:#FFF; --ground-2:#FBF6FF; --ground-3:#F3E7FD; --ink:#211A2A; --ink-soft:#574B66; --brand:#7B2FB5; --brand-deep:#5F1F92; --brand-bright:#9A45DE; --accent:#D91A54; --accent-bright:#FF4F70; --gold:#FFC233`.
- Palette B (orchid/azure): `--ground-2:#F6F8FE; --ground-3:#E9EFFC; --ink:#17203A; --ink-soft:#495271; --brand:#C01B7A; --brand-deep:#9A1461; --brand-bright:#E82F96; --accent:#1F5FE0; --accent-bright:#3B82F6; --gold:#FFB020`.
- `--brand` = prepared/covered/healthy. `--accent` = no-plan/not-covered/low. Never swap these meanings.
- `--rule` / `--rule-strong` = ink at 12%/22% via `color-mix`, for hairlines only.
- Fonts: `--sans: "Schibsted Grotesk"` (weights 400–900, loaded via Google Fonts, italics available), `--num: "JetBrains Mono"` (500/700) — **mono is for numbers/readings only, never body text or labels-as-decoration**.
- `--gut: clamp(1rem,4vw,3rem)` (page gutter), `.wrap{max-width:1240px}`, `--ease-out: cubic-bezier(.16,1,.3,1)`.
- Body text `clamp(1.0625rem, 1rem + .25vw, 1.1875rem)` / line-height 1.55. Headings are bold-to-black (700–800), tight letter-spacing (`-.01em` to `-.02em`), `text-wrap:balance`.
- `.btn`: pill-shaped (`border-radius:999px`), solid `--brand` fill, white text, hover = `--brand-deep` + `translateY(-1px)`.
- Hairline borders (1px `--rule` / `--rule-strong`) delimit report-style tables and cards — never a coloured left-border callout, never a drop/offset shadow.
- Report/table styling pattern (dials, cover): a bordered card (`border:1px solid var(--rule-strong); border-radius:.5–.7rem`), a header bar with a title + meta line in `--num`, rows separated by 1px `--rule`, a flagged/deficit cell tinted with `color-mix(in srgb, var(--accent) 5–9%, transparent)`, a small circular accent badge (`!`) for "not covered/low", uppercase 0.75–0.8rem labels only inside table headers (never as page eyebrows).
- Mobile table pattern: hide `<thead>`, stack rows, inject the column label via `content:attr(data-th)` above each cell.

**Motion (GSAP 3.13 + ScrollTrigger/SplitText/DrawSVG, via jsDelivr CDN):**
- Default state is visible in CSS; animate *from* with `gsap.fromTo`/`immediateRender:true` so failed JS still shows content.
- One authored motion moment per section — not fade-up on every element.
- Patterns actually used: image reveal on load (`scale 1.06→1, opacity 0→1, power3.out, 1.6s` — hero); scroll-triggered bar/fill reveal (`scaleX:0→1` or `width` tween, `power2.out`, `stagger:.06–.07`, `start:"top 78–85%", once:true` — dials, cover rows); pinned scrub timeline for a felt statistic (`ScrollTrigger{start:"top top", end:"+=120%", scrub:.8, pin:true}`, tweening two bar widths + two number counters + a closing line across one timeline — speech); clip-path wipe reveal on a photo (`inset(100% 0 0 0)→inset(0)`, `expo.out` — practitioner).
- Respect `prefers-reduced-motion`: every `slotInit(root, reduced)` must set the final, fully-explained state with `reduced===true` and return before any tween.
- Eases: `power2.out`/`power3.out`/`expo.out` for arrivals, `"none"` for scrubbed timelines. No bounce/elastic.

**Image treatment:** Dr San's portrait (`assets/drsan.jpg`, 980×1470) full-bleed or full-height, `object-fit:cover`, cropped to show her face near the top (`object-position:50% 15–25%`), never a circular avatar (log round 4 learning 16: "give it full height, not a circle").

## 4. Copy rules

- Start with what the reader feels **now**, pre-retirement — never assume they already feel the loss the page is about to argue (`copy-direction.md` rule 1).
- One headline, ≤1 short supporting line (~12 words), one action per block. Don't repeat what the heading/button already says.
- Support line should hint at the work (use Dr San's own tagline language), not restate the pitch.
- Don't lead with or lean on the money comparison; it can appear inside the argument, never as the hook.
- Nudge organisations with one small quiet link, early, never equal billing with the individual reader.
- Warm, unhurried, plain; never salesy, cute, or interrogating; must still read as credible to an HR buyer.
- Her name + role ("Dr San · Psychosocial Retirement Educator") + photo carry trust — use "psychosocial" only in her title, plain words elsewhere.
- Present psychosocial planning as the **complement** to financial planning (the yin to it), never a critique or competitor of it. Winning line: "One pays for the life. The other helps you live it." (log round 5).
- No deadline pressure ("well before the date" was rejected). CTA tone: "Ready to chat?" / "friendly chat", 30-minute not "30min".
- No invented stats, credentials, testimonials, or quotes. Only the Warren Entsch quote exists; treat it with weight, never manufacture more.
- No jargon, no eyebrows/kickers, no uppercase "technical" labels as decoration (mono/uppercase reserved for actual table headers and readings).

## 5. Anti-patterns (hard no's)

- Any SaaS/dashboard/B2B-product framing: hero-metric templates, "Reviewed 1 of 5"-style status labels, review cards, comparison-table-as-marketing-gimmick, self-check/plan-check widgets.
- Speedometers, clocks, multi-needle dials, timelines that need decoding.
- Dark, sombre, monochrome, brown, grey-blue, or aged-cream/paper palettes; gloomy imagery (sunsets, night, empty chairs, black coffee, piers).
- Eyebrows/kickers above headings, section numbers, corner-tick "technical" panels, dot-badge chip credentials.
- Coloured left-border callouts (any side border >1px), gradient text, glassmorphism, emoji/unicode as icons, hard offset drop-shadows.
- Identical fade-up-on-everything motion; any interaction (toggle/switch) required to understand a core point.
- Testimonial carousels for a single real quote; invented quotes, stats or credentials.
- Deadline-pressure language; interrogating or salesy chat copy; AI-slop title parallelisms.
- Pinned scroll sequences longer than ~150vh (stressed readers "hate scroll-jail" — `BRIEF.md`).

## 6. Per-page implications

**Services › Individual** (hero, why/felt moment, method, what-you-get, faq, cta). Hero follows the 09 pattern exactly (person, one line, one button) but can restate the individual angle in the support line. "Why" section is the felt-moment slot (speech-style scroll pacing) restating the vital-signs argument once, plainly — don't re-run the dials/cover mechanics verbatim, but keep their visual language (report/health-stat framing) if a comparison table is needed for "method". FAQ must stay plain-worded, no jargon; CTA follows consult rules (no deadline pressure, "ready to chat").

**Services › Organisation** (hero, problem/workforce, programmes, format/logistics, proof, cta). This audience is HR/board — calm and specific, not cute, per `copy-direction.md` rule 7. Still person-led (Dr San, not a corporate deck): avoid slipping into B2B-SaaS case-study tone. Use the health-stat/report visual language for "problem" (institutional-knowledge loss) rather than corporate infographics. "Proof" = the Warren Entsch quote or none — do not invent client logos/quotes. Palette B (orchid/azure) is documented as "better suited to the HR and board audience" (`RESPONSE_second_round.md`) — consider defaulting this page to `data-pal="b"` if palette is user-selectable per page, but confirm with Felix before hardcoding, since the log doesn't explicitly rule this for the org page.

**About** (opening, backstory pinned chapters, turning point, mission, why/values, credentials, cta). This is the one place sanctioned scroll storytelling belongs (`PAGES-PLAN.md`), echoing the horizontal-scroll "Monday" mechanic Felix liked and asked to reuse (log round 2: "reuse it for another section or page") — pin duration ≤150vh per chapter, `gsap.matchMedia()` to simplify/un-pin on phones. Tone must stay first-person and warm, not a hero's-journey deck; credentials section should follow the practitioner slot pattern (short visible list + `<details>` for the rest, never a badge wall). No dark "turning point" imagery — keep it light-grounded even where the story turns serious.

**Contact** (hero, booking placeholder, details, form, reassurance/faq). Directly extends the consult slot rules: no deadline pressure, "friendly chat" tone, one clear action. Booking placeholder must be marked with an HTML `TODO(Felix)` comment, never fake-populated. Reassurance/FAQ copy plain and short. Keep the same report-card visual restraint (hairlines, no drop shadows) rather than a generic form-in-a-card SaaS look.
