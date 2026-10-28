import type { Metadata } from "next";
import { TopicClusterLinks } from "@/components/shared/TopicClusterLinks";
import { GuideByline } from "@/components/shared/GuideByline";
import Link from "next/link";
import {
  Activity,
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Clock,
  Cpu,
  HelpCircle,
  Network,
  RefreshCw,
  Server,
  Shield,
  Sliders,
  Tv,
  Wifi,
  Zap,
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

const title = "How to Troubleshoot and Fix IPTV Buffering: Practical Diagnostic Guide";
const description =
  "A systematic troubleshooting guide to diagnose IPTV buffering, distinguish network starvation from decoder stutter, and stabilize your playback setup.";
const canonical = "/help/iptv-buffering";
// Shorter search-result title; `title` stays the article headline.
const seoTitle = "How to Fix IPTV Buffering: A Practical Diagnostic Guide";
const modifiedDate = getLastModified("/help/iptv-buffering");

/**
 * IPTV Buffering Troubleshooting Guide
 * Canonical: https://www.tryiptv.com/help/iptv-buffering
 * Source of truth: src/lib/site-routes.ts (indexable: true)
 */
export function generateMetadata(): Metadata {
  // Title tag and og:title only; the H1 and Article headline keep the longer wording.
  const metaTitle = "How to Fix IPTV Buffering: Diagnostic Guide";
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
    question: "Why does IPTV buffer even when my internet speed test is fast?",
    answer:
      "Speed tests measure burst throughput over a short window to a nearby test server, often using multi-threaded HTTP connections. Live IPTV streams require continuous, real-time packet delivery from a specific media server. If packet loss, high jitter (delay variation), local Wi-Fi interference, or transit peering congestion interrupts the steady arrival of media segments, the player's buffer empties and playback halts, regardless of your connection's peak speed rating.",
  },
  {
    question: "Is buffering always caused by the IPTV service provider?",
    answer:
      "No. While upstream server capacity or source stream interruptions can cause buffering, issues frequently originate on the local network (such as Wi-Fi airtime congestion or channel interference), in device resource constraints (such as low RAM or CPU thermal throttling), or along intermediate internet routing paths. Systematic isolation helps determine whether a problem is local or upstream.",
  },
  {
    question: "Can changing the IPTV player app fix freezing and stuttering?",
    answer:
      "It can, depending on the root cause. Different media players use different underlying playback engines (such as ExoPlayer, LibVLC, or native platform decoders) and configure buffer sizes differently. If a stream freezes because a hardware decoder misinterprets a specific video profile, an app that supports software decoding or alternate container demuxers may render the stream smoothly.",
  },
  {
    question: "Does changing my DNS server stop video buffering?",
    answer:
      "Changing your DNS resolver (for instance, to Cloudflare 1.1.1.1 or Google 8.8.8.8) alters how domain names are translated into IP addresses. It can resolve failed hostname lookups, reduce initial connection latency, or change which CDN edge node is selected in Anycast or GeoDNS setups. However, DNS does not route media packets or increase active bandwidth once a streaming connection has been established.",
  },
  {
    question: "Does improved playback on a VPN prove my ISP is deliberately throttling IPTV?",
    answer:
      "Not necessarily. Connecting to a VPN routes your traffic through an encrypted tunnel to a VPN exit node, changing your external IP, BGP routing path, peering handoffs, and intermediate network hops. If playback improves, it indicates that the alternate path avoids a bottleneck, transit congestion, or filtering present on your standard connection. While it may indicate traffic management, it does not by itself prove targeted ISP throttling.",
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
  { name: "IPTV Buffering Troubleshooting", item: `${SITE_URL}${canonical}` },
]);


