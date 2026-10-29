import type { Metadata } from "next";
import { TopicClusterLinks } from "@/components/shared/TopicClusterLinks";
import { GuideByline } from "@/components/shared/GuideByline";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FaqList } from "@/components/sections/FAQ";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { Container } from "@/components/shared/Container";
import { PageSchema } from "@/components/shared/Schema";
import { Section } from "@/components/shared/Section";
import { Button } from "@/components/ui/button";
import {
  ArticleProse,
  ArticleSummary,
} from "@/components/guide";
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
} from "@/lib/schema";
import { SITE_URL, generateMetadata as generatePageMetadata } from "@/lib/site-config";
import { getLastModified } from "@/lib/site-routes";

const title = "M3U vs Xtream Codes: What's the Difference for IPTV?";
const description =
  "A neutral comparison between M3U playlists and Xtream-compatible API logins for IPTV: data delivery models, content organization, player support, and practical trade-offs.";
const canonical = "/guides/m3u-vs-xtream-codes";
// Shorter search-result description; `description` stays in the article schema.
const metaDescription =
  "A neutral comparison of M3U playlists and Xtream Codes API logins for IPTV: how data is delivered, content organization, player support, and trade-offs.";
const modifiedDate = getLastModified("/guides/m3u-vs-xtream-codes");

/**
 * M3U vs Xtream Codes Comparison Guide
 * Canonical: https://www.tryiptv.com/guides/m3u-vs-xtream-codes
 * Source of truth: src/lib/site-routes.ts (indexable: true)
 */
export function generateMetadata(): Metadata {
  // Title tag and og:title only; the H1 and Article headline keep the longer wording.
  const metaTitle = "M3U vs Xtream Codes: What's the Difference?";
  return {
    ...generatePageMetadata({
      title: metaTitle,
      description: metaDescription,
      canonical,
    }),
    title: {
      absolute: `${metaTitle} | TryIPTV`,
    },
  };
}

const faqs = [
  {
    question: "Do M3U and Xtream Codes provide access to different channels?",
    answer:
      "Generally no, assuming both methods are connected to the same subscription profile with the same IPTV provider. The underlying streams and content library are typically identical. The difference lies in how the information is packaged and delivered to your player application—as a continuous text playlist or through structured API queries.",
  },
  {
    question: "Is Xtream Codes universally better than M3U?",
    answer:
      "Neither method is universally superior. An Xtream-compatible login offers convenient category organization and integrated account checks when supported by modern player apps. However, M3U playlists offer broader portability across a wider range of media players, hardware platforms, and standalone media tools that do not support custom API integrations.",
  },
  {
    question: "Does Xtream Codes automatically guarantee that TV guide (EPG) data will work?",
    answer:
      "No. While common Xtream-compatible APIs expose EPG endpoints that compatible players can query automatically, guide data accuracy still depends entirely on whether the provider maintains valid schedule listings for those stream IDs. If the server lacks guide data for a specific channel, an Xtream login cannot supply it.",
  },
  {
    question: "Can I use an M3U playlist with an Electronic Programme Guide?",
    answer:
      "Yes. Most modern IPTV players allow users to pair an M3U playlist with one or more external XMLTV guide URLs. If the channel entries in the playlist include standard community tags (such as tvg-id), the player can automatically match the channels to the external schedule data.",
  },
  {
    question: "Can I save an Xtream Codes login as a local file?",
    answer:
      "No. An Xtream Codes connection relies on interactive communication between the player and the server's API endpoints. In contrast, an M3U playlist can be downloaded and stored locally on your device as a static .m3u or .m3u8 text file if offline portability is required.",
  },
  {
    question: "Can I switch between M3U and Xtream Codes without changing my subscription?",
    answer:
      "In most IPTV services, yes. Providers commonly supply both an M3U playlist URL and Xtream Codes credentials (Server URL, Username, and Password) for the same subscription, allowing you to configure whichever connection method best suits your player application.",
  },
];

