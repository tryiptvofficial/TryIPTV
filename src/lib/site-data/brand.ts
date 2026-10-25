/**
 * Brand identity: one name, tagline, description and logo set used everywhere (pages, schema,
 * manifest, llms.txt/ai.txt, press page, social and directory profiles). Bing §16: "Use clear and
 * consistent naming … Clear entity definition improves grounding visibility and citation accuracy."
 *
 * Copy the same strings into every external profile (social bios, directories, review platforms),
 * see seo/social/profiles.md. Change them here first.
 */
import { siteConfig } from "../site-config";

export const BRAND = {
  /** The only spelling used in text. */
  name: "TryIPTV",
  /** The logo wordmark reads "Try IPTV"; declared as an alternate name so both resolve to one entity. */
  alternateName: "Try IPTV",
  /** WebSite/Organization alternateName list, most important first (Google site-names doc). */
  alternateNames: ["Try IPTV", "TryIPTV.com"],
  /** 6 words, factual (no "best", "#1" or "premium"). */
  tagline: "IPTV service with a 24-hour free trial",
  /** One sentence for bios with tight limits (≤160 chars): X, Instagram, directories. */
  shortDescription: "IPTV service: live TV and on-demand video on your own devices and player apps. No auto-renewal, 24-hour free trial.",
  /** Two sentences for About sections, schema, manifest and llms.txt. */
  description: siteConfig.description,
  url: "https://www.tryiptv.com",
  logos: {
    /** Primary logo with wordmark, 1024×1024 PNG (used in Organization schema). */
    primary: "/logo.png",
    /** Symbol only, 1024×1024 PNG (avatars, favicons, small placements). */
    symbol: "/brand-logo-square.png",
    /** App icon, 512×512 PNG. */
    icon: "/icon-512.png",
  },
  colors: {
    primary: "#00F078",
    background: "#040506",
  },
} as const;
