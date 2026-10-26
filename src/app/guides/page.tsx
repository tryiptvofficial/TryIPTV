import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeftRight,
  ArrowRight,
  BookOpen,
  Cable,
  Calendar,
  Cpu,
  FileText,
  HelpCircle,
  KeyRound,
  Layers,
  Radio,
  Tv,
  Wifi,
} from "lucide-react";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { Container } from "@/components/shared/Container";
import { PageSchema } from "@/components/shared/Schema";
import { Section } from "@/components/shared/Section";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generateBreadcrumbSchema, generateItemListSchema } from "@/lib/schema";
import { SITE_URL, generateMetadata as generatePageMetadata } from "@/lib/site-config";

const title = "IPTV Guides & Technical Explainers";
const description =
  "Technical IPTV guides explaining how streaming works, M3U playlists, Xtream Codes logins, electronic programme guides (EPG), and format comparisons.";
const canonical = "/guides";

export function generateMetadata(): Metadata {
  return {
    ...generatePageMetadata({
      title,
      description,
      canonical,
    }),
    title: {
      absolute: `${title} | TryIPTV`,
    },
  };
}

const coreGuides = [
  {
    title: "What Is IPTV? How Internet Protocol Television Works",
    href: "/guides/what-is-iptv",
    linkLabel: "IPTV basics guide",
    description:
      "A foundational overview of Internet Protocol Television, explaining packetized IP stream delivery, linear broadcasts, and how internet streaming compares to cable and satellite infrastructure.",
    badge: "Foundational Architecture",
    icon: Radio,
    readTime: "6 min read",
  },
  {
    title: "How Does IPTV Work? From Server to Screen",
    href: "/guides/how-does-iptv-work",
    linkLabel: "How IPTV works guide",
    description:
      "A technical walkthrough of linear video streaming over IP networks: ingestion, transcoding, packaging, unicast delivery, client-side buffering, and playback decoders.",
    badge: "Delivery Architecture",
    icon: Cpu,
    readTime: "8 min read",
  },
  {
    title: "IPTV Internet Speed: How Much Bandwidth Do You Need?",
    href: "/guides/iptv-internet-speed",
    linkLabel: "IPTV speed guide",
    description:
      "A practical bandwidth planning guide covering bitrate vs plan speed, HD and 4K requirements, two simultaneous streams, Wi-Fi stability, and hourly data consumption.",
    badge: "Network Planning",
    icon: Wifi,
    readTime: "7 min read",
  },
  {
    title: "What Is an M3U Playlist? Structure, Syntax, and IPTV Usage",
    href: "/guides/what-is-m3u",
    linkLabel: "M3U playlist guide",
    description:
      "A technical guide to M3U and M3U8 files in IPTV: playlist header directives, #EXTINF syntax, community metadata attributes (tvg-id, group-title), and UTF-8 encoding standards.",
    badge: "Playlist Specifications",
    icon: FileText,
    readTime: "8 min read",
  },
  {
    title: "What Are Xtream Codes? The IPTV API Login Format Explained",
    href: "/guides/what-are-xtream-codes",
    linkLabel: "Xtream Codes guide",
    description:
      "Understand how the de facto API login format works in IPTV players: server URL, username, password authentication, dynamic category queries, and critical security practices.",
    badge: "API Protocols",
    icon: KeyRound,
    readTime: "8 min read",
  },
  {
    title: "What Is an EPG? How IPTV TV Guides Work",
    href: "/guides/what-is-epg",
    linkLabel: "EPG guide",
    description:
      "Explore how Electronic Programme Guides operate in IPTV, how XMLTV schedules are ingested by players, channel-matching conventions (tvg-id), and timezone synchronization.",
    badge: "Metadata & TV Guides",
    icon: Calendar,
    readTime: "7 min read",
  },
];

