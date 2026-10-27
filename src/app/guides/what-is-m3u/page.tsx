import type { Metadata } from "next";
import { TopicClusterLinks } from "@/components/shared/TopicClusterLinks";
import { GuideByline } from "@/components/shared/GuideByline";
import Link from "next/link";
import { ArrowRight, Code, Globe, List, Tv } from "lucide-react";
import { FaqList } from "@/components/sections/FAQ";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { Container } from "@/components/shared/Container";
import { PageSchema } from "@/components/shared/Schema";
import { Section } from "@/components/shared/Section";
import { Button } from "@/components/ui/button";
import {
  ArticleCodeBlock,
  ArticleProse,
  ArticleSummary,
  ArticleTermGrid,
} from "@/components/guide";
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
} from "@/lib/schema";
import { SITE_URL, generateMetadata as generatePageMetadata } from "@/lib/site-config";
import { getLastModified } from "@/lib/site-routes";

const title = "What Is an M3U Playlist? Structure, Syntax, and IPTV Usage";
const description =
  "A comprehensive technical guide to M3U and M3U8 playlists in IPTV: header syntax, #EXTINF tags, community metadata attributes, and file handling.";
const canonical = "/guides/what-is-m3u";
const modifiedDate = getLastModified("/guides/what-is-m3u");

/**
 * What Is M3U Guide
 * Canonical: https://www.tryiptv.com/guides/what-is-m3u
 * Source of truth: src/lib/site-routes.ts (indexable: true)
 */
export function generateMetadata(): Metadata {
  // Title tag and og:title only; the H1 and Article headline keep the longer wording.
  const metaTitle = "What Is an M3U Playlist? Format & IPTV Use";
  return {
    ...generatePageMetadata({
      title: metaTitle,
      description,
      canonical,
    }),
    title: {
      absolute: `${metaTitle} | TryIPTV`,
    },
  };
}

const faqs = [
  {
    question: "What is an M3U link?",
    answer:
      "An M3U link is a web address (URL) that points to an M3U playlist file. You paste it into the M3U URL or Add playlist field of an IPTV player, which downloads the channel list from it. Keep it private: it usually contains your username and password.",
  },
  {
    question: "What is the difference between an M3U and an M3U8 file?",
    answer:
      "Both formats are text-based playlists that list media stream locations. The primary distinction relates to character encoding conventions. The .m3u8 extension is commonly used for UTF-8 encoded M3U playlists, allowing it to display international characters, non-Latin scripts, and accents. While modern .m3u files often use UTF-8 as well, legacy files sometimes relied on local system character sets. In HTTP Live Streaming (HLS, RFC 8216), UTF-8 encoding is required.",
  },
  {
    question: "Is an M3U file an actual video or media file?",
    answer:
      "No. An M3U file is a plain-text index. It contains no video or audio data itself. Instead, it contains text directives and web addresses (URLs) that point your media player to where the actual streaming video files (such as HLS manifests or MPEG Transport Streams) are hosted on remote web servers.",
  },
  {
    question: "What does the #EXTM3U tag mean at the top of the file?",
    answer:
      "The #EXTM3U tag is an opening directive that identifies the text file as an Extended M3U playlist rather than a simple list of file paths. In RFC 8216 HLS playlists, it is required on the first line of the file.",
  },
  {
    question: "What does #EXTINF:-1 signify in an IPTV playlist?",
    answer:
      "In HTTP Live Streaming (RFC 8216), the number following #EXTINF indicates the duration of a media segment in seconds. In live IPTV broadcasting, streams are ongoing broadcasts without a predetermined duration. The IPTV community adopted the convention of setting this value to -1 (or sometimes 0) to indicate to player parsers that the media is an open-ended live linear channel.",
  },
  {
    question: "Are tags like tvg-id, tvg-logo, and group-title official Internet standards?",
    answer:
      "No. These tags are not defined in IETF standards such as RFC 8216. They are community extensions popularized by open-source media centers (including MythTV, Kodi, and VLC) to allow players to pair live streams with TV guide (EPG) schedules, display station logos, and organize channels into genre categories.",
  },
  {
    question: "Can I download an M3U playlist and save it locally on my computer or device?",
    answer:
      "Yes. An M3U playlist can be downloaded and stored locally as a static .m3u or .m3u8 file. However, because it is a static local snapshot, it will not receive automated updates if your IPTV provider adds new channels, updates stream addresses, or migrates server domains. Loading the playlist via a remote URL allows your player app to fetch fresh channel lists when refreshed.",
  },
  {
    question: "Why doesn't my downloaded local playlist reflect channel changes?",
    answer:
      "When you download a playlist file to your device's local drive, you create an offline snapshot of that specific moment. Unlike a remote URL—which your player queries over the web upon refresh—the offline file has no link to the server. If a provider changes stream URLs or renames channels, you must manually download an updated copy.",
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
  { name: "What Is an M3U Playlist?", item: `${SITE_URL}${canonical}` },
]);


