import type { Metadata } from "next";
import { TopicClusterLinks } from "@/components/shared/TopicClusterLinks";
import { GuideByline } from "@/components/shared/GuideByline";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Tv,
  Wifi,
  HardDrive,
  Activity,
  Layers,
  Network,
  Cpu,
  AlertCircle,
  HelpCircle,
  Smartphone,
  Gauge,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { Container } from "@/components/shared/Container";
import { PageSchema } from "@/components/shared/Schema";
import { Section } from "@/components/shared/Section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArticleProse, ArticleSummary } from "@/components/guide";
import { FaqList, type FaqItem } from "@/components/sections/FAQ";
import { generateArticleSchema, generateBreadcrumbSchema } from "@/lib/schema";
import { PRODUCT_TRUTHS, SITE_URL, generateMetadata as generatePageMetadata } from "@/lib/site-config";
import { getLastModified } from "@/lib/site-routes";

const title = "IPTV Internet Speed: How Much Bandwidth Do You Need? | TryIPTV";
const description =
  "Learn how much internet speed IPTV needs for HD, Full HD and 4K streaming, how to plan bandwidth for two streams, and why connection stability matters.";
const canonical = "/guides/iptv-internet-speed";
// Shorter search-result title; `title` stays the article headline.
const seoTitle = "IPTV Internet Speed: How Much Bandwidth Do You Need?";
const modifiedDate = getLastModified("/guides/iptv-internet-speed");

export function generateMetadata(): Metadata {
  // Title tag and og:title only; the H1 and Article headline keep the longer wording.
  const metaTitle = "IPTV Internet Speed: How Much Do You Need?";
  return {
    ...generatePageMetadata({
      title: metaTitle,
      description,
      canonical,
      noIndex: false,
    }),
    title: {
      absolute: `${metaTitle} | TryIPTV`,
    },
  };
}

interface BandwidthTier {
  resolution: string;
  bitrateRange: string;
  headroomSingle: string;
  headroomTwoStreams: string;
  notes: string;
}

const bandwidthTiers: BandwidthTier[] = [
  {
    resolution: "SD (Standard Definition / 480p)",
    bitrateRange: "1.5 – 3 Mbps",
    headroomSingle: "8 – 10 Mbps",
    headroomTwoStreams: "15 – 20 Mbps",
    notes: "Lightweight baseline for legacy channels or low-bandwidth mobile connections.",
  },
  {
    resolution: "HD (High Definition / 720p)",
    bitrateRange: "3 – 6 Mbps",
    headroomSingle: "15 – 20 Mbps",
    headroomTwoStreams: "25 – 35 Mbps",
    notes: "Standard broadcast format for news and entertainment channels at 30–50 FPS.",
  },
  {
    resolution: "Full HD (1080p / 50–60 FPS)",
    bitrateRange: "7 – 15 Mbps",
    headroomSingle: "25 – 35 Mbps",
    headroomTwoStreams: "40 – 50 Mbps",
    notes: "High-framerate sports broadcasts require higher sustained bitrates than standard film.",
  },
  {
    resolution: "4K Ultra HD (2160p / UHD)",
    bitrateRange: "18 – 35 Mbps",
    headroomSingle: "50 – 60 Mbps",
    headroomTwoStreams: "80 – 100+ Mbps",
    notes: "Heavily dependent on HEVC/H.265 compression efficiency; demands steady connection stability.",
  },
];

