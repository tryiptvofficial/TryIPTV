# Anchor text strategy

Goal: an off-site link profile that reads as earned. Most links name the brand; a few describe the content; almost none are commercial keywords.

**Why**
- Google's link-spam policy names "links with optimized anchor text in articles, guest posts, or press releases distributed on other sites" as spam ([spam policies](https://developers.google.com/search/docs/essentials/spam-policies), updated 2026-08-28).
- Branded anchors correlate with AI visibility: ρ 0.527–0.628 ([Ahrefs](https://ahrefs.com/blog/ai-overview-brand-correlation/), 3P, correlational).
- Bing has no disavow tool (removed Oct 2023), so avoiding risky anchors is the only control.

## Target mix (inbound links we influence)

| Anchor type | Example | Target share | When it is used |
|---|---|---|---|
| Brand | "TryIPTV" | 50–60% | Default for every mention we ask for or answer |
| Brand + generic | "TryIPTV's setup guide", "the TryIPTV team" | 10–15% | Quotes and expert comments |
| Naked URL | "tryiptv.com", "www.tryiptv.com/devices/firestick-iptv" | 15–20% | Resource lists, forum replies, press kits |
| Descriptive, the page topic | "Firestick IPTV setup guide", "M3U vs Xtream Codes explainer" | 10–15% | Only when a writer links a specific guide; their wording, not ours |
| Generic | "here", "this guide", "source" | 5% | Natural citations |
| Commercial keyword | "best IPTV service", "buy IPTV", "IPTV subscription" | **0% requested** | Never ask for these. If a site uses one, leave it, and don't repeat the pattern. |

## Rules

1. **We never suggest an anchor that contains a commercial keyword.** Outreach emails ask writers to "name TryIPTV and link the page you're citing".
2. **Paid, affiliate, sponsored or free-trial-in-exchange links** must carry `rel="sponsored"` (or `nofollow`). We ask for that attribute explicitly in writing.
3. **Partner sites** get no template, footer or widget links ("Powered by TryIPTV").
4. **Press releases (real news only):** branded or naked-URL links, wire links nofollow. We don't use wires for link building.
5. **Our own site:** internal links stay descriptive and use the destination's topic (this is already true; see `seo/research/on-page-seo.md`).
6. **Monthly review:**
   - Export new referring domains from Search Console (Links → Top linking sites) and the Bing Webmaster Tools backlink report.
   - If commercial-keyword anchors from unknown sites go above ~5% of new links, check for negative SEO or a reseller copying us.
   - With Google, keep a disavow file only for clear link schemes; Bing has none.
