# Services › Individual — handoff

Job: explain the how (Dr San's four-stage method for individuals and couples) and restate the why once, as a felt moment.
Open `sites/v3/09-felix/services/individual/`. The mixer, `?preset=<name>`, `?<slot>=n` and `?c_<slot>=b|c|d` all work.

## Slots (4 layouts each, plus off)
| Slot | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| hero | Home pattern: full-height photo on the left | Words centred, wide photo band opens below | Text left, framed portrait on a colour block | Short page header: small portrait and name, big headline |
| why (felt week) | Pinned 120% scrub, Fri, Mon, Wed one at a time | Desk-diary week: Friday full, Mon/Wed empty lines, note writes in | Sticky heading, each day comes up to full strength as it passes | Quiet and centred, words fill from pale to ink |
| method (Map, Test, Build, Practise) | Report card table, each stage's mark fills at mid-screen | Four pages slide sideways (desktop pin, capped at 140vh; stacked on phones) | Vertical path, line draws down, dots fill | Four columns under one bar that fills as you scroll |
| get (what's included) | Health-fund "Included" statement with drawn ticks | Photo beside a plain list | Two-by-two, hairlines draw in | Welcome letter from Dr San, signed |
| faq (6 Qs) | Sticky heading + accordion | Leaflet, all answers open, 2 columns | Narrow centred accordion, first open | Information-sheet card |
| cta | Centred, ring draws around button | Photo split | Full-width band | Appointment card (with / length / cost / how) |

The method wording comes from Dr San's own line: "map what work is actually doing for you, test what happens when it stops, build the replacements and practise them while you still have somewhere to be on Monday."

## Copy (copy.json)
a = default (in the fragments). b = plain and few. c = in her words (first person). d = warmer and more direct (FAQ d rewrites the questions too).

## Presets
- `default`: Recommended, all layout 1, copy a
- `plain`: hero 4, why 4, method 3, get 3, faq 2, cta 3, copy b
- `words`: hero 3, why 3, method 2, get 4, faq 3, cta 1, copy c
- `warm`: hero 2, why 2, method 4, get 1, faq 4, cta 4, copy d

## TODO(Felix): all in HTML comments
- Couples: confirm she works with couples at every stage (method, faq, get).
- Package: number and length of sessions, written plan, check-ins, fees (get, faq).
- Delivery: phone/video for the first chat, and in person around Cairns, which is an assumption (cta 4, faq).
- "Point you to the right support" wording in the counselling answer.
- get 4: check she's happy to sign the letter.
- Diary names in why 2 ("Handover with Jo", "the Esplanade") are illustrative.
