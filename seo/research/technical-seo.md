# Technical SEO research — tryiptv.com

Research date: **2026-10-20**. Window: last 90 days first (≈ 2026-07-22 → 2026-10-20), then last 12 months.
Compiled from five parallel research passes (Google, Bing/IndexNow, AI Overviews/AI Mode, AI crawlers, competitors & news). Every item has its source and date. Anything not from the platform owner is marked **(unconfirmed)**.

---

## 1. Google

| Date | Finding | Source | Implication for tryiptv.com |
|---|---|---|---|
| 2026-10-15 (page update) | Google-Extended is a robots.txt token only; it controls Gemini training/grounding and "does not impact a site's inclusion in Google Search". | https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers | Blocking it has no effect on Search, AI Overviews or AI Mode. |
| 2026-10-13 | CrUX publishes experimental soft-navigation LCP/INP/CLS; Google aims to graduate them in May 2027, after which Search Console switches to the new data. | https://web.dev/blog/crux-experimental-soft-navs/ · https://developer.chrome.com/docs/crux/release-notes | Next.js `<Link>` navigations will be measured per URL. Watch INP on route transitions. |
| 2026-10-08 | September 2026 spam update completed (started 2026-09-24, ~14 days, global). | https://status.search.google.com/incidents/XhUDXP7A67iHCD2kmbVu | Use as an annotation when reading Search Console traffic. |
| 2026-10-06 | `Retry-After` documented for emergency crawl-rate reduction. | https://developers.google.com/crawling/docs/changelog | If a firewall ever returns 429/503 to Googlebot, send `Retry-After` and keep it short. |
| 2026-09-22 (page update) | Page experience: Core Web Vitals are used by ranking systems; HTTPS, mobile, ads and interstitials do not directly boost ranking. | https://developers.google.com/search/docs/appearance/page-experience | Avoid intrusive promo overlays on mobile. |
| Sept 2026 dataset | CrUX: 68.3% of origins have good LCP, 85.4% good INP; Google flags continued INP regression. | https://developer.chrome.com/docs/crux/release-notes | INP is the metric to watch. |
| 2026-08-31 | Search Console "Search generative AI" control rolled out worldwide: Include (default) / Exclude, property level. Generative AI performance report shows impressions only. | https://support.google.com/webmasters/answer/16908024 · https://blog.google/products-and-platforms/products/search/new-controls-website-owners/ | Leave it on **Include**. Use the report's Pages dimension. |
| 2026-08-28 | Site reputation abuse: manual-action enforcement now differs inside the EEA. | https://developers.google.com/search/blog/2026/08/update-site-reputation-policy | Relevant only if third-party or partner content is ever hosted. Keep guides first-party. |
| 2026-08-18 → 08-21 | August 2026 spam update. | https://status.search.google.com/incidents/LEubPCm2octf2uMqCFKE | Annotation. |
| 2026-07-10 | "Optimizing for generative AI features" guide: indexed and snippet-eligible is enough; no special markup, llms.txt or chunking. Mass-producing fan-out query pages is scaled content abuse. | https://developers.google.com/search/docs/fundamentals/ai-optimization-guide | No llms.txt work is needed for Google. Never generate device × city page sets. |
| 2026-07-10 | Canonical clusters can take up to two weeks to re-evaluate after a fix. | https://developers.google.com/search/docs/crawling-indexing/canonicalization-troubleshooting | Keep device pages materially different. |
| 2026-07-08 (page update) | Sitemaps: `lastmod` is used only if consistently and verifiably accurate. | https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap | Keep real per-page dates, never build time. |
| 2026-07-24 | Review snippets: guideline against fake or undisclosed incentivised reviews (self-serving reviews were already ineligible). | https://developers.google.com/search/docs/appearance/structured-data/review-snippet | Don't add self-served `AggregateRating`. |
| 2026-06-24 → 06-26 | June 2026 spam update. | https://status.search.google.com/incidents/YUX1peHev5a4fkxLDiUQ | Annotation. |
| 2026-06-17 | Change of Address: use it for every host variant, www and non-www. | https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes | One canonical host with a single-hop redirect. |
| 2026-05-21 → 06-02 | May 2026 core update. | https://status.search.google.com/incidents/wdAXJk6LRRihEjpzEeWE | Annotation. |
| 2026-05-07/08 (removed from docs 06-15) | **FAQ rich results deprecated**: no longer shown in Search. | https://developers.google.com/search/updates · https://developers.google.com/search/docs/appearance/structured-data/faqpage | FAQPage markup is harmless but brings no search feature. |
| 2026-05-15 | Spam policies now explicitly cover manipulating generative AI responses. | https://developers.google.com/search/docs/essentials/spam-policies | No hidden or LLM-targeted text. |
| 2026-04-13 (enforced from 06-15) | **Back-button hijacking** is now a spam policy (malicious practices). | https://developers.google.com/search/blog/2026/04/back-button-hijacking | Audit for history manipulation. |
| 2026-03-31 / 02-03 | **Googlebot fetches only the first 2 MB** of an HTML response (uncompressed, headers included); each JS/CSS resource has its own limit. Put title, meta, canonical and structured data early. | https://developers.google.com/search/blog/2026/03/crawler-blog-post · https://developers.google.com/search/docs/crawling-indexing/googlebot | Measure the largest pages, including inline RSC payload. |
| 2026-03-31 | Google crawler IP ranges moved to `/crawling/ipranges/`. | https://developers.google.com/search/blog/2026/03/crawler-ip-ranges | Update any firewall rule that pulls the old list. |
| 2026-03-24 | Robots meta tags in `<body>` are respected. | https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag | No stray `noindex` should appear on valid pages. |
| 2026-03-27 → 04-08 · 2026-03-24 → 03-25 | March 2026 core and spam updates. | status.search.google.com | Annotation. |
| 2025-12-15/17/18 | JS SEO: only 200-status pages are reliably rendered; the canonical set by JS must equal the initial HTML; JS `noindex` behaviour is undefined. | https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics | Server-rendered canonical and robots only. Real 404 status codes. |
| 2025-12-11 → 12-29 | December 2025 core update. | https://status.search.google.com/incidents/DsirqJ1gpPRgVQeccPRv | Annotation. |
| 2025-12-10 (page update) | Ranking systems: a significant volume of valid copyright removal requests demotes other content on the same site. | https://developers.google.com/search/docs/appearance/ranking-systems-guide | **Main IPTV-specific risk.** Monitor the Google Transparency Report. Avoid naming or promising specific copyrighted channels or events. |
| — | Core Web Vitals thresholds unchanged: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1, at the 75th percentile. | https://developers.google.com/search/docs/appearance/core-web-vitals | Targets for this audit. |
| 2025-06-03 (unconfirmed) | Google reportedly stopped allowing ads on the term "IPTV" (per anti-piracy group BREIN). | https://torrentfreak.com/anti-piracy-group-brein-ramps-up-iptv-actions-under-new-leadership/ | Organic search is the main channel. |

