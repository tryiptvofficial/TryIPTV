import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TopicClusterLinks } from "@/components/shared/TopicClusterLinks";
import { GuideByline } from "@/components/shared/GuideByline";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { Container } from "@/components/shared/Container";
import { PageSchema } from "@/components/shared/Schema";
import { Section } from "@/components/shared/Section";
import { Button } from "@/components/ui/button";
import { ArticleProse, ArticleSummary } from "@/components/guide";
import { FaqList, type FaqItem } from "@/components/sections/FAQ";
import { generateArticleSchema, generateBreadcrumbSchema } from "@/lib/schema";
import { PRODUCT_TRUTHS, SITE_URL, generateMetadata as generatePageMetadata } from "@/lib/site-config";
import { getLastModified } from "@/lib/site-routes";

/**
 * IPTV connections guide: what counts as a connection and how many a household needs.
 * Informational on purpose: no prices here, so it supports /pricing instead of competing with it.
 * Not stated until the owner supplies them: the price of extra connections, and what TryIPTV does
 * when the limit is exceeded.
 */

const T = PRODUCT_TRUTHS;
const title = "How Many Devices Can Use One IPTV Subscription?";
const description = `How IPTV connections work: what counts as a stream, how many devices can watch at once, and how many connections a household needs. TryIPTV includes ${T.connections}.`;
const canonical = "/guides/iptv-connections";
const modifiedDate = getLastModified(canonical);
const link = "text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary";

export function generateMetadata(): Metadata {
  const metaTitle = "IPTV Connections: How Many Devices Can Watch at Once?";
  return {
    ...generatePageMetadata({ title: metaTitle, description, canonical, noIndex: false }),
    title: { absolute: `${metaTitle} | TryIPTV` },
  };
}

const connectionRows = [
  { situation: "A TV and a phone watching at the same time", used: "2" },
  { situation: "The same channel on two TVs", used: "2 (each TV plays its own stream)" },
  { situation: "Casting from a phone to Chromecast, or AirPlay to a TV", used: "1 (the stream being cast)" },
  { situation: "A player paused or left open in the background", used: "Sometimes 1, until the app is closed" },
  { situation: "Multi-view with four channels on one screen", used: "Usually 4 (depends on the player)" },
  { situation: "Recording one channel while watching another", used: "Usually 2 (depends on the player)" },
  { situation: "A player installed but closed", used: "0" },
];

const householdRows = [
  { viewers: "One person, one screen at a time", need: "1" },
  { viewers: "Two people watching different channels at once", need: "2" },
  { viewers: "Three or more people watching at once at peak time", need: "3 or more" },
];

const faqs: FaqItem[] = [
  {
    question: "Can I install IPTV on several devices?",
    answer: `Yes. You can install your TryIPTV login on as many of your own devices as you like. The limit is on streams playing at the same time: ${T.connections} on a standard plan.`,
  },
  {
    question: "Does casting to a TV count as a connection?",
    answer: "Casting or AirPlay uses one connection: the stream being cast. It does not add a second stream unless another device is also playing.",
  },
  {
    question: `Does the free trial include ${T.connections} connections?`,
    answer: `Yes. The free trial includes ${T.trialConnections}, so you can test two screens at once before you pay.`,
  },
  {
    question: "Can I add more connections?",
    answer: `${T.extraConnections} Ask support on WhatsApp for the price.`,
  },
  {
    question: "Can I share my subscription with family in another house?",
    answer: "No. Sharing a subscription with other households is not allowed under the Terms. Using it on your own devices, including at a second home, is fine within the connection limit.",
  },
  {
    question: "Does a paused stream still count?",
    answer: "Sometimes. A player that is paused or still running in the background can stay connected. If a new stream will not start, close the player fully on the other device first.",
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
  { name: "IPTV Connections", item: `${SITE_URL}${canonical}` },
]);

