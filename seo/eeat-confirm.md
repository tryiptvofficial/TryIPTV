# [CONFIRM] questions for the owner (trust / E-E-A-T)

Answer each question in `src/lib/site-data/company.ts` or `src/lib/site-data/authors.ts`. The field to edit is given after each question.

**How the answers go live**
- **Production:** a fact appears only after you confirm it. Until then nothing is shown in its place: no placeholder, no guess.
- **Vercel Preview:** each question shows as an amber [CONFIRM] marker, so you can review everything on your phone.
- **Gated pages:** `/content-licensing` and `/authors/*` return 404 and stay out of the sitemap until at least one line on them is confirmed.

**Ground rules**
- Only give facts you can back up.
- If you'd rather not publish something, say so. It simply stays off the site.
- An invented address, author or licence is rated "Lowest" by Google's rater guidelines (§4.5.3). It is worse than leaving the fact out.

## Company and About page (`COMPANY` in company.ts)
1. ✅ **Answered 2026-10-21, restored 2026-10-23:** Simo Alaoui LLC. "Karim Adeyemi" (owner-supplied 2026-10-23, not independently verified) is not used as the legal entity. → `legalName`
    - ⚠️ **Open:** registration number 8683949 (New York Department of State) is still hidden. Show it again only if the owner asks.
2. ✅ **Answered 2026-10-21:** 8683949, New York Department of State. (The registry's Albany address is not TryIPTV's address and is not published as one.) → `registrationNumber`, `registry`
3. **VAT or tax ID**, if you want it published. Google lists vatID as a trust signal. → `vatOrTaxId`
4. **Registered or postal address**, if it should be published. It must be real; never a virtual or invented address. → `address`
5. ✅ **Answered 2026-10-21:** New York, United States (schema uses region level only, no street address). → `location`, `area`
6. ✅ **Answered 2026-10-21:** 2021. → `foundingYear`
7. ✅ **Answered 2026-10-21** (approved copy on /about). → `story`
8. ✅ **Answered 2026-10-21:** Simo Alaoui, Founder / Operations. → `team`

## Contact and support (`COMPANY.support`)
9. ✅ **Answered 2026-10-21:** 9:00 AM–10:00 PM ET, every day, for both WhatsApp and email. → `support.hours`, `support.hoursSpec`
10. ✅ **Answered 2026-10-21:** typically within 15 minutes on WhatsApp and email, during support hours. → `support.responseTime`
11. **Support languages.** → `support.languages`
12. **Contact form email delivery.** The form sends through Resend from `onboarding@resend.dev`, Resend's test sender. Resend generally only delivers mail from that address to the Resend account owner's own inbox. Should it send from a verified `@tryiptv.com` address instead? That needs DNS records in Resend and Cloudflare. *Not changed.*
13. **Does `care@tryiptv.com` exist and get read?** Since 2026-10-20 it is the DMCA address on `/dmca-report` and `/about` (it replaced `dmca@tryiptv.com`, using the owner-supplied DMCA text).
    - ✅ **Counter-notice jurisdiction (fixed 2026-10-23):** the DMCA page now uses the 17 U.S.C. 512(g)(3)(D) wording instead of "Canadian courts".
14. ✅ **Answered 2026-10-23:** WhatsApp links open wa.me/212694833293 (the number; a short-lived wa.me/tryiptvcom username link was reverted the same day) and the displayed number is +212 694-833293 (replacing +1 (520) 564-8298). *Earlier question:* **Is the WhatsApp number the permanent support line?** It is now shown as text on the contact page and in the Organization schema `contactPoint` URL.

## Content licensing (`LICENSING`; the page stays hidden until a line is confirmed)
15. **Do you hold distribution agreements or licences** for the channels and films you stream? If yes, with whom (rights holders, aggregators or distributors), and for which territories?
16. **Which licensors or distribution partners** can be named publicly?
17. **In which countries** is the service licensed to be offered?
18. **If you cannot document licences, tell us.** We will then publish an accurate description of what TryIPTV provides, plus the DMCA process, instead of a licensing claim. An unprovable claim is a deception signal for Google raters and for AI engines.
19. ✅ **Answered 2026-10-20:** "Our target takedown time after receiving and validating a valid copyright notice is within 5 minutes." It is shown on `/dmca-report` (`COMPANY.dmcaTakedownTarget`).

