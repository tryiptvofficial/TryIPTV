import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Tv,
  Smartphone,
  Laptop,
  Monitor,
  KeyRound,
  FileText,
  AlertCircle,
  HelpCircle,
  PlaySquare,
  Radio,
  Wifi,
  ShieldCheck,
  Layers,
  Sparkles,
} from "lucide-react";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { Container } from "@/components/shared/Container";
import { PageSchema } from "@/components/shared/Schema";
import { Section } from "@/components/shared/Section";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FaqList, type FaqItem } from "@/components/sections/FAQ";
import { generateBreadcrumbSchema } from "@/lib/schema";
import { PRODUCT_TRUTHS, SITE_URL, siteConfig, generateMetadata as generatePageMetadata } from "@/lib/site-config";

const title = "IPTV Setup Hub: From Credentials to Your Device | TryIPTV";
const description =
  "Start with your TryIPTV credentials, pick a device and player, and follow the setup path for Firestick, Android TV, Smart TVs, Apple TV, PC, or mobile.";
const canonical = "/setup";

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

const deviceGuides = [
  {
    name: "Amazon Fire TV Stick",
    slug: "firestick-iptv",
    description: "Install Downloader, configure an IPTV player, and stream on Fire TV Stick 4K, Max, or Lite.",
    icon: Tv,
    badge: "Most Popular",
  },
  {
    name: "Android TV & Google TV",
    slug: "android-tv-iptv",
    description: "Install players directly from the Google Play Store on Sony, TCL, Philips, or Chromecast devices.",
    icon: Tv,
    badge: "Direct Store",
  },
  {
    name: "Samsung Smart TV",
    slug: "samsung-tv-iptv",
    description: "Set up IPTV Smarters Pro or compatible Tizen OS applications from the Samsung App Store.",
    icon: Monitor,
    badge: "Tizen OS",
  },
  {
    name: "LG Smart TV",
    slug: "lg-tv-iptv",
    description: "Install approved player applications on LG webOS televisions via the LG Content Store.",
    icon: Monitor,
    badge: "webOS",
  },
  {
    name: "Apple TV (tvOS)",
    slug: "apple-tv-iptv",
    description: "Configure leading tvOS streaming applications on Apple TV 4K or Apple TV HD.",
    icon: Tv,
    badge: "tvOS",
  },
  {
    name: "iPhone & iPad",
    slug: "iphone-iptv",
    description: "Install an App Store IPTV player, paste your Xtream Codes details, and AirPlay streams to your TV.",
    icon: Smartphone,
    badge: "iOS / iPadOS",
  },
  {
    name: "Google Chromecast",
    slug: "chromecast-iptv",
    description: "Stream via Google TV interface or cast streams wirelessly from your phone, tablet, or browser.",
    icon: Tv,
    badge: "Google Cast",
  },
  {
    name: "MAG Set-Top Box",
    slug: "mag-box-iptv",
    description: "Configure Infomir MAG devices (MAG 250, 322, 421, etc.) using portal URL and Stalker middleware.",
    icon: Layers,
    badge: "Stalker / Portal",
  },
  {
    name: "Roku Devices",
    slug: "roku-iptv",
    description: "Screen mirroring and IPTV player casting solutions for Roku Express, Streaming Stick, and Roku TV.",
    icon: Tv,
    badge: "Mirroring / Cast",
  },
  {
    name: "Windows PC",
    slug: "windows-iptv",
    description: "Watch on Windows 10 & 11 computers using IPTV Smarters for PC, desktop media players, or VLC.",
    icon: Laptop,
    badge: "Windows 10/11",
  },
  {
    name: "Apple Mac (macOS)",
    slug: "mac-iptv",
    description: "Set up IPTV on macOS with native player apps, VLC media player, or browser-based web portals.",
    icon: Laptop,
    badge: "macOS",
  },
];

