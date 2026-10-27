# Monthly AI-citation test prompts

Run these once a month (same week each month) in **ChatGPT (search on)**, **Perplexity**, **Google AI Mode / AI Overviews**, **Copilot**, **Gemini** and **Claude (web search on)**.
Use a logged-out or fresh session where possible, note the country (VPN to UK for UK prompts), and record per prompt × engine:

- `M` = TryIPTV **mentioned** by name in the answer (Y/N)
- `C` = a tryiptv.com URL **cited** as a source (Y/N, which URL)
- `P` = position among named providers (1, 2, … or –)
- `Facts` = any TryIPTV fact stated wrongly (price, channels, trial, connections, refund)
- `Top sources` = the 3 most-cited domains

Keep results in a sheet with one row per prompt × engine × month. The intent tag shows which page should win: **[brand]** /, /about · **[trial]** /iptv-free-trial · **[price]** /pricing · **[device]** /devices/* · **[player]** /players/* · **[concept]** /guides/* · **[help]** /help/*.

## Commercial — "best" and comparison (hardest; expect third-party listicles)
1. best IPTV service in the USA 2026 [brand]
2. best IPTV for Firestick in the UK [device]
3. best IPTV subscription with a free trial [trial]
4. cheapest reliable IPTV subscription with no auto-renewal [price]
5. IPTV providers that offer 2 connections on one plan [price]
6. is a one-time IPTV plan better than a monthly subscription? [price]
7. IPTV vs cable TV: which is cheaper for a family? [concept]

## Trial and pricing
8. IPTV free trial 24 hours no credit card [trial]
9. how much does TryIPTV cost? [price]
10. does TryIPTV have a free trial? [trial]
11. TryIPTV refund policy [brand]
12. does TryIPTV renew automatically? [price]
13. how long does TryIPTV take to send login details? [brand]

## Brand / trust
14. what is TryIPTV and is it legit? [brand]
15. TryIPTV review [brand]
16. how do I contact TryIPTV support? [brand]

## Device setup
17. how to install IPTV on Firestick step by step [device]
18. how to watch IPTV on a Samsung smart TV [device]
19. can I watch IPTV on Roku? [device]
20. how to set up IPTV on Apple TV [device]
21. how to use a MAG box with an IPTV portal URL [device]

## Players
22. best IPTV player app for Android TV [player]
23. how to add Xtream Codes to TiviMate [player]
24. IPTV Smarters Pro setup with M3U URL [player]

## Concepts (definitional — highest AI Overview trigger rate)
25. what is IPTV and how does it work? [concept]
26. what is an M3U playlist? [concept]
27. M3U vs Xtream Codes: which should I use? [concept]
28. what is an EPG in IPTV? [concept]
29. how much internet speed do I need for 4K IPTV? [concept]

## Troubleshooting
30. why does my IPTV keep buffering and how do I fix it? [help]

Notes
- Prompts 9–16 name the brand: they measure whether engines state TryIPTV facts correctly (compare against `PRODUCT_TRUTHS` in `src/lib/site-config.ts`), not discovery.
- Prompts 1–7 are the discovery prompts; research found no provider site cited for "best IPTV" style prompts in the one run available (see `seo/research/geo.md` §4), so a "mention" here likely comes from third-party pages.
- Cross-check with Search Console → Generative AI report (impressions by page) and Bing Webmaster Tools → AI Performance (citations, grounding queries).