## 2. Bing and IndexNow

| Date | Finding | Source | Implication |
|---|---|---|---|
| 2026-10-13 | Bing Webmaster Tools AI Performance gains a "Topics Portfolio" beta (citation topic clusters and opportunity queries). | https://blogs.bing.com/webmaster/2026/10/introducing-topics-portfolio-beta-in-ai-performance/ | Use it once the site is verified and cited. |
| 2026-06-16 | AI Performance gains Intents, Topics, Citation Share and Compare. | https://blogs.bing.com/search/June-2026/New-AI-Visibility-Insights-in-Bing-Webmaster-Tools-Intents-Topics-Citation-Share-Compare | Track Copilot citations by intent. |
| Feb 2026 rewrite (date per SEJ 2026-02-27, unconfirmed) | Bing Webmaster Guidelines now cover search, Copilot and grounding. Sitemaps: canonical URLs only, accurate `lastmod` plus ETags. **IndexNow: "Avoid batch submissions when possible. Streaming submissions…"** Don't hide critical content behind client-side rendering. NOARCHIVE blocks Copilot use; NOCACHE limits it. | https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a | Submit only changed URLs. Never use nocache or noarchive on pages we want cited. |
| 2026-02-10 | AI Performance report (public preview): citations per page and grounding queries. | https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/ | Verify the site to see Copilot citations. |
| 2025-07-31 | Sitemaps in AI search: Bing uses `lastmod` as a key freshness signal; it must be the true content change time (ISO 8601); changefreq and priority are ignored. | https://blogs.bing.com/webmaster/2025/7/Keeping-Content-Discoverable-with-Sitemaps-in-AI-Powered-Search/ | Already compliant: real dates, no changefreq or priority. |
| undated | IndexNow protocol: key file at `/{key}.txt`; batch POST up to 10,000 URLs; responses 200/202/400/403/422/429; submit added, updated or deleted URLs; avoid resubmitting unchanged URLs (422 risk); honour `Retry-After` on 429. | https://www.indexnow.org/documentation · https://www.indexnow.org/faq | Script should send only changed URLs and back off on 429. |
| undated | Participants: Bing, Yandex, Seznam, Naver, Yep, Internet Archive, Amazonbot. Google does not participate (no official statement found). | https://www.indexnow.org/searchengines.json | One submission reaches all of them. Google still relies on sitemaps and Search Console. |
| undated | Bingbot: a robots.txt section named for Bingbot replaces the `*` section entirely, so it must repeat every rule. Crawl-delay overrides Crawl Control. | https://www.bing.com/webmasters/help/how-to-create-a-robots-txt-file-cb7c31ec | Ours repeats the rules. No crawl-delay. |
| undated | Verification: import from Google Search Console, BingSiteAuth.xml, meta tag, or DNS CNAME. | https://www.bing.com/webmasters/help/add-and-verify-site-12184f8b | See the setup steps below. |

