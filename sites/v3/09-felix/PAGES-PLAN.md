# 09 Felix — remaining pages plan (27 Sep 2026)

## Pages
| Page | Path | Job | Slots (3–4 layout variants each + copy variants) |
|---|---|---|---|
| Services › Individual | `services/individual/` | The how (method) + re-state the why, felt | hero, why (felt moment), method (steps, medical-report style), what-you-get, faq, cta |
| Services › Organisation | `services/organisation/` | The how for employers: workshops, seminars, outcomes | hero, problem (workforce), programmes, format/logistics, proof, cta |
| About | `about/` | Backstory → mission → why; scroll storytelling (GSAP ScrollTrigger pin/scrub) | opening, backstory (pinned chapters), turning point, mission, why/values, dr-san credentials, cta |
| Contact | `contact/` | Details + booking embed placeholder (Cal.com-style) + short form | hero, booking (placeholder calendar), details, form, reassurance/faq |

## Shared
- Nav: Home · Services ▾ (Individual, Organisation) · About · Contact · Book button. One `shared/nav.html` + `shared/footer.html` (from 09 footer), loaded by every page incl. home.
- Each page reuses 09's shell: `slots/<slot>/<n>.html`, `copy.json` (a/b/c/d), `presets.json` (3–4 coherent stories), same `mixer.js` (made page-agnostic).
- Book buttons → `../contact/#book`.

## Taste guardrails — canonical: feedback/design-taste.md (synthesised brief; overrides this summary)
- Person first, not SaaS (Dr San's human practice). Health-stat / medical-report tables, not dashboards/speedometers.
- Copy: plain + few words, felt moments ("first Monday afternoon"), complements the financial plan (yin/yang), no deadline pressure, "ready to chat" tone.
- Testimonials need weight and space. No design-jargon in visible copy. Placeholders look real but are marked with HTML TODO comments, never visible red text.

## Order
1. Shell agent: shared nav/footer + page-agnostic mixer + page skeletons (sequential, avoids conflicts).
2. Four page agents in parallel, one per page, each reads feedback/design-taste.md first (impeccable + gsap skills), each Playwright-verified at 1440/390.
3. I review screenshots, anti-slop design review, commit.
