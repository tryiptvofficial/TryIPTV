/**
 * Guide authors and reviewers. ONLY real people who agreed to be named, with true details (Google's helpful-content
 * guide: fabricated creator profiles are "a form of deception"; QRG §4.5.3 rates them Lowest).
 * Until an author is added here, guides are credited to the TryIPTV team (an organisation byline),
 * and no /authors/* page exists in production.
 */
export interface Author {
  slug: string;
  name: string;
  role: string;
  /** 2–4 sentences: real experience with IPTV, devices or support. */
  bio: string;
  expertise: string[];
  /** Real photo path under /public, or omit (never a stock or AI image). */
  image?: string;
  /** Public profiles that identify the person (LinkedIn, X, YouTube…). */
  sameAs?: string[];
  /** Year they started writing/reviewing for TryIPTV. */
  since?: string;
  updated: string;
}

export const AUTHORS: Author[] = [
  {
    // Owner-confirmed 2026-10-21. No expertise, credentials, photo or profile links were supplied, so none are listed.
    slug: "simo-alaoui",
    name: "Simo Alaoui",
    role: "Founder / Operations",
    bio: "Simo Alaoui oversees TryIPTV's operations, customer experience and service development.",
    expertise: [],
    // Owner-confirmed 2026-10-28: real public GitHub profile.
    sameAs: ["https://github.com/Simo-Alaoui"],
    updated: "2026-10-23",
  },
];

/** Who WROTE each guide, by path, e.g. { "/devices/firestick-iptv": "jane-doe" }. Shown as "By …". */
export const GUIDE_AUTHORS: Record<string, string> = {};

/** Who REVIEWED each guide (did not necessarily write it). Shown as "Reviewed by …"; schema `reviewedBy`. */
export const GUIDE_REVIEWERS: Record<string, string> = {
  // Owner-confirmed 2026-10-21: Simo Alaoui reviewed every device, player, IPTV and troubleshooting guide (hub pages excluded).
  // Device setup guides
  "/devices/firestick-iptv": "simo-alaoui",
  "/devices/android-tv-iptv": "simo-alaoui",
  "/devices/samsung-tv-iptv": "simo-alaoui",
  "/devices/lg-tv-iptv": "simo-alaoui",
  "/devices/apple-tv-iptv": "simo-alaoui",
  "/devices/chromecast-iptv": "simo-alaoui",
  "/devices/mag-box-iptv": "simo-alaoui",
  "/devices/roku-iptv": "simo-alaoui",
  "/devices/windows-iptv": "simo-alaoui",
  "/devices/iphone-iptv": "simo-alaoui",
  "/devices/mac-iptv": "simo-alaoui",
  // Player guides
  "/players/iptv-smarters": "simo-alaoui",
  "/players/tivimate": "simo-alaoui",
  "/players/xciptv": "simo-alaoui",
  "/players/televizo": "simo-alaoui",
  "/players/perfect-player": "simo-alaoui",
  "/players/ott-navigator": "simo-alaoui",
  "/players/iptv-extreme": "simo-alaoui",
  // IPTV guides
  "/guides/what-is-iptv": "simo-alaoui",
  "/guides/how-does-iptv-work": "simo-alaoui",
  "/guides/what-is-m3u": "simo-alaoui",
  "/guides/what-are-xtream-codes": "simo-alaoui",
  "/guides/m3u-vs-xtream-codes": "simo-alaoui",
  "/guides/what-is-epg": "simo-alaoui",
  "/guides/iptv-internet-speed": "simo-alaoui",
  "/guides/iptv-vs-cable": "simo-alaoui",
  // Troubleshooting guides (added 2026-10-21 at the owner's request)
  "/help/iptv-not-working": "simo-alaoui",
  "/help/iptv-buffering": "simo-alaoui",
  "/help/iptv-login-not-working": "simo-alaoui",
  "/help/m3u-not-loading": "simo-alaoui",
  "/help/epg-not-working": "simo-alaoui",
  "/help/iptv-error-codes": "simo-alaoui",
};