## 3. AI Overviews and AI Mode (Google)

| Date | Finding | Source | Implication |
|---|---|---|---|
| 2026-07-10 | Eligibility: indexed, snippet-eligible, and site included via the Search Console control (the default). No special schema needed. | https://developers.google.com/search/docs/fundamentals/ai-optimization-guide | Already eligible: indexed, `max-snippet:-1`. |
| 2026-03-24 (page update) | `nosnippet` also prevents use as direct input to AI Overviews and AI Mode; `max-snippet` limits it. The doc says nothing about AI features for `data-nosnippet` or `max-image-preview`. | https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag | Keep `max-snippet:-1` and `max-image-preview:large`, as set today. |
| 2026-08-31 | The opt-out is a Search Console toggle, separate from Google-Extended and noindex. | https://support.google.com/webmasters/answer/16908024 | Don't confuse the three controls. |
| 2026-09-16 (unconfirmed, SER quoting Mueller) | AI position and impression metrics will evolve. | https://www.seroundtable.com/google-search-console-ai-reporting-change-42099.html | Watch trends rather than setting hard KPIs. |
| 2026-03-02 / 2026-09-02 (unconfirmed, Ahrefs) | Only about 38% of AI Overview citations rank in the top 10. YouTube and Reddit are the most-cited domains. | https://ahrefs.com/blog/ai-overview-citations-top-10/ · https://ahrefs.com/blog/most-cited-domains-ai-overviews/ | Clear, specific answers can be cited from lower positions. Genuine video and community presence matters. |
| 2026-07-10 | **llms.txt is not used by Google Search** ("neither harm nor help"). | AI optimization guide (above) | The existing `/llms.txt` is harmless. No further work. |

## 4. AI crawlers