## Catalogue claims (`PRODUCT_TRUTHS` in src/lib/site-config.ts)
20. **How are the 25,000+ channels and 120,000+ movies and TV shows counted, and as of what date?** Can you publish the method or a category breakdown?
    - These counts appear on the homepage, pricing, FAQ, schema and llms files.
    - If you can't substantiate them, they can be softened in one edit. For example: "thousands of live channels and a large on-demand library".
21. **4K:** which channels or titles are actually 4K? The site now says "HD and 4K streams where available". Confirm that this is accurate.

## Policies
22. ◐ **Entity answered 2026-10-21:** Simo Alaoui LLC (Terms §17 names it). Still open: registered address, if it should be published. → `address`
23. ✅ **Answered 2026-10-21:** laws of the State of New York, without regard to conflict-of-law principles; exclusive jurisdiction of the state and federal courts located in New York. Shown verbatim in Terms §17. → `governingLaw`
24. ◐ **Answered in part 2026-10-21:** the policy names Simo Alaoui LLC (New York, United States) as responsible for the data. Still open: postal address for privacy requests, if required.
25. **Privacy:** how long do you keep support messages, order records and trial requests before deleting them?
26. **Privacy:** are the processors listed correct and complete? Listed: Vercel, Cloudflare (CDN and Turnstile), Resend, WhatsApp, Google Analytics and Sentry. Do you also use a CRM, a billing panel or an email provider for credentials?
27. **DMCA:** name and postal address of your designated agent, and is that agent registered with the U.S. Copyright Office? Safe-harbour protection under 17 U.S.C. 512 requires registration. → `dmcaAgent`
28. **Refund:** how long does an approved refund take to reach the customer, and is it paid back to the original payment method? (The refund page says requests are answered within 24–48 hours, but not how long the payout takes.)
29. **Payment methods:** the registry says "cryptocurrency, PayPal and Stripe" (recorded 2026-10-09). Is that still current? → `paymentMethods` (currently filled in)

## Authors (`AUTHORS` and `GUIDE_AUTHORS` in authors.ts)
30. **Which real people write or review the guides?** For each person:
    - name and role
    - a 2–4 sentence bio of their real experience with IPTV, devices or support
    - areas they cover
    - the year they started
    - a real photo (optional)
    - public profiles for `sameAs` (LinkedIn, X, YouTube)
31. **Which guides does each person own or review?** Map paths to people in `GUIDE_AUTHORS`.
    - Until this is filled in, guides show "By the TryIPTV team", which is honest.
    - On Preview, each guide shows a [CONFIRM] marker naming the path.

## How we test (the /how-we-test page was deleted on 2026-10-20 at the owner's request; these answers can still be used in guides, e.g. a measured uptime figure)
32. Which **exact devices** (model and OS version) are the setup guides tested on?
33. Which **player app versions** are tested, and how often are guides re-checked?
34. Do you **measure stream bitrates or speeds**? With which tool, on what connection, and on what dates?
35. Do you run **uptime monitoring**? Which tool, at what interval, and can a figure or status page be published?
36. Can you measure and publish **support response times**, for example from WhatsApp or email logs?

## First-hand proof (screenshots)
37. **Real setup screenshots** for the Samsung, LG, Android TV, Apple TV, iPhone/iPad, Windows, Mac, MAG and Roku guides. Firestick and TiviMate already have real ones.
    - Take them on your own devices with the real TryIPTV login, with credentials blurred.
    - Send them as PNG or JPEG files, one per setup step.
38. **Support screenshots:** the five WhatsApp chats on the homepage are blurred. Do you have the customers' permission to show them, and are they recent? They are presented as support examples, not as reviews.

## Off-site, highest impact (no code)
39. Do you have a **Trustpilot** (or BBB) profile? If yes, which URL? It can be added to `sameAs` once it has genuine reviews. Never buy or incentivise reviews without disclosure.
40. ✅ **Answered 2026-10-24 (owner-confirmed):** x.com/tryiptv, instagram.com/tryiptvofficial and facebook.com/tryiptvofficial are the owner's accounts (the old facebook.com/tryiptv link was replaced). → `socials.ts`, `sameAs`

