import { LICENSING_CONFIRMED } from './site-data/company.ts';
import { AUTHORS } from './site-data/authors.ts';
/**
 * @file site-routes.ts
 * @description Single source of truth for TryIPTV's approved SEO URL architecture.
 *
 * RULES:
 * 1. Only approved canonical URLs appear here.
 * 2. `indexable: true` means the page has real content and must appear in sitemap.xml.
 * 3. `indexable: false` means the page exists but is noindex (content not yet ready).
 *    Noindex pages MUST NOT appear in sitemap.xml.
 * 4. Technical routes (API, OG, sitemap, robots) are NOT listed here.
 * 5. Update `lastModified` (YYYY-MM-DD) only when meaningful page content changes.
 *
 * DEVELOPER WORKFLOW:
 * - Adding a new approved URL: add an entry here first.
 * - Making a noindex page indexable: set `indexable: true` and set `lastModified`.
 * - Removing a URL: remove the entry and add a redirect in next.config.js.
 * - The sitemap (src/app/sitemap.ts) derives from this file. robots.txt is served by
 *   src/app/robots.txt/route.ts, which does not read this file (its crawler groups are edited there).
 */

export type RouteSection =
  | 'commercial'
  | 'devices'
  | 'players'
  | 'guides'
  | 'help'
  | 'legal'
  | 'utility';

export interface SiteRoute {
  /** Canonical path, e.g. "/devices/firestick-iptv" */
  path: string;
  section: RouteSection;
  /**
   * true  = page has real indexable content → included in sitemap.xml
   * false = page exists but is noindex (content pending) → excluded from sitemap
   */
  indexable: boolean;
  /** ISO date string YYYY-MM-DD. Required when indexable: true. */
  lastModified?: string;
}

