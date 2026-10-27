import type { Metadata } from "next";
import { TopicClusterLinks } from "@/components/shared/TopicClusterLinks";
import { GuideByline } from "@/components/shared/GuideByline";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  Database,
  FileCode,
  Globe,
  HelpCircle,
  Info,
  Layers,
  ListFilter,
  RefreshCw,
  Tv,
} from "lucide-react";
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
} from "@/components/guide";
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
} from "@/lib/schema";
import { SITE_URL, generateMetadata as generatePageMetadata } from "@/lib/site-config";
import { getLastModified } from "@/lib/site-routes";

const title = "What Is an EPG? How IPTV TV Guides and XMLTV Data Work";
const description =
  "A clear guide to Electronic Programme Guides (EPG) in IPTV: how TV guide data works, XMLTV and provider ingestion, channel matching, and time offsets.";
const canonical = "/guides/what-is-epg";
const modifiedDate = getLastModified("/guides/what-is-epg");

/**
 * What Is EPG Guide
 * Canonical: https://www.tryiptv.com/guides/what-is-epg
 * Source of truth: src/lib/site-routes.ts (indexable: true)
 */
export function generateMetadata(): Metadata {
  // Title tag and og:title only; the H1 and Article headline keep the longer wording.
  const metaTitle = "What Is an EPG? IPTV TV Guides & XMLTV";
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
    question: "What does EPG stand for?",
    answer:
      "EPG stands for Electronic Programme Guide. It is the digital schedule system used by television receivers, set-top boxes, and IPTV media player applications to display broadcast timetables, program titles, synopses, and upcoming schedules in a navigable on-screen grid.",
  },
  {
    question: "Is EPG data part of the video stream itself?",
    answer:
      "No. In IPTV architecture, EPG data is transmitted as separate structured text metadata (commonly formatted as XML or JSON) rather than being embedded inside the video stream's audio and video packets. Because they travel over separate network requests, a video channel can stream smoothly even when its schedule data is missing or out of sync.",
  },
  {
    question: "Why does a channel work while the guide says 'No Information'?",
    answer:
      "If a channel plays video but the guide displays 'No Information' or a blank bar, the media player successfully downloaded and decoded the video stream URL, but it could not find matching schedule records. This typically occurs when the EPG source lacks data for that specific channel, the channel's identifier does not match the guide database, or the guide data has not yet refreshed.",
  },
  {
    question: "Is XMLTV the same thing as an EPG?",
    answer:
      "Not exactly. EPG is the broad concept of an interactive television program guide. XMLTV is a specific, widely adopted XML-based file format used to structure and distribute that schedule data between servers and media players.",
  },
  {
    question: "What is tvg-id used for in IPTV playlists?",
    answer:
      "The tvg-id attribute is a common community convention used in Extended M3U playlists to link a streaming channel to its corresponding schedule entry in an XMLTV guide. It provides a unique identifier string that media players match against the channel IDs defined in the EPG file.",
  },
  {
    question: "Does every IPTV player app support an EPG?",
    answer:
      "Most dedicated IPTV players—such as TiviMate, IPTV Smarters Pro, Televizo, and OTT Navigator—support EPG integration via XMLTV URLs or provider APIs. However, general-purpose media players (such as basic VLC setups or standard web players) often focus purely on stream playback and may require manual configuration or lack a schedule grid altogether.",
  },
  {
    question: "Why can EPG schedule times be offset by several hours?",
    answer:
      "Schedule times can appear several hours ahead or behind if there is a mismatch between the broadcast timezone recorded in the EPG file and the system clock or timezone configured on your streaming device. In some cases, daylight saving adjustments or player-specific manual offset settings can also cause timing shifts.",
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
  { name: "What Is an EPG?", item: `${SITE_URL}${canonical}` },
]);


