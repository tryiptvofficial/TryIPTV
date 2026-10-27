# Statistics and claims audit (GEO), 2026-10-20

AI answer engines and Bing's guidelines (§15, "Support claims with evidence") favour claims that can be checked. This file lists every figure the site states and whether a source backs it.

**Status labels**
- **First-party:** a fact about TryIPTV, kept in `PRODUCT_TRUTHS` (`src/lib/site-config.ts`).
- **Sourced:** links to a public source.
- **[NEEDS DATA]:** no source yet.

Markers stay in this file, not on live pages. A "[NEEDS DATA]" tag on a page would hurt readers and wouldn't help citation.

| Claim | Where | Status | What would fix it |
|---|---|---|---|
| 25,000+ live channels; 120,000+ movies and TV shows | Home, pricing, footer, guides, schema, llms files | First-party, **[NEEDS DATA]** | No public channel list or count method is published. Publish how the count is made (e.g. "count of live entries in the M3U on <date>") or a category breakdown. Engines and raters can't check it today. |
| $16 / $39 / $60 / $90; 2 connections; no auto-renewal | Pricing, home, FAQ, schema | First-party, consistent | — |
| 24-hour trial, $0, no card; one per household | Trial page, FAQ, CTA | First-party, consistent | — |
| Trial connection limit "confirmed when credentials are issued" | Trial page, llms-full.txt | First-party, **[NEEDS DATA]** | State the actual trial limit (1 or 2). Answer engines can't quote "confirmed at issue". |
| Login details within 5–15 minutes | Home, pricing, trial, FAQ | First-party estimate | Fine as a "typically" claim. A published median from support logs would make it verifiable. |
| Refund: all sales final once activated and delivered; refund only if a working subscription can't be provided | Refund policy, FAQ, about, pricing, terms, llms | First-party, consistent (owner policy 2026-10-20) | — |
| "Custom multi-connection plans are available upon request through support" | `/faq` ("How many devices…") | First-party, **[NEEDS DATA]** | No plan, price or page backs this. Confirm it's true, or remove it. Not changed. |
| Bandwidth: 720p 3–6 Mbps, 1080p 7–15, 4K 18–35 per stream; plan 25+ Mbps (Full HD), 50+ Mbps (4K) | Internet-speed guide, setup, IPTV vs cable, how IPTV works | Planning guidance, **[NEEDS DATA]** | The figures were contradictory across four pages; they're aligned now. They have no source. Cite one (e.g. the streaming provider's own encoder bitrates, or a measured test on named devices with dates) and say it was measured. |
| GB per hour ≈ Mbps × 0.45 | Internet-speed guide | Sourced by arithmetic (3,600 s ÷ 8,000) | — |
| "Standard Fire TV Sticks feature 8 GB of internal storage" | Firestick guide (how-to.json) | **[NEEDS DATA]** | Link Amazon's device spec page. Storage varies by model (e.g. the 2023 Fire TV Stick 4K Max has 16 GB), so name the models. |
| "Roku officially deprecated non-certified channels … in March 2022" | Roku guide FAQ (how-to.json) | **[NEEDS DATA]** | Link Roku's announcement or developer notice, or soften to "Roku no longer supports non-certified channels". |
| "older 1GB RAM Android boxes" (Perfect Player) | Players hub | Descriptive, low risk | — |
| Customer conversations (screenshots) | Home | First-party | Keep the blurring. Don't present them as reviews or mark them up as reviews (Google's 2026-07-24 review-snippet rule). |

Use `npm run check:facts` to keep the first-party rows consistent. It fails on any page or llms file that contradicts `PRODUCT_TRUTHS`.