| Bot | Operator | Purpose | Respects robots.txt | Runs JS | Source |
|---|---|---|---|---|---|
| GPTBot | OpenAI | Training | Yes | No (tests, unconfirmed) | https://developers.openai.com/api/docs/bots |
| OAI-SearchBot | OpenAI | ChatGPT search index | Yes (about 24 h) | No (unconfirmed) | same |
| ChatGPT-User | OpenAI | User-triggered fetch | "may not apply" (official) | No (unconfirmed) | same |
| PerplexityBot | Perplexity | Search index; not used for model training | Yes | No (unconfirmed) | https://docs.perplexity.ai/guides/bots |
| Perplexity-User | Perplexity | User fetch | "generally ignores" (official) | No (unconfirmed) | same |
| ClaudeBot | Anthropic | Training | Yes, including crawl-delay | No (unconfirmed) | https://support.claude.com/en/articles/8896518 (updated 2026-04-07) |
| Claude-SearchBot | Anthropic | Search index | Yes | Unknown | same |
| Claude-User | Anthropic | User fetch | Yes | No (unconfirmed) | same |
| Googlebot | Google | Search, including AI Overviews and AI Mode | Yes | **Yes** | https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics |
| Google-Extended | Google | Gemini training and grounding (token only) | Yes | n/a | google-common-crawlers (2026-10-15) |
| Google-Agent, Google-GeminiNotebook | Google | User-triggered fetch | "generally ignore" (official) | Unknown | https://developers.google.com/search/docs/crawling-indexing/google-user-triggered-fetchers (2026-08-19) |
| Bingbot | Microsoft (also feeds Copilot) | Search and Copilot | Yes | Edge engine (official) | https://www.bing.com/webmasters/help/which-crawlers-does-bing-use-8c184ec0 |
| Applebot / Applebot-Extended | Apple | Search / training opt-out token | Yes | "may render" | https://support.apple.com/en-us/119829 (2026-09-04) |
| meta-externalagent / meta-webindexer / meta-externalfetcher | Meta | Training / AI search / user fetch | Yes / Yes / "may bypass" | Unknown | https://developers.facebook.com/docs/sharing/webmasters/web-crawlers/ |
| CCBot | Common Crawl | Open dataset | Yes | No (unconfirmed) | https://commoncrawl.org/ccbot |
| Bytespider | ByteDance | Training | No official page found | — | (unconfirmed) |

- **JavaScript:** "None of the major AI crawlers currently render JavaScript" except Google and Apple. Source: Vercel/MERJ test, 2024-12-17, https://vercel.com/blog/the-rise-of-the-ai-crawler (unconfirmed). One unconfirmed 2026-09-30 claim says OpenAI began rendering on 2026-09-25. **Server-rendered HTML is the safe baseline.**
- **Cloudflare:** per-behaviour Search, Agent and Training controls (changelog 2026-07-01). From 2026-09-15, new ad-monetised domains block Training and Agent by default. The legacy "Block AI bots" toggle is deprecated and "Block" now also affects mixed-use search crawlers. Sources: https://developers.cloudflare.com/changelog/post/2026-07-01-ai-traffic-options/ · https://blog.cloudflare.com/accountable-mixed-use-ai-crawlers/
- **Vercel:** the AI Bots and Bot Protection managed rulesets are off by default (docs updated 2026-09-10). Bot Protection does not work behind a reverse proxy such as Cloudflare. Source: https://vercel.com/docs/vercel-firewall/vercel-waf/managed-rulesets
- **Measured for tryiptv.com (2026-10-20):** live responses carry `server: cloudflare` and `x-vercel-cache`, so **Cloudflare sits in front of Vercel** and its AI-crawler settings apply.

## 5. Competitors and industry news

Competitor sample from a non-Google search tool (US results), 2026-10-20 (unconfirmed as a ranking sample). Most "best IPTV" results were parasite pages on hijacked hosts, not provider sites.

| Site | Stack | Content without JS | Schema | AI-bot rules | Sitemap `lastmod` |
|---|---|---|---|---|---|
| iptvpro.us | Next.js on Vercel (SSR/ISR) | Yes | Product/Offer, self-served AggregateRating, FAQPage | none | Identical build timestamp on all URLs (low trust) |
| usiptvprovider.com | Static HTML on Hostinger | Yes | Service, OfferCatalog, FAQPage | Explicitly allows all AI bots | Sitemaps listed in robots.txt return 404 |
| pillariptv.com | WordPress, Elementor, Rank Math, Cloudflare | Yes | Rank Math defaults only | none | Real dates (sitemap index served with `X-Robots-Tag: noindex`) |
| iptvserviceradar.com (affiliate) | WordPress, Cloudflare | Yes | Article/Person | none | Real dates |
| hdxtv.us → 4k-stream.us | WordPress, LiteSpeed | Yes | Rank Math defaults | none | Stale (2026-07-25) |

