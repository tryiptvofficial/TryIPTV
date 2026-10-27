# Trust and E-E-A-T research (tryiptv.com)

Compiled 2026-10-20 from five parallel research passes. Pages were opened on 2026-10-20 unless marked otherwise.

- **[Official]** marks a vendor statement. **[3P]** marks third-party data, which is correlational unless stated otherwise.
- IPTV is trust-sensitive, and the dominant risk is copyright. Every recommendation here assumes we state only facts the owner can back up.

Companion docs: `seo/research/geo.md`, `seo/research/ai-overviews.md`, `seo/research/on-page-seo.md`.

## 1. Google: rater guidelines, E-E-A-T, helpful content, reviews

The rater guidelines (QRG) edition is confirmed as **September 11, 2025** ([PDF](https://guidelines.raterhub.com/searchqualityevaluatorguidelines.pdf); the latest changelog entry is September 2025). A blog claim of a June 2026 update is contradicted by the PDF itself.

| Date | Source | Finding | Implication |
|---|---|---|---|
| 2026-10-05 | [Official] [Creating helpful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) | <ul><li>"Do pages carry a byline, where one might be expected?"</li><li>"We strongly encourage adding accurate authorship information".</li><li>"Fabricating creator profiles" is called "a form of deception".</li><li>Readers should understand how many products were tested, with "evidence of the work involved, such as photographs."</li><li>Disclose AI use where readers would expect it.</li></ul> | <ul><li>Bylines and author pages for **real people only**.</li><li>Use an organisation byline until a real author is confirmed.</li><li>"How we test" must describe real methods.</li></ul> |
| 2026-10-01 | [Official] [Using gen-AI content](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content) | <ul><li>Fact-check all AI-drafted titles, descriptions, structured data and alt text.</li><li>Refers to QRG §4.6.5 and §4.6.6.</li></ul> | — |
| 2026-09-08 | [Official] [Review snippet](https://developers.google.com/search/docs/appearance/structured-data/review-snippet) | <ul><li>Self-serving reviews on Organization or LocalBusiness are ineligible.</li><li>"Ratings must be sourced directly from users."</li><li>Since 2026-07-24: "Don't include fake or undisclosed incentivized reviews".</li></ul> | No AggregateRating or Review markup on TryIPTV. Customer chats are shown as support examples, not reviews. |
| 2026-09-08 | [Official] [Organization SD](https://developers.google.com/search/docs/appearance/structured-data/organization) | <ul><li>No properties are required.</li><li>Recommended properties include legalName, address, contactPoint, sameAs, foundingDate, vatID ("trust signal") and logo (at least 112px).</li><li>Place it on the homepage or a single About page.</li></ul> | contactPoint and email added. legalName, address, foundingDate and vatID wait for [CONFIRM]. |
| 2026-09-08 | [Official] [ProfilePage SD](https://developers.google.com/search/docs/appearance/structured-data/profile-page) and [Article SD](https://developers.google.com/search/docs/appearance/structured-data/article) | <ul><li>ProfilePage with a Person mainEntity is valid for author pages.</li><li>Article `author.url` should uniquely identify the author.</li></ul> | `/authors/[slug]` uses ProfilePage and Person. Article author becomes the Person once confirmed. |
| 2026-08-28 | [Official] [Spam policies](https://developers.google.com/search/docs/essentials/spam-policies) | <ul><li>Legal removals: a significant volume of valid copyright requests demotes the whole site.</li><li>Scam and fraud includes impersonating a business.</li><li>Misleading functionality is listed.</li><li>Since 2026-05-15, the policies also cover manipulating AI responses.</li></ul> | <ul><li>Never promise named channels, leagues or events.</li><li>No paid or planted mentions aimed at AI answers.</li></ul> |
| 2025-09-11 | [Official] QRG §2.5.2, §2.5.3 | <ul><li>It should be clear who is responsible for the website and who created the content.</li><li>"Contact information and customer service information are extremely important for websites that handle money".</li><li>Raters look for payment, exchange and return policies.</li></ul> | About, Contact and policy pages are linked site-wide in the footer. Name the operator. |
| 2025-09-11 | [Official] QRG §3.3 | <ul><li>"Be skeptical of claims that websites make about themselves"</li><li>Raters search `[brand -site:brand.com]` for reviews, news and forums.</li></ul> | Off-site reputation outweighs on-site claims. |
| 2025-09-11 | [Official] QRG §3.4 | <ul><li>"The most important member … is Trust."</li><li>"Online stores need secure online payment systems and reliable customer service."</li></ul> | — |
| 2025-09-11 | [Official] QRG §4.5.1, §4.5.3, §5.5–5.6 | <ul><li>Sites handling money with "absolutely no information about the website or content creator" are rated Lowest.</li><li>Deception (Lowest) includes a false claim of personal testing, a fake address, made-up author profiles, and copied branding.</li><li>A "shopping page with minimal customer service information" is Low.</li><li>Exaggerated claims are Low.</li></ul> | <ul><li>**An anonymous operator is the biggest gap.**</li><li>Remove "Best" self-claims.</li><li>Never invent people, testing or addresses.</li></ul> |

## 2. Bing and Copilot

| Date | Source | Finding | Implication |
|---|---|---|---|
| 2026-08-18 | [Official] [Copilot Transparency Note](https://support.microsoft.com/en-US/microsoft-copilot/transparency-note-for-microsoft-copilot) | Copilot "centers its response on high-ranking content" and aims for "reliable sources" and "high-quality web data". | Copilot trust follows Bing ranking. |
| 2026-05-13 | [Official] [Keeping trusted content visible](https://blogs.bing.com/search/2026/5/Keeping-Trusted-Content-Visible-in-an-AI-Powered-Search-World/) | "Elevation of authoritative resources". | — |
| 2026-05-06 | [Official] [Evolving role of the index](https://blogs.bing.com/search/2026/5/Evolving-role-of-the-index-From-ranking-pages-to-supporting-answers/) | <ul><li>Sources carry different "evidentiary weight".</li><li>Conflicting sources "must detect and represent conflict".</li></ul> | Keep one consistent set of facts (`npm run check:facts`). |
| live (Mar 2025) | [Official] [How Bing delivers search results](https://support.microsoft.com/en-us/bing/how-bing-delivers-search-results) | <ul><li>"Quality and Credibility" is the #2 ranking parameter.</li><li>It covers "Origination and transparency of the ownership", reputation (who links to the site), and "how well does the site differentiate fact from opinion".</li><li>Copyright notices remove URLs.</li></ul> | Ownership transparency and fact-not-hype copy. |
| live | [Official] [Webmaster Guidelines](https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a) §14–16 and the abuse section | <ul><li>Markup "must accurately reflect visible content".</li><li>Use one consistent entity name.</li><li>Misleading structured data and "artificial social promotion schemes that simulate popularity" are abuse.</li></ul> | No fake ratings. "TryIPTV" is used everywhere. |
| live | [Official] [Structured data overview](https://www.bing.com/webmasters/help/marking-up-your-site-with-structured-data-3a93e731) | Reviews markup is checked against the content surrounding it. | — |

## 3. AI Overviews and AI Mode: trust signals

| Date | Source | Finding | Implication |
|---|---|---|---|
| 2026-07-10 | [Official] [AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) | <ul><li>Gen-AI features are "rooted in our core Search ranking and quality systems".</li><li>The guide does not mention E-E-A-T or authors.</li></ul> | There is no separate AI trust layer: organic trust is AI trust. |
| 2026-05-27 / 08-20 | [Official, via [9to5Google](https://9to5google.com/2026/05/27/google-ai-mode-preferred-sources/)] Preferred Sources | <ul><li>A "Preferred" badge appears in AI Overviews and AI Mode.</li><li>Google is "working on" using it as a signal.</li><li>A custom button has been available since Aug 20.</li></ul> | 📝 Add the "preferred source" button. |
| 2026-05-28 | [3P] [Seer: AIO 2026](https://www.seerinteractive.com/insights/what-it-takes-to-rank-in-googles-ai-overviews-in-2026-is-not-what-you-think) (8,500 keywords) | <ul><li>Author-bio coverage was **inversely** correlated with AI Overview share.</li><li>Pages winning definitional queries link to .gov and .edu sites about twice as often.</li></ul> | Bios are for users and raters, not a citation lever. Cite primary sources. |
| 2026-05-14 | [3P, vendor with Trustpilot] [Seer: 804k AI responses](https://www.seerinteractive.com/insights/study-of-800k-ai-responses-how-reviews-shape-brand-presence-in-ai-search) | <ul><li>Brands with no Trustpilot profile had a 1% median citation rate, versus 53.5% with a profile.</li><li>ChatGPT flags "no independent customer reviews" as a negative.</li></ul> | 📝 A genuine, actively answered Trustpilot profile. |
| 2025-05-26 | [3P] [Ahrefs, 75k brands](https://ahrefs.com/blog/ai-overview-brand-correlation/) | Branded web mentions show ρ 0.664 with AI Overview brand visibility, the strongest factor. | Off-site reputation beats on-page markup. |
| 2025-12-15 | [3P] [SE Ranking AI Mode](https://seranking.com/blog/how-to-optimize-for-ai-mode/) | Trust and authority metrics, referring domains, and pages updated within the last 2 months all correlate with more citations. | — |

## 4. AI engines and unlicensed services

| Date | Source | Finding | Implication |
|---|---|---|---|
| 2026-08-18 | [Official] [OpenAI Model Spec](https://model-spec.openai.com/2026-08-18.html) | <ul><li>"Respect creators and their rights".</li><li>Do not facilitate illicit behaviour; the assistant may add "neutral, factual information about the illicit nature".</li><li>A search example "continues searching for more legitimate options".</li></ul> | Expect legality caveats. Pages framed around piracy invite them. |
| 2026-01-22 | [Official] [Claude's constitution](https://www.anthropic.com/constitution) | Anthropic does not want Claude to "Help someone violate intellectual property rights". IP questions call for judgement. | Same. |
| 2024-12-17 / 2026-08-18 / 2025-07-08 | [Official] Google Gen-AI policy, Microsoft Copilot terms, Perplexity AUP | All prohibit IP infringement and illegal activity. None names IPTV. | — |
| 2026-05-06 | [3P, single run] [Frevana](https://www.frevana.space/content/en/aeo-report-best-iptv-streaming-services-legal-%26-third%E2%80%91party--m5kzmxju7s1t5) | <ul><li>Gemini ranked licensed services first.</li><li>It put IPTV brands under "Third-party/Unverified".</li></ul> | Being named depends on legitimacy signals and third-party mentions. |
| 2024-05-02 | [3P] [TorrentFreak](https://torrentfreak.com/google-removes-pirate-iptv-services-from-uk-search-results-240502/) | Google delists pirate IPTV domains when blocking orders are forwarded. | A delisted domain can't be cited by Gemini or AI Overviews. |

**Legitimacy signals, ranked by evidence**
1. A genuine Trustpilot profile (evidenced, correlational).
2. Not being delisted (evidenced).
3. Third-party mentions in reviews, YouTube and Reddit (evidenced).
4. A clear, true content-source statement (inferred).
5. A BBB profile (partly evidenced).
6. Company identity and consistent contact details (inferred).
7. Transparent terms (inferred).
8. A DMCA process (inferred).

## 5. Competitor trust pages

Pages were fetched once each. sling.com and frndlytv.com returned 403; fubo and pluto were geo-blocked.

- **Philo:**
  - [About](https://www.philo.com/about) gives a dated timeline (2010 Tivli, 2013 Philo, 2017 launch, 2024 1M subscribers).
  - [Terms](https://www.philo.com/terms) name **Philo, Inc.**, a street address, a copyright agent with phone and email, and the rights wording "does not create an ownership interest in the Content".
  - [Contact](https://www.philo.com/contact) says "daily from 6 AM to midnight ET".
  - Flaw: the schema phone number differs from the visible one. Don't repeat this.
- **DirecTV:** a single [legal hub](https://www.directv.com/legal/) with archived prior versions, and a privacy postal address.
- **TechRadar:** [How we test](https://www.techradar.com/news/how-we-test) states "We do not take payment for product reviews. Ever." It has a scorecard and named editors-in-chief. [Author page](https://www.techradar.com/author/lance-ulanoff) uses Person with jobTitle and sameAs.
- **CNET:**
  - [How we test streaming](https://www.cnet.com/tech/services-and-software/how-we-test-streaming-services/): "up to a week" per service, devices named, ads measured.
  - [Profile](https://www.cnet.com/profiles/kojackson/) uses ProfilePage with Person.
  - No site publishes bitrate, speed or uptime methods. **That is the gap tryiptv.com can fill with real numbers.**
- **TiviMate and IPTV Smarters:** player-only disclaimers ("does not supply or include any media or content"). If TryIPTV cannot document licences, the honest model is an accurate service description plus a working DMCA process, never an unprovable licensing claim.

---

## 6. Checklist we will apply

Legend: ✅ already true · 🔧 done on branch `eeat` · ❓ needs owner (see `seo/eeat-confirm.md`) · 📝 off-site recommendation.

1. 🔧 **One facts file for company and trust data**: `src/lib/site-data/company.ts`.
   - Every unknown is `null`, with its [CONFIRM] question beside it.
   - **In production, unconfirmed facts are not rendered.** On Preview and dev builds they appear as amber [CONFIRM] markers, so you can review them on your phone.
2. 🔧 **About page:** facts come from `company.ts`. Story, legal name, location, founding year, registration and team are added as each one is confirmed. Payment methods are now shown; they were confirmed in the registry on 2026-10-09. ❓ The operator is still anonymous (QRG §4.5.1: Lowest risk).
3. 🔧 **`/content-licensing` (new):** only confirmed statements are shown.
   - It returns 404 in production and is noindex and out of the sitemap until something is confirmed.
   - Includes an explicit "no licence" alternative, because an unprovable claim is worse than none.
   - ❓ All lines need your answer.
4. 🔧 **Contact page:**
   - Email and WhatsApp number are visible.
   - Removed the always-on "Online" dot and the blanket "Encrypted & Confidential" claim.
   - ❓ Hours and response time.
5. 🔧 **Policies made consistent and dated 2026-10-20:**
   - **Terms:** Full HD speed figure, a refunds clause, and ❓ legal entity and governing law.
   - **Privacy:** names the real processors (Vercel, Cloudflare and Turnstile, Resend, WhatsApp, Google Analytics, Sentry) and the GA cookies. ❓ Data controller and retention.
   - **DMCA:** "designated agent" only once confirmed. ❓ Agent, US Copyright Office registration, and takedown time.
   - **Refund:** ❓ payout time.
6. 🔧 **Bylines on all 20 guides and every device guide.**
   - "By the TryIPTV team" (an honest organisation byline) plus a How we test link.
   - `/authors/[slug]` uses ProfilePage and Person, and Article `author` switches to the Person automatically, **for real, confirmed authors only**.
   - ❓ Who writes and reviews each guide.
7. 🔧 **`/how-we-test` (new):** devices, app versions, speed, uptime and support measurements. Same gating as the licensing page. ❓ All lines.
8. ✅ / ❓ **First-hand proof.**
   - Real screenshots exist for Firestick setup (4), TiviMate (3) and WhatsApp support chats (5, blurred).
   - ❓ Screenshots are needed for the Samsung, LG, Android TV, Apple TV, iPhone, Windows, Mac, MAG and Roku guides.
9. 🔧 **Unverifiable claims softened.**
   - "Best IPTV Service" is gone from the homepage title, H1, eyebrow, OG and Twitter tags and keywords; "premier" is gone from the site description.
   - "4K Ultra HD Streaming" now reads "HD and 4K streams where available".
   - ❓ The channel and title counts (25,000+ / 120,000+) stay pending your evidence. They are one edit away in `PRODUCT_TRUTHS`.
10. 🔧 **Organization schema:** logo, sameAs, email and a contactPoint (support email plus WhatsApp). legalName, foundingDate, address and vatID are added automatically once confirmed.
11. ✅ No self-serving review markup anywhere.
12. 📝 **Off-site (the strongest correlates):**
    - A genuine Trustpilot profile with replies to reviews.
    - Honest YouTube setup videos.
    - A real presence on Reddit and forums.
    - The Google "preferred source" button.
    - Never fake reviews or seeded posts; that is now explicitly spam.
