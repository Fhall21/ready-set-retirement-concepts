# COLOUR — SECOND PASS

Written after Dr San's feedback (`feedback/Dr_San_for_Felix.md`). That document says the same
thing seven times in seven different vocabularies:

> "Dark/dreary blues and browns and grey — depressing colours"
> "Night sky associates with getting darker as the night (years) progresses"
> "Monochrome dreary"
> "Sombre and boring — even the coffee is black"
> "Sombre and boring" (Vitals)
> "Sombre and boring" (The Map)

Six of seven sites were marked down on colour and only colour. The writing was praised almost
line by line. So this pass changes the colour and the light, and leaves the copy alone except
where the brief is to cut words.

---

## 1. WHAT THE CLIENT ASKED FOR

| Ask | What it means in hex |
|---|---|
| Energetic, brighter | Grounds go to white and near-white. No page on the set opens dark. |
| Female-aligned, not dark | Violet, orchid, rose, coral. No navy, no charcoal, no brown. |
| Business/formal, "less hippie" | Saturated colour used *structurally* — one accent, hard edges, no washes, no textures, no hand-drawn feel. Bright is not the same as playful. |
| No paper-like, aged colour | The cream `#EDE4D3` map paper and the `#F7F4EC` Vitals ground are gone, along with every grain, fibre and fold overlay. |

The brand still owns purple and gold. Purple was the right colour and the wrong *value* — it was
being used at `#6F3794` on grounds dark enough to bury it. Brightening the violet and putting it
on white does more for energy than any new hue would.

---

## 2. THE TWO TEST PALETTES

Every site ships with both, switchable live from a control in the bottom-right corner of every
page. Nothing else about the page changes between A and B, so a preference expressed is a
preference about colour and not about layout.

The switch writes `data-pal="a" | "b"` on `<html>`, remembers the choice, and carries it across
every link in the set, so the whole set can be walked in one palette and then re-walked in the
other. `?pal=b` in the URL forces it.

### Palette A — VIOLET & CORAL
Warm, direct, high energy. The brand violet brightened and put on white, with coral-rose as the
alarm and bright gold as the go-signal. This is the more distinctive of the two.

| Token | Hex | Role | Contrast on white |
|---|---|---|---|
| `--ground` | `#FFFFFF` | page | — |
| `--ground-2` | `#FBF6FF` | panels, table stripes | — |
| `--ground-3` | `#F3E7FD` | wash, filled states | — |
| `--ink` | `#211A2A` | body copy | 15.1:1 |
| `--ink-soft` | `#574B66` | secondary copy | 7.4:1 |
| `--brand` | `#7B2FB5` | headings, actions, restored state | 7.2:1 |
| `--brand-bright` | `#9A45DE` | display type, graphics | 4.6:1 |
| `--accent` | `#D91A54` | deficit, hazard, text-safe alarm | 4.9:1 |
| `--accent-bright` | `#FF4F70` | graphic alarm, gauge arcs | 3.2:1 — never body copy |
| `--gold` | `#FFC233` | go-signal on violet only | graphics only |

### Palette B — ORCHID & AZURE
Cooler and more corporate. Orchid carries the psychosocial, azure carries the business case —
which suits the HR and board audience, where violet can read as soft. Slightly more formal,
slightly less distinctive.

| Token | Hex | Role | Contrast on white |
|---|---|---|---|
| `--ground` | `#FFFFFF` | page | — |
| `--ground-2` | `#F6F8FE` | panels, table stripes | — |
| `--ground-3` | `#E9EFFC` | wash, filled states | — |
| `--ink` | `#17203A` | body copy | 14.2:1 |
| `--ink-soft` | `#495271` | secondary copy | 7.1:1 |
| `--brand` | `#C01B7A` | headings, actions, restored state | 5.7:1 |
| `--brand-bright` | `#E82F96` | display type, graphics | 3.8:1 — display only |
| `--accent` | `#1F5FE0` | deficit, hazard, text-safe alarm | 5.5:1 |
| `--accent-bright` | `#3B82F6` | graphic alarm, gauge arcs | 3.7:1 — never body copy |
| `--gold` | `#FFB020` | go-signal | graphics only |

### One thing worth knowing about B
In B the brand hue (orchid) carries the **primary** and azure carries the **deficit**. Reading a
cool blue as "low" is a dashboard convention rather than an alarm convention, and azure-as-alarm
is the weaker half of this palette. It stays that way on purpose: the alternative is making azure
the primary, which would take the brand's own hue off the page entirely, and this is a brand test
as much as a colour test. In both palettes the words carry the meaning &mdash; the switch reads
`NO PLAN / WITH PREPARATION` and the dials read `LOW / STEADY` &mdash; so colour is doing
differentiation, not warning.

### The rule that survives from the first pass
**One accent used with discipline.** A and B each have exactly two working colours plus a gold
that only ever appears as a go-signal. A page that reaches for a third has a spacing problem.

---

## 3. WHAT CHANGED, SITE BY SITE