function SimpleTable({ caption, head, rows }: { caption: string; head: [string, string]; rows: [string, string][] }) {
  return (
    <div className="my-8 overflow-hidden rounded-xl border border-white/[0.08] bg-[#070908] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
      <div className="overflow-x-auto" tabIndex={0} role="region" aria-label={caption}>
        <table className="w-full text-left text-[15px] sm:text-sm">
          <caption className="sr-only">{caption}</caption>
          <thead className="border-b border-white/[0.08] bg-white/[0.02] text-primary font-mono uppercase tracking-wider text-xs">
            <tr>
              <th scope="col" className="p-3.5 sm:p-4">{head[0]}</th>
              <th scope="col" className="p-3.5 sm:p-4">{head[1]}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.06] text-muted-foreground">
            {rows.map(([a, b]) => (
              <tr key={a} className="transition-colors hover:bg-white/[0.02]">
                <th scope="row" className="p-3.5 sm:p-4 font-semibold text-foreground">{a}</th>
                <td className="p-3.5 sm:p-4">{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function IptvConnectionsPage() {
  return (
    <>
      <PageSchema nodes={[articleSchema, breadcrumbSchema]} />

      {/* Hero Header */}
      <Section className="border-b border-white/[0.07] pt-10 pb-14 sm:pt-14 sm:pb-20">
        <Container>
          <Breadcrumb items={[{ label: "Guides", href: "/guides" }, { label: "IPTV Connections" }]} align="center" />
          <div className="mx-auto max-w-4xl text-center">
            <p className="eyebrow mb-3">Connections &amp; Multi-Screen</p>
            <h1 className="font-headline text-3xl font-extrabold leading-[1.15] text-foreground sm:text-4xl lg:text-5xl">{title}</h1>
            <p className="mx-auto mt-5 max-w-[60ch] text-base leading-7 text-muted-foreground sm:text-lg">
              What an IPTV connection is, what counts as one, and how many your household needs.
            </p>
            <GuideByline path={canonical} />
          </div>
        </Container>
      </Section>

      <Section className="pt-10 pb-12 sm:pt-14 sm:pb-16 lg:pb-16">
        <Container>
          <article className="mx-auto max-w-3xl">
            <ArticleSummary title="The Direct Answer">
              <p>
                An IPTV connection is one stream playing at a time, not one device. You can install your login on as many of your own
                devices as you like; the limit is how many of them play at once. A standard TryIPTV plan includes{" "}
                <strong className="text-foreground font-semibold">{T.connections} simultaneous connections</strong>.{" "}
                {T.extraConnections}
              </p>
            </ArticleSummary>

            <ArticleProse>
              <h2>What counts as a connection?</h2>
              <p>
                Each device that is playing a stream uses one connection. Installing a player, or having the login saved on a device,
                uses none. Some cases depend on the player app, so they are marked &ldquo;usually&rdquo;.
              </p>
            </ArticleProse>

            <SimpleTable
              caption="What counts as an IPTV connection"
              head={["Situation", "Connections used"]}
              rows={connectionRows.map((r) => [r.situation, r.used])}
            />

            <ArticleProse>
              <h2>Devices installed vs streams playing</h2>
              <p>
                The limit is on streams, not installs. A household can keep the login on a living-room TV, a bedroom stick, a laptop and
                two phones. What matters is how many of them play at the same moment. A player left paused, or running in the
                background on another device, can still hold a connection until it is closed.
              </p>

              <h2>How many connections does your household need?</h2>
              <p>
                Count the people who watch at the same time, not the devices you own. Think of the busiest evening of the week, such as a
                big game while someone else watches a film.
              </p>
            </ArticleProse>

            <SimpleTable
              caption="Connections needed by household"
              head={["Who watches at the same time", "Connections needed"]}
              rows={householdRows.map((r) => [r.viewers, r.need])}
            />

            <ArticleProse>
              <h2>Connections on TryIPTV</h2>
              <p>
                Every standard TryIPTV plan includes {T.connections} simultaneous connections, and the{" "}
                <Link href="/iptv-free-trial" className={link}>24-hour free trial</Link> includes the same{" "}
                {T.connections}, so you can test two screens before you pay. {T.extraConnections} Ask support on WhatsApp; the steps
                are on{" "}
                <Link href="/how-it-works" className={link}>how TryIPTV works</Link>. Plan lengths and prices are on the{" "}
                <Link href="/pricing" className={link}>pricing page</Link>.
              </p>
              <p>
                A subscription is for one household. Sharing it with another household is not allowed under the{" "}
                <Link href="/terms-conditions" className={link}>Terms</Link>.
              </p>

              <h2>Travelling and second homes</h2>
              <p>
                Your subscription {T.travel}. You can install it at a second home too; the same limit applies across all your devices
                wherever they are.
              </p>

              <h2>Internet speed for several streams</h2>
              <p>
                Each stream uses its own bandwidth, so two streams at once need roughly double: plan on about 25 Mbps per Full HD stream
                and 50 Mbps per 4K stream. See{" "}
                <Link href="/guides/iptv-internet-speed" className={link}>how much internet speed IPTV needs</Link>.
              </p>

              <h2>If a stream will not start on another device</h2>
              <p>
                If a stream will not start while someone else is watching, check how many devices are playing. Stop playback, or close
                the player fully on a device you are not using, then try again. If it still fails, follow the{" "}
                <Link href="/help/iptv-login-not-working" className={link}>login troubleshooting guide</Link> or message support.
              </p>
            </ArticleProse>

            <div className="mt-12 pt-8 border-t border-white/[0.08]">
              <div className="mb-6">
                <span className="eyebrow mb-1">Direct Answers</span>
                <h2 className="font-headline text-2xl sm:text-3xl font-extrabold text-foreground">Frequently Asked Questions</h2>
                <p className="mt-2 text-base sm:text-sm text-muted-foreground leading-relaxed">
                  Short answers about devices, casting, sharing and adding connections.
                </p>
              </div>
              <FaqList items={faqs} />
            </div>

            <div className="mt-12 rounded-xl border border-primary/25 bg-[#0b100d] p-6 sm:p-8">
              <span className="eyebrow mb-2">Next Steps</span>
              <h2 className="font-headline text-xl sm:text-2xl font-extrabold text-foreground">Test Two Screens for Free</h2>
              <p className="mt-2 text-base sm:text-sm leading-relaxed text-muted-foreground">
                The 24-hour free trial includes {T.connections} simultaneous connections, so you can run two screens on your own network
                before you choose a plan.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
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
      <TopicClusterLinks path={canonical} />
    </>
  );
}