const featuredPlayers = [
  {
    name: "TiviMate IPTV Player",
    slug: "tivimate",
    platforms: "Android TV, Google TV, Fire TV",
    description: "A TV-style app with a timeline TV guide (EPG), multi-view and fast channel switching.",
  },
  {
    name: "IPTV Smarters Pro",
    slug: "iptv-smarters",
    platforms: "iOS, Android, Fire TV, Samsung, LG, PC, Mac",
    description: "Universal multi-platform player with built-in multi-screen, category filtering, and catch-up support.",
  },
  {
    name: "XCIPTV Player",
    slug: "xciptv",
    platforms: "Android TV, Fire TV, Android Mobile",
    description: "Dual playback engines (ExoPlayer and VLC), customizable layout, and multi-screen live grid.",
  },
  {
    name: "Televizo",
    slug: "televizo",
    platforms: "Android TV, Android Tablets & Phones, Fire TV",
    description: "Clean modern design supporting both remote navigation and touch controls, plus Google Cast.",
  },
  {
    name: "Perfect Player",
    slug: "perfect-player",
    platforms: "Android TV, Fire TV, Windows PC",
    description: "Traditional cable set-top box interface designed for responsive M3U and XMLTV playlist rendering.",
  },
  {
    name: "OTT Navigator",
    slug: "ott-navigator",
    platforms: "Android TV, Google TV, Android Mobile",
    description: "Power-user player with studio multi-window mode, automatic frame rate matching, and archive scrubbing.",
  },
  {
    name: "IPTV Extreme",
    slug: "iptv-extreme",
    platforms: "Android TV, Android Mobile, Fire TV",
    description: "Feature-packed player with web portal playlist uploading, multi-EPG support, and recording.",
  },
];

const setupSteps = [
  {
    step: "01",
    title: "Identify Your Device & Connection",
    description:
      "Decide which television, streaming stick, computer, or mobile device you want to use. For smooth playback, connect via wired Ethernet or a stable 5GHz Wi-Fi network.",
  },
  {
    step: "02",
    title: "Install a Compatible IPTV Player",
    description:
      "Download a reputable third-party media player from your device's official application store (such as TiviMate on Android TV or IPTV Smarters Pro on Smart TVs and iOS).",
  },
  {
    step: "03",
    title: "Open the App & Select Login Method",
    description:
      "Launch the application and select 'Add Playlist' or 'Add User'. Where supported, choose Xtream Codes API as your preferred connection protocol.",
  },
  {
    step: "04",
    title: "Enter Your Subscription Credentials",
    description:
      "Input your Server URL, Username, and Password exactly as provided in your TryIPTV activation details. Check carefully to avoid extra spaces added by mobile auto-correct.",
  },
  {
    step: "05",
    title: "Synchronize Channels & Categories",
    description:
      "Click 'Login' or 'Save'. The player will connect to the server and download channel lists, VOD directories, and category groups. Initial synchronization time varies based on playlist size and network connection.",
  },
  {
    step: "06",
    title: "Load the TV Guide (EPG)",
    description:
      "Navigate to the electronic program guide section in your app to ensure channel schedules and program information have populated.",
  },
  {
    step: "07",
    title: "Verify Playback & Enjoy Streaming",
    description:
      "Select a live channel to confirm audio and video decoding. You can now browse live TV, sporting events, and video on demand across your permitted 2 simultaneous connections.",
  },
];

const troubleshootingItems = [
  {
    problem: "Stream keeps buffering or freezing",
    href: "/help/iptv-buffering",
    description: "Diagnose local Wi-Fi packet drops, buffer size settings, decoder overload, or ISP congestion.",
  },
  {
    problem: "Channels won't play or screen is black",
    href: "/help/iptv-not-working",
    description: "Work through a systematic checklist to verify server reachability, device cache, and network status.",
  },
  {
    problem: "Login details or authentication failed",
    href: "/help/iptv-login-not-working",
    description: "Resolve 'Invalid Details' notices, 401/403 authorization errors, and credential syntax issues.",
  },
  {
    problem: "M3U playlist link will not load",
    href: "/help/m3u-not-loading",
    description: "Troubleshoot download timeouts, URL character truncation, and player memory capacity limits.",
  },
  {
    problem: "EPG TV guide is empty or missing data",
    href: "/help/epg-not-working",
    description: "Fix time zone discrepancies, outdated guide caches, and XMLTV source assignment errors.",
  },
];

