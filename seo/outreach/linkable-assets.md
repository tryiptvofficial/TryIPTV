# Linkable assets: 3 ideas

Each asset must be original, sourced and useful without TryIPTV. Brand mentions come from people citing it, not from promoting the asset ourselves.

| # | Asset | What it is | Why it earns links | Data / effort | Risk |
|---|---|---|---|---|---|
| 1 | **Data report: "How much bandwidth live TV streaming really uses (2026)"** | Measured bitrates for a sample of live channels and VOD titles (SD/HD/FHD/4K), measured on named devices over a stated period. Includes data use per hour and how many streams fit on common broadband speeds. Method and raw CSV published. | Fills the gap competitors leave: none publish measured speed or uptime methods (`seo/research/eeat.md` §5). It's the kind of primary data that journalists, ISP and networking sites cite. | **Needs real measurement** (eeat-confirm question 34): tool, devices, dates. Medium effort. | None if the method is honest. Don't name copyrighted channels; label them by category. |
| 2 | **Free tool: IPTV bandwidth and data calculator** | Interactive page. Choose a resolution and number of streams (or enter a bitrate) and get the recommended internet speed and GB per hour, day and month. Embeddable. | Useful to anyone streaming, not only TryIPTV customers. It can be linked from home-networking, ISP and cord-cutting guides. Also a fit for Product Hunt later. | **Can be built now** from the formulas already on the site. Low effort. **Drafted below.** | Planning ranges are `[NEEDS DATA]` (`seo/geo-stats-audit.md`). The page must say they are planning estimates and let users enter their own bitrate. |
| 3 | **Ultimate guide: "IPTV, explained: legality, setup, formats and safety (2026)"** | One long, maintained hub that consolidates the existing guides: what IPTV is, licensed vs unlicensed services with primary legal sources, M3U and Xtream Codes, EPG, devices, buffering, and how to spot unsafe services. | Neutral and well sourced (18 U.S.C. 2319C, GOV.UK, CJEU) on a topic that is mostly covered by spam. Library and digital-literacy pages can link it. | Low new effort: mostly consolidation and internal links. Must not cannibalise `/guides/what-is-iptv` (see `seo/keyword-map.md` C3). | It must not turn into a sales page. It needs the owner's licensing answer first, so the guide doesn't contradict our own position. |

**Recommended order:**
1. **#2**, the calculator: ready now.
2. **#1**, the data report: once measurements exist.
3. **#3**, the ultimate guide: once licensing is settled.

---

# Draft: IPTV Bandwidth and Data Calculator (asset #2)

**URL:** `/tools/iptv-bandwidth-calculator` (new). Add it to `site-routes.ts` as indexable once it is built.

**Title (55 characters):** IPTV Bandwidth & Data Calculator: Speed and GB per Hour

**Meta description (148 characters):** Work out the internet speed and data you need for IPTV. Pick a quality and number of screens, or enter your own bitrate, and get Mbps and GB per hour.

**H1:** IPTV Bandwidth and Data Calculator

**Answer-first lead (49 words):**
> To stream IPTV smoothly, plan on at least 25 Mbps for one Full HD stream and 50 Mbps for 4K. Each 1 Mbps of stream bitrate uses about 0.45 GB per hour. Pick a quality and number of screens below, or enter your own bitrate, to get exact figures.

## Inputs
1. **Quality:**
   - SD 480p
   - HD 720p
   - Full HD 1080p
   - 4K 2160p
   - Custom bitrate (Mbps)
2. **Simultaneous streams:** 1–4 (show a note that TryIPTV plans include 2).
3. **Viewing time:** hours per day (default 3).
4. **Other household use** (optional): Mbps reserved for other devices (default 0).

## Defaults
These are the planning ranges already published in `/guides/iptv-internet-speed` (`[NEEDS DATA]` until measured).

| Quality | Typical stream bitrate (Mbps) | Planning value used | Recommended connection for 1 stream |
|---|---|---|---|
| SD 480p | 1.5–3 | 3 | 8–10 Mbps |
| HD 720p | 3–6 | 6 | 15–20 Mbps |
| Full HD 1080p | 7–15 | 15 | 25–35 Mbps |
| 4K 2160p | 18–35 | 35 | 50–60 Mbps |

## Formulas
These are the same as the speed guide, so the site never contradicts itself.
- **Data per hour (GB, decimal)** = bitrate (Mbps) × 3,600 s ÷ 8 ÷ 1,000 = **bitrate × 0.45**
- **Data per day** = GB/hour × hours × streams. **Per 30-day month** = per day × 30.
- **Recommended connection (Mbps)** uses the speed guide's own planning values: `rec(n) = rec1 + (rec2 − rec1) × (n − 1)` + other household use.
  - `rec1` and `rec2` are the upper ends of the guide's one-stream and two-stream ranges: SD 10 / 20, HD 20 / 35, Full HD 35 / 50, 4K 60 / 100 Mbps.
  - Custom bitrate: `rec(n) = bitrate × n × 2`, rounded up to the next 5 Mbps. The doubling is a stated planning assumption.
  - All of these are planning estimates (`[NEEDS DATA]`) and must be labelled as such on the page.

## Output (example: 2 × Full HD, 3 h/day)
- **Recommended connection:** 50 Mbps (Full HD rec1 35 + (50 − 35) × 1)
- **Data:** 13.5 GB/hour for both streams (15 × 0.45 × 2), 40.5 GB/day, about 1.2 TB per 30 days
- **Note:** "Wi-Fi and network congestion matter more than raw speed. Use 5 GHz Wi-Fi or Ethernet for 4K."

## Page sections (answer-first H2s)
1. "How much internet speed do I need for IPTV?" (40–60-word answer plus the table above)
2. "How much data does IPTV use per hour?" (formula, worked example)
3. "Why does IPTV buffer on a fast connection?" (link to `/help/iptv-buffering`)
4. "How we calculate these numbers" (formulas, the headroom assumption, sources, last updated)
5. FAQ, with answers in the server HTML:
   - Is 25 Mbps enough for 4K?
   - Does IPTV use more data than Netflix? (only with sourced figures; otherwise omit)
   - How many streams can my plan handle?

## Technical notes
- Server-render the default result (2 × Full HD) so crawlers and AI engines see real numbers without JavaScript. Hydrate the interactive form on top of it.
- **Embed snippet:** `<iframe src="https://www.tryiptv.com/tools/iptv-bandwidth-calculator?embed=1" …>` with a visible "Calculator by TryIPTV" credit link. The anchor is branded, and it must stay a credit, not a keyword link (Google lists widely distributed template links as spam).
- Add the defaults to `PRODUCT_TRUTHS` or a `STREAMING_GUIDANCE` constant, so `check:facts` can keep the calculator and the speed guide consistent.
- Schema: `WebApplication` is optional. Don't add review or rating markup.
- **Promotion:**
  - Mention in the speed guide, buffering guide and device guides.
  - Outreach template A to home-networking and ISP sites.
  - Product Hunt once it is live.
