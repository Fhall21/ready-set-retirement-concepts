# Vitals v3 — feedback & learnings log

Running log. Newest round at the top. Each round: what was reviewed, verdicts, the learning it implies.

Arena votes and comments (from round 3 on) are logged per vote in `sites/arena/votes.jsonl`. Run it with `node sites/arena/server.mjs` and open http://localhost:8766/arena/.

---

## Round 4 — Felix, 27 Sep 2026 (hero arena, from c1/c2)

### Verdict
- Heroes 6–11 (c1×c2 hybrids: week tables, review cards, "Never" rows) read as **B2B SaaS**: trying too hard to look like a product, and hammering the Monday / financial comparison. Several felt *worse* than Dr San's current live hero, which "isn't great but feels more human".
- Arena: 10 > 11 ("too much going on, poor visual hierarchy"), 9 > 11, 8 vs 11 neither.
- All six archived to `slots/_archive/hero-round4/`; their votes are relabelled `hero-r4-archived`.

### Learnings
13. **This is a professional service run by one person, not a product.** The hero should introduce Dr San and what she helps with, warmly. Person first, argument second.
14. **Do not lead with the diagram.** Monday / financial-vs-the-rest belongs further down the page, not stacked into the hero.
15. **Reference point: her current hero** (tagline lines, circular portrait, "Dr San · Psychosocial Retirement Educator", one button). Beat it on craft, keep its humanity.

### Round 4b — live hero iteration (same day)
- New person-led heroes 6 (her live hero, refined), 7 (full-height portrait), 8 (note from Dr San).
- 7 > 8: "doesn't tell me the value… too much text". 6 > 8: "less cluttered". 6 = 7: "prefer the text on 6, but the full-height photo is more professional".
- → 10 (6's text + 7's photo) beat 9, 8, 6. Then "better without the small subtext" → **11 (10 minus the subtext) beat 10. Winner.**
- Hero 11 = full-height portrait, "Dr San · Psychosocial Retirement Educator", headline "Educated retirement decisions, for psychological and social wellbeing.", one button. New preset `c3` = c1 with hero 11.

### Learnings
16. **Her professional photo carries the credibility.** Give it full height, not a circle.
17. **One headline, one button.** Every supporting line diluted it; the vital-sign argument belongs further down the page.
18. **Lead with what they feel *before* retiring, not after.** 13 > 14: "The pain of not knowing who one is is not felt by the audience yet since they haven't actually retired yet… the rest of the page is to convince them of this." Hero speaks to the approaching change (not sure what comes next); identity/purpose loss is argued further down.
19. **Keep the quiet organisations link in the hero** ("See workshops for organisations"): it signals the org option early. Unsure whether money planning is front-of-mind for this audience or happens in the background, so don't lean the hero on the money comparison (12's "as carefully as the money").

### Round 4c — hero copy (27 Sep 2026) — **chosen: hero 18**
- Copy variants on hero 11's layout: 12 outcome/money, 13 reassurance, 14 identity + org link. 13 > 14, 12 > 14; 15 (13 + org line) > 13, 12; 16 (link only) > 15; 17 (shorter support) > 16, 15, 14; **18 (support line = her tagline) > 17, 16, 15, 14.**
- Final hero 18: full-height portrait · "Dr San · Psychosocial Retirement Educator" · **"Retiring soon, and not sure what comes next?"** · "Human-centred retirement planning, for your psychological and social wellbeing." · button "Book your free 30-minute consult" · quiet link "See workshops for organisations".
- Set as the hero in c1, c2 and c3. (18 vs 11 was never voted directly; Felix chose 18.)

---

## Round 3 — Felix, 25 Sep 2026 (A/B arena, 11 votes)

### Votes
| Pair | Result | Comment |
|---|---|---|
| page v3 vs v5 | **v5** | "Cleaner, I can feel the detachment and emotional impact." |
| audience 1 vs 2 | **2** | Copy should be simple, e.g. "I work with both corporate and organisation clients". |
| pause 3 vs 1 | neither | — |
| consult 1 vs 2 | tie | 1 cleaner, split more complete; clean on mobile, chat on desktop? Bubble copy sounded AI, intense, forced. |
| audience 3 vs 2 | **3** | — |
| audience 1 vs 3 | neither | Cards are what a site is expected to have; the route makes you ask "why?", and it had no person at the end. Prefer 3's heading. |
| consult 3 vs 2 | **3** | White is cleaner; the tinted panel behind the bubbles felt odd. |
| audience 3 vs 4 | neither | — |
| audience 2 vs 4 | **4** | — |
| consult 3 vs 1 | tie | "Right for mobile, left for desktop" (which is what consult 3 does). |
| audience 4 vs 1 | **4** | "Left title is better but no person bubble." |

