/**
 * Topic map: pillars (hub pages) and their clusters, used for internal linking.
 * Rules (seo/topic-map.md): every cluster links to its pillar and 2–4 siblings; every pillar links to
 * all of its clusters; nothing deeper than 3 clicks from home. Only EXISTING pages belong here.
 * Planned pages live in seo/topic-map.md and are added here when they are published.
 */
export interface Cluster {
  path: string;
  /** Descriptive anchor text (the topic, not a keyword variant). */
  anchor: string;
  /** One line shown under the link. */
  blurb: string;
  /** 2–4 sibling paths in the same pillar (most related first). */
  siblings: string[];
}

export interface Pillar {
  path: string;
  anchor: string;
  clusters: Cluster[];
}

export const PILLARS: Pillar[] = [
  {
    path: "/players",
    anchor: "IPTV player apps",
    clusters: [
      { path: "/players/tivimate", anchor: "TiviMate setup guide", blurb: "TV-first player for Android TV, Google TV and Fire TV.", siblings: ["/players/iptv-smarters", "/players/ott-navigator", "/players/televizo"] },
      { path: "/players/iptv-smarters", anchor: "IPTV Smarters Pro setup guide", blurb: "Multi-platform player: Fire TV, Android, iPhone, Apple TV, Windows.", siblings: ["/players/tivimate", "/players/xciptv", "/players/iptv-extreme"] },
      { path: "/players/xciptv", anchor: "XCIPTV Player guide", blurb: "Xtream-focused Android player with ExoPlayer and VLC engines.", siblings: ["/players/iptv-smarters", "/players/ott-navigator", "/players/televizo"] },
      { path: "/players/televizo", anchor: "Televizo setup guide", blurb: "Lightweight Android player for M3U and Xtream Codes.", siblings: ["/players/ott-navigator", "/players/tivimate", "/players/xciptv", "/players/perfect-player"] },
      { path: "/players/ott-navigator", anchor: "OTT Navigator setup guide", blurb: "Android player with detailed EPG and connection checks.", siblings: ["/players/televizo", "/players/tivimate", "/players/iptv-extreme", "/players/perfect-player"] },
      { path: "/players/iptv-extreme", anchor: "IPTV Extreme setup guide", blurb: "Android playlist player with M3U, Xtream Codes and Stalker support.", siblings: ["/players/perfect-player", "/players/ott-navigator", "/players/iptv-smarters"] },
      { path: "/players/perfect-player", anchor: "Perfect Player guide and migration", blurb: "Legacy Android player: setup, EPG and moving to a maintained app.", siblings: ["/players/iptv-extreme", "/players/tivimate", "/players/televizo"] },
    ],
  },
  {
    path: "/guides",
    anchor: "IPTV guides and glossary",
    clusters: [
      { path: "/guides/what-is-iptv", anchor: "What is IPTV?", blurb: "Definition, what you need, and when IPTV is legal.", siblings: ["/guides/how-does-iptv-work", "/guides/iptv-vs-cable", "/guides/iptv-internet-speed"] },
      { path: "/guides/how-does-iptv-work", anchor: "How IPTV works", blurb: "From the provider's servers to the player on your screen.", siblings: ["/guides/what-is-iptv", "/guides/what-is-m3u", "/guides/what-is-epg"] },
      { path: "/guides/what-is-m3u", anchor: "What is an M3U playlist?", blurb: "Playlist structure, #EXTINF tags and M3U vs M3U8.", siblings: ["/guides/what-are-xtream-codes", "/guides/m3u-vs-xtream-codes", "/guides/what-is-epg"] },
      { path: "/guides/what-are-xtream-codes", anchor: "What are Xtream Codes?", blurb: "The server URL, username and password login format.", siblings: ["/guides/what-is-m3u", "/guides/m3u-vs-xtream-codes", "/guides/how-does-iptv-work"] },
      { path: "/guides/m3u-vs-xtream-codes", anchor: "M3U vs Xtream Codes", blurb: "Which login format to choose, compared side by side.", siblings: ["/guides/what-is-m3u", "/guides/what-are-xtream-codes", "/guides/what-is-epg"] },
      { path: "/guides/what-is-epg", anchor: "What is an EPG?", blurb: "How IPTV TV guides and XMLTV data work.", siblings: ["/guides/what-is-m3u", "/guides/m3u-vs-xtream-codes", "/guides/how-does-iptv-work"] },
      { path: "/guides/iptv-internet-speed", anchor: "IPTV internet speed", blurb: "Mbps per stream, data per hour and Wi-Fi vs Ethernet.", siblings: ["/guides/how-does-iptv-work", "/guides/iptv-vs-cable", "/guides/what-is-iptv"] },
      { path: "/guides/iptv-connections", anchor: "IPTV connections", blurb: "What counts as a stream and how many devices can watch at once.", siblings: ["/guides/iptv-internet-speed", "/guides/how-does-iptv-work", "/guides/what-is-iptv"] },
      { path: "/guides/iptv-vs-cable", anchor: "IPTV vs cable TV", blurb: "Cost, equipment, reliability and flexibility compared.", siblings: ["/guides/what-is-iptv", "/guides/iptv-internet-speed", "/guides/how-does-iptv-work"] },
    ],
  },
  {
    path: "/help",
    anchor: "IPTV troubleshooting",
    clusters: [
      { path: "/help/iptv-not-working", anchor: "IPTV not working checklist", blurb: "Match the symptom to the right fix in two minutes.", siblings: ["/help/iptv-buffering", "/help/iptv-login-not-working", "/help/m3u-not-loading"] },
      { path: "/help/iptv-buffering", anchor: "Fix IPTV buffering", blurb: "Network, device and stream causes, with fixes in order.", siblings: ["/help/iptv-not-working", "/help/epg-not-working", "/help/m3u-not-loading"] },
      { path: "/help/iptv-login-not-working", anchor: "IPTV login not working", blurb: "401/403 errors, wrong server URLs and connection limits.", siblings: ["/help/m3u-not-loading", "/help/iptv-not-working", "/help/iptv-buffering"] },
      { path: "/help/m3u-not-loading", anchor: "M3U playlist not loading", blurb: "Bad URLs, encoding, parser crashes and large playlists.", siblings: ["/help/iptv-login-not-working", "/help/epg-not-working", "/help/iptv-not-working"] },
      { path: "/help/epg-not-working", anchor: "EPG not working", blurb: "Missing guide data, wrong times and channel mapping.", siblings: ["/help/m3u-not-loading", "/help/iptv-buffering", "/help/iptv-not-working"] },
    ],
  },
];

export function findCluster(path: string): { pillar: Pillar; cluster: Cluster } | undefined {
  for (const pillar of PILLARS) {
    const cluster = pillar.clusters.find((c) => c.path === path);
    if (cluster) return { pillar, cluster };
  }
  return undefined;
}
