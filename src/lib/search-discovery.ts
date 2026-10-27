import type { Metadata } from 'next';
import { SITE_URL, siteConfig } from './site-config';
import { INDEXABLE_ROUTES, type RouteSection, type SiteRoute } from './site-routes';

/**
 * Discovery formats (sitemap.xml, sitemap.txt, feed.xml, atom.xml) all read this module, which reads
 * the route registry (site-routes.ts). No format keeps its own URL list.
 *
 * - URL inventory: every indexable route, with its real lastModified date.
 * - Feeds: the editorial subset (device, player, guide and help articles, not hubs, legal or
 *   commercial pages). Titles and descriptions come from each page's own generateMetadata(), so a feed
 *   item always says what the page itself says. Dates are lastModified: the registry records when a
 *   page last changed meaningfully, not when it was first published, so no publication date is invented.
 */

/** Absolute canonical URL for a registry path (the homepage is the bare origin, as in the canonical tag). */
export function toCanonicalUrl(path: string): string {
  return path === '/' ? SITE_URL : `${SITE_URL}${path}`;
}

export interface UrlEntry {
  path: string;
  url: string;
  /** YYYY-MM-DD from site-routes.ts, if recorded. */
  lastModified?: string;
}

/** Every canonical, indexable URL, in registry order. Shared by sitemap.xml and sitemap.txt. */
export function getUrlInventory(): UrlEntry[] {
  return INDEXABLE_ROUTES.map((route) => ({
    path: route.path,
    url: toCanonicalUrl(route.path),
    lastModified: route.lastModified,
  }));
}

const FEED_SECTIONS: RouteSection[] = ['devices', 'players', 'guides', 'help'];

/** Article pages only: hubs such as /guides are listings, not content updates. */
const isFeedRoute = (route: SiteRoute): route is SiteRoute & { lastModified: string } =>
  FEED_SECTIONS.includes(route.section) && route.path.split('/').length > 2 && Boolean(route.lastModified);

export interface FeedItem {
  url: string;
  title: string;
  description: string;
  /** YYYY-MM-DD: the page's last meaningful update. */
  updated: string;
}

type MetadataModule = { generateMetadata: (props?: unknown) => Metadata | Promise<Metadata> };

/** Loads the page module for a path; device pages share the [device] route. */
async function loadPageMetadata(path: string): Promise<Metadata> {
  const [, section, slug] = path.split('/');
  if (section === 'devices') {
    const mod = (await import('@/app/devices/[device]/page')) as MetadataModule;
    return mod.generateMetadata({ params: Promise.resolve({ device: slug }) });
  }
  const mod = (await import(`@/app/${section}/${slug}/page`)) as MetadataModule;
  return mod.generateMetadata();
}

const brandSuffix = new RegExp(`\\s*\\|\\s*${siteConfig.name}$`);

function titleOf(metadata: Metadata): string | undefined {
  const t = metadata.title;
  const raw = typeof t === 'string' ? t : t && 'absolute' in t ? t.absolute : t && 'default' in t ? t.default : undefined;
  return raw?.replace(brandSuffix, '').trim() || undefined;
}

/** Editorial feed items, newest update first (ties: registry order). */
export async function getFeedItems(): Promise<FeedItem[]> {
  const routes = INDEXABLE_ROUTES.filter(isFeedRoute);
  const items = await Promise.all(
    routes.map(async (route) => {
      const metadata = await loadPageMetadata(route.path);
      const title = titleOf(metadata);
      const description = typeof metadata.description === 'string' ? metadata.description : undefined;
      if (!title || !description) throw new Error(`Feed: ${route.path} has no title or description in its metadata`);
      return { url: toCanonicalUrl(route.path), title, description, updated: route.lastModified };
    }),
  );
  return items.sort((a, b) => b.updated.localeCompare(a.updated));
}

/** Escapes text for XML element content and attribute values. */
export function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export const FEED_TITLE = siteConfig.name;
export const FEED_DESCRIPTION = `${siteConfig.name} guides, device setup, player information and help articles.`;
