import { SITE_URL } from '@/lib/site-config';
import { FEED_DESCRIPTION, FEED_TITLE, escapeXml, getFeedItems } from '@/lib/search-discovery';

// Built once at build time; no per-request work.
export const dynamic = 'force-static';

/** RFC 822 date for a YYYY-MM-DD update date (RSS needs a time of day; midnight UTC is used). */
const rssDate = (day: string) => new Date(`${day}T00:00:00Z`).toUTCString();

/**
 * RSS 2.0 feed of the editorial pages, newest update first.
 * pubDate and lastBuildDate are the pages' lastModified dates from site-routes.ts: update dates, not claimed
 * original publication dates, and never the build or request time.
 */
export async function GET() {
  const items = await getFeedItems();
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '  <channel>',
    `    <title>${escapeXml(FEED_TITLE)}</title>`,
    `    <link>${escapeXml(`${SITE_URL}/`)}</link>`,
    `    <description>${escapeXml(FEED_DESCRIPTION)}</description>`,
    '    <language>en-US</language>',
    `    <atom:link href="${escapeXml(`${SITE_URL}/feed.xml`)}" rel="self" type="application/rss+xml"/>`,
    ...(items[0] ? [`    <lastBuildDate>${rssDate(items[0].updated)}</lastBuildDate>`] : []),
    ...items.flatMap((item) => [
      '    <item>',
      `      <title>${escapeXml(item.title)}</title>`,
      `      <link>${escapeXml(item.url)}</link>`,
      `      <guid isPermaLink="true">${escapeXml(item.url)}</guid>`,
      `      <description>${escapeXml(item.description)}</description>`,
      `      <pubDate>${rssDate(item.updated)}</pubDate>`,
      '    </item>',
    ]),
    '  </channel>',
    '</rss>',
  ].join('\n');

  return new Response(`${xml}\n`, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
  });
}
