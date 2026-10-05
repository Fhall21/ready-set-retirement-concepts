# Contact page: handoff

**Job:** a calm "ready to chat" page: a hero that carries the contact card, a mock booking widget and a short enquiry letter. (Oct 2026 decisions: default page order is now hero with card, booking, form. The separate details and next sections are off by default; their files stay.) It has no backend and makes no network calls.

## Slots (in page order, 0 = off; hero has 5 layouts, the rest 4)
| Slot | Wrapper | 1 | 2 | 3 | 4 |
|---|---|---|---|---|---|
| hero | `#hello` | Portrait split, compact | Text only, two links | First-person note with small photo | Centred photo and invitation |

**hero 5 (default):** the details/3 letterhead card sits on the left on a tinted "desk", headline, intro, Book button and message link on the right (stacked on phones, text first, card after). Same `hero.*` copy keys as hero 1, so copy a to d work. The card's email, phone and ABN are still placeholders with the TODO(Felix) comment. One motion: the card settles in, then its lines (skipped with reduced motion).

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
1. `default`, **Ready to chat (recommended)**: hero 5, booking 1, details 0, form 3, next 0, copy a.
2. `plain`: hero 2, booking 1, details 2, form 4, next 0, copy b.
3. `words`: hero 3, booking 1, details 3, form 3, next 0, copy c.
4. `questions`: hero 4, booking 1, details 4, form 2, next 0, copy d.

Booking is locked to layout 1: `presets.json` has `"skip": {"booking": [2,3,4]}`, which the mixer honours, so the arrows pass over 2 to 4 (files kept; `?booking=2` still loads them). The next slot is off in every preset. Nothing links to `#next` or `#details` (the `#details` and `#next` wrappers stay in `index.html` as empty slot hosts). Hero 5 already shows the details, so `details` is 0 in the default; presets using hero 2 to 4 still show details.

**form 3 (default):** now sits on a white section with the letter on `--ground-2`, so the page ends form, then the tinted footer, with about 6rem below the letter. Validation (empty, bad email, organisation required), the org fields toggle and the confirmation all verified.

## Open TODOs (all marked with `<!-- TODO(Felix) -->` in the HTML)
- The real email, phone and ABN. The placeholders are `hello@readysetretirement.au` (the domain is real, the mailbox is a guess), `0400 000 000` and `00 000 000 000`.
- The real booking embed (Cal.com or Calendly) and a real handler for the enquiry form.
- Confirm that the first chat can be by video call **or phone**.
- Confirm partners are welcome in the chat. This is used in FAQ answers and in booking copy d.
- Every confirmation message is a placeholder. Nothing is sent.

**next/1 is scroll-based (Oct 2026).** The line from step 1 to step 3 fills with the scroll, and each number arrives as the line reaches it (scrub .6, `clamp()` start/end so it completes near the foot of the page). It reverses on scroll up. No pin.
