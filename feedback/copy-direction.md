# Copy direction — Vitals v3

For agents writing copy variants of any section (slot). Distilled from Felix's arena votes on the hero, 27 Sep 2026 (rounds 4–4c in `v3-vitals-log.md`). Read that log for the raw votes. Where this file and the log disagree, the log wins.

## Who is reading
- **Primary reader:** someone 3–10 years from retirement, usually 55–65 and often on a phone. They may arrive stressed. They have **not retired yet**.
- **Secondary reader:** an HR or workforce planner deciding whether to bring Dr San into their organisation.
- **The service:** Dr San's own independent professional practice. It is **not a product**, so avoid any SaaS or B2B tone.

## The rules

1. **Start with what the reader feels now, before retiring.**
   - Winning hero: "Retiring soon, and not sure what comes next?"
   - Losing hero: "Retire knowing who you are…". Felix: "The pain of not knowing who one is is not felt by the audience yet… the rest of the page is to convince them of this eventually."
   - So early sections meet people in their present uncertainty. Losing identity, purpose, direction or connection is the page's *argument*, built further down. Never assume the reader already feels it.

2. **Put the value first, in the reader's terms.**
   - "Doesn't tell me what the value is, the why should I care" sank a variant with good visual hierarchy.
   - Every section should answer "why should I care?" in its first line.

3. **Less is more. Give each block one job.**
   - Supporting lines that competed with the headline lost every time: "could've been better without the small subtext", "too much text", "could cut down…".
   - Default to one headline, at most one short supporting line (about 12 words), and one action.
   - Cut anything the button or heading already says. For example, don't repeat "free 30-minute" in both the line and the button.

4. **Use the supporting line to hint at the work, not repeat the pitch.**
   - The winning supporting line names what Dr San does, taken from her own tagline: "Human-centred retirement planning, for your psychological and social wellbeing."
   - It beat a process line ("Talk it through calmly and find your first steps.").

5. **Don't lean on the money comparison.**
   - Felix is "unsure how front of mind money planning is or if it just happened in the background."
   - Lines like "…as carefully as the money", and "Financial readiness is one vital sign" used as a hook, lost ground.
   - Money can appear inside the argument, but don't make it the headline assumption.

6. **Nudge organisations quietly, and early.**
   - A single small link beat a lead-in plus link. Winner: "See workshops for organisations". The version with "Planning for a workforce?" in front lost.
   - Felix: "a small but not in your face nudge, less is more."
   - Organisations get a quiet signpost in each relevant section, never equal billing with the person.

7. **Humane, plain, professional.**
   - Warm and unhurried, never salesy or interrogating.
   - Dialogue should sound like real people (see the consult slot learnings).
   - It must still read as credible to an HR buyer: calm and specific, not cute.

8. **The person carries the trust.**
   - Her name and role ("Dr San · Psychosocial Retirement Educator") paired with her professional photo did more than any claim.
   - Use "psychosocial" only in her title; elsewhere, write plain words.

## Wider lessons from the whole 27 Sep session (not just the copy votes)

**Tone of the page**
- **It's a person, not a product.** Hero variants built as report cards, week tables and "Never reviewed" rows were rejected as "very B2B SaaS like, trying way too hard". Several were judged worse than Dr San's live site, which "isn't great but feels more human".
- Copy that sounds like dashboard labels ("Annual review", "Last reviewed: Never", "Reviewed 1 of 5") reads as SaaS. Write sentences a person would say.

**Arguments and structure**
- **Don't hammer the argument.** Repeating the Monday / financial-vs-everything-else contrast in the hero was "reinforcing… way too much". Make each argument once, in the section that owns it.
- **Leave the argument out of the hero.** Once the hero stopped arguing, the section below it has to open the argument. Write that section's first line as the page's first real claim.
- **Expected beats clever.** From earlier rounds: a clever device needs a reason to exist or it reads as "why?". Plain, familiar framing wins, like the health-fund table or the medical-report feel.

**Word choice and voice**
- **Avoid AI-slop phrasing.** Round 1 rejected "Same ground, two starting points". Avoid neat abstract parallelisms, taglines that sound written for a deck, and eyebrow labels.
- **One idea per viewport, felt rather than explained.** The speech/"10 minutes" pause landed because it was minimal text with a felt slowdown. For dense sections, the rhythm Felix wants is report → felt moment → report.

**Process lessons for agents**
- **Agents drifted on copy when left alone.** They cut a lede to one sentence, added "Reviewed 1 of 5", appended "free" to buttons and invented a "Free, and no obligation" line (later removed). Change only what the brief asks, and flag every addition.
- **Build distinct feels first, then iterate one at a time from votes.** Felix: "don't try and make too many variants… try very different feels and then design new iterations live as feedback and votes come in."

## Hard limits
- No invented stats, credentials, testimonials, quotes or promises.
- Reuse existing copy from `sites/v2/08-vitals/index.html` and Dr San's own lines ("human-centred retirement planning™", "educated retirement decisions", "for psychological and social wellbeing").
- Every reworded line must be listed in your report so Felix can check it.
- Confirmed with the page, but check before asserting new specifics: the consult is free and 30 minutes, and her offer is training, workshops, seminars, coaching, consulting and speaking.
- No jargon, eyebrows or kickers, and no uppercase "technical" labels (see `sites/v3/08-vitals/BRIEF.md` bans).

## How to run a copy round in the arena
- **Keep the section's winning layout.** Change only the copy, and the type hierarchy the copy needs. Name files by the next free number in `slots/<slot>/` and bump `counts` in `presets.json`.
- **Start with three genuinely different angles, not tweaks.** For example: felt-now reassurance, outcome, dual-audience.
- **Then iterate one variant at a time from each comment.** Most wins came from single cuts: remove the lead-in, shorten the supporting line, swap it for her tagline.
- **Check every variant at 390 and 1440.** The headline must be the clear first read, with no widows, and the action must be visible without scrolling on a phone.

## Reference: the final hero (18)
| Part | Copy |
|---|---|
| Name line | Dr San · Psychosocial Retirement Educator |
| Headline | Retiring soon, and not sure what comes next? |
| Support | Human-centred retirement planning, for your psychological and social wellbeing. |
| Button | Book your free 30-minute consult |
| Quiet link | See workshops for organisations |

## Round 5: section-by-section picks (27 Sep 2026)

Felix picked copy for each section from the a/b/c variants:
- hero: c
- monday: b
- pause: b
- dials: b, retitled
- speech: b
- cover: new
- audience: b
- practitioner: c
- consult: new

**What those picks teach:**

1. **Plain and few (b) wins most sections.** Default to short, plain lines. Use Dr San's first-person voice (c) only where a person is naturally speaking: the hero and her practitioner section.
2. **Titles should lead the reader into a lived moment.** Dials works better as "So here's what that first Monday afternoon looks like" than as an abstract label.
3. **Pair psychosocial planning with financial planning. Never pit them against each other.** Cover was weak. Direction: "Psychosocial planning is the yin to your existing financial plan", then "One pays for the life. The other helps you live it." (the line Felix liked).
4. **No deadline pressure.** Felix rejected "well before the date". The consult close should feel warm and low-stakes: "Ready to chat?" and "Book in a 30-minute friendly chat to learn what your weeks might look like."
5. **Give real proof its space.** The Warren Entsch testimonial is powerful, so design it as a proper pull-quote, not a footnote. Never invent more quotes.
6. **Friendly beats formal in CTAs.** "friendly chat" is better than "consultation"; say "30-minute", not "30min".
