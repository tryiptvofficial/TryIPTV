import { notFound, permanentRedirect } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { FaqList } from "@/components/sections/FAQ";
import { howToArticles, getSafeArticleData, isRedirectedDevice, getDeviceSlug } from "@/lib/how-to";
import {
  Clock,
  Calendar,
  Tv,
  Wifi,
  Layers,
  KeyRound,
  Monitor,
  Laptop,
  Smartphone,
  HardDrive,
} from "lucide-react";
import InternalLinks from "@/components/shared/InternalLinks";
import { GuideByline } from "@/components/shared/GuideByline";
import { PageSchema } from "@/components/shared/Schema";
import { generateArticleSchema, generateBreadcrumbSchema } from "@/lib/schema";
import { siteConfig, generateMetadata as generatePageMetadata } from "@/lib/site-config";
import {
  GuideQuickInfo,
  GuideRequirements,
  GuideStepList,
  GuideComparisonTable,
  GuideTroubleshooting,
  GuideBufferingChecklist,
  GuideCallout,
  GuideToc,
  GuideCta,
  GuideScreenshot,
  type RequirementItem,
  type TocItem,
} from "@/components/guide";

type Props = {
  params: Promise<{ device: string }>;
};

type ArticleType = ReturnType<typeof getSafeArticleData> & { 
    image?: { 
        imageUrl: string; 
        imageHint?: string; 
        width?: number; 
        height?: number; 
        blurDataURL?: string;
    } 
};

async function getArticleData(deviceId: string): Promise<ArticleType | undefined> {
    const article = getSafeArticleData(deviceId);
    if (!article) return undefined;

    return {
        ...article,
        image: undefined,
    };
}

function StructuredData({ article }: { article: ArticleType }) {
    if (!article) return null;
    const { id, title, description, image, dateModified } = article;
    const baseUrl = siteConfig.url;

    const articleSchema = generateArticleSchema({
        headline: title,
        description,
        image: image?.imageUrl,
        dateModified,
        url: `${baseUrl}/devices/${id}`,
    });

    // HowTo and FAQPage are not emitted here: the shared Schema rule drops both (see Schema.tsx).
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", item: `${baseUrl}/` },
        { name: "Devices", item: `${baseUrl}/devices` },
        { name: title, item: `${baseUrl}/devices/${id}` }
    ]);

    return (
        <>
            <PageSchema nodes={[articleSchema, breadcrumbSchema]} />
        </>
    );
}

// Per-device metadata overrides where the SERP <title> or meta description
// needs to differ from the on-page H1 / visible lede paragraph.
const DEVICE_SEO_OVERRIDES: Record<string, { seoTitle?: string; metaDescription?: string }> = {
  'firestick-iptv': {
    seoTitle: 'How to Install IPTV on Firestick (2026 Guide)',
    metaDescription: 'Learn how to install IPTV on Firestick step by step. Set up an IPTV player using Xtream Codes or M3U, load your EPG, and fix common Fire TV issues.',
  },
  firestick: {
    seoTitle: 'How to Install IPTV on Firestick (2026 Guide)',
    metaDescription: 'Learn how to install IPTV on Firestick step by step. Set up an IPTV player using Xtream Codes or M3U, load your EPG, and fix common Fire TV issues.',
  },
  'android-tv-iptv': {
    seoTitle: 'IPTV on Android TV: Apps & Setup Guide (2026)',
    metaDescription: 'Learn how to set up IPTV on Android TV and Google TV, choose a compatible player, install it from Google Play, and connect with Xtream Codes or M3U.',
  },
  'samsung-tv-iptv': {
    seoTitle: 'How to Install IPTV on Samsung Smart TV (Tizen)',
    metaDescription: 'Set up IPTV on a Samsung Smart TV with Tizen OS: pick a Smart Hub app such as IBO Player, add your login via its web portal, and fix audio format issues.',
  },
  'lg-tv-iptv': {
    seoTitle: 'How to Install IPTV on LG Smart TV (webOS)',
    metaDescription: 'Set up IPTV on an LG Smart TV running webOS: find compatible players in the LG Content Store, manage large playlists, and fix audio sync issues.',
  },
  'apple-tv-iptv': {
    seoTitle: 'How to Set Up IPTV on Apple TV (tvOS Guide)',
    metaDescription: 'Set up IPTV on Apple TV (tvOS): pick a player like iPlayTV or UHF, enter Xtream Codes via iPhone keyboard or web upload, and set Match Frame Rate.',
  },
  'chromecast-iptv': {
    seoTitle: 'How to Watch IPTV on Chromecast & Google TV',
    metaDescription: 'Learn how to watch IPTV on Chromecast: install a player app on Chromecast with Google TV, or cast from your phone to older Chromecast devices.',
  },
  'mag-box-iptv': {
    seoTitle: 'MAG Box IPTV Setup: Stalker Portal Guide',
    metaDescription: 'Set up IPTV on an Infomir MAG box: find your MAC address, enter the Portal URL in Inner Portal settings, set NTP time servers, and fix loading errors.',
  },
  'roku-iptv': {
    seoTitle: 'How to Watch IPTV on Roku: AirPlay & Mirroring',
    metaDescription: 'Learn how to watch IPTV on Roku using AirPlay 2, screen mirroring, or casting. App availability can change, so check the Roku Channel Store in your region.',
  },
  'windows-iptv': {
    seoTitle: 'IPTV on Windows: Players & PC Setup Guide',
    metaDescription: 'Learn how to use IPTV on a Windows 10 or 11 PC: choose a compatible player, connect with Xtream Codes or M3U, and download apps only from trusted sources.',
  },
  'iphone-iptv': {
    seoTitle: 'IPTV on iPhone & iPad: App Store Setup Guide',
    metaDescription: 'Set up IPTV on iPhone or iPad: install a player from the App Store, add Xtream Codes or M3U, load the TV guide, and send streams to your TV with AirPlay.',
  },
  'mac-iptv': {
    seoTitle: 'How to Set Up IPTV on a Mac (macOS Guide)',
    metaDescription: 'Stream IPTV on a MacBook, iMac, or Mac mini: choose a native player like UHF or IINA, handle macOS Gatekeeper permissions, and use Picture-in-Picture.',
  },
};

interface DeviceQuickSpecs {
  setupMethod: string;
  loginFormat: string;
  difficulty: string;
}

