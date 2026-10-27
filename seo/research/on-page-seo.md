# On-page SEO research (tryiptv.com)

Compiled 2026-10-20 from five parallel research passes. Every source was opened on 2026-10-20 unless marked otherwise.

**How to read this document**
- **[Official]** marks a statement from Google, Microsoft, OpenAI, Perplexity or Anthropic.
- **[3P]** marks a third-party study or report. These are correlational, and the method is given where it was published.
- Sources from the last 90 days (2026-07-22 to 2026-10-20) are listed first in each section, then older ones from the last 12 months.

**Tool limits**
- Ahrefs returned "Insufficient plan", so there is no search volume, keyword difficulty or verified Google SERP data.
- Search volumes in `seo/keyword-map.csv` stay blank rather than estimated.

---

## 1. Google: titles, descriptions, headings, helpful content, intent, core updates

### Last 90 days

| Date | Source | What it says | Implication |
|---|---|---|---|
| 2026-10-05 | [Official] [Creating helpful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) (re-dated; no changelog entry) | <ul><li>The title or main heading should be descriptive, not exaggerated.</li><li>Google has no preferred word count.</li><li>Don't re-date pages to look fresh.</li><li>Trust is the core of E-E-A-T.</li></ul> | <ul><li>No unsupported superlatives.</li><li>Add "2026" only where a visible updated date backs it up.</li><li>Don't pad pages.</li></ul> |
| 2026-10-01 | [Official] [Using generative AI content](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content) | <ul><li>AI-drafted **titles, meta descriptions**, structured data and alt text must be fact-checked.</li><li>Refers to rater guidelines §4.6.5 and §4.6.6 (scaled and low-effort content).</li></ul> | Every new title and description below was checked against facts already on the page. |
| 2026-09-24 → 10-08 | [Official] [September 2026 spam update](https://status.search.google.com/incidents/XhUDXP7A67iHCD2kmbVu) | Global spam update; no category named. | Avoid templated near-duplicate pages. |
| 2026-08-28 | [Official] [Spam policies](https://developers.google.com/search/docs/essentials/spam-policies) | <ul><li>Accordions and tabs are **not** hidden-text abuse.</li><li>Covers scaled content abuse.</li><li>Under legal removals, many valid copyright notices demote the whole site.</li></ul> | <ul><li>Server-rendered FAQ accordions are fine.</li><li>Don't promise named channels or events.</li></ul> |
| 2026-07-24 / 09-08 | [Official] [Review snippet guidelines](https://developers.google.com/search/docs/appearance/structured-data/review-snippet) | <ul><li>No fake reviews, and no undisclosed incentivised reviews.</li><li>Self-serving Organization reviews are not eligible.</li></ul> | Don't add AggregateRating to the site's own Organization or service. |

### Last 12 months

| Date | Source | What it says | Implication |
|---|---|---|---|
| 2026-07-10 | [Official] [AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) | <ul><li>Use headings and sections.</li><li>Don't chunk content.</li><li>Don't rewrite pages "for AI".</li><li>llms.txt is ignored.</li><li>No special schema is needed.</li><li>Pages made for fan-out query variants count as scaled abuse.</li></ul> | One strong page per intent. |
| 2026-06-15 | [Official] [Search Central changelog](https://developers.google.com/search/updates) | FAQ rich results were removed from Search. | Keep visible FAQs for users. Don't expect SERP space from the markup. |
| 2026-05-21 → 06-02 | [Official] [May 2026 core update](https://status.search.google.com/incidents/wdAXJk6LRRihEjpzEeWE) | This is the last core update; there have been none since. | — |
| 2026-04-20 | [Official] [Snippet doc](https://developers.google.com/search/docs/appearance/snippet) | <ul><li>Snippets are built per query.</li><li>The meta description is used when it describes the page better than the page text does.</li><li>There is **no length limit**.</li><li>Write unique descriptions with concrete facts such as price.</li><li>For "read more" deep links, keep content visible and preserve hash anchors.</li></ul> | Descriptions should carry real numbers: $16, 24 hours, 2 connections. |
| 2026-03-21 | [3P] [9to5Google](https://9to5google.com/2026/03/21/google-search-test-replaces-headlines-and-website-titles-with-ai/) | Google confirmed a "small" test rewriting titles for the query. No rollout has been announced. | Titles that match the H1 are less likely to be rewritten. |
| 2025-12-10 | [Official] [Title links](https://developers.google.com/search/docs/appearance/title-link) | <ul><li>There is **no maximum length**; titles are truncated to the device width.</li><li>Rewrite triggers: half-empty or obsolete titles, near-identical titles, inaccurate titles, competing headings, and a duplicated site name.</li></ul> | <ul><li>Make title, H1 and og:title agree.</li><li>Use one brand suffix.</li><li>Fix short, half-empty titles.</li></ul> |
| 2025-12-10 | [Official] [SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) | <ul><li>Heading order doesn't affect ranking.</li><li>There is no ideal number of headings.</li><li>Don't stuff keywords; synonyms are matched.</li></ul> | One clear H1 is for users and accessibility, not a ranking rule. |
| 2025-09-11 | [Official] [Search Quality Rater Guidelines](https://guidelines.raterhub.com/searchqualityevaluatorguidelines.pdf) (still the current edition) | <ul><li>Who runs the site, contact details, refund policy, and Trust matter.</li><li>Intent types: Know, Do, Website, and others.</li></ul> | <ul><li>The trial query is a Do query, so the CTA and terms belong above the fold.</li><li>Setup queries need the steps first.</li></ul> |
| (2019–20) | [3P] [Mueller on multiple H1s](https://searchengineland.com/multiple-h1s-wont-get-in-the-way-of-your-seo-google-says-322909) | Multiple H1s are not a problem. Nothing newer was found. | — |
| undated | [3P] [Zyppy title-rewrite study](https://zyppy.com/seo/google-title-rewrite-study/) | Titles of 51–60 characters had the lowest rewrite rate. | The 50–60 character target is a heuristic, not a Google rule. |

## 2. Bing: on-page guidance, keyword stuffing, one topic per URL

| Date | Source | What it says | Implication |
|---|---|---|---|
| 2026-10-13 | [Official] [Topics Portfolio (beta)](https://blogs.bing.com/webmaster/2026/10/introducing-topics-portfolio-beta-in-ai-performance/) | Groups grounding queries into topics and lists "opportunity queries" where other sites are cited. | Use it in Bing Webmaster Tools to find topic gaps. |
| 2026-02 (rewrite dated 02-27 by SEJ) | [Official] [Bing Webmaster Guidelines](https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a) | See the four topic rows below. | See the four topic rows below. |
| ↳ Titles and descriptions (§13) | | "Missing, duplicate, or overly short" titles or descriptions can reduce indexing, ranking and citation eligibility. **No character counts.** | Lengthen the 20–28-character titles. |
| ↳ One topic per URL (§17) | | Pages focused on one topic are more likely to be selected for grounding. "Align titles, heading, and content intent." | Title, H1 and intro must state the same topic. |
| ↳ Key information early and explicit (§15, §16, §18) | | Put key facts near the top. Make them explicit and verifiable. Name entities consistently. | Use "TryIPTV" consistently and state facts in text. |
| ↳ Keyword stuffing (abuse section) | | Excessive repetition or "artificially engineered language", including content written to bait AI, can reduce visibility or lead to removal. | No repeated keyword strings. |
| 2026-02-10 | [Official] [AI Performance help](https://www.bing.com/webmasters/help/ai-performance-9f8e7d6c) | Use descriptive headings, concise sections, tables and FAQ-style content. Match the format to intent: comparison tables for comparisons, steps for planning. | Use a plan table on pricing and numbered steps on setup pages. |
| 2025-12-19 | [Official] [Duplicate content post](https://blogs.bing.com/webmaster/2025/12/Does-Duplicate-Content-Hurt-SEO-and-AI-Search-Visibility/) | The Recommendations report flags "too many pages with identical titles". | Titles must be unique. |
| 2025-10-08 | [Official] [Microsoft Advertising: optimizing for AI answers](https://about.ads.microsoft.com/en/blog/post/october-2025/optimizing-your-content-for-inclusion-in-ai-search-answers) | <ul><li>The H1 should match the title.</li><li>The description should explain value rather than repeat keywords.</li><li>Use specific H2s, not "Learn more".</li><li>Write self-contained answers of 1–2 sentences.</li><li>Don't hide key answers only in tabs.</li></ul> | Use descriptive anchors and headings. |
| undated | [Official] [Structured data help](https://www.bing.com/webmasters/help/marking-up-your-site-with-structured-data-3a93e731) | Open Graph only enhances display for a limited set of publishers. | Keep OG and Twitter tags for social previews. They bring no ranking gain. |

## 3. Google AI Overviews and AI Mode: how structure affects citation

| Date | Source | What it says | Implication |
|---|---|---|---|
| 2026-10-13 | [3P] [AirOps framework](https://www.airops.com/blog/cited-google-ai-overviews-framework) | Sequential headings and quarterly refreshes. Sample sizes are not stated. | Weak evidence; treat as hygiene. |
| 2026-10-02 | [3P] [Search Central Live Barcelona recap](https://weareroast.com/news/google-search-central-live-deep-dive-barcelona-day-3-recap/) | <ul><li>Illyes: AI features use "exactly the same processes" as other results.</li><li>Mueller: fan-out queries don't show in Search Console.</li></ul> | Normal SEO is the lever. |
| 2026-09-24 | [Official] [Multimodal reporting in Search Console](https://developers.google.com/search/blog/2026/09/web-multimodal-in-sc) | Adds a Lens and image-search filter. | Descriptive alt text on setup screenshots. |
| 2026-07-29 | [3P] Pillarbase, 15.7M AI Mode citations ([summary](https://www.relevantaudience.com/geo/ai-mode-citations-passage-study/)) | <ul><li>47.7% of citations point to one passage.</li><li>The median passage is 117 words.</li><li>80% answer in the first sentence.</li><li>Passages sit under headings that match the question.</li></ul> | Descriptive or question-style H2, then an answer-first sentence. |
| 2026-06-03 (all sites from 08-31) | [Official] [Generative AI performance reports](https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports) | Impressions in AI Overviews and AI Mode, by page. | Measure before and after these edits. |
| 2026-05-11 | [3P] [Ahrefs schema DiD study](https://ahrefs.com/blog/schema-ai-citations/) | Adding JSON-LD gave no measurable gain in AI citations. | Schema is for accuracy and rich results only. |
| 2026-03-02 | [3P] [Ahrefs: AIO citations vs the top 10](https://ahrefs.com/blog/ai-overview-citations-top-10/) | 37.9% of cited URLs rank in the top 10; this was about 76% in 2025. | Covering fan-out sub-intents on the main page matters. |
| 2026-01-08 | [Official, via PPC.land] [Danny Sullivan on chunking](https://ppc.land/google-warns-against-breaking-content-into-chunks-for-ai/) | "We don't want you to do that." | Don't fragment pages. |
| 2025-12-30 | [3P] [SALT.agency](https://salt.agency/blog/research-does-structuring-your-content-improve-the-chances-of-ai-mode-surfacing/) | <ul><li>No position effect: cited text was found as deep as 60,000px.</li><li>AI Mode highlights a subheading plus the first line under it.</li></ul> | Every section needs a self-contained first sentence. |
| 2025-12-15 | [3P] [SE Ranking AI Mode factors](https://seranking.com/blog/how-to-optimize-for-ai-mode/) | <ul><li>Domain traffic dominates.</li><li>Visible FAQs show a small gain; FAQ schema shows none.</li><li>Sections of 100–150 words do best.</li><li>Freshness helps.</li></ul> | Structure is a tiebreaker, not the main lever. |
| 2025-12-10 | [Official] [AI features and your website](https://developers.google.com/search/docs/appearance/ai-features) | <ul><li>No extra requirements.</li><li>The page must be indexed and snippet-eligible.</li><li>Key content must be in text.</li></ul> | No data-nosnippet on answers. |

## 4. ChatGPT, Perplexity, Claude and Copilot: how passages are picked

| Date | Source | What it says | Implication |
|---|---|---|---|
| ~2026-10-19 | [Official] [OpenAI: Searching the web with ChatGPT](https://help.openai.com/en/articles/9237897-searching-the-web-with-chatgpt) | <ul><li>Prompts are rewritten into queries sent to partners (Bing, Shopify).</li><li>Requires OAI-SearchBot plus its IP ranges.</li><li>Nothing is published on passage choice.</li></ul> | Bing indexing matters for ChatGPT. Use the literal device and plan terms. |
| 2026-09-24 | [Official] [Perplexity Photon](https://www.perplexity.ai/hub/blog/photon) | Lexical first stage: query-term coverage, proximity and field weights. | Put the exact user phrasing in the title, H1 and first sentences. |
| 2026-04-07 | [Official] [Anthropic crawlers](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-the-web-and-how-can-site-owners-block-the-crawler) | Claude-SearchBot and Claude-User respect robots.txt. Blocking them reduces visibility. | Allow both. |
| undated | [Official] [Claude web search tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-search-tool) | <ul><li>A citation is `cited_text` of up to **150 characters**.</li><li>`page_age` is exposed.</li></ul> | Key facts go in short, self-contained sentences. Keep dates accurate. |
| undated | [Official] [OpenAI API web search](https://developers.openai.com/api/docs/guides/tools-web-search) | Pages cited are a subset of pages consulted. Citations carry span indices. | A direct one-span answer helps. This is an inference. |
| 2025-09-25 | [Official] [Perplexity search API architecture](https://www.perplexity.ai/hub/blog/architecting-and-evaluating-an-ai-first-search-api) | <ul><li>Indexes "sections and spans … as first-class units".</li><li>Hybrid retrieval plus a cross-encoder reranker.</li></ul> | Each section names its subject; avoid a bare "it". |
| 2025-04-04 | [Official] [Copilot Search](https://blogs.bing.com/search/2025/4/Introducing-Copilot-Search-in-Bing/) | Citations are attached per sentence or passage. | Self-contained factual sentences. |
| 2024-09-19 | [Official] [Anthropic Contextual Retrieval](https://www.anthropic.com/news/contextual-retrieval) | Chunks without context retrieve poorly. Adding context cuts retrieval failures by 35–67%. | Repeat the entity name inside each section. |
| 2024-06 | [3P, peer reviewed] [GEO (KDD 2024)](https://arxiv.org/abs/2311.09735) | <ul><li>Statistics and quotations raise visibility by +30–40%.</li><li>**Keyword stuffing reduced it by about 9%.**</li></ul> | Use concrete numbers. No stuffing. |

No vendor publishes ideal passage length, how a passage is chosen within a page, or citation weights.

## 5. Competitors: the top pages for the four target queries

**Method**
- Data comes from the WebSearch tool (US), not a verified Google SERP, because the Ahrefs SERP endpoint was not on the plan.
- Raw HTML was fetched once per page on 2026-10-20.
- The bare head terms returned mostly parasite pages: hijacked Shopify `/blogs/news/` paths, .gov and .edu PDFs, Substack and `.it.com` domains. Real pages appeared only for modifier variants.

| Query | What ranks (intent) | Title / H1 pattern | Above-fold CTA | Common elements |
|---|---|---|---|---|
| best IPTV service | Affiliate and publisher listicles, 5–10k words (commercial investigation) | "[N] Best IPTV Service Providers 2026 (Reviewed/Tested)". H1 = title. Examples: softwaretestinghelp (56 chars), troypoint (58). | Rare | Key-takeaway box, comparison table, methodology, legality note, FAQ |
| IPTV free trial | Provider trial landing pages (transactional) | "IPTV Free Trial: 24 Hours, No Credit Card \| Brand". Examples: primestreamus (58), bossofiptv (59). | **Yes, in every one** | Quick-answer box, steps, "what to test", "what happens after the trial", trial rules, FAQ |
| IPTV for Firestick | Listicles plus setup how-tos (mixed) | "[N] Best IPTV for Firestick (2026)". The device is always in the title and H1. | No | Install steps, player picks, troubleshooting, tables |
| IPTV subscription | Provider pricing pages (transactional) plus "where to buy" guides | "Buy IPTV Subscription … from $X" or "IPTV Subscription \| … \| 24h Free Trial". Example: smartiptvapp (55). | **Yes** | Price in the hero, plan cards, "how to buy in 3 steps", activation time, renewal and refund terms, FAQ |

**Where tryiptv.com already fits**
- `/iptv-free-trial` and `/pricing` match the transactional pattern: answer-first, real prices, trial terms.
- The homepage targets "best IPTV service". That query's results page is dominated by multi-provider listicles, a format that a single provider can't honestly copy. Its realistic target is "IPTV service" / "IPTV provider".

---

## Checklist we will apply

Legend: ✅ already true on the site · 🔧 fixed on the `on-page-seo` branch · 📝 recommendation for later.

1. ✅ **Every page has one H1** that states the same topic as the `<title>` (Google title-link guidance; Bing §17).
2. 🔧 **Titles are unique, descriptive, and 50–60 characters** (heuristic), with the primary keyword near the start and one brand suffix. Short or half-empty titles are fixed: 16 pages, 20–49 characters.
3. 🔧 **Real click reasons only where true.**
   - Use "24-hour free trial", "$16", "2 connections" and device names.
   - Add no new "2026". The existing "2026" titles sit on pages with a visible updated date.
4. 🔧 **Meta descriptions are 140–155 characters** with a benefit plus a CTA verb and concrete facts. Descriptions outside that range are fixed: 16 pages.
5. ✅ **Primary keyword appears in the first 100 words**, and every page opens answer-first. Checked on all 46 routes.
6. ✅ **Logical H2/H3 structure**, with descriptive headings and FAQ content in server-rendered HTML.
7. ✅ **Descriptive anchors and alt text.**
   - Every content image has alt text: 0 missing.
   - Internal links use the destination's topic.
   - No bare "click here" anchors were found.
8. ✅ **Breadcrumbs and BreadcrumbList on every page except "/"**, which is correct for a homepage. They match the visible trail.
9. ✅ **Open Graph and Twitter `summary_large_image`** on every page. og:title and og:description follow the edited title and description automatically.
10. ✅ **Clear CTA above the fold on commercial pages:**
    - `/`: Start Free Trial and View Plans.
    - `/iptv-free-trial`: request trial.
    - `/pricing`: plan cards with order buttons.
    - Verified at 375px and 1280px.
11. ✅ **No keyword stuffing.** Each primary keyword appears once in the title, and secondaries are used only where they read naturally (Bing abuse section; GEO paper: −9%).
12. 📝 **Cannibalisation decisions** need owner approval; see `seo/keyword-map.md`. No URL was changed and no redirect was added.
13. 📝 **Measure**: run the Search Console Generative AI report and Bing AI Performance per page, before and after deploy. Ping IndexNow for the edited URLs (`npm run indexnow -- --paths …`).
