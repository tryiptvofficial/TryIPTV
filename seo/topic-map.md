# Topic map, gaps and content calendar (tryiptv.com)

Built 2026-10-20 from three sources:
- the live link graph and word counts (dev server, 48 sitemap URLs)
- `seo/research/topical-authority.md`
- the autocomplete-based gap research

**Status labels**
- ✅ existing
- 🟡 existing but overlapping or needing expansion
- ➕ planned (new page)
- 🧩 planned as a **section** of an existing page (fan-out coverage, no new URL)
- ⛔ not created (doorway or copyright risk)

**Rules:**
- **One strong page per intent.** Sub-questions (fan-outs) become H2/H3 sections.
- **A new URL only when the subtopic has ≥3 facets of its own** (MaxAEO 2026-07 [3P]) **and real first-hand content.**
- **No pages for keyword variants** (country, city, league, model, "best X for Y" permutations). Google's AI optimization guide (2026-07-10) calls them scaled content abuse; its spam policies call them doorways.

Linking rules (implemented in `src/lib/site-data/topic-map.ts` and `<TopicClusterLinks>`):
- Each cluster links to its pillar and 2–4 siblings.
- Each pillar links to all of its clusters.
- No orphans; at most 3 clicks from home (currently ≤2).

## Topic tree

```
/ (home)
├── Pricing & buying ─ pillar /pricing ✅
│   ├── /iptv-free-trial ✅
│   ├── /how-it-works ✅ (the buying path: WhatsApp → trial → payment → login → renewal; player steps stay on /setup)
│   ├── /faq ✅
│   ├── 🧩 "How much should IPTV cost?" (section on /pricing, not a new URL: avoids cannibalising /pricing)
│   └── ➕ /guides/iptv-connections  How many devices can I use? Connections and multi-screen explained
├── Devices ─ pillar /devices ✅ (all 11 clusters linked) · start-here hub /setup 🟡 (overlap C1)
│   ├── /devices/firestick-iptv ✅ (🧩 add: Firestick models, 4K Max/Lite/Cube, Ethernet adapter, recording)
│   ├── /devices/android-tv-iptv ✅ (🧩 add: Nvidia Shield, Sony/TCL/Philips Google TV; one page, not per brand)
│   ├── /devices/chromecast-iptv 🟡 (overlap C2 "Google TV" with Android TV)
│   ├── /devices/samsung-tv-iptv ✅ · /devices/lg-tv-iptv ✅
│   ├── /devices/apple-tv-iptv ✅ · /devices/iphone-iptv ✅
│   ├── /devices/roku-iptv ✅ · /devices/mag-box-iptv ✅
│   ├── /devices/windows-iptv ✅ · /devices/mac-iptv ✅
│   ├── ➕ /devices/formuler-iptv  Formuler (MyTVOnline 2/3), a distinct OS and app
│   ├── ➕ /devices/android-phone-iptv  Android phones and tablets (touch UI, mobile data, casting)
│   ├── ➕ /devices/hisense-vidaa-iptv  Hisense VIDAA (+ a section on Vizio SmartCast, which only casts)
│   └── ➕ /devices/xbox-playstation-iptv  Xbox and PlayStation: what works and what doesn't (one honest page)
├── Player apps ─ pillar /players ✅ (all 7 clusters linked)
│   ├── tivimate ✅ · iptv-smarters ✅ · xciptv ✅ · televizo ✅ · ott-navigator ✅ · iptv-extreme ✅ · perfect-player ✅
│   ├── 🧩 "Best IPTV player for each device" table on /players (one table covers the 8 autocomplete variants)
│   ├── ➕ /players/ibo-player  (activation by MAC/device key on Samsung/LG)
│   ├── ➕ /players/smart-iptv  (SIPTV, the legacy Samsung/LG app)
│   ├── ➕ /players/vlc  (desktop and mobile M3U playback, its limits)
│   ├── ➕ /players/kodi-pvr-iptv  (official PVR IPTV Simple Client only; no third-party add-ons)
│   └── ➕ /guides/tivimate-vs-iptv-smarters  (player vs player comparison)
├── Troubleshooting ─ pillar /help ✅ (all 5 clusters linked)
│   ├── iptv-not-working ✅ · iptv-buffering ✅ (🧩 add: freezing every 10/30 s, IPTV on Firestick keeps freezing)
│   ├── iptv-login-not-working ✅ · m3u-not-loading ✅ · epg-not-working ✅
│   ├── ➕ /help/iptv-error-codes  401, 403, 404, 458, 511, 522, 503 and "code 7", explained in one page
│   ├── ➕ /help/iptv-black-screen-no-sound  black screen with sound, no audio, audio out of sync
│   ├── ➕ /help/catch-up-not-working  catch-up/timeshift not working (+ what catch-up is)
│   └── ➕ /help/iptv-not-working-with-vpn  (paired with the VPN guide below)
├── Glossary & concepts ─ pillar /guides ✅ (all 8 clusters linked)
│   ├── what-is-iptv ✅ (includes "Is IPTV legal?" with US/UK) · how-does-iptv-work 🟡 (overlap C3, keep)
│   ├── what-is-m3u ✅ · what-are-xtream-codes ✅ · m3u-vs-xtream-codes ✅ · what-is-epg ✅
│   ├── iptv-internet-speed ✅ · iptv-vs-cable ✅ (🧩 add: satellite)
│   ├── ➕ /guides/iptv-glossary  catch-up, timeshift, multi-screen, MAC address/Stalker portal, VOD, PPV, HEVC/4K, M3U8, XMLTV (anchors linking to the deep guides)
│   ├── ➕ /guides/vpn-for-iptv  do you need a VPN: privacy, ISP throttling, speed cost (no evasion framing)
│   ├── ➕ /guides/record-iptv  recording/DVR: which players and devices support it
│   ├── ➕ /guides/iptv-vs-streaming-services  IPTV vs OTT apps (YouTube TV, Sling, Netflix), with sourced facts
│   └── ➕ /guides/iptv-for-live-sports  latency, 50/60 fps, Match Frame Rate, buffering at kick-off. **No league or channel names**, no "free sports" framing.
└── Trust & legal ─ (no pillar hub; linked from the footer, /about, /press)
    ├── /about ✅ · /press ✅ · /contact-us ✅ · policies ✅ · /dmca-report ✅
    ├── /content-licensing (gated until the owner confirms; see seo/eeat-confirm.md)
    └── ➕ /guides/spot-unsafe-iptv  how to spot fake or malware IPTV apps and sites (after licensing is confirmed)
```