Takeaway: tryiptv.com already matches or beats every competitor in this sample:
- server-rendered content, per-page canonicals, real `lastmod` dates and explicit AI-bot rules;
- no self-served review markup;
- HTML at 79–292 KB, against 150–603 KB for the sample.

**News (third-party unless an official source is linked):**
- **Unconfirmed, conference recaps:** scaled content is "now becoming more of a problem than link spam" (SER 2026-10-05). Crawl and index timing ranges (SEJ 2026-10-04).
- **Unconfirmed, Bluesky post:** low-value programmatic SEO can make Google's systems "lose faith" in a site (2026-09-07).
- **No IPTV-specific Google policy change** found in 2025–2026. The copyright-removal demotion remains the relevant mechanism.

---

## What we will apply (checklist)

**Measured on the local production build (2026-10-20):**
- 46/46 pages return 200; real 404s with `noindex` for unknown URLs (no soft 404s).
- 19 redirects, all single-hop 308.
- Sitemap = the 46 indexable URLs with real `lastmod`; no orphan pages; maximum click depth 2.
- One H1 per page; unique titles and descriptions.
- Self-canonical on every page; `max-snippet:-1`.
- All content present in raw HTML.
- JSON-LD valid; HTML ≤ 292 KB.
- No history manipulation.
- Security headers present.
- IndexNow key served.

| # | Item | Why (source) | Action |
|---|---|---|---|
| 1 | Keep server-rendered content, canonicals and robots (no change needed) | Google JS SEO 2025-12; Bing guidelines; AI crawlers don't run JS | Verified, nothing to change |
| 2 | IndexNow: submit **only changed URLs** (by real `lastmod` or an explicit list), handle 429 `Retry-After`, don't resubmit unchanged URLs | Bing guidelines 2026; indexnow.org FAQ | **Code change** to `scripts/indexnow*.mjs` |
| 3 | Article JSON-LD: add `image` using the page's existing OG image (a real asset, no invented data) | Article structured-data guidance (recommended property) | **Code change** to `src/lib/schema.ts` |
| 4 | Article `datePublished`: **not added**, because we have no real publication dates and won't invent them | "Never invent data" | **Your input** (real dates) |
| 5 | FAQPage JSON-LD: keep (harmless, matches visible text); no SERP feature since 2026-05-07 | Google updates 2026-05 | No change |
| 6 | Single-hop redirect for `http://tryiptv.com` (today 2 hops: Cloudflare HTTPS, then app host) | Change of Address / redirect guidance 2026-06-17 | **Your action** in Cloudflare |
| 7 | Cloudflare AI-crawler settings: confirm Search and Agent are allowed; decide on Training | Cloudflare 2026-07-01 / 2026-09-15 | **Your action** in Cloudflare |
| 8 | Search Console: verify property, sitemap, generative-AI control on **Include**, CWV and soft-nav INP | Google 2026-08-31, 2026-10-13 | **Your action** (steps in the audit table) |
| 9 | Bing Webmaster Tools: verify (GSC import or DNS), submit sitemap, watch AI Performance and IndexNow receipt | Bing 2026-02/06/10 | **Your action** |
| 10 | Monitor DMCA removals for the domain (Transparency Report) | Ranking systems guide | **Your action**, ongoing |
| 11 | One meta description is 169 characters (`/help/epg-not-working`) | Truncation risk only | Optional; copy change needs your OK |
| 12 | `/blog`: 200 + `noindex`, placeholder with no H1, unlinked | Thin-page hygiene | **Your decision** (keep, 404 or redirect) |
