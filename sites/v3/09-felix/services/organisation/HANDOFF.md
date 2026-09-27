# Services › Organisation — handoff (27 Sep 2026)

URL: `http://localhost:8766/v3/09-felix/services/organisation/` (trailing slash matters).

## Slots (order on page)
| Slot | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| hero | Home hero 18 pattern (full-height photo left) | Text left, framed portrait plate right | Portrait fills right, fades into light ground | Type-led, small portrait by her name |
| problem | Staff exit checklist report (Arranged / Not arranged) | Health-stat table, "without" then "with preparation" fill on scroll | Felt moment: Friday 3 pm farewell → Monday 9 am (pinned 110vh on desktop, no pin on phones) | Plain editorial: three reasons it matters to the organisation |
| programmes | Schedule table (programme / who / length / group) | Editorial list, rules draw in | Workshop featured, others listed beside | Grouped by who you want to reach |
| format | Run sheet (line draws down the times) | Work-calendar day view, blocks to scale | Before / on the day / after | The all-staff invitation email |
| proof | Warren Entsch pull-quote band | Split: "life changing" line large, full quote beside | Dr San bio + real qualifications + quote | One line, centred, full quote in a "Read his full words" toggle |
| cta | Centred, ring draws round the button | Coloured band, split | Portrait beside the invitation | — |

Copy variants (`copy.json`): a = plain and warm (in the fragments), b = plain and few, c = Dr San first person, d = the HR brief. Keys are shared across layouts, so any copy works with any layout.

## Presets (`presets.json`)
1. **default**: Recommended: plain and practical. Palette B. Report → list → run sheet → quote.
2. **felt**: A felt Monday, fewest words. Palette A.
3. **her**: In Dr San's words. Palette A.
4. **hr**: The HR brief. Palette B.

Palette: each preset has a `"pal"` field. The engine ignores it, so a small script in this page's `index.html` applies it when you pick a preset from the mixer dropdown or open `?preset=<name>`, and writes `?pal=` into the URL. An explicit `?pal=` always wins, and the mixer's A/B buttons still work. The P-key preset cycle does not change the palette.

## TODO(Felix): all are HTML comments in the slot files
- Programme lengths, group sizes, "on site or online" and the run-sheet times and session names are placeholders built from the site's own themes. Replace them with Dr San's real outline.
- Format 3: confirm she gives organisations a de-identified summary afterwards, or delete that line.
- Format 4: the invitation email is illustrative. She may already have a template.
- Problem 4: "tend to use their final months well" is an observation, not a stat. There's also an optional note about Queensland's psychosocial hazards Code of Practice, to use only if she wants that framing.
- Proof: add a named organisation or a workshop quote only with permission. Proof 3's qualifications are the home list, with MBA (HR) and Mental Health First Aider (Workplace) put first for HR readers.
- Copy d for programmes says "Dr San will quote after a first chat". Confirm that's how she prices.

## Notes for the shared shell (not changed)
- `once:true` ScrollTriggers threw `Cannot read properties of undefined (reading 'pin')` inside ScrollTrigger.refresh when several slots swapped at once from a scrolled position (preset change). This page uses `toggleActions:"play none none none"` instead, and static `matchMedia` checks in place of `gsap.matchMedia`. Home slots (dials, cover, consult) still use `once:true`, so they may hit the same thing.
- It would be cleaner for engine/mixer to honour `preset.pal` natively. Then the script in this page's index.html could go.

## Verified
Playwright at 1440 and 390: every preset and every layout variant, with 0 console errors, 0 4xx and no horizontal scroll. Every preset-to-preset switch (24 pairs) works with no errors. The default preset also passes with reduced motion on. Screenshots are in the session scratchpad at `shots/11-organisation/`.