## ⛔ Not created (and why)

| Requested area | Decision | Reason |
|---|---|---|
| **Countries** (IPTV USA, UK, Canada…, US states) | ⛔ No country pages. | <ul><li>Google's doorway example: "pages targeted at specific regions or cities that funnel users to one page".</li><li>Licensing differs by country.</li><li>Competitor state pages are thin.</li></ul>If licensing for specific territories is confirmed, add one honest "Where TryIPTV is available" section to `/faq` or `/content-licensing`. |
| **Sports** (NFL, Premier League, PPV, events) | ⛔ No league or event pages. | <ul><li>Copyright demotion risk (Google legal removals).</li><li>YouTube and Trustpilot policy risk.</li><li>Autocomplete for these seeds leans to piracy ("free iptv for nfl", "github").</li></ul>Covered instead by the **technical** `/guides/iptv-for-live-sports` (no league names). |
| **Language / diaspora** (Arabic, Indian…) | ⛔ For now. | Rights risk. Arabic seeds lean to free M3U and Telegram piracy. Reconsider only with confirmed licensed channel packages. |
| **Downloader codes, MAC "generators"** | ⛔ Never. | They point to unverified APKs or credential sharing. |
| **Nvidia Shield, Sony, TCL, Philips as separate pages** | ⛔ No separate pages. Become sections. | They run Android TV or Google TV, so separate pages would be near-duplicates of `/devices/android-tv-iptv`. Bing: "LLMs group near-duplicate URLs into a single cluster". |
| **"Best IPTV player for [device]" × 8** | ⛔ No separate pages. One table on `/players`. | Keyword-variant pages are scaled content abuse. |
| **Reseller / affiliate program, reviews page** | ⛔ Out of scope. | Needs owner decisions. Reviews only from a genuine platform (Trustpilot), never on-site self-reviews. |

## Overlaps, merges and redirects

**Evidence:** 5-gram text overlap between every pair of content pages is at most **13.4%** (`/devices/samsung-tv-iptv` vs `/devices/lg-tv-iptv`; shared template text). Every content page has **≥978 words**. Utility pages (contact, legal, press) are short by nature.

**Decision: no page is thin or duplicate enough to merge or redirect.** Google calls deleting content "a last resort", and merging distinct intents would lose coverage. The overlaps are about intent, and are handled without new redirects:

