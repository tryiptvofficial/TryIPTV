# GEO research: getting tryiptv.com cited by AI answer engines

Compiled 2026-10-20 from five parallel research passes. Pages were opened on 2026-10-20 unless marked otherwise.

**How to read this document**
- **[Official]** marks a vendor statement (Google, Microsoft, OpenAI, Perplexity, Anthropic).
- **[3P]** marks third-party or correlational data.
- Each section lists the newest sources first.

**Tool limits**
- Ahrefs (`serp-overview`, Brand Radar) returned "Insufficient plan".
- Reddit blocks fetching.
- ChatGPT, Perplexity, Gemini and Claude could not be queried directly.

As a result there is **no measured AI-citation data for tryiptv.com**. The test prompts in §7 exist to create it.

Companion docs: `seo/research/on-page-seo.md` (passage-selection studies) and `seo/research/technical-seo.md` (crawlers, IndexNow).

---

## 1. Google: AI Overviews, AI Mode, Gemini

| Date | Source | Finding | Implication |
|---|---|---|---|
| 2026-10-15 | [Official] [AI Mode and AI Overviews updates](https://blog.google/products-and-platforms/products/search/updates-ai-mode-overviews-explore-web/) | <ul><li>More inline links.</li><li>A test of a top slot for the "one or two official places on the web" for a task.</li></ul> | Brand and task pages (trial, setup) should be clear and canonical. |
| 2026-10-15 | [Official] [Google common crawlers](https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers) | <ul><li>Google-Extended is a robots.txt token only.</li><li>It controls Gemini model training and grounding in Gemini Apps and Vertex AI.</li><li>It "does not impact a site's inclusion in Google Search nor is it used as a ranking signal".</li></ul> | Blocking it would cost Gemini-app citations and gain nothing in Search. |
| 2026-10-01 | [Official] [Using gen-AI content](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content) | Points to scaled content abuse (rater guidelines §4.6.5) and low-effort main content (§4.6.6). | No templated device × city page sets. |
| 2026-08-31 | [Official] [Search generative AI control](https://support.google.com/webmasters/answer/16908024) | <ul><li>A Search Console setting includes or excludes the site from AI Overviews, AI Mode and Discover AI.</li><li>The default is Include.</li><li>It does not affect training.</li></ul> | **Owner action:** confirm the setting is on Include. |
| 2026-08-31 | [Official] [Gen-AI performance reports](https://support.google.com/webmasters/answer/16984139) | <ul><li>Impressions only, by page, country, device and date.</li><li>No queries and no clicks.</li></ul> | This is the measurement baseline for this work. |
| 2026-07-10 (published 2026-05-15) | [Official] [AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) | <ul><li>Built on retrieval-augmented generation over core ranking, plus query fan-out ("concurrent, related queries").</li><li>Recommends non-commodity first-hand content, clear headings and sections, and snippet eligibility.</li><li>**Ignore:**<ul><li>llms.txt and AI text files ("will neither harm nor help")</li><li>chunking ("no requirement to break your content into tiny pieces")</li><li>rewriting for AI</li><li>inauthentic mentions</li><li>special schema</li></ul></li><li>Pages built for fan-out variants count as scaled content abuse.</li></ul> | One strong page per intent that covers its sub-questions. Don't build llms.txt-style projects for Google. |
| 2026-06-15 | [Official] [Changelog](https://developers.google.com/search/updates) | <ul><li>FAQ rich results were removed from Search; they stopped showing on 2026-05-07.</li><li>A note on llms.txt was added.</li></ul> | FAQPage markup earns no SERP feature. Keep it only where it matches the visible Q&A. |
| 2026-04-20 | [Official] [Snippet doc](https://developers.google.com/search/docs/appearance/snippet) | "Read more" deep links prefer text that is immediately visible and not inside collapsed sections. | FAQ answers are already in the server HTML (hidden until opened); this was checked. |
| 2026-03-24 | [Official] [Robots meta tag](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag) | `nosnippet` blocks use as AI input; `max-snippet` limits it. | Keep `max-snippet:-1`, which is already set in `layout.tsx`. |
| 2026-01-08 | [Official, via [PPC.land](https://ppc.land/google-warns-against-breaking-content-into-chunks-for-ai/)] Danny Sullivan, Search Off the Record | On chunking: "So we don't want you to do that." | Use normal sections, not micro-pages. |
| 2025-11-18 | [Official] [Gemini 3 in Search](https://blog.google/products-and-platforms/products/search/gemini-3-search-ai-mode/) | Fan-out was upgraded to find content "it may have previously missed". | Deep sections of strong pages can be retrieved. |

**Third-party data on AI Overviews and AI Mode**

| Date | Source | Method | Finding |
|---|---|---|---|
| 2026-10-09 | [3P] [aat.ee](https://www.aat.ee/blog/ai-overviews-who-gets-cited) | 6 "best X" SaaS queries, 54 cited URLs | <ul><li>About 70% of citations went to listicles and how-tos; about 17% to vendor pages.</li><li>"Inspectable" vendors (free tier, visible specs) were cited more.</li></ul> |
| 2026-07-14 | [3P] [DerivateX](https://derivatex.agency/blog/what-content-gets-cited-google-ai-overviews/) | 100 "best [category] software" queries, 1,259 citations | <ul><li>Listicles 63%, vendors 17%, YouTube 9%.</li><li>67% of cited pages were not in that query's organic results.</li></ul> |
| 2026-07-15 | [3P] Profound, via [Digital Applied](https://www.digitalapplied.com/blog/google-cites-itself-ai-mode-gbp-product-schema-visibility-2026) | More than 32M AI Mode citations | Google's own surfaces were the #2 cited domain, replacing brand links on spec and compatibility queries. |
| 2025-11-28 | [3P] [Surfer](https://surferseo.com/blog/query-fan-out-impact) | 10k keywords, 33k fan-out queries | Spearman 0.77 between the number of fan-out queries a page ranks for and its citations. |
| 2025-11-10 | [3P] [Ahrefs AIO triggers](https://ahrefs.com/blog/ai-overview-triggers/) | 146M SERPs | <ul><li>AI Overviews trigger on 4.3% of commercial and 2.1% of transactional queries.</li><li>They trigger on **57.9% of question queries**.</li></ul> |
| 2025-12-15 | [3P] [Ahrefs AIO vs AI Mode](https://ahrefs.com/blog/ai-overviews-vs-ai-mode) | 540k query pairs | <ul><li>Only 13.7% citation overlap between the two.</li><li>AI Mode names 3.3 brands per answer vs 1.3 for AI Overviews.</li></ul> |
| — | none found | — | No study or Google statement covers whether AI Overviews are suppressed for IPTV queries. Check by hand while logged out. |

## 2. Bing and Copilot

Unless marked otherwise, the source is the [Bing Webmaster Guidelines](https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a). The page is undated; it was read live on 2026-10-20. Quotes are exact.

| Date | Source | Finding | Implication |
|---|---|---|---|
| live | [Official] Guidelines, GEO | <ul><li>"Generative Engine Optimization (GEO) focuses on content eligibility for grounding and reference in AI responses… GEO does not guarantee grounding or citations."</li><li>§1: SEO best practices "also support eligibility for AI-generated experiences, grounding results, and citations."</li></ul> | GEO is about eligibility, not tricks. |
| live | [Official] §15 | "URLs are more likely to be selected for grounding queries and citations when content stands on its own… Facts and definitions are explicit… Important information is visible on the URL itself." | Put the facts in text on each page, not only behind "see pricing" links. |
| live | [Official] §16–18 | <ul><li>"Use clear and consistent naming"</li><li>"URLs focused on a primary topic are more likely to be selected"</li><li>"Place essential information near the top… Avoid long introductions"</li></ul> | Answer first, one topic per URL, one brand string ("TryIPTV"). |
| live | [Official] §10 and [robots meta help](https://www.bing.com/webmasters/help/which-robots-metatags-does-bing-support-5198d240) | <ul><li>"NOARCHIVE prevents content from being used in Copilot responses and grounding results."</li><li>"NOCACHE limits Copilot to using only the URL, title, and snippet."</li><li>DATA-NOSNIPPET and NOSNIPPET "may limit Copilot citation quality".</li></ul> | No public page uses these. This was checked: the site sets `index, follow, max-snippet:-1`. |
| live | [Official] Abuse section | Penalty: "reduced rankings, suppressed grounding visibility, loss of grounding eligibility… or removal". See §6 for the full list. | — |
| 2026-10-13 | [Official] [Topics Portfolio (beta)](https://blogs.bing.com/webmaster/2026/10/introducing-topics-portfolio-beta-in-ai-performance/) | <ul><li>Groups grounding queries into topics, showing Topic Size, Sites Cited and Opportunity Queries ("where other sites appear and yours does not").</li><li>"Directional signals".</li><li>Smaller sites may not see it.</li></ul> | Use it once there is data. Ignore competitor-brand opportunities. |
| 2026-06-16 | [Official] [AI Visibility Insights](https://blogs.bing.com/search/June-2026/New-AI-Visibility-Insights-in-Bing-Webmaster-Tools-Intents-Topics-Citation-Share-Compare) and [AI Performance help](https://www.bing.com/webmasters/help/ai-performance-9f8e7d6c) | <ul><li>Intents, Topics, Citation Share and Compare.</li><li>Suggested formats: "comparison tables for Comparison, step-by-step guidance for Planning, or concise explanations for Informational queries".</li></ul> | Use tables on pricing and comparison pages, steps on setup pages, and short definitions on explainers. |
| 2026-05-06 | [Official] [Evolving role of the index](https://blogs.bing.com/search/2026/5/Evolving-role-of-the-index-From-ranking-pages-to-supporting-answers/) | <ul><li>"discrete, supportable facts with clear provenance"</li><li>"Abstention is a valid outcome when support is missing, stale, or conflicting."</li></ul> | **Contradictory facts across pages can cost the citation.** This is why the site needs one facts file. |
| 2026-02-10 | [Official] [AI Performance launch](https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/) | IndexNow "helps ensure that AI systems reference the most current version of a page". | IndexNow is already wired (`npm run indexnow`). |
| 2025-12-19 | [Official] [Duplicate content post](https://blogs.bing.com/webmaster/2025/12/Does-Duplicate-Content-Hurt-SEO-and-AI-Search-Visibility/) | "LLMs group near-duplicate URLs into a single cluster and then choose one page to represent the set." | No near-duplicate pages. |
| 2025-10-08 | [Official] [Microsoft Ads: AI answers](https://about.ads.microsoft.com/en/blog/post/october-2025/optimizing-your-content-for-inclusion-in-ai-search-answers) | <ul><li>"Self-contained phrasing: Sentences that make sense even when pulled out of context."</li><li>Don't hide answers in tabs.</li></ul> | Write self-contained H2 lead paragraphs. |
| — | llms.txt | No Microsoft statement found. | — |

## 3. ChatGPT, Perplexity, Claude, Gemini, Apple: crawlers and source choice

| Vendor | Token | Purpose | Respects robots.txt | If blocked |
|---|---|---|---|---|
| OpenAI | OAI-SearchBot | ChatGPT search index | yes | no summaries/snippets in ChatGPT search; a bare link and title may still appear ([OpenAI bots doc](https://developers.openai.com/api/docs/bots)) |
| OpenAI | ChatGPT-User | user-initiated fetches | may not apply | — |
| OpenAI | GPTBot | training | yes | no search effect, per OpenAI |
| Perplexity | PerplexityBot | search index | yes | not cited ([Perplexity crawlers doc](https://docs.perplexity.ai/docs/resources/perplexity-crawlers.md)) |
| Perplexity | Perplexity-User | user fetches | generally no | — |
| Anthropic | Claude-SearchBot / Claude-User | search index / user fetches | yes | "may reduce visibility" ([Anthropic help, 2026-04-07](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-the-web-and-how-can-site-owners-block-the-crawler)) |
| Anthropic | ClaudeBot | training | yes | training only |
| Google | Googlebot | Search, AI Overviews, AI Mode | yes | — |
| Google | Google-Extended | Gemini training **and** Gemini app / Vertex grounding | token only | lose Gemini-app grounding |
| Apple | Applebot / Applebot-Extended | Siri, Spotlight, Safari search / Apple AI training (token only) | yes; without its own group Applebot follows Googlebot's rules | Applebot: lose Apple search features. Applebot-Extended: training only, "can still be included in search results" ([Apple, 2026-09-04](https://support.apple.com/en-us/119829)) |
| Microsoft | Bingbot | Bing, Copilot, and ChatGPT's partner index | yes | — |

**How each engine picks sources**

| Date | Source | Finding |
|---|---|---|
| ~2026-10-19 | [Official] [OpenAI: ChatGPT search](https://help.openai.com/en/articles/9237897-searching-the-web-with-chatgpt) | <ul><li>Prompts are rewritten into queries for partners (Bing, Shopify).</li><li>Requires OAI-SearchBot plus its IP ranges.</li><li>Nothing is published on how passages are chosen.</li></ul> |
| 2026-09-24 | [Official] [Perplexity Photon](https://www.perplexity.ai/hub/blog/photon) | Lexical first stage: term coverage, proximity, field weights. |
| 2025-09-25 | [Official] [Perplexity search API](https://www.perplexity.ai/hub/blog/architecting-and-evaluating-an-ai-first-search-api) | <ul><li>Indexes "sections and spans … as first-class units".</li><li>Re-ranks them with cross-encoders.</li></ul> |
| undated | [Official] [Claude web search tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-search-tool) | A citation is `cited_text` of up to 150 characters. `page_age` is exposed. |
| 2026-10-13 | [Official] [Gemini grounding](https://ai.google.dev/gemini-api/docs/google-search) | Grounds on Google Search and returns span-level citations. |

**llms.txt status**
- **Google:** "neither harm nor help" [Official].
- **OpenAI, Perplexity, Anthropic, Microsoft:** no official statement found.
- [3P, via SEJ 2026-06-19] Ahrefs found 97% of llms.txt files got zero requests.
- **Spec:** llms.txt v2 was published 2026-08-10 ([llmstxt.org](https://llmstxt.org)). llms-full.txt is not part of the spec.
- Lighthouse 13.3 (May 2026) added an experimental llms.txt audit under "Agentic Browsing" [3P, via SEJ 2026-05-20]. It is not a Search signal.
- **Verdict:** keep the existing files accurate; low priority.

## 4. Competitors: who gets cited for "best IPTV" prompts

**The only direct AI-citation data found**
- **Source:** one Perplexity run on 2026-05-06 for "What's the best IPTV streaming service?" ([Frevana AEO report](https://www.frevana.space/content/en/aeo-report-best-iptv-streaming-services-legal-%26-third%E2%80%91party--m5kzmxju7s1t5)).
- **The 9 sources it cited:**
  - 2 YouTube videos
  - 2 Reddit threads and 1 forum thread (troypointinsider)
  - troypoint.com (an IPTV **player** listicle)
  - muvi.com (a vendor blog)
  - a design-studio blog listicle
  - an unlabelled paid placement on a local news site
- **No provider's own site was cited.**
- **In the same run:**
  - Gemini ranked licensed services first (YouTube TV, Fubo, Sling), then third-party IPTV.
  - ChatGPT errored.

**Why those pages get cited**
1. The title matches the prompt and includes the year.
2. They give answer-first "Quick Answer" boxes, with prices and trial terms in the HTML text, plus tables and FAQs.
3. The source is not the provider.
4. Multiple formats are in play: YouTube, Reddit and forums.
5. The engines hedge on legality.

**Implications**
- A provider homepage is unlikely to be cited for "best IPTV service".
- The realistic levers:
  - Be named on third-party pages that do get cited: honest reviews, YouTube setup videos, a real Trustpilot profile.
  - Own the **device, setup, trial and definition** prompts.
- Don't buy undisclosed placements. That risks Google's site-reputation and link-spam policies and Bing's "Link Schemes and Artificial Promotion".

## 5. What applies to tryiptv.com: checklist

Legend: ✅ already true · 🔧 done on branch `geo` · ❓ needs owner decision or action · 📝 recommendation.

**Access**
1. ✅ robots.txt allows Googlebot, Bingbot, OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User and PerplexityBot. The live file matches the source. Each of these user agents gets HTTP 200 on `/pricing`.
2. 🔧 Explicit rules added for **Perplexity-User** and **Applebot**. They were already allowed by `*`; naming them makes the policy unambiguous.
3. ❓ **Training bots, unchanged:**
   - **GPTBot** is blocked (it may fetch only the llms files).
   - **ClaudeBot** is allowed.
   - **Google-Extended** is allowed. Blocking it would also stop Gemini-app grounding.
   - **Applebot-Extended** has no rule, so it is allowed via `*`.
4. ❓ Cloudflare bot rules can still challenge real bot IPs. User-agent spoofing can't test this. Check Cloudflare AI Crawl Control and Security Events for OAI-SearchBot, PerplexityBot and Claude-SearchBot.
5. ❓ Set Search Console's "Search generative AI" control to **Include**. Verify the site in Bing Webmaster Tools to get AI Performance.
6. ✅ No noarchive, nocache, nosnippet or data-nosnippet on content pages. `max-snippet:-1` is set.

**Content**
7. 🔧 Answer-first: the key pages and their H2 sections open with a direct answer of about 40–60 words.
8. 🔧 Question-style H2s where they match real prompts. The answer sits in the first sentence and names its subject ("TryIPTV…", "An M3U playlist…") instead of "it".
9. ✅ Pricing, plan comparison, trial-vs-paid and player and format comparisons are HTML tables. No facts are image-only; the images are hero art, logos, chat screenshots and setup screenshots.
10. 🔧 One facts source: `PRODUCT_TRUTHS` in `src/lib/site-config.ts` covers price, channels, VOD, connections, trial, delivery, refund and support. `npm run check:facts` scans every page plus `llms.txt`, `llms-full.txt` and `ai.txt` for contradictions. Contradictions fixed: see the change list.
11. 🔧 Quotable one-sentence definitions of IPTV, M3U, EPG and Xtream Codes now open their guide pages: what it is, what it contains, and how it is used.
12. 🔧 Statistics: first-party facts come from `PRODUCT_TRUTHS`. Bandwidth figures that contradicted each other across four pages are aligned. Unsourced figures are listed as `[NEEDS DATA]` in `seo/geo-stats-audit.md`, not marked on the live pages.
13. 🔧 No engineered language: lines in `llms-full.txt` that gave AI readers instructions became plain statements. No hidden text, prompt-like text or AI-bait phrasing (Bing "Prompt Injection and AI Manipulation").
14. 🔧 **Corrected 2026-10-20:** most FAQ answers were *not* in the server HTML (`FaqList` lacked `forceMount`); fixed on branch `ai-overviews`. FAQPage JSON-LD is only emitted on `/about`; `Schema.tsx` suppresses it elsewhere.
15. ✅ llms.txt and llms-full.txt are accurate after the trial-connection fix. They stay low priority.

**Off-site (owner)**
16. 📝 YouTube setup videos (Firestick, TiviMate). YouTube is cited in nearly every AI Overview and appeared twice in the only Perplexity run found.
17. 📝 A real Trustpilot/Reddit presence and honest third-party reviews. No paid or undisclosed placements.
18. 📝 Run the 30 test prompts (`seo/geo-test-prompts.md`) monthly and log the results.

## 6. Abuse patterns to avoid

Exact wording from the Bing Webmaster Guidelines, live 2026-10-20.

- **Keyword Stuffing and Artificially Engineered Language:** "Content should be created for users, not to manipulate ranking systems or trigger citations or AI responses. Excessive repetition, unnatural phrasing, or loading pages with irrelevant keywords can reduce visibility or lead to removal."
- **Prompt Injection and AI Manipulation:** "Attempts to add content designed to manipulate or interfere with language models used by Bing or Copilot may result in reduced visibility or removal from search experiences."
- **Misleading Structured Data:** "Structured data must accurately represent visible content."
- **Duplicate Content Across Multiple URLs, Automatically Generated Content at Scale, Link Schemes and Artificial Promotion, Cloaking:** see the guidelines.
- **Google's equivalents:**
  - scaled content abuse, which explicitly includes pages made for fan-out variants
  - inauthentic mentions
  - self-serving review markup

## 7. Measurement

- **Google:** Search Console generative-AI report. Impressions by page; track AI Overviews and AI Mode separately where possible.
- **Bing:** AI Performance. Citations, grounding queries, Citation Share, and Topics Portfolio once data exists.
- **Manual:** the monthly prompt set in `seo/geo-test-prompts.md`.