const comparisonRows = [
  {
    feature: "Information entered by user",
    m3u: "A single playlist web link (URL) or a saved local .m3u/.m3u8 file.",
    xtream: "Server URL, Username, and Password (port entered separately or in URL).",
  },
  {
    feature: "Data delivery model",
    m3u: "Downloads or parses a complete list of media stream entries.",
    xtream: "Communicates via HTTP requests to retrieve structured JSON data.",
  },
  {
    feature: "Content categorization",
    m3u: "Groups channels based on text attributes (e.g., group-title) inside the playlist.",
    xtream: "Queries server-defined categories for Live TV, Movies, and TV Series.",
  },
  {
    feature: "TV Guide (EPG) handling",
    m3u: "Often paired with a separate XMLTV URL; matched via tvg-id tags.",
    xtream: "Common implementations expose EPG endpoints queried by the player.",
  },
  {
    feature: "VOD & Series organization",
    m3u: "VOD streams appear as playlist entries; structure depends on file generator.",
    xtream: "Common APIs expose dedicated series, season, and episode metadata.",
  },
  {
    feature: "Local file support",
    m3u: "Can be saved locally on storage as a static offline text file.",
    xtream: "Requires live network communication with server API endpoints.",
  },
  {
    feature: "Player compatibility",
    m3u: "Broad compatibility across dedicated IPTV apps, VLC, Kodi, and media centers.",
    xtream: "Supported by specialized IPTV players (e.g., TiviMate, Smarters, Televizo).",
  },
  {
    feature: "Troubleshooting focus",
    m3u: "URL reachability, line syntax, parsing integrity, and character encoding.",
    xtream: "API endpoint status, credential authentication, and port reachability.",
  },
];

const articleSchema = generateArticleSchema({
  headline: title,
  description,
  dateModified: modifiedDate,
  url: `${SITE_URL}${canonical}`,
});

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", item: `${SITE_URL}/` },
  { name: "Guides", item: `${SITE_URL}/guides` },
  { name: "M3U vs Xtream Codes", item: `${SITE_URL}${canonical}` },
]);


