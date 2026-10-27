import type { Metadata } from "next";
import Link from "next/link";
import {
  Check,
  X,
  ArrowRight,
  Tv,
  Film,
  MonitorSmartphone,
  ShieldCheck,
  Clock,
  Headphones,
  CreditCard,
  RefreshCw,
  Zap,
  LayoutList,
} from "lucide-react";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { Container } from "@/components/shared/Container";
import { PageSchema } from "@/components/shared/Schema";
import { Section } from "@/components/shared/Section";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FaqList, type FaqItem } from "@/components/sections/FAQ";
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQPageSchema } from "@/lib/schema";
import {
  PRODUCT_TRUTHS,
  FACT_TEXT,
  SITE_URL,
  GOOGLEBOT_PREVIEW,
  generateMetadata as generatePageMetadata,
} from "@/lib/site-config";
import { getLastModified } from "@/lib/site-routes";

const canonical = "/best-iptv-service";
const title = "Best IPTV Service 2026: What to Look For and How to Choose";
const description =
  `Find the best IPTV service using six practical criteria: channel count, connection limit, free trial, no auto-renewal, support hours, and price. TryIPTV covers all six.`;
const modifiedDate = getLastModified(canonical);

export function generateMetadata(): Metadata {
  return {
    ...generatePageMetadata({
      title,
      description,
      canonical,
      image: `${SITE_URL}/images/best-iptv-service.png`,
      noIndex: true,
    }),
    title: { absolute: `${title} | TryIPTV` },
    robots: { index: false, follow: false },
  };
}

const T = PRODUCT_TRUTHS;

interface Criterion {
  icon: React.ElementType;
  heading: string;
  what: string;
  tryiptv: string;
}

const criteria: Criterion[] = [
  {
    icon: Tv,
    heading: "Channel count and variety",
    what:
      "A large library reduces the chance of a channel you watch being absent. Look for at least 10,000 live channels and a split across sports, news, entertainment, kids and international content.",
    tryiptv: `TryIPTV delivers ${T.channels} live channels including sports, news, entertainment, kids' programming and channels from countries around the world.`,
  },
  {
    icon: Film,
    heading: "On-demand library",
    what:
      "On-demand (VOD) content lets you watch movies and TV series without a live broadcast schedule. A library above 50,000 titles gives meaningful depth.",
    tryiptv: `The TryIPTV VOD library includes ${T.vod} movies and TV shows alongside the live channel lineup.`,
  },
  {
    icon: MonitorSmartphone,
    heading: "Simultaneous connections",
    what:
      "If two people in your home watch at the same time, you need at least 2 connections. Some services charge extra per connection.",
    tryiptv: `Every TryIPTV plan — including the free trial — includes ${T.connections} simultaneous connections at no extra cost.`,
  },
  {
    icon: Clock,
    heading: "Free trial before you buy",
    what:
      "A real trial lets you verify that the channels you watch are available and stable before any money changes hands. Avoid services that refuse a trial or charge for it.",
    tryiptv: `TryIPTV offers a ${T.trialDuration.toLowerCase()} free trial at ${T.trialCost}. No credit card is required.`,
  },
  {
    icon: RefreshCw,
    heading: "No automatic renewal",
    what:
      "Auto-renewal subscriptions bill you again the moment a period ends. A fixed-term plan ends cleanly and only continues if you choose to renew.",
    tryiptv: `TryIPTV uses ${T.billing.toLowerCase()}. Your plan ends at the agreed date; nothing is charged after that unless you buy a new plan.`,
  },
  {
    icon: Headphones,
    heading: "Responsive support",
    what:
      "IPTV setup questions arise frequently: player configuration, EPG, buffering fixes. Support that answers within hours makes a real difference.",
    tryiptv:
      "TryIPTV support responds on WhatsApp and by email, 9:00 AM–10:00 PM ET every day, including weekends.",
  },
];

interface PricingRow {
  duration: string;
  total: string;
  monthly: string;
  popular: boolean;
}

const pricingRows: PricingRow[] = T.plans.map((p) => ({
  duration: p.duration,
  total: `$${p.price.toFixed(2)}`,
  monthly: `$${p.monthlyEquivalent.toFixed(2)} / mo`,
  popular: p.duration === "12 Months",
}));

interface ComparisonRow {
  feature: string;
  typical: string | null;
  tryiptv: string;
}

const comparisonRows: ComparisonRow[] = [
  { feature: `${T.channels} live channels`, typical: null, tryiptv: "Included" },
  { feature: `${T.vod} on-demand titles`, typical: null, tryiptv: "Included" },
  { feature: `${T.connections} simultaneous connections`, typical: null, tryiptv: "All plans" },
  { feature: `${T.trialDuration.toLowerCase()} free trial`, typical: null, tryiptv: "No credit card" },
  { feature: "No automatic renewal", typical: null, tryiptv: "Fixed-term only" },
  { feature: "Same-day support", typical: null, tryiptv: "WhatsApp & email" },
  { feature: `From ${FACT_TEXT.lowestMonthly}/month`, typical: null, tryiptv: `12-month plan` },
];