| ID | Pages | Overlap | Action |
|---|---|---|---|
| C1 | `/devices` vs `/setup` | Both read as "IPTV setup guides" hubs | Keep both. `/devices` = the device list (pillar); `/setup` = the start-here path (credentials → player → device). 📝 Retitle `/devices` toward "IPTV compatible devices" (needs owner OK; see `seo/keyword-map.md`). |
| C2 | `/devices/android-tv-iptv` vs `/devices/chromecast-iptv` | Both claim "Google TV" | Keep both. Chromecast keeps legacy cast-only dongles and casting. 🧩 Google TV brands (Nvidia Shield, Sony, TCL) are added to the Android TV page. 📝 Retitle Chromecast without "Google TV" (needs owner OK). |
| C3 | `/guides/what-is-iptv` vs `/guides/how-does-iptv-work` | Both explain "how IPTV works" | Keep both (definition vs mechanism); they cross-link. Merge with a 301 only if Search Console shows them swapping on the same queries for 8+ weeks. |
| — | Legacy device aliases (`/devices/firestick`, `/devices/android-tv`, …) | Old URLs | ✅ Already permanently redirected (`REDIRECTED_DEVICE_SLUGS`, 308). |

## Internal linking: done on branch `topical-authority`

- `src/lib/site-data/topic-map.ts`: 3 pillars (`/players`, `/guides`, `/help`) and their 20 clusters, each with a descriptive anchor, a one-line blurb and 3 hand-picked siblings.
- `<TopicClusterLinks>` ("More in …" block, an `<aside>` with real `<a href>` links) on all 20 player, guide and help pages: 3 siblings plus the pillar.
- `/devices` already met the rule: device pages link the hub and 5 sibling guides.
- **Verified by crawl** (JavaScript off, 48 URLs):
  - 0 rule violations (every cluster → pillar plus ≥2 siblings; every pillar → all clusters)
  - **max depth 2**, **0 orphans**
  - breadcrumbs consistent (Home › Section › Page)

## Gap list, ranked

**Ranking basis**
- Buying intent, then demand: autocomplete presence (no search volumes available; Ahrefs plan insufficient) and how widely competitors cover the topic.
- Then risk: everything ⛔ above is excluded.

| # | Page | Type | Intent | Demand signal (autocomplete, 2026-10-20) | Why it's not a variant page |
|---|---|---|---|---|---|
| 1 | /guides/iptv-connections | ➕ | high | "iptv multiple devices simultaneously", "iptv multiple connections", "how many devices can use iptv smarters" | Distinct topic: connection limits, what counts as a stream, what happens past the limit. Supports /pricing. |
| 2 | /players: per-device "best player" table | 🧩 | high | 8× "best iptv player for [device]" | One table, not 8 pages |
| 3 | /players/ibo-player | ➕ | high | "ibo player pro", "ibo player playlist" | Distinct app with its own activation flow (MAC/device key) |
| 4 | /help/iptv-error-codes | ➕ | med–high (churn) | "iptv error code 401/403/404/458/511/522/7" | One page for all codes, not a page per code |
| 5 | /devices/formuler-iptv | ➕ | high | "iptv formuler z10/z11/z12/z8" | Distinct OS and app (MyTVOnline); models become sections |
| 6 | /help/iptv-buffering: freezing section | 🧩 | high | "iptv freezing every 10 seconds", "iptv freezing on firestick" | Same intent as buffering |
| 7 | /pricing: "How much should IPTV cost?" | 🧩 | high | "how much does iptv cost" (competitors have pages) | A new URL would cannibalise /pricing |
| 8 | /devices/android-phone-iptv | ➕ | med | "best iptv player for android" | Touch UI, mobile data, casting: different steps from Android TV |
| 9 | /devices/hisense-vidaa-iptv | ➕ | med–high | "iptv hisense vidaa", "iptv vizio smart tv" | Distinct OS (VIDAA). Vizio is a section. |
| 10 | /players/smart-iptv | ➕ | med | "smart iptv black screen" | Distinct legacy app with paid activation |
| 11 | /guides/vpn-for-iptv + /help/iptv-not-working-with-vpn | ➕➕ | med | "iptv vpn or not", "iptv not working with vpn" | Explainer vs troubleshooting: two different intents |
| 12 | /help/catch-up-not-working | ➕ | med | "iptv catch up not working", "iptv catch up meaning" | Distinct symptom; includes the definition |
| 13 | /help/iptv-black-screen-no-sound | ➕ | med | "iptv black screen with sound", "…after loading portal" | Distinct A/V symptoms (no overlap with buffering) |
| 14 | /guides/iptv-glossary | ➕ | low–med | "iptv vs ott", "iptv mac address player" | One hub of definitions linking the deep guides |
| 15 | /guides/iptv-vs-streaming-services | ➕ | high | "iptv vs netflix", "iptv vs ott", "iptv vs youtube tv" | One comparison page, not one per service |
| 16 | /guides/tivimate-vs-iptv-smarters | ➕ | med | "iptv vs tivimate" | Head-to-head of our two most-linked players |
| 17 | /players/vlc and /players/kodi-pvr-iptv | ➕➕ | med | "iptv vlc media player", "iptv kodi player" | Distinct apps (official Kodi PVR client only) |
| 18 | /guides/record-iptv | ➕ | med | "iptv recorder windows/android", "can you record iptv on firestick" | Distinct task across players |
| 19 | /devices/xbox-playstation-iptv | ➕ | med | "iptv xbox series x/s", "iptv ps5" | One honest page about limited console support |
| 20 | /guides/iptv-for-live-sports | ➕ | high | "iptv for sports only", "iptv 4k sports" | Technical (latency, frame rate), no league names |
| 21 | /devices/android-tv-iptv: Shield and Google TV brands section; /devices/firestick-iptv: models section; /guides/iptv-vs-cable: satellite section | 🧩🧩🧩 | med | "iptv nvidia shield tv pro", "iptv 4k max", "iptv vs satellite tv" | Sections, not pages |
| 22 | /guides/spot-unsafe-iptv | ➕ | med (trust) | competitors' "fake IPTV website" pages; malware news | **Gated:** publish only after licensing is confirmed |

