# Contact page: handoff

**Job:** a calm "ready to chat" page with a mock booking widget, contact details, a short enquiry form and what happens next. It has no backend and makes no network calls.

## Slots (in page order, 4 layouts each, 0 = off)
| Slot | Wrapper | 1 | 2 | 3 | 4 |
|---|---|---|---|---|---|
| hero | `#hello` | Portrait split, compact | Text only, two links | First-person note with small photo | Centred photo and invitation |
| booking | **`#book`** | Cal.com-style: info, month, times | Text and facts on the left, calendar on the right | Next 10 weekdays strip (simplest on a phone) | Calendar plus an appointment card that fills in |
| details | `#details` | Report-style details table | Three big columns | Letterhead / business card | Details plus a live "time in FNQ" panel |
| form | `#message` | Single column, "who is this for" choice | Intro left, form right | Letter ("Dear Dr San, … From,") | Minimal, with an organisation checkbox |
| next | `#next` | 3 steps with a drawn line | FAQ accordion | Steps and a short FAQ | Step pills and the Warren Entsch pull-quote |

`id="book"` is on the booking **wrapper** in `index.html`, so every layout variant carries it. After the slots load, a small script in `index.html` jumps to the hash again, so `contact/#book` lands on the booking block.

## Shared page code
- `contact.js` holds the booking mock (generated weekday availability, Queensland time, arrow-key day navigation, pick → details → done) and form validation (`novalidate` plus custom messages, `aria-invalid` / `aria-describedby`, focus on the first error, organisation fields shown only when chosen, friendly confirmation). Fragments call `RSRContact.booking(root)` / `RSRContact.form(root)`.
- Base widget and field styles (`.cx-*`) live in the `<style>` block of `index.html`. Variants only change the layout.
- If the rest of the current month has fewer than 4 open days, the month view opens on the next month.

## Copy (`copy.json`)
- a = default
- b = plain and few
- c = in her words (first person)
- d = a little more detail

## Presets
1. `default`, **Ready to chat (recommended)**: all slots on layout 1, copy a.
2. `plain`: hero 2, booking 3, details 2, form 4, next 1, copy b.
3. `words`: hero 3, booking 4, details 3, form 3, next 4, copy c.
4. `questions`: hero 4, booking 2, details 4, form 2, next 2, copy d.

## Open TODOs (all marked with `<!-- TODO(Felix) -->` in the HTML)
- The real email, phone and ABN. The placeholders are `hello@readysetretirement.au` (the domain is real, the mailbox is a guess), `0400 000 000` and `00 000 000 000`.
- The real booking embed (Cal.com or Calendly) and a real handler for the enquiry form.
- Confirm that the first chat can be by video call **or phone**.
- Confirm partners are welcome in the chat. This is used in FAQ answers and in booking copy d.
- Every confirmation message is a placeholder. Nothing is sent.

**next/1 is scroll-based (Oct 2026).** The line from step 1 to step 3 fills with the scroll, and each number arrives as the line reaches it (scrub .6, `clamp()` start/end so it completes near the foot of the page). It reverses on scroll up. No pin.
