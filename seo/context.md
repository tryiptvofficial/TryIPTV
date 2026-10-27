# SEO context

Last updated: 2026-10-14

## Site

- Site: https://www.tryiptv.com
- Framework: Next.js 16.4.0, App Router. Source: `package.json`.
- Canonical URL and global metadata: `src/lib/site-config.ts`.
- Approved URL architecture and sitemap inputs: `src/lib/site-routes.ts`.
- Production checks on 2026-10-14: `/`, `/pricing`, `/sitemap.xml`, and `/robots.txt` returned HTTP 200 via `curl -L`.

## Product

TryIPTV is an IPTV streaming service with fixed-term plans and no automatic renewal, for cord-cutters, sports fans, and international TV viewers using compatible TVs, streaming hardware, phones, and computers. Source: `PRODUCT.md`, `src/lib/site-config.ts`.

Documented product facts:

- 25,000+ live channels worldwide and 120,000+ movies and TV shows; 4K Ultra HD where available. Source: `PRODUCT.md`, `src/lib/site-config.ts`.
- 2 simultaneous connections included on every subscription plan. Source: `PRODUCT.md`, `src/lib/site-config.ts`.
- 24-hour free trial, $0, no credit card required. Source: `PRODUCT.md`, `src/lib/site-config.ts`.
- Plans (one-time payment): 1 month $15.82, 3 months $38.30, 6 months $59.15, 12 months $88.23; no automatic renewal. Source: `PRODUCT.md`, `src/lib/site-config.ts`.
- Payment methods: cryptocurrency, PayPal, Stripe. Source: `PRODUCT.md`, `src/lib/site-config.ts`.
- Credential delivery is typically 5–15 minutes by email and WhatsApp. Source: `PRODUCT.md`, `src/lib/site-config.ts`.
- Supported setup contexts include Fire TV, Android TV, Apple TV, Samsung/LG Smart TVs, MAG, Roku, Windows, macOS, iOS, Android, and IPTV player apps. Source: `PRODUCT.md`, `src/lib/site-routes.ts`, `src/app/devices/`, `src/app/players/`.

## Conversion

Primary conversion: request the 24-hour free trial. Secondary conversion: buy a plan. Source: `src/lib/data/iptv-free-trial-page.ts`, `src/app/pricing/`, `src/lib/site-config.ts`.

## Competitors / search landscape

Initial competitor set is provisional and must be verified before comparison copy is published. Search results reviewed 2026-10-14 for “best IPTV service 2026” and “TryIPTV alternatives” surfaced IPTV Map, Tashan TV, IPTV USA Official, IPTVUS.tv, and other provider/comparison sites. Sources: search results for `kodiapps.org/best-iptv/`, `iptvmap.com`, `tashantv.net`, `iptvservicereview.com`.

## Missing connected data

No Search Console, analytics, Ahrefs/DataForSEO, or AI answer tracker data was available in this setup run. Therefore volumes, positions, impressions, clicks, signups, and indexing status are not verified and are not guessed.

## Ship mode

Not provided by owner. Default for future runs: PR for review until explicitly changed.
