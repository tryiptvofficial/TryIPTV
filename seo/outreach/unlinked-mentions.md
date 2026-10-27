# Unlinked brand mentions → links

An unlinked mention is a page that names TryIPTV without a link.

**Why mentions matter even without a link**
- In AI Overviews, brands are named without a link about 89% of the time ([Ahrefs](https://ahrefs.com/blog/ai-citations-vs-impressions-study), 3P).
- Branded web mentions show the strongest correlation with AI visibility: ρ 0.66–0.71, linked or unlinked ([Ahrefs](https://ahrefs.com/blog/ai-brand-visibility-correlations), 3P, correlational).
- Google says unlinked mentions don't pass PageRank (Mueller, 2021, via [SEJ](https://www.searchenginejournal.com/google-seo-brand-mentions/430848/)). So the first job is getting the **facts in the mention** right; a link is a bonus.

## 1. Find (monthly, 30 minutes)

- **Google:**
  - `"TryIPTV" -site:tryiptv.com`
  - `"Try IPTV" -site:tryiptv.com -"try iptv free"` (filters out the generic phrase)
  - `"tryiptv.com" -site:tryiptv.com`
- **Bing:** the same queries, plus Bing Webmaster Tools → AI Performance:
  - Look for grounding queries that contain "tryiptv".
  - Citation Share for those queries should be close to 100%. If other sites are cited for our name, the entity is ambiguous.
- **Platforms:** search for "TryIPTV" in titles and descriptions on YouTube, Reddit and Trustpilot.
- **Alerts:** a Google Alert for "TryIPTV" and "tryiptv.com" (free).
- **Ahrefs Brand Radar or Content Explorer:** not on the current plan. If the plan is upgraded, use their mention and AI-visibility reports.
- **Log each mention** in `seo/outreach/mentions-log.csv` with these columns: date found, URL, site type, mention text, facts correct (Y/N), linked (Y/N), contacted, outcome.

## 2. Triage

| Situation | Action |
|---|---|
| Wrong facts (old price, wrong trial length, wrong connection count) | **Priority 1.** Send a correction request with the source page. No link request needed. |
| Correct and editorial, no link | Send a polite request to link the page they describe (template below). One email, one follow-up after 7 days, then stop. |
| Negative but accurate review | Don't ask for a link. Reply publicly where possible, fix the issue, and log it. |
| Spam, scraped or parasite page (hijacked blogs, .gov PDFs, "best IPTV" spam) | Never ask for a link. If it impersonates us or misuses the brand, report it to the host. If it links to us at scale, record it for a possible Google disavow. |
| Reddit, forums, YouTube comments (UGC) | Don't ask for links. Answer questions openly as a staff account when the subreddit's rules allow vendors. |
| Our own social profiles or directories | Make sure each one carries the canonical name, description and URL from `src/lib/site-data/brand.ts`. |

## 3. Request template (correction or link)

> **Subject:** Small update for your article on [topic]
>
> Hi [name],
>
> Thanks for mentioning TryIPTV in "[article title]". [One sentence on what they got right, or "One detail has changed:"]
>
> [If correcting:] Our trial is currently [24 hours, $0, no card] and plans are [$15.82–$88.23, paid once per plan]. The current details are at https://www.tryiptv.com/pricing.
>
> If it's useful for your readers, the page that covers [their topic] is [exact URL]. A link to it would let them check the details themselves, but no pressure either way.
>
> Thanks,
> [Real name], TryIPTV
> [press or support email]

**Rules**
- No payment, discounts, free months or trial accounts in exchange for a link.
- If the site asks for payment, decline, or accept only a `rel="sponsored"` placement with clear disclosure, and expect no SEO value from it.
- Never suggest keyword anchors (see `anchor-text.md`).

## 4. Measure

- **Mentions log:** number of new mentions per month and the % with correct facts. These are the main KPIs.
- **Links won:** a secondary KPI.
- **Correlate quarterly** with:
  - the Search Console generative-AI report (impressions per page)
  - Bing AI Performance citations and branded Citation Share
  - the monthly prompt tests in `seo/geo-test-prompts.md` (mentions of TryIPTV)
