
export const SITE_URL = "https://www.tryiptv.com";

/**
 * Single source of truth for every product fact the site states (prices, catalogue size,
 * connections, trial, delivery, refunds, support). Pages, structured data and the facts
 * check (`npm run check:facts`, which also covers public/llms*.txt and ai.txt) read from here;
 * change a fact here first, then fix anything the check reports.
 */
export const PRODUCT_TRUTHS = {
  brand: "TryIPTV",
  domain: SITE_URL,
  channels: "25,000+",
  vod: "120,000+",
  connections: 2,
  trialDuration: "24 Hours",
  trialCost: "$0 (Free, no credit card required)",
  /** The trial includes the same connections as a paid plan (owner-confirmed 2026-10-21). */
  trialConnections: "2 simultaneous connections, same as paid plans",
  activationTime: "5–15 minutes",
  /** Owner-confirmed 2026-10-21: support runs 9:00 AM–10:00 PM ET daily; requests outside those hours are queued until support reopens. */
  activationHours: "during support hours (9:00 AM–10:00 PM ET); requests sent outside those hours are answered when support reopens",
  billing: "Fixed-term plans, no automatic renewal",
  /** Owner-confirmed 2026-10-27: when a trial or plan ends, streaming stops immediately, nothing is billed, and a new plan can be bought at any time on WhatsApp. */
  expiry: {
    summary: "When a trial or plan ends, streaming stops immediately and nothing is billed.",
    nextStep: "You can buy a new plan at any time on WhatsApp.",
  },
  /** Owner-confirmed 2026-10-27: the subscription works abroad over the internet, within the connection limit. */
  travel: "works abroad over the internet, within your simultaneous-connection limit",
  /**
   * Owner-confirmed 2026-10-24: PPV events, catch-up TV and the USA/UK market are true claims.
   * Shown on the homepage hero and the plan cards (HomePricing.tsx, pricing/page.tsx); do not flag or remove them.
   */
  ppvEvents: "Pay-Per-View (PPV) events included",
  catchUpTv: "Catch-up TV with the Smart EPG (TV guide)",
  markets: "USA, UK and more",
  /** Mirrors /refund-policy (owner-supplied 2026-10-20). Not an unconditional money-back guarantee. */
  refund: {
    /** No fixed refund window: refunds only when a working subscription can't be provided. */
    windowDays: null as number | null,
    summary:
      "Once your subscription is activated and your account details are delivered, all sales are final. A refund is only issued if TryIPTV cannot provide a working subscription, for example if your account is not delivered or the service does not start at all.",
    exclusions: "Refunds are not given for internet issues, device or player incompatibility, or channel changes.",
  },
  support: {
    email: "support@tryiptv.com",
    whatsapp: "+212694833293",
  },
  paymentMethods: [
    "Cryptocurrency",
    "PayPal",
    "Stripe",
  ] as const,
  plans: [
    { duration: "1 Month", price: 15.82, monthlyEquivalent: 15.82 },
    { duration: "3 Months", price: 38.30, monthlyEquivalent: 12.77 },
    { duration: "6 Months", price: 59.15, monthlyEquivalent: 9.86 },
    { duration: "12 Months", price: 88.23, monthlyEquivalent: 7.35 },
  ],
} as const;

const usd = (n: number) => `$${Number.isInteger(n) ? n : n.toFixed(2)}`;

/** Ready-made phrases built from PRODUCT_TRUTHS, for copy that states prices or limits. */
export const FACT_TEXT = {
  /** "$15.82 for 1 month, $38.30 for 3 months, $59.15 for 6 months, or $88.23 for 12 months" */
  priceList: PRODUCT_TRUTHS.plans
    .map((p, i, all) => `${i === all.length - 1 ? "or " : ""}${usd(p.price)} for ${p.duration.toLowerCase()}`)
    .join(", "),
  fromPrice: usd(Math.min(...PRODUCT_TRUTHS.plans.map((p) => p.price))),
  lowestMonthly: usd(Math.min(...PRODUCT_TRUTHS.plans.map((p) => p.monthlyEquivalent))),
  trialHours: parseInt(PRODUCT_TRUTHS.trialDuration, 10),
} as const;

export const siteConfig = {
  name: "TryIPTV",
  url: SITE_URL,
  ogImage: "/api/og",
  // Canonical two-sentence brand description (reused by BRAND in site-data/brand.ts, schema, manifest, llms.txt).
  description: `TryIPTV is an IPTV service with ${PRODUCT_TRUTHS.channels} live channels and ${PRODUCT_TRUTHS.vod} movies and TV shows, watched on your own devices through compatible IPTV player apps. Plans cost ${FACT_TEXT.fromPrice} for 1 month, or about ${FACT_TEXT.lowestMonthly} a month on the 12-month plan, with ${PRODUCT_TRUTHS.connections} connections, no automatic renewal and a 24-hour free trial.`,
  links: {
    email: "support@tryiptv.com",
    whatsapp: "+212694833293",
  },
} as const;

export type SiteConfig = typeof siteConfig;

// Google-specific preview limits for indexable pages. Page metadata replaces the layout's
// `robots` object as a whole, so every indexable page has to carry these again.
export const GOOGLEBOT_PREVIEW = {
  index: true,
  follow: true,
  'max-video-preview': -1,
  'max-image-preview': 'large',
  'max-snippet': -1,
} as const;

// Helper for generating page-specific metadata
export function generateMetadata({
  title,
  description,
  image,
  noIndex = false,
  canonical,
}: {
  title: string;
  description: string;
  image?: string;
  noIndex?: boolean;
  canonical?: string;
}) {
  const ogImageUrl = image || `${siteConfig.url}${siteConfig.ogImage}?title=${encodeURIComponent(title)}`;
  const canonicalUrl = canonical ? `${siteConfig.url}${canonical}` : undefined;
  
  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    // Page-level openGraph replaces the layout's object rather than merging
    // with it, so repeat the type and locale here or they are dropped.
    openGraph: {
      type: 'website' as const,
      locale: 'en_US',
      title,
      description,
      url: canonicalUrl || siteConfig.url,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      // The owner-confirmed X account (site-data/socials.ts).
      site: '@tryiptv',
      title,
      description,
      images: [ogImageUrl],
    },
    robots: noIndex
      ? { index: false, follow: true }
      : { index: true, follow: true, googleBot: GOOGLEBOT_PREVIEW },
  };
}