## Brand entity (added on the `brand` branch)
41. ✅ **Answered 2026-10-21:** press@tryiptv.com; media contact Simo Alaoui, Founder / Operations. Shown on /press and as a `press` ContactPoint in the Organization schema. → `support.pressEmail`, `support.mediaContact`
42. ✅ **Decided 2026-10-25:** tagline "IPTV service with a 24-hour free trial". It is used in the schema `slogan`, llms files and profile bios. → `BRAND.tagline`
43. **Name spelling:** the logo wordmark reads "Try IPTV" while all text uses "TryIPTV". Keep "TryIPTV" as the one written form, or change the logo to match?
44. **Instagram handle:** it is @tryiptvofficial. Is @tryiptv obtainable, for an exact match with the other profiles?
45. **YouTube channel:** does one exist? If not, can you record real setup videos on your own devices (one per device guide)?
46. **Search Console / Bing Webmaster Tools:** are both verified? Is Search Console's "Search generative AI" setting on Include? This is needed for the knowledge panel claim and Preferred Sources.

## Privacy policy (owner-supplied text, added 2026-10-20)
47. **Data location:** the policy says data is stored on "encrypted servers, which may be located outside your country, including in the United Kingdom". Is that true for TryIPTV? The website is hosted on Vercel and Cloudflare, support runs on WhatsApp, and email on Resend.
48. **"Communicated via email to registered users":** TryIPTV has no user accounts. Will policy changes really be emailed to customers? If not, drop this line.
49. **"Enabling two-factor authentication":** TryIPTV logins have no 2FA. This line is generic advice; keep it or remove it?
50. **"First & Last Name (for account security)" and "Phone Number":** do you actually collect names and phone numbers (e.g. via WhatsApp orders)? The policy should list only what is really collected.
51. **"Provide personalized content":** the site has no personalisation. Keep it or remove it?

## Terms & Conditions (owner-supplied text, added 2026-10-20)
52. ✅ **Answered 2026-10-20** with the owner's refund policy text: once a subscription is activated and account details are delivered, all sales are final; a refund is issued only if a working subscription can't be provided. The refund page, `PRODUCT_TRUTHS.refund`, FAQ, pricing FAQ, pricing page, About page, Terms §6 and llms-full.txt all now say this. The old 7-day technical resolution window is removed everywhere, and `check:facts` now flags any stated refund window.
53. **Connections:** the supplied §11 said "Only one active stream is permitted at a time". That contradicts "2 simultaneous connections on every plan" (pricing, home, FAQ, schema). §3 and §11 now state 2 connections from `PRODUCT_TRUTHS`. Confirm 2 is correct.
54. **Trademarks:** the supplied §15 said "registered trademarks". Is "TryIPTV" (or the logo) actually a registered trademark, and if so where and under which number? Until then the page says "trademarks and property of TryIPTV". Claiming a registration you don't hold is unlawful in some countries.
55. **"Click-to-purchase" third-party vendors (§4):** does TryIPTV link to any third-party vendors? If not, this clause is harmless but can be removed.

## Disclaimer (owner-supplied text, added 2026-10-20)
56. **Business model, the most important open question:** the disclaimer now says "We do not host, stream, or rebroadcast television channels… We provide access credentials to third-party IPTV service providers". The homepage, About and Terms describe TryIPTV as "an IPTV service provider" that supplies streaming access.
    - **Which is accurate?** If TryIPTV resells access to third-party providers, the About page and homepage ("Who we are") should say so too, and the content-licensing page (questions 15–18) should describe that model.
    - The disclaimer also says "we are committed to providing access to legal IPTV services". This is a legality claim that only holds if the providers behind the service are licensed (see questions 15–18).

