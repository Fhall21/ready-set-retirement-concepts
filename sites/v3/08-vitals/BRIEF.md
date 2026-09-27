# Vitals v3 — brief for slot variants

Read fully before writing a line. The art director will reject work that breaks these rules.

## What this page is
Ready Set Retirement — Dr San (Dr Sandra Walden-Pearson), psychosocial retirement educator, Far North Queensland. Audience: people 3–10 years from retirement (often 55–65, often reading on a phone, may arrive **stressed**), plus HR planners. The page argues: money is one vital sign; four others (Direction, Identity, Purpose, Connection) leave on the same afternoon you retire. Preparation puts them back. CTA: a free 30-minute consult.

Reference: `sites/v2/08-vitals/index.html` has all the copy. Reuse its words. Copy is not the priority; do not invent claims, stats, or testimonials.

## Latest review verdicts — READ FIRST
`feedback/v3-vitals-log.md` (repo root) holds every round of Felix's verdicts and the learnings. They override anything below where they conflict.

## What the client (Dr San) told us — hard constraints
Loved: **the four dials** ("simplicity in the visuals… so many words captured"), **the covered / not-covered table** ("looks like a health benefits table… easy to read"), the **dashboard feel** ("familiar and so less threatening"), strong **vertical sequence**.
Rejected across the other sites — never repeat:
- Dark, sombre, dreary, monochrome, grey-blue, brown, aged cream/paper. Every section is light-grounded. Colour is energetic, from the tokens.
- "Takes too much thinking" (the Map). No puzzles, no legends to decode, no dense apparatus. One idea per viewport.
- Gloomy imagery/metaphor: sunsets, night, piers, endings, empty chairs, black coffee.
- Pretension (the "hipster" film Third Act). Plain, warm, business-like.
- Static and stale. It must feel alive — but the motion must *explain the argument*, not decorate.

## Our own critique of v2 (the "AI slop" we are removing)
- **The No plan / With preparation button switch.** No phone user flips a toggle to understand a point. The point must arrive **passively as you scroll**. Interaction may be a bonus, never a requirement.
- Uppercase-mono labels everywhere as a "technical" costume (eyebrows, `sec-head` "The four — Move the switch", "Intake", corner ticks). **Banned: eyebrows/kickers above headings, section numbers, corner-tick panels.** Mono (`var(--num)`) is for numbers and readings only.
- Four identical boxed cards of dial+heading+text. Dials should be instruments, not cards. No card-in-card.
- `border-left: 3px` callout. Banned (any coloured side border >1px).
- Identical fade-up on every element. Banned. **One authored motion moment per slot**, everything else is already visible.
- Dot-badge chips for credentials. Tired.
- Also banned: gradient text, glassmorphism, emoji/unicode as icons, hero-metric template (big number + small label + stats row), soft-shadow rounded rectangles as filler, hard offset shadows.

## Slot contract (technical)
Each variant is ONE file: `sites/v3/08-vitals/slots/<slot>/<n>.html`. It is a fragment injected into `index.html` (read it — shared tokens, fonts, `.wrap`, `.btn` live there). Structure:
```html
<section class="s-<slot>-<n>"> ...markup... </section>
<style> /* every selector prefixed with .s-<slot>-<n> — no global selectors */ </style>
<script>
window.slotInit["<slot>"] = function(root, reduced){
  // gsap, ScrollTrigger, SplitText, DrawSVGPlugin are loaded & registered (GSAP 3.13).
  // Runs inside gsap.context(root): all tweens/ScrollTriggers auto-revert on swap. Query via root.querySelector.
  // Add plain event listeners? return nothing; use gsap.context-safe patterns or root-scoped listeners.
  if (reduced) { /* set final/explanatory state, no motion */ return; }
};
</script>
```
- Use tokens only: `--ground --ground-2 --ground-3 --ink --ink-soft --brand --brand-deep --brand-bright --accent --accent-bright --gold --rule --rule-strong --sans --num --gut --ease-out`. Must look right in both palettes (A violet/coral, B orchid/azure — `data-pal` on html). **Accent = "no plan / not covered / deficit"; brand = "prepared / covered".**
- Photo: `assets/drsan.jpg` (980×1470 portrait). Logo in masthead already.
- No new libraries. No external requests beyond what index.html loads.
- Must work at **390px** width first, and 1440px. No horizontal scroll. Tap targets ≥44px.
- `prefers-reduced-motion`: the `reduced` arg — show the final, fully-explained state.
- Content must be visible if JS fails is nice-to-have; must never be stuck invisible after the animation.

## GSAP craft rules
- Default state visible in CSS; animate *from* via gsap (`gsap.from`/`fromTo` with `immediateRender`), so failures degrade to visible.
- `ScrollTrigger` with `scrub: 0.6–1` for scroll-told stories; `pin: true` only when the pinned content is the story, and **pin duration ≤ ~150vh** (stressed readers hate scroll-jail). Use `gsap.matchMedia()` to give phones a simpler (often un-pinned) version.
- Eases: `expo.out`/`power3.out` for arrivals; `none` for scrubbed timelines. No bounce/elastic.
- Use `invalidateOnRefresh: true` on anything using measured sizes.
- Reach past opacity/translate where it earns it: `clip-path` wipes, `DrawSVG` strokes, SVG needle rotation (`rotation` + `svgOrigin`), number tweens with `snap`, `SplitText` by lines/words (sparingly — max once per page).
- 60fps: transform/opacity/clip-path; no layout-thrashing properties in scrubs.

## Taste bar
Think: a beautiful medical-device UI meets an Australian health-fund statement, rendered by a top studio. Confident type scale (Schibsted Grotesk, weights 400–900), generous whitespace, one strong colour moment per section, precise hairlines. Warm and bright, never cutesy. Each variant must be **distinctly different in concept** from its siblings — not the same layout recoloured.

## Deliverable
Write the variant files. Then self-check by serving `sites/` (`python3 -m http.server 8765` from `sites/`, already may be running) and loading `http://localhost:8765/v3/08-vitals/?<slot>=<n>` — use the `/browse` skill for screenshots at 390 and 1440 if available. Fix what you see once. Report: file paths + one line per variant describing its concept. Under 200 words.

## Copy variants (data-copy contract)
- Tag swappable text with `data-copy="<slot>.<key>"` (e.g. `hero.h1`). The text in the fragment is copy variant `a`, the fallback.
- Other variants live in `copy.json`: `{ "<slot>": { "<variant>": { "<key>": "text or small inline html" } } }`. Missing keys keep the fragment text; `""` hides the element. Directions are described under `_directions`.
- Layout variants of a slot that share structure use the same keys, so one copy variant fits all of them.
- URL: `?c_<slot>=<variant>` (e.g. `?c_hero=b`). Presets may carry a `copy` map next to `slots`.
- Copy is applied after injection and before `slotInit`, so SplitText and friends see the new words. Don't put bare `data-copy` attributes to other uses (dials 3's bare `data-copy` is ignored because it has no dot).
