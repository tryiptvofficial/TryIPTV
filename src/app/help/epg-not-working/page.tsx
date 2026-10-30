import type { Metadata } from "next";
import { TopicClusterLinks } from "@/components/shared/TopicClusterLinks";
import { GuideByline } from "@/components/shared/GuideByline";
import Link from "next/link";
import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock,
  Database,
  FileCode,
  Globe,
  HelpCircle,
  Layers,
  ListFilter,
  RefreshCw,
  Search,
  Settings,
  ShieldAlert,
  Smartphone,
  Tv,
} from "lucide-react";
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

const title = "EPG Not Working? How to Fix Missing or Incorrect IPTV Guide Data";
const description =
  "Fix IPTV EPG errors step by step: missing guide data, 'No Information' messages, wrong broadcast times, and channel mapping mismatches in your player.";
const canonical = "/help/epg-not-working";
// Shorter search-result title; `title` stays the article headline.
const seoTitle = "EPG Not Working? Fix Missing or Wrong IPTV Guide Data";
const modifiedDate = getLastModified("/help/epg-not-working");

/**
 * EPG Not Working Troubleshooting Guide
 * Canonical: https://www.tryiptv.com/help/epg-not-working
 * Source of truth: src/lib/site-routes.ts (indexable: true)
 */
export function generateMetadata(): Metadata {
  // Title tag and og:title only; the H1 and Article headline keep the longer wording.
  const metaTitle = "EPG Not Working? Fix Missing IPTV Guide Data";
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
    question: "Why does my IPTV guide say 'No Information' on every channel?",
    answer:
      "When every channel displays 'No Information', your player application has failed to ingest the EPG source entirely. This usually occurs because the EPG URL is misconfigured or unreachable, the server timed out during download, your authentication session expired, or the player's internal guide cache is corrupt and requires a fresh reload.",
  },
  {
    question: "Why does the EPG work for some channels but not others?",
    answer:
      "Partial guide coverage usually indicates a channel identification mismatch. IPTV players match channels to schedule entries using unique IDs (such as the community tvg-id attribute) or channel names. If the identifier in your playlist does not exactly match the identifier in the EPG database, the player leaves that channel blank. In other cases, the upstream provider simply does not supply schedule listings for those particular regional or specialty channels.",
  },
  {
    question: "Why is my TV guide several hours ahead or behind live broadcast?",
    answer:
      "Time shifts are almost always caused by a timezone discrepancy between the EPG file's timestamps and your streaming device's system clock. First verify that your device's date, time, and timezone are set to automatic network synchronization. If the device clock is accurate but the guide remains offset, you can apply an EPG time offset setting (+/- hours) in your player as a last-mile correction.",
  },
  {
    question: "Does clearing the EPG cache delete my playlist or favorite channels?",
    answer:
      "No. In all standard IPTV players, clearing the EPG cache deletes only the temporary television schedule database. Your playlists, custom channel groupings, account login credentials, and favorited channels remain completely untouched. The player will simply download fresh schedule listings on its next update.",
  },
  {
    question: "Can video streams play normally if the EPG is completely broken?",
    answer:
      "Yes. In IPTV systems, video stream delivery and EPG metadata delivery operate across entirely separate network channels. A video stream will play at full resolution and audio quality even if the EPG is missing, outdated, or completely failing to load.",
  },
  {
    question: "Is a missing EPG always a provider outage?",
    answer:
      "Not necessarily. While an upstream provider server outage or expired guide feed can cause missing listings, local factors are equally common—including an inaccurate device clock preventing SSL handshakes, a mistyped EPG URL, a full device storage cache, or an aggressive player refresh timeout. Testing the EPG URL in a private browser on the same network helps isolate whether the issue is local or server-side.",
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
  { name: "Help", item: `${SITE_URL}/help` },
  { name: "EPG Troubleshooting", item: `${SITE_URL}${canonical}` },
]);