/** Link text for guides listed on author pages: each page's own title, without the brand suffix. */
export const GUIDE_TITLES: Record<string, string> = {
  "/devices/firestick-iptv": "How to Install IPTV on Firestick (2026 Guide)",
  "/devices/android-tv-iptv": "IPTV on Android TV: Apps & Setup Guide (2026)",
  "/devices/samsung-tv-iptv": "How to Install IPTV on Samsung Smart TV (Tizen)",
  "/devices/lg-tv-iptv": "How to Install IPTV on LG Smart TV (webOS)",
  "/devices/apple-tv-iptv": "How to Set Up IPTV on Apple TV (tvOS Guide)",
  "/devices/chromecast-iptv": "How to Watch IPTV on Chromecast & Google TV",
  "/devices/mag-box-iptv": "MAG Box IPTV Setup: Stalker Portal Guide",
  "/devices/roku-iptv": "How to Watch IPTV on Roku: AirPlay & Mirroring",
  "/devices/windows-iptv": "IPTV on Windows: Players & PC Setup Guide",
  "/devices/iphone-iptv": "IPTV on iPhone & iPad: App Store Setup Guide",
  "/devices/mac-iptv": "How to Set Up IPTV on a Mac (macOS Guide)",
  "/players/iptv-smarters": "IPTV Smarters Pro Setup Guide: Xtream Codes & M3U Login",
  "/players/tivimate": "TiviMate Setup Guide: M3U, Xtream Codes & EPG on Fire TV",
  "/players/xciptv": "XCIPTV Player Guide: App Availability, Setup & Features",
  "/players/televizo": "Televizo IPTV Player Setup Guide: M3U & Xtream Codes",
  "/players/perfect-player": "Perfect Player IPTV: Legacy Setup, EPG & Migration",
  "/players/ott-navigator": "OTT Navigator IPTV Setup Guide: M3U, Xtream Codes & Fixes",
  "/players/iptv-extreme": "IPTV Extreme Setup Guide: M3U, Xtream Codes & MAG/Stalker",
  "/guides/what-is-iptv": "What Is IPTV? A Beginner's Guide to Internet TV",
  "/guides/how-does-iptv-work": "How Does IPTV Work? From Server to Screen",
  "/guides/what-is-m3u": "What Is an M3U Playlist? Structure, Syntax, and IPTV Usage",
  "/guides/what-are-xtream-codes": "What Are Xtream Codes? The IPTV API Login Format Explained",
  "/guides/m3u-vs-xtream-codes": "M3U vs Xtream Codes: What's the Difference for IPTV?",
  "/guides/what-is-epg": "What Is an EPG? How IPTV TV Guides and XMLTV Data Work",
  "/guides/iptv-internet-speed": "IPTV Internet Speed: How Much Bandwidth Do You Need?",
  "/guides/iptv-vs-cable": "IPTV vs Cable TV: Cost, Setup & Reliability",
  "/help/iptv-not-working": "IPTV Not Working? Start With This Troubleshooting Checklist",
  "/help/iptv-buffering": "How to Fix IPTV Buffering: A Practical Diagnostic Guide",
  "/help/iptv-login-not-working": "IPTV Login Not Working? Diagnose Authentication Errors",
  "/help/m3u-not-loading": "M3U Playlist Not Loading? How to Diagnose and Fix It",
  "/help/epg-not-working": "EPG Not Working? Fix Missing or Wrong IPTV Guide Data",
  "/help/iptv-error-codes": "IPTV Error Codes Explained",
};

/** Stable schema.org @id for a person, so Article, Organization and ProfilePage point to one entity. */
export const personId = (baseUrl: string, slug: string) => `${baseUrl}/authors/${slug}#person`;

export function getAuthorForPath(path: string): Author | undefined {
  const slug = GUIDE_AUTHORS[path];
  return slug ? AUTHORS.find((a) => a.slug === slug) : undefined;
}

export function getReviewerForPath(path: string): Author | undefined {
  const slug = GUIDE_REVIEWERS[path];
  return slug ? AUTHORS.find((a) => a.slug === slug) : undefined;
}
