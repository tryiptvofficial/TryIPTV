import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Tv, Smartphone, Layers, Sliders, Globe, Clock, ShieldCheck, HelpCircle, HardDrive, History, Radio, Cast } from "lucide-react";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { Container } from "@/components/shared/Container";
import { PageSchema } from "@/components/shared/Schema";
import { Section } from "@/components/shared/Section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArticleSummary } from "@/components/guide";
import { generateBreadcrumbSchema } from "@/lib/schema";
import { PRODUCT_TRUTHS, SITE_URL, generateMetadata as generatePageMetadata } from "@/lib/site-config";

const title = "Best IPTV Players for 2026: Comparison & Setup Guides";
const description =
  "Compare IPTV players by device, M3U and Xtream Codes support, and EPG features. Find the right app for Fire TV, Android TV, Apple, Smart TVs, and PC.";
const canonical = "/players";

export function generateMetadata(): Metadata {
  // Title tag and og:title only; the H1 and Article headline keep the longer wording.
  const metaTitle = "Best IPTV Players 2026: Comparison & Setup";
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

const playersList = [
  {
    name: "TiviMate IPTV Player",
    slug: "tivimate",
    developer: "Armobsoft FZE",
    platforms: "Android TV, Google TV, Fire TV",
    protocols: "Xtream Codes, M3U / M3U8",
    pricing: "Free/basic access with paid Premium options",
    bestFor: "Television EPG & Remote Navigation",
    description: "Designed specifically for television screens with native D-pad remote control navigation, customizable EPG timeline grid, SMB network recording, and multi-view.",
    icon: Tv,
    badgeColor: "text-primary border-primary/20 bg-primary/10",
  },
  {
    name: "IPTV Smarters Pro",
    slug: "iptv-smarters",
    developer: "WHMCS SMARTERS",
    platforms: "iOS, Android, Fire TV, Samsung Tizen, LG webOS, Windows, Mac",
    protocols: "Xtream Codes API, M3U Playlist",
    pricing: "Free download; optional in-app Premium features",
    bestFor: "Broadest Multi-Device Ecosystem",
    description: "Broadest multi-platform device availability. Works across iPhone, Apple TV, Smart TVs (Samsung Tizen & LG webOS), Android, and Firestick with a unified interface.",
    icon: Globe,
    badgeColor: "text-blue-400 border-blue-400/20 bg-blue-400/10",
  },
  {
    name: "XCIPTV Player (OTR Player)",
    slug: "xciptv",
    developer: "OTTRUN",
    platforms: "Android TV, Google TV, Android Mobile, Fire TV",
    protocols: "Xtream Codes API (Native), M3U",
    pricing: "Free (ad-supported)",
    bestFor: "Dual Playback Engines & Multi-Screen",
    description: "Features selectable dual media engines (Google ExoPlayer and VideoLAN VLC) to help with compatibility or playback issues, alongside a 4-channel live sports multi-screen grid.",
    icon: Sliders,
    badgeColor: "text-purple-400 border-purple-400/20 bg-purple-400/10",
  },
  {
    name: "Televizo IPTV Player",
    slug: "televizo",
    developer: "Andrey Menscikov",
    platforms: "Android TV, Android Phones/Tablets, Fire TV (Sideload)",
    protocols: "Xtream Codes API, M3U / M3U8",
    pricing: "Free tier; optional paid Premium upgrade",
    bestFor: "Hybrid Mobile & TV Interface",
    description: "A fast, modern Kotlin-based media player that adapts gracefully between touch gestures and TV remote D-pads, featuring native Google Cast streaming.",
    icon: Smartphone,
    badgeColor: "text-emerald-400 border-emerald-400/20 bg-emerald-400/10",
  },
  {
    name: "OTT Navigator IPTV",
    slug: "ott-navigator",
    developer: "SIA Scillarium Studio",
    platforms: "Android TV, Google TV, Android Mobile, Fire TV (Sideload)",
    protocols: "Xtream Codes, M3U, Stalker Portal",
    pricing: "Free tier; optional in-app Premium license",
    bestFor: "Videophiles & High-End Codec Control",
    description: "Advanced playback configuration with the MPV media core, Auto Frame Rate (AFR) HDMI matching, hardware deinterlacing for 1080i sports, and 9-channel Studio Mode.",
    icon: Layers,
    badgeColor: "text-amber-400 border-amber-400/20 bg-amber-400/10",
  },
  {
    name: "IPTV Extreme",
    slug: "iptv-extreme",
    developer: "Paolo Turatti",
    platforms: "Android TV, Android Mobile, Fire TV (Sideload)",
    protocols: "M3U / M3U8, Xtream Codes",
    pricing: "Free (ad-supported); optional paid Pro version",
    bestFor: "Web Portal Setup & Scheduled DVR",
    description: "Upload and manage playlists remotely from your laptop or phone via iptvextreme.eu using your TV's virtual MAC address. Includes scheduled DVR recording timers.",
    icon: HardDrive,
    badgeColor: "text-cyan-400 border-cyan-400/20 bg-cyan-400/10",
  },
  {
    name: "Perfect Player IPTV",
    slug: "perfect-player",
    developer: "Niklabs Software",
    platforms: "Android (Legacy), Fire TV, Windows (Legacy)",
    protocols: "M3U / M3U8, XSPF",
    pricing: "Free (legacy software; delisted from Google Play)",
    bestFor: "Legacy Hardware & Set-Top Box OSD",
    description: "Historical pioneer of set-top box On-Screen Display styling. Lightweight footprint for older 1GB RAM Android boxes, with UDPXY proxy integration.",
    icon: History,
    badgeColor: "text-zinc-400 border-zinc-400/20 bg-zinc-400/10",
  },
];

const faqs = [
  {
    question: "What is the difference between an IPTV player and an IPTV provider?",
    answer:
      "An IPTV player is the app that plays your channels, such as TiviMate, IPTV Smarters Pro or XCIPTV Player (OTR Player). It sorts channels into categories and shows the EPG, the on-screen TV guide. A player has no channels of its own: TryIPTV is the service that supplies the live channels, movies and series. To connect the two, enter your TryIPTV login in the player, either an Xtream Codes username and password or an M3U playlist link.",
  },
  {
    question: "Which IPTV player is best for Firestick and Android TV?",
    answer:
      "For televisions connected to an Amazon Fire TV Stick, Google TV, or Android TV box, TiviMate is a common choice due to its full-screen EPG grid, remote-control responsiveness, and SMB network recording. If you want a player with built-in multi-screen sports viewing without purchasing a premium subscription, XCIPTV Player (OTR Player) and Televizo are practical alternatives.",
  },
  {
    question: "Which IPTV player should I use on iPhone, iPad, or Apple TV?",
    answer:
      "TiviMate, XCIPTV, and Televizo are not available on Apple platforms. For iOS, iPadOS, and tvOS (Apple TV), IPTV Smarters (Smarters Player Lite on the App Store) and GSE Smart IPTV are widely used options because they provide native iOS apps with full Xtream Codes API support.",
  },
  {
    question: "Do I need to pay for an IPTV player?",
    answer:
      "Most IPTV players offer free tiers that allow basic stream playback. Free versions typically include banner ads or reserve advanced features (such as scheduled DVR recording, multi-screen grids, or multiple playlist slots) for a paid upgrade or nominal license. TryIPTV is compatible with both free and premium player versions.",
  },
  {
    question: "Can I watch live streams on multiple devices at the same time?",
    answer:
      "Yes. Every TryIPTV subscription includes 2 simultaneous connections standard on all plans. This means you can stream on your living room TiviMate player and your mobile phone with IPTV Smarters at the same time under a single subscription.",
  },
];

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", item: `${SITE_URL}/` },
  { name: "Players", item: `${SITE_URL}/players` },
]);

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Top IPTV Players and Applications",
  description: "Setup guides for the leading IPTV player apps.",
  itemListElement: playersList.map((player, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: player.name,
    url: `${SITE_URL}/players/${player.slug}`,
  })),
};


