
import rawArticles from '@/lib/site-data/how-to.json';
import { getLastModified } from '@/lib/site-routes';

// Device articles; dateModified comes from site-routes.ts, the single date source.
const articles = rawArticles.map((article) => ({ ...article, dateModified: getLastModified(`/devices/${article.id}`) }));

// Export the article data for use in server components
export const howToArticles = articles;

export const REDIRECTED_DEVICE_SLUGS: Record<string, string> = {
  // Legacy aliases (direct to new -iptv routes to prevent redirect chains)
  'fire-tv': 'firestick-iptv',
  'android': 'android-tv-iptv',
  'macos': 'mac-iptv',
  'mag': 'mag-box-iptv',
  // Old device routes to new SEO-friendly routes
  'firestick': 'firestick-iptv',
  'android-tv': 'android-tv-iptv',
  'samsung-tv': 'samsung-tv-iptv',
  'lg-tv': 'lg-tv-iptv',
  'apple-tv': 'apple-tv-iptv',
  'chromecast': 'chromecast-iptv',
  'mag-box': 'mag-box-iptv',
  'roku': 'roku-iptv',
  'windows': 'windows-iptv',
  'mac': 'mac-iptv',
};

export const getDeviceSlug = (id: string): string => {
  return REDIRECTED_DEVICE_SLUGS[id] || id;
};

export const isRedirectedDevice = (id: string): boolean => {
  return id in REDIRECTED_DEVICE_SLUGS;
};

// A lightweight, dependency-free function to get article data for client/edge use.
// This function does NOT include the processed image blur data.
export const getSafeArticleData = (deviceId: string) => {
    const canonicalId = REDIRECTED_DEVICE_SLUGS[deviceId] || deviceId;
    return articles.find((p) => p.id === canonicalId || p.id === deviceId);
}
