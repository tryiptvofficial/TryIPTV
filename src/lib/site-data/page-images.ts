/**
 * Content images per page, emitted as <image:image> entries in the sitemap so Google Images can find
 * the guide screenshots. Only real content images: no decorative logo icons, and not the blurred
 * WhatsApp support screenshots on the homepage. Paths are public URLs (under /public).
 * Keep in sync when a page's screenshots change.
 */
export const PAGE_IMAGES: Record<string, string[]> = {
  '/': ['/images/best-iptv-service.png'],
  '/iptv-free-trial': ['/images/free-trial/how-to-get-iptv-free-trial-3-steps.webp'],
  '/devices/firestick-iptv': [
    '/images/firestick/settings-home.jpeg',
    '/images/firestick/my-fire-tv-developer-options.jpeg',
    '/images/firestick/about-device-name.jpeg',
    '/images/firestick/install-unknown-apps-downloader-on.jpeg',
  ],
  // TODO(owner): add your own TiviMate screenshots here. The six supplied with the install-iptv.com text
  // (tivimate-*.webp) were removed from the image sitemap on 2026-10-24 (copyright).
  '/players/tivimate': [
    '/images/tivimate/playlist-epg-settings.jpg',
  ],
  // TODO(owner): add your own IPTV Smarters screenshots here. The three supplied with the install-iptv.com
  // text (iptv-smarters-*.webp) were removed from the image sitemap on 2026-10-24 (copyright); the M3U
  // diagram stays because it was redrawn as an original.
  '/players/iptv-smarters': [
    '/images/iptv-smarters/m3u-link-server-url-username-password.webp',
  ],
  // Press kit downloads.
  '/press': [
    '/logo.png',
    '/icon-512.png',
    '/images/firestick/settings-home.jpeg',
    '/images/firestick/install-unknown-apps-downloader-on.jpeg',
    '/images/tivimate/xtream-codes-login.jpeg',
    '/images/tivimate/epg-tv-guide.webp',
  ],
};
