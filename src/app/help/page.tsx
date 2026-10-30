import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  FileText,
  HelpCircle,
  KeyRound,
  Layers,
  Lock,
  PlaySquare,
  RefreshCw,
  Search,
  Server,
  ShieldAlert,
  Smartphone,
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
import { PRODUCT_TRUTHS, STREAM_SPEED_MBPS, SITE_URL, generateMetadata as generatePageMetadata } from "@/lib/site-config";
import { COMPANY } from "@/lib/site-data/company";

const title = "IPTV Help & Troubleshooting Directory";
const description =
  "Troubleshooting guides for IPTV problems: fix buffering, resolve login failures, diagnose playlists that will not load, and correct TV guide errors fast.";
const canonical = "/help";

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

const specialistGuides = [
  {
    title: "Playback Freezes or Buffers",
    href: "/help/iptv-buffering",
    symptom: "Channels stutter, audio falls out of sync, or spinning wheels interrupt live streams.",
    description:
      "A systematic 8-step guide to distinguish local Wi-Fi packet delay variation and decoder bottlenecks from ISP routing and upstream media server congestion.",
    badge: "Stream Diagnostics",
    icon: PlaySquare,
    badgeColor: "text-rose-400 border-rose-400/20 bg-rose-400/10",
  },
  {
    title: "Login Rejected or Authentication Fails",
    href: "/help/iptv-login-not-working",
    symptom: "Player displays 'Invalid Details', 'Authentication Failed', or HTTP 401/403 status codes.",
    description:
      "Step-by-step diagnostic workflow to catch trailing whitespace, remote control typos, server URL port syntax, and active multi-device connection limits.",
    badge: "Authentication",
    icon: Lock,
    badgeColor: "text-amber-400 border-amber-400/20 bg-amber-400/10",
  },
  {
    title: "Playlist Won't Load (0 Channels)",
    href: "/help/m3u-not-loading",
    symptom: "App shows 'Download Error', 'Failed to Load Playlist', or crashes during large playlist parsing.",
    description:
      "Diagnose URL encoding errors, TLS/SSL certificate verification failures, network timeout issues, and memory constraints on compact streaming sticks.",
    badge: "Playlist Ingestion",
    icon: FileText,
    badgeColor: "text-blue-400 border-blue-400/20 bg-blue-400/10",
  },
  {
    title: "TV Guide (EPG) Missing or Wrong Time",
    href: "/help/epg-not-working",
    symptom: "Guide grid shows 'No Information', listings end prematurely, or showtimes are shifted by hours.",
    description:
      "Troubleshoot complete guide blackouts, resolve channel mapping gaps (tvg-id), clear corrupt cache databases, and synchronize device system clocks.",
    badge: "EPG Metadata",
    icon: Calendar,
    badgeColor: "text-emerald-400 border-emerald-400/20 bg-emerald-400/10",
  },
  {
    title: "Error Code or Message on Screen",
    href: "/help/iptv-error-codes",
    symptom: "Player shows a number such as 401, 403, 503 or 522, a Formuler code, or a MAG portal message.",
    description:
      "Look up what the code means, with sources, and jump to the step that fixes it. Only codes with an official or standards source are listed.",
    badge: "Error Codes",
    icon: AlertCircle,
    badgeColor: "text-primary border-primary/20 bg-primary/10",
  },
];

const quickChecks = [
  "Restart the device and your router, then reopen the player app.",
  "Try a second channel and a second device: if only one channel fails, the problem is that channel, not your setup.",
  "Check your login details for typos or spaces, and check that your plan or trial has not expired.",
  `Run a speed test on the same device: about ${STREAM_SPEED_MBPS.fullHd} Mbps is enough for one Full HD stream and ${STREAM_SPEED_MBPS.uhd} Mbps for 4K.`,
  "Use Ethernet or move closer to the router if streams stutter only on Wi-Fi.",
  `Close the stream on other screens: every plan allows ${PRODUCT_TRUTHS.connections} simultaneous connections.`,
];