export default function IptvBufferingPage() {
  return (
    <>
      <PageSchema nodes={[articleSchema, breadcrumbSchema]} />

      {/* Hero Header */}
      <Section className="border-b border-white/[0.07] pt-10 pb-14 sm:pt-14 sm:pb-20">
        <Container>
          <Breadcrumb
            items={[
              { label: "Help", href: "/help" },
              { label: "IPTV Buffering Troubleshooting" },
            ]}
            align="center"
          />
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow mb-3">Diagnostic Guide</p>
            <h1 className="font-headline text-3xl font-extrabold leading-[1.15] text-foreground sm:text-4xl lg:text-5xl">
              How to Troubleshoot and Fix IPTV Buffering
            </h1>
            <p className="mx-auto mt-5 max-w-[60ch] text-base leading-7 text-muted-foreground sm:text-lg">
              IPTV buffering has four main causes: a slow or unstable internet connection, a
              Wi-Fi signal problem, an overloaded server, or a device that struggles to decode the
              video. This guide helps you find which one is causing your issue and fix it step by step.
            </p>
            <GuideByline path="/help/iptv-buffering" />
          </div>
        </Container>
      </Section>

      {/* Main Content Article */}
      <Section className="pt-10 pb-12 sm:pt-14 sm:pb-16 lg:pb-16">
        <Container>
          <article className="mx-auto max-w-3xl">
            {/* Quick Answer: What to Check First */}
            <ArticleSummary
              title="What Should You Check First If IPTV Keeps Buffering?"
              className="mb-10 sm:mb-12"
            >
              <p className="font-medium text-foreground">
                IPTV usually buffers because video data is not reaching the player fast or steadily enough: weak Wi-Fi, a busy home network, an overloaded server, or a device that struggles to decode the stream. Most cases improve with Ethernet or 5 GHz Wi-Fi, a restart, or a lower quality. Start with this 60-second check:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-muted-foreground">
                <li>
                  <strong className="text-foreground">Test two alternative streams:</strong> Switch to a channel in a completely different category and one on-demand (VOD) title. If one stream buffers while several others play normally, the issue may be specific to that source or feed rather than your entire connection or playback hardware.
                </li>
                <li>
                  <strong className="text-foreground">Restart your player application:</strong> Force-close and reopen your IPTV player app. Restarting the player can clear temporary app or player state and establish a fresh playback session.
                </li>
                <li>
                  <strong className="text-foreground">Check local Wi-Fi stability:</strong> If streaming over Wi-Fi, test bringing your streaming device closer to your router or connecting via an Ethernet cable to check whether wireless interference is a factor.
                </li>
              </ul>
              <p className="mt-4 text-base sm:text-sm text-muted-foreground border-t border-white/[0.08] pt-3">
                <strong className="text-foreground">Underlying Mechanism:</strong> Buffering happens when incoming data fails to fill the player&apos;s memory buffer at or above the rate it is consumed (buffer underrun), or when device processing limits cause frame rendering lag. Use the symptom matrix and step-by-step test sequence below to identify potential bottlenecks.
              </p>
            </ArticleSummary>

            <ArticleProse>
              <h2>Quick Diagnosis by Observable Symptom</h2>
              <p>
                Users frequently refer to all playback interruptions simply as &quot;buffering,&quot; but distinct symptoms point to entirely different bottlenecks. Match your observable symptom to potential causes and immediate tests:
              </p>
            </ArticleProse>

            {/* Diagnostic Matrix Grid */}
            <div className="my-8 grid gap-4">
              <div className="rounded-xl border border-white/[0.08] bg-[#07080a] p-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg border border-amber-400/20 bg-amber-400/10 p-2 text-amber-400 shrink-0 mt-0.5">
                    <Activity className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-foreground">
                      Symptom: Buffering occurs on every channel across all categories
                    </h3>
                    <p className="mt-1 text-base sm:text-sm text-muted-foreground leading-relaxed">
                      <strong className="text-foreground">Potential Cause:</strong> Local network throughput saturation, home Wi-Fi signal degradation, or primary connection routing constraints.
                    </p>
                    <p className="mt-2 text-base sm:text-sm text-primary/90 font-mono">
                      Immediate Test: Compare wired Ethernet with Wi-Fi, or test streaming over an alternative connection (such as a temporary mobile hotspot).
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-white/[0.08] bg-[#07080a] p-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg border border-sky-400/20 bg-sky-400/10 p-2 text-sky-400 shrink-0 mt-0.5">
                    <Server className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-foreground">
                      Symptom: Only one specific channel buffers, while other live channels play smoothly
                    </h3>
                    <p className="mt-1 text-base sm:text-sm text-muted-foreground leading-relaxed">
                      <strong className="text-foreground">Potential Cause:</strong> Source-specific feed disruption or upstream stream issue.
                    </p>
                    <p className="mt-2 text-base sm:text-sm text-primary/90 font-mono">
                      Immediate Test: Switch to a backup or alternative resolution feed (e.g., HD instead of 4K) for that channel if available. Avoid altering local router or device settings.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-white/[0.08] bg-[#07080a] p-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/10 p-2 text-emerald-400 shrink-0 mt-0.5">
                    <Wifi className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-foreground">
                      Symptom: Buffering occurs on Wi-Fi, but wired Ethernet devices play smoothly
                    </h3>
                    <p className="mt-1 text-base sm:text-sm text-muted-foreground leading-relaxed">
                      <strong className="text-foreground">Potential Cause:</strong> Wireless interference, signal attenuation through distance or walls, or local channel congestion.
                    </p>
                    <p className="mt-2 text-base sm:text-sm text-primary/90 font-mono">
                      Immediate Test: Test wired Ethernet where possible, compare Wi-Fi signal quality, or try a different Wi-Fi band or access point.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-white/[0.08] bg-[#07080a] p-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg border border-purple-400/20 bg-purple-400/10 p-2 text-purple-400 shrink-0 mt-0.5">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-foreground">
                      Symptom: Buffering consistently appears during busy evening or peak periods
                    </h3>
                    <p className="mt-1 text-base sm:text-sm text-muted-foreground leading-relaxed">
                      <strong className="text-foreground">Potential Cause:</strong> Network congestion or routing along your connection path may be one possible cause.
                    </p>
                    <p className="mt-2 text-base sm:text-sm text-primary/90 font-mono">
                      Immediate Test: Perform a comparative test on an alternate connection (such as a mobile hotspot or diagnostic VPN route) to evaluate whether an alternate path behaves differently.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-white/[0.08] bg-[#07080a] p-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg border border-cyan-400/20 bg-cyan-400/10 p-2 text-cyan-400 shrink-0 mt-0.5">
                    <Cpu className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-foreground">
                      Symptom: Audio continues playing smoothly while video skips frames or freezes
                    </h3>
                    <p className="mt-1 text-base sm:text-sm text-muted-foreground leading-relaxed">
                      <strong className="text-foreground">Potential Cause:</strong> Hardware video decoder incompatibility, stream profile mismatch, or device rendering lag rather than a network delivery failure.
                    </p>
                    <p className="mt-2 text-base sm:text-sm text-primary/90 font-mono">
                      Immediate Test: Toggle between Hardware (HW) and Software (SW) decoding in your media player settings.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-white/[0.08] bg-[#07080a] p-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg border border-rose-400/20 bg-rose-400/10 p-2 text-rose-400 shrink-0 mt-0.5">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-foreground">
                      Symptom: Playback starts normally but freezes after continuous viewing
                    </h3>
                    <p className="mt-1 text-base sm:text-sm text-muted-foreground leading-relaxed">
                      <strong className="text-foreground">Potential Cause:</strong> Device heating, app memory pressure, or gradual buffer underrun may be possible factors.
                    </p>
                    <p className="mt-2 text-base sm:text-sm text-primary/90 font-mono">
                      Immediate Test: Restart the player app, check physical device temperature, compare playback in another player or on another device, or test an alternate stream.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <ArticleProse>
              <p data-small-print className="text-xs text-muted-foreground italic">
                *Note: These symptom patterns indicate potential technical factors, but are not guaranteed diagnoses. Concurrent local conditions (such as background network activity alongside wireless interference) can produce overlapping symptoms.
              </p>

              <h2>Practical Step-by-Step Troubleshooting Order</h2>
              <p>
                Follow these diagnostic steps in sequential order to systematically isolate network, hardware, application, and upstream delivery bottlenecks without making unnecessary changes to your setup.
              </p>

              <h3>Step 1: Test Connection Stability (Not Just Raw Speed)</h3>
              <p>
                A high speed test result does not ensure stable live video streaming. Standard speed test utilities measure peak, multi-threaded burst throughput over a short interval to a nearby test server. Live IPTV streams require continuous, single-source packet delivery where stream stability and low packet loss matter far more than maximum burst capacity.
              </p>
              <p>
                Authoritative streaming platform guidance provides practical reference values for continuous video delivery:
              </p>
              <ul>
                <li>
                  <strong>Netflix reference benchmarks:</strong> Approximately 3 Mbps for 720p HD, 5 Mbps for 1080p Full HD, and 15 Mbps for 4K UHD streaming.
                </li>
                <li>
                  <strong>Apple reference benchmarks:</strong> Approximately 25 Mbps minimum recommended for 4K Apple TV streaming.
                </li>
              </ul>
              <p>
                <strong>Important Context:</strong> These are examples from major streaming platforms, not universal IPTV requirements or guarantees. Live streams can vary in bitrate depending on the source broadcast, frame rate, and compression profile.
              </p>
              <p>
                <strong>Simultaneous Streaming Consideration:</strong> Each concurrent stream on your network consumes additional bandwidth. As an illustrative calculation: if two devices stream 4K video simultaneously, they would consume roughly 30–50 Mbps of stable capacity based on those platform examples, in addition to normal household internet usage. For more background on bandwidth, review our guide on{" "}
                <Link href="/guides/iptv-internet-speed" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
                  IPTV internet speed requirements
                </Link>
                .
              </p>
              <p>
                <strong>Packet Loss and Delay Variation:</strong> Streaming stability depends on steady packet arrival. In TCP-based streaming, dropped packets require retransmissions. As defined in RFC 3393, packet delay variation (jitter) describes fluctuations in transit time between packets. (Note that RFC 3393 defines the measurement metric, not an IPTV-specific acceptability threshold.) If retransmitted or delayed packets fail to arrive before the player consumes its buffered data, playback halts.
              </p>

              <h3>Step 2: Compare Wired Ethernet vs. Wi-Fi</h3>
              <p>
                Wireless connections are susceptible to radio frequency (RF) interference and physical signal attenuation. When diagnosing Wi-Fi stability:
              </p>
              <ul>
                <li>
                  <strong>Test Wired Ethernet Where Possible:</strong> A direct physical cable eliminates wireless channel contention and RF interference. Some TVs and streaming devices use 100 Mbps Ethernet interfaces. Check the exact device specifications before treating the Ethernet port as a throughput limitation. Even so, a steady wired connection often provides more consistent delivery than an erratic wireless signal.
                </li>
                <li>
                  <strong>Compare Wi-Fi Connection Quality:</strong> Test moving the streaming device closer to the router or minimizing physical obstructions.
                </li>
                <li>
                  <strong>Try a Different Wi-Fi Band or Access Point:</strong> Higher-frequency Wi-Fi (such as 5 GHz) can offer higher throughput and less interference at close range, but attenuates more quickly through distance and solid walls. Lower-frequency Wi-Fi (such as 2.4 GHz) travels farther through walls, but can suffer from local network congestion. If your router supports manual channel selection, test a less congested Wi-Fi channel appropriate for your region and network configuration. Test both bands to see which provides more stable playback in your physical environment.
                </li>
              </ul>

              <h3>Step 3: Power-Cycle Device, Player, and Local Router</h3>
              <p>
                Compact HDMI streaming devices (such as Fire TV Stick and Chromecast) have limited internal RAM (often 1 GB to 2 GB) and modest passive cooling. Over time, background processes and accumulated video cache can exhaust available system memory:
              </p>
              <ul>
                <li>
                  <strong>Clear App Cache:</strong> In your device application management menu, locate your IPTV player and select &quot;Clear Cache&quot; (avoid &quot;Clear Data&quot; unless you are prepared to re-enter your account credentials).
                </li>
                <li>
                  <strong>Restart the Streaming Device:</strong> Perform a full system reboot from the device settings menu. This helps clear temporary app state and halts background processes that may contend for memory.
                </li>
                <li>
                  <strong>Restart the Home Router:</strong> Power the router/device off briefly, then restart it and allow the connection to fully re-establish to refresh local network routing tables and connection states.
                </li>
              </ul>

              <h3>Step 4: Test Alternative Channels and VOD Streams</h3>
              <p>
                Before reconfiguring player settings, systematically compare playback across multiple channel sources:
              </p>
              <ul>
                <li>Test a channel in an entirely different geographic or content category.</li>
                <li>Test an on-demand movie or TV series (VOD) asset.</li>
              </ul>
              <p>
                If on-demand video streams or other live channels play without interruption while a specific channel freezes, the issue may be specific to that source or feed rather than your entire connection or playback hardware.
              </p>

              <h3>Step 5: Test Hardware vs. Software Video Decoder</h3>
              <p>
                When an IPTV stream reaches your device, the media player passes compressed video data (such as H.264 or HEVC/H.265) to a decoder to render visible frames on screen. Modern streaming platforms support two primary decoding architectures:
              </p>
              <ul>
                <li>
                  <strong>Hardware Decoding (HW):</strong> Routes the video bitstream to dedicated silicon circuits built into the device processor. This mode is energy-efficient and keeps CPU temperatures low. However, hardware decoders rely on strict silicon profiles. If an incoming stream uses an unusual encoding profile or non-standard frame rate, the hardware decoder can drop frames, desync audio, or render a black screen.
                </li>
                <li>
                  <strong>Software Decoding (SW):</strong> Uses the device CPU cores (commonly via software decoding libraries such as FFmpeg) to decode video frames. Software decoding offers broader codec flexibility, but places heavy processing demands on the CPU. On compact streaming sticks, software decoding a high-bitrate 1080p60 or 4K stream can cause thermal throttling and severe stuttering.
                </li>
              </ul>
              <p>
                <strong>Diagnostic Action:</strong> In your player&apos;s playback settings (such as in{" "}
                <Link href="/players/tivimate" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
                  TiviMate
                </Link>{" "}
                or{" "}
                <Link href="/players/iptv-smarters" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
                  IPTV Smarters
                </Link>
                ), test switching between Hardware and Software decoding to check whether one mode handles the stream profile more smoothly on your specific hardware.
              </p>

              <h3>Step 6: Check Player Buffer and Cache Settings</h3>
              <p>
                Many IPTV media players provide buffer or caching preferences designed to smooth out brief network fluctuations:
              </p>
              <ul>
                <li>
                  <strong>Player-Specific Buffer Controls:</strong> In apps that expose buffer or cache options (such as TiviMate or Televizo), check playback or player settings to test different buffer sizes (such as small, medium, or large presets). Menu paths and available options vary depending on the application version.
                </li>
                <li>
                  <strong>Underlying Playback Engines:</strong> Modern player applications often build on playback engines (such as ExoPlayer or LibVLC) that allow developers to configure caching and loading behavior. Individual player apps configure these parameters differently.
                </li>
              </ul>
              <p>
                <strong>Operational Tradeoff:</strong> Increasing buffer size provides a larger safety reserve against brief network fluctuations, but can increase channel change times and consume additional memory on resource-constrained devices.
              </p>

              <h3>Step 7: Perform an Alternate Route / VPN Diagnostic Comparison</h3>
              <p>
                Internet traffic travels across multiple autonomous systems, transit backbones, and interconnection points. Intermittent peering congestion between transit carriers can impair packet arrival even when your local line speed is functioning normally.
              </p>
              <p>
                To isolate whether routing path congestion is affecting your stream, run an A/B comparative test:
              </p>
              <ul>
                <li>
                  <strong>Mobile Hotspot Comparison:</strong> Connect your streaming device temporarily to a cellular 4G or 5G hotspot. If playback stabilizes on the cellular link while stuttering on your home broadband, the issue is localized to your home connection or ISP routing path.
                </li>
                <li>
                  <strong>VPN Diagnostic Test:</strong> Routing traffic through a virtual private network alters your external IP, BGP routing path, and peering handoffs.
                </li>
              </ul>
              <p>
                <strong>Cautious Interpretation:</strong> While network management by an ISP is one possible cause, transit peering congestion, routing bottlenecks, or regional CDN maintenance can produce identical symptoms. A VPN should be used as an A/B diagnostic comparison rather than assumed to be a guaranteed fix, as VPN encryption and routing overhead can also introduce latency depending on the server selected.
              </p>

              <h3>Step 8: Isolate Upstream Server and Source Feed Issues</h3>
              <p>
                If you have completed the diagnostic sequence and confirmed that:
              </p>
              <ul>
                <li>Other streaming services and household devices run smoothly on your local network,</li>
                <li>Your device is connected via Ethernet or clean Wi-Fi with verified throughput,</li>
                <li>Restarting the player and toggling HW/SW video decoders does not eliminate the stutter, and</li>
                <li>The exact same channel stutters across multiple devices and distinct networks (e.g., broadband and cellular),</li>
              </ul>
              <p>
                the issue is more likely upstream—such as at the source feed, provider middleware, or transit distribution network. When an upstream issue occurs, modifying local router or device settings will not resolve it. In this case, notify customer support or monitor alternative channels until the upstream stream is stabilized.
              </p>
            </ArticleProse>

            {/* Contextual Action Card */}
            <div className="mt-12 sm:mt-14 mb-0 rounded-2xl border border-white/[0.08] bg-[#07080a] p-6 sm:p-8">
              <h3 className="text-lg font-bold text-foreground">
                Testing Stream Stability on Your Setup
              </h3>
              <p className="mt-2 text-base sm:text-sm leading-6 text-muted-foreground">
                Before purchasing new hardware or altering network configurations, isolate whether buffering stems from your local Wi-Fi, player app decoding, or upstream delivery. If you are evaluating service reliability, TryIPTV provides structured 24-hour evaluation access and multi-connection plans so you can test stream consistency directly on your home devices.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button asChild size="sm" variant="outline">
                  <Link href="/iptv-free-trial">
                    Explore Free Trial <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Link>
                </Button>
                <Button asChild size="sm" variant="ghost">
                  <Link href="/help/iptv-not-working">View General Help Triage</Link>
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
                Common Questions About IPTV Buffering
              </h2>
            </div>
            <FaqList items={faqs} />
          </div>
        </Container>
      </Section>
      <TopicClusterLinks path="/help/iptv-buffering" />
    </>
  );
}