export default function WhatIsM3uPage() {
  return (
    <>
      <PageSchema nodes={[articleSchema, breadcrumbSchema]} />

      {/* Hero Header */}
      <Section className="border-b border-white/[0.07] pt-10 pb-14 sm:pt-14 sm:pb-20">
        <Container>
          <Breadcrumb
            items={[
              { label: "Guides", href: "/guides" },
              { label: "What Is an M3U Playlist?" },
            ]}
            align="center"
          />
          <div className="mx-auto max-w-4xl text-center">
            <p className="eyebrow mb-3">Format Architecture & Syntax</p>
            <h1 className="font-headline text-3xl font-extrabold leading-[1.15] text-foreground sm:text-4xl lg:text-5xl">
              What Is an M3U Playlist? Structure, Syntax, and IPTV Usage
            </h1>
            <p className="mx-auto mt-5 max-w-[60ch] text-base leading-7 text-muted-foreground sm:text-lg">
              An M3U playlist is a plain-text file that lists stream URLs, one per channel, with optional
              #EXTINF lines for each channel&apos;s name, logo, group, and guide ID. IPTV providers usually share
              it as a web link that a player app downloads. This guide covers M3U vs M3U8, Extended M3U
              syntax, and how players parse it.
            </p>
            <GuideByline path="/guides/what-is-m3u" />
          </div>
        </Container>
      </Section>

      {/* Main Content Article */}
      <Section className="pt-10 pb-12 sm:pt-14 sm:pb-16 lg:pb-16">
        <Container>
          <article className="mx-auto max-w-3xl">
            {/* Quick Answer Callout */}
            <ArticleSummary title="Quick Summary: What Is an M3U Playlist?">
              <p>
                An <strong className="text-foreground font-semibold">M3U playlist</strong> is a plain-text
                file containing an ordered list of media resources and URLs. It contains no video or audio data
                itself; rather, it acts as an index instructing media players where to locate streams on a
                local storage drive or across the internet.
              </p>
              <p>
                In IPTV, services use an evolved format known as{" "}
                <strong className="text-foreground font-semibold">Extended M3U</strong>. By placing metadata
                tags (such as <code>#EXTINF</code>) before each stream address, an Extended M3U playlist
                supplies channel names, genre categories, program guide IDs, and station logos to compatible
                IPTV applications.
              </p>
              <p>
                M3U is a playlist format, while <Link href="/guides/what-are-xtream-codes" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">Xtream Codes</Link> is a structured login method that many IPTV players use to request channel and guide data. For the practical choice between them, see the <Link href="/guides/m3u-vs-xtream-codes" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">M3U vs Xtream Codes comparison</Link>.
              </p>
            </ArticleSummary>

            <ArticleProse>
              <h2>The Evolution of M3U and M3U8</h2>
              <p>
                The M3U format originated as a plain-text playlist format for desktop media
                players to organize media files. In its simplest form, a basic
                M3U file was merely a text file containing file paths or URLs, with each entry placed on a new
                line.
              </p>
              <p>
                In common practice, two related formats are widely used:
              </p>
              <ul>
                <li>
                  <strong>Extended M3U:</strong> Uses structured comment directives beginning with{" "}
                  <code>#EXT</code>, allowing playlist creators to specify titles, durations, and
                  metadata before each media location.
                </li>
                <li>
                  <strong>M3U8:</strong> <code>.m3u8</code> is commonly used for UTF-8 encoded M3U playlists.
                  In contrast to legacy text files that relied on local system character sets, UTF-8 encoding
                  allows international titles and special characters to be read consistently across operating
                  systems. RFC 8216 requires HLS playlists to be UTF-8.
                </li>
              </ul>

              <h2>HTTP Live Streaming and the Scope of RFC 8216</h2>
              <p>
                A frequent point of confusion is how formal Internet standards relate to IPTV playlists.
              </p>
              <p>
                In 2017, the Internet Engineering Task Force (IETF) published{" "}
                <strong>RFC 8216</strong> (&quot;HTTP Live Streaming&quot;), edited by Apple Inc. Section 4 of
                RFC 8216 establishes that an HTTP Live Streaming (HLS) playlist is an Extended M3U playlist
                derived from the older informal format.
              </p>
              <p>
                Under RFC 8216, specific rules are specified for HLS streaming:
              </p>
              <ul>
                <li>
                  <strong>UTF-8 Encoding:</strong> Section 4.1 specifies that HLS playlists MUST be encoded in
                  UTF-8.
                </li>
                <li>
                  <strong>Opening Header Directive:</strong> Section 4.3.1.1 defines <code>#EXTM3U</code>,
                  which must appear on the first line of each HLS playlist.
                </li>
                <li>
                  <strong>Segment Duration Tag:</strong> Section 4.3.2.1 defines <code>#EXTINF</code> to
                  specify the duration (as a non-negative decimal floating-point or integer number of seconds)
                  of a media segment chunk, followed by an optional title.
                </li>
              </ul>
              <p>
                <strong>Critical Scope Distinction:</strong> RFC 8216 specifies HTTP Live Streaming playlists
                for segmented media delivery. It does <em>not</em> define or govern the broader generic IPTV
                Extended M3U ecosystem, channel category groups, or TV guide metadata tags.
              </p>

              <h2>HLS RFC 8216 vs. Common IPTV Extended M3U Conventions</h2>
              <p>
                Because RFC 8216 defines segmented streaming rather than multi-channel television directories,
                IPTV applications rely on de facto conventions developed across media player ecosystems.
                The table below outlines how formal HLS specifications differ from common IPTV Extended M3U
                conventions:
              </p>
            </ArticleProse>

            {/* Standards vs IPTV Table */}
            <div className="my-6 overflow-x-auto rounded-xl border border-white/[0.08] bg-[#07080a]" tabIndex={0} role="region" aria-label="M3U standards table">
              <table className="w-full min-w-[32rem] text-left text-sm">
                <thead className="border-b border-white/[0.08] bg-white/[0.02] text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3">Directive / Field</th>
                    <th className="px-4 py-3">HLS Specification (RFC 8216)</th>
                    <th className="px-4 py-3">Common IPTV Extended M3U Convention</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06] text-muted-foreground">
                  <tr>
                    <td className="px-4 py-3 font-mono font-semibold text-foreground">#EXTM3U</td>
                    <td className="px-4 py-3">Defined by RFC 8216 §4.3.1.1; must be the first line of HLS Media and Master playlists.</td>
                    <td className="px-4 py-3">Commonly used as the Extended M3U opening marker.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono font-semibold text-foreground">#EXTINF:&lt;duration&gt;</td>
                    <td className="px-4 py-3">Specifies segment duration (§4.3.2.1); duration must be non-negative.</td>
                    <td className="px-4 py-3">Common implementations often use <code className="text-foreground">#EXTINF:-1</code> for live channels. The negative <code className="text-foreground">-1</code> is an IPTV convention and is not a valid RFC 8216 HLS segment duration.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono font-semibold text-foreground">tvg-id, tvg-name</td>
                    <td className="px-4 py-3">Not defined in RFC 8216.</td>
                    <td className="px-4 py-3">Common IPTV Extended M3U conventions used by implementations such as Kodi PVR IPTV Simple to match channels with external XMLTV guide schedules.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono font-semibold text-foreground">group-title</td>
                    <td className="px-4 py-3">Not defined in RFC 8216.</td>
                    <td className="px-4 py-3">Common IPTV Extended M3U convention for organizing channels into category groups or folders.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono font-semibold text-foreground">tvg-logo</td>
                    <td className="px-4 py-3">Not defined in RFC 8216.</td>
                    <td className="px-4 py-3">Common IPTV Extended M3U convention providing an image URL for station icons in guide grids.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono font-semibold text-foreground">tvg-chno</td>
                    <td className="px-4 py-3">Not defined in RFC 8216.</td>
                    <td className="px-4 py-3">Common IPTV Extended M3U convention suggesting a logical channel number for remote-control keypad navigation.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <ArticleProse>
              <h2>Anatomy of an Extended M3U Playlist in IPTV</h2>
              <p>
                In IPTV environments, media players adapted the Extended M3U syntax to describe entire live
                television channels rather than brief segmented video files. A typical IPTV playlist entry
                consists of a metadata directive line followed immediately by the stream destination URL:
              </p>
            </ArticleProse>

            {/* Code Block Example */}
            <ArticleCodeBlock
              title="Example: Extended M3U Channel Syntax"
              code={`#EXTM3U\n#EXTINF:-1 tvg-id="example.news" tvg-name="Example News" tvg-logo="https://example.com/logo.png" group-title="News",Example News HD\nhttps://stream.example.com/live/channel.m3u8`}
            />

            <ArticleProse>
              <h3>Deconstructing the Entry Directives</h3>
              <p>
                Each component of the entry serves a distinct technical role for the player&apos;s parser:
              </p>
              <ul>
                <li>
                  <strong><code>#EXTM3U</code>:</strong> Declares the file as an Extended M3U playlist;
                  commonly used as the opening marker indicating an Extended M3U file.
                </li>
                <li>
                  <strong><code>#EXTINF</code>:</strong> The &quot;Extended Information&quot; tag that begins
                  the metadata block for the upcoming stream.
                </li>
                <li>
                  <strong>The <code>-1</code> Duration Flag:</strong> While RFC 8216 uses non-negative numbers to
                  denote finite segment durations (e.g., <code>#EXTINF:6.008</code>), IPTV playlists commonly use the
                  community convention of <code>-1</code> (or occasionally <code>0</code>) to signify an
                  open-ended, continuous live stream with no fixed end time.
                </li>
                <li>
                  <strong>The Comma and Channel Title:</strong> Following the metadata parameters, a comma
                  delimits the attributes from the display title (<code>Example News HD</code>), which the
                  player presents in the channel list.
                </li>
                <li>
                  <strong>The Resource URL:</strong> The next line provides the network address. This can point
                  directly to an MPEG Transport Stream (<code>.ts</code>), an HLS manifest (<code>.m3u8</code>),
                  or an RTSP stream.
                </li>
              </ul>

              <h3>Stream Delivery Paths</h3>
              <p>
                An IPTV M3U entry can point to different kinds of stream URLs. The outer IPTV M3U playlist acts
                as a directory of channel URIs, while the URI for an individual channel determines the actual
                delivery mechanism:
              </p>
              <div className="my-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-white/[0.08] bg-[#07080a] p-4 sm:p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">Path A: HLS Stream</p>
                  <p className="mt-2 font-mono text-xs text-foreground/90">
                    M3U channel directory<br />
                    ↳ HLS .m3u8 playlist<br />
                    ↳ Media segments (.ts / .m4s)
                  </p>
                  <p className="mt-3 text-base sm:text-xs leading-relaxed text-muted-foreground">
                    The playlist entry points to an HTTP Live Streaming manifest, which supplies segmented chunks for playback.
                  </p>
                </div>
                <div className="rounded-xl border border-white/[0.08] bg-[#07080a] p-4 sm:p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">Path B: Direct Transport Stream</p>
                  <p className="mt-2 font-mono text-xs text-foreground/90">
                    M3U channel directory<br />
                    ↳ Direct MPEG-TS stream URL
                  </p>
                  <p className="mt-3 text-base sm:text-xs leading-relaxed text-muted-foreground">
                    The playlist entry points directly to a continuous MPEG Transport Stream connection without an intermediate segment manifest.
                  </p>
                </div>
              </div>
              <p>
                Because the delivery mechanism depends on the individual channel URI, an M3U playlist file itself
                does not dictate whether playback uses segmented HLS or continuous transport streams.
              </p>

              <h2>Common IPTV Metadata Attributes</h2>
              <p>
                Over time, open-source media player communities (such as MythTV, VideoLAN VLC, and Kodi&apos;s
                IPTV Simple Client) introduced attribute tags inside the <code>#EXTINF</code> line. Although
                these are community conventions rather than IETF standards, they are commonly recognized by
                many modern IPTV applications:
              </p>
            </ArticleProse>

            {/* Term / Attribute Cards */}
            <ArticleTermGrid
              items={[
                {
                  name: "tvg-id",
                  icon: Code,
                  description:
                    "The channel identifier used by applications (such as Kodi PVR IPTV Simple) to match this stream with an Electronic Programme Guide (EPG) entry in an associated XMLTV schedule file.",
                },
                {
                  name: "group-title",
                  icon: List,
                  description:
                    'The category or genre name (such as "Sports," "News," or a country region) used by player apps to sort channels into organized menu folders.',
                },
                {
                  name: "tvg-logo",
                  icon: Globe,
                  description:
                    "A direct web URL pointing to an image of the station logo, which the player downloads and renders in the guide grid.",
                },
                {
                  name: "tvg-chno",
                  icon: Tv,
                  description:
                    "A suggested numerical channel position (logical channel number) to allow numeric keypad remote control tuning.",
                },
              ]}
            />

            <ArticleProse>
              <h2>Remote URLs vs. Downloaded Local Files</h2>
              <p>
                IPTV providers typically supply an M3U playlist as a web link (e.g.,{" "}
                <code>https://provider.example.com/get.php?username=...&amp;type=m3u_plus</code>). Users
                generally handle this in one of two ways:
              </p>

              <h3>1. Loading via Remote URL</h3>
              <p>
                When you paste the remote URL directly into an application like <Link href="/players/tivimate">TiviMate</Link>, Televizo, or
                <Link href="/players/iptv-smarters">IPTV Smarters</Link>, the player contacts the server over HTTP or HTTPS and downloads the current
                lineup into memory.
              </p>
              <ul>
                <li>
                  <strong>Dynamic Updates:</strong> Whenever the application refreshes its playlist data, it
                  re-fetches the latest version, reflecting newly added channels, removed streams, or updated
                  server domain names.
                </li>
                <li>
                  <strong>Application-Dependent Caching:</strong> Applications manage local caching
                  differently; some cache the list for a set period, while others check upon application startup.
                </li>
              </ul>

              <h3>2. Saving as a Local File</h3>
              <p>
                You can also download the playlist using a web browser and save it locally on your computer or
                device as a static <code>.m3u</code> or <code>.m3u8</code> file.
              </p>
              <ul>
                <li>
                  <strong>Offline Resilience:</strong> A local file can be opened even if the provider&apos;s
                  account portal is temporarily unreachable, provided the media stream URLs themselves remain
                  online.
                </li>
                <li>
                  <strong>Static Limitation:</strong> A downloaded file is a fixed snapshot in time. It does not
                  update when remote channel addresses change. If your provider modifies stream ports, migrates servers,
                  or updates channel lineups, the static local file points to outdated URLs until manually replaced.
                </li>
              </ul>

              <h2>What Does type=m3u_plus Mean?</h2>
              <p>
                Some Xtream-compatible IPTV panel implementations generate playlist URLs structured with specific query parameters, such as:
              </p>
              <div tabIndex={0} role="region" aria-label="Example M3U playlist URL" className="my-4 overflow-x-auto rounded-lg border border-white/[0.08] bg-black/40 p-3 font-mono text-xs text-foreground/90 sm:text-sm">
                https://example.com/get.php?username=USER&amp;password=PASS&amp;type=m3u_plus&amp;output=ts
              </div>
              <p>
                In those implementations, the parameters convey specific formatting instructions to the server:
              </p>
              <ul>
                <li>
                  <strong><code>type=m3u_plus</code>:</strong> Requests an Extended M3U playlist containing richer channel metadata. Depending on the server configuration, this metadata may include common fields such as <code>tvg-id</code>, <code>tvg-name</code>, <code>tvg-logo</code>, and <code>group-title</code>.
                </li>
                <li>
                  <strong><code>type=m3u</code>:</strong> Requests a simpler M3U representation, often omitting extended guide and categorization attributes.
                </li>
                <li>
                  <strong><code>output=ts</code> vs. <code>output=m3u8</code>:</strong> In many Xtream-compatible playlist generators, <code>output=ts</code> produces channel URLs using MPEG-TS delivery, while <code>output=m3u8</code> produces HLS-style playlist URLs. Exact behavior can vary by panel implementation.
                </li>
              </ul>
              <p>
                <strong>Implementation Scope:</strong> <code>m3u_plus</code> is an implementation convention used by Xtream-compatible systems; it is not an IETF M3U or HLS standard. Not all IPTV providers use this convention, and player applications interpret returned attributes according to their own parsing rules.
              </p>

              <h2>Large Playlist Ingestion and Device Considerations</h2>
              <p>
                Because an M3U file is plain text, parsing channel entries involves reading lines, extracting
                metadata attributes via tokenizers or string parsing, and creating channel objects in
                device memory.
              </p>
              <p>
                How smoothly this process occurs depends on several factors:
              </p>
              <ul>
                <li>
                  <strong>Available RAM:</strong> Streaming devices with modest memory reserves (such as
                  budget TV sticks) must balance playlist object allocation with active video decoding buffers.
                </li>
                <li>
                  <strong>Parser Implementation:</strong> Player applications vary in how they process large
                  playlists. Some parse playlist entries progressively and cache channel data locally, while
                  others attempt to load and parse large text files entirely in memory, which can lead to
                  temporary interface pauses during initial startup.
                </li>
                <li>
                  <strong>Playlist Scope:</strong> Unfiltered playlists that include tens of thousands of
                  international channels, foreign VOD titles, and multiple resolution tiers take longer to
                  download and parse than trimmed playlists focused on specific regional categories.
                </li>
              </ul>
            </ArticleProse>

            {/* Contextual TryIPTV Note */}
            <div className="mt-12 sm:mt-14 mb-0 rounded-xl sm:rounded-2xl border border-white/[0.08] bg-[#07080a] p-6 sm:p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
              <h3 className="font-headline text-lg sm:text-xl font-bold text-foreground">
                Flexible Playlist Integration
              </h3>
              <p className="mt-2.5 text-base leading-relaxed text-muted-foreground">
                TryIPTV provides both <Link href="/guides/m3u-vs-xtream-codes">Extended M3U playlist URLs and Xtream-compatible API logins</Link>.
                Whether you are using a dedicated television app like TiviMate or a media player like VLC, you
                can choose the connection format that best suits your player application and hardware setup.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button asChild size="sm" variant="outline" className="border-white/[0.14] bg-white/[0.03] text-foreground hover:bg-white/[0.08]">
                  <Link href="/iptv-free-trial">
                    Explore Free Trial <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Link>
                </Button>
                <Button asChild size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground">
                  <Link href="/help/m3u-not-loading">Troubleshoot Playlist Loading</Link>
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
                Common Questions About M3U Playlists
              </h2>
            </div>
            <FaqList items={faqs} />
          </div>
        </Container>
      </Section>
      <TopicClusterLinks path="/guides/what-is-m3u" />
    </>
  );
}