const DEVICE_QUICK_SPECS: Record<string, DeviceQuickSpecs> = {
  'firestick-iptv': {
    setupMethod: 'Downloader Sideloading',
    loginFormat: 'Xtream Codes or M3U',
    difficulty: 'Simple Guided Setup',
  },
  'android-tv-iptv': {
    setupMethod: 'Google Play / Sideload',
    loginFormat: 'Xtream Codes or M3U',
    difficulty: 'Simple Guided Setup',
  },
  'samsung-tv-iptv': {
    setupMethod: 'Tizen App + Web Upload',
    loginFormat: 'Xtream Codes, M3U, or Portal',
    difficulty: 'Simple Guided Setup',
  },
  'lg-tv-iptv': {
    setupMethod: 'LG Content Store App',
    loginFormat: 'Xtream Codes or M3U',
    difficulty: 'Simple Guided Setup',
  },
  'apple-tv-iptv': {
    setupMethod: 'tvOS App Store Player',
    loginFormat: 'Xtream Codes or M3U',
    difficulty: 'Simple Guided Setup',
  },
  'chromecast-iptv': {
    setupMethod: 'Google TV App or Casting',
    loginFormat: 'Xtream Codes or M3U',
    difficulty: 'Simple Guided Setup',
  },
  'mag-box-iptv': {
    setupMethod: 'Stalker / Ministra Portal',
    loginFormat: 'MAC Address + Portal URL',
    difficulty: 'Moderate (Inner Portal Setup)',
  },
  'roku-iptv': {
    setupMethod: 'AirPlay 2 / Screen Mirroring',
    loginFormat: 'Casting from Phone or PC',
    difficulty: 'Moderate (No Native Sideloading)',
  },
  'windows-iptv': {
    setupMethod: 'Windows App or VLC Player',
    loginFormat: 'Xtream Codes or M3U',
    difficulty: 'Simple Guided Setup',
  },
  'iphone-iptv': {
    setupMethod: 'App Store Player',
    loginFormat: 'Xtream Codes or M3U',
    difficulty: 'Simple Guided Setup',
  },
  'mac-iptv': {
    setupMethod: 'macOS App or IINA / VLC',
    loginFormat: 'Xtream Codes or M3U',
    difficulty: 'Simple Guided Setup',
  },
};

type SetupLink = { href: string; label: string };

const DEVICE_QUICK_ANSWERS: Record<string, string> = {
  "firestick-iptv":
    "Install the Downloader app from the Amazon Appstore, allow it to install unknown apps under Settings > My Fire TV > Developer Options, sideload an IPTV player such as TiviMate or IPTV Smarters Pro from its developer's official download link, then sign in with your Xtream Codes or M3U details.",
  "android-tv-iptv":
    "To use IPTV on Android TV or Google TV: (1) install a compatible TV player from Google Play; (2) open the player and choose Xtream Codes or M3U; (3) enter the credentials supplied by your IPTV provider and load your playlist.",
  "samsung-tv-iptv":
    "Install a supported Tizen OS player like IBO Player or Smart IPTV from the Samsung Smart Hub, connect using your Xtream Codes or M3U playlist (either directly on-screen or via the developer's web activation portal depending on the player), and reload your channels on your TV.",
  "lg-tv-iptv":
    "Install a webOS-compatible player from the LG Content Store, input your Xtream Codes or M3U playlist, filter unwanted bouquet categories to conserve webOS system memory, and fine-tune audio sync settings.",
  "apple-tv-iptv":
    "Download a native tvOS client like UHF, iPlayTV, or Smarters Player Lite from the Apple TV App Store, enter your Xtream Codes credentials using iPhone Continuity Keyboard or local web upload, and enable Match Frame Rate for judder-free playback.",
  "chromecast-iptv":
    "For Chromecast with Google TV or Google TV Streamer, install a standalone player from Google Play and use the remote control. For legacy Cast-only dongles, initiate streams inside a compatible mobile IPTV app and cast over your local Wi-Fi network.",
  "mag-box-iptv":
    "Register your MAG set-top box's hardware MAC address (found on the device barcode label) with your provider for middleware authorization, enter the Server Portal URL into the Inner Portal system settings, and verify system clock synchronization for accurate EPG schedules.",
  "roku-iptv":
    "Because Roku OS does not support Android APK sideloading or native uncertified IPTV player apps, stream using Apple AirPlay 2 (on supported models) or screen mirror via Miracast/Smart View from a mobile device or PC over a stable local Wi-Fi connection.",
  "windows-iptv":
    "To use IPTV on a Windows PC: (1) install a compatible player from the Microsoft Store or the player's verified developer website; (2) open the player and enter your provider's Xtream Codes credentials or M3U playlist URL; (3) allow the playlist and EPG to load, then test a channel.",
  "iphone-iptv":
    "To watch IPTV on iPhone or iPad: (1) install an IPTV player such as Smarters Player Lite or UHF from the App Store; (2) choose Xtream Codes or M3U and paste your login details; (3) let channels and the TV guide load, then play a channel or AirPlay it to your TV.",
  "mac-iptv":
    "Download a native client like UHF from the Mac App Store or install players like IPTV Smarters/IINA (authorizing Gatekeeper only if installing standalone DMG packages), and use Picture-in-Picture for flexible desktop multitasking.",
};

