import type { Metadata } from "next";
import { TopicClusterLinks } from "@/components/shared/TopicClusterLinks";
import { GuideByline } from "@/components/shared/GuideByline";
import Link from "next/link";
import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Cpu,
  FileText,
  Globe,
  HelpCircle,
  Layers,
  ListFilter,
  Lock,
  MessageSquare,
  PlaySquare,
  RefreshCw,
  Server,
  ShieldAlert,
  Smartphone,
  Tv,
  Wifi,
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

const title = "IPTV Not Working? Start With This Troubleshooting Checklist";
const description =
  "A master troubleshooting checklist to isolate why your IPTV is not working: authentication errors, playlist failures, buffering streams, blank guides, or app crashes.";
const canonical = "/help/iptv-not-working";
// Shorter search-result description; `description` stays in the article schema.
const metaDescription =
  "A troubleshooting checklist to isolate why IPTV is not working: login errors, playlist failures, buffering streams, blank guides, or app crashes.";
const modifiedDate = getLastModified("/help/iptv-not-working");

/**
 * IPTV Not Working Master Troubleshooting Router
 * Canonical: https://www.tryiptv.com/help/iptv-not-working
 * Source of truth: src/lib/site-routes.ts (indexable: true)
 */
export function generateMetadata(): Metadata {
  // Title tag and og:title only; the H1 and Article headline keep the longer wording.
  const metaTitle = "IPTV Not Working? Troubleshooting Checklist";
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
    question: "Why is my IPTV suddenly not working at all?",
    answer:
      "A complete failure can happen at several distinct layers: your home internet connection might be interrupted, the player application may have crashed or run out of memory, your account credentials might have expired, or the service provider's server endpoint may be undergoing maintenance. Working through a rapid layer-by-layer checklist helps you identify which specific link in the chain is broken.",
  },
  {
    question: "How do I know if the problem is my internet or my IPTV service?",
    answer:
      "First test whether other high-bandwidth applications (such as streaming platforms or web browsers) work normally on the same device. If the internet works across all devices, test your IPTV service on a second device or switch temporarily to a mobile cellular hotspot. If the IPTV service fails across multiple independent devices and networks, the issue is likely upstream at the provider or server level.",
  },
  {
    question: "Why do some channels work while others show a black screen?",
    answer:
      "When some channels stream perfectly while others fail to load, the issue is localized to specific media streams rather than your account or app. Individual channels may be temporarily offline at the source feed, undergoing maintenance, or encoded in a video format that your streaming device's hardware decoder does not support.",
  },
  {
    question: "Does restarting my router help with IPTV issues?",
    answer:
      "Restarting your router can resolve local network congestion, clear stale DNS cache entries, and refresh your device's local IP address lease. While it does not fix server-side provider outages or expired credentials, power cycling your router and streaming device is an effective early troubleshooting step for mysterious connection stalls.",
  },
  {
    question: "What should I do if my IPTV player crashes every time I open it?",
    answer:
      "App crashes on launch are usually caused by local device resource exhaustion or corrupted app storage. Force close the application from your device's settings menu, check that your streaming device has sufficient internal storage space available, and restart the device. If crashes continue, clearing the app cache or reinstalling the player application can restore clean operation.",
  },
  {
    question: "What details should I provide when contacting IPTV customer support?",
    answer:
      "To receive accurate assistance, provide your device model, the exact name and version of your player app, the connection format used (Xtream Codes API or M3U), the specific error message displayed, and whether you tested the service on an alternate device or network. Never post or share your account password in support tickets or public forums.",
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
  { name: "Master Troubleshooting Checklist", item: `${SITE_URL}${canonical}` },
]);