const setupFaqs: FaqItem[] = [
  {
    question: "What do I need to set up IPTV?",
    answer:
      "To set up IPTV, you need three elements: a reliable high-speed internet connection (recommended 25+ Mbps for Full HD and 50+ Mbps for 4K), a compatible streaming device or Smart TV, and a third-party IPTV player application. Once you have these, you simply enter the subscription credentials (Xtream Codes API details or M3U playlist link) provided with your TryIPTV account.",
  },
  {
    question: "Should I set up using Xtream Codes API or M3U playlist?",
    answer:
      "We recommend using Xtream Codes API whenever your player application supports it. Xtream Codes separates your login into Server URL, Username, and Password, automatically organizes Live TV, Movies, and Series into clean categories, and can sync the EPG guide. M3U playlist URLs are an alternative for software like VLC or older media players that lack API support.",
  },
  {
    question: "Can I set up IPTV directly on a Smart TV without an external stick?",
    answer:
      "Yes. Most modern Smart TVs support IPTV directly. Samsung Smart TVs running Tizen OS and LG Smart TVs running webOS have compatible applications like IPTV Smarters Pro available in their official application stores. If you have an Android TV or Google TV (such as Sony, TCL, or Hisense), you can install players directly from Google Play. However, for the fastest navigation and broadest codec support, a dedicated 4K streaming stick (such as a Fire TV Stick 4K or Apple TV) remains an outstanding option.",
  },
  {
    question: "Can I use my IPTV subscription on multiple devices?",
    answer:
      "Yes. You can install your subscription credentials on as many devices as you like (such as your living room TV, bedroom TV, computer, and mobile phone). Every TryIPTV subscription includes 2 simultaneous connections, allowing two devices to stream concurrently at the exact same time.",
  },
  {
    question: "How long does it take to activate and configure my subscription?",
    answer:
      `Credentials are typically delivered on WhatsApp within ${PRODUCT_TRUTHS.activationTime} of order or trial confirmation, ${PRODUCT_TRUTHS.activationHours}. Once you receive your credentials, entering your Server URL, Username, and Password into your player completes the initial connection.`,
  },
];