const DEVICE_REQUIREMENTS: Record<string, RequirementItem[]> = {
  "firestick-iptv": [
    {
      title: "Fire TV Stick / Cube",
      desc: "Connected to HDMI input, powered by the included wall adapter, and signed into an Amazon account.",
      icon: Tv,
      tag: "Hardware",
    },
    {
      title: "5 GHz Wi-Fi or Ethernet",
      desc: "Reliable wireless signal or an Amazon Ethernet Adapter for stable 4K sports streaming.",
      icon: Wifi,
      tag: "Network",
    },
    {
      title: "Downloader or Native Player",
      desc: "Downloader utility from the Amazon Appstore or a player supporting Fire OS remote navigation.",
      icon: Layers,
      tag: "Application",
    },
    {
      title: "TryIPTV Xtream Credentials",
      desc: "Server URL, username, and password received in your activation email.",
      icon: KeyRound,
      tag: "Service",
    },
  ],
  "android-tv-iptv": [
    {
      title: "Android TV / Google TV",
      desc: "Smart TV or streaming box (Nvidia Shield, Chromecast, Mi Box) with Google Play access.",
      icon: Tv,
      tag: "Hardware",
    },
    {
      title: "High-Speed Internet",
      desc: "Wired Ethernet cable or 5 GHz Wi-Fi to minimize packet loss during peak broadcast hours.",
      icon: Wifi,
      tag: "Network",
    },
    {
      title: "Google Play IPTV Player",
      desc: "TiviMate, IPTV Smarters Pro, or XCIPTV installed directly from the official store.",
      icon: Layers,
      tag: "Application",
    },
    {
      title: "TryIPTV Connection Details",
      desc: "Xtream Codes API details or M3U playlist link from your subscription confirmation.",
      icon: KeyRound,
      tag: "Service",
    },
  ],
  "samsung-tv-iptv": [
    {
      title: "Samsung Smart TV (Tizen OS)",
      desc: "Samsung television model (2016 or newer) with active Samsung Smart Hub access.",
      icon: Tv,
      tag: "Hardware",
    },
    {
      title: "Home Broadband Connection",
      desc: "Wired Ethernet to your router or strong home Wi-Fi signal to prevent video buffering.",
      icon: Wifi,
      tag: "Network",
    },
    {
      title: "Tizen Player Application",
      desc: "IBO Player, Smart IPTV, or Nanomid Player installed from the Samsung App Store.",
      icon: Layers,
      tag: "Application",
    },
    {
      title: "TryIPTV Subscription Details",
      desc: "Xtream Codes login or M3U link, entered directly on-screen or uploaded via developer portal (using your app's MAC or Device ID/Key).",
      icon: KeyRound,
      tag: "Service",
    },
  ],
  "lg-tv-iptv": [
    {
      title: "LG Smart TV (webOS)",
      desc: "LG webOS television (version 3.0 or later) with an active LG Account (operated via standard remote or LG Magic Remote).",
      icon: Tv,
      tag: "Hardware",
    },
    {
      title: "High-Bandwidth Network",
      desc: "Ethernet cable or 5 GHz Wi-Fi to ensure consistent throughput for 4K streams.",
      icon: Wifi,
      tag: "Network",
    },
    {
      title: "LG Content Store Player",
      desc: "IPTV Smarters, IBO Player, or Smart IPTV downloaded from the LG Content Store.",
      icon: Layers,
      tag: "Application",
    },
    {
      title: "TryIPTV Xtream or M3U Data",
      desc: "Xtream Codes login parameters or M3U playlist URL supplied upon service activation.",
      icon: KeyRound,
      tag: "Service",
    },
  ],
  "apple-tv-iptv": [
    {
      title: "Apple TV HD / 4K (tvOS)",
      desc: "Apple TV running tvOS 14 or later, paired with a Siri Remote and linked Apple ID.",
      icon: Tv,
      tag: "Hardware",
    },
    {
      title: "Gigabit Ethernet or 5 GHz Wi-Fi",
      desc: "Stable home network supporting high bitrates for Match Frame Rate 4K playback.",
      icon: Wifi,
      tag: "Network",
    },
    {
      title: "tvOS App Store Player",
      desc: "Native tvOS player such as UHF, iPlayTV, or Smarters Player Lite from the App Store.",
      icon: Layers,
      tag: "Application",
    },
    {
      title: "TryIPTV Xtream Codes",
      desc: "Server URL, username, and password entered via iPhone keyboard or web upload.",
      icon: KeyRound,
      tag: "Service",
    },
  ],
  "chromecast-iptv": [
    {
      title: "Chromecast Device & AC Power",
      desc: "Chromecast with Google TV / Google TV Streamer (includes remote) or legacy Cast-only dongle powered by an external AC wall adapter.",
      icon: Tv,
      tag: "Hardware",
    },
    {
      title: "Stable Local Wi-Fi Network",
      desc: "Stable home Wi-Fi (5 GHz recommended where supported; legacy casting requires both mobile device and Chromecast on the same network).",
      icon: Wifi,
      tag: "Network",
    },
    {
      title: "Native TV App or Casting Client",
      desc: "Standalone TV player from Google Play (Chromecast with Google TV) or casting app like Web Video Caster (legacy Chromecast dongles).",
      icon: Layers,
      tag: "Application",
    },
    {
      title: "TryIPTV Service Credentials",
      desc: "Xtream Codes API details or M3U playlist URL for mobile casting or native app login.",
      icon: KeyRound,
      tag: "Service",
    },
  ],
  "mag-box-iptv": [
    {
      title: "Infomir MAG Set-Top Box",
      desc: "MAG 322, 420, 520, 524, 540 or compatible STB with original remote and HDMI cable.",
      icon: HardDrive,
      tag: "Hardware",
    },
    {
      title: "Wired Ethernet Connection",
      desc: "Direct LAN cable from your router to the MAG box (strongly recommended over USB Wi-Fi).",
      icon: Wifi,
      tag: "Network",
    },
    {
      title: "Portal Middleware Firmware",
      desc: "Built-in Stalker / Ministra portal middleware with correct time zone and optional NTP server synchronization.",
      icon: Layers,
      tag: "System",
    },
    {
      title: "Registered MAC & Portal URL",
      desc: "Your box's physical MAC address registered with TryIPTV, paired with the Server Portal URL provided in your activation details.",
      icon: KeyRound,
      tag: "Service",
    },
  ],
  "roku-iptv": [
    {
      title: "Roku Device or Roku TV",
      desc: "Roku Streaming Stick, Express, Ultra, or Roku TV (AirPlay 2 and screen mirroring availability varies by model and Roku OS version).",
      icon: Tv,
      tag: "Hardware",
    },
    {
      title: "Stable Local Wi-Fi (5 GHz Recommended)",
      desc: "Both your sending device and Roku connected to the same local Wi-Fi network (5 GHz band recommended where supported to reduce mirroring latency; router AP Isolation must be disabled).",
      icon: Wifi,
      tag: "Network",
    },
    {
      title: "Source Casting Player",
      desc: "Source IPTV player on iPhone/iPad (for AirPlay 2), Android device (Smart View / Miracast), or a companion receiver like Web Video Caster.",
      icon: Smartphone,
      tag: "Application",
    },
    {
      title: "TryIPTV Credentials on Mobile",
      desc: "Active TryIPTV subscription configured inside your mobile or desktop streaming application.",
      icon: KeyRound,
      tag: "Service",
    },
  ],
  "windows-iptv": [
    {
      title: "Windows 10 / 11 PC or Laptop",
      desc: "Desktop or laptop running Windows 10 or 11 with integrated or discrete graphics capable of standard video decoding (hardware acceleration supported).",
      icon: Monitor,
      tag: "Hardware",
    },
    {
      title: "Broadband Internet Connection",
      desc: "Ethernet or Wi-Fi connection with Windows Defender Firewall permissions allowed.",
      icon: Wifi,
      tag: "Network",
    },
    {
      title: "Windows IPTV Application",
      desc: "IPTV Smarters Pro for Windows, MyIPTV Player (Microsoft Store), or VLC Media Player.",
      icon: Layers,
      tag: "Application",
    },
    {
      title: "TryIPTV Xtream or M3U Link",
      desc: "Xtream Codes credentials or M3U playlist link for direct stream loading.",
      icon: KeyRound,
      tag: "Service",
    },
  ],
  "iphone-iptv": [
    {
      title: "iPhone or iPad",
      desc: "An iPhone or iPad updated to a recent iOS or iPadOS version so current App Store players install.",
      icon: Smartphone,
      tag: "Hardware",
    },
    {
      title: "Wi-Fi or 5G/4G",
      desc: "Wi-Fi for setup and long viewing; mobile data works but uses about 3–7 GB per hour at 1080p.",
      icon: Wifi,
      tag: "Network",
    },
    {
      title: "App Store IPTV Player",
      desc: "A player with Xtream Codes support, such as Smarters Player Lite or UHF - IPTV Client.",
      icon: Layers,
      tag: "Application",
    },
    {
      title: "TryIPTV Xtream or M3U Details",
      desc: "Server URL, username and password, or an M3U playlist link, copied from your login message.",
      icon: KeyRound,
      tag: "Service",
    },
  ],
  "mac-iptv": [
    {
      title: "Apple Mac (macOS)",
      desc: "MacBook, iMac, Mac Studio, or Mac mini running macOS 11 or later (compatible with both Apple Silicon and Intel processors).",
      icon: Laptop,
      tag: "Hardware",
    },
    {
      title: "High-Speed Mac Internet",
      desc: "Stable Wi-Fi or Thunderbolt Ethernet adapter for uninterrupted HD and 4K playback.",
      icon: Wifi,
      tag: "Network",
    },
    {
      title: "macOS Player Application",
      desc: "UHF - IPTV Client (Mac App Store), IPTV Smarters DMG, or open-source IINA media player.",
      icon: Layers,
      tag: "Application",
    },
    {
      title: "TryIPTV Xtream or M3U Data",
      desc: "Xtream Codes API details or M3U playlist URL for channel synchronization.",
      icon: KeyRound,
      tag: "Service",
    },
  ],
};