export default function IptvNotWorkingPage() {
  return (
    <>
      <PageSchema nodes={[articleSchema, breadcrumbSchema]} />

      {/* Hero Header */}
      <Section className="border-b border-white/[0.07] pt-10 pb-14 sm:pt-14 sm:pb-20">
        <Container>
          <Breadcrumb
            items={[
              { label: "Help", href: "/help" },
              { label: "Master Troubleshooting Checklist" },
            ]}
            align="center"
          />
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow mb-3">Master Diagnostic Router</p>
            <h1 className="font-headline text-3xl font-extrabold leading-[1.15] text-foreground sm:text-4xl lg:text-5xl">
              IPTV Not Working? Start With This Troubleshooting Checklist
            </h1>
            <p className="mx-auto mt-5 max-w-[60ch] text-base leading-7 text-muted-foreground sm:text-lg">
              When IPTV stops working, match what you see to one of six symptoms: the login is rejected, the
              playlist loads 0 channels, channels freeze or buffer, the TV guide is blank, the player app
              crashes, or nothing works on any device. Each symptom points to a different cause, and each has
              its own fix below.
            </p>
            <GuideByline path="/help/iptv-not-working" />
          </div>
        </Container>
      </Section>

      {/* Main Content Article */}
      <Section className="pt-10 pb-12 sm:pt-14 sm:pb-16 lg:pb-16">
        <Container>
          <article className="mx-auto max-w-3xl">
            {/* Quick Answer Callout */}
            <ArticleSummary
              title="Immediate Action: Identify Your Failure Layer First"
              className="mb-10 sm:mb-12"
            >
              <p>
                IPTV stops working for one of six reasons: a login authentication failure, a playlist that
                won&apos;t download, channels that freeze during playback, a blank TV guide, an app that crashes
                on launch, or a complete failure across every device. Matching your exact symptom to the right
                cause is the fastest path to a fix.
              </p>
              <p className="mt-3">
                Saying &quot;my IPTV is not working&quot; is like saying &quot;my internet is broken.&quot; The failure
                could be in your <strong className="font-semibold text-foreground">streaming app</strong>, your{" "}
                <strong className="font-semibold text-foreground">account authentication</strong>, your{" "}
                <strong className="font-semibold text-foreground">playlist download</strong>, the{" "}
                <strong className="font-semibold text-foreground">video playback stream</strong>, or the{" "}
                <strong className="font-semibold text-foreground">schedule guide</strong>.
              </p>
              <p className="mt-3">
                Do not attempt dozens of random fixes—such as resetting your TV or re-entering URLs repeatedly—before
                identifying your exact symptom. Match your problem against the six symptoms below to jump straight to
                the specialized guide designed for your issue.
              </p>
            </ArticleSummary>

            <ArticleProse>
              <h2 id="triage" className="scroll-mt-4">Master Triage: Match Your Symptom to the Right Fix</h2>
              <p>
                Review the six primary failure symptoms below. Each card links directly to our dedicated,
                in-depth technical guide for that specific layer:
              </p>
              <p>
                Seeing an error code instead? Look it up in the{" "}
                <Link href="/help/iptv-error-codes" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">IPTV error codes list</Link>.
              </p>
            </ArticleProse>

            {/* Master Triage Router Cards */}
            <div className="my-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#07080a] p-6 shadow-sm transition-all hover:border-white/[0.14]">
                <div>
                  <div className="flex items-center gap-2 text-base font-bold text-foreground">
                    <Lock className="h-5 w-5 text-amber-400" />
                    Symptom 1: Login Rejected or Auth Failed
                  </div>
                  <div className="mt-3 space-y-2 text-base sm:text-sm leading-6 text-muted-foreground">
                    <p>
                      <strong>What happens:</strong> The player displays &quot;Invalid Details,&quot;
                      &quot;Authentication Failed,&quot; &quot;Account Expired,&quot; or an HTTP 401/403 error when
                      entering credentials.
                    </p>
                    <p>
                      <strong>Typical causes:</strong> Hidden trailing spaces, case-sensitivity mistakes, missing port
                      numbers, or exceeding active device connection limits.
                    </p>
                  </div>
                </div>
                <div className="pt-4">
                  <Button asChild size="sm" variant="outline" className="w-full justify-between">
                    <Link href="/help/iptv-login-not-working">
                      <span>Fix Login Errors</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#07080a] p-6 shadow-sm transition-all hover:border-white/[0.14]">
                <div>
                  <div className="flex items-center gap-2 text-base font-bold text-foreground">
                    <FileText className="h-5 w-5 text-blue-400" />
                    Symptom 2: Playlist Won&apos;t Load (0 Channels)
                  </div>
                  <div className="mt-3 space-y-2 text-base sm:text-sm leading-6 text-muted-foreground">
                    <p>
                      <strong>What happens:</strong> The app shows &quot;Download Error,&quot; &quot;Failed to Load
                      Playlist,&quot; a permanent loading spinner during import, or loads zero channels.
                    </p>
                    <p>
                      <strong>Typical causes:</strong> URL syntax typos, DNS resolution failures, unparseable playlist
                      headers, or device memory exhaustion on massive playlists.
                    </p>
                  </div>
                </div>
                <div className="pt-4">
                  <Button asChild size="sm" variant="outline" className="w-full justify-between">
                    <Link href="/help/m3u-not-loading">
                      <span>Fix Playlist Loading</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#07080a] p-6 shadow-sm transition-all hover:border-white/[0.14]">
                <div>
                  <div className="flex items-center gap-2 text-base font-bold text-foreground">
                    <PlaySquare className="h-5 w-5 text-rose-400" />
                    Symptom 3: Channels Load but Freeze or Buffer
                  </div>
                  <div className="mt-3 space-y-2 text-base sm:text-sm leading-6 text-muted-foreground">
                    <p>
                      <strong>What happens:</strong> Channels start playing, but playback stutters, loops every few
                      seconds, pauses with a spinning buffer icon, or drops audio.
                    </p>
                    <p>
                      <strong>Typical causes:</strong> Local Wi-Fi jitter, hardware decoder bottlenecks, ISP transit
                      congestion, or server streaming endpoint overload.
                    </p>
                  </div>
                </div>
                <div className="pt-4">
                  <Button asChild size="sm" variant="outline" className="w-full justify-between">
                    <Link href="/help/iptv-buffering">
                      <span>Fix Buffering Issues</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#07080a] p-6 shadow-sm transition-all hover:border-white/[0.14]">
                <div>
                  <div className="flex items-center gap-2 text-base font-bold text-foreground">
                    <ListFilter className="h-5 w-5 text-emerald-400" />
                    Symptom 4: Video Works but Guide Is Blank or Wrong
                  </div>
                  <div className="mt-3 space-y-2 text-base sm:text-sm leading-6 text-muted-foreground">
                    <p>
                      <strong>What happens:</strong> Video plays smoothly, but the TV guide displays &quot;No
                      Information,&quot; shows an empty grid, or listings are shifted by several hours.
                    </p>
                    <p>
                      <strong>Typical causes:</strong> EPG source URL unreachable, channel identifier mismatch,
                      corrupted EPG database cache, or streaming device system clock offset.
                    </p>
                  </div>
                </div>
                <div className="pt-4">
                  <Button asChild size="sm" variant="outline" className="w-full justify-between">
                    <Link href="/help/epg-not-working">
                      <span>Fix TV Guide Issues</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            <ArticleProse>
              <h3>Symptom 5: The Player App Won&apos;t Open or Crashes on Launch</h3>
              <p>
                If the media player application itself crashes back to your streaming device&apos;s home screen,
                freezes immediately upon opening, or refuses to launch, the problem is localized to your device or
                application software layer rather than your IPTV subscription:
              </p>
              <ul>
                <li>
                  <strong>Force Stop the App:</strong> Navigate to your streaming device settings (e.g., Fire TV
                  Settings &gt; Applications &gt; Manage Installed Applications, or Android TV Apps menu), select your
                  player, and choose <em>Force Stop</em>.
                </li>
                <li>
                  <strong>Restart the Device:</strong> Perform a full power cycle. Unplug your streaming stick or
                  smart TV from power for 30 seconds to flush operating system memory and temporary background
                  processes.
                </li>
                <li>
                  <strong>Verify Available Storage:</strong> Low flash storage is a leading cause of player crashes
                  on compact streaming sticks. Check device storage in settings. If less than 500 MB remains free,
                  uninstall unused applications to give your player room to write its cache.
                </li>
                <li>
                  <strong>Check for App Updates:</strong> Open your device&apos;s app store to ensure the player
                  software is running the latest stable build.
                </li>
                <li>
                  <strong>Clear App Cache (or Reinstall):</strong> In your device&apos;s application manager, clear
                  the app cache. If corruption persists, performing a clean reinstall of the player application
                  often resolves stubborn crash loops.
                </li>
              </ul>

              <h3>Symptom 6: Complete Failure Across Every Device and Player</h3>
              <p>
                If you have tested your IPTV service across multiple independent devices (e.g., your television and a
                mobile phone), using two different player applications, and tested across both your home Wi-Fi and a
                mobile cellular hotspot:
              </p>
              <p>
                When a service fails identically across all devices and different network paths, the issue is highly
                likely to be upstream. Possible causes include:
              </p>
              <ul>
                <li>Provider server or middleware maintenance.</li>
                <li>Temporary domain or DNS endpoint reachability disruptions.</li>
                <li>Account-level expiration or administrative suspension.</li>
                <li>Upstream transit path disruptions between the provider and your regional network.</li>
              </ul>
              <p className="text-base sm:text-sm text-muted-foreground">
                <em>Caution:</em> While multi-device, multi-network failure strongly suggests an upstream cause, it does
                not definitively prove a permanent outage. Service providers frequently perform routine maintenance
                or experience temporary network failovers.
              </p>

              <h2>The Two-Minute Triage Checklist</h2>
              <p>
                To isolate where the breakdown is occurring in under two minutes, work through this rapid sequential
                diagnostic:
              </p>
            </ArticleProse>

            {/* Two-Minute Checklist Table */}
            {/* A real <table> (so answer engines read rows and headers), laid out with the same grid as before. */}
            <table className="my-8 block w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-[#07080a]">
              <caption className="sr-only">Two-minute IPTV checklist</caption>
              {/* Header shows from sm up; stacked mobile cells repeat it via CSS-generated labels (data-label). */}
              <thead className="hidden sm:block">
                <tr className="grid grid-cols-12 bg-white/[0.03] px-4 py-3 text-xs sm:text-sm font-bold text-foreground border-b border-white/[0.08]">
                  <th scope="col" className="col-span-1 text-left font-bold">#</th>
                  <th scope="col" className="col-span-5 text-left font-bold">Check Point</th>
                  <th scope="col" className="col-span-6 text-left font-bold">Diagnostic Routing</th>
                </tr>
              </thead>
              <tbody className="block">
              {[
                {
                  step: "1",
                  check: "Does the device have active internet access?",
                  route: "If no, troubleshoot local Wi-Fi router or network connection.",
                },
                {
                  step: "2",
                  check: "Does the IPTV player app open cleanly?",
                  route: "If crashing, follow Symptom 5 (force stop, storage check, reboot).",
                },
                {
                  step: "3",
                  check: "Are credentials or server login accepted?",
                  route: "If rejected, see our IPTV Login Troubleshooting Guide.",
                  link: "/help/iptv-login-not-working",
                },
                {
                  step: "4",
                  check: "Does the playlist and channel lineup download?",
                  route: "If failing, see our M3U Not Loading Troubleshooting Guide.",
                  link: "/help/m3u-not-loading",
                },
                {
                  step: "5",
                  check: "Do video streams start and play smoothly?",
                  route: "If stuttering or freezing, see our IPTV Buffering Guide.",
                  link: "/help/iptv-buffering",
                },
                {
                  step: "6",
                  check: "Does video play but the schedule guide is blank?",
                  route: "If guide only, see our EPG Not Working Troubleshooting Guide.",
                  link: "/help/epg-not-working",
                },
                {
                  step: "7",
                  check: "Does switching to cellular hotspot change the result?",
                  route: "Isolates home Wi-Fi and ISP routing from provider server status.",
                },
                {
                  step: "8",
                  check: "Does the service work on a secondary device?",
                  route: "Isolates hardware/app issues from account/upstream failures.",
                },
              ].map((item, idx) => (
                <tr
                  key={item.step}
                  className={`grid grid-cols-1 gap-2 px-4 py-3.5 text-xs sm:text-sm leading-6 sm:grid-cols-12 ${
                    idx !== 0 ? "border-t border-white/[0.08]" : ""
                  } ${idx % 2 === 1 ? "bg-white/[0.02]" : ""}`}
                >
                  <td data-label="#" className="font-bold text-primary sm:col-span-1 before:content-[attr(data-label)] sm:before:content-none">{item.step}</td>
                  <th scope="row" data-label="Check Point: " className="text-left font-semibold text-foreground sm:col-span-5 before:font-semibold before:text-foreground/80 before:content-[attr(data-label)] sm:before:content-none">{item.check}</th>
                  <td data-label="Diagnostic Routing: " className="text-muted-foreground sm:col-span-6 before:font-semibold before:text-foreground/80 before:content-[attr(data-label)] sm:before:content-none">
                    {item.link ? (
                      <Link href={item.link} className="tap-target text-primary hover:underline font-medium">
                        {item.route}
                      </Link>
                    ) : (
                      item.route
                    )}
                  </td>
                </tr>
              ))}
              </tbody>
            </table>

            <ArticleProse>
              <h2>Rapid Network Baseline Check</h2>
              <p>
                Before assuming a subscription or server failure, take 60 seconds to verify basic local network
                health:
              </p>
              <ul>
                <li>
                  <strong>Verify Internet Reachability:</strong> Launch another streaming application (such as
                  YouTube or a web browser) on the same streaming device to confirm active internet connectivity.
                </li>
                <li>
                  <strong>Power Cycle Your Home Router:</strong> Unplug your router from power for 30 seconds. This
                  clears congested routing tables, resolves local IP address conflicts, and refreshes DNS lookup
                  caches.
                </li>
                <li>
                  <strong>Test Wired Ethernet if Available:</strong> If using Wi-Fi, test an Ethernet cable
                  connection or move closer to the router. High local Wi-Fi packet loss can cause streams and
                  playlists to fail unexpectedly.
                </li>
              </ul>
              <p className="text-base sm:text-sm text-muted-foreground">
                <em>Note:</em> Raw download speed alone does not guarantee smooth streaming. Video delivery requires
                low packet loss and steady latency rather than just burst bandwidth.
              </p>

              <h2 id="local-vs-upstream" className="scroll-mt-4">Local Issue vs. Upstream Service Issue</h2>
              <p>
                To avoid wasting time debugging the wrong system, use this isolation framework to distinguish between
                local problems and upstream server problems:
              </p>
            </ArticleProse>

            {/* Local vs Upstream Isolation Grid */}
            <div className="my-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/[0.08] bg-[#07080a] p-6 shadow-sm transition-all hover:border-white/[0.14]">
                <div className="flex items-center gap-2 text-base font-bold text-foreground">
                  <Smartphone className="h-5 w-5 text-primary" />
                  Indicators of a Local Issue
                </div>
                <div className="mt-3 space-y-2 text-base sm:text-sm leading-6 text-muted-foreground">
                  <p>The failure is likely local to your device, network, or app when:</p>
                  <ul className="list-disc space-y-1 pl-5">
                    <li>The service works normally on your phone but fails on your TV.</li>
                    <li>The app crashes back to the home screen on launch.</li>
                    <li>Other apps on the same device also report connection drops.</li>
                    <li>Your device system clock or timezone is out of sync.</li>
                    <li>Credentials contain a typographical mistake or trailing space.</li>
                  </ul>
                </div>
              </div>

              <div className="rounded-2xl border border-white/[0.08] bg-[#07080a] p-6 shadow-sm transition-all hover:border-white/[0.14]">
                <div className="flex items-center gap-2 text-base font-bold text-foreground">
                  <Server className="h-5 w-5 text-amber-400" />
                  Indicators of an Upstream Issue
                </div>
                <div className="mt-3 space-y-2 text-base sm:text-sm leading-6 text-muted-foreground">
                  <p>The failure is likely upstream at the provider or network transit when:</p>
                  <ul className="list-disc space-y-1 pl-5">
                    <li>The service fails across multiple devices and separate networks (Wi-Fi and mobile data).</li>
                    <li>The server URL returns an HTTP 500, 502, or 503 error status code.</li>
                    <li>A specific single channel is completely black while all others stream smoothly.</li>
                    <li>Login was accepted previously but was abruptly rejected across all apps.</li>
                  </ul>
                </div>
              </div>
            </div>

            <ArticleProse>
              <h2 id="contact-support" className="scroll-mt-4">How to Contact Support with Useful Information</h2>
              <p>
                If your troubleshooting indicates an upstream provider or account issue, reaching out to customer
                support is the logical next step. To get your ticket resolved rapidly, provide actionable technical
                context in your initial message:
              </p>
              <ul>
                <li>
                  <strong>Device Model:</strong> Specify your exact hardware (e.g., Amazon Fire TV Stick 4K Max, Nvidia
                  Shield TV Pro, Apple TV 4K, Samsung Smart TV).
                </li>
                <li>
                  <strong>App Name and Version:</strong> State the exact player software and version number (e.g.,
                  TiviMate 4.7.0, IPTV Smarters Pro 4.0).
                </li>
                <li>
                  <strong>Connection Method:</strong> Mention whether you connect via an Xtream Codes API login or an
                  M3U playlist link.
                </li>
                <li>
                  <strong>Exact Error Text:</strong> Quote the exact message or numerical code displayed on screen
                  (e.g., &quot;HttpDataSourceException: 401,&quot; &quot;ParserException,&quot; &quot;Download
                  Timeout&quot;).
                </li>
                <li>
                  <strong>Scope of the Problem:</strong> Clarify whether the issue affects every channel or only a
                  specific network or category.
                </li>
                <li>
                  <strong>Isolation Steps Taken:</strong> Mention whether you tested on a second device or an
                  alternate network (like a mobile hotspot).
                </li>
              </ul>

              <div className="my-6 rounded-2xl border border-red-500/25 bg-red-500/[0.04] p-5 text-base sm:text-sm leading-6 text-muted-foreground">
                <div className="flex items-center gap-2 font-semibold text-foreground">
                  <ShieldAlert className="h-5 w-5 text-red-400" />
                  Security Warning: Never Share Passwords Publicly
                </div>
                <p className="mt-2">
                  Never post your account password, full M3U URLs, or private subscription credentials in public
                  forums, community chat rooms, or social media comments. Only communicate with your provider
                  through their official, authenticated customer support portal.
                </p>
              </div>
            </ArticleProse>

            {/* Contextual TryIPTV Note */}
            <div className="mt-12 sm:mt-14 mb-0 rounded-2xl border border-white/[0.08] bg-[#07080a] p-6 sm:p-8">
              <h3 className="text-lg font-bold text-foreground">
                Dependable Streaming Architecture with TryIPTV
              </h3>
              <p className="mt-2 text-base sm:text-sm leading-6 text-muted-foreground">
                Experiencing persistent downtime or unreliable connections? Use the free trial to test playback
                on your own devices and networks.
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
                Master Troubleshooting FAQ
              </h2>
            </div>
            <FaqList items={faqs} />
          </div>
        </Container>
      </Section>
      <TopicClusterLinks path="/help/iptv-not-working" />
    </>
  );
}