export default function PlayersHubPage() {
  return (
    <>
      <PageSchema path="/players" name={title} description={description} type="CollectionPage" nodes={[breadcrumbSchema, itemListSchema]} />

      <Section className="relative overflow-hidden border-b border-white/[0.07] pt-12 pb-14 sm:pt-16 sm:pb-20">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
        <Container className="relative">
          <Breadcrumb
            items={[
              { label: "Players" },
            ]}
          />

          <div className="mt-8 max-w-4xl">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-primary">
              IPTV Software Directory &amp; Architecture
            </span>
            <h1 className="mt-3 font-headline text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Best IPTV Players for 2026: Technical Guides &amp; Comparison
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              An IPTV player is the app that turns your TryIPTV login into a channel list, an on-screen TV guide (EPG) and on-demand menus. Compare seven players that work with TryIPTV, from TV-guide-first apps on Android TV to apps for Apple, Samsung and LG TVs.
            </p>
          </div>

          <div className="mt-10 max-w-4xl">
            <ArticleSummary title="Quick Guide: What is an IPTV Player and How to Choose">
              <p>
                An <strong className="text-foreground font-semibold">IPTV player</strong> is a media application (such as TiviMate, IPTV Smarters Pro, or XCIPTV) that renders live video streams, organizes playlists into channel categories, and parses Electronic Program Guides (EPG). <strong className="text-foreground font-semibold">IPTV players do not provide television content by default.</strong> To stream live channels and movies, you enter your service credentials (an Xtream Codes API username and password or an M3U playlist link) into the player.
              </p>
              <p>
                To choose the right application for your streaming setup:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-base sm:text-sm">
                <li>
                  <strong className="text-foreground font-semibold">Amazon Firestick, Android TV &amp; Google TV:</strong> Choose <Link href="/players/tivimate" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">TiviMate</Link> for television EPG navigation, or <Link href="/players/xciptv" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">XCIPTV Player (OTR Player)</Link> for dual ExoPlayer and VLC playback engines.
                </li>
                <li>
                  <strong className="text-foreground font-semibold">Apple Devices (iPhone, iPad, Apple TV):</strong> Choose <Link href="/players/iptv-smarters" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">IPTV Smarters Pro</Link> (Smarters Player Lite) for native iOS and tvOS App Store availability.
                </li>
                <li>
                  <strong className="text-foreground font-semibold">Smart TVs (Samsung Tizen &amp; LG webOS):</strong> Choose <Link href="/players/iptv-smarters" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">IPTV Smarters Pro</Link> via your TV&apos;s native app store.
                </li>
                <li>
                  <strong className="text-foreground font-semibold">Windows PC &amp; Mac:</strong> Choose <Link href="/players/iptv-smarters" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">IPTV Smarters Pro</Link> or standard desktop media players such as VLC.
                </li>
              </ul>
              <p>
                Once you&apos;ve picked a player, compare <Link href="/pricing" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">IPTV subscription pricing</Link> across the 1, 3, 6 and 12-month plans.
              </p>
            </ArticleSummary>
          </div>
        </Container>
      </Section>

      {/* Comparison Matrix Table */}
      <Section className="py-12 sm:py-16 border-b border-white/[0.07]">
        <Container>
          <div className="max-w-3xl">
            <h2 className="font-headline text-2xl font-bold text-foreground sm:text-3xl">
              IPTV Player Feature &amp; Platform Comparison Matrix
            </h2>
            <p className="mt-2 text-base sm:text-sm text-muted-foreground">
              Direct comparison of platforms, authentication protocols, and standout technical capabilities across the seven major IPTV players.
            </p>
          </div>

          {/* Focusable and labelled so keyboard users can scroll it; on phones it is wider than the screen. */}
          <div
            className="mt-8 overflow-x-auto rounded-xl border border-white/[0.08] bg-white/[0.02]"
            tabIndex={0}
            role="region"
            aria-label="IPTV player comparison table"
          >
            <table className="w-full text-left text-sm whitespace-nowrap lg:whitespace-normal">
              <thead>
                <tr className="border-b border-white/[0.08] bg-white/[0.03] text-xs font-semibold uppercase tracking-wider text-foreground">
                  <th className="p-4">Player App</th>
                  <th className="p-4">Developer</th>
                  <th className="p-4">Supported Platforms</th>
                  <th className="p-4">Login Protocols</th>
                  <th className="p-4">Key Strength</th>
                  <th className="p-4">Guide</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {playersList.map((player) => (
                  <tr key={player.slug} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-semibold text-foreground">
                      <div className="flex items-center gap-2">
                        <player.icon className="h-4 w-4 text-primary shrink-0" />
                        <Link href={`/players/${player.slug}`} className="tap-target hover:text-primary transition-colors">
                          {player.name}
                        </Link>
                      </div>
                    </td>
                    <td className="p-4 text-xs text-muted-foreground font-mono">{player.developer}</td>
                    <td className="p-4 text-xs text-muted-foreground">{player.platforms}</td>
                    <td className="p-4 text-xs text-muted-foreground">{player.protocols}</td>
                    <td className="p-4 text-xs">
                      <span className={`inline-flex rounded-full border px-2 py-0.5 text-xs font-medium ${player.badgeColor}`}>
                        {player.bestFor}
                      </span>
                    </td>
                    <td className="p-4 text-xs">
                      <Button asChild size="sm" variant="ghost" className="h-8 text-primary hover:text-primary">
                        <Link href={`/players/${player.slug}`}>
                          {player.name} guide <ArrowRight className="ml-1 h-3.5 w-3.5" />
                        </Link>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* Detailed Player Cards */}
      <Section className="py-12 sm:py-16">
        <Container>
          <div className="max-w-3xl">
            <h2 className="font-headline text-2xl font-bold text-foreground sm:text-3xl">
              Player Setup Walkthroughs
            </h2>
            <p className="mt-2 text-base sm:text-sm text-muted-foreground">
              Select an IPTV player below for in-depth setup instructions, buffer tuning, EPG integration, and troubleshooting guides:
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {playersList.map((player) => (
              <Card key={player.slug} className="flex min-w-0 flex-col justify-between border-white/[0.08] bg-white/[0.02] transition-all duration-200 motion-safe:hover:-translate-y-1 hover:border-primary/40 hover:bg-white/[0.04]">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${player.badgeColor}`}>
                      <player.icon className="h-3 w-3" />
                      {player.bestFor}
                    </span>
                  </div>
                  <CardTitle className="font-headline text-lg sm:text-xl font-bold text-foreground">
                    <Link href={`/players/${player.slug}`} className="tap-target hover:text-primary transition-colors">
                      {player.name}
                    </Link>
                  </CardTitle>
                  <CardDescription data-small-print className="text-xs text-muted-foreground">
                    By {player.developer} • {player.platforms}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0 flex flex-col justify-between flex-1">
                  <p className="text-base sm:text-sm text-muted-foreground leading-relaxed mb-6">
                    {player.description}
                  </p>
                  <div className="pt-3 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                    <span className="text-xs text-muted-foreground font-mono">
                      {player.pricing}
                    </span>
                    <Button asChild size="sm" variant="ghost" className="h-auto min-h-8 whitespace-normal text-left text-primary hover:text-primary group p-0">
                      <Link href={`/players/${player.slug}`} className="flex items-center gap-1 text-xs">
                        {player.name} setup guide <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Decision Guide: How to choose */}
      <Section className="py-12 sm:py-16 border-t border-white/[0.07] bg-white/[0.01]">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="space-y-8 lg:col-span-8">
              <div>
                <h2 className="font-headline text-2xl font-bold text-foreground sm:text-3xl">
                  How to Choose the Right IPTV Player for Your Setup
                </h2>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  Because different streaming devices use fundamentally different operating systems and hardware decoders, there is no single &quot;one-size-fits-all&quot; player for every situation:
                </p>

                <div className="mt-6 space-y-4">
                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5">
                    <h3 className="font-semibold text-foreground text-base">If You Have an Amazon Firestick or Android TV:</h3>
                    <p className="mt-1 text-base sm:text-sm text-muted-foreground leading-relaxed">
                      Choose <Link href="/players/tivimate" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">TiviMate</Link> if you want a dedicated television EPG grid layout with SMB network recording. Choose <Link href="/players/xciptv" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">XCIPTV Player (OTR Player)</Link> if you want multi-screen sports viewing or selectable playback engines, or <Link href="/players/televizo" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">Televizo</Link> for an uncluttered interface with a functional free tier. (See our step-by-step <Link href="/devices/firestick-iptv" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">Firestick setup</Link> and <Link href="/devices/android-tv-iptv" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">Android TV setup</Link> guides.)
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5">
                    <h3 className="font-semibold text-foreground text-base">If You Stream on Apple Devices, Samsung, or LG Smart TVs:</h3>
                    <p className="mt-1 text-base sm:text-sm text-muted-foreground leading-relaxed">
                      Choose <Link href="/players/iptv-smarters" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">IPTV Smarters Pro</Link>. It is natively available in the Apple App Store, Samsung Smart Hub (Tizen), and LG Content Store (webOS). For device-specific setup, consult our walkthroughs for <Link href="/devices/apple-tv-iptv" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">Apple TV</Link>, <Link href="/devices/samsung-tv-iptv" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">Samsung Smart TV</Link>, or <Link href="/devices/lg-tv-iptv" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">LG Smart TV</Link>.
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5">
                    <h3 className="font-semibold text-foreground text-base">If You Watch High-Framerate 50fps Sports on a 4K OLED TV:</h3>
                    <p className="mt-1 text-base sm:text-sm text-muted-foreground leading-relaxed">
                      Choose <Link href="/players/ott-navigator" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">OTT Navigator</Link>. Its native Auto Frame Rate (AFR) switching synchronizes HDMI refresh rates to reduce frame-rate pacing stutter, and its MPV engine provides hardware deinterlacing for 1080i sports feeds.
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5">
                    <h3 className="font-semibold text-foreground text-base">If You Prefer Web-Portal Setup or Scheduled DVR Recording:</h3>
                    <p className="mt-1 text-base sm:text-sm text-muted-foreground leading-relaxed">
                      Consider <Link href="/players/iptv-extreme" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">IPTV Extreme</Link>. It allows uploading playlists remotely via its web portal and includes granular manual stream buffer configuration for Android devices.
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5">
                    <h3 className="font-semibold text-foreground text-base">If You Are Using Older Legacy Hardware:</h3>
                    <p className="mt-1 text-base sm:text-sm text-muted-foreground leading-relaxed">
                      Consult our <Link href="/players/perfect-player" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">Perfect Player guide</Link>. Although Perfect Player is a legacy application no longer actively maintained on Google Play, its low memory footprint suits older Android set-top boxes.
                    </p>
                  </div>
                </div>
              </div>

              {/* Protocol Guides */}
              <div>
                <h3 className="font-headline text-xl font-bold tracking-tight text-foreground">
                  <Link href="/guides" className="tap-target">Essential Streaming Guides</Link>
                </h3>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 text-xs">
                  <Link href="/guides/what-are-xtream-codes" className="rounded-lg border border-white/[0.06] p-3 hover:bg-white/[0.03] transition-colors block">
                    <div className="font-semibold text-foreground">What Are Xtream Codes?</div>
                    <div className="text-muted-foreground mt-1">How API authentication streamlines IPTV setup.</div>
                  </Link>
                  <Link href="/guides/what-is-m3u" className="rounded-lg border border-white/[0.06] p-3 hover:bg-white/[0.03] transition-colors block">
                    <div className="font-semibold text-foreground">What Is an M3U Playlist?</div>
                    <div className="text-muted-foreground mt-1">Understanding playlist URLs and M3U Plus tags.</div>
                  </Link>
                  <Link href="/guides/what-is-epg" className="rounded-lg border border-white/[0.06] p-3 hover:bg-white/[0.03] transition-colors block">
                    <div className="font-semibold text-foreground">How EPG Schedules Work</div>
                    <div className="text-muted-foreground mt-1">XMLTV guide mapping and schedule synchronization.</div>
                  </Link>
                  <Link href="/help/iptv-buffering" className="rounded-lg border border-white/[0.06] p-3 hover:bg-white/[0.03] transition-colors block">
                    <div className="font-semibold text-foreground">How to Fix IPTV Buffering</div>
                    <div className="text-muted-foreground mt-1">Diagnosing jitter, packet loss, and possible ISP-related issues.</div>
                  </Link>
                  <Link href="/guides/iptv-internet-speed" className="rounded-lg border border-white/[0.06] p-3 hover:bg-white/[0.03] transition-colors block">
                    <div className="font-semibold text-foreground">Internet Speed Requirements</div>
                    <div className="text-muted-foreground mt-1">Bandwidth guidance for HD, FHD, and 4K streaming.</div>
                  </Link>
                  <Link href="/setup" className="rounded-lg border border-white/[0.06] p-3 hover:bg-white/[0.03] transition-colors block">
                    <div className="font-semibold text-foreground">Universal IPTV Setup Guide</div>
                    <div className="text-muted-foreground mt-1">Step-by-step credentials entry and playlist configuration.</div>
                  </Link>
                </div>
              </div>

              {/* FAQs */}
              <div>
                <h2 className="font-headline text-2xl font-bold text-foreground sm:text-3xl">
                  Frequently Asked Questions About IPTV Players
                </h2>
                <div className="mt-6 divide-y divide-white/[0.06] rounded-xl border border-white/[0.08] bg-white/[0.02]">
                  {faqs.map((faq, index) => (
                    <div key={index} className="p-5">
                      <h3 className="font-headline text-base font-semibold text-foreground">
                        {faq.question}
                      </h3>
                      <p className="mt-2 text-base sm:text-sm leading-relaxed text-muted-foreground">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar CTA */}
            <div className="space-y-6 lg:col-span-4">
              <Card className="border-primary/20 bg-primary/[0.03]">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground">Test with TryIPTV</CardTitle>
                  <CardDescription className="text-xs">
                    Compatible with players that support Xtream Codes or M3U credentials.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-base sm:text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>{PRODUCT_TRUTHS.connections} simultaneous stream connections</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>Over {PRODUCT_TRUTHS.channels} live global channels</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>Full Xtream Codes API &amp; M3U Plus URLs</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button asChild className="w-full">
                      <Link href="/iptv-free-trial">
                        Start 24-Hour Free Trial <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <p data-small-print className="mt-2 text-center text-xs text-muted-foreground">
                      Trial login details typically arrive on WhatsApp within {PRODUCT_TRUTHS.activationTime} during support hours
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Hardware Setup Guides */}
              <Card className="border-white/[0.08] bg-white/[0.02]">
                <CardHeader>
                  <CardTitle className="text-base text-foreground">Device Installation Guides</CardTitle>
                </CardHeader>
                {/* Touch: each link is its own 44px row with no gap, so hit areas never overlap; pointer-fine keeps the original spacing. */}
                <CardContent className="space-y-2 text-xs pointer-coarse:space-y-0">
                  <Link href="/setup" className="flex min-h-11 items-center text-primary font-semibold hover:underline pointer-fine:block pointer-fine:min-h-0">
                    → Universal IPTV Setup Guide
                  </Link>
                  <Link href="/devices/firestick-iptv" className="flex min-h-11 items-center text-muted-foreground hover:text-primary pointer-fine:block pointer-fine:min-h-0">
                    → Amazon Firestick IPTV Setup
                  </Link>
                  <Link href="/devices/android-tv-iptv" className="flex min-h-11 items-center text-muted-foreground hover:text-primary pointer-fine:block pointer-fine:min-h-0">
                    → Android TV &amp; Google TV Setup
                  </Link>
                  <Link href="/devices/apple-tv-iptv" className="flex min-h-11 items-center text-muted-foreground hover:text-primary pointer-fine:block pointer-fine:min-h-0">
                    → Apple TV IPTV Setup
                  </Link>
                  <Link href="/devices/samsung-tv-iptv" className="flex min-h-11 items-center text-muted-foreground hover:text-primary pointer-fine:block pointer-fine:min-h-0">
                    → Samsung Smart TV (Tizen) Setup
                  </Link>
                  <Link href="/devices/lg-tv-iptv" className="flex min-h-11 items-center text-muted-foreground hover:text-primary pointer-fine:block pointer-fine:min-h-0">
                    → LG Smart TV (webOS) Setup
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
