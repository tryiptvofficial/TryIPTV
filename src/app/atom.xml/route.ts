import { SITE_URL } from '@/lib/site-config';
import { FEED_DESCRIPTION, FEED_TITLE, escapeXml, getFeedItems } from '@/lib/search-discovery';

// Built once at build time; no per-request work.
export const dynamic = 'force-static';

/** RFC 3339 timestamp for a YYYY-MM-DD update date (Atom needs a time of day; midnight UTC is used). */
const atomDate = (day: string) => `${day}T00:00:00Z`;

/**
 * Atom 1.0 feed with the same entries as feed.xml. Each <updated> is the page's lastModified date from
 * site-routes.ts (an update date, not a publication date); the feed's <updated> is its newest entry's date.
 */
export async function GET() {
  const items = await getFeedItems();
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<feed xmlns="http://www.w3.org/2005/Atom">',
    `  <title>${escapeXml(FEED_TITLE)}</title>`,
    `  <subtitle>${escapeXml(FEED_DESCRIPTION)}</subtitle>`,
    `  <id>${escapeXml(`${SITE_URL}/`)}</id>`,
    `  <link href="${escapeXml(`${SITE_URL}/atom.xml`)}" rel="self" type="application/atom+xml"/>`,
    `  <link href="${escapeXml(`${SITE_URL}/`)}" rel="alternate" type="text/html"/>`,
    ...(items[0] ? [`  <updated>${atomDate(items[0].updated)}</updated>`] : []),
    `  <author><name>${escapeXml(FEED_TITLE)}</name></author>`,
    ...items.flatMap((item) => [
      '  <entry>',
      `    <title>${escapeXml(item.title)}</title>`,
      `    <id>${escapeXml(item.url)}</id>`,
      `    <link href="${escapeXml(item.url)}"/>`,
      `    <updated>${atomDate(item.updated)}</updated>`,
      `    <summary>${escapeXml(item.description)}</summary>`,
      '  </entry>',
    ]),
    '</feed>',
  ].join('\n');

  return new Response(`${xml}\n`, {
    headers: { 'Content-Type': 'application/atom+xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
  });
}
