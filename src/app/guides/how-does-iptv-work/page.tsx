import type { Metadata } from "next";
import { TopicClusterLinks } from "@/components/shared/TopicClusterLinks";
import { GuideByline } from "@/components/shared/GuideByline";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Tv,
  Server,
  Wifi,
  Cpu,
  Layers,
  PlaySquare,
  Film,
  Calendar,
  AlertCircle,
  HelpCircle,
  KeyRound,
  FileText,
  Radio,
  ShieldCheck,
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
import { PRODUCT_TRUTHS, STREAM_SPEED_MBPS, SITE_URL, generateMetadata as generatePageMetadata } from "@/lib/site-config";
import { getLastModified } from "@/lib/site-routes";

const title = "How Does IPTV Work? From Server to Screen | TryIPTV";
const description =
  "Learn how IPTV works, from servers and internet delivery to IPTV players, M3U playlists, Xtream Codes, EPG, live TV and on-demand streaming.";
const canonical = "/guides/how-does-iptv-work";
const modifiedDate = getLastModified("/guides/how-does-iptv-work");

export function generateMetadata(): Metadata {
  return {
    ...generatePageMetadata({
      title,
      description,
      canonical,
      noIndex: false,
    }),
    title: {
      absolute: title,
    },
  };
}

const deliveryStages = [
  {
    step: "01",
    title: "Content Ingestion & Capture",
    description:
      "Broadcast feeds from terrestrial signals, satellite links, and production studios are captured by ingest systems and converted into digital stream formats.",
    icon: Radio,
  },
  {
    step: "02",
    title: "Transcoding & Compression",
    description:
      "Video feeds are compressed using digital video codecs (commonly H.264, H.265/HEVC, or similar standards) and formatted into streaming-friendly containers, depending on the service architecture and stream type.",
    icon: Cpu,
  },
  {
    step: "03",
    title: "Subscriber Authentication",
    description:
      "When you connect, the streaming platform verifies your account credentials, active subscription status, and simultaneous connection limits before authorizing playback.",
    icon: KeyRound,
  },
  {
    step: "04",
    title: "IP Transport Across Networks",
    description:
      "Authorized media data is routed over broadband internet connections from the streaming infrastructure directly to your local router.",
    icon: Wifi,
  },
  {
    step: "05",
    title: "Player Request & Parsing",
    description:
      "Your chosen IPTV player application (e.g. TiviMate, IPTV Smarters) loads the playlist or contacts the service API with your credentials, then requests the selected channel stream.",
    icon: FileText,
  },
  {
    step: "06",
    title: "Buffer Storage & Decoding",
    description:
      "The client device temporarily holds incoming data in a local memory buffer to smooth out network fluctuations, while the device decoder renders the frames onto your display.",
    icon: Server,
  },
  {
    step: "07",
    title: "On-Screen Playback",
    description:
      "Synchronized audio and video frames display on your television, monitor, or mobile screen, alongside electronic program guide (EPG) metadata when available.",
    icon: Tv,
  },
];