const comparisonGuides = [
  {
    title: "M3U vs. Xtream Codes: What's the Difference?",
    href: "/guides/m3u-vs-xtream-codes",
    linkLabel: "M3U vs Xtream Codes comparison",
    description:
      "A neutral side-by-side comparison between M3U playlists and Xtream-compatible API logins: data delivery architectures, VOD organization, player compatibility, and practical trade-offs.",
    badge: "Format Comparison",
    icon: ArrowLeftRight,
    readTime: "9 min read",
  },
  {
    title: "IPTV vs. Cable: What's the Difference?",
    href: "/guides/iptv-vs-cable",
    linkLabel: "IPTV vs cable comparison",
    description:
      "A balanced side-by-side comparison between IPTV and traditional cable TV: network delivery architectures, equipment costs, internet dependencies, and decision criteria.",
    badge: "Service Comparison",
    icon: Cable,
    readTime: "8 min read",
  },
];

const readingPaths = [
  {
    title: "New to IPTV",
    text: "What IPTV is, how a stream reaches your screen, and whether your connection is fast enough.",
    steps: [
      { label: "What is IPTV?", href: "/guides/what-is-iptv" },
      { label: "How IPTV works", href: "/guides/how-does-iptv-work" },
      { label: "Internet speed for IPTV", href: "/guides/iptv-internet-speed" },
    ],
  },
  {
    title: "You have login details",
    text: "Understand the two login formats providers send, then pick the one your player handles best.",
    steps: [
      { label: "What is an M3U playlist?", href: "/guides/what-is-m3u" },
      { label: "What are Xtream Codes?", href: "/guides/what-are-xtream-codes" },
      { label: "M3U vs Xtream Codes", href: "/guides/m3u-vs-xtream-codes" },
    ],
  },
  {
    title: "The TV guide looks wrong",
    text: "How EPG data is matched to channels, and what to do when the guide is empty or shifted.",
    steps: [
      { label: "What is an EPG?", href: "/guides/what-is-epg" },
      { label: "EPG not working", href: "/help/epg-not-working" },
    ],
  },
  {
    title: "Deciding whether to switch",
    text: "Compare IPTV with cable on cost, setup and reliability, then check what plans cost.",
    steps: [
      { label: "IPTV vs cable TV", href: "/guides/iptv-vs-cable" },
      { label: "IPTV subscription pricing", href: "/pricing" },
    ],
  },
];

