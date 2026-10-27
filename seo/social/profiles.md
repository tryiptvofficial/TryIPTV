# Social profiles, review platforms and directories

Researched 2026-10-20. Sources are in `seo/research/brand.md` §4–5.

**Use the same strings on every profile.** Copy them from `src/lib/site-data/brand.ts`:
- **Name:** `TryIPTV`
- **Website:** `https://www.tryiptv.com`
- **Tagline:** `IPTV service with a 24-hour free trial`
- **Short bio (≤160 characters):** `IPTV service: live TV and on-demand video on your own devices and player apps. No auto-renewal, 24-hour free trial.`
- **Long description:** `BRAND.description` (2 sentences)
- **Avatar:** `/brand-logo-square.png` (symbol). Cover or banner: `/logo.png` on `#040506`.
- **Contact:** support@tryiptv.com · WhatsApp +212 694-833293 (wa.me/212694833293)

**Rules**
- Add a profile to `sameAs` in `src/lib/site-data/socials.ts` (`publicBrandSocialLinks`) only after it exists, is owned by TryIPTV and is active.
- No bought followers, reviews or engagement. Bing calls this "artificial social promotion schemes"; Google treats it as spam.
- **Gate before every signup:** most review platforms and social networks remove services that "facilitate illegal products or services". A removed or warning-flagged profile is negative evidence that AI engines can find. Open these profiles only once the content-licensing answers in `seo/eeat-confirm.md` (questions 15–18) are settled.

## Priority list

