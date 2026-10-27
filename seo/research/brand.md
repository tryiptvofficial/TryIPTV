# Brand entity research (tryiptv.com)

Compiled 2026-10-20 from five parallel research passes.

- **[Official]** marks a vendor statement. **[3P]** marks third-party data, which is correlational unless stated otherwise.
- Ahrefs (Brand Radar, Site Explorer) returned "Insufficient plan", so there are **no backlink or mention counts for TryIPTV or its competitors**.

Companion docs: `seo/research/eeat.md` (trust), `seo/research/geo.md`, `seo/research/ai-overviews.md`.

## 1. Google: link spam, site reputation abuse, entities

| Date | Source | Finding | Implication |
|---|---|---|---|
| 2026-09-18 | [Official] [Preferred sources docs](https://developers.google.com/search/docs/appearance/preferred-sources) | <ul><li>Users add sites; the site must be included in Search generative AI features.</li><li>Owners can use a JS button or the deeplink `google.com/preferences/source?q=<domain>`.</li><li>On 2026-05-27, Google said it is "working on using Preferred Sources as a ranking signal across its AI features" ([9to5Google](https://9to5google.com/2026/05/27/google-ai-mode-preferred-sources/)).</li></ul> | 📝 Add the deeplink or button. It is the only official brand-loyalty lever. |
| 2026-09-08 | [Official] [Organization SD](https://developers.google.com/search/docs/appearance/structured-data/organization) | <ul><li>"Use the same name and alternateName that you're using for your site name."</li><li>sameAs should point to "a URL to your organization's profile page on a social media or review site".</li><li>Logo at least 112×112, and it should look right "on a purely white background".</li><li>Use "the most specific schema.org subtype".</li></ul> | WebSite and Organization now share name and alternateName; the type is `OnlineBusiness`. |
| 2026-08-28 | [Official] [Spam policies](https://developers.google.com/search/docs/essentials/spam-policies) | <ul><li>Link spam includes "Exchanging money for links", "Exchanging goods or services for links", "Sending someone a product in exchange for them writing about it and including a link", "links with optimized anchor text in … guest posts, or press releases", "Low-quality directory or bookmark site links" and "Widely distributed links in the footers or templates".</li><li>Paid links are fine only with `rel="sponsored"` or `nofollow`.</li><li>Site reputation abuse covers third-party content hosted "mainly because of that host's already-established ranking signals". Wire services and editorial work are not covered.</li><li>Since 2026-05-15, the policies also cover manipulating AI responses.</li></ul> | <ul><li>No trial-for-link deals without `sponsored`.</li><li>No keyword anchors.</li><li>No directory blasts.</li><li>No parasite or partner-section placements.</li></ul> |
| 2026-08-28 | [Official] [Site reputation policy update](https://developers.google.com/search/blog/2026/08/update-site-reputation-policy) | <ul><li>From Aug 30, inside the EEA, the abusive section "may be separated … so that, over time, it ranks independently" instead of receiving a manual action.</li><li>Outside the EEA, manual actions still apply.</li></ul> | Parasite placements are not safe anywhere. |
| 2026-07-10 | [Official] [AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) | "seeking inauthentic 'mentions' across the web isn't as helpful as it might seem." | Only earned mentions count. |
| 2025-12-10 | [Official] [Site names](https://developers.google.com/search/docs/appearance/site-names) | <ul><li>"WebSite structured data is most important."</li><li>"Avoid using a generic name". TryIPTV is close to generic, so consistency matters.</li><li>alternateName should be listed most important first.</li></ul> | alternateName is `["Try IPTV", "TryIPTV.com"]`. |
| 2025-12-10 | [Official] [Qualify outbound links](https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links) | `sponsored` is for "advertisements or paid placements"; `ugc` is for comments and forums. | — |
| live | [Official] Knowledge panel: [claim](https://support.google.com/knowledgepanel/answer/7534902), [update](https://support.google.com/knowledgepanel/answer/7534842), [FAQ](https://support.google.com/knowledgepanel/answer/9787176) | <ul><li>Panels are "created automatically … when there is enough information available on the open web".</li><li>Google won't "manually create or delete Knowledge Panels".</li><li>To claim one, sign in to an official profile listed in the panel (Search Console, YouTube, X, Facebook).</li></ul> | Get independent coverage and verify Search Console. Keep YouTube and X consistent. |
| live | [Official] [Google Business Profile eligibility](https://support.google.com/business/answer/13763036) | "Brands, organizations, artists, and other online-only businesses" are ineligible, and so are virtual offices. | Don't create a Business Profile. |
| 2021 | [3P] Mueller via [SEJ](https://www.searchenginejournal.com/google-seo-brand-mentions/430848/) and [SERoundtable](https://www.seroundtable.com/google-digital-public-relations-link-building-30810.html) | <ul><li>Unlinked mentions: "I don't think we use those at all for things like PageRank".</li><li>Editorial digital PR is "just as critical as tech SEO".</li></ul> | Earned PR is fine. Mentions matter for entities and AI, not for PageRank. |
| 2026-10-11 / 09-28 | [WP:NCORP](https://en.wikipedia.org/wiki/Wikipedia:Notability_(organizations_and_companies)), [Wikidata:Notability](https://www.wikidata.org/wiki/Wikidata:Notability) | Wikipedia notability needs significant independent coverage, which excludes press releases and paid media. Wikidata needs "serious and publicly available references". | Skip both until independent coverage exists. |

## 2. Bing

| Date | Source | Finding | Implication |
|---|---|---|---|
| 2026-10-13 | [Official] [Topics Portfolio](https://blogs.bing.com/webmaster/2026/10/introducing-topics-portfolio-beta-in-ai-performance/) | <ul><li>"Branded queries can appear as opportunity queries."</li><li>Topics with insufficient presence are hidden.</li><li>The numbers are "directional signals".</li></ul> | Ignore opportunities that name competitor brands. |
| 2026-06-16 | [Official] [Citation Share](https://blogs.bing.com/search/2026/6/New-AI-Visibility-Insights-in-Bing-Webmaster-Tools-Intents-Topics-Citation-Share-Compare/) | <ul><li>Citation Share is "the percentage of citations attributed to your site out of all citations shown across all sites for that same grounding query".</li><li>It is observational: "not a ranking system".</li><li>It doesn't expose competitors.</li></ul> | **Brand KPI:** Citation Share on grounding queries containing "tryiptv" should approach 100%. Exclude June 2026, which was a backfill (Madhavan, via [PinMeTo](https://www.pinmeto.com/news/bing-ai-performance-backfill-citation-share-2026/) [UNCONFIRMED]). |
| live | [Official] [Webmaster Guidelines](https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a) §5, §16, abuse section | <ul><li>"Strong internal and external linking supports … authority evaluation".</li><li>"Use clear and consistent naming … Clear entity definition improves grounding visibility and citation accuracy."</li><li>"link buying, link spamming, private networks, and artificial social promotion schemes that simulate popularity" are abuse.</li><li>The guidelines no longer mention brand or social signals.</li></ul> | <ul><li>One entity string everywhere.</li><li>Earned links only.</li><li>Social profiles serve distribution and consistency only; no bought engagement.</li></ul> |
| 2023-09 | [Official] [Disavow removed](https://blogs.bing.com/webmaster/september-2023/Bing-Webmaster-Tools-to-Remove-Disavow-Links-Feature-in-October-2023) | Bing ignores or discounts unnatural links, and has no disavow tool. | Prevention is the only control. |
| live | [Bing Places](https://www.bing.com/forbusiness/help) [UNCONFIRMED, page didn't render] | Requires a physical or service-area address. | Skip. |

## 3. AI Overviews and AI Mode: brand mentions and third-party citations

| Date | Source | Method | Finding | Implication |
|---|---|---|---|---|
| 2026-10-02 | [3P] [Ahrefs: branded AIOs](https://ahrefs.com/blog/ai-overviews-on-branded-searches/) | 232.8M US desktop crawls, 100 brands | <ul><li>AI Overviews appeared on 82.9% of branded results (Sep 29).</li><li>Cited sources: Wikipedia 71.9%, YouTube 38.6%, LinkedIn 22.8%.</li></ul> | "TryIPTV" searches will get an AI Overview built from third-party pages, which must exist and be accurate. |
| 2026-07-29 | [3P, vendor] Victorious, via [SEJ](https://searchengineland.com/ai-brand-mention-study-victorious-spa/582765) | 175 brands, 8 platforms | <ul><li>Brands with fewer than 2,000 indexed pages mentioning them were named in 3% of category answers.</li><li>99.99% of category citations pointed to third-party sites.</li></ul> | Recognition comes from other sites, not from our own. |
| 2026-09-21 | [3P, vendor] [BrandMentions](https://brandmentions.com/blog/?p=4770) | About 410k mentions, 240 brands | <ul><li>Mentions within 5–10 words of category terms tracked AI presence better than raw volume.</li><li>Footer and bio mentions were under 5% of extractable mentions.</li></ul> | Ask for the brand to be named next to "IPTV setup", "Firestick" or "free trial" in body text. |
| 2026-06-17 | [3P, small sample] [Lily Ray](https://lilyraynyc.substack.com/p/why-calling-yourself-the-best-could) | 100 B2B "best X" queries | In 69% of cases, the brand behind a self-promotional listicle was not recommended. | Never publish a "best IPTV" list that ranks ourselves first. |
| 2025-12-12 | [3P] [Ahrefs, 75k brands](https://ahrefs.com/blog/ai-brand-visibility-correlations) | Spearman correlation | <ul><li>YouTube mentions ρ≈0.737, the strongest factor tested.</li><li>Branded web mentions: AI Mode 0.709, AI Overviews 0.656.</li><li>Backlinks: 0.218.</li></ul> | Mention volume beats backlinks. |
| 2025-11-26 | [3P] [Ahrefs, mentions vs citations](https://ahrefs.com/blog/ai-citations-vs-impressions-study) | 31k brand mentions | Brand mentions came with a link to the brand's site in only 10.7% of AI Overviews (36.8% in AI Mode). | Track named mentions, not only clicks. |

## 4. AI engines: Reddit, YouTube, review sites, directories

| Date | Source | Finding |
|---|---|---|
| 2026-09-02 | [3P] Ahrefs top-50 cited domains: [AIO](https://ahrefs.com/blog/most-cited-domains-ai-overviews/), [AI Mode](https://ahrefs.com/blog/most-cited-domains-ai-mode), [ChatGPT](https://ahrefs.com/blog/most-cited-domains-in-chatgpt/), [Perplexity](https://ahrefs.com/blog/most-cited-domains-perplexity/), [Gemini](https://ahrefs.com/blog/most-cited-domains-gemini/), [Copilot](https://ahrefs.com/blog/most-cited-domains-copilot/) | <ul><li>**AI Overviews:** YouTube 22.9%, Reddit 18.5%, Facebook 10.1%.</li><li>**ChatGPT:** Reddit 16.8%, Wikipedia 7.0%, Trustpilot #22.</li><li>**Gemini:** Reddit 28.5%.</li><li>**Copilot:** retail-heavy; Reddit not in the top 50.</li></ul> |
| 2026-08-20 | [3P] [BrightEdge](https://www.brightedge.com/resources/weekly-ai-search-insights/google-ai-overviews-chatgpt-youtube-citations) | <ul><li>50% of AI Overview YouTube citations are timestamped.</li><li>Shorts are 17.5%.</li><li>Recommends chapters and accurate transcripts.</li></ul> |
| 2026-08-19/25 | [3P] [The Drum](https://www.thedrum.com/news/did-the-brand-rush-to-reddit-kill-the-platform-s-chatgpt-citations) (PromptWatch data) | <ul><li>Reddit's ChatGPT citation share fell about 86% in mid-August 2026.</li><li>Brand astroturfing is a suspected cause.</li></ul> |
| 2026-05-14 | [3P, Trustpilot-promoted] [Seer](https://www.seerinteractive.com/insights/study-of-800k-ai-responses-how-reviews-shape-brand-presence-in-ai-search) | Median AI citation rate: 1% with no Trustpilot profile, 53.5% with one. |
| 2026-09 | [Official] Trustpilot [guidelines](https://corporate.trustpilot.com/legal/for-businesses/guidelines-for-businesses) and [action we take](https://corporate.trustpilot.com/legal/for-businesses/action-we-take) | <ul><li>"We don't allow incentivized reviews"; no selective invites or gating.</li><li>Businesses that "offer or facilitate the sale of illegal products or services" are ineligible.</li></ul> |
| live | [Official] [YouTube external links policy](https://support.google.com/youtube/answer/9054257) | Bans links that give "unauthorized access" to paid streaming services. |
| live | [Official] Reddit Rule 2 and spam policy (quoted via [EGGKNITE](https://www.eggknite.com/blog/reddit-self-promotion-rules-for-brands)) | <ul><li>"Participate authentically … do not spam".</li><li>Accounts that mainly post links to their own business count as spam.</li><li>IPTV reseller subreddits have been banned ([TorrentFreak](https://torrentfreak.com/piracy-subreddit-avoided-a-reddit-ban-by-censoring-itself-to-death-230311/)).</li></ul> |
| Aug 2026 data | [3P] [DirJournal AI Citation Index](https://www.dirjournal.com/blogs/ai-citation-index) | Trustpilot leads with 1.35M AI citations across 5 engines; BBB has 277k. |

## 5. Competitors: where IPTV brands get mentioned

Sources were checked on 2026-10-20 by search and raw HTML; Ahrefs was unavailable. **What we found is mostly spam:**
- **Parasite pages:**
  - hijacked Shopify `/blogs/news/` subdomains on Turo, Bosch, Xbox, SCMP and NTT Data
  - PDFs uploaded through form plugins to .gov, ESA and EU sites, plus a Harvard Qualtrics file
  - Indie Hackers posts
  - `.it.com` throwaway domains, some using player trademarks
- **Paid placements on news and blog sites with followed links:** ipsnews.net (exact-match "best IPTV service" anchor), onpattison.com "News from Our Partners", sophisticatedcloud.com (`utm_campaign=advertisement`), geekvibesnation.com.
- **Reddit spam** in off-topic subreddits.
- **Perplexity cited some of these pages.** The spam does reach AI answers, but the brands that use it end up surrounded by spam signals and carry manual-action risk.
- **Legitimate patterns worth copying:**
  - honest Trustpilot profiles (most IPTV profiles are thin, with 2–40 reviews)
  - own YouTube setup channels
  - disclosed creator reviews
  - forum participation as staff
  - editorial listicles from software sites that link players with branded anchors (troypoint, AlternativeTo)

---

## 6. Checklist (brand-entity plan)

Legend: ✅ already true · 🔧 done on branch `brand` · ❓ needs owner (`seo/eeat-confirm.md`) · 📝 plan or off-site.

1. 🔧 **One brand source:** `src/lib/site-data/brand.ts` holds the name `TryIPTV`, alternate names, tagline, short and long descriptions, logos and colours. It feeds:
   - the footer
   - Organization and WebSite schema
   - the About schema
   - both web manifests
   - llms.txt, llms-full.txt and ai.txt
   - the `/press` page
   - **Removed:** "Premium" (footer) and "4K Ultra HD quality" (manifest).
2. 🔧 **Organization schema:**
   - type `OnlineBusiness`
   - name, alternateName (same as WebSite), url, logo `/logo.png` (1024×1024, also used in the About schema now), description, slogan, email, contactPoint, sameAs
   - foundingDate, legalName and address are added automatically once confirmed (❓ eeat-confirm questions 1, 4, 6)
3. 🔧 **`/press` page** (new, indexable, linked in the footer):
   - boilerplate and key facts table, all from `PRODUCT_TRUTHS` and `BRAND`
   - three downloadable logos and colours
   - four real setup screenshots
   - media contact (❓ press inbox and spokesperson)
4. 🔧 **`seo/social/profiles.md`:** the platforms to be on, ranked with evidence and IPTV policy risk:
   1. Trustpilot
   2. YouTube
   3. LinkedIn
   4. Facebook, X and Instagram
   5. Reddit (monitor only)
   6. BBB
   7. Crunchbase
   8. Search Console and Bing Webmaster Tools
   - **Plus a do-not-create list:** Google Business Profile, Bing Places, Wikipedia, Wikidata, link directories and more. `seo/directories.md` is updated to match.
5. 🔧 **`seo/outreach/linkable-assets.md`:** three ideas (a data report, a bandwidth calculator, an ultimate guide). **The calculator is drafted** with its copy, formulas consistent with the speed guide, and a server-rendered default result.
6. 🔧 **`seo/outreach/plan.md`:**
   - phases 0–3
   - target site types and pitch angles
   - three email templates
   - prospecting rules (no parasites, no paid sections)
7. 🔧 **`seo/outreach/unlinked-mentions.md`:** find, triage, request and measure; log in `mentions-log.csv`.
8. 🔧 **`seo/outreach/anchor-text.md`:**
   - 50–60% brand, 15–20% naked URL, 10–15% brand plus generic, 10–15% descriptive, 0% requested commercial anchors
   - `rel="sponsored"` on anything paid or in exchange for something
9. ❓ **Gates before any outreach or new profile:** licensing (eeat-confirm questions 15–18) and operator identity (questions 1–8). Platforms remove services that "facilitate illegal products or services", and a removed profile is negative evidence for AI engines.
10. 📝 **KPIs, monthly:**
    - third-party pages naming TryIPTV with correct facts
    - Bing branded Citation Share
    - Search Console generative-AI impressions
    - the 30 test prompts in `seo/geo-test-prompts.md`
    - Preferred Sources count (Google emails this to site owners)