export default function HelpPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", item: `${SITE_URL}/` },
    { name: "Help", item: `${SITE_URL}/help` },
  ]);

  return (
    <>
      <PageSchema
        path="/help"
        name={title}
        description={description}
        type="CollectionPage"
        nodes={[
          breadcrumbSchema,
          generateItemListSchema("IPTV troubleshooting guides", [
            { name: "IPTV Not Working? Start With This Troubleshooting Checklist", path: "/help/iptv-not-working" },
            ...specialistGuides.map((g) => ({ name: g.title, path: g.href })),
          ]),
        ]}
      />

      {/* Hero Header */}
      <Section className="relative overflow-hidden border-b border-white/[0.07] pt-12 pb-14 sm:pt-16 sm:pb-20">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
        <Container className="relative text-center">
          <Breadcrumb items={[{ label: "Help" }]} align="center" />
          <SectionHeader
            as="h1"
            eyebrow="Diagnostic Directory"
            title="IPTV Help &amp; Troubleshooting"
            subtitle="Fixes for common IPTV problems, organized by what you see: channels that won't load, buffering or freezing, a login that is rejected, an M3U playlist that won't open, a blank or wrong TV guide (EPG), or an error code on screen. Each guide walks through the checks in order. Not sure which applies? Start with the IPTV not working checklist."
          />
        </Container>
      </Section>

      {/* Main Troubleshooting Content */}
      <Section className="py-12 sm:py-16">
        <Container>
          {/* Master Triage Hero Card */}
          <div className="mb-14">
            <Card className="relative overflow-hidden rounded-2xl border-primary/30 bg-primary/[0.04] p-6 shadow-lg sm:p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs font-bold text-primary">
                      <Search className="h-3.5 w-3.5" />
                      MASTER DIAGNOSTIC ROUTER
                    </span>
                    <span className="text-xs text-muted-foreground">Start Here</span>
                  </div>
                  <h2 className="font-headline text-2xl font-extrabold text-foreground sm:text-3xl">
                    Not Sure What Is Wrong? Start With Master Triage
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                    Saying &quot;my IPTV is not working&quot; can describe problems at five completely different layers. Use our 2-minute master checklist to identify whether the issue is local to your device, network, player application, or upstream server, and jump directly to the right fix.
                  </p>
                </div>
                <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
                  <Button asChild size="lg" className="w-full justify-center">
                    <Link href="/help/iptv-not-working">
                      Open Master Triage Checklist
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Specialist Problem Categories */}
          <div className="mb-8">
            <p className="eyebrow mb-2">Specialist Problem Solutions</p>
            <h2 className="font-headline text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Troubleshoot by Specific Symptom
            </h2>
            <p className="mt-2 text-base text-muted-foreground">
              Already know which part of your setup is failing? Select your symptom below to follow targeted diagnostic steps.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {specialistGuides.map((guide, i) => {
              const Icon = guide.icon;
              // An odd last card spans both columns instead of sitting alone.
              const span = i === specialistGuides.length - 1 && specialistGuides.length % 2 === 1 ? "md:col-span-2 " : "";
              return (
                <Card
                  key={guide.href}
                  className={`${span}group flex flex-col justify-between border-white/[0.08] bg-[#07080a] transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:bg-[#07080a] shadow-sm`}
                >
                  <CardHeader className="pb-3">
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${guide.badgeColor}`}>
                        <Icon className="h-3 w-3" />
                        {guide.badge}
                      </span>
                    </div>
                    <CardTitle as="h3" className="font-headline text-lg font-bold leading-snug sm:text-xl">
                      <Link href={guide.href} className="tap-target text-foreground transition-colors group-hover:text-primary">
                        {guide.title}
                      </Link>
                    </CardTitle>
                    <p className="mt-1 text-base font-medium text-amber-400/90 sm:text-sm">
                      Symptom: {guide.symptom}
                    </p>
                  </CardHeader>
                  <CardContent className="pt-0 flex flex-1 flex-col justify-between">
                    <p className="mb-6 text-base leading-relaxed text-muted-foreground sm:text-sm">
                      {guide.description}
                    </p>
                    <div className="flex items-center justify-between border-t border-white/[0.06] pt-3">
                      <span className="text-xs text-muted-foreground">Step-by-Step Diagnostic</span>
                      <Link
                        href={guide.href}
                        className="tap-target inline-flex items-center gap-1.5 text-xs font-bold text-primary transition-colors hover:underline"
                      >
                        Troubleshoot Issue <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Quick checks and support */}
          <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-white/[0.08] bg-[#07080a] p-6 sm:p-8">
              <h2 className="font-headline text-xl font-bold text-foreground sm:text-2xl">Quick Checks Before You Troubleshoot</h2>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground sm:text-sm">
                Most IPTV problems clear up with one of these. Try them in order, then open the guide for your symptom if the problem stays.
              </p>
              <ul className="mt-4 space-y-2.5 text-base leading-relaxed text-muted-foreground sm:text-sm">
                {quickChecks.map((check) => (
                  <li key={check} className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                    <span>{check}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-base text-muted-foreground sm:text-sm">
                Setting up a new device instead? Start with the{" "}
                <Link href="/devices" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
                  device setup guides
                </Link>{" "}
                or the{" "}
                <Link href="/players" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
                  IPTV player guides
                </Link>
                .
              </p>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-[#07080a] p-6 sm:p-8">
              <h2 className="font-headline text-xl font-bold text-foreground sm:text-2xl">Still Stuck? Contact Support</h2>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground sm:text-sm">
                Message support on WhatsApp ({COMPANY.support.whatsappDisplay}) or email, {COMPANY.support.hours}.
                {COMPANY.support.responseTime ? ` Replies arrive ${COMPANY.support.responseTime.charAt(0).toLowerCase()}${COMPANY.support.responseTime.slice(1)}.` : ""}
                {COMPANY.support.outOfHours ? ` ${COMPANY.support.outOfHours}` : ""}
              </p>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-sm">To get a fix faster, include:</p>
              <ul className="mt-2 list-disc space-y-1.5 pl-5 text-base leading-relaxed text-muted-foreground sm:text-sm">
                <li>your device and the IPTV player app you use;</li>
                <li>the exact error message, or a photo of the screen;</li>
                <li>which channels or menus are affected, and since when;</li>
                <li>which of the quick checks you already tried.</li>
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button asChild size="sm">
                  <a href={COMPANY.support.whatsappUrl} target="_blank" rel="noopener noreferrer">
                    Message Support on WhatsApp
                  </a>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <Link href="/contact-us">All Contact Options</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Cross-Directory Navigation Banner */}
          <div className="mt-16 rounded-2xl border border-white/[0.08] bg-[#07080a] p-6 sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="eyebrow mb-1">Looking for Explanations &amp; Specs?</p>
                <h3 className="font-headline text-lg font-bold text-foreground sm:text-xl">
                  Understand IPTV Formats and Architecture
                </h3>
                <p className="mt-1.5 max-w-xl text-base text-muted-foreground sm:text-sm">
                  Want to learn how M3U playlists, Xtream Codes APIs, and XMLTV guides operate under the hood? Explore our comprehensive educational guides.
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-3">
                <Button asChild size="sm" variant="outline">
                  <Link href="/guides">
                    <BookOpen className="mr-1.5 h-4 w-4 text-primary" />
                    Browse IPTV Guides
                  </Link>
                </Button>
                <Button asChild size="sm" variant="ghost">
                  <Link href="/faq">
                    <HelpCircle className="mr-1.5 h-4 w-4" />
                    General FAQ
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
