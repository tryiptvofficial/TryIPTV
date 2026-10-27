import { getUrlInventory } from '@/lib/search-discovery';

// Built once at build time from the same inventory as sitemap.xml.
export const dynamic = 'force-static';

/** Plain-text sitemap: one canonical URL per line. */
export function GET() {
  const body = getUrlInventory().map((entry) => entry.url).join('\n');
  return new Response(`${body}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
  });
}