// Step-list intros for devices whose "steps" are alternative methods, not one sequence.
const DEVICE_STEP_INTROS: Record<string, string> = {
  "roku-iptv":
    "Roku cannot install IPTV player apps, so you watch IPTV on Roku by sending video from another device: AirPlay 2 from an iPhone, iPad or Mac, screen mirroring (Smart View or Miracast) from Android or Windows, or a web-video caster app. Check that your Roku model supports the method you choose.",
};

const DEVICE_CTA_DESCRIPTIONS: Record<string, string> = {
  "firestick-iptv":
    "Verify channel loading speed, Fire TV remote navigation, Downloader setup, and EPG guide behavior during the stated 24-hour evaluation period.",
  "android-tv-iptv":
    "Test TiviMate or Smarters playback, electronic programme guide (EPG) grid speed, and hardware video decoding on your Android TV.",
  "samsung-tv-iptv":
    "Test Tizen app responsiveness, post-2018 audio output, and live channel stability on your Samsung Smart TV before committing.",
  "lg-tv-iptv":
    "Evaluate webOS channel zapping, LG Magic Remote navigation, and audio synchronization on your LG Smart TV with zero financial risk.",
  "apple-tv-iptv":
    "Experience Match Frame Rate, fluid tvOS Siri Remote navigation, and 4K picture clarity on Apple TV with our 24-hour evaluation pass.",
  "chromecast-iptv":
    "Test Google TV remote responsiveness or wireless casting playback performance from your mobile device before choosing a subscription plan.",
  "mag-box-iptv":
    "Test Stalker portal loading, MAC authentication, physical remote zapping, and channel stability on your Infomir MAG set-top box.",
  "roku-iptv":
    "Test AirPlay 2 or screen mirroring playback stability, audio synchronization, and wireless connection performance on your Roku TV with our 24-hour evaluation pass.",
  "windows-iptv":
    "Test multi-monitor playback, GPU hardware acceleration, and channel switching on your Windows PC with our full-access trial.",
  "iphone-iptv":
    "Test your App Store player, AirPlay to your TV, and mobile playback on iPhone or iPad with our 24-hour evaluation pass.",
  "mac-iptv":
    "Test native macOS player performance, Picture-in-Picture multitasking, and Apple Silicon efficiency with our 24-hour evaluation pass.",
};