const faqs: FaqItem[] = [
  {
    question: "What internet speed do I need for IPTV?",
    answer:
      "There is no single universal speed requirement for IPTV. Bandwidth needs depend on stream bitrate, video resolution, compression codec, and how many devices share your connection simultaneously. Mainstream streaming platforms themselves publish different speed recommendations because encoding and player buffer designs vary. As a general planning guideline, an approximate 15–25 Mbps connection provides useful practical headroom for a single Full HD (1080p) stream, while 4K streaming generally benefits from 50+ Mbps.",
  },
  {
    question: "Is 10 Mbps fast enough to stream IPTV?",
    answer:
      "A stable 10 Mbps connection is typically sufficient for Standard Definition (480p) and standard HD (720p) streams. However, it leaves minimal headroom for high-bitrate Full HD sports broadcasts or other household internet activity. If someone else on your network downloads a file or streams a video at the same time, a 10 Mbps connection may experience momentary buffering.",
  },
  {
    question: "Is 25 Mbps enough for IPTV streaming?",
    answer:
      "Yes, 25 Mbps is generally a safe planning target for a single Full HD (1080p) stream with sufficient safety margin to absorb temporary Wi-Fi fluctuations. It can also support two moderate-bitrate streams simultaneously if household background internet usage is minimal.",
  },
  {
    question: "How much speed do I need for two simultaneous IPTV streams?",
    answer:
      "Because every TryIPTV subscription includes 2 simultaneous connections, your network must support both streams concurrently. A household broadband plan of 40–50 Mbps can provide useful practical headroom for two typical 1080p Full HD streams plus other household traffic, depending on actual stream bitrates. For households streaming two 4K channels, 80–100+ Mbps serves as a practical planning example to avoid bandwidth contention rather than a fixed technical rule.",
  },
  {
    question: "Does an Ethernet cable make IPTV stream better than Wi-Fi?",
    answer:
      "Yes, in most cases. An Ethernet cable does not increase the internet speed you purchase from your ISP, but it eliminates wireless interference, packet jitter, and wall-penetration signal drop between your streaming box and router. A wired connection delivers significantly more consistent data delivery for live video.",
  },
  {
    question: "Why does IPTV buffer even when my speed test shows 100+ Mbps?",
    answer:
      "Speed tests measure short burst capacity to a nearby local server, whereas live IPTV requires steady, uninterrupted data delivery from streaming media servers. Buffering on fast connections is commonly caused by local Wi-Fi packet drops, latency jitter, player application buffer settings, device hardware decoder limits, or transit routing delays during peak internet hours.",
  },
  {
    question: "Can I stream IPTV using a 4G or 5G mobile hotspot?",
    answer:
      "IPTV can function over 4G LTE and 5G cellular connections provided the mobile signal is strong and network latency is stable. However, cellular connections are subject to peak-hour tower congestion, fluctuating latency, carrier video throttling, and data caps that can be exhausted rapidly by high-definition streaming.",
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
  { name: "IPTV Internet Speed", item: `${SITE_URL}${canonical}` },
]);


