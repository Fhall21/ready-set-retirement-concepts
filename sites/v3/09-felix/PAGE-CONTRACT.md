# 09-felix page contract

How a page agent builds out one of the four skeleton pages (`services/individual/`,
`services/organisation/`, `about/`, `contact/`) using the shared shell. Read this before touching
anything. The shell (nav, footer, CSS tokens, mixer, slot engine) is already built and should not
need changes — if it does, say so rather than forking it per-page.

## Files you own (inside your page folder only)

```
<page>/
  index.html       thin shell — don't add markup here beyond slot wrapper divs
  copy.json        your copy variants
  presets.json     your layout variants + presets
  slots/
    <slot>/
      1.html, 2.html, 3.html[, 4.html]   layout variants for that slot
```

Never edit `shared/*`, another page's folder, or `index.html` (home). If the shell is missing
something you need (a new footer link, a CSS token), ask — don't patch it locally.

## Adding a slot

1. Pick a slot id (e.g. `problem`, `programmes`). In `index.html`, add one wrapper in `<main>`:
   `<div id="problem" data-slot="problem"></div>`. Order in the DOM = order on the page; the engine
   reads slot ids straight from these wrappers, so nothing else needs updating.
2. Create `slots/problem/1.html` — markup + a scoped `<style>` (prefix selectors with a slot-unique
   class, e.g. `.s-problem-*`, so slots never leak styles into each other) + optionally a `<script>`
   that sets `window.slotInit["problem"] = function(root, reduced){ ... }`.
3. Add `problem` to `counts` in `presets.json`: `"problem": 1` (bump as you add variants 2, 3, 4).
   Add it to every preset's `slots` map too (1 = on, 0 = off).
4. That's it. The mixer picks it up automatically (it reads `presets.json` + `copy.json`, not a
   hardcoded slot list).

## Layout variants (3–4 + off)

Add `slots/<slot>/2.html`, `3.html`, `4.html` as alternate layouts for the same slot. Bump
`counts.<slot>` in `presets.json` to the highest number that exists. `0` is always "off" and needs
no file. If a variant number should be skippable without deleting the file (e.g. retired), add it to
an optional `"skip": {"<slot>": [2]}` map in `presets.json`.

## Copy variants (a–d)

`"a"` is never written to `copy.json` — it's whatever text is already in the `.html` fragment.
For each additional variant, add a key to `copy.json`:

```json
{
  "problem": {
    "b": { "h": "Alternate heading", "sub": "Alternate subhead" },
    "c": { "h": "...", "sub": "" }
  }
}
```

`""` hides the element. In the fragment, mark swappable text with `data-copy="problem.h"`,
`data-copy="problem.sub"`, etc. — the key after the dot must match the key in `copy.json`.

## Presets

`presets.json` → `presets.<name> = { name, slots: {<slot>: n, ...}, copy: {<slot>: "b", ...} }`.
`slots` must list every slot in your page (0 = off). `copy` only needs entries that aren't `"a"`.
Aim for 3–4 presets that each tell a coherent story (a "plain and few words" version, a "her words"
version, etc.) — see home's `presets.json` for the pattern.

## GSAP + ScrollTrigger

- Wrap all GSAP setup in `window.slotInit["<slot>"] = function(root, reduced){...}`. The engine runs
  it inside `gsap.context(fn, root)` — **do not create your own context**, and don't register
  ScrollTriggers outside this function.
- `root` is the slot's wrapper element (`querySelector('[data-slot="<slot>"]')`) — always scope
  selectors to `root`, never `document`.
- `reduced` is `prefers-reduced-motion`. Skip motion (or make it instant) when it's true.
- Cleanup is automatic: swapping a slot (mixer, preset, or URL param change) calls
  `ctx.revert()` before loading the new variant, which kills every tween and ScrollTrigger the
  `slotInit` created. You never call `ScrollTrigger.kill()` yourself.
- Scroll-driven pin/scrub sections (About's chapters) are fine — just create the `ScrollTrigger`
  inside `slotInit` as normal. After all slots load, the engine calls
  `ScrollTrigger.sort(); ScrollTrigger.refresh()` once fonts are ready, so triggers land in the
  right page order even though slots load async.

## Relative paths

Your `index.html` sets `window.RSR_ROOT` before `shared/engine.js` loads — the relative path back to
the `09-felix/` folder that contains `shared/`:

| Page | `RSR_ROOT` |
|---|---|
| `services/individual/`, `services/organisation/` | `"../../"` |
| `about/`, `contact/` | `"../"` |

The old `version-nav.js` is retired: do NOT include it. `shared/engine.js` injects the new dev version bar (`/site-nav.js`, bottom-right) on every page automatically.

Don't change these — they're already correct in your skeleton. Everything else you write
(`fetch("slots/...")`, `fetch("presets.json")`, `fetch("copy.json")`) is relative to your own page
and needs no prefix. `shared/site.css`'s `url(...)` references resolve relative to `shared/`, so
assets (`assets/logo-a.svg`) work unchanged from any page depth — don't hardcode asset paths in your
slot CSS; use the existing `--logo` var or `../../assets/...`-style relative-to-your-page paths only
for new images you add under your own page folder.

## Nav + footer + Book links

Every "Book" CTA — nav, footer, and any you add inside a slot — must link to
`{{ROOT}}contact/#book` resolved for your page (e.g. `../contact/#book` from `about/`,
`../../contact/#book` from `services/individual/`). The contact page's booking slot wrapper carries
`id="book"`; don't rename it without updating every Book link site-wide.

## Verifying

Playwright at 1440 and 390: no console errors, no 404s (check Network for `slots/...`, fonts, GSAP
CDN scripts), no horizontal scroll (`document.documentElement.scrollWidth <= window.innerWidth`),
nav dropdown opens/closes (click + click-outside + Escape), all mixer rows for your page work
(Layout and Copy tabs, arrows, presets). Screenshot both viewports before handing back.