export default function GuidesPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", item: `${SITE_URL}/` },
    { name: "Guides", item: `${SITE_URL}/guides` },
  ]);

  return (
    <>
      <PageSchema
        path="/guides"
        name={title}
        description={description}
        type="CollectionPage"
        nodes={[
          breadcrumbSchema,
          generateItemListSchema("IPTV guides", [...coreGuides, ...comparisonGuides].map((g) => ({ name: g.title, path: g.href }))),
        ]}
      />

      {/* Hero Header */}
      <Section className="relative overflow-hidden border-b border-white/[0.07] pt-12 pb-14 sm:pt-16 sm:pb-20">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
        <Container className="relative text-center">
          <Breadcrumb items={[{ label: "Guides" }]} align="center" />
          <SectionHeader
            as="h1"
            eyebrow="Knowledge Base & Architecture"
            title="IPTV Guides & Technical Explainers"
            subtitle="Explore in-depth technical guides explaining IPTV streaming architecture, playlist standards, API authentication formats, electronic programme guides, and format trade-offs."
          />
        </Container>
      </Section>

      {/* Core Concepts Section */}
      <Section className="py-12 sm:py-16">
        <Container>
          <div className="mb-8">
            <p className="eyebrow mb-2">Core Concepts</p>
            <h2 className="font-headline text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Fundamental IPTV Concepts &amp; Standards
            </h2>
            <p className="mt-2 text-base text-muted-foreground">
              Learn the foundational technologies and specifications that power modern Internet Protocol Television.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {coreGuides.map((guide) => {
              const Icon = guide.icon;
              return (
                <Card
                  key={guide.href}
                  className="group flex flex-col justify-between border-white/[0.08] bg-[#07080a] transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:bg-[#07080a] shadow-sm"
                >
                  <CardHeader className="pb-3">
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                        <Icon className="h-3 w-3" />
                        {guide.badge}
                      </span>
                      <span className="text-xs text-muted-foreground">{guide.readTime}</span>
                    </div>
                    <CardTitle as="h3" className="font-headline text-lg font-bold leading-snug sm:text-xl">
                      <Link href={guide.href} className="tap-target text-foreground transition-colors group-hover:text-primary">
                        {guide.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 flex flex-1 flex-col justify-between">
                    <p className="mb-6 text-base leading-relaxed text-muted-foreground sm:text-sm">
                      {guide.description}
                    </p>
                    <div className="flex items-center justify-between border-t border-white/[0.06] pt-3">
                      <span className="text-xs text-muted-foreground">Technical Article</span>
                      <Link
                        href={guide.href}
                        className="tap-target inline-flex items-center gap-1.5 text-xs font-bold text-primary transition-colors hover:underline"
                      >
                        {guide.linkLabel} <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Comparisons Section */}
          <div className="mt-16 mb-8">
            <p className="eyebrow mb-2">Format Comparisons</p>
            <h2 className="font-headline text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Architectural &amp; Practical Comparisons
            </h2>
            <p className="mt-2 text-base text-muted-foreground">
              Direct, side-by-side evaluations to help you select the optimal connection method for your hardware.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {comparisonGuides.map((guide) => {
              const Icon = guide.icon;
              return (
                <Card
                  key={guide.href}
                  className="group flex flex-col justify-between border-white/[0.08] bg-[#07080a] transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:bg-[#07080a] shadow-sm"
                >
                  <CardHeader className="pb-3">
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-400/20 bg-blue-400/10 px-2.5 py-0.5 text-[11px] font-semibold text-blue-400">
                        <Icon className="h-3 w-3" />
                        {guide.badge}
                      </span>
                      <span className="text-xs text-muted-foreground">{guide.readTime}</span>
                    </div>
                    <CardTitle as="h3" className="font-headline text-lg font-bold leading-snug sm:text-xl">
                      <Link href={guide.href} className="tap-target text-foreground transition-colors group-hover:text-primary">
                        {guide.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 flex flex-1 flex-col justify-between">
                    <p className="mb-6 text-base leading-relaxed text-muted-foreground sm:text-sm">
                      {guide.description}
                    </p>
                    <div className="flex items-center justify-between border-t border-white/[0.06] pt-3">
                      <span className="text-xs text-muted-foreground">Comparison Matrix</span>
                      <Link
                        href={guide.href}
                        className="tap-target inline-flex items-center gap-1.5 text-xs font-bold text-primary transition-colors hover:underline"
                      >
                        {guide.linkLabel} <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Reading paths */}
          <div className="mt-16">
            <p className="eyebrow mb-2">Where to Start</p>
            <h2 className="font-headline text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Pick a Reading Path
            </h2>
            <p className="mt-2 max-w-[60ch] text-base text-muted-foreground">
              The guides build on each other. Start from the question you have now and follow the links in order.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              {readingPaths.map((path) => (
                <div key={path.title} className="rounded-xl border border-white/[0.08] bg-[#07080a] p-5">
                  <h3 className="font-headline text-lg font-bold text-foreground">{path.title}</h3>
                  <p className="mt-1.5 text-base leading-relaxed text-muted-foreground sm:text-sm">{path.text}</p>
                  <ol className="mt-3 list-decimal space-y-1 pl-5 text-base sm:text-sm">
                    {path.steps.map((step) => (
                      <li key={step.href}>
                        <Link href={step.href} className="font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
                          {step.label}
                        </Link>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </div>

          {/* Cross-Directory Navigation Banner */}
          <div className="mt-16 rounded-2xl border border-white/[0.08] bg-[#07080a] p-6 sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="eyebrow mb-1">Looking for Troubleshooting?</p>
                <h3 className="font-headline text-lg font-bold text-foreground sm:text-xl">
                  Diagnose Playback, Login, or EPG Issues
                </h3>
                <p className="mt-1.5 max-w-xl text-base text-muted-foreground sm:text-sm">
                  If you are experiencing buffering, authentication errors, or missing program data, explore our dedicated troubleshooting directory for step-by-step diagnostic workflows.
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-3">
                <Button asChild size="sm" variant="outline">
                  <Link href="/help">
                    <HelpCircle className="mr-1.5 h-4 w-4 text-primary" />
                    Help &amp; Troubleshooting
                  </Link>
                </Button>
                <Button asChild size="sm" variant="ghost">
                  <Link href="/players">
                    <Tv className="mr-1.5 h-4 w-4" />
                    Player Guides
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
