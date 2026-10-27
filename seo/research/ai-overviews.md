# AI Overviews and answer-format research (tryiptv.com)

Compiled 2026-10-20 from five parallel research passes. Pages were opened on 2026-10-20 unless marked otherwise.

**Labels**
- **[Official]** marks a vendor statement.
- **[3P]** marks third-party data, which is correlational unless stated.
- Newest sources are listed first in each section.

**Limits**
- Ahrefs `serp-overview` and `keywords-explorer` returned "Insufficient plan".
- There was no live Google SERP or People Also Ask capture.
- Question sources are therefore Google Autocomplete (real query suggestions, not PAA) and the FAQ headings of ranking pages. Each question is labelled with its source.

Companion docs: `seo/research/geo.md`, `seo/research/on-page-seo.md`.

## 1. Google: AI features, featured snippets, FAQ and HowTo in 2026

| Date | Source | Finding | Implication |
|---|---|---|---|
| 2026-10-16 | [Official] [Search gallery](https://developers.google.com/search/docs/appearance/structured-data/search-gallery) | 25 features are listed, including Article, Breadcrumb, Organization, Product, Review snippet, Software app and Video. **FAQ and HowTo are not in the list.** | Only these types can still earn a SERP feature. |
| 2026-09-08 | [Official] [Review snippet](https://developers.google.com/search/docs/appearance/structured-data/review-snippet) | <ul><li>Organization or LocalBusiness reviews of yourself are ineligible.</li><li>Ratings "must be sourced directly from users".</li><li>Since 2026-07-24: no fake or undisclosed incentivised reviews, on the page or in markup.</li></ul> | No AggregateRating or Review on TryIPTV's own Organization or Service. |
| 2026-07-10 | [Official] [Structured data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies) | "Don't mark up content that is not visible to readers of the page." | All JSON-LD must match visible text. |
| 2026-07-10 | [Official] [AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) | <ul><li>"Structured data isn't required for generative AI search."</li><li>Chunking and "overfocusing on structured data" are listed as myths.</li><li>JavaScript content is fine for Google if it isn't blocked.</li></ul> | Schema is hygiene. The text on the page is what counts. |
| 2026-06-15 / 05-08 | [Official] [Search Central changelog](https://developers.google.com/search/updates) | <ul><li>FAQ rich results stopped showing on 2026-05-07; the docs were removed on 2026-06-15.</li><li>Google gives no instruction to remove FAQPage markup.</li></ul> | FAQ sections are kept for readers and answer engines, not for a SERP feature. |
| 2026-04-20 | [Official] [Snippet doc, "read more"](https://developers.google.com/search/docs/appearance/snippet) | <ul><li>Content should be "immediately visible on the page to a human". Collapsed accordions and tabs are given as the examples.</li><li>Keep `#hash` anchors.</li></ul> | Key answers sit in visible paragraphs. FAQ accordions are a secondary layer. |
| 2025-12-10 | [Official] [Featured snippets](https://developers.google.com/search/docs/appearance/featured-snippets) | <ul><li>Google chooses featured snippets automatically.</li><li>Opt-outs: `nosnippet`, `data-nosnippet`, `max-snippet`.</li><li>No 2026 edits; AI Overviews aren't mentioned.</li></ul> | Never use `data-nosnippet` on answers. |
| 2023-09-13 | [Official] [HowTo/FAQ changes](https://developers.google.com/search/blog/2023/08/howto-faq-changes) | HowTo rich results are gone on all devices. Google says "No need to proactively remove" the markup. | HowTo markup has no Google value. |
| 2026-07-07 | [3P] [Semrush Sensor via structureddata.co.uk](https://www.structureddata.co.uk/blog/changes-in-serp-features-2025-to-2026) | US featured snippets: desktop 3.39% → **0.22%**, mobile 2.18% → 0.16% (Apr 2025 → Jul 2026). AI Overviews over the same period: 8.5% → 42%. | **AI Overviews and AI Mode are the target.** Featured snippets are now rare. |

## 2. Bing: answers, Copilot and content formats

| Date | Source | Finding | Implication |
|---|---|---|---|
| live 2026-10-20 | [Official] [AI Performance help](https://www.bing.com/webmasters/help/ai-performance-9f8e7d6c) | <ul><li>"Different intents may benefit from different content formats, such as comparison tables for Comparison, step-by-step guidance for Planning, or concise explanations for Informational queries."</li><li>"Use descriptive headings, concise sections, tables, and FAQ-style content."</li></ul> | Tables on comparison pages, numbered steps on setup pages, and short definitions on concept pages. |
| live 2026-10-20 | [Official] [Webmaster Guidelines](https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a) §13–18 | <ul><li>"Structured data may support clearer grounding but does not guarantee visibility… Markup must accurately reflect visible content."</li><li>"Semantic HTML elements".</li><li>"Avoid long introductions".</li></ul> | Answer first, with real `<table>` and `<ol>` elements. |
| live 2026-10-20 | [Official] [Structured data help](https://www.bing.com/webmasters/help/marking-up-your-site-with-structured-data-3a93e731) | The supported rich scenarios do **not** include FAQPage, HowTo or QAPage. | Expect no FAQ or HowTo rich result in Bing either. |
| 2026-05-06 | [Official] [Evolving role of the index](https://blogs.bing.com/search/2026/5/Evolving-role-of-the-index-From-ranking-pages-to-supporting-answers/) | Grounding uses "discrete, supportable facts", and chunking "can distort page substance". | Write facts as self-contained sentences. |
| 2025-10-08 | [Official] [Microsoft Ads: optimizing for AI answers](https://about.ads.microsoft.com/en/blog/post/october-2025/optimizing-your-content-for-inclusion-in-ai-search-answers) | <ul><li>"Bulleted lists, numbered steps, and comparison tables break complex details into clean, reusable segments."</li><li>Q&A pairs can be lifted "word for word".</li><li>"AI systems may not render hidden content."</li><li>Avoid decorative arrows and stars, and use em dashes sparingly.</li></ul> | FAQ answers must be in the server HTML. This was **fixed** on this branch (§6). |

## 3. AI Overviews and AI Mode: which pages get cited

| Date | Source | Method | Finding |
|---|---|---|---|
| 2026-10-02 | [3P] [Ahrefs: branded AIOs](https://ahrefs.com/blog/ai-overviews-on-branded-searches/) | 232.8M US desktop crawls | <ul><li>AI Overviews appeared on 73.3% of branded queries in September 2026.</li><li>Branded AI Overviews cite Wikipedia in 71.9% of cases and YouTube in 38.6%.</li></ul> |
| 2026-07-29 | [3P] Pillarbase, via [summary](https://www.relevantaudience.com/geo/ai-mode-citations-passage-study/) | 15.7M AI Mode citations | <ul><li>Median cited passage: 117 words.</li><li>80% of cited passages answer in their first sentence.</li><li>Headings match the question.</li></ul> |
| 2026-07-24 | [3P] [Seer: recency](https://www.seerinteractive.com/insights/study-content-recency-impact-on-ai-visibility-in-2026) | 47k citations (ChatGPT, Gemini, Perplexity; not AIO) | "Fresh" mostly means old pages that were updated: 72% fresh by update date vs 42% by publish date. |
| 2026-05-28 | [3P] [Seer: AIO 2026](https://www.seerinteractive.com/insights/what-it-takes-to-rank-in-googles-ai-overviews-in-2026-is-not-what-you-think) | 8,500 keywords | <ul><li>The cohorts with the most FAQ and HowTo schema underperformed by about 10×.</li><li>Definitional winners are either short (under 250 words) or 1,000–2,000 words long.</li></ul> |
| 2026-05-11 | [3P, quasi-experimental] [Ahrefs: schema DiD](https://ahrefs.com/blog/schema-ai-citations/) | 1,885 pages vs controls | No measurable citation gain from adding JSON-LD (AIO −4.6%, AI Mode +2.4% n.s.). |
| 2026-03-02 | [3P] [Ahrefs: AIO vs top 10](https://ahrefs.com/blog/ai-overview-citations-top-10/) | 863k SERPs | <ul><li>37.9% of AI Overview citations rank in the top 10; it was about 76% in July 2025.</li><li>YouTube is 5.6% of citations.</li></ul> |
| ~Feb 2026 | [3P] Moz, via [seo.com](https://www.seo.com/blog/ai-mode-citations/) (secondary) | ~40k queries | 88% of AI Mode citations are not in the top 10. |
| 2025-12-03 | [3P] [Ahrefs: length](https://ahrefs.com/blog/short-vs-long-content-in-ai-overviews) | 174k pages | No correlation between length and citation (ρ = 0.04). |

**For tryiptv.com**
- Rank one strong page per topic, covering its follow-up questions on the same URL.
- Treat schema as hygiene.
- Update in place, and change `dateModified` only when the content changes.
- Write answer-first passages under headings that match the question.

## 4. How answer engines extract lists, tables and definitions

| Date | Source | Finding | Implication |
|---|---|---|---|
| 2026-10-19 | [3P] [GSQI JavaScript test](https://www.gsqi.com/marketing-blog/ai-search-javascript-rendering) | ChatGPT and Claude still can't read content rendered only in the browser. | Every answer must be in the server HTML. |
| undated | [Official] [Claude web fetch](https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-fetch-tool) | "Does not support websites dynamically rendered with JavaScript." | Same as above. |
| undated | [Official] [Claude citations](https://platform.claude.com/docs/en/build-with-claude/citations) | Text is chunked into sentences, and a citation is a run of whole sentences. | Write list items and steps as full sentences that name their subject. |
| undated | [Official] [Perplexity Search API](https://docs.perplexity.ai/docs/search/quickstart) | Snippets keep headings and lists. | Use real `<ol>`, `<ul>` and `<h2>`/`<h3>`. |
| 2026-10-20 | [Official] [Vertex grounding](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/grounding/grounding-with-google-search) | Gemini attributes each sentence of its answer to sources. | One fact per sentence. |
| 2026-08-13 | [3P] [AWR passage study](https://www.advancedwebranking.com/blog/passages-quoted-vs-passages-absorbed-in-ai-answers) | 112 passages coded by hand. Specificity separated cited passages from uncited ones; format alone did not. Specificity here means dates, named entities and numbers. | Put prices, Mbps, counts and dates inside the answers. |
| 2026-03 | [3P] [Shashko](https://hackmd.io/@A09fyOMpSD2VYIJodmXHqQ/r1eJyqthdbe) | 43k citations; the median sentence cited by AI Mode or Gemini is 10 words. | Keep short, quotable fact sentences. |
| 2024-12-17 | [3P, measured] [Vercel/MERJ](https://vercel.com/blog/the-rise-of-the-ai-crawler) | None of the major AI crawlers render JavaScript; Googlebot and Applebot do. | Same as above. |
| WSDM 2024 / WWW 2025 | [3P, peer reviewed] [Table Meets LLM](https://www.microsoft.com/en-us/research/blog/improving-llm-understanding-of-structured-data-and-exploring-advanced-prompting-methods/), [HtmlRAG](https://arxiv.org/abs/2411.02959) | HTML table structure and headings beat plain text for LLM QA. | Use real `<table>`, `<th scope>` and `<caption>`, not CSS grids. |

**Weak evidence:** the "40–60 word answer" and "5–9 steps" rules aren't tested anywhere. They are used here as editorial defaults: a short lead inside a 60–150-word section.

## 5. Competitors: who owns IPTV answers

**What the results look like**
- Unfiltered results for every target question are mostly parasite pages: `.it.com` domains, hijacked Shopify `/blogs/`, gitea repos.
- The real owners are **troypoint.com** and **firesticktricks.com** for how-tos, legality and buffering, and **Wikipedia** and **TechTarget** for the definition.

| Question | Strongest page | Format | Notes |
|---|---|---|---|
| what is IPTV | [Wikipedia](https://en.wikipedia.org/wiki/Internet_Protocol_television), [TechTarget](https://www.techtarget.com/searchnetworking/definition/IPTV-Internet-Protocol-television) | Definition sentence of 33–68 words | TechTarget uses DefinedTerm and question-style H2s. |
| install IPTV on Firestick | [firesticktricks](https://www.firesticktricks.com/iptv-smarters.html), [troypoint](https://troypoint.com/smart-iptv-siptv/) | Phased H2/H3 with numbered `<p>` steps (not `<ol>`) and VPN affiliate blocks | Every ranking guide is player-specific. None uses HowTo schema. |
| is IPTV legal | [troypoint](https://troypoint.com/is-iptv-legal/), [firesticktricks](https://www.firesticktricks.com/is-iptv-legal.html), [GOV.UK 2018](https://www.gov.uk/government/news/pressure-grows-on-producers-of-illegal-streaming-devices-and-thieves-of-paid-for-content) | Short answer, then a section per country | Competitors overstate penalties ("up to 10 years" for viewers) or include "buy anonymously" sections. **Avoid both.** |
| IPTV buffering fix | [troypoint](https://troypoint.com/how-to-stop-iptv-buffering/), [firesticktricks](https://www.firesticktricks.com/iptv-buffering-and-freezing.html) | Causes list, then 4–10 numbered fixes | Neither page has an answer-first paragraph or a symptom table. |
| what is M3U / how much Mbps | none authoritative | — | **Open gaps.** Only seller and parasite pages rank. |

**Question sources used for the FAQ additions**
- **Google Autocomplete** (gl=us, 2026-10-20):
  - "is iptv legal in usa / uk"
  - "is watching iptv legal in uk"
  - "what is iptv and is it legal"
  - "how to install iptv on firestick without downloader"
  - "why does my iptv stream keep buffering"
  - "what is m3u link"
  - "what is epg on iptv"
  - "how much mbps for iptv"
  - "how much bandwidth does iptv use"
- **FAQ headings on ranking pages** (firesticktricks, troypoint, TechTarget):
  - "Do you have to pay for IPTV?"
  - "Can I watch IPTV for free?"
  - "How does IPTV connect to TV?"
  - "Do you need a VPN for IPTV?"
  - "What does IPTV stand for?"
  - "Is TiviMate an IPTV service?"

---

## 6. Checklist we will apply

Legend: ✅ already true · 🔧 done on branch `ai-overviews` · ❓ needs owner · 📝 recommendation.

1. 🔧 **FAQ answers in the server HTML.**
   - A real bug: `FaqList` (`src/components/sections/FAQ.tsx`) didn't render closed answers on the server. Pages affected: `/faq`, `/setup`, help pages, guides and device guides.
   - Crawlers that don't run JavaScript (ChatGPT, Claude, Perplexity) saw questions with no answers.
   - Fixed with `forceMount`. Answers stay hidden until opened, with no visual change.
   - **This corrects `seo/research/geo.md` item 14**, which wrongly said the answers were already in the HTML.
2. 🔧 **40 question queries mapped to one page each**, with the answer measured in the server HTML. See `seo/ai-overviews-queries.md`.
3. 🔧 **Paragraph answers.** Each query opens with a direct answer. Measured length is 35–62 words, most 44–57. Where the page already had a 60–150-word section, the lead is its first sentences.
4. 🔧 **Numbered lists on every device guide**, now a real `<ol>`: Firestick, Samsung, LG, Android TV, Apple TV, **iPhone/iPad (new guide)**, Windows, Mac, MAG and Roku.
   - The intro now states the real step count; it previously said "7-step" on 6-step guides.
   - Roku gets an accurate "alternative methods" intro instead.
5. 🔧 **Comparisons in real `<table>` elements**: IPTV vs cable, legality, M3U vs Xtream Codes, and the IPTV-not-working checklist were CSS grids. Layout is pixel-identical: same sizes at 375 and 1280.
   - ✅ Pricing, the trial comparison, speed planning and the player matrix were already tables.
6. 🔧 **FAQ sections from real questions** (Autocomplete plus competitor headings, see §5):
   - a new FAQ on `/guides/what-is-iptv`
   - "What is an M3U link?"
   - an expanded "credit card" answer
7. 🔧 **Follow-up coverage on the same URL.** "Is IPTV legal?" is answered with US and UK sections plus a table on `/guides/what-is-iptv`. It is not a new thin page, which Google treats as scaled content abuse for fan-out variants. Primary sources are cited: 18 U.S.C. § 2319C, GOV.UK 2018, CJEU C-527/15.
8. ✅ **Schema only where it matches visible content.**
   - `Schema.tsx` already suppresses FAQPage, HowTo and Product (no SERP feature; multi-plan pricing).
   - Article, BreadcrumbList and Organization remain.
   - No reviews or ratings anywhere.
   - The one inconsistency is `/about`, which emits FAQPage inside `@graph`. It is harmless because the text is visible. ❓ Choose one policy.
9. ✅ No `data-nosnippet` or low `max-snippet` on answers; `max-snippet:-1` is set.
10. ❓ **Legality:** `/about` still has a placeholder for the owner-approved "content source / licensing" statement. The new legality answer is general and makes **no claim about TryIPTV's licensing**. Please review before merging.
11. 📝 Measure in the Search Console generative-AI report and Bing AI Performance (Intents, Citation Share). Re-check the 40 queries by hand in a logged-out US/UK session once deployed.