const DEVICE_NEXT_STEPS: Record<string, SetupLink[]> = {
  "firestick-iptv": [
    { href: "/players/iptv-smarters", label: "IPTV Smarters Pro for Fire TV" },
    { href: "/guides/m3u-vs-xtream-codes", label: "Choose M3U or Xtream Codes" },
    { href: "/help/iptv-buffering", label: "Troubleshoot Firestick buffering" },
    { href: "/players/xciptv", label: "XCIPTV availability on Fire TV" },
    { href: "/devices/chromecast-iptv", label: "Compare with Chromecast with Google TV" },
    { href: "/iptv-free-trial", label: "Start 24-hour Fire TV trial" },
  ],
  "android-tv-iptv": [
    { href: "/players/tivimate", label: "TiviMate setup on Android TV" },
    { href: "/guides/what-are-xtream-codes", label: "Enter Xtream Codes credentials" },
    { href: "/help/iptv-login-not-working", label: "Troubleshoot login errors" },
    { href: "/players/iptv-extreme", label: "IPTV Extreme for Android TV" },
    { href: "/players/perfect-player", label: "Perfect Player (legacy) setup and migration" },
    { href: "/devices/chromecast-iptv", label: "Chromecast with Google TV setup" },
    { href: "/iptv-free-trial", label: "Test Android TV with a free trial" },
  ],
  "samsung-tv-iptv": [
    { href: "/players/iptv-smarters", label: "IPTV Smarters Smart TV guide" },
    { href: "/guides/what-is-m3u", label: "Upload M3U playlists via web portal" },
    { href: "/devices/firestick-iptv", label: "Compare with Fire TV Stick" },
    { href: "/help/iptv-buffering", label: "Fix Smart TV streaming stutter" },
  ],
  "lg-tv-iptv": [
    { href: "/players/iptv-smarters", label: "IPTV Smarters on webOS" },
    { href: "/guides/what-are-xtream-codes", label: "Connect via Xtream Codes" },
    { href: "/devices/android-tv-iptv", label: "Compare with Android TV streaming" },
    { href: "/help/iptv-buffering", label: "Fix webOS buffering issues" },
  ],
  "apple-tv-iptv": [
    { href: "/players/iptv-smarters", label: "Smarters Player Lite on tvOS" },
    { href: "/guides/m3u-vs-xtream-codes", label: "Choose M3U or Xtream Codes" },
    { href: "/help/iptv-login-not-working", label: "Troubleshoot Apple TV login errors" },
    { href: "/devices/iphone-iptv", label: "Set up the same player on iPhone and iPad" },
    { href: "/iptv-free-trial", label: "Test Apple TV with 24-hour trial" },
  ],
  "chromecast-iptv": [
    { href: "/devices/android-tv-iptv", label: "Explore native Android TV features" },
    { href: "/players/tivimate", label: "Install TiviMate on Google TV" },
    { href: "/help/iptv-buffering", label: "Fix casting Wi-Fi buffering" },
    { href: "/iptv-free-trial", label: "Request a free test line" },
  ],
  "mag-box-iptv": [
    { href: "/guides/what-are-xtream-codes", label: "Xtream Codes vs Stalker Portals" },
    { href: "/guides/what-is-epg", label: "Configure MAG EPG time zones" },
    { href: "/help/iptv-not-working", label: "Diagnose MAG status messages" },
    { href: "/help/iptv-error-codes", label: "MAG portal messages explained" },
    { href: "/iptv-free-trial", label: "Activate MAG trial with MAC address" },
  ],
  "roku-iptv": [
    { href: "/devices/chromecast-iptv", label: "Compare with Chromecast casting" },
    { href: "/devices/firestick-iptv", label: "Why Firestick offers native TV apps" },
    { href: "/guides/what-is-m3u", label: "Understand M3U playlist format" },
    { href: "/help/iptv-buffering", label: "Fix screen mirroring stutter" },
  ],
  "windows-iptv": [
    { href: "/players/iptv-smarters", label: "IPTV Smarters Pro for Windows" },
    { href: "/guides/what-is-m3u", label: "Load M3U streams in VLC" },
    { href: "/help/m3u-not-loading", label: "Fix M3U playlist loading errors" },
    { href: "/devices/roku-iptv", label: "Mirror a Windows PC to a Roku TV" },
    { href: "/iptv-free-trial", label: "Test on Windows with a free trial" },
  ],
  "iphone-iptv": [
    { href: "/players/iptv-smarters", label: "Smarters Player Lite on iPhone" },
    { href: "/guides/iptv-internet-speed", label: "Mobile data and speed planning" },
    { href: "/help/iptv-login-not-working", label: "Fix iPhone player login errors" },
    { href: "/devices/roku-iptv", label: "AirPlay from iPhone to a Roku TV" },
    { href: "/iptv-free-trial", label: "Test on iPhone with a free trial" },
  ],
  "mac-iptv": [
    { href: "/players/iptv-smarters", label: "IPTV Smarters for macOS" },
    { href: "/guides/m3u-vs-xtream-codes", label: "Choose M3U or Xtream Codes" },
    { href: "/help/iptv-login-not-working", label: "Resolve macOS player login errors" },
    { href: "/devices/iphone-iptv", label: "IPTV on iPhone and iPad" },
    { href: "/devices/roku-iptv", label: "AirPlay from a Mac to a Roku TV" },
    { href: "/iptv-free-trial", label: "Test on Mac with a free trial" },
  ],
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { device } = await params;
  const canonicalSlug = getDeviceSlug(device);
  const article = getSafeArticleData(canonicalSlug);

  if (!article) {
    notFound();
  }

  const overrides = DEVICE_SEO_OVERRIDES[canonicalSlug];
  const title = overrides?.seoTitle ?? article.title;
  const description = overrides?.metaDescription ?? article.description;

  return generatePageMetadata({
    title,
    description,
    canonical: `/devices/${canonicalSlug}`,
  });
}