export const SITE_ROUTES: SiteRoute[] = [
  // ── Commercial ───────────────────────────────────────────────────────────────
  { path: '/',                  section: 'commercial', indexable: true,  lastModified: '2026-10-26' },
  { path: '/pricing',           section: 'commercial', indexable: true,  lastModified: '2026-10-26' },
  { path: '/iptv-free-trial',   section: 'commercial', indexable: true,  lastModified: '2026-10-23' },
  { path: '/setup',             section: 'commercial', indexable: true,  lastModified: '2026-10-23' },

  // ── Devices hub + device pages ────────────────────────────────────────────
  { path: '/devices',                section: 'devices', indexable: true,  lastModified: '2026-10-04' },
  { path: '/devices/firestick-iptv',  section: 'devices', indexable: true,  lastModified: '2026-10-20' },
  { path: '/devices/android-tv-iptv', section: 'devices', indexable: true,  lastModified: '2026-10-11' },
  { path: '/devices/samsung-tv-iptv', section: 'devices', indexable: true,  lastModified: '2026-10-07' },
  { path: '/devices/lg-tv-iptv',      section: 'devices', indexable: true,  lastModified: '2026-10-04' },
  { path: '/devices/apple-tv-iptv',   section: 'devices', indexable: true,  lastModified: '2026-10-04' },
  { path: '/devices/chromecast-iptv', section: 'devices', indexable: true,  lastModified: '2026-10-04' },
  { path: '/devices/mag-box-iptv',    section: 'devices', indexable: true,  lastModified: '2026-10-07' },
  { path: '/devices/roku-iptv',       section: 'devices', indexable: true,  lastModified: '2026-10-20' },
  { path: '/devices/windows-iptv',    section: 'devices', indexable: true,  lastModified: '2026-10-11' },
  { path: '/devices/iphone-iptv',     section: 'devices', indexable: true,  lastModified: '2026-10-20' },
  { path: '/devices/mac-iptv',        section: 'devices', indexable: true,  lastModified: '2026-10-04' },

  // ── Players hub + player pages ────────────────────────────────────────────
  { path: '/players',                section: 'players', indexable: true,  lastModified: '2026-10-21' },
  { path: '/players/iptv-smarters',  section: 'players', indexable: true,  lastModified: '2026-10-20' },
  { path: '/players/tivimate',       section: 'players', indexable: true,  lastModified: '2026-10-20' },
  { path: '/players/xciptv',         section: 'players', indexable: true,  lastModified: '2026-10-22' },
  { path: '/players/televizo',       section: 'players', indexable: true,  lastModified: '2026-10-08' },
  { path: '/players/perfect-player', section: 'players', indexable: true,  lastModified: '2026-10-08' },
  { path: '/players/ott-navigator',  section: 'players', indexable: true,  lastModified: '2026-10-08' },
  { path: '/players/iptv-extreme',   section: 'players', indexable: true,  lastModified: '2026-10-22' },

  // ── Guides hub + guide pages ──────────────────────────────────────────────
  { path: '/guides',                     section: 'guides', indexable: true,  lastModified: '2026-10-21' },
  { path: '/guides/what-is-iptv',        section: 'guides', indexable: true,  lastModified: '2026-10-20' },
  { path: '/guides/how-does-iptv-work',  section: 'guides', indexable: true,  lastModified: '2026-10-20' },
  { path: '/guides/what-is-m3u',         section: 'guides', indexable: true,  lastModified: '2026-10-20' },
  { path: '/guides/what-are-xtream-codes',section: 'guides', indexable: true,  lastModified: '2026-10-20' },
  { path: '/guides/m3u-vs-xtream-codes', section: 'guides', indexable: true,  lastModified: '2026-10-20' },
  { path: '/guides/what-is-epg',         section: 'guides', indexable: true,  lastModified: '2026-10-20' },
  { path: '/guides/iptv-internet-speed', section: 'guides', indexable: true,  lastModified: '2026-10-20' },
  { path: '/guides/iptv-vs-cable',       section: 'guides', indexable: true,  lastModified: '2026-10-22' },

  // ── Help hub + help pages ─────────────────────────────────────────────────
  { path: '/help',                        section: 'help', indexable: true,  lastModified: '2026-10-23' },
  { path: '/help/iptv-buffering',         section: 'help', indexable: true,  lastModified: '2026-10-20' },
  { path: '/help/iptv-not-working',       section: 'help', indexable: true,  lastModified: '2026-10-20' },
  { path: '/help/iptv-login-not-working', section: 'help', indexable: true,  lastModified: '2026-10-20' },
  { path: '/help/m3u-not-loading',        section: 'help', indexable: true,  lastModified: '2026-10-05' },
  { path: '/help/epg-not-working',        section: 'help', indexable: true,  lastModified: '2026-10-06' },

  // ── Utility ───────────────────────────────────────────────────────────────
  { path: '/about',      section: 'utility', indexable: true, lastModified: '2026-10-23' },
  { path: '/faq',        section: 'utility', indexable: true, lastModified: '2026-10-23' },
  { path: '/contact-us', section: 'utility', indexable: true, lastModified: '2026-10-23' },
  { path: '/blog',       section: 'utility', indexable: false },

  // ── Legal ─────────────────────────────────────────────────────────────────
  { path: '/privacy-policy',  section: 'legal', indexable: true, lastModified: '2026-10-21' },
  { path: '/terms-conditions',section: 'legal', indexable: true, lastModified: '2026-10-23' },
  { path: '/refund-policy',   section: 'legal', indexable: true, lastModified: '2026-10-23' },
  { path: '/disclaimer',      section: 'legal', indexable: true, lastModified: '2026-10-23' },
  { path: '/dmca-report',     section: 'legal', indexable: true, lastModified: '2026-10-23' },
  { path: '/press', section: 'utility', indexable: true, lastModified: '2026-10-23' },
  // Owner-confirmed trust pages: indexable (and in the sitemap) only once a statement is confirmed.
  { path: '/content-licensing', section: 'legal', indexable: LICENSING_CONFIRMED, lastModified: '2026-10-20' },
  // Author profiles exist only for confirmed authors (src/lib/site-data/authors.ts).
  ...AUTHORS.map((a) => ({ path: `/authors/${a.slug}`, section: 'utility' as const, indexable: true, lastModified: a.updated })),
];

/**
 * The one update date for a route: sitemap <lastmod>, Article dateModified, the visible "Updated" date and the
 * RSS/Atom feeds all read it, so they cannot disagree. Throws at build time if a route has no date.
 */
export function getLastModified(path: string): string {
  const date = SITE_ROUTES.find((r) => r.path === path)?.lastModified;
  if (!date) throw new Error(`site-routes.ts has no lastModified for ${path}`);
  return date;
}

/** All indexable routes that should appear in sitemap.xml */
export const INDEXABLE_ROUTES = SITE_ROUTES.filter((r) => r.indexable);

/** All routes regardless of indexability (for completeness checks) */
export const ALL_APPROVED_PATHS = SITE_ROUTES.map((r) => r.path);