const faqs: FaqItem[] = [
  {
    question: "What is the best IPTV service for the USA and UK?",
    answer:
      `A good IPTV service for the USA and UK covers local and international channels, works on the devices you already own, and offers a free trial before you pay. TryIPTV delivers ${T.channels} live channels and ${T.vod} on-demand titles, with ${T.connections} simultaneous connections, a ${T.trialDuration.toLowerCase()} free trial at $0, and no automatic renewal.`,
  },
  {
    question: "How do I choose an IPTV service?",
    answer:
      "Start with six criteria: (1) the channel count and variety match what you watch, (2) an on-demand library is included, (3) the connection limit covers everyone in your home, (4) a free trial is available before you pay, (5) the billing model is fixed-term rather than auto-renewing, and (6) support is reachable when setup questions arise.",
  },
  {
    question: "Is a free trial enough to evaluate an IPTV service?",
    answer:
      `A ${T.trialDuration.toLowerCase()} trial gives enough time to check the channels you watch most, load the EPG guide, test playback on a second device using a second connection, and contact support once to see how fast they respond. Use that window systematically rather than passively watching one channel.`,
  },
  {
    question: "How many connections does a good IPTV service include?",
    answer:
      `Two simultaneous connections let two devices — for example, a TV and a phone — stream different channels at the same time. TryIPTV includes ${T.connections} connections on every plan and on the free trial. Services that cap at one connection or charge per extra connection add friction for households with more than one viewer.`,
  },
  {
    question: "Does TryIPTV renew automatically?",
    answer:
      `No. TryIPTV uses ${T.billing.toLowerCase()}. When a plan ends, streaming stops and nothing is billed. You buy a new plan through WhatsApp whenever you choose to continue.`,
  },
  {
    question: "What devices does TryIPTV support?",
    answer:
      "TryIPTV delivers credentials in Xtream Codes and M3U format, which are supported by the major IPTV player apps: TiviMate, IPTV Smarters, XCIPTV, OTT Navigator, Televizo, and others. These apps run on Fire TV, Android TV, Apple TV, Smart TVs, iPhones, Android phones, Windows PCs and Macs.",
  },
  {
    question: "How much does TryIPTV cost?",
    answer:
      `TryIPTV plans cost ${FACT_TEXT.priceList}. All plans include the same ${T.channels} live channels, ${T.vod} on-demand titles, and ${T.connections} simultaneous connections. There is no automatic renewal on any plan.`,
  },
];

const trialUrl =
  "https://wa.me/212694833293?text=Hello%20TryIPTV%2C%20I%20would%20like%20to%20start%20my%20free%20IPTV%20trial.";