export default function WhatIsEpgPage() {
  return (
    <>
      <PageSchema nodes={[articleSchema, breadcrumbSchema]} />

      {/* Hero Header */}
      <Section className="border-b border-white/[0.07] pt-10 pb-14 sm:pt-14 sm:pb-20">
        <Container>
          <Breadcrumb
            items={[
              { label: "Guides", href: "/guides" },
              { label: "What Is an EPG?" },
            ]}
            align="center"
          />
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow mb-3">IPTV Guide Architecture</p>
            <h1 className="font-headline text-3xl font-extrabold leading-[1.15] text-foreground sm:text-4xl lg:text-5xl">
              What Is an EPG? How IPTV TV Guides Work
            </h1>
            <p className="mx-auto mt-5 max-w-[60ch] text-base leading-7 text-muted-foreground sm:text-lg">
              An EPG (Electronic Programme Guide) is the on-screen TV guide in an IPTV player: schedule
              data that shows what is airing now and next on each channel. It is usually supplied as an
              XMLTV file and matched to the playlist&apos;s channels by ID. This guide explains how that data
              is structured, loaded, and kept in sync.
            </p>
            <GuideByline path="/guides/what-is-epg" />
          </div>
        </Container>
      </Section>

      {/* Main Content Article */}
      <Section className="pt-10 pb-12 sm:pt-14 sm:pb-16 lg:pb-16">
        <Container>
          <article className="mx-auto max-w-3xl">
            {/* Quick Answer Callout */}
            <ArticleSummary
              title="Quick Summary: What Is an Electronic Programme Guide?"
              className="mb-10 sm:mb-12"
            >
              <p>
                An <strong className="font-semibold text-foreground">EPG (Electronic Programme Guide)</strong> is
                structured schedule metadata used by media players and television software to display what is
                currently airing and what is scheduled next across broadcast channels.
              </p>
              <p className="mt-3">
                In modern IPTV systems, <strong className="font-semibold text-foreground">EPG data is completely separate from the video stream itself</strong>.
                A video channel can stream video and audio flawlessly even when its EPG data is missing,
                outdated, mismatched to the wrong channel, or offset by several hours. Understanding this
                separation is key to diagnosing guide issues quickly.
              </p>
              <p className="mt-3">
                EPG describes the user-facing schedule; <strong className="font-semibold text-foreground">XMLTV</strong> is one common structured data format used to carry that schedule to a player. If channels play but listings are missing or shifted, use the <Link href="/help/epg-not-working" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">EPG troubleshooting guide</Link> for diagnosis.
              </p>
            </ArticleSummary>

            <ArticleProse>
              <h2>Core Concepts: What Information Does an EPG Contain?</h2>
              <p>
                In traditional cable and satellite broadcasting, schedule data is transmitted alongside video
                frequencies via dedicated broadcast metadata tables. In internet-delivered television,
                EPG data is distributed as structured text files—most commonly using XML or JSON—that
                your player application downloads, parses, and arranges into an on-screen grid.
              </p>
              <p>
                A comprehensive EPG entry typically contains several key data elements, depending on the
                source and depth of the listing:
              </p>
              <ul>
                <li>
                  <strong>Channel Identity:</strong> Identifies the network or station, including the channel
                  name, unique identifier code, and optional network icon or logo URL.
                </li>
                <li>
                  <strong>Programme Title:</strong> The official name of the movie, sporting event, news
                  broadcast, or episodic television show.
                </li>
                <li>
                  <strong>Start and End Timestamps:</strong> Exact scheduled broadcast times, typically recorded
                  with timezone or UTC offset indicators to establish the precise broadcast window.
                </li>
                <li>
                  <strong>Programme Synopsis and Description:</strong> Narrative summary of the episode or
                  broadcast, often supplemented by content ratings, genre tags, and original air dates.
                </li>
                <li>
                  <strong>Episodic Metadata:</strong> When provided by the upstream feed, listings may include
                  season numbers, episode numbers, director credits, and cast listings.
                </li>
                <li>
                  <strong>Schedule Grid Coordinates:</strong> Coordinates that allow the player application to
                  position programmes along a visual timeline, showing past, current, and upcoming broadcasts.
                </li>
              </ul>
              <p className="text-base sm:text-sm text-muted-foreground">
                <em>Note:</em> Not every EPG source supplies all of these metadata attributes. Some lightweight
                or community feeds provide only basic titles and broadcast times, while full commercial feeds
                include rich synopses and high-resolution poster artwork.
              </p>

              <h2>How IPTV Players Receive EPG Data</h2>
              <p>
                Unlike traditional digital television receivers that pull guide tables from an over-the-air
                multiplex, IPTV applications obtain schedule data through the internet. Depending on your
                player application and service configuration, EPG data is usually delivered through one of
                three ingestion mechanisms:
              </p>
            </ArticleProse>

            {/* Ingestion Methods Grid */}
            <div className="my-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/[0.08] bg-[#07080a] p-5 shadow-sm transition-all hover:border-white/[0.14]">
                <div className="flex items-center gap-2 text-base font-bold text-foreground">
                  <Database className="h-5 w-5 text-primary" />
                  Provider API Integration
                </div>
                <p className="mt-2.5 text-base sm:text-sm leading-6 text-muted-foreground">
                  When connecting via an{" "}
                  <Link href="/guides/what-are-xtream-codes" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
                    Xtream-compatible API login
                  </Link>
                  , the player queries dedicated server endpoints that return structured EPG data directly
                  alongside the channel list, without requiring a separate guide URL.
                </p>
              </div>

              <div className="rounded-2xl border border-white/[0.08] bg-[#07080a] p-5 shadow-sm transition-all hover:border-white/[0.14]">
                <div className="flex items-center gap-2 text-base font-bold text-foreground">
                  <FileCode className="h-5 w-5 text-primary" />
                  Dedicated XMLTV URL
                </div>
                <p className="mt-2.5 text-base sm:text-sm leading-6 text-muted-foreground">
                  When using an{" "}
                  <Link href="/guides/what-is-m3u" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
                    M3U playlist
                  </Link>
                  , the player downloads an external XML file (or a compressed <code>.xml.gz</code> archive)
                  from a specified web address and parses its listings into device memory.
                </p>
              </div>

              <div className="rounded-2xl border border-white/[0.08] bg-[#07080a] p-5 shadow-sm transition-all hover:border-white/[0.14]">
                <div className="flex items-center gap-2 text-base font-bold text-foreground">
                  <ListFilter className="h-5 w-5 text-primary" />
                  Third-Party Guide Sources
                </div>
                <p className="mt-2.5 text-base sm:text-sm leading-6 text-muted-foreground">
                  Advanced players allow users to add secondary or custom guide sources. If a provider&apos;s
                  feed lacks data for specific regional channels, users can map external XMLTV feeds to
                  supplement missing listings.
                </p>
              </div>
            </div>

            <ArticleProse>
              <p>
                The completeness of the guide depends on the player and service implementation. Even when a
                service supports Xtream-compatible APIs, the provider must actively curate and maintain
                upstream guide schedules for each channel in their catalog. If the provider does not supply
                data for a particular stream, the player will simply display an empty time block.
              </p>

              <h2>XMLTV at a Glance: The Common Language of TV Guides</h2>
              <p>
                The most widely supported open standard for distributing television listings across the
                internet is <strong className="font-semibold text-foreground">XMLTV</strong>. Originally developed
                as an open-source project to gather TV listings, XMLTV defines an XML document structure
                containing two primary elements:
              </p>
              <ul>
                <li>
                  <code>&lt;channel&gt;</code> blocks: Define individual stations, their unique ID codes, display
                  names, and channel logos.
                </li>
                <li>
                  <code>&lt;programme&gt;</code> blocks: Define individual scheduled broadcasts, referenced by the
                  channel ID, with start/stop timestamps, title, description, and category.
                </li>
              </ul>
              <p>
                A simplified conceptual snippet of XMLTV data looks like this:
              </p>
            </ArticleProse>

            {/* Code Snippet */}
            <div className="my-6">
              <ArticleCodeBlock
                title="Simplified XMLTV Document Structure"
                code={`<!-- Simplified XMLTV Document Structure -->
<tv>
  <channel id="espn.us">
    <display-name>ESPN HD</display-name>
  </channel>
  <programme start="20261005180000 +0000" stop="20261005200000 +0000" channel="espn.us">
    <title>SportsCenter Live</title>
    <desc>Live sports news, scores, and in-depth highlights from around the league.</desc>
  </programme>
</tv>`}
              />
            </div>

            <ArticleProse>
              <p>
                Because complete television listings for hundreds of channels can span tens of megabytes of raw
                text, XMLTV files are frequently compressed using gzip into <code>.xml.gz</code> files to reduce
                server bandwidth and download times.
              </p>

              <h2>Channel Matching: Connecting Streams to Schedule Data</h2>
              <p>
                An IPTV playlist file (such as an M3U file) is essentially a list of video addresses, while an
                EPG file is a list of broadcast schedules. How does a media player know which schedule belongs
                to which video stream?
              </p>
              <p>
                To connect them, the player relies on channel matching rules:
              </p>
              <ul>
                <li>
                  <strong>The <code>tvg-id</code> Attribute:</strong> In Extended M3U playlists, the{" "}
                  <code>tvg-id</code> tag is a community-standard metadata attribute that specifies the exact ID
                  of the matching channel in the EPG file. For example, if a channel line contains{" "}
                  <code>tvg-id=&quot;espn.us&quot;</code>, the player searches the EPG file for the{" "}
                  <code>&lt;channel id=&quot;espn.us&quot;&gt;</code> definition. Note that <code>tvg-id</code> is
                  a de facto community convention popularized by open-source players (like Kodi and VLC), not an
                  official IETF standard.
                </li>
                <li>
                  <strong>Channel Name Matching:</strong> If <code>tvg-id</code> is missing or blank, many modern
                  players attempt a fuzzy match using the channel&apos;s visible display name against the{" "}
                  <code>&lt;display-name&gt;</code> tags in the guide file.
                </li>
                <li>
                  <strong>Provider-Assigned Stream IDs:</strong> When connecting via Xtream-compatible APIs, the
                  server handles the association internally by linking each numerical stream ID directly to its
                  associated schedule database entry.
                </li>
              </ul>
              <p>
                Not all player applications handle channel mapping identically. While some players match strictly
                on exact ID strings, advanced players (such as TiviMate and Televizo) allow users to manually
                reassign a channel to any guide entry directly from the on-screen menu if automatic matching
                fails.
              </p>

              <h2>Timezones and Timestamps: Why Guide Times Disagree</h2>
              <p>
                Every programme entry in an EPG contains start and end timestamps. In standard XMLTV files, these
                timestamps include an explicit timezone or UTC offset (such as <code>+0000</code> for UTC or{" "}
                <code>-0500</code> for Eastern Standard Time).
              </p>
              <p>
                When your player loads this data, it converts the UTC timestamp into your local time based on your
                device&apos;s system clock. A misalignment can occur if:
              </p>
              <ul>
                <li>The device running the player has an incorrect system clock or manual timezone setting.</li>
                <li>The upstream provider published timestamps without UTC offset notation, causing the player to assume local time.</li>
                <li>Daylight saving time transitions altered the local clock offset without an update to the source listings.</li>
              </ul>
              <p>
                If your guide shows the correct show titles but places them one or two hours in the future or
                past, the problem is almost always a timezone conversion discrepancy. For step-by-step
                instructions on correcting time mismatches, see our dedicated guide on{" "}
                <Link href="/help/epg-not-working" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
                  troubleshooting EPG issues
                </Link>
                .
              </p>

              <h2>EPG Caching and Refresh Cycles</h2>
              <p>
                Television listings for large channel packages can contain tens of thousands of individual
                programs. Downloading and parsing this volume of data on every channel change would cause severe
                interface lag and consume unnecessary bandwidth.
              </p>
              <p>
                To deliver instantaneous navigation, IPTV players store parsed guide data in a local cache (such
                as an internal SQLite database on your streaming device). The player displays schedule
                information directly from local memory and schedules periodic background updates to retrieve
                new listings.
              </p>
              <p>
                Cache refresh intervals vary significantly across applications:
              </p>
              <ul>
                <li>Some players refresh guide data automatically upon application startup.</li>
                <li>Others schedule automated background downloads at fixed intervals (such as every 12 or 24 hours).</li>
                <li>Most modern players allow users to trigger a manual EPG update on demand from the settings menu.</li>
              </ul>
              <p className="text-base sm:text-sm text-muted-foreground">
                <em>Note:</em> There is no universal standard for cache retention across players. Exact retention
                windows and refresh behaviors are determined by each application&apos;s design and available
                device storage.
              </p>

              <h2>EPG vs. Video Stream: Separating Metadata from Playback</h2>
              <p>
                A fundamental concept in IPTV architecture is the complete operational independence of stream
                playback and guide metadata:
              </p>
            </ArticleProse>

            {/* Video vs EPG Comparison Cards */}
            <div className="my-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/[0.08] bg-[#07080a] p-6 shadow-sm transition-all hover:border-white/[0.14]">
                <div className="flex items-center gap-2 text-base font-bold text-foreground">
                  <Tv className="h-5 w-5 text-primary" />
                  The Video Stream Layer
                </div>
                <div className="mt-3 space-y-2 text-base sm:text-sm leading-6 text-muted-foreground">
                  <p>
                    Delivers raw media packets (MPEG Transport Stream or HLS video segments) from the media
                    streaming server to your device&apos;s hardware video decoder.
                  </p>
                  <p>
                    If this layer fails, the symptom is buffering, freezing, or a black screen. It operates
                    independently of whether a guide exists.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-white/[0.08] bg-[#07080a] p-6 shadow-sm transition-all hover:border-white/[0.14]">
                <div className="flex items-center gap-2 text-base font-bold text-foreground">
                  <Calendar className="h-5 w-5 text-primary" />
                  The EPG Metadata Layer
                </div>
                <div className="mt-3 space-y-2 text-base sm:text-sm leading-6 text-muted-foreground">
                  <p>
                    Delivers structured textual listings (XML or JSON) containing show titles, air times, and
                    channel IDs to populate the on-screen guide grid.
                  </p>
                  <p>
                    If this layer fails, the symptom is &quot;No Information&quot; or incorrect broadcast times.
                    The video stream itself remains unaffected.
                  </p>
                </div>
              </div>
            </div>

            <ArticleProse>
              <p>
                Recognizing this separation prevents misplaced troubleshooting. If a channel plays smoothly but
                its guide line is empty, restarting your Wi-Fi router or tweaking stream buffer settings will
                have zero effect. The solution lies entirely within EPG source configuration and channel
                mapping.
              </p>
            </ArticleProse>

            {/* Contextual TryIPTV Note */}
            <div className="mt-12 sm:mt-14 mb-0 rounded-2xl border border-white/[0.08] bg-[#07080a] p-6 sm:p-8">
              <h3 className="text-lg font-bold text-foreground">
                Consistent Guide Integration with TryIPTV
              </h3>
              <p className="mt-2 text-base sm:text-sm leading-6 text-muted-foreground">
                EPG data may be available through Xtream-compatible credentials in TiviMate or an Extended M3U
                playlist with an external XMLTV URL; loading and time display depend on the source and player.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button asChild size="sm" variant="outline">
                  <Link href="/iptv-free-trial">
                    Explore Free Trial <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Link>
                </Button>
                <Button asChild size="sm" variant="ghost">
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
                Common Questions About IPTV Programme Guides
              </h2>
            </div>
            <FaqList items={faqs} />
          </div>
        </Container>
      </Section>
      <TopicClusterLinks path="/guides/what-is-epg" />
    </>
  );
}
