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
