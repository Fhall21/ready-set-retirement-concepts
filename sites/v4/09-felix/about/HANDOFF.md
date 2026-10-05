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

TODO(Felix): Monday entries ("A walk", "Friends", "Yours") are illustrative; confirm the tone.

## Wave 3: one calendar, one scene (turning/6)

Felix's verdict: the home calendar (slots/monday/1) works; the about calendar felt half baked, and two calendars in a row was one too many. **turning/6** now holds turning + mission as ONE pinned scene on ONE calendar.

- **Calendar:** rebuilt from the home page's week: six columns, mono day bar, the same labelled entries (Team standup … Farewell drinks), the same height (up to 420px) and the same clip-away evaporate.
- **Sequence (desktop, 900px+, pinned 250vh):** the turning sentence is read word by word → the week slips away day by day, leaving only the empty Monday (accent ring) → "It happens to people who did everything else right." → a held beat → the turning text fades out and the mission line fades in, word by word → Monday is written in (Morning walk, Coffee, Marg, Volunteering), the ring turns from accent to brand → the mission close line. The calendar never moves.
- **Below 900px:** no pin. It stacks in reading order (sentence, calendar, close, mission, mission close) and scrubs as it passes. Under 600px the calendar turns on its side (one row per day) so all six days fit with no sideways scroll.
- **Reduced motion:** stacked, the old week faint, Monday already filled. Everything is visible in CSS without JS.
- **Copy:** `turning.*` follows the Copy tab's turning row. `mission.*` (lead / big / close) follows the **mission** row even though the mission slot is off: turning/6 applies mission copy itself and reloads when the mission row changes.
- **Presets:** default = turning 6, mission 0 (off), values 5 follows straight on. sideways / plain keep turning 5 + mission 6; profile keeps turning 1 + mission 5.
- The bare URL now loads `presets.default` (engine fixed), so the old "use ?preset=default" note is gone.
- TODO(Felix): the new Monday entries are illustrative. "Coffee, Marg" deliberately echoes the work-week entry that evaporated (connection coming back). Confirm with Dr San.