export default function M3uVsXtreamCodesPage() {
  return (
    <>
      <PageSchema nodes={[articleSchema, breadcrumbSchema]} />

      {/* Hero Header */}
      <Section className="border-b border-white/[0.07] pt-10 pb-14 sm:pt-14 sm:pb-20">
        <Container>
          <Breadcrumb
            items={[
              { label: "Guides", href: "/guides" },
              { label: "M3U vs Xtream Codes" },
            ]}
            align="center"
          />
          <div className="mx-auto max-w-4xl text-center">
            <p className="eyebrow mb-3">Format Comparison</p>
            <h1 className="font-headline text-3xl font-extrabold leading-[1.15] text-foreground sm:text-4xl lg:text-5xl">
              M3U vs Xtream Codes: What&apos;s the Difference?
            </h1>
            <GuideByline path="/guides/m3u-vs-xtream-codes" />
          </div>
        </Container>
      </Section>

      {/* Main Content Article */}
      <Section className="pt-10 pb-12 sm:pt-14 sm:pb-16 lg:pb-16">
        <Container>
          <article className="mx-auto max-w-3xl">
            {/* Quick Answer Callout */}
            <ArticleSummary title="The Core Distinction: Delivery Models Compared">
              <p>
                In most IPTV setups, an <strong className="text-foreground font-semibold">M3U playlist</strong> and
                an <strong className="text-foreground font-semibold">Xtream Codes login</strong> provide access
                to the exact same channel streams and video library. The primary difference is how that data is
                delivered to and ingested by your media player.
              </p>
              <p>
                An M3U connection provides a text file listing stream URLs and associated channel tags. An
                Xtream-compatible login allows the player to communicate with the provider&apos;s server via
                structured API queries, fetching categories, account status, and guide data interactively.
                Neither format is universally superior; your choice depends on the capabilities of your
                player application and your device requirements.
              </p>
            </ArticleSummary>

            <ArticleProse>
              <p>
                To understand the underlying specifications of each format in detail, you can read our
                dedicated technical guides on{" "}
                <Link href="/guides/what-is-m3u" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
                  what an M3U playlist is
                </Link>{" "}
                and{" "}
                <Link href="/guides/what-are-xtream-codes" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
                  how Xtream Codes API logins work
                </Link>
                . Below, we compare their practical characteristics directly.
              </p>

              <h2>Direct Comparison Overview</h2>
              <p>
                The table below outlines how M3U playlists and Xtream-compatible connections handle common
                aspects of media delivery:
              </p>
            </ArticleProse>

            {/* Comparison Table */}
            {/* A real <table> (so answer engines read rows and headers), laid out with the same grid as before. */}
            <table className="my-8 sm:my-10 block w-full overflow-hidden rounded-xl border border-white/[0.08] bg-[#07080a] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
              <caption className="sr-only">M3U playlist compared with an Xtream-compatible API login</caption>
              {/* Header shows from sm up; stacked mobile cells repeat it via CSS-generated labels (data-label). */}
              <thead className="hidden sm:block">
                <tr className="grid grid-cols-12 bg-[#07080a] px-4 py-3 text-xs sm:text-sm font-bold text-foreground border-b border-white/[0.08]">
                  <th scope="col" className="col-span-3 text-left font-bold">Feature</th>
                  <th scope="col" className="col-span-4 text-left font-bold">M3U Playlist</th>
                  <th scope="col" className="col-span-5 text-left font-bold">Xtream-Compatible API</th>
                </tr>
              </thead>
              <tbody className="block">
                {comparisonRows.map((row, idx) => (
                  <tr
                    key={row.feature}
                    className={`grid grid-cols-1 gap-2 px-4 py-4 text-xs sm:text-sm leading-6 sm:grid-cols-12 ${
                      idx !== 0 ? "border-t border-white/[0.08]" : ""
                    } ${idx % 2 === 1 ? "bg-white/[0.01]" : ""}`}
                  >
                    <th scope="row" className="text-left font-semibold text-foreground sm:col-span-3">{row.feature}</th>
                    <td data-label="M3U Playlist: " className="text-muted-foreground sm:col-span-4 before:font-semibold before:text-foreground/80 before:content-[attr(data-label)] sm:before:content-none">{row.m3u}</td>
                    <td data-label="Xtream-Compatible API: " className="text-muted-foreground sm:col-span-5 before:font-semibold before:text-foreground/80 before:content-[attr(data-label)] sm:before:content-none">{row.xtream}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <ArticleProse>
              <h2>Architectural Ingestion Models</h2>
              <p>
                The fundamental technical divergence between these two approaches lies in their ingestion
                architecture—how the player reads and processes content:
              </p>

              <h3>The M3U File Ingestion Model</h3>
              <p>
                An M3U setup operates around a static file ingestion pattern. When your player loads the
                playlist URL, it initiates an HTTP GET request to download the complete text file:
              </p>
              <ul>
                <li>
                  <strong>Bulk Parsing:</strong> The application must read through every directive line (e.g.,{" "}
                  <code>#EXTINF</code> tags), parse metadata using string tokenizers, and construct in-memory
                  channel objects before populating the channel grid.
                </li>
                <li>
                  <strong>Static Snapshots:</strong> Once the file is parsed, the channel list remains fixed
                  until the application triggers a manual or scheduled refresh.
                </li>
                <li>
                  <strong>Decoupled Guide Metadata:</strong> Programme guide (EPG) schedules are typically not
                  embedded within the M3U playlist file itself. Players must be supplied with a secondary XMLTV
                  URL and cross-reference channel names or <code>tvg-id</code> values to match schedule data.
                </li>
              </ul>

              <h3>The Xtream API Ingestion Model</h3>
              <p>
                An Xtream-compatible setup functions on a dynamic client-server pattern. Instead of downloading
                a massive text file all at once, the application interacts with dedicated API endpoints:
              </p>
              <ul>
                <li>
                  <strong>Categorized Requests:</strong> The player first queries category lists (e.g., via{" "}
                  <code>action=get_live_categories</code>). Streams within specific bouquets are queried
                  on demand or cached locally in lightweight SQLite databases.
                </li>
                <li>
                  <strong>Account Telemetry:</strong> The initial authentication response returns real-time
                  subscription parameters, including expiration dates and concurrent connection limits.
                </li>
                <li>
                  <strong>Integrated EPG Endpoints:</strong> Many Xtream implementations provide server-side EPG
                  endpoints (<code>action=get_short_epg</code>) tied directly to stream IDs, enabling automatic
                  guide retrieval without secondary XMLTV configuration.
                </li>
              </ul>

              <h2>Video-on-Demand (VOD) and Series Organization</h2>
              <p>
                Content structure differences become particularly noticeable when browsing movie and TV series
                libraries:
              </p>
              <ul>
                <li>
                  <strong>VOD in M3U:</strong> Movies and TV episodes must be represented as individual stream
                  lines within the playlist text. Without standardized episodic attributes, multi-season TV shows
                  frequently appear as long, unorganized channel lists unless the player features advanced custom
                  sorting algorithms.
                </li>
                <li>
                  <strong>VOD in Xtream Codes:</strong> Modern Xtream APIs provide structured endpoints for
                  series organization (e.g., <code>action=get_series</code> and{" "}
                  <code>action=get_series_info</code>). Compatible player applications can display Netflix-style
                  interfaces with seasons, episode lists, descriptions, and cover artwork automatically arranged.
                </li>
              </ul>

              <h2>Player Compatibility: Which Formats Do Apps Support?</h2>
              <p>
                Application support is a primary deciding factor for most users:
              </p>
              <ul>
                <li>
                  <strong>Dedicated IPTV Applications:</strong> Advanced television players such as{" "}
                  <Link href="/players/tivimate" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
                    TiviMate
                  </Link>
                  ,{" "}
                  <Link href="/players/iptv-smarters" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
                    IPTV Smarters Pro
                  </Link>
                  ,{" "}
                  <Link href="/players/televizo" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
                    Televizo
                  </Link>
                  , and XCIPTV natively support both connection methods. You can choose either option based on
                  your organizational preference.
                </li>
                <li>
                  <strong>General-Purpose Media Players:</strong> Applications such as VLC, Kodi, and mpv
                  excel at parsing standard M3U and M3U8 files. They do not natively support Xtream API query
                  structures without specialized third-party community add-ons.
                </li>
                <li>
                  <strong>Older or Legacy Hardware:</strong> On legacy set-top boxes or low-memory streaming
                  sticks, very large playlists may be harder for a particular player to parse or navigate. The
                  effect depends on playlist size, metadata, device resources, and the player&apos;s implementation;
                  no repository benchmark establishes a universal line-count or responsiveness threshold.
                </li>
              </ul>

              <h2>How to Choose Between M3U and Xtream Codes</h2>
              <p>
                Use Xtream Codes if your player supports it: you enter three short fields instead of one
                long URL, and live TV, movies, series, and the TV guide load in organised sections. Use an
                M3U URL when a player only accepts playlists, such as VLC. Neither choice changes picture
                quality. Use these practical guidelines to choose:
              </p>

              <h3>Choose an M3U Playlist When:</h3>
              <ul>
                <li>You are using general-purpose media software like VLC, Kodi, or an operating system tool that only accepts playlist URLs or local files.</li>
                <li>You want to store a static snapshot of your playlist locally on your computer or home server.</li>
                <li>You prefer to customize, filter, or reorder channels using a local text editor or playlist management utility.</li>
                <li>You wish to link custom third-party XMLTV guide data from an external source.</li>
              </ul>

              <h3>Choose an Xtream-Compatible Login When:</h3>
              <ul>
                <li>Your preferred player application (such as TiviMate or IPTV Smarters) provides an Xtream login interface.</li>
                <li>You regularly watch on-demand TV series and appreciate automated season and episode grouping.</li>
                <li>You prefer automated guide matching without needing to copy and manage secondary XMLTV guide links.</li>
                <li>You want to monitor your subscription expiration date and active connection status directly within your player&apos;s settings menu.</li>
              </ul>
            </ArticleProse>

            {/* Contextual TryIPTV Note */}
            <div className="mt-12 sm:mt-14 mb-0 rounded-xl sm:rounded-2xl border border-white/[0.08] bg-[#07080a] p-6 sm:p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
              <h3 className="font-headline text-lg sm:text-xl font-bold text-foreground">
                Dual-Format Access with TryIPTV
              </h3>
              <p className="mt-2.5 text-base leading-relaxed text-muted-foreground">
                TryIPTV provides both standard Extended M3U playlist links and Xtream-compatible credentials
                with every subscription. You can test both connection formats during our free trial to decide
                which interface delivers the most comfortable experience on your television or mobile setup.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button asChild size="sm" variant="outline" className="border-white/[0.14] bg-white/[0.03] text-foreground hover:bg-white/[0.08]">
                  <Link href="/iptv-free-trial">
                    Explore Free Trial <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Link>
                </Button>
                <Button asChild size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground">
                  <Link href="/pricing">View Subscription Plans</Link>
                </Button>
              </div>
            </div>
          </article>
        </Container>
      </Section>

      {/* FAQ Section */}
      <Section className="border-t border-white/[0.07] bg-black/20 pt-12 pb-16 sm:pt-14 sm:pb-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 text-center sm:text-left">
              <p className="eyebrow mb-2">Frequently Asked Questions</p>
              <h2 className="font-headline text-2xl font-bold text-foreground sm:text-3xl">
                Common Questions: M3U vs Xtream Codes
              </h2>
            </div>
            <FaqList items={faqs} />
          </div>
        </Container>
      </Section>
      <TopicClusterLinks path="/guides/m3u-vs-xtream-codes" />
    </>
  );
}