export default async function HowToPage({ params }: Props) {
  const { device } = await params;
  if (isRedirectedDevice(device)) {
    permanentRedirect(`/devices/${getDeviceSlug(device)}`);
  }
  const article = await getArticleData(device);

  if (!article) {
    notFound();
  }
  
  const { title, description, steps, extraSections, faqs, primaryKeyword, id, totalTime, dateModified } = article;
  const totalTimeInMinutes = totalTime?.replace('PT', '').replace('M', '');
  const isFirestick = id === "firestick-iptv" || id === "firestick";

  // Table of Contents definition
  const firestickTocItems: TocItem[] = [
    { id: "what-you-need", label: "What You'll Need" },
    { id: "setup-steps", label: "7-Step Installation" },
    { id: "service-vs-player", label: "Service vs Player" },
    { id: "m3u-vs-xtream", label: "M3U vs Xtream Codes" },
    { id: "developer-options", label: "Developer Options" },
    { id: "xtream-setup-detail", label: "Xtream Codes Setup" },
    { id: "m3u-setup-detail", label: "M3U Playlist Setup" },
    { id: "epg-detail", label: "EPG (TV Guide) Setup" },
    { id: "troubleshooting", label: "Troubleshooting Matrix" },
    { id: "buffering", label: "Buffering Checklist" },
    { id: "two-firesticks", label: "Two Simultaneous Streams" },
    { id: "before-paying", label: "24-Hour Free Trial" },
    { id: "storage", label: "Storage Management" },
    { id: "security", label: "Sideloading Security" },
    ...(faqs ? [{ id: "faq", label: "Frequently Asked Questions" }] : []),
  ];

  const defaultTocItems: TocItem[] = [
    { id: "what-you-need", label: "What You'll Need" },
    { id: "setup-steps", label: "Setup Steps" },
    ...(extraSections || []).map((s) => ({ id: s.id, label: s.title })),
    ...(faqs ? [{ id: "faq", label: "Frequently Asked Questions" }] : []),
  ];

  const tocItems = isFirestick ? firestickTocItems : defaultTocItems;
  const nextSteps = DEVICE_NEXT_STEPS[id] ?? [];
  const quickAnswerText =
    DEVICE_QUICK_ANSWERS[id] ??
    `Install a compatible IPTV player on ${primaryKeyword}, connect with your subscription credentials, and test your channels.`;
  const deviceRequirements = DEVICE_REQUIREMENTS[id];
  const ctaDescription = DEVICE_CTA_DESCRIPTIONS[id];

  return (
    <>
      <StructuredData article={article} />
      <Section className="pt-8 pb-16 sm:pt-12 sm:pb-24">
        <Container>
          <Breadcrumb items={[{ label: "Devices", href: "/devices" }, { label: title }]} />
          
          <article className="mt-6">
            {/* Editorial Header */}
            <header className="mb-12 text-center max-w-4xl mx-auto">
              <p className="eyebrow mb-2.5">Installation Guide</p>
              <h1 className="font-headline text-3xl font-extrabold leading-[1.15] sm:text-4xl lg:text-[46px] xl:text-[48px] text-foreground tracking-tight max-w-4xl mx-auto">
                {title}
              </h1>
              <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-[60ch] mx-auto">
                {/* lede: answer-first opening; description stays the schema and hub-card summary. */}
                {article.lede ?? description}
              </p>
              {/* Phones: the header "Start free trial" button is hidden below sm, so offer it here above the fold. */}
              <div className="mt-5 sm:hidden">
                <Button asChild size="lg" className="w-full">
                  <Link href="/iptv-free-trial">Start the free 24-hour trial</Link>
                </Button>
              </div>

              {/* Informational Specs Rail */}
              {(() => {
                const deviceSpecs = DEVICE_QUICK_SPECS[id] || {
                  setupMethod: "IPTV Player + Credentials",
                  loginFormat: "Xtream Codes or M3U",
                  difficulty: "Simple Guided Setup",
                };
                return (
                  <GuideQuickInfo
                    device={primaryKeyword}
                    setupMethod={deviceSpecs.setupMethod}
                    loginFormat={deviceSpecs.loginFormat}
                    difficulty={deviceSpecs.difficulty}
                  />
                );
              })()}

              {/* Badges: Time & Last Reviewed */}
              <div className="mt-5 flex flex-wrap justify-center items-center gap-3 text-xs">
                {totalTimeInMinutes && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.09] bg-[#07080a] px-3 py-1 text-muted-foreground">
                    <Clock className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                    <span>Estimated time: {totalTimeInMinutes} minutes</span>
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.09] bg-[#07080a] px-3 py-1 text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                  <span>Updated:</span>
                  <time dateTime={dateModified} className="text-foreground font-semibold">
                    {new Date(dateModified).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })}
                  </time>
                </span>
              </div>
              <GuideByline path={`/devices/${id}`} />

              {/* Mobile Table of Contents */}
              <GuideToc items={tocItems} variant="mobile" />
            </header>

            {/* Editorial Grid: Main Article + Sticky Sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">
              {/* Main Reading Column (capped at comfortable reading width ~760-820px) */}
              <div className="lg:col-span-8 w-full max-w-[820px] space-y-12 sm:space-y-14">
                <section className="rounded-xl border border-primary/20 bg-primary/[0.05] p-5 sm:p-6" aria-labelledby="quick-answer">
                  <p className="eyebrow mb-2">Quick answer</p>
                  <h2 id="quick-answer" className="font-headline text-xl sm:text-2xl font-extrabold text-foreground">
                    How to set up IPTV on {primaryKeyword}
                  </h2>
                  <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                    {quickAnswerText}
                  </p>
                  {nextSteps.length > 0 && (
                    <nav className="mt-4 border-t border-primary/15 pt-4" aria-label="Related setup resources">
                      <p className="text-xs font-semibold uppercase tracking-wider text-foreground">Continue with</p>
                      <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm">
                        {nextSteps.map((step) => (
                          <li key={step.href}>
                            <Link href={step.href} className="inline-flex min-h-11 items-center text-primary underline decoration-primary/40 underline-offset-4 hover:text-foreground pointer-fine:min-h-0">
                              {step.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  )}
                </section>
                {/* Prerequisites Grid */}
                <GuideRequirements primaryKeyword={primaryKeyword} items={deviceRequirements} />

                {/* Step-by-Step Sequence */}
                <GuideStepList steps={steps} primaryKeyword={primaryKeyword} intro={DEVICE_STEP_INTROS[id]} />

                {/* Stream Isolation Callout right after steps */}
                {isFirestick && (
                  <GuideCallout type="important" title="Stream Isolation Rule">
                    <p>
                      If one specific channel fails while other channels in your player stream smoothly, the issue is stream-specific.
                      Do not immediately replace your account credentials or reset the player application.
                    </p>
                  </GuideCallout>
                )}

                {/* Firestick-Specific Rich Sections */}
                {isFirestick && extraSections && (
                  <div className="space-y-12">
                    {/* Service vs Player */}
                    {extraSections.find((s) => s.id === "service-vs-player") && (
                      <div id="service-vs-player" className="scroll-mt-6 pt-8 border-t border-white/[0.08]">
                        <h2 className="font-headline text-2xl sm:text-3xl font-bold text-foreground mb-4">
                          {extraSections.find((s) => s.id === "service-vs-player")?.title}
                        </h2>
                        <div
                          className="text-base leading-relaxed text-muted-foreground space-y-4 [&>p]:leading-relaxed [&>ul]:space-y-2 [&>ul]:list-disc [&>ul]:pl-5 [&>strong]:text-foreground [&>strong]:font-semibold"
                          dangerouslySetInnerHTML={{
                            __html: extraSections.find((s) => s.id === "service-vs-player")?.content || "",
                          }}
                        />
                      </div>
                    )}

                    {/* M3U vs Xtream Codes */}
                    {extraSections.find((s) => s.id === "m3u-vs-xtream") && (
                      <div id="m3u-vs-xtream" className="scroll-mt-6 pt-8 border-t border-white/[0.08]">
                        <h2 className="font-headline text-2xl sm:text-3xl font-bold text-foreground mb-4">
                          {extraSections.find((s) => s.id === "m3u-vs-xtream")?.title}
                        </h2>
                        <div
                          className="text-base leading-relaxed text-muted-foreground space-y-4 [&>p]:leading-relaxed [&>strong]:text-foreground [&>strong]:font-semibold"
                          dangerouslySetInnerHTML={{
                            __html: extraSections.find((s) => s.id === "m3u-vs-xtream")?.content || "",
                          }}
                        />
                        <GuideComparisonTable />
                        <GuideCallout type="tip" title="Fire TV Remote Navigation">
                          <p>
                            Xtream Codes is generally easier to enter using a Fire TV remote because credentials are separated into
                            three distinct fields (server URL, username, password), significantly reducing on-screen typing errors compared to long URLs.
                          </p>
                        </GuideCallout>
                      </div>
                    )}

                    {/* Developer Options & Sideloading */}
                    {extraSections.find((s) => s.id === "developer-options") && (
                      <div id="developer-options" className="scroll-mt-6 pt-8 border-t border-white/[0.08]">
                        <h2 className="font-headline text-2xl sm:text-3xl font-bold text-foreground mb-4">
                          {extraSections.find((s) => s.id === "developer-options")?.title}
                        </h2>
                        <div
                          className="text-base leading-relaxed text-muted-foreground space-y-4 [&>p]:leading-relaxed [&>ol]:space-y-2.5 [&>ol]:list-decimal [&>ol]:pl-5 [&>strong]:text-foreground [&>strong]:font-semibold"
                          dangerouslySetInnerHTML={{
                            __html: extraSections.find((s) => s.id === "developer-options")?.content || "",
                          }}
                        />

                        {/* Screenshot sizes measured: ~317px at 375, 264-328px at 640-768, max 351px at >=1024. */}
                        <div className="mt-6 grid gap-5 sm:grid-cols-2">
                          <GuideScreenshot
                            src="/images/firestick/settings-home.jpeg"
                            sizes="(max-width: 639px) calc(100vw - 3.5rem), (max-width: 1023px) 42vw, 352px"
                            alt="Fire TV Settings home screen with the Settings gear selected"
                            caption="Open Settings from the Fire TV home screen."
                            width={1200}
                            height={675}
                          />
                          <GuideScreenshot
                            src="/images/firestick/my-fire-tv-developer-options.jpeg"
                            sizes="(max-width: 639px) calc(100vw - 3.5rem), (max-width: 1023px) 42vw, 352px"
                            alt="Fire TV My Fire TV menu with Developer Options highlighted"
                            caption="Open Developer Options under My Fire TV."
                            width={1024}
                            height={627}
                          />
                          <GuideScreenshot
                            src="/images/firestick/about-device-name.jpeg"
                            sizes="(max-width: 639px) calc(100vw - 3.5rem), (max-width: 1023px) 42vw, 352px"
                            alt="Fire TV About screen with the Fire TV Stick device name highlighted"
                            caption="Select the device name in About when Developer Options is hidden."
                            note="Account and serial fields are redacted in this supplied capture."
                            width={960}
                            height={540}
                          />
                          <GuideScreenshot
                            src="/images/firestick/install-unknown-apps-downloader-on.jpeg"
                            sizes="(max-width: 639px) calc(100vw - 3.5rem), (max-width: 1023px) 42vw, 352px"
                            alt="Fire TV Install Unknown Apps screen with Downloader enabled"
                            caption="Allow Downloader to install apps from unknown sources."
                            width={800}
                            height={521}
                          />
                        </div>

                        <GuideCallout type="security" title="Sideloading Permission Control">
                          <p>
                            Developer Options and unknown source permissions are only needed if your chosen player is unavailable in the Amazon Appstore.
                            Once installation finishes, you can disable the Downloader permission to keep your device secure.
                          </p>
                        </GuideCallout>
                      </div>
                    )}

                    {/* Xtream Setup Detail */}
                    {extraSections.find((s) => s.id === "xtream-setup-detail") && (
                      <div id="xtream-setup-detail" className="scroll-mt-6 pt-8 border-t border-white/[0.08]">
                        <h2 className="font-headline text-2xl sm:text-3xl font-bold text-foreground mb-4">
                          {extraSections.find((s) => s.id === "xtream-setup-detail")?.title}
                        </h2>
                        <div
                          className="text-base leading-relaxed text-muted-foreground space-y-4 [&>p]:leading-relaxed [&>ul]:space-y-2 [&>ul]:list-disc [&>ul]:pl-5 [&>strong]:text-foreground [&>strong]:font-semibold"
                          dangerouslySetInnerHTML={{
                            __html: extraSections.find((s) => s.id === "xtream-setup-detail")?.content || "",
                          }}
                        />
                      </div>
                    )}

                    {/* M3U Setup Detail */}
                    {extraSections.find((s) => s.id === "m3u-setup-detail") && (
                      <div id="m3u-setup-detail" className="scroll-mt-6 pt-8 border-t border-white/[0.08]">
                        <h2 className="font-headline text-2xl sm:text-3xl font-bold text-foreground mb-4">
                          {extraSections.find((s) => s.id === "m3u-setup-detail")?.title}
                        </h2>
                        <div
                          className="text-base leading-relaxed text-muted-foreground space-y-4 [&>p]:leading-relaxed [&>strong]:text-foreground [&>strong]:font-semibold"
                          dangerouslySetInnerHTML={{
                            __html: extraSections.find((s) => s.id === "m3u-setup-detail")?.content || "",
                          }}
                        />
                      </div>
                    )}

                    {/* EPG Setup Detail */}
                    {extraSections.find((s) => s.id === "epg-detail") && (
                      <div id="epg-detail" className="scroll-mt-6 pt-8 border-t border-white/[0.08]">
                        <h2 className="font-headline text-2xl sm:text-3xl font-bold text-foreground mb-4">
                          {extraSections.find((s) => s.id === "epg-detail")?.title}
                        </h2>
                        <div
                          className="text-base leading-relaxed text-muted-foreground space-y-4 [&>p]:leading-relaxed [&>ul]:space-y-2 [&>ul]:list-disc [&>ul]:pl-5 [&>strong]:text-foreground [&>strong]:font-semibold"
                          dangerouslySetInnerHTML={{
                            __html: extraSections.find((s) => s.id === "epg-detail")?.content || "",
                          }}
                        />
                      </div>
                    )}

                    {/* Diagnostic Troubleshooting Interface */}
                    <GuideTroubleshooting />

                    {/* Buffering Decision Checklist */}
                    <GuideBufferingChecklist />

                    {/* Two Firesticks */}
                    {extraSections.find((s) => s.id === "two-firesticks") && (
                      <div id="two-firesticks" className="scroll-mt-6 pt-8 border-t border-white/[0.08]">
                        <div className="rounded-xl border border-white/[0.08] bg-[#07080a] p-5 sm:p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                          <span className="font-mono text-xs font-bold uppercase tracking-wider text-primary bg-primary/[0.08] border border-primary/20 rounded px-2 py-0.5 inline-block mb-3">
                            Device Policy
                          </span>
                          <h2 className="font-headline text-xl sm:text-2xl font-bold text-foreground mb-3">
                            {extraSections.find((s) => s.id === "two-firesticks")?.title}
                          </h2>
                          <div
                            className="text-base sm:text-sm leading-relaxed text-muted-foreground space-y-3 [&>p]:leading-relaxed [&>strong]:text-foreground [&>strong]:font-semibold"
                            dangerouslySetInnerHTML={{
                              __html: extraSections.find((s) => s.id === "two-firesticks")?.content || "",
                            }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Before Paying / Free Trial Section */}
                    {extraSections.find((s) => s.id === "before-paying") && (
                      <div id="before-paying" className="scroll-mt-6 pt-8 border-t border-white/[0.08]">
                        <div className="rounded-xl border border-white/[0.08] bg-[#07080a] p-5 sm:p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                          <span className="font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground bg-white/[0.04] border border-white/[0.1] rounded px-2 py-0.5 inline-block mb-3">
                            Trial Terms
                          </span>
                          <h2 className="font-headline text-xl sm:text-2xl font-bold text-foreground mb-3">
                            {extraSections.find((s) => s.id === "before-paying")?.title}
                          </h2>
                          <div
                            className="text-base sm:text-sm leading-relaxed text-muted-foreground space-y-3 [&>p]:leading-relaxed [&>strong]:text-foreground [&>strong]:font-semibold [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4"
                            dangerouslySetInnerHTML={{
                              __html: extraSections.find((s) => s.id === "before-paying")?.content || "",
                            }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Storage Management */}
                    {extraSections.find((s) => s.id === "storage") && (
                      <div id="storage" className="scroll-mt-6 pt-8 border-t border-white/[0.08]">
                        <div className="rounded-xl border border-white/[0.08] bg-[#07080a] p-5 sm:p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                          <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/[0.08] border border-amber-400/20 rounded px-2 py-0.5 inline-block mb-3">
                            Device Maintenance
                          </span>
                          <h2 className="font-headline text-xl sm:text-2xl font-bold text-foreground mb-3">
                            {extraSections.find((s) => s.id === "storage")?.title}
                          </h2>
                          <div
                            className="text-base sm:text-sm leading-relaxed text-muted-foreground space-y-3 [&>p]:leading-relaxed [&>ul]:space-y-1.5 [&>ul]:list-disc [&>ul]:pl-5 [&>strong]:text-foreground [&>strong]:font-semibold"
                            dangerouslySetInnerHTML={{
                              __html: extraSections.find((s) => s.id === "storage")?.content || "",
                            }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Sideloading Security */}
                    {extraSections.find((s) => s.id === "security") && (
                      <div id="security" className="scroll-mt-6 pt-8 border-t border-white/[0.08]">
                        <div className="rounded-xl border border-white/[0.08] bg-[#07080a] p-5 sm:p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] space-y-4">
                          <span className="font-mono text-xs font-bold uppercase tracking-wider text-sky-400 bg-sky-400/[0.08] border border-sky-400/20 rounded px-2 py-0.5 inline-block">
                            Security Verification
                          </span>
                          <h2 className="font-headline text-xl sm:text-2xl font-bold text-foreground">
                            {extraSections.find((s) => s.id === "security")?.title}
                          </h2>
                          <div
                            className="text-base sm:text-sm leading-relaxed text-muted-foreground space-y-3 [&>p]:leading-relaxed [&>strong]:text-foreground [&>strong]:font-semibold"
                            dangerouslySetInnerHTML={{
                              __html: extraSections.find((s) => s.id === "security")?.content || "",
                            }}
                          />
                          <GuideCallout type="security" title="Keep Credentials Private">
                            <p>
                              Never expose your M3U playlist URL, username, password, or server credentials in public forums, social media, or shared screenshots.
                              Always download player APKs directly from the player developer&apos;s verified website.
                            </p>
                          </GuideCallout>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Generic fallback for non-Firestick devices with extraSections (e.g. Mac) */}
                {!isFirestick && extraSections && extraSections.length > 0 && (
                  <div className="space-y-12">
                    {extraSections.map((section) => (
                      <div key={section.id} id={section.id} className="scroll-mt-6 pt-8 border-t border-white/[0.08]">
                        <h2 className="font-headline text-2xl sm:text-3xl font-bold text-foreground mb-4">
                          {section.title}
                        </h2>
                        <div
                          className="text-base leading-relaxed text-muted-foreground space-y-4 [&>p]:leading-relaxed [&>ul]:space-y-2 [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:space-y-2 [&>ol]:list-decimal [&>ol]:pl-5 [&>strong]:text-foreground [&>strong]:font-semibold [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4"
                          dangerouslySetInnerHTML={{ __html: section.content }}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Integrated Technical CTA Box */}
                <GuideCta primaryKeyword={primaryKeyword} description={ctaDescription} />

                {/* Frequently Asked Questions */}
                {faqs && (
                  <div id="faq" className="scroll-mt-6 pt-8 border-t border-white/[0.08]">
                    <div className="mb-6">
                      <p className="eyebrow mb-1">Direct Answers</p>
                      <h2 className="font-headline text-2xl sm:text-3xl font-bold text-foreground">
                        Frequently Asked Questions
                      </h2>
                      <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                        Clear, non-marketing answers to common setup, compatibility, and playback questions for {primaryKeyword}.
                      </p>
                    </div>
                    <FaqList items={faqs} />
                  </div>
                )}
              </div>

              {/* Sidebar Column: Sticky TOC + Related Guides */}
              <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
                {/* Mobile already renders the collapsible TOC above the article; avoid a duplicate nav landmark. */}
                <div className="hidden lg:block">
                  <GuideToc items={tocItems} variant="desktop" />
                </div>

                <InternalLinks currentId={id} />
              </aside>
            </div>
          </article>
        </Container>
      </Section>
    </>
  );
}

export async function generateStaticParams() {
  return howToArticles
    .filter((article) => !isRedirectedDevice(article.id) && article.id !== 'chromecast-iptv')
    .map((article) => ({
      device: article.id,
    }));
}