export default function EpgNotWorkingPage() {
  return (
    <>
      <PageSchema nodes={[articleSchema, breadcrumbSchema]} />

      {/* Hero Header */}
      <Section className="border-b border-white/[0.07] pt-10 pb-14 sm:pt-14 sm:pb-20">
        <Container>
          <Breadcrumb
            items={[
              { label: "Help", href: "/help" },
              { label: "EPG Troubleshooting" },
            ]}
            align="center"
          />
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow mb-3">Electronic Programme Guide Diagnostics</p>
            <h1 className="font-headline text-3xl font-extrabold leading-[1.15] text-foreground sm:text-4xl lg:text-5xl">
              EPG Not Working? How to Fix Missing or Incorrect IPTV Guide Data
            </h1>
            <p className="mx-auto mt-5 max-w-[60ch] text-base leading-7 text-muted-foreground sm:text-lg">
              When your TV guide shows &quot;No Information,&quot; displays listings with the wrong broadcast
              hours, or drops channels entirely, use this structured diagnostic sequence to isolate the
              metadata failure and restore accurate schedules.
            </p>
            <GuideByline path="/help/epg-not-working" />
          </div>
        </Container>
      </Section>

      {/* Main Content Article */}
      <Section className="pt-10 pb-12 sm:pt-14 sm:pb-16 lg:pb-16">
        <Container>
          <article className="mx-auto max-w-3xl">
            {/* Quick Answer Callout */}
            <ArticleSummary
              title="The Direct Answer"
              className="mb-10 sm:mb-12"
            >
              <p>
                If your channels play but the TV guide is blank, out of date, shifted by an hour or more, or missing
                on only some channels, the problem is the EPG schedule data, not the stream. First check that your
                player can reach its EPG source, then clear the EPG cache and force a refresh. Blank individual
                channels usually mean a channel-ID mismatch or no listings for that channel; wrong times usually
                trace to the device clock or time zone.
              </p>
              <p>
                When an on-screen guide fails, your primary instinct might be to restart your router or adjust
                video buffers. However, because{" "}
                <Link href="/guides/what-is-epg" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
                  EPG schedule data is completely separate from the video stream
                </Link>
                , video playback and guide metadata operate on different pathways.
              </p>
            </ArticleSummary>

            <ArticleProse>
              <h2>Identify Your EPG Failure Type</h2>
              <p>
                EPG issues fall into four distinct categories, each pointing to a different point in the
                ingestion pipeline:
              </p>
            </ArticleProse>

            {/* Failure Types Grid */}
            <div className="my-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/[0.08] bg-[#07080a] p-6 shadow-sm transition-all hover:border-white/[0.14]">
                <div className="flex items-center gap-2 text-base font-bold text-foreground">
                  <AlertCircle className="h-5 w-5 text-amber-400" />
                  Type A: Complete Guide Blackout (No Channels)
                </div>
                <div className="mt-3 space-y-2 text-base sm:text-sm leading-6 text-muted-foreground">
                  <p>
                    <strong>Symptom:</strong> Every channel shows &quot;No Information,&quot; an empty timeline, or
                    a permanent loading spinner across the entire guide grid.
                  </p>
                  <p>
                    <strong>Common Indicators:</strong> The player failed to download the guide file entirely, the
                    EPG server endpoint is unreachable, authentication credentials expired, or local database
                    corruption prevented parsing.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-white/[0.08] bg-[#07080a] p-6 shadow-sm transition-all hover:border-white/[0.14]">
                <div className="flex items-center gap-2 text-base font-bold text-foreground">
                  <ListFilter className="h-5 w-5 text-primary" />
                  Type B: Partial Coverage (Some Channels Only)
                </div>
                <div className="mt-3 space-y-2 text-base sm:text-sm leading-6 text-muted-foreground">
                  <p>
                    <strong>Symptom:</strong> Major broadcast networks display complete program grids, but specialty,
                    international, or regional channels remain blank.
                  </p>
                  <p>
                    <strong>Common Indicators:</strong> Channel identifier mismatch between the playlist and the EPG
                    feed, missing <code>tvg-id</code> attributes, or the upstream provider simply lacks listing data
                    for those specific channels.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-white/[0.08] bg-[#07080a] p-6 shadow-sm transition-all hover:border-white/[0.14]">
                <div className="flex items-center gap-2 text-base font-bold text-foreground">
                  <Clock className="h-5 w-5 text-blue-400" />
                  Type C: Present but Time Is Shifted (Offset)
                </div>
                <div className="mt-3 space-y-2 text-base sm:text-sm leading-6 text-muted-foreground">
                  <p>
                    <strong>Symptom:</strong> Correct program titles appear, but the timeline is shifted one, two, or
                    several hours ahead or behind live broadcast.
                  </p>
                  <p>
                    <strong>Common Indicators:</strong> Streaming device system clock or timezone mismatch, daylight
                    saving time transitions, or misconfigured manual time offsets in the player application.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-white/[0.08] bg-[#07080a] p-6 shadow-sm transition-all hover:border-white/[0.14]">
                <div className="flex items-center gap-2 text-base font-bold text-foreground">
                  <RefreshCw className="h-5 w-5 text-emerald-400" />
                  Type D: Stale or Frozen Listings (Outdated)
                </div>
                <div className="mt-3 space-y-2 text-base sm:text-sm leading-6 text-muted-foreground">
                  <p>
                    <strong>Symptom:</strong> The guide displays yesterday&apos;s or last week&apos;s programming, or
                    abruptly cuts off with no upcoming listings past a certain hour.
                  </p>
                  <p>
                    <strong>Common Indicators:</strong> The player failed its automated background update, local cache
                    retention expired, or the upstream provider feed has stopped publishing new schedules.
                  </p>
                </div>
              </div>
            </div>

            <ArticleProse>
              <p className="text-base sm:text-sm text-muted-foreground">
                <em>Note:</em> These symptom mappings are practical diagnostic indicators rather than absolute
                guarantees. Work through the following five verification steps in order.
              </p>

              <h2>Diagnostic Step 1: Verify EPG Source Reachability</h2>
              <p>
                If your player is experiencing a complete guide blackout (Type A), first confirm whether the
                player can successfully communicate with the configured EPG source:
              </p>
              <ul>
                <li>
                  <strong>For Xtream API Logins:</strong> Verify that your account credentials and server URL are
                  active. In most Xtream setups, the player requests guide data through a dedicated endpoint (e.g.,{" "}
                  <code>/xmltv.php</code> or API action). If your main account login is rejected, guide queries will
                  fail as well. Check our{" "}
                  <Link href="/help/iptv-login-not-working" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
                    IPTV login troubleshooting guide
                  </Link>{" "}
                  if you suspect an authentication failure.
                </li>
                <li>
                  <strong>For Dedicated XMLTV URLs:</strong> Inspect the EPG URL entered in your player settings.
                  Verify that there are no accidental typing mistakes, missing slashes, or trailing spaces.
                </li>
              </ul>

              <div className="my-6 rounded-2xl border border-amber-500/25 bg-amber-500/[0.04] p-5 text-base sm:text-sm leading-6 text-muted-foreground">
                <div className="flex items-center gap-2 font-semibold text-foreground">
                  <ShieldAlert className="h-5 w-5 text-amber-400" />
                  Crucial Security Rule: Avoid Third-Party Online Validators
                </div>
                <p className="mt-2">
                  Never paste your private M3U or EPG URLs into public online &quot;playlist checker&quot; or
                  &quot;EPG validator&quot; websites. Many IPTV URLs contain your confidential username and password
                  in plaintext query parameters. Exposing them to untrusted online tools can compromise your
                  subscription.
                </p>
                <p className="mt-2">
                  Instead, test reachability safely on a private browser tab or command line tool on the same local
                  home network, or check your provider&apos;s official support dashboard.
                </p>
              </div>

              <h2>Diagnostic Step 2: Clear EPG Cache and Force a Manual Refresh</h2>
              <p>
                To provide fast, responsive navigation through thousands of listings, IPTV players store schedule
                data in a local cache (usually an SQLite database or app storage on your device). If a download was
                interrupted or storage ran low, this cache can become corrupted or freeze on stale data (Type D).
              </p>
              <p>
                Clearing the cache forces the application to discard its stored table and perform a fresh,
                complete download from the source:
              </p>
              <ul>
                <li>
                  <strong>TiviMate:</strong> Open <em>Settings &gt; EPG &gt; EPG Sources</em>. Select your primary
                  source, choose <em>Clear EPG</em>, and then select <em>Update EPG</em>.
                </li>
                <li>
                  <strong>IPTV Smarters Pro:</strong> From the home dashboard, tap the refresh icon in the upper
                  corner, or open <em>Settings &gt; Refresh EPG</em> and select <em>Install EPG / Refresh</em>.
                </li>
                <li>
                  <strong>Televizo / OTT Navigator:</strong> Open the application settings menu, navigate to the{" "}
                  <em>EPG</em> or <em>Guide</em> section, and trigger a manual reload or clear database action.
                </li>
              </ul>
              <p className="text-base sm:text-sm text-muted-foreground">
                <em>Safety Note:</em> Clearing your EPG cache deletes only temporary program listings. It does{" "}
                <strong>not</strong> delete your playlists, credentials, channel groups, or favorited channels.
              </p>

              <h2>Diagnostic Step 3: Resolve Channel-to-EPG Mapping Gaps</h2>
              <p>
                If your guide works well on most channels but leaves certain channels blank (Type B), the issue is
                almost always a channel mapping mismatch.
              </p>
              <p>
                When an IPTV player matches a channel to its schedule, it checks identity tags:
              </p>
              <ul>
                <li>
                  <strong>The <code>tvg-id</code> Tag:</strong> In Extended M3U playlists, the community attribute{" "}
                  <code>tvg-id</code> specifies the exact ID of the matching channel in the XMLTV file. If the
                  playlist creator used <code>tvg-id=&quot;bbc1.uk&quot;</code> but the guide file lists the channel
                  as <code>&lt;channel id=&quot;bbc-one.uk&quot;&gt;</code>, the player will fail to connect them.
                </li>
                <li>
                  <strong>Channel Name Differences:</strong> If matching falls back to channel names, minor naming
                  variations (such as &quot;CNN HD&quot; vs. &quot;CNN (US) 1080p&quot;) can prevent automatic pairing.
                </li>
              </ul>
              <p>
                <strong>How to Fix Channel Mapping Gaps:</strong>
              </p>
              <ul>
                <li>
                  <em>Manual Assignment in the Player:</em> Many advanced players (including TiviMate and Televizo)
                  allow you to manually assign guide data to individual channels. Long-press the unmapped channel in
                  the channel list, select <em>Assign EPG</em> or <em>EPG Options</em>, and search for the network
                  name in your loaded guide database to link them manually.
                </li>
                <li>
                  <em>Provider Feed Limitations:</em> If a search inside your player&apos;s guide database yields zero
                  results for that network, the upstream provider simply does not include schedule listings for that
                  specific channel. In that scenario, no player-side setting can generate listings.
                </li>
              </ul>

              <h2>Diagnostic Step 4: Correct Timezone and Clock Misalignments</h2>
              <p>
                When program titles are correct but appear shifted one, two, or more hours into the past or future
                (Type C), the failure is caused by a time calculation discrepancy.
              </p>
              <p>
                Follow this sequence to correct time offsets properly:
              </p>
              <ol>
                <li>
                  <strong>Check Your Device System Clock First:</strong> Verify your streaming device&apos;s system
                  clock (Firestick, Android TV, Apple TV, PC). Ensure that <em>Automatic Date &amp; Time (Network-provided)</em>{" "}
                  is enabled and the correct geographical timezone is selected. If a device clock is manually set or
                  drifting, schedules will display at incorrect hours.
                </li>
                <li>
                  <strong>Check Daylight Saving Time (DST):</strong> If the issue began immediately after a seasonal
                  clock change, either your device or the upstream feed may not have adjusted for the seasonal offset.
                </li>
                <li>
                  <strong>Apply Player EPG Time Offset as a Last-Mile Fix:</strong> Only after verifying that your
                  device clock is accurate, use your player&apos;s manual offset setting. Most dedicated IPTV players
                  include an <em>EPG Time Offset</em> setting (e.g., <code>+1:00</code>, <code>-2:00</code>) inside the
                  EPG or playlist configuration menu. Adjust this setting by the exact number of hours the listings
                  are shifted.
                </li>
              </ol>

              <h2>Diagnostic Step 5: XMLTV File Integrity (High-Level Checks)</h2>
              <p>
                If you manage custom XMLTV URLs or maintain external guide feeds, keep these high-level file factors
                in mind:
              </p>
              <ul>
                <li>
                  <strong>Compression Compatibility:</strong> XMLTV files often use gzip compression (<code>.xml.gz</code>).
                  Ensure your player application explicitly supports compressed guide files.
                </li>
                <li>
                  <strong>Malformed XML Structure:</strong> If a guide file was interrupted during generation on the
                  server, an unclosed XML tag or truncated document will cause player parsers to reject the entire
                  file.
                </li>
                <li>
                  <strong>Timestamp Syntax:</strong> Standard XMLTV timestamps require strict formatting (e.g.,{" "}
                  <code>YYYYMMDDhhmmss +ZZZZ</code>). Missing or malformed timezone indicators can cause parsers to
                  discard programme blocks.
                </li>
              </ul>
              <p className="text-base sm:text-sm text-muted-foreground">
                <em>Note:</em> XMLTV is a structured format commonly used to carry programme schedule data to an
                IPTV player. This page focuses on diagnosing missing, stale, or incorrectly mapped guide data.
              </p>

              <h2>When the EPG Is Not the Real Problem</h2>
              <p>
                Because guide metadata and stream playback operate independently, a missing guide does not cause
                video playback failures. If you are experiencing symptoms beyond schedule display, route your
                investigation to the correct specialist guide:
              </p>
              <ul>
                <li>
                  If channels load their guide correctly but the video freezes, stutters, or buffers constantly, read
                  our{" "}
                  <Link href="/help/iptv-buffering" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
                    IPTV buffering diagnostic guide
                  </Link>
                  .
                </li>
                <li>
                  If the player rejects your server URL, username, or password, visit our{" "}
                  <Link href="/help/iptv-login-not-working" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
                    IPTV login troubleshooting guide
                  </Link>
                  .
                </li>
                <li>
                  If the playlist itself refuses to download or parse any channels, consult our{" "}
                  <Link href="/help/m3u-not-loading" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
                    M3U playlist loading guide
                  </Link>
                  .
                </li>
                <li>
                  If multiple systems are failing at once across devices, start with our master{" "}
                  <Link href="/help/iptv-not-working" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
                    IPTV troubleshooting checklist
                  </Link>
                  .
                </li>
              </ul>
            </ArticleProse>

            {/* Contextual TryIPTV Note */}
            <div className="mt-12 sm:mt-14 mb-0 rounded-2xl border border-white/[0.08] bg-[#07080a] p-6 sm:p-8">
              <h3 className="text-lg font-bold text-foreground">
                Guide Data with TryIPTV
              </h3>
              <p className="mt-2 text-base sm:text-sm leading-6 text-muted-foreground">
                Tired of empty &quot;No Information&quot; bars and shifted program hours? EPG data may be available
                through supported player integrations and XMLTV-compatible endpoints where supported.
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
                <Button asChild size="sm" variant="ghost">
                  <Link href="/help">Back to Help Directory</Link>
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
                Common Questions: Fixing IPTV EPG Issues
              </h2>
            </div>
            <FaqList items={faqs} />
          </div>
        </Container>
      </Section>
      <TopicClusterLinks path="/help/epg-not-working" />
    </>
  );
}