### What we changed in response (live loop)
- audience 3 (route + first-person heading), then audience 4 (expected two cards + 3's heading, no portrait); audience 3's route now ends at Dr San.
- consult 3: split with chat on desktop, clean version on phone; bubbles rewritten warm and human; white panel.
- Two compiled pages: `?preset=c1` (from the winning v5) and `?preset=c2` (report-forward).

### Learnings
9. **Expected beats novel for structural sections.** A clever diagram needs a reason to exist, or it reads as "why?".
10. **Dialogue copy must sound like real people.** Warm, unhurried, never interrogating or salesy.
11. **Different devices can take different variants.** Chat on desktop, clean on phone.
12. **Pause 1 and 3 did not land.** Pause 2 is untested. Pauses need another round.

---

## Round 2 — Felix, 25 Sep 2026 (5 rebuilt versions)

### Verdicts
- **Process:** strip what was cut, so the mixer only holds kept variants plus NEW iterations built from the likes. A/B is for moving forward, not revisiting the past.
- **Speech:** liked as a way to break up walls of text and reports → more "pause" moments.
- **Dials 6** (now 2): liked, but the table headings are wrong (labels stacked above the track, not over the number columns).
- **Dials 7** (now 3): before/after not visible; the "worse" state gets scrolled past or hidden.
- **Dials 8** (now 4): "not too bad", leans into the report feel.
- **Bug:** the speech section sometimes appears twice.
- **Consult:** definitely a left/right split with the speech bubbles; stacked on mobile.

### What we changed in response
- Archived all cut variants to `slots/_archive/` (see MAPPING.md) and renumbered. The mixer shows only kept ones.
- Shell: `ScrollTrigger.sort()` after async slot loads (suspected cause of the double speech).
- Dials 3: pins on desktop so "Without a plan" is on screen before it flips; on phone it flips late.
- All presets use the split consult.
- New in progress: dials 2 header fix + dials 7/8 (report feel); "pause" interstitials 1–3 in the speech mechanic; hero 4/5; consult 2 polish.

### Learnings
7. **Scroll-told state changes must show the "before" long enough to register.** If the flip happens while the element is entering, nobody sees it.
8. **Pauses between dense blocks are wanted.** Rhythm: report → felt moment → report.

---

## Round 1 — Felix, 25 Sep 2026 (component mixer, 13 sections)

### Verdicts
| Section | Keep | Cut | Notes |
|---|---|---|---|
| Hero | 2, 3 (best), 4 | 1, 5 | Hero 1 non-functional and leans on the dial; the dial should not be the central product. |
| Monday | 2 | 1, 3 | Horizontal-scroll storytelling felt clean — reuse it for another section or page. |
| Dials | 4 | 2, 3, 5 | 2 looks like a clock; 3 nice idea but confusing; 5 confusing. 4 clearly shows before/after (without vs with Dr San). **Refeel the dials.** |
| Payslip | as a dials alternative | — | Nice, but makes the same point as the dials → make it switchable against the dials. |
| Speech | 2 | 1, 3 | Stopping the flow and slowing down for the "10 minutes" is *felt*. Minimal text, feeling conveyed. |
| Card | — | all | Didn't land. |
| Cover | 1 (for now) | — | Needs the medical-report feel of the v1/v2 tables, not a SaaS comparison table. The familiarity is the appeal. |
| Plan check | — | all | "This isn't selling a SaaS product." |
| Method | 2 kept switchable | 3 | Probably a whole page in itself. Service options (method 2) helped clarity. Park for now. |
| Audience | 1 (default), 2 switchable | — | Good as its own section. Title "Same ground, two starting points" reads like AI slop. |
| Practitioner | 1 | — | Image is important; the split felt clean. Add a testimonial carousel. |
| Consult | 4 (ambitious), 3 (clean) | — | 4: rewrite the messages, use a left/right split rather than stacked. 3: give it full-viewport height so it's a section, not an add-on. |

### What we changed in response
- Dials 6 (health-check ranges), 7 (monitor with state label), 8 (lab "Your results" letter). No gauges or needles. Payslip is now dials 9/10.
- Cover 6 (health-fund summary of cover), 7 (lab report, flagged rows).
- Audience retitled "Planning your own retirement, or your team's?"
- Practitioner 4 = 1 + testimonial carousel (only one real testimonial exists: Warren Entsch; need more).
- Consult 5 = message thread in a left/right split; consult 3 is full height.
- Presets rebuilt from kept pieces; mixer skips cut variants.

### Learnings
1. **The audience is older and less digitally literate. Simple wins.** Anything that needs decoding (multi-needle dials, timelines) fails.
2. **Dr San liked the dials because they felt like a health statistic on a dashboard**, not a speedometer going up, and because the without/with difference was obvious. Design for "health reading + reference range", not "gauge".
3. **Familiar documents work only when they are the familiar document.** Medical report / health-benefits statement: yes. SaaS comparison table, quiz, self-check widget: no.
4. **The best motion creates a feeling, not an effect.** E.g. the scroll slowing for "ten minutes". Minimal text, emotion carried by the experience.
5. **Sections need presence.** Full-viewport sections, not small add-ons.
6. **Titles must sound like a person**, not a clever AI line.

---

## Earlier rounds
- Dr San, round 1 (v1 sites): `Dr_San_for_Felix.md`
- Our response, round 2 (v2 sites): `RESPONSE_second_round.md`
