
/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: [
    'genkit',
    '@genkit-ai/core',
    '@genkit-ai/google-genai',
    '@opentelemetry/sdk-node',
  ],
  images: {
    formats: ['image/avif', 'image/webp'],
    // 480 added: ~417-455px-wide renders (e.g. customer screenshots on phones) were served 640px files.
    // (It belongs here, not in imageSizes, which must stay below the smallest device size.)
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1536],
    imageSizes: [32, 48, 64, 96, 128, 192, 256, 320],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images-cdn.ubuy.co.in',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'iptvwell.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'r2.thesportsdb.com',
        port: '',
        pathname: '/images/**',
      }
    ],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  trailingSlash: false,
  experimental: {
    optimizePackageImports: ['lucide-react', 'react-icons', 'framer-motion'],
    agentUpgrade: 'security',
  },
  async headers() {
    // CSP violation reports go to Sentry's security endpoint, built from the same public DSN as
    // sentry.server.config.ts (a DSN is a public client key). Review reports before enforcing the CSP.
    const SENTRY_DSN = 'https://2c6b3d1af5286155f96e3cc65959938f@o4512229364072448.ingest.us.sentry.io/4512229368266752';
    const dsn = new URL(SENTRY_DSN);
    const cspReportUrl = `https://${dsn.host}/api${dsn.pathname}/security/?sentry_key=${dsn.username}`;
    const cspReportOnlyHeader = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://analytics.ahrefs.com https://*.google-analytics.com https://challenges.cloudflare.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://www.google-analytics.com https://*.google-analytics.com https://*.googletagmanager.com",
      "font-src 'self' data:",
      "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://analytics.ahrefs.com https://*.ingest.us.sentry.io https://*.sentry.io",
      "frame-src https://challenges.cloudflare.com",
      "media-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'",
      `report-uri ${cspReportUrl}`,
      'report-to csp-endpoint',
      // upgrade-insecure-requests omitted: browsers ignore it in a Report-Only policy and log a console error.
    ].join('; ');

    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'Content-Security-Policy-Report-Only',
            value: cspReportOnlyHeader
          },
          {
            // Reporting API endpoint named by `report-to` in the CSP above.
            key: 'Reporting-Endpoints',
            value: `csp-endpoint="${cspReportUrl}"`
          },
        ],
      },

      // ── X-Robots-Tag ───────────────────────────────────────────────────────
      // Pages set indexing with <meta name="robots">; files have no <head>, so they need the header.
      // noindex keeps them out of search results without blocking the fetch (robots.txt still allows them).
      ...[
        '/:key([0-9a-f]{32}).txt', // IndexNow key files
        '/llms.txt',
        '/llms-full.txt',
        '/ai.txt',
        '/sitemap.xml',
        '/manifest.json',
        '/site.webmanifest',
        '/api/:path*', // includes /api/og share images
      ].map((source) => ({
        source,
        headers: [{ key: 'X-Robots-Tag', value: 'noindex' }],
      })),
      // Noindex pages: same directive as their meta robots tag, also visible to header-only checks.
      ...['/thank-you', '/blog'].map((source) => ({
        source,
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, follow' }],
      })),
      // Vercel deployment URLs (previews and the project's *.vercel.app alias) duplicate the site.
      // Listed last so it overrides the rules above on those hosts.
      {
        source: '/:path*',
        has: [{ type: 'host', value: '(?<subdomain>.+)\\.vercel\\.app' }],
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
    ]
  },
  async redirects() {
    return [
      // ── Domain canonicalization ────────────────────────────────────────────
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: '(?:www\\.)?iptvprovider\\.me',
          },
        ],
        destination: 'https://www.tryiptv.com/:path*',
        permanent: true,
      },

      // ── Commercial page redirects ──────────────────────────────────────────
      {
        source: '/checkout',
        destination: '/pricing',
        permanent: true,
      },
      {
        source: '/iptv-subscription',
        destination: '/pricing',
        permanent: true,
      },

      // ── Old device slug redirects (legacy aliases direct to new -iptv routes) ─
      {
        source: '/devices/fire-tv',
        destination: '/devices/firestick-iptv',
        permanent: true,
      },
      {
        source: '/devices/android',
        destination: '/devices/android-tv-iptv',
        permanent: true,
      },
      // Old iOS slugs → the iPhone & iPad guide (/devices/iphone-iptv), one 308 hop each.
      ...['/devices/iphone-ipad', '/devices/ios', '/devices/iphone', '/devices/ipad'].map((source) => ({
        source,
        destination: '/devices/iphone-iptv',
        permanent: true,
      })),
      {
        source: '/devices/macos',
        destination: '/devices/mac-iptv',
        permanent: true,
      },
      // /devices/mag → /devices/mag-box-iptv
      {
        source: '/devices/mag',
        destination: '/devices/mag-box-iptv',
        permanent: true,
      },

      // ── 10 Device slug migration redirects (old -> new SEO-friendly routes) ──
      {
        source: '/devices/firestick',
        destination: '/devices/firestick-iptv',
        permanent: true,
      },
      {
        source: '/devices/android-tv',
        destination: '/devices/android-tv-iptv',
        permanent: true,
      },
      {
        source: '/devices/samsung-tv',
        destination: '/devices/samsung-tv-iptv',
        permanent: true,
      },
      {
        source: '/devices/lg-tv',
        destination: '/devices/lg-tv-iptv',
        permanent: true,
      },
      {
        source: '/devices/apple-tv',
        destination: '/devices/apple-tv-iptv',
        permanent: true,
      },
      {
        source: '/devices/chromecast',
        destination: '/devices/chromecast-iptv',
        permanent: true,
      },
      {
        source: '/devices/mag-box',
        destination: '/devices/mag-box-iptv',
        permanent: true,
      },
      {
        source: '/devices/roku',
        destination: '/devices/roku-iptv',
        permanent: true,
      },
      {
        source: '/devices/windows',
        destination: '/devices/windows-iptv',
        permanent: true,
      },
      {
        source: '/devices/mac',
        destination: '/devices/mac-iptv',
        permanent: true,
      },

      // /devices/troubleshooting → closest approved equivalent is /help/iptv-buffering
      {
        source: '/devices/troubleshooting',
        destination: '/help/iptv-buffering',
        permanent: true,
      },

      // ── Removed utility page redirects ─────────────────────────────────────
      // /contact → /contact-us (slug rename to match approved allowlist)
      {
        source: '/contact',
        destination: '/contact-us',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