| Site | Feedback | Change |
|---|---|---|
| 01 The Long Light | "dark/dreary blues and browns and grey", "will I jump" | Page ground is white. The film panel stays dark because a cinema screen has to, but it is now a *panel on a bright page* rather than the page itself. Frames re-graded warm and up two stops. |
| 02 Second Horizon | "night sky… getting darker as the night progresses — depressing" | The scrub runs the other way. It now opens before dawn and ends in full morning light, so the page gets brighter as it goes. Same mechanic, opposite direction, opposite meaning. |
| 04 Unretired | "monochrome dreary", "font size in your face", "title does not gel" | Violet replaces black as the inverted ground, coral as the accent. Poster type down from 19vw to 12vw, and the h1 now carries a line that connects the title to the argument. |
| 05 The Quiet Room | "even the coffee is black", "connotes prayer" | Paper fibre, multiply blends and aged cream removed. White ground, blush panels, violet-to-coral thread. Images brightened. Retitled section language away from stillness and toward the practical. |
| 07 Third Act | Client likes the red; "mood does not fit the audience" | The one palette the client praised, so it keeps its structure. Red brightened from `#8C1D18` to the palette accent, and the middle act inverts to a bright ground so the page is no longer black end to end. |
| 08 Vitals | "the four dials are excellent"; "sombre and boring" | Rebuilt. See below. |
| 09 The Map | "genius but takes too much thinking"; "needs to be stress free" | Rebuilt. See below. |

---

## 4. VITALS — SECOND ITERATION

Kept, because the feedback named them: the four dials, the covered/not-covered table, the
dashboard familiarity, and the consult copy.

Cut, because the page was doing too much:

- **Two banks of four dials became one bank with a switch.** The first version showed four gauges
  falling to deficit, then four more gauges refilling, with eight blocks of copy between them.
  The same argument now lives in one set of four dials and a two-state toggle, `UNPREPARED /
  PREPARED`. The reader sees the change happen to the same object instead of comparing two
  objects from memory. Eight concepts to four.
- **The ECG trace is gone.** It was the most technically involved thing on the page and it made
  the same point the dials make, forty seconds earlier.
- **The table went from eleven rows to seven** and lost the sentence explaining how to read it.
- **Four disclaimers became one**, in the footer.
- **The credential wall went from eleven lines to four**, with the rest available behind a
  disclosure.
- Word count on the page is down by roughly two thirds.

Colour: white ground, violet for the restored state and every action, coral for the deficit.
The gauge arcs are the only saturated objects above the fold, which is the point of a dashboard.

---

## 5. THE MAP — SECOND ITERATION

The feedback was the clearest signal in the whole document: *brilliant, but it asks too much of
a reader who arrives stressed.* So the concept is kept and the apparatus is removed.

Gone: the grid-reference readout, the elevation readout, the bearing readout, the scale bar, the
north arrow, the ten-item legend, the fold lines, the paper grain, and the words *traverse*,
*trigonometrical station*, *interior not examined*, *resurvey*, *datum*, *projection* and *plate*.

Kept: **mapped ground, then blank ground, then mapped ground again.** One image, three states,
five stops instead of twelve. The route is a bright violet line on white, the blank region is
genuinely blank, and the four hazards are coral pins with four-word labels. Everything that was
a surveyor's term is now the plain-English thing it meant.

Reading age of the page is down from about sixteen to about eleven, and the number of things that
must be held in the head at once is down from nine to three.


---

## 6. IMPLEMENTATION

Each of the eight pages carries four additions and nothing else:

1. A pre-paint `<script>` in the head that stamps `data-pal` on `<html>` from `?pal=`, then
   `localStorage`, then the default. It runs before first paint, so no page ever flashes the
   palette the reader did not choose.
2. Two token blocks: `:root` for A, `html[data-pal="b"]` for B. Every site's own colour names
   were remapped onto these, so no site has a hex value in its layout rules any more.
3. About twenty lines of CSS for the switch itself.
4. The switch, plus a script that writes the choice back to `localStorage`, swaps the wordmark
   artwork, and rewrites every in-set link to carry `?pal=`.

Total cost: roughly forty lines per page, no dependencies, no build step. The technical contract
in `BRIEF.md` is unchanged &mdash; every site is still one self-contained file that works when you
open it.

### Wordmark
The supplied `logo.svg` sets its fills from a `<style>` block, so it cannot inherit a CSS custom
property through an `<img>`. Four derivatives are generated instead and swapped by the switch:
`logo-a.svg`, `logo-b.svg` for light grounds and `logo-a-dark.svg`, `logo-b-dark.svg` for the two
sites that still have one. On light grounds the accent word *set* takes the palette's second
colour rather than the brand gold, because gold at `#FFC233` is unreadable on white.

### Where the first pass is kept
`sites/archive/v1/08-vitals-v1.html` and `sites/archive/v1/09-the-map-v1.html`, unchanged, so the
two rebuilds can be compared against what they replaced.
