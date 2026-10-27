# Outreach plan (earned mentions and links only)

**Hard rules**
- No paid links.
- No PBNs.
- No parasite placements: hijacked Shopify blogs, .gov or .edu uploads, "News from our Partners" sections, Indie Hackers or Medium spam.
- No fake reviews or seeded Reddit threads.
- No keyword anchors.

**What the policies say**
- **Google:** paid, gift or trial-for-link placements are link spam unless marked `rel="sponsored"`. Site-reputation abuse still brings manual actions outside the EEA. Inside the EEA (since 2026-08-30), the abusive section is ranked on its own merits instead.
- **Bing:** lists "link buying … private networks, and artificial social promotion schemes" as abuse, and has no disavow tool.
- **Evidence:** competitors that use these tactics sit among parasite and spam pages (see `seo/research/brand.md` §5).

**Order of work**
- Phase 1 and the gates in `seo/eeat-confirm.md` come first, especially licensing and the operator's identity. Outreach to journalists or reviewers before those are answered would invite exactly the questions we can't yet answer.
- **The off-site KPI is mentions with correct facts** (see `unlinked-mentions.md`). Links are secondary.

## Phase 0 — prerequisites (owner)
- Answer eeat-confirm questions 1–8 (company identity), 15–19 (licensing) and 9–14 (contact). Set up a real press inbox (`COMPANY.support.pressEmail`).
- Verify Search Console and Bing Webmaster Tools. Set Search Console → Search generative AI to Include.
- Make the social profiles consistent with `seo/social/profiles.md`.

## Phase 1 — own channels (months 1–3)
- **YouTube:** one chaptered setup video per device guide (Firestick, Android TV, Samsung, LG, Apple TV, iPhone, Windows, Mac, MAG, Roku).
  - Name "TryIPTV" in the script and description.
  - Upload an accurate transcript.
  - Link the matching guide.
  - Show apps and settings only.
- **Trustpilot:** set up automatic invitations to every customer, with no incentives. Reply to every review. *Only after licensing is settled.*
- **Linkable asset #2** (calculator, see `linkable-assets.md`): build and publish it.

## Phase 2 — earned coverage (months 2–6)

| Target site type | Examples (verify each before pitching) | Pitch angle | What we offer | Never offer |
|---|---|---|---|---|
| Cord-cutting and streaming journalists, tech explainers | Tech sections of news sites, cord-cutting blogs, home-network writers | <ul><li>Data angle: real stream bitrates and data use per hour (asset #1).</li><li>Explainer angle: "M3U vs Xtream Codes", "what IPTV is and isn't legally" (our guide cites primary sources).</li></ul> | A quote from a named, confirmed person; data; screenshots from `/press` | Money, free months, affiliate links presented as editorial |
| Device and app reviewers (Fire TV, Android TV, Apple TV, Samsung, LG) | YouTube setup channels, device-review blogs | Our device guides and the bandwidth calculator as resources for their readers | Link to the guide; a test trial with **no conditions** on what they write | A trial or account in exchange for a dofollow link (that is link spam) |
| Home networking, ISP and broadband sites | Router-review sites, ISP comparison sites | <ul><li>"How much bandwidth does live streaming really need?" (asset #1).</li><li>The calculator (asset #2).</li></ul> | Embeddable chart with attribution | Paid placement |
| University, library and community digital-literacy pages | Cord-cutting and streaming help guides | Neutral explainers: what IPTV is, legality with sources, internet speed | Resource link suggestion | Anything self-promotional |
| Podcasts and newsletters on cord cutting | — | Founder or support-lead interview: what support sees (common setup errors), anonymised | Interview | Sponsorship presented as editorial |
| Real news (wire) | Only for real events: licensing deal, app launch, data report | Announcement | Branded or nofollow links | Wire releases as link building |

**Prospecting method**
- Search for "[device] IPTV setup guide", "cord cutting bandwidth", "how much data does streaming use", "what is IPTV" and similar.
- Keep only sites with real editorial staff, bylines, and no "write for us / sponsored post" price list.
- Check each site against the parasite patterns in `seo/research/brand.md` §5.
- Log every prospect in `seo/outreach/prospects.csv` (create it on first use).

**Cadence:** 10–15 personal pitches a week. One follow-up after 7 days, then stop.

## Phase 3 — maintain
- Run the monthly unlinked-mentions sweep (`unlinked-mentions.md`).
- Make quarterly asset updates: refresh the data report and keep the calculator inputs current.
- Monthly measurement:
  - Google Search Console: generative-AI report and links report
  - Bing Webmaster Tools: AI Performance, branded Citation Share, backlinks
  - the 30 prompt tests in `seo/geo-test-prompts.md`

## Email templates

### A. Resource pitch (for asset #1 or #2)

> **Subject:** Data on how much bandwidth live TV streams actually use
>
> Hi [first name],
>
> I read your piece "[their article title]". The section on [specific point] was useful, especially [detail].
>
> We publish [the IPTV bandwidth and data calculator / a measured report of stream bitrates on [devices], dated [month year]] at [URL]. It shows [one concrete finding, with the number and source].
>
> If it helps your readers, you're welcome to reference it. Charts are free to use with attribution. No strings attached, and I'm happy to answer questions about the method.
>
> [Real name], [role], TryIPTV
> [press email]

### B. Expert quote (journalists)

> **Subject:** Re: your request on [topic]: [one-line answer]
>
> Hi [first name],
>
> [2–3 sentence answer with a fact and its source.]
>
> Name for attribution: [real name], [role] at TryIPTV ([URL]). Happy to add detail or data.
>
> [press email]

### C. Reviewer test access (no-conditions trial)

> **Subject:** Test access for your [device] IPTV setup coverage
>
> Hi [first name],
>
> If you're writing about IPTV setup on [device], we can give you a free test account so you can try it on your own network. There are no conditions: write whatever you find, positive or negative, and link to us only if it helps your readers.
>
> If you do mention us, our facts are at [URL]/press.
>
> [Real name], TryIPTV

**Note:** if a reviewer asks for payment or an affiliate deal, that's fine only if their links carry `rel="sponsored"` and the post is disclosed. Record it in `prospects.csv` as sponsored.