export default function IptvInternetSpeedPage() {
  return (
    <>
      <PageSchema nodes={[articleSchema, breadcrumbSchema]} />

      {/* Hero Header */}
      <Section className="border-b border-white/[0.07] pt-10 pb-14 sm:pt-14 sm:pb-20">
        <Container>
          <Breadcrumb
            items={[
              { label: "Guides", href: "/guides" },
              { label: "IPTV Internet Speed" },
            ]}
            align="center"
          />
          <div className="mx-auto max-w-4xl text-center">
            <p className="eyebrow mb-3">Bandwidth &amp; Network Planning</p>
            <h1 className="font-headline text-3xl font-extrabold leading-[1.15] text-foreground sm:text-4xl lg:text-5xl">
              How Much Internet Speed Do You Need for IPTV?
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
              A practical guide to streaming bandwidth, household connection planning, Wi-Fi versus Ethernet,
              and multi-stream headroom.
            </p>
            <GuideByline path="/guides/iptv-internet-speed" />
          </div>
        </Container>
      </Section>

      {/* Main Content Article */}
      <Section className="pt-10 pb-12 sm:pt-14 sm:pb-16 lg:pb-16">
        <Container>
          <article className="mx-auto max-w-3xl">
            {/* Quick Answer Summary */}
            <ArticleSummary title="The Direct Answer: IPTV Bandwidth Requirements">
              <p>
                For IPTV, plan on a stable 25 Mbps or more for one Full HD (1080p) stream and 50 Mbps or more for
                4K; two streams at once need roughly double. The exact need depends on the{" "}
                <strong className="text-foreground font-semibold">actual bitrate of the stream</strong>, the
                resolution and codec, and how many people share your connection.
              </p>
              <p>
                As a practical planning guideline, individual streams typically draw between 3–6 Mbps for standard
                HD (720p), 7–15 Mbps for Full HD (1080p), and 18–35 Mbps for 4K Ultra HD. However, planning for additional
                headroom above the raw stream bitrate is useful for Wi-Fi variability, background traffic, other household
                devices, and bitrate spikes.
              </p>
            </ArticleSummary>

            <ArticleProse>
              <p>
                One of the most frequent misconceptions in digital television streaming is that internet speed is a single,
                fixed number. Prospective subscribers often ask whether 10 Mbps, 25 Mbps, or 100 Mbps is &ldquo;enough.&rdquo;
                While total download speed represents your connection&apos;s peak data-carrying capacity, uninterrupted IPTV
                playback relies equally on <strong className="text-foreground font-semibold">continuous throughput stability</strong>.
                For an architectural overview of how streams travel across internet networks, read our complete guide on{" "}
                <Link href="/guides/how-does-iptv-work" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
                  how IPTV works from server to screen
                </Link>
                .
              </p>

              <h2>Approximate Bandwidth Planning Ranges</h2>
              <p>
                Stream bitrates fluctuate based on source encoding, frame rates (e.g., 25/30 FPS film versus 50/60 FPS live sports),
                and compression standards like H.264 (AVC) versus H.265 (HEVC). Notice that even official streaming services publish
                different recommended speeds from one another because encoding profiles, compression codecs, bitrates, and player
                buffer behaviors vary widely across platforms.
              </p>
              <p>
                The figures below represent approximate industry planning ranges rather than rigid guarantees or fixed technical minimums:
              </p>
            </ArticleProse>

            {/* Bandwidth Planning Table */}
            <div className="my-8 overflow-hidden rounded-xl border border-white/[0.08] bg-[#070908] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
              <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="IPTV internet speed table">
                <table className="w-full min-w-[36rem] text-left text-xs sm:text-sm">
                  <thead className="border-b border-white/[0.08] bg-white/[0.02] text-primary font-mono uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="p-3.5 sm:p-4">Resolution</th>
                      <th className="p-3.5 sm:p-4">Stream Bitrate (Approx.)</th>
                      <th className="p-3.5 sm:p-4">Single Stream Target</th>
                      <th className="p-3.5 sm:p-4">2 Simultaneous Streams</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.06] text-muted-foreground">
                    {bandwidthTiers.map((tier) => (
                      <tr key={tier.resolution} className="transition-colors hover:bg-white/[0.02]">
                        <td className="p-3.5 sm:p-4 font-semibold text-foreground">
                          {tier.resolution}
                          <div className="text-[11px] font-normal text-muted-foreground mt-0.5">{tier.notes}</div>
                        </td>
                        <td className="p-3.5 sm:p-4 font-mono">{tier.bitrateRange}</td>
                        <td className="p-3.5 sm:p-4 font-mono text-foreground">{tier.headroomSingle}</td>
                        <td className="p-3.5 sm:p-4 font-mono text-primary font-semibold">{tier.headroomTwoStreams}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p data-small-print className="p-3.5 text-center text-[11px] text-muted-foreground border-t border-white/[0.06]">
                * Approximate planning ranges only. Official streaming services publish different recommended speeds because encoding, bitrate, codec, and playback behavior vary.
              </p>
            </div>

            <ArticleProse>
              <h2>Internet Plan Speed vs. Stream Bitrate: Why Headroom Matters</h2>
              <p>
                Purchasing a 50 Mbps broadband subscription from your internet service provider (ISP) does not mean your
                streaming player receives an unencumbered 50 Mbps feed at every second of the day. A vital distinction exists
                between <strong className="text-foreground font-semibold">advertised package bandwidth</strong> and{" "}
                <strong className="text-foreground font-semibold">available real-time stream bitrate</strong>. Additional headroom
                is useful for Wi-Fi variability, background traffic, other household devices, and bitrate spikes:
              </p>
              <ul>
                <li>
                  <strong className="text-foreground font-semibold">Stream Bitrate:</strong> The exact quantity of video and audio
                  data transmitted per second to render the picture. A 1080p stream might require an average of 7–15 Mbps depending on scene complexity and frame rate.
                </li>
                <li>
                  <strong className="text-foreground font-semibold">Household Concurrency &amp; Background Traffic:</strong> Additional
                  capacity ensures playback is not starved when mobile phones back up photos, computers run updates, or other household members stream media.
                </li>
                <li>
                  <strong className="text-foreground font-semibold">Wi-Fi Variability &amp; Bitrate Spikes:</strong> Wireless throughput
                  degrades with distance, physical barriers, and interference, while dynamic video encoding causes momentary bitrate spikes during fast-motion live broadcasts.
                </li>
                <li>
                  <strong className="text-foreground font-semibold">Network Congestion:</strong> Evening transit bottlenecks and ISP peering routing can temporarily reduce effective throughput below advertised plan tiers.
                </li>
              </ul>

              <h2>Planning for Two Simultaneous Connections</h2>
              <p>
                Every standard TryIPTV subscription includes <strong className="text-foreground font-semibold">{PRODUCT_TRUTHS.connections} simultaneous connections</strong>.
                This allows two screens in your household—such as an Amazon Firestick in the living room and an Android TV or tablet in
                the bedroom—to stream separate channels or movies concurrently using the same account credentials.
              </p>
              <p>
                When estimating household bandwidth for multi-room viewing, do not assume two streams consume an identical static
                data rate. Instead, apply a practical planning model:
              </p>
              <div className="my-6 rounded-lg border border-white/[0.08] bg-[#0c100d] p-4 text-xs sm:text-sm font-mono text-foreground/90">
                Combined Stream Bitrates + Household Concurrent Activity + Practical Headroom = Recommended Plan Speed
              </div>
              <p>
                For example, if Screen 1 is streaming a live 1080p 60 FPS sports match (~12 Mbps) and Screen 2 is playing a Full HD
                movie (~8 Mbps), the streams together draw approximately 20 Mbps of continuous data. In this scenario, a broadband plan
                of 40–50 Mbps can provide useful practical headroom for two typical 1080p streams plus other household traffic,
                depending on actual stream bitrates. For households streaming two 4K channels, 80–100+ Mbps serves as a practical
                planning example to accommodate high-bitrate video bursts and background devices, rather than a fixed technical requirement.
              </p>

              <h2>Wi-Fi vs. Ethernet: Why Connection Stability Outweighs Raw Speed</h2>
              <p>
                Many users assume that if their Wi-Fi speed test reads 150 Mbps, playback will automatically be flawless. Yet a
                wired connection can sometimes provide more consistent live playback than a faster Wi-Fi connection when interference or packet delay affects the wireless link. This is a diagnostic observation, not a benchmark or guarantee.
              </p>
              <div className="my-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-white/[0.08] bg-[#0c100d] p-4 sm:p-5">
                  <div className="flex items-center gap-2 mb-2 text-primary font-bold text-sm">
                    <Network className="h-4 w-4" /> Wired Ethernet
                  </div>
                  <ul className="text-base sm:text-sm text-muted-foreground space-y-1.5 list-disc pl-4">
                    <li>Zero radio-frequency interference from nearby appliances</li>
                    <li>Impervious to wall, ceiling, and distance attenuation</li>
                    <li>Consistently near-zero packet loss and predictable latency</li>
                    <li>Stable local delivery for high-bitrate live video</li>
                  </ul>
                </div>
                <div className="rounded-xl border border-white/[0.08] bg-[#0c100d] p-4 sm:p-5">
                  <div className="flex items-center gap-2 mb-2 text-amber-400 font-bold text-sm">
                    <Wifi className="h-4 w-4" /> Wireless Wi-Fi
                  </div>
                  <ul className="text-base sm:text-sm text-muted-foreground space-y-1.5 list-disc pl-4">
                    <li>Convenient setup without cabling through living spaces</li>
                    <li>2.4 GHz band penetrates walls but suffers heavy congestion</li>
                    <li>5 GHz band offers higher speeds but drops rapidly through brick</li>
                    <li>Prone to micro-bursts of packet delay (jitter)</li>
                  </ul>
                </div>
              </div>
              <p>
                An Ethernet cable does not increase the speed purchased from your internet provider, but it eliminates the local wireless
                bottlenecks that trigger video freezing. For hardware-specific setup instructions on configuring your streaming device,
                visit our universal{" "}
                <Link href="/setup" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
                  IPTV setup guide
                </Link>{" "}
                or explore our{" "}
                <Link href="/devices" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
                  device guides directory
                </Link>
                .
              </p>

              <h2>Why Fast Internet Connections Can Still Experience Buffering</h2>
              <p>
                If a speed test confirms your download rate is well above requirements, yet your IPTV stream occasionally stutters or pauses,
                the cause is rarely raw bandwidth capacity. Rather than bandwidth limits alone, buffering typically stems from broader network and device factors:
              </p>
              <ul>
                <li><strong className="text-foreground font-semibold">Household Concurrency:</strong> Simultaneous cloud backups, game downloads, or video calls competing for local router bandwidth.</li>
                <li><strong className="text-foreground font-semibold">Wi-Fi Variability &amp; Signal Drop:</strong> Interference from neighbouring networks, distance from the router, or 2.4 GHz channel congestion causing momentary delay spikes.</li>
                <li><strong className="text-foreground font-semibold">Bitrate Spikes in Live Content:</strong> Fast-action sequences or sports broadcasts temporarily surging in bitrate beyond conservative player buffers.</li>
                <li><strong className="text-foreground font-semibold">Background Traffic:</strong> Smart home devices and operating systems initiating background downloads without user awareness.</li>
                <li><strong className="text-foreground font-semibold">Network Congestion &amp; Peering:</strong> High-bandwidth routes between your local ISP and transit backbones becoming congested during peak evening hours (8 PM – 11 PM).</li>
                <li><strong className="text-foreground font-semibold">Hardware Decoder &amp; Buffer Limits:</strong> Budget streaming sticks or aggressive zero-second player buffer configurations that lack headroom to absorb minor arrival variance.</li>
              </ul>
              <p>
                If you are troubleshooting active stuttering, spinning wheels, or audio desynchronization, follow our tested 8-step{" "}
                <Link href="/help/iptv-buffering" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
                  IPTV buffering diagnostic guide
                </Link>{" "}
                to isolate and fix the underlying issue.
              </p>

              <h2>Latency, Jitter &amp; Packet Loss: The Metrics That Actually Govern Streaming</h2>
              <p>
                When evaluating your connection quality for live streaming, three secondary network metrics matter far more than headline speed:
              </p>
              <ul>
                <li>
                  <strong className="text-foreground font-semibold">Latency (Ping):</strong> The time in milliseconds (ms) it takes for a data packet to travel from your device to the server and back. Lower and more stable latency can help interactive playback, but there is no single universal IPTV cutoff: the route, server, player buffer, and stream design all matter.
                </li>
                <li>
                  <strong className="text-foreground font-semibold">Jitter:</strong> The variance or instability in latency over time. Look for recurring spikes or large swings rather than treating one fixed millisecond value as a universal pass/fail rule. A steady connection is generally easier for a player buffer to absorb than one with repeated delay variation.
                </li>
                <li>
                  <strong className="text-foreground font-semibold">Packet Loss:</strong> The percentage of data packets that are dropped in transit. Unlike web browsing, where dropped packets simply cause a brief delay, live video streams can stutter or freeze when lost packets must be recovered.
                </li>
              </ul>

              <h2>How to Test Your Connection Accurately for IPTV</h2>
              <p>
                Running a quick speed test on your mobile phone while standing next to the router will not accurately reflect what your television
                receives. Follow this practical testing procedure:
              </p>
              <ol>
                <li>
                  <strong className="text-foreground font-semibold">Test directly on the streaming device:</strong> Use a browser or network utility app installed on your Firestick, Smart TV, or streaming box to measure real-world throughput at that exact physical location.
                </li>
                <li>
                  <strong className="text-foreground font-semibold">Test at different times of day:</strong> Compare mid-afternoon speeds against peak evening hours (8:00 PM – 10:30 PM) when neighbourhood broadband traffic and ISP transit nodes experience peak load.
                </li>
                <li>
                  <strong className="text-foreground font-semibold">Pause concurrent downloads:</strong> Ensure gaming consoles, BitTorrent clients, and cloud backup software are paused before evaluating baseline streaming performance.
                </li>
                <li>
                  <strong className="text-foreground font-semibold">Compare Wi-Fi against wired Ethernet:</strong> Temporarily connect an Ethernet cable to determine whether stream stuttering disappears.
                </li>
                <li>
                  <strong className="text-foreground font-semibold">Check multiple player apps:</strong> Test stream performance across different player applications (such as TiviMate or IPTV Smarters) to rule out player-specific decoder bottlenecks. Explore our{" "}
                  <Link href="/players" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
                    IPTV player guides
                  </Link>{" "}
                  for app-specific buffer settings.
                </li>
              </ol>

              <h2>Can You Stream IPTV on 4G or 5G Mobile Hotspots?</h2>
              <p>
                IPTV can technically stream over 4G LTE and 5G cellular data connections when coverage is strong. Many subscribers use mobile
                hotspots while traveling or in RVs. However, cellular streaming introduces specific constraints:
              </p>
              <ul>
                <li><strong className="text-foreground font-semibold">Tower Congestion:</strong> Mobile towers dynamically balance load; peak hours can cause sharp spikes in latency and packet loss.</li>
                <li><strong className="text-foreground font-semibold">Carrier Video Optimization:</strong> Certain mobile operators automatically throttle video streaming traffic to 1.5–2.5 Mbps (480p resolution) unless subscribers configure an unthrottled data profile.</li>
                <li><strong className="text-foreground font-semibold">Data Caps:</strong> High-definition television uses substantial quantities of gigabytes over prolonged viewing periods.</li>
              </ul>

              <h2>Data Usage Estimates: How Many Gigabytes Does IPTV Use per Hour?</h2>
              <p>
                IPTV uses about 0.45 GB per hour for every 1 Mbps of stream bitrate: roughly 1.4–2.7 GB an hour for 720p, 3–7 GB for 1080p, and 8–16 GB for 4K. Two simultaneous streams use about twice as much. The formula, in standard decimal gigabytes:
              </p>
              <div className="my-6 rounded-lg border border-white/[0.08] bg-[#0c100d] p-4 text-xs sm:text-sm font-mono text-foreground/90">
                GB/hour ≈ bitrate in Mbps × 0.45
              </div>
              <p>
                Applying this formula yields straightforward planning estimates for typical streaming bitrates:
              </p>
              <ul>
                <li><strong className="text-foreground font-semibold">5 Mbps (Standard HD / 720p):</strong> ≈ 2.25 GB/hour</li>
                <li><strong className="text-foreground font-semibold">10 Mbps (Full HD / 1080p):</strong> ≈ 4.5 GB/hour</li>
                <li><strong className="text-foreground font-semibold">20 Mbps (High-Bitrate 1080p / 4K baseline):</strong> ≈ 9 GB/hour</li>
              </ul>
              <p>
                (Note: If using the 8,192 divisor, label the result GiB/hour rather than decimal GB/hour: <code>GiB/hour = (bitrate in Mbps × 3,600) / 8,192 ≈ bitrate × 0.439</code>). If your broadband connection is subject to a monthly data cap, these calculations help plan household viewing volume across devices.
              </p>
            </ArticleProse>

            {/* FAQ Section */}
            <div className="mt-12 pt-8 border-t border-white/[0.08]">
              <div className="mb-6">
                <span className="eyebrow mb-1">Direct Answers</span>
                <h2 className="font-headline text-2xl sm:text-3xl font-extrabold text-foreground">
                  Frequently Asked Questions
                </h2>
                <p className="mt-2 text-base sm:text-sm text-muted-foreground leading-relaxed">
                  Clear, practical answers about internet speed requirements, multi-stream bandwidth, and connection stability.
                </p>
              </div>
              <FaqList items={faqs} />
            </div>

            {/* Contextual Action / Next Steps Box */}
            <div className="mt-12 rounded-xl border border-primary/25 bg-[#0b100d] p-6 sm:p-8">
              <span className="eyebrow mb-2">Next Steps</span>
              <h2 className="font-headline text-xl sm:text-2xl font-extrabold text-foreground">
                Test Your Connection with TryIPTV
              </h2>
              <p className="mt-2 text-base sm:text-sm leading-relaxed text-muted-foreground">
                Verify real-world stream stability on your device with our full-access 24-hour evaluation trial ($0, no credit card required).
                Every TryIPTV plan includes {PRODUCT_TRUTHS.connections} simultaneous connections across fixed terms with no recurring contracts.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {/* Below 360px the label is wider than the card; let it wrap instead of overflowing. */}
                <Button asChild className="max-[359px]:h-auto max-[359px]:whitespace-normal max-[359px]:text-center">
                  <Link href="/iptv-free-trial">
                    Start 24-Hour Free Trial <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/pricing">View IPTV Plans</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/setup">Universal Setup Guide</Link>
                </Button>
              </div>
            </div>
          </article>
        </Container>
      </Section>
      <TopicClusterLinks path="/guides/iptv-internet-speed" />
    </>
  );
}