## Free trial page (owner-supplied text, added 2026-10-20)
The supplied text came from iptvv.ca and described that company's product. Prices (CAD $19/$29/$49/$79, one device), payment (Interac e-Transfer), delivery (email in 1–2 hours) and trial checkout (add-to-cart, login by email) were replaced with TryIPTV's facts: USD $16/$39/$60/$90, 2 connections, crypto/PayPal/Stripe, trial and login on WhatsApp in 5–15 minutes. The Canada-only items (Canadian channels, ISED link) were dropped.
57. **"Full access, nothing locked":** does the trial open the complete channel list and on-demand library, at the same quality as paid plans? And how many connections does a trial get? The page currently says "connection limit confirmed when your login is issued". If the trial is truly identical, the H1 can go back to "24 Hours of Full Access" and the FAQ can say so.
58. **"24/7 support" and "99.9% server uptime":** both were left off. 24/7 needs the real support hours (question 9); a 99.9% figure needs monitoring data (question 35).
59. ✅ **Answered 2026-10-24 (owner-confirmed):** catch-up TV is available, and PPV events are included. → `PRODUCT_TRUTHS.catchUpTv`, `ppvEvents`
60. ✅ **Answered 2026-10-24 (owner-confirmed):** the service is for the USA, UK and more ("USA, UK & More" in the homepage H1). Prices stay in USD. → `PRODUCT_TRUTHS.markets`

## Pricing page (owner-supplied text, added 2026-10-20)
Same source as the trial page. Replaced with TryIPTV facts: CAD prices and the 1–4 device tabs (TryIPTV has one price list with 2 connections), Interac e-Transfer and the order-number memo (now a crypto payment note), email login in 1–2 hours (now WhatsApp, 5–15 minutes). Left out: "High Performance Server", 99.9% uptime, 24/7 Canadian support, "taxes calculated by province".
61. **Multi-connection plans:** iptvv.ca sells 1–4 device versions of each plan. Do you want to sell 3- or 4-connection plans? If yes, send the prices and the pricing page can get device tabs.
62. **Taxes:** are sales taxes added to any order? If so, the pricing page and Terms should say so.

## FAQ page (owner-supplied questions, added 2026-10-20)
The owner's FAQ came from iptvv.ca as 72 questions in 11 topics without answers. Answers were written from PRODUCT_TRUTHS, COMPANY and the site's own guides. Canada-only wording was made general ("Is IPTV legal?", "at a second home" instead of "at the cottage"), and the Interac question became "Which payment methods does TryIPTV accept?". Please check these answers, which describe processes not written down anywhere yet:
63. **Renewal:** does a renewal extend the same login, or does the customer get new details? The answer currently says "order a new plan the same way… say you are renewing".
64. **Lost login:** can support resend login details to the customer's WhatsApp number or email? (The answer says it can.)
65. **Travel:** does the service work from any country, or are some regions blocked? The answer says it works wherever the connection is fast enough.
66. **International and local channels:** which languages and regions are actually covered (French, South Asian, Arabic, Filipino, Chinese; local channels)? The answers currently say "check during the trial".
67. **Catch-up:** see question 59. The plan cards and the FAQ say catch-up is offered "on channels where it is available".

## Company information (owner-approved copy, added 2026-10-21)
68. **Delivery time vs support hours (most important).** The site promises login details "within 5–15 minutes" (trial and paid) everywhere, but support runs 9:00 AM–10:00 PM ET. Is delivery automated around the clock? If not, every "5–15 minutes" should say "during support hours". → `PRODUCT_TRUTHS.activationTime`
69. ✅ **Answered 2026-10-21:** messages received outside support hours are queued and answered when support reopens; support runs every day, including weekends and public holidays, 9:00 AM–10:00 PM ET. → `support.outOfHours`, `support.hours`
70. ◐ **Answered in part 2026-10-21:** Simo Alaoui agreed to a public profile (`/authors/simo-alaoui`) and is credited as **reviewer** (not author) of all 31 device, player, IPTV and /help troubleshooting guides (owner instruction 2026-10-21; hub pages excluded). Still optional: a real photo and a profile link (e.g. LinkedIn). → `authors.ts` (`AUTHORS`, `GUIDE_REVIEWERS`)
71. **Operator vs older wording to fix:** with a New York LLC as operator, the DMCA counter-notice "consent to the jurisdiction of Canadian courts" (question 13) and the empty governing law in the Terms are now the most visible inconsistencies. The privacy policy's "may be stored in the United Kingdom" (question 47) also needs checking.