const faqs: FaqItem[] = [
  {
    question: "How does IPTV deliver live television channels?",
    answer:
      "Instead of broadcasting every channel at once through dedicated cables or satellite frequencies, IPTV streams only the specific channel you choose over your broadband internet connection. When you tune to a channel, your player application requests that stream from the provider's server, which delivers the video data in digital IP packets.",
  },
  {
    question: "Does IPTV require a satellite dish or dedicated cable box?",
    answer:
      "No. IPTV operates entirely over standard internet protocol networks. You do not need a satellite dish, coaxial cabling, or proprietary cable company receiver. You only need a broadband internet connection, a compatible device (such as a Fire TV Stick, Smart TV, or PC), and a compatible IPTV player application.",
  },
  {
    question: "What is the difference between IPTV and streaming services like Netflix?",
    answer:
      "Both technologies deliver video data over internet protocol, but they serve different media formats. Services like Netflix operate primarily as on-demand video platforms where pre-recorded files are stored and served. IPTV platforms specialize in delivering live linear broadcast television (with exact real-time programming grids and sports feeds) in addition to on-demand libraries.",
  },
  {
    question: "What is the role of an IPTV player application?",
    answer:
      "An IPTV player is the software application installed on your device that reads your subscription credentials (such as an Xtream Codes-style login or M3U playlist link), requests the stream from the server, organizes channel categories and electronic program guides, and decodes the audio and video for your display. The player app itself does not supply the television content; the IPTV service supplies the server access.",
  },
  {
    question: "Does IPTV work using M3U playlists or Xtream Codes API?",
    answer:
      "Most modern IPTV services, including TryIPTV, support both methods. Xtream Codes-style login is an API-based credential method commonly supported by IPTV players that automatically organizes Live TV, Movies, and Series into categories and syncs EPG data. M3U is a playlist format and delivery method that provides a text-based list of stream URLs compatible with nearly any media player, including VLC.",
  },
  {
    question: "Why does an IPTV stream occasionally buffer?",
    answer:
      "Buffering happens when your player's temporary video buffer runs empty faster than new data arrives over the network. Common causes include Wi-Fi signal interference, local network congestion, insufficient download bandwidth, device hardware bottlenecks, or routing delays across the internet. Running a wired Ethernet connection and selecting an efficient hardware decoder usually resolves most buffering.",
  },
  {
    question: "Can I watch IPTV on multiple devices simultaneously?",
    answer:
      "Yes, depending on your subscription entitlement. Every TryIPTV subscription includes 2 simultaneous connections, allowing two devices in your household to stream different live channels or movies concurrently using the same account.",
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
  { name: "How Does IPTV Work?", item: `${SITE_URL}${canonical}` },
]);


