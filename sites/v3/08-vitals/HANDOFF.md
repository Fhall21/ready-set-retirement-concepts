# Vitals v3: handoff

Status as of 25 Sep 2026. Nothing is committed yet (`git status` shows everything new under `sites/v3/`, `sites/arena/`, and `feedback/v3-vitals-log.md`).

## Read first
1. `feedback/v3-vitals-log.md`: every review round (Felix's verdicts, votes, learnings). This is binding and newest is at the top.
2. `sites/v3/08-vitals/BRIEF.md`: design rules, bans, the slot contract, and GSAP craft rules.
3. `feedback/Dr_San_for_Felix.md`: the client's original feedback.

## What exists
- **Page shell:** `sites/v3/08-vitals/index.html`. It loads each section ("slot") from `slots/<slot>/<n>.html` according to the URL, e.g. `?hero=2&dials=4`. Other params:
  - `?preset=c1` loads a named combination.
  - `?only=dials&dials=3` renders one slot alone (the arena uses this).
  - `?clean` hides the mixer.
  - Optional slots use `0` for hidden.
- **Slots:** hero, monday, dials, speech, cover, pause, method (parked), audience, practitioner, consult, thread (page overlay). Cut variants live in `slots/_archive/` (see `MAPPING.md`) and should not be revived.
- **Mixer:** `mixer.js`, a bottom-left panel. Keys 1–9 pick a slot, ←/→ cycle it, P steps presets, M hides the panel.
- **Presets:** `presets.json`. `counts` must match the files in each slot folder.
  - `c1` and `c2` are the current best full pages, compiled from the arena votes.
  - `v1`–`v5` are older combinations.
- **A/B arena:** `sites/arena/`.
  - Run `node sites/arena/server.mjs` and open http://localhost:8766/arena/. It serves all of `sites/`, so the page itself is at `:8766/v3/08-vitals/`.
  - Comparisons are blind. Arrow keys vote; Enter opens the comment box.
  - Votes are appended to `sites/arena/votes.jsonl` (11 so far).
  - Rankings are served at `/api/stats`.
  - New variant files join the rotation automatically, and anything made in the last hour gets priority.

## Live loop (paused)
When Felix is voting:
1. Watch `votes.jsonl` with `tail -n0 -F … | grep --line-buffered '"choice"'`.
2. Every ~3 votes, or immediately on a comment with clear direction, spawn a Sonnet agent to write the next variant file. Give it:
   - the log, the BRIEF and the recent votes
   - the target files
   - the instruction to bump `counts` in `presets.json` (re-read the file first and edit only that key)
   - the screenshot check below
3. Review its screenshots before telling Felix it's in rotation. Small fixes (e.g. a background colour) are faster to make directly.

## Verification tools
The scratchpad path is session-specific, so recreate these if they're missing. Each is a short Playwright script:
- `frames.mjs <slot> <n> d|m`: 6 viewport frames scrolling through one slot, tiled into one image. Full-page screenshots can't show pinned or fixed content, so use this for scroll animations.
- `shoot.mjs out <urls…>`: full-page screenshots plus a console-error and sideways-scroll check for each URL. Run it on every preset before claiming done.

## Open items
- Hero, dials, cover, speech, Monday and practitioner have **no arena votes yet**. Next round should compare these, especially dials 2 / 4 / 7 / 8 and cover 2 / 3.
- **Pause:** 1 and 3 were voted "neither" and 2 is untested. Needs a new idea in the spirit of speech 1 (a felt slowdown, minimal text).
- **Practitioner 2's carousel** has only one real testimonial (Warren Entsch). Ask Felix for more; never invent quotes.
- **Consult 3** closes with "Does Thursday suit?". Confirm this matches how Dr San actually takes bookings.
- **Method** is parked as a possible separate page. Felix liked horizontal-scroll storytelling (Monday 1) for reuse elsewhere.
- **Project `CLAUDE.md`:** its context-mode rules reference `ctx_*` tools that subagents often don't have. That config is legitimate, so don't flag it as an injection.

## Copy variants (added 27 Sep 2026)
- `copy.json` holds copy variants per slot; tagged elements carry `data-copy="<slot>.<key>"` (contract in BRIEF.md). Variant `a` is the original text in the fragment.
- URL `?c_<slot>=b`. The mixer has **Layout | Copy** tabs; ←/→ cycle whichever tab is open. Picking a preset also sets copy (unnamed slots go back to `a`).
- Directions: `b` plain and few, `c` in her words (first person). Story presets: `plain-c1`, `plain-c2`, `words-c1`, `words-c2`.
- Tagged so far: hero 18, monday 1, pause 2, dials 4 and 7, speech 1, cover 3, audience 4, practitioner 1 and 2, consult 3 (the layouts used by c1/c2). Other layouts ignore copy variants until tagged.

## Graduated: 09-felix

The `felix` preset now ships as a standalone page in `../09-felix/`, which has its own HANDOFF.md. This folder stays as the lab.