export default function SetupPage() {
  const baseUrl = siteConfig.url;

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", item: `${baseUrl}/` },
    { name: "Setup Hub", item: `${baseUrl}/setup` },
  ]);

  return (
    <>
      <PageSchema path="/setup" name={title.replace(" | TryIPTV", "")} description={description} nodes={[breadcrumbSchema]} />

      {/* Hero Section */}
      <Section className="relative overflow-hidden border-b border-white/[0.07] pt-12 pb-14 sm:pt-16 sm:pb-20">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
        <Container className="relative text-center">
          <Breadcrumb items={[{ label: "Setup Hub" }]} align="center" />
          <SectionHeader
            as="h1"
            eyebrow="Universal Installation Directory"
            title="Start Here: Set Up Your IPTV Service"
            subtitle="Use this onboarding path to go from your TryIPTV credentials to the right device and player setup. Choose your hardware, select a compatible app, and follow the linked platform guide."
          />
        </Container>
      </Section>

      {/* Quick Summary / Introduction */}
      <Section className="py-10 sm:py-14 border-b border-white/[0.06]">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-3.5 py-1 text-xs font-semibold text-primary mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              Quick Answer
            </div>
            <h2 className="font-headline text-2xl sm:text-3xl font-bold text-foreground mb-3">How do I set up IPTV?</h2>
            <p className="text-base sm:text-lg leading-relaxed text-foreground font-medium mb-6">
              Setting up IPTV takes the same five steps on every device. Pick your device and install an IPTV player app. Then
              enter your TryIPTV login, which is either an <strong>Xtream Codes</strong> login (a server address, username and password) or an{" "}
              <strong>M3U link</strong> (a playlist web address). Once the channels and the TV guide load, you can watch on up to{" "}
              {PRODUCT_TRUTHS.connections} screens at once:
            </p>
            <ol className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-left">
              {[
                { num: "1", label: "Choose device", desc: "TV, stick, PC, or phone" },
                { num: "2", label: "Install player", desc: "From official app store" },
                { num: "3", label: "Add login", desc: "Xtream API or M3U link" },
                { num: "4", label: "Sync content", desc: "Channels and TV guide" },
                { num: "5", label: "Start watching", desc: "Stream across 2 connections" },
              ].map((item) => (
                <li
                  key={item.num}
                  className="rounded-lg border border-white/[0.08] bg-[#0c100d] p-3.5 transition-colors hover:border-primary/30"
                >
                  <div className="text-xs font-mono font-bold text-primary mb-1" aria-hidden="true">0{item.num}</div>
                  <div className="text-sm font-extrabold text-foreground">{item.label}</div>
                  <div className="text-sm text-muted-foreground mt-0.5 sm:text-[13px]">{item.desc}</div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      {/* Before You Start */}
      <Section className="py-12 sm:py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5">
              <div className="sticky top-24">
                <span className="eyebrow mb-1">Prerequisites</span>
                <h2 className="font-headline text-2xl sm:text-3xl font-bold text-foreground mb-4">
                  What do I need to set up IPTV?
                </h2>
                <p className="text-base leading-relaxed text-muted-foreground mb-6">
                  You need an internet connection (about 25 Mbps for HD, 50 Mbps for 4K), a compatible device, an IPTV player app and
                  your TryIPTV login details.
                </p>
                <div className="rounded-xl border border-primary/20 bg-primary/[0.04] p-5 space-y-3">
                  <div className="flex items-center gap-2 text-base sm:text-xs font-bold text-primary">
                    <ShieldCheck className="h-4 w-4" />
                    Security &amp; Account Protection
                  </div>
                  <p className="text-base sm:text-xs leading-relaxed text-muted-foreground">
                    Never input your subscription credentials on public forums or unverified websites. Enter your details only into your chosen, trusted media player application on your local device.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <Card className="border-white/[0.08] bg-card/60">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="grid h-9 w-9 place-items-center rounded-lg border border-primary/20 bg-primary/[0.06] text-primary">
                      <Wifi className="h-4 w-4" />
                    </div>
                    <div>
                      <CardTitle as="h3" className="text-base font-extrabold">1. High-Speed Internet Connection</CardTitle>
                      <CardDescription className="text-sm sm:text-xs">Wired Ethernet or 5GHz Wi-Fi recommended</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="text-base sm:text-sm text-muted-foreground leading-relaxed">
                  Stable streaming requires consistent download bandwidth: about 25–35 Mbps for one 1080p Full HD stream and 50–60 Mbps for one 4K Ultra HD stream. A wired Ethernet cable or low-interference 5GHz Wi-Fi connection reduces buffering.
                </CardContent>
              </Card>

              <Card className="border-white/[0.08] bg-card/60">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="grid h-9 w-9 place-items-center rounded-lg border border-primary/20 bg-primary/[0.06] text-primary">
                      <Tv className="h-4 w-4" />
                    </div>
                    <div>
                      <CardTitle as="h3" className="text-base font-extrabold">2. Compatible Streaming Hardware</CardTitle>
                      <CardDescription className="text-sm sm:text-xs">Television, streaming stick, computer, or mobile</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="text-base sm:text-sm text-muted-foreground leading-relaxed">
                  IPTV runs on virtually all modern hardware: Amazon Fire TV Sticks, Android TV boxes, Google Chromecast, Apple TV, Smart TVs (Samsung Tizen &amp; LG webOS), Windows PCs, Macs, iPhones, and Android devices.
                </CardContent>
              </Card>

              <Card className="border-white/[0.08] bg-card/60">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="grid h-9 w-9 place-items-center rounded-lg border border-primary/20 bg-primary/[0.06] text-primary">
                      <Layers className="h-4 w-4" />
                    </div>
                    <div>
                      <CardTitle as="h3" className="text-base font-extrabold">3. A Third-Party IPTV Player Application</CardTitle>
                      <CardDescription className="text-sm sm:text-xs">Software interface to decode and display streams</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="text-base sm:text-sm text-muted-foreground leading-relaxed">
                  TryIPTV supplies server access and credentials. You choose the player app (such as TiviMate, IPTV Smarters Pro, or XCIPTV) to manage your channel lists, program guide, and playback interface.
                </CardContent>
              </Card>

              <Card className="border-white/[0.08] bg-card/60">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="grid h-9 w-9 place-items-center rounded-lg border border-primary/20 bg-primary/[0.06] text-primary">
                      <KeyRound className="h-4 w-4" />
                    </div>
                    <div>
                      <CardTitle as="h3" className="text-base font-extrabold">4. Your Active Subscription Credentials</CardTitle>
                      <CardDescription className="text-sm sm:text-xs">Delivered on WhatsApp within {PRODUCT_TRUTHS.activationTime} of payment confirmation</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="text-base sm:text-sm text-muted-foreground leading-relaxed">
                  TryIPTV delivers credentials formatted for both standard connection methods:
                  <ul className="mt-2 space-y-1.5 list-disc list-inside text-foreground/90">
                    <li><strong className="text-primary font-semibold">Xtream Codes API:</strong> Server URL, Username, and Password.</li>
                    <li><strong className="text-primary font-semibold">M3U Playlist URL:</strong> A complete web link containing your stream authentication token.</li>
                  </ul>
                  Every subscription allows up to <strong>{PRODUCT_TRUTHS.connections} simultaneous connections</strong>.
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* Choose Your Device */}
      <Section className="py-12 sm:py-16 border-t border-white/[0.06] bg-[#070908]">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <span className="eyebrow mb-1">Hardware Setup</span>
              <h2 className="font-headline text-2xl sm:text-3xl font-bold text-foreground">
                Choose Your Device
              </h2>
              <p className="mt-1.5 text-base sm:text-sm text-muted-foreground max-w-xl">
                Select your streaming hardware below for a step-by-step installation walkthrough with device-specific menu navigation.
              </p>
            </div>
            <Button asChild variant="outline" size="sm" className="self-start sm:self-auto shrink-0">
              <Link href="/devices">
                View All Devices Hub <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {deviceGuides.map((device) => {
              const Icon = device.icon;
              return (
                <Card
                  key={device.slug}
                  className="flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:bg-card/80"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="inline-flex items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-0.5 text-xs font-semibold text-primary">
                        <Icon className="h-3 w-3" />
                        {device.badge}
                      </span>
                    </div>
                    <CardTitle as="h3" className="font-headline text-lg font-extrabold">
                      <Link href={`/devices/${device.slug}`} className="tap-target hover:text-primary transition-colors">
                        {device.name}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 flex flex-col justify-between flex-1">
                    <p className="text-base sm:text-sm text-muted-foreground leading-relaxed mb-5">
                      {device.description}
                    </p>
                    <div className="pt-3 border-t border-white/[0.06] flex items-center justify-end">
                      <Link
                        href={`/devices/${device.slug}`}
                        className="tap-target inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                      >
                        {device.name} setup guide <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Choose an IPTV Player */}
      <Section className="py-12 sm:py-16 border-t border-white/[0.06]">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
            <div>
              <span className="eyebrow mb-1">Software Selection</span>
              <h2 className="font-headline text-2xl sm:text-3xl font-bold text-foreground">
                Choose an IPTV Player Application
              </h2>
              <p className="mt-1.5 text-base sm:text-sm text-muted-foreground max-w-[60ch]">
                TryIPTV supplies your stream access credentials. Independent media players decode and display the streams on your screen. You have complete freedom to choose the app that suits your preferences.
              </p>
            </div>
            <Button asChild variant="outline" size="sm" className="self-start sm:self-auto shrink-0">
              <Link href="/players">
                Browse Player Directory <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>

          <div className="rounded-xl border border-white/[0.08] bg-[#0b0e0c] p-4 sm:p-5 mb-8 text-base sm:text-xs text-muted-foreground leading-relaxed">
            <strong className="text-foreground font-semibold">Important Distinction:</strong> Third-party player applications (such as TiviMate, IPTV Smarters Pro, XCIPTV, and Televizo) are independent software tools built by external developers. TryIPTV does not own, develop, sell, or claim ownership over these applications. We provide configuration guides strictly as educational assistance.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredPlayers.map((player) => (
              <Card key={player.slug} className="flex flex-col justify-between transition-all duration-200 hover:border-primary/40">
                <CardHeader className="pb-2">
                  <div className="text-xs font-semibold text-primary mb-1">
                    {player.platforms}
                  </div>
                  <CardTitle as="h3" className="text-lg font-extrabold">
                    <Link href={`/players/${player.slug}`} className="tap-target hover:text-primary transition-colors">
                      {player.name}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 flex flex-col justify-between flex-1">
                  <p className="text-base sm:text-xs text-muted-foreground leading-relaxed mb-4">
                    {player.description}
                  </p>
                  <div className="pt-2.5 border-t border-white/[0.06] flex items-center justify-end">
                    <Link
                      href={`/players/${player.slug}`}
                      className="tap-target inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                    >
                      {player.name} setup guide <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Xtream Codes vs M3U Setup */}
      <Section className="py-12 sm:py-16 border-t border-white/[0.06] bg-[#070908]">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-10">
            <span className="eyebrow mb-1">Connection Protocols</span>
            <h2 className="font-headline text-2xl sm:text-3xl font-bold text-foreground">
              Xtream Codes vs. M3U Setup Explained
            </h2>
            <p className="mt-2 text-base sm:text-sm text-muted-foreground leading-relaxed">
              When activating an IPTV player, you will usually be prompted to choose between logging in with an Xtream Codes API or loading an M3U Playlist URL. Here is how they compare.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="border-primary/30 bg-card/80">
              <CardHeader>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/[0.08] px-2.5 py-0.5 text-xs font-bold text-primary mb-2 self-start">
                  <KeyRound className="h-3.5 w-3.5" />
                  Recommended Method
                </div>
                <CardTitle as="h3" className="text-xl font-extrabold">Xtream Codes API</CardTitle>
                <CardDescription className="text-sm sm:text-xs">Modern, fast, structured credential format</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-base sm:text-sm text-muted-foreground leading-relaxed">
                <p>
                  Xtream Codes uses three distinct fields provided by your service:
                </p>
                <div className="rounded-lg border border-white/[0.08] bg-[#101411] p-3 font-mono text-xs text-foreground/90 space-y-1">
                  <div><strong className="text-primary">Server URL:</strong> http://portal-domain:port</div>
                  <div><strong className="text-primary">Username:</strong> your_username</div>
                  <div><strong className="text-primary">Password:</strong> your_password</div>
                </div>
                <ul className="space-y-2 text-base sm:text-xs text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>Faster initial playlist sync because data is queried on demand.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>Automatically sorts Live Channels, Movies, and Series into folders.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>Syncs TV guide (EPG) schedules without entering separate XMLTV links.</span>
                  </li>
                </ul>
                <div className="pt-2 border-t border-white/[0.06]">
                  <Link href="/guides/what-are-xtream-codes" className="tap-target inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline">
                    Read Xtream Codes Guide <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/[0.08] bg-card/60">
              <CardHeader>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-0.5 text-xs font-bold text-muted-foreground mb-2 self-start">
                  <FileText className="h-3.5 w-3.5" />
                  Universal Format
                </div>
                <CardTitle as="h3" className="text-xl font-extrabold">M3U Playlist URL</CardTitle>
                <CardDescription className="text-sm sm:text-xs">Plaintext index compatible with any player</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-base sm:text-sm text-muted-foreground leading-relaxed">
                <p>
                  M3U setup uses a single extended web link containing your streaming token:
                </p>
                <div className="rounded-lg border border-white/[0.08] bg-[#101411] p-3 font-mono text-xs text-foreground/90 break-all">
                  <strong className="text-primary">M3U URL:</strong> https://domain/get.php?username=...&amp;password=...&amp;type=m3u_plus
                </div>
                <ul className="space-y-2 text-base sm:text-xs text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>Universally supported by almost all media players (including VLC).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>Useful for simple hardware devices lacking dedicated API support.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>May take slightly longer to parse large channel directories.</span>
                  </li>
                </ul>
                <div className="pt-2 border-t border-white/[0.06]">
                  <Link href="/guides/m3u-vs-xtream-codes" className="tap-target inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline">
                    Compare M3U vs Xtream Codes <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Basic Setup Process */}
      <Section className="py-12 sm:py-16 border-t border-white/[0.06]">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-12">
            <span className="eyebrow mb-1">Standard Workflow</span>
            <h2 className="font-headline text-2xl sm:text-3xl font-bold text-foreground">
              How do I set up IPTV step by step?
            </h2>
            <p className="mt-2 text-base sm:text-sm text-muted-foreground leading-relaxed">
              The five steps above, broken down into seven. Exact buttons differ between player apps, but this sequence works in almost
              every one.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {setupSteps.map((s) => (
              <div
                key={s.step}
                className="flex flex-col sm:flex-row items-start gap-4 rounded-xl border border-white/[0.08] bg-[#0c100d] p-5 transition-colors hover:border-white/[0.15]"
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-primary/20 bg-primary/[0.08] font-mono text-sm font-bold text-primary">
                  {s.step}
                </div>
                <div className="flex-1">
                  <h3 className="font-headline text-base font-extrabold text-foreground mb-1">
                    {s.title}
                  </h3>
                  <p className="text-base sm:text-sm text-muted-foreground leading-relaxed">
                    {s.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center text-base sm:text-xs text-muted-foreground">
            Looking for device-specific instructions with step-by-step screenshots? Visit our{" "}
            {/* 44px tall on touch screens (same pattern as the footer links); normal inline text with a mouse. */}
            <Link href="/devices" className="inline-flex min-h-11 items-center text-primary font-semibold hover:underline pointer-fine:min-h-0">
              All Devices Directory
            </Link>{" "}
            or select your hardware above.
          </div>
        </Container>
      </Section>

      {/* Having Problems? Troubleshooting */}
      <Section className="py-12 sm:py-16 border-t border-white/[0.06] bg-[#070908]">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <span className="eyebrow mb-1">Self-Help Directory</span>
              <h2 className="font-headline text-2xl sm:text-3xl font-bold text-foreground">
                Having Setup or Playback Problems?
              </h2>
              <p className="mt-1.5 text-base sm:text-sm text-muted-foreground max-w-xl">
                Most setup hurdles can be resolved by checking network stability, credential formatting, or decoder settings.
              </p>
            </div>
            <Button asChild variant="outline" size="sm" className="self-start sm:self-auto shrink-0">
              <Link href="/help">
                Visit Help Directory <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {troubleshootingItems.map((item) => (
              <Card key={item.href} className="flex flex-col justify-between transition-all duration-200 hover:border-rose-400/40">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold mb-1">
                    <AlertCircle className="h-3.5 w-3.5" />
                    Troubleshooting Guide
                  </div>
                  <CardTitle as="h3" className="text-base font-extrabold">
                    <Link href={item.href} className="tap-target hover:text-primary transition-colors">
                      {item.problem}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 flex flex-col justify-between flex-1">
                  <p className="text-base sm:text-xs text-muted-foreground leading-relaxed mb-4">
                    {item.description}
                  </p>
                  <div className="pt-2.5 border-t border-white/[0.06] flex items-center justify-end">
                    <Link
                      href={item.href}
                      className="tap-target inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                    >
                      Troubleshooting Steps <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card className="flex flex-col justify-between border-primary/20 bg-primary/[0.03]">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 text-primary text-xs font-semibold mb-1">
                  <HelpCircle className="h-3.5 w-3.5" />
                  Direct Assistance
                </div>
                <CardTitle as="h3" className="text-base font-extrabold text-foreground">
                  Need Help from Our Team?
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 flex flex-col justify-between flex-1">
                <p className="text-base sm:text-xs text-muted-foreground leading-relaxed mb-4">
                  If you run into an issue that our self-help guides cannot resolve, contact our support desk via email or WhatsApp live chat.
                </p>
                <div className="pt-2.5 border-t border-white/[0.06] flex items-center justify-end">
                  <Link
                    href="/contact-us"
                    className="tap-target inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                  >
                    Contact Support <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* New to IPTV? Educational Resources */}
      <Section className="py-12 sm:py-16 border-t border-white/[0.06]">
        <Container>
          <div className="rounded-2xl border border-white/[0.08] bg-[#0c100d] p-6 sm:p-10">
            <div className="max-w-2xl">
              <span className="eyebrow mb-1">Educational Background</span>
              <h2 className="font-headline text-xl sm:text-2xl font-extrabold text-foreground mb-3">
                New to IPTV? Learn the Fundamentals
              </h2>
              <p className="text-base sm:text-sm text-muted-foreground leading-relaxed mb-6">
                Understand how internet protocol television works under the hood. Our technical guides break down stream transmission, playlist formats, and API authentication in clear, accessible detail.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link
                href="/guides/what-is-iptv"
                className="group rounded-lg border border-white/[0.08] bg-black/40 p-4 transition-all duration-200 hover:border-primary/40 hover:bg-black/60"
              >
                <div className="flex items-center gap-2 text-primary text-xs font-semibold mb-1">
                  <Radio className="h-3.5 w-3.5" />
                  Architecture
                </div>
                <h3 className="text-sm font-extrabold text-foreground group-hover:text-primary transition-colors">
                  What is IPTV?
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  How packetized IP streams compare to legacy cable and satellite.
                </p>
              </Link>

              <Link
                href="/guides/what-is-m3u"
                className="group rounded-lg border border-white/[0.08] bg-black/40 p-4 transition-all duration-200 hover:border-primary/40 hover:bg-black/60"
              >
                <div className="flex items-center gap-2 text-primary text-xs font-semibold mb-1">
                  <FileText className="h-3.5 w-3.5" />
                  File Formats
                </div>
                <h3 className="text-sm font-extrabold text-foreground group-hover:text-primary transition-colors">
                  What is an M3U Playlist?
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Playlist syntax, #EXTINF directives, and group tags explained.
                </p>
              </Link>

              <Link
                href="/guides/what-are-xtream-codes"
                className="group rounded-lg border border-white/[0.08] bg-black/40 p-4 transition-all duration-200 hover:border-primary/40 hover:bg-black/60"
              >
                <div className="flex items-center gap-2 text-primary text-xs font-semibold mb-1">
                  <KeyRound className="h-3.5 w-3.5" />
                  API Logins
                </div>
                <h3 className="text-sm font-extrabold text-foreground group-hover:text-primary transition-colors">
                  What are Xtream Codes?
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  How the standard API login handles categories and authentication.
                </p>
              </Link>
            </div>
            <div className="mt-6 text-right">
              <Link href="/guides" className="tap-target inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline">
                Explore All Educational Guides <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* Frequently Asked Questions */}
      <Section className="py-12 sm:py-16 border-t border-white/[0.06] bg-[#070908]">
        <Container>
          <SectionHeader
            as="h2"
            title="Setup &amp; Installation FAQ"
            subtitle="Straightforward answers to the most common setup, device compatibility, and credential questions."
            eyebrow="Direct Answers"
          />
          <FaqList items={setupFaqs} />
        </Container>
      </Section>

      {/* Secondary Contextual CTA */}
      <Section className="py-12 sm:py-16 border-t border-white/[0.06]">
        <Container>
          <div className="relative overflow-hidden rounded-2xl border border-primary/25 bg-[#0b100d] p-8 sm:p-10 text-center max-w-3xl mx-auto">
            <div className="absolute inset-x-0 top-0 h-1 bg-primary sm:inset-y-0 sm:left-0 sm:h-full sm:w-1" />
            <span className="eyebrow mb-2">Ready to Get Started?</span>
            <h2 className="font-headline text-2xl sm:text-3xl font-bold text-foreground">
              Experience High-Definition IPTV Streaming
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base sm:text-sm leading-relaxed text-muted-foreground">
              Test stream reliability, channel availability, and player compatibility with our 24-hour free trial (no credit card required), or explore transparent IPTV plans with 2 simultaneous connections.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg">
                <Link href="/iptv-free-trial">Start 24-Hour Free Trial</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/pricing">View IPTV Plans (${PRODUCT_TRUTHS.plans[0].price.toFixed(2)}/mo)</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