export default function HowDoesIptvWorkPage() {
  return (
    <>
      <PageSchema nodes={[articleSchema, breadcrumbSchema]} />

      {/* Hero Header */}
      <Section className="border-b border-white/[0.07] pt-10 pb-14 sm:pt-14 sm:pb-20">
        <Container>
          <Breadcrumb
            items={[
              { label: "Guides", href: "/guides" },
              { label: "How Does IPTV Work?" },
            ]}
            align="center"
          />
          <div className="mx-auto max-w-4xl text-center">
            <p className="eyebrow mb-3">Technical Architecture</p>
            <h1 className="font-headline text-3xl font-extrabold leading-[1.15] text-foreground sm:text-4xl lg:text-5xl">
              How Does IPTV Work?
            </h1>
            <p className="mx-auto mt-5 max-w-[60ch] text-base leading-7 text-muted-foreground sm:text-lg">
              IPTV works by sending TV channels and on-demand video as data over the internet. The provider&apos;s
              servers turn each channel into a stream, an M3U playlist or Xtream Codes login tells your player
              where those streams are, and the player on your TV, stick, phone, or computer downloads and plays
              them, with EPG data adding the schedule.
            </p>
            <GuideByline path="/guides/how-does-iptv-work" />
          </div>
        </Container>
      </Section>

      {/* Main Content Article */}
      <Section className="pt-10 pb-12 sm:pt-14 sm:pb-16 lg:pb-16">
        <Container>
          <article className="mx-auto max-w-3xl">
            {/* Quick Answer Summary */}
            <ArticleSummary title="The Direct Answer: How IPTV Operates">
              <p>
                IPTV sends television over the internet instead of a cable or satellite signal. Your
                provider&apos;s server streams the channel you select as data over your broadband connection;
                a player app on your device receives and plays it in real time.
              </p>
              <p>
                <strong className="text-foreground font-semibold">Internet Protocol Television (IPTV)</strong> delivers
                linear television and video content over standard IP networks instead of traditional cable, satellite,
                or terrestrial radio frequency broadcast systems.
              </p>
              <p>
                Rather than broadcasting thousands of channels simultaneously through dedicated coaxial wiring, IPTV
                sends only the specific channel you request as digital data packets over your broadband connection.
                An independent IPTV player application installed on your device communicates with the streaming server,
                receives the packet stream, and decodes the audio and video into synchronized playback on your screen.
              </p>
            </ArticleSummary>

            <ArticleProse>
              <p>
                While traditional television relies on specialized physical infrastructure (such as roof-mounted satellite
                dishes or cable company splitters), IPTV operates over the exact same broadband foundation that powers
                websites, email, and video calls. For a broader conceptual overview of what IPTV offers, see our beginner guide
                on{" "}
                <Link href="/guides/what-is-iptv" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
                  what IPTV is
                </Link>
                . Below, we break down the end-to-end delivery pipeline.
              </p>

              <h2>How IPTV Works in Simple Terms</h2>
              <p>
                To understand IPTV without getting lost in telecom jargon, picture a traditional web browser. When you visit
                a website, your computer requests a specific webpage from a remote web server, and that server transmits the
                data back to you over the internet.
              </p>
              <p>
                IPTV functions on a very similar request-and-deliver model:
              </p>
            </ArticleProse>

            {/* Architecture at a Glance */}
            <div className="my-8 rounded-xl border border-white/[0.08] bg-[#070908] p-5 sm:p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
              <div className="text-xs font-bold uppercase tracking-wider text-primary mb-3">
                General Simplified Data Flow Model
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 text-center text-xs">
                <div className="rounded-lg border border-white/[0.08] bg-card/60 p-3 flex flex-col items-center justify-center">
                  <Radio className="h-5 w-5 text-primary mb-1.5" />
                  <span className="font-extrabold text-foreground">Content Source</span>
                  <span className="text-xs text-muted-foreground mt-0.5">Live Feeds / VOD</span>
                </div>
                <div className="rounded-lg border border-white/[0.08] bg-card/60 p-3 flex flex-col items-center justify-center">
                  <Server className="h-5 w-5 text-primary mb-1.5" />
                  <span className="font-extrabold text-foreground">IPTV Platform</span>
                  <span className="text-xs text-muted-foreground mt-0.5">Encoders &amp; Servers</span>
                </div>
                <div className="rounded-lg border border-white/[0.08] bg-card/60 p-3 flex flex-col items-center justify-center">
                  <Wifi className="h-5 w-5 text-primary mb-1.5" />
                  <span className="font-extrabold text-foreground">Broadband IP</span>
                  <span className="text-xs text-muted-foreground mt-0.5">Packet Routing</span>
                </div>
                <div className="rounded-lg border border-white/[0.08] bg-card/60 p-3 flex flex-col items-center justify-center">
                  <PlaySquare className="h-5 w-5 text-primary mb-1.5" />
                  <span className="font-extrabold text-foreground">Player App</span>
                  <span className="text-xs text-muted-foreground mt-0.5">Decodes Stream</span>
                </div>
                <div className="rounded-lg border border-white/[0.08] bg-card/60 p-3 flex flex-col items-center justify-center">
                  <Tv className="h-5 w-5 text-primary mb-1.5" />
                  <span className="font-extrabold text-foreground">Viewer Screen</span>
                  <span className="text-xs text-muted-foreground mt-0.5">Display Playback</span>
                </div>
              </div>
              <p data-small-print className="mt-4 text-xs text-muted-foreground leading-relaxed text-center">
                * Note: This diagram illustrates the generalized industry streaming pipeline. Exact network configurations differ by provider and player.
              </p>
            </div>

            <ArticleProse>
              <p>
                In this workflow, the player application on your streaming stick or television acts as the client receiver.
                It does not generate the video on its own; it receives your command, requests the appropriate stream from the
                service platform, buffers the incoming bits, and passes them to your screen.
              </p>

              <h2>The 7-Stage IPTV Delivery Process</h2>
              <p>
                Behind the scenes, transmitting a live broadcast from an arena or television studio to your living room
                involves seven coordinated stages:
              </p>
            </ArticleProse>

            {/* 7 Delivery Stages */}
            <div className="my-8 space-y-3.5">
              {deliveryStages.map((stage) => {
                const Icon = stage.icon;
                return (
                  <div
                    key={stage.step}
                    className="flex flex-col sm:flex-row items-start gap-4 rounded-xl border border-white/[0.08] bg-[#0c100d] p-4 sm:p-5 transition-colors hover:border-white/[0.15]"
                  >
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-primary/20 bg-primary/[0.08] text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs font-bold text-primary">{stage.step}</span>
                        <h3 className="font-headline text-base font-extrabold text-foreground">
                          {stage.title}
                        </h3>
                      </div>
                      <p className="text-base sm:text-sm text-muted-foreground leading-relaxed">
                        {stage.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <ArticleProse>
              <h2>IPTV Service vs. IPTV Player Application</h2>
              <p>
                A frequent point of confusion for newcomers is the distinction between an IPTV provider and an IPTV player.
                These two components perform completely different roles:
              </p>
              <ul>
                <li>
                  <strong className="text-foreground font-semibold">The IPTV Service (e.g. TryIPTV):</strong> Operates the
                  server infrastructure, stream sources, VOD libraries, and customer account credentials. The service provides
                  the actual digital streams and credentials (via Xtream Codes-style API logins or M3U playlist URLs).
                </li>
                <li>
                  <strong className="text-foreground font-semibold">The IPTV Player Application:</strong> A standalone media player
                  program (such as TiviMate, IPTV Smarters Pro, XCIPTV, Televizo, or Perfect Player) that you install on your
                  device. The player provides the interface, remote-control navigation, and video decoding engine.
                </li>
              </ul>
              <p>
                TryIPTV does not own, develop, or sell third-party player applications. Instead, subscribers choose the player app
                that best fits their hardware. You can explore our dedicated{" "}
                <Link href="/players" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
                  IPTV player directory
                </Link>{" "}
                or follow our step-by-step{" "}
                <Link href="/setup" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
                  universal IPTV setup guide
                </Link>{" "}
                to connect them together.
              </p>

              <h2>How Xtream Codes-Style API Logins Work</h2>
              <p>
                When connecting using an Xtream Codes-style login, your player application uses an API-based credential method
                commonly supported by modern IPTV players rather than downloading a static playlist file. An Xtream-compatible
                login provides three connection parameters:
              </p>
              <ul>
                <li><strong>Server / Portal URL:</strong> The web address and network port of the streaming gateway.</li>
                <li><strong>Username:</strong> Your individual account identifier.</li>
                <li><strong>Password:</strong> Your private authentication secret key.</li>
              </ul>
              <p>
                When you launch your player, it sends an authentication request to the provider&apos;s server. Depending on
                the service architecture, player, and stream format, the server verifies your account entitlement and active
                connection limits, then returns categorized channel lists, on-demand libraries, and electronic program guide
                data. For a deeper technical breakdown, read our guide on{" "}
                <Link href="/guides/what-are-xtream-codes" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
                  what Xtream Codes are and how API logins operate
                </Link>
                .
              </p>

              <h2>How M3U Playlist Delivery Works</h2>
              <p>
                An M3U playlist is a structured playlist format and delivery method containing a directory of direct stream links.
                When your player loads an M3U file or URL, it reads the file sequentially. Each entry typically contains a metadata
                header directive (beginning with <code>#EXTINF</code>) that declares the channel name, group category, and logo URL,
                followed immediately by the direct media stream link.
              </p>
              <p>
                Because M3U is a universally recognized multimedia playlist standard dating back decades, it works on nearly every
                media platform in existence, including lightweight players and desktop programs like VLC. To learn about header
                directives and formatting standards, see our guide on{" "}
                <Link href="/guides/what-is-m3u" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
                  what an M3U playlist is
                </Link>
                , or compare the trade-offs in our{" "}
                <Link href="/guides/m3u-vs-xtream-codes" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
                  M3U vs. Xtream Codes comparison
                </Link>
                .
              </p>

              <h2>How Live TV Streaming Works: Real-Time Linear Delivery</h2>
              <p>
                Streaming a live television broadcast is fundamentally different from watching a stored movie on YouTube. In live TV,
                the event is happening in real time:
              </p>
              <ul>
                <li>
                  <strong>Continuous Broadcast Clock:</strong> Every subscriber watching a live sports match receives video frames
                  corresponding to the same live broadcast timeline.
                </li>
                <li>
                  <strong>Unicast Stream Delivery:</strong> Over public internet connections, IPTV streams are typically delivered
                  via unicast streaming sessions (a dedicated stream session for each active player). Depending on the service
                  architecture, player, and stream format, delivery commonly uses HTTP-based streams such as HLS (HTTP Live Streaming)
                  or direct MPEG-TS streams over HTTP/HTTPS.
                </li>
                <li>
                  <strong>Client-Side Buffering:</strong> Because internet packet arrival times can fluctuate, your player maintains
                  a short local buffer to absorb network timing jitter without interrupting the picture. The exact buffer size varies
                  depending on the player, device memory, and stream settings.
                </li>
              </ul>

              <h2>How Video on Demand (VOD) Works: Asynchronous Media Streaming</h2>
              <p>
                Video on Demand (movies and full TV series) operates differently from linear live broadcasts:
              </p>
              <ul>
                <li>
                  <strong>Pre-Encoded Media Storage:</strong> VOD content is pre-encoded and stored as media files (such as MP4 or
                  MKV containers) on content servers.
                </li>
                <li>
                  <strong>Independent Viewing Timeline:</strong> You do not share a timeline with other viewers. When you press play,
                  your player requests the stream from the beginning.
                </li>
                <li>
                  <strong>On-Demand Playback Control:</strong> Depending on the player and stream format, players often use HTTP range
                  requests or segment-based seeking, allowing viewers to seek, rewind, or pause smoothly without downloading the entire
                  file upfront.
                </li>
              </ul>

              <h2>What Is an EPG and Where Does It Fit?</h2>
              <p>
                An <strong className="text-foreground font-semibold">Electronic Program Guide (EPG)</strong> is the interactive on-screen
                menu that displays program names, start times, runtimes, and episode descriptions.
              </p>
              <p>
                Video streams do not inherently carry rich schedule text. Depending on the service architecture, player, and stream
                format, the player downloads schedule metadata separately—often using an XMLTV feed or Xtream-compatible API
                endpoints—and correlates each channel with its program listings using identifiers such as a channel ID or{" "}
                <code>tvg-id</code> tag. For step-by-step details on guide matching, explore our explainer on{" "}
                <Link href="/guides/what-is-epg" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
                  what an EPG is and how TV guides work
                </Link>
                .
              </p>

              <h2>Why IPTV Can Buffer: Understanding Stream Bottlenecks</h2>
              <p>
                Buffering occurs whenever your player device uses up the video data in its local buffer before new packets arrive over the
                internet. Because live video requires a steady, unbroken stream of data, any disruption along the chain can cause the player
                to pause while it waits for packets:
              </p>
              <ul>
                <li>
                  <strong>Wi-Fi Signal Interference:</strong> Wireless signals can suffer from interference, physical walls, or channel
                  congestion, creating micro-bursts of packet delay (jitter).
                </li>
                <li>
                  <strong>Bandwidth Competition:</strong> Other devices on your household network downloading large files or streaming 4K video
                  can saturate your available download bandwidth.
                </li>
                <li>
                  <strong>Device Decoder Limits:</strong> Budget streaming sticks with weak processors or low RAM can struggle to decode high-bitrate
                  60 FPS sports broadcasts smoothly.
                </li>
                <li>
                  <strong>ISP Routing &amp; Peering:</strong> Internet service providers route traffic across multiple transit carriers; congested
                  peering exchanges can slow down stream delivery during peak evening hours.
                </li>
              </ul>
              <p>
                If you encounter stream stuttering or freezing, work through the 8-step{" "}
                <Link href="/help/iptv-buffering" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
                  IPTV buffering troubleshooting checklist
                </Link>
                .
              </p>

              <h2>What You Need to Use IPTV</h2>
              <p>
                Setting up IPTV on your hardware requires four straightforward components:
              </p>
              <ol>
                <li>
                  <strong>A Stable Broadband Connection:</strong> While individual streams typically use about 3–35 Mbps depending on resolution, we recommend plan speeds of at least {STREAM_SPEED_MBPS.fullHd} Mbps for 1080p Full HD and {STREAM_SPEED_MBPS.uhd}+ Mbps for 4K to leave ample headroom for household devices. For detailed bandwidth planning, see our complete guide on{" "}
                  <Link href="/guides/iptv-internet-speed" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
                    IPTV internet speed requirements
                  </Link>
                  . A wired Ethernet cable is often preferred over Wi-Fi when possible.
                </li>
                <li>
                  <strong>A Compatible Device:</strong> Amazon Fire TV Stick, Android TV box, Smart TV (Samsung or LG), Apple TV, Windows PC,
                  Mac, or mobile device. Browse our{" "}
                  <Link href="/devices" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
                    device compatibility directory
                  </Link>{" "}
                  for platform tutorials.
                </li>
                <li>
                  <strong>A Dedicated IPTV Player:</strong> Choose a trusted media player app like TiviMate or IPTV Smarters Pro from your
                  device app store.
                </li>
                <li>
                  <strong>Active Subscription Credentials:</strong> Your service credentials (Server URL, username, and password, or an M3U link).
                </li>
              </ol>
            </ArticleProse>

            {/* FAQ Section */}
            <div className="mt-12 pt-8 border-t border-white/[0.08]">
              <div className="mb-6">
                <span className="eyebrow mb-1">Direct Answers</span>
                <h2 className="font-headline text-2xl sm:text-3xl font-extrabold text-foreground">
                  Frequently Asked Questions
                </h2>
                <p className="mt-2 text-base sm:text-sm text-muted-foreground leading-relaxed">
                  Clear answers to common questions about IPTV streaming architecture, hardware requirements, and playback methods.
                </p>
              </div>
              <FaqList items={faqs} />
            </div>

            {/* Contextual Next Steps Box */}
            <div className="mt-12 rounded-xl border border-primary/25 bg-[#0b100d] p-6 sm:p-8">
              <span className="eyebrow mb-2">Next Steps</span>
              <h2 className="font-headline text-xl sm:text-2xl font-extrabold text-foreground">
                Ready to Configure Your IPTV Setup?
              </h2>
              <p className="mt-2 text-base sm:text-sm leading-relaxed text-muted-foreground">
                Now that you understand the underlying streaming pipeline, follow our universal setup guide to activate your
                device. TryIPTV includes {PRODUCT_TRUTHS.connections} simultaneous connections across plans with no recurring
                contracts, and offers a {PRODUCT_TRUTHS.trialDuration.toLowerCase()} free evaluation trial ($0, no credit card required).
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/setup">
                    Universal Setup Guide <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </Button>
                {/* Below 360px the label is wider than the card; let it wrap instead of overflowing. */}
                <Button asChild variant="outline" className="max-[359px]:h-auto max-[359px]:whitespace-normal max-[359px]:text-center">
                  <Link href="/iptv-free-trial">Start 24-Hour Free Trial</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/pricing">View IPTV Plans</Link>
                </Button>
              </div>
            </div>
          </article>
        </Container>
      </Section>
      <TopicClusterLinks path="/guides/how-does-iptv-work" />
    </>
  );
}
