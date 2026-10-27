/**
 * @file page-modifications.ts
 * @description Legacy helper — retained only for formatLegalDate() used by legal pages.
 *
 * IMPORTANT: The canonical route registry is src/lib/site-routes.ts. Change dates there;
 * PAGE_LAST_MODIFIED below is derived from it.
 *
 * TRUTHFUL LASTMOD ARCHITECTURE RULES:
 * 1. A route's lastModified date MUST represent the date when meaningful, indexable
 *    content on that specific URL was actually updated.
 * 2. DO NOT update dates for technical/infrastructure refactors.
 * 3. NEVER use dynamic timestamps (new Date(), Date.now(), or CI/CD build times).
 *
 * All sitemap and SEO route data now lives in src/lib/site-routes.ts.
 */

import { SITE_ROUTES } from '../site-routes.ts';

/**
 * Last-modified dates (YYYY-MM-DD), read from the single route registry (site-routes.ts) so the
 * sitemap <lastmod> and the "Last updated" line on legal pages can never disagree.
 */
export const PAGE_LAST_MODIFIED: Record<string, string> = Object.fromEntries(
  SITE_ROUTES.filter((r) => r.lastModified).map((r) => [r.path, r.lastModified as string]),
);

/**
 * Formats a YYYY-MM-DD date string into a human-readable "Month YYYY" string
 * using UTC to prevent timezone boundary discrepancies.
 *
 * Example: "2026-03-01" -> "March 2026"
 */
export function formatLegalDate(dateString: string): string {
  const date = new Date(`${dateString}T00:00:00Z`);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