| # | Platform | Why | Evidence | Policy risk for IPTV | Status |
|---|---|---|---|---|---|
| 1 | **Trustpilot** | <ul><li>The most-cited review platform across AI engines.</li><li>ChatGPT reads a missing profile as a negative.</li><li>Median AI citation rate: 1% with no profile vs 53.5% with one.</li></ul> | [Seer 2026-05-14](https://www.seerinteractive.com/insights/study-of-800k-ai-responses-how-reviews-shape-brand-presence-in-ai-search) (3P); [DirJournal index](https://www.dirjournal.com/blogs/ai-citation-index) (3P) | **High.** <ul><li>Businesses that facilitate illegal products or services are ineligible ([Action we take](https://corporate.trustpilot.com/legal/for-businesses/action-we-take)).</li><li>Incentivised and selective invitations are banned ([Guidelines](https://corporate.trustpilot.com/legal/for-businesses/guidelines-for-businesses)).</li></ul> | ❓ [CONFIRM] Does a profile already exist? Open one only once licensing is settled. Invite every customer automatically, with no incentive, and reply to every review. |
| 2 | **YouTube channel** | <ul><li>#1–2 cited domain in AI Overviews, AI Mode, Perplexity and Gemini.</li><li>YouTube brand mentions correlate ρ≈0.74 with AI visibility, the strongest factor tested.</li><li>AI Overviews link to timestamps inside videos.</li></ul> | [Ahrefs 2026-09](https://ahrefs.com/blog/most-cited-domains-ai-overviews/), [BrightEdge 2026-08-20](https://www.brightedge.com/resources/weekly-ai-search-insights/google-ai-overviews-chatgpt-youtube-citations) (3P) | **Medium.** The [external links policy](https://support.google.com/youtube/answer/9054257) bans links giving unauthorised access to paid streaming; 3 strikes end the channel. | 📝 Chaptered setup videos (one per device guide) with an accurate transcript, plus Shorts. Name "TryIPTV" in the spoken script and description. Show only apps and settings, never channel footage or logos you have no rights to. |
| 3 | **LinkedIn company page** | <ul><li>Top 5 in Peec for 4 engines; #17–38 in Ahrefs.</li><li>Company paths are open to OAI-SearchBot.</li><li>A cheap entity anchor.</li></ul> | [Peec 2026-03](https://docs.peec.ai/research/most-cited-domains-by-engine.md) (3P) | Low, if company details are true | ❓ Needs the legal name, location and founding year (eeat-confirm questions 1, 5, 6). |
| 4 | **Facebook page** (exists: facebook.com/tryiptv) | #3–4 in AI Overviews, AI Mode and Perplexity | Ahrefs 2026-09 (3P) | Medium. Meta has banned ads for unauthorised streaming devices since 2017. Organic page only, no ads. | ❓ Confirm it is active and owned (eeat-confirm question 40). Update the bio to the strings above. |
| 5 | **X** (exists: x.com/tryiptv) | Account used to claim a Google knowledge panel; entity anchor | [Google: claim a knowledge panel](https://support.google.com/knowledgepanel/answer/7534902) | Low | ❓ Same as Facebook. |
| 6 | **Instagram** (exists: instagram.com/tryiptvofficial) | Entity consistency. The handle differs from the brand ("tryiptvofficial"). | — | Low | ❓ Same as Facebook. If @tryiptv can be obtained, prefer it. |
| 7 | **Reddit, one disclosed staff account** | #1 on Gemini, Perplexity and AI Mode. Volatile on ChatGPT (−86% in Aug 2026). | [Peec](https://docs.peec.ai/research/reddit-in-ai-search.md); [The Drum 2026-08-25](https://www.thedrum.com/news/did-the-brand-rush-to-reddit-kill-the-platform-s-chatgpt-citations) (3P) | **High.** <ul><li>IPTV subreddits ban provider promotion, and reseller subs have been banned.</li><li>Rule 2 and the spam policy target accounts that mainly post links to their own business.</li></ul> | 📝 Monitor first. Answer support questions only where the subreddit allows vendors, always disclosed. Never use sockpuppets or seed threads. |
| 8 | **BBB profile (free, not accredited)** | About 277k AI citations (DirJournal). Copilot elevates BBB. | DirJournal (3P) | Medium. Accreditation requires meeting licensing requirements. | ❓ Claim the profile once a legal entity and address are confirmed. Resolve every complaint. |
| 9 | **Crunchbase** | Lets answer bots crawl it; an entity anchor | robots.txt checked 2026-10-20 | Low | ❓ Needs company facts. |
| 10 | **Google Search Console + Bing Webmaster Tools** | <ul><li>Required to claim a knowledge panel.</li><li>AI Performance and Citation Share reporting.</li><li>The generative-AI performance report.</li></ul> | [Google](https://support.google.com/knowledgepanel/answer/7534902), [Bing](https://blogs.bing.com/search/2026/6/New-AI-Visibility-Insights-in-Bing-Webmaster-Tools-Intents-Topics-Citation-Share-Compare/) | None | ❓ Verify both, if not done already. |

## Do not create

| Platform | Reason |
|---|---|
| **Google Business Profile** | "online-only businesses" are ineligible, and virtual offices break the rules ([GBP eligibility](https://support.google.com/business/answer/13763036)). |
| **Bing Places** | Needs a customer-facing address or service area. Not suitable for an online-only service [UNCONFIRMED; page didn't render]. |
| **Wikipedia article** | <ul><li>Notability requires "significant coverage in multiple reliable secondary sources that are independent of the subject" ([WP:NCORP](https://en.wikipedia.org/wiki/Wikipedia:Notability_(organizations_and_companies))).</li><li>Paid editing must be disclosed.</li><li>An article would be deleted.</li></ul> |
| **Wikidata item** | Only after several independent, reliable references exist; a self-sourced item gets deleted. |
| **G2, Capterra, Product Hunt** | B2B software and launch platforms, so not a fit for a subscription service. Product Hunt suits a real tool later; see linkable asset #2. |
| **Yelp** | Local businesses only. |
| **"SEO directories", bookmark sites, link directories** | "Low-quality directory or bookmark site links" are link spam (Google spam policies). |
| **Quora** | Cited in AI Overviews and AI Mode, but only useful with genuine expert answers. Skip until there is a named expert (eeat-confirm question 30). |
