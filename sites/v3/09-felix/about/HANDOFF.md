# About page — handoff

Backstory, turning point, mission, values, credentials, then a close. Built on the shared 09 shell (see ../PAGE-CONTRACT.md). There are 7 slots with 4 layouts each, and copy a–d for every slot.

**The story arc:** hello → how I got here (4 chapters) → what I kept seeing → so now I teach the other half → what sitting down with me is like → who I am (credentials + Warren Entsch) → ready to chat.

| Slot | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| opening | split, photo wipes up | centred type, photo band opens on scroll | inline portrait beside the name | two photos drifting apart |
| backstory | **pinned chapters** (150vh; office photo wipes to portrait at the PhD) | **sideways timeline** (pinned, ≤150vh; Monday mechanic) | **photo stays put**, chapters scroll by (sticky, no pin) | **quiet long-read**, paragraphs brighten as read |
| turning | pinned word-by-word sentence (110vh) | checklist ticks itself off, Monday left empty | farewell card handed across | still band, one line draws |
| mission | two halves of the line slide together | photo opens from a slit | signed note | offer table (for you / for organisations) |
| values | ruled list | will / won't | big statements lit at centre | one paragraph, highlighter |
| drsan | home practitioner pattern + quote band | quote first, then qualifications table | "people person, businessperson, nerd" | compact, all credentials |
| cta | centred with portrait | split with photo | plain band + org link | "Talk soon, San" sign-off |

**Copy:** a = warm first person (default), b = plain and few, c = her own words, d = third person profile.
**Presets:** `default` (all 1, copy a), `sideways` (her words, timeline), `plain` (photo-led, b), `profile` (HR readers, d).

**Motion rules kept:** one authored moment per section. No pin is longer than 150vh. On phones (<900px) every pin is dropped via `gsap.matchMedia`. With reduced motion, every chapter is stacked and fully readable. Content is visible in CSS by default.

**Asset added:** `assets/drsan-office.jpg` (resized from `previous_resources/assets/derived/drsan-office.jpg`).

## TODO(Felix) — all marked as HTML comments
- Backstory chapter 4 ("And a lot of farewells") and the turning point are plausible bridges, not sourced facts. Ask Dr San what actually turned her to this work.
- "Schools, community organisations and business" is a plain reading of "educational, social and commercial sectors". Confirm it.
- values/2 "won't" column and mission/4 service split (you / organisations) are inferred.
- cta/4 signs off "San". Confirm she'd sign that way.
- Name spelling: home uses "Walden-Pearson" (hyphen) and her site uses "Walden Pearson". I kept the home spelling.
- Warren Entsch quote is abridged with "…" in drsan/1 and drsan/2.

## Wave 2 (one continuous story)

Motif carried through the middle of the page: the home page's week calendar (slots/monday). Same lead / big-line / close type scale in turning, mission and values.

| Slot | New | What it does |
|---|---|---|
| turning | 5 | turning/1's pinned word-by-word sentence (150vh) + a small Mon–Fri–Mon calendar; the week greys out as you read, the empty Monday lights in accent |
| mission | 5 | continues turning/5: same pin + calendar, opens with the empty Monday, which fills (A walk / Friends / Yours) as the mission is read. No service list |
| mission | 6 | lighter, no pin: same reveal beside one tall Monday page that fills |
| values | 5 | values/4's paragraph, words revealed like turning; each value fills in like a calendar entry (replaces the highlighter) |
| values | 6 | four quiet lines with the calendar-entry edge, words revealed as read |

Edited in place: drsan/1 (Warren Entsch quote band removed), cta/4 (full-height close).
Retired via skip: values 1, 2, 3; mission 4 (offer table).
Default preset: opening 1, backstory 1, turning 5, mission 5, values 5, drsan 1, cta 4.
Mission copy: a = "Your financial plan looks after the money. I help you plan for the person living it." b/c/d rewrite `big` and add `lead`/`close` (this also changes mission/1's b–d big line).

Known: the bare URL loads every slot at 1 (shared/engine.js `state()` ignores presets.default). Use `?preset=default` until the engine is changed.
TODO(Felix): Monday entries ("A walk", "Friends", "Yours") are illustrative; confirm the tone.