## 3-month content calendar (from 2026-10-26)

**Ordering**
- Highest buying intent and demand first.
- Pages that support `/pricing` and `/iptv-free-trial` early.
- Trust-gated items last.

**Capacity:** about 2 items a week.

**Every new page must:**
- have a unique first-hand angle (real menu paths, screenshots on owned devices, tested versions, dated)
- open with an answer-first lead
- use question H2s from autocomplete
- carry a FAQ in the server HTML
- be added to `topic-map.ts` (pillar plus 2–4 siblings) and to `site-routes.ts`, and pinged with IndexNow

### Month 1: buying intent and churn (weeks of Oct 26 – Nov 16)
| Week | Item | Type | Pillar | Notes |
|---|---|---|---|---|
| 1 | /guides/iptv-connections | ➕ | /guides (links /pricing) | Uses `PRODUCT_TRUTHS.connections`; checked by `check:facts` |
| 1 | /players: per-device "best player" table | 🧩 | /players | Device × recommended players × login formats |
| 2 | /players/ibo-player | ➕ | /players | Screenshots of activation on Samsung or LG |
| 2 | /help/iptv-buffering: freezing section | 🧩 | /help | "every 10 seconds" patterns and their causes |
| 3 | /help/iptv-error-codes | ➕ | /help | Table: code → meaning (RFC 9110 for HTTP) → fix |
| 3 | /pricing: "How much should IPTV cost?" | 🧩 | /pricing | Per-month maths from `FACT_TEXT`, one-time payment vs monthly |
| 4 | /devices/formuler-iptv | ➕ | /devices | Needs a real Formuler device or owner screenshots |
| 4 | /devices/firestick-iptv: models section; /devices/android-tv-iptv: Shield and Google TV brands section | 🧩🧩 | /devices | — |

### Month 2: devices, players, troubleshooting (Nov 23 – Dec 14)
| Week | Item | Type | Pillar |
|---|---|---|---|
| 5 | /devices/android-phone-iptv | ➕ | /devices |
| 5 | /players/smart-iptv | ➕ | /players |
| 6 | /devices/hisense-vidaa-iptv (+ Vizio section) | ➕ | /devices |
| 6 | /help/catch-up-not-working | ➕ | /help |
| 7 | /guides/vpn-for-iptv | ➕ | /guides |
| 7 | /help/iptv-not-working-with-vpn | ➕ | /help |
| 8 | /help/iptv-black-screen-no-sound | ➕ | /help |
| 8 | /guides/iptv-vs-cable: satellite section | 🧩 | /guides |

### Month 3: comparisons, glossary, depth (Dec 21 – Jan 18)
| Week | Item | Type | Pillar |
|---|---|---|---|
| 9 | /guides/iptv-vs-streaming-services | ➕ | /guides |
| 9 | /guides/iptv-glossary | ➕ | /guides |
| 10 | /guides/tivimate-vs-iptv-smarters | ➕ | /guides (links both players) |
| 10 | /players/vlc | ➕ | /players |
| 11 | /players/kodi-pvr-iptv | ➕ | /players |
| 11 | /guides/record-iptv | ➕ | /guides |
| 12 | /devices/xbox-playstation-iptv | ➕ | /devices |
| 12 | /guides/iptv-for-live-sports (technical) | ➕ | /guides |
| gated | /guides/spot-unsafe-iptv | ➕ | /guides — publish only after `/content-licensing` is confirmed |

**Measurement:** after each month, check the following and adjust the remaining order:
- Search Console (Queries per page; generative-AI impressions)
- Bing Webmaster Tools AI Performance (grounding queries; Topics Portfolio opportunity queries)
- the 30 test prompts in `seo/geo-test-prompts.md`