export default function BestIptvServicePage() {
  const breadcrumbItems = [
    { name: "Home", item: `${SITE_URL}/` },
    { name: "Best IPTV Service", item: `${SITE_URL}${canonical}` },
  ];

  const nodes = [
    generateBreadcrumbSchema(breadcrumbItems),
    generateArticleSchema({
      headline: title,
      description,
      url: `${SITE_URL}${canonical}`,
      dateModified: modifiedDate,
      image: `${SITE_URL}/images/best-iptv-service.png`,
    }),
    generateFAQPageSchema(faqs.map((f) => ({ question: f.question, answer: f.answer }))),
  ];

  return (
    <>
      <PageSchema path={canonical} nodes={nodes} dateModified={modifiedDate} />

      <Container>
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Best IPTV Service", href: canonical },
          ]}
        />
      </Container>

      {/* Hero */}
      <Section className="pt-10 pb-8">
        <Container className="max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Best IPTV Service 2026: What to Look For and How to Choose
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Not all IPTV services deliver the same channel count, connection limit, or billing terms.
            This guide covers the six criteria that separate reliable services from unreliable ones —
            and shows how TryIPTV measures up against each.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href={trialUrl} target="_blank" rel="noopener noreferrer">
                Start {T.trialDuration} free trial <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/pricing">View plans</Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* Six criteria */}
      <Section>
        <Container>
          <SectionHeader
            title="Six criteria for a good IPTV service"
            subtitle="Use these criteria to evaluate any provider before you pay."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {criteria.map((c) => {
              const Icon = c.icon;
              return (
                <Card key={c.heading} className="flex flex-col">
                  <CardContent className="pt-6 flex flex-col gap-3 flex-1">
                    <div className="flex items-center gap-2">
                      <Icon className="h-5 w-5 text-primary shrink-0" />
                      <h2 className="font-semibold text-base">{c.heading}</h2>
                    </div>
                    <p className="text-sm text-muted-foreground">{c.what}</p>
                    <div className="mt-auto rounded-md bg-primary/10 px-3 py-2 text-sm">
                      <span className="font-medium text-primary">TryIPTV: </span>
                      {c.tryiptv}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Comparison table */}
      <Section className="bg-muted/40">
        <Container>
          <SectionHeader
            title="How TryIPTV stacks up"
            subtitle="All six criteria, at a glance."
          />
          <div className="mt-8 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4 text-left font-semibold">Criterion</th>
                  <th className="py-3 px-4 text-center font-semibold">Many services</th>
                  <th className="py-3 px-4 text-center font-semibold text-primary">TryIPTV</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.feature} className="border-b last:border-0">
                    <td className="py-3 px-4">{row.feature}</td>
                    <td className="py-3 px-4 text-center">
                      <X className="mx-auto h-4 w-4 text-muted-foreground" />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="inline-flex items-center gap-1 text-primary font-medium">
                        <Check className="h-4 w-4" />
                        {row.tryiptv}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* Pricing */}
      <Section>
        <Container>
          <SectionHeader
            title="TryIPTV plans"
            subtitle={`All plans include ${T.channels} live channels, ${T.vod} on-demand titles, ${T.connections} connections and no auto-renewal.`}
          />
          <div className="mt-8 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4 text-left font-semibold">Plan</th>
                  <th className="py-3 px-4 text-right font-semibold">Total</th>
                  <th className="py-3 px-4 text-right font-semibold">Per month</th>
                </tr>
              </thead>
              <tbody>
                {pricingRows.map((row) => (
                  <tr key={row.duration} className="border-b last:border-0">
                    <td className="py-3 px-4 font-medium">
                      {row.duration}
                      {row.popular && (
                        <span className="ml-2 rounded-full bg-primary/15 px-2 py-0.5 text-xs font-semibold text-primary">
                          Best value
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">{row.total}</td>
                    <td className="py-3 px-4 text-right text-muted-foreground">{row.monthly}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Free trial: {T.trialDuration}, {T.trialCost}.{" "}
            <Link href="/pricing" className="underline underline-offset-4 hover:text-foreground">
              See full pricing
            </Link>
          </p>
        </Container>
      </Section>

      {/* How to get started */}
      <Section className="bg-muted/40">
        <Container className="max-w-2xl">
          <SectionHeader
            title="How to get started"
            subtitle="Three steps from zero to live TV."
          />
          <ol className="mt-8 space-y-6">
            {[
              {
                icon: Zap,
                step: "1",
                title: "Start the free trial",
                body: `Message TryIPTV on WhatsApp to request a ${T.trialDuration.toLowerCase()} trial. Login credentials arrive in ${T.activationTime}.`,
              },
              {
                icon: LayoutList,
                step: "2",
                title: "Open your player and test",
                body: "Add the Xtream Codes or M3U login to any compatible IPTV player app. Check the channels you watch most and test a second device on the second connection.",
              },
              {
                icon: CreditCard,
                step: "3",
                title: "Choose a plan if it works",
                body: `If the trial is what you expected, pick a plan — ${FACT_TEXT.priceList}. Nothing auto-renews.`,
              },
            ].map(({ icon: Icon, step, title: t, body }) => (
              <li key={step} className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
                  {step}
                </span>
                <div>
                  <p className="font-semibold">{t}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{body}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-8">
            <Button asChild size="lg">
              <a href={trialUrl} target="_blank" rel="noopener noreferrer">
                Start free trial on WhatsApp <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section>
        <Container className="max-w-3xl">
          <SectionHeader
            title="Frequently asked questions"
            subtitle="Common questions about choosing and using an IPTV service."
          />
          <div className="mt-8">
            <FaqList items={faqs} />
          </div>
        </Container>
      </Section>

      {/* Related links */}
      <Section className="bg-muted/40">
        <Container>
          <SectionHeader title="Learn more about IPTV" />
          <div className="mt-6 flex flex-wrap gap-3">
            {[
              { href: "/iptv-free-trial", label: "Get the free trial" },
              { href: "/pricing", label: "View all plans" },
              { href: "/guides/what-is-iptv", label: "What is IPTV?" },
              { href: "/guides/iptv-vs-cable", label: "IPTV vs cable TV" },
              { href: "/guides/iptv-internet-speed", label: "Internet speed for IPTV" },
              { href: "/devices", label: "Supported devices" },
              { href: "/players", label: "IPTV player apps" },
            ].map((link) => (
              <Button key={link.href} asChild variant="outline" size="sm">
                <Link href={link.href}>{link.label}</Link>
              </Button>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
