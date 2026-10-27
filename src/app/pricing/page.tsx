import type { Metadata } from "next";
import type React from "react";
import Link from "next/link";
import { ArrowRight, Check, ChevronDown, CirclePlay, Gauge, HeadphonesIcon, MonitorSmartphone, Receipt, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { PageSchema } from "@/components/shared/Schema";
import { generateFAQPageSchema } from "@/lib/schema";
import { generateMetadata as generatePageMetadata, SITE_URL } from "@/lib/site-config";
import { getPricingPageData } from "@/lib/data/pricing-page";
import { plans } from "@/lib/site-data/pricing";
import { PRODUCT_TRUTHS, FACT_TEXT } from "@/lib/site-config";
import { COMPANY } from "@/lib/site-data/company";

const link = "font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary";
const T = PRODUCT_TRUTHS;

export function generateMetadata(): Metadata {
  const title = "IPTV Subscription Plans & Pricing 2026 | TryIPTV";
  const description =
    "IPTV plans from $7.35/mo on the 12-month plan, or $15.82 for 1 month. All 4 plans include 2 connections and no auto-renewal. Compare prices and savings.";

  return {
    ...generatePageMetadata({ title, description, canonical: "/pricing" }),
    title: { absolute: title },
  };
}

const quickFacts = [
  "Plans from $15.82",
  "1 / 3 / 6 / 12 Months",
  "2 Simultaneous Connections",
  "One-Time Payment",
  "No Automatic Renewal",
  "24-Hour Free Trial Available",
] as const;

const planDescriptions: Record<string, string> = {
  "1-month": "Lowest commitment for short-term testing or flexible viewing.",
  "3-months": "Short-term savings without committing to a six- or twelve-month term.",
  "6-months": "Balanced fixed term between upfront cost and duration.",
  "12-months": "Lowest effective monthly cost for ongoing viewing.",
};

const planSavingsExact: Record<string, string | null> = {
  "1-month": null,
  "3-months": "Save $9.16 vs three 1\u2011month purchases",
  "6-months": "Save $35.77 vs six 1\u2011month purchases",
  "12-months": "Save $101.61 vs twelve 1\u2011month purchases",
};

// Whole-dollar amounts without decimals ($16), others with cents ($7.35).
const formatUsd = (amount: number) => `$${amount % 1 === 0 ? amount.toFixed(0) : amount.toFixed(2)}`;

const planBestFor: Record<string, string> = {
  "1-month": "Lowest commitment",
  "3-months": "Short-term savings",
  "6-months": "Balanced fixed term",
  "12-months": "Lowest monthly equivalent",
};

// Same list as the homepage plan cards.
const planCardFeatures = [
  "HD and 4K Streams Where Available",
  "25,000+ Live Channels Worldwide",
  "120,000+ On-Demand (VOD) Movies & TV Shows",
  "Pay-Per-View (PPV) Events Included",
  "Smart EPG (TV Guide) & Catch-Up TV",
  "Customer Support",
  "Multi-Device Compatibility",
] as const;

const orderSteps = [
  {
    step: "1",
    title: "Pick your plan",
    desc: `Choose 1, 3, 6 or 12 months. Every plan includes ${T.connections} simultaneous connections, and plans start at ${FACT_TEXT.fromPrice} for one month.`,
  },
  {
    step: "2",
    title: "Pay on WhatsApp",
    desc: COMPANY.paymentMethods
      ? `Tap the plan's button to open WhatsApp; support sends payment instructions. Pay by ${COMPANY.paymentMethods}, once, with no automatic renewal.`
      : "Tap the plan's button to open WhatsApp; support sends payment instructions. You pay once, with no automatic renewal.",
  },
  {
    step: "3",
    title: "Start streaming",
    desc: `Your login arrives on WhatsApp within ${T.activationTime} after payment is confirmed. Works on Firestick, Android TV, smart TVs, Apple TV, MAG, phones and computers.`,
  },
] as const;

const highlights = [
  COMPANY.paymentMethods ? `${COMPANY.paymentMethods.replace(/^c/, "C")} accepted` : "One-time payment",
  "Quick activation after payment is confirmed",
  "Support on WhatsApp and email",
  "Transparent, flat one-time pricing",
];

const whatYouGet: React.ReactNode[] = [
  `${T.channels} live TV channels and major sports events`,
  `${T.vod} movies and series on demand (VOD)`,
  "EPG (TV guide) in your IPTV player",
  <>
    HD/4K where available (about 25 Mbps for HD and 50 Mbps for 4K;{" "}
    <Link href="/guides/iptv-internet-speed" className={link}>speed guide</Link>)
  </>,
  <>
    Works on Firestick, Android TV, smart TVs, Apple TV, MAG and more (
    <Link href="/devices" className={link}>supported devices</Link>)
  </>,
  `${T.connections} simultaneous connections on every plan`,
];

const streamFeatures = [
  {
    icon: MonitorSmartphone,
    title: "Play anywhere, anytime",
    desc: "Firestick, Android TV, smart TVs, Apple TV, MAG, phones and computers: enter your login in a compatible IPTV player and start watching.",
  },
  {
    icon: Gauge,
    title: "Smooth streaming",
    desc: "A stable 25 Mbps connection handles one HD stream and 50 Mbps handles 4K comfortably. Ethernet is steadier than Wi-Fi.",
  },
  {
    icon: Sparkles,
    title: "High quality video",
    desc: "HD, Full HD and 4K where available, depending on the source stream and your connection.",
  },
  {
    icon: ShieldCheck,
    title: "No auto-renewal",
    desc: "Every plan is paid once upfront. Nothing renews and nothing is charged again unless you choose to buy another term.",
  },
  {
    icon: Receipt,
    title: "Transparent pricing",
    desc: `One flat price per plan, ${FACT_TEXT.fromPrice} to $88.23, shown here before you order.`,
  },
  {
    icon: HeadphonesIcon,
    title: "Real support",
    desc: "Help with setup and orders on WhatsApp and email, before and after you buy.",
  },
] as const;

// Streaming figures are US list prices checked 2026-10-21 (sources in costSources); cable figures are TryIPTV estimates.
// Update the rows, the annual-gap sentence and costSources together.
const costComparisonRows = [
  { option: "TryIPTV, 12 months", perMonth: "$7.35", perYear: "$88.23", autoRenews: "No", payingFor: "25,000+ channels, 120,000+ VOD, 2 connections", isTryIptv: true },
  { option: "TryIPTV, 1 month", perMonth: "$15.82", perYear: "$189.84 if bought monthly", autoRenews: "No", payingFor: "Same service, shorter term", isTryIptv: true },
  { option: "Cable TV, advertised rate (estimate)", perMonth: "$100–$120", perYear: "$1,200–$1,440", autoRenews: "Usually, at promo pricing", payingFor: "~140 channels, locals, box, DVR" },
  { option: "Cable TV, bill with fees (estimate)", perMonth: "$130–$170", perYear: "$1,560–$2,040", autoRenews: "Yes", payingFor: "Above, plus broadcast fee, RSN surcharge, extra boxes" },
  { option: "Streaming stack, 3 ad-free apps", perMonth: "$73.47", perYear: "$881.64", autoRenews: "Yes, each service separately", payingFor: "Netflix Standard $19.99, Disney+ Premium $21.49, ESPN Unlimited $31.99" },
] as const;

const costSources = [
  { label: "Netflix Standard, $19.99/month", source: "Netflix plans and pricing", href: "https://help.netflix.com/en/node/24926" },
  { label: "Disney+ Premium, $21.49/month", source: "Disney+ plans", href: "https://www.disneyplus.com/welcome/plans" },
  { label: "ESPN Unlimited, $31.99/month from September 17, 2026", source: "NewscastStudio, ESPN price announcement", href: "https://www.newscaststudio.com/2026/08/24/espn-dtc-streaming-price-hike-826/" },
  { label: "Cable fees: broadcast TV fee $4–$11, box rental $7–$13 a month, about $37 a month in TV fees on average", source: "Consumer Reports, 2019", href: "https://www.consumerreports.org/fees-billing/cable-company-fees-add-to-tv-bill" },
] as const;

const costCaveats = [
  "IPTV isn't cable. Channel numbering is different, local network feeds vary by market, and regional sports networks aren't guaranteed. Test yours during the trial before cancelling anything.",
  "The cable figure is a range, not a quote. Advertised cable pricing excludes the fees that make up most of the gap.",
  "Streaming prices move every year. Our plan prices don't renew, so they don't move until you choose to buy again.",
] as const;

// Per week = monthly × 12 / 52; per day = upfront price / days in the term (30, 90, 180, 365).
const planMathRows = [
  { plan: "1 Month", once: "$15.82", perMonth: "$15.82", perWeek: "$3.65", perDay: "$0.53", vsMonthly: "-" },
  { plan: "3 Months", once: "$38.30", perMonth: "$12.77", perWeek: "$2.95", perDay: "$0.43", vsMonthly: "save $9.16" },
  { plan: "6 Months", once: "$59.15", perMonth: "$9.86", perWeek: "$2.28", perDay: "$0.33", vsMonthly: "save $35.77" },
  { plan: "12 Months", once: "$88.23", perMonth: "$7.35", perWeek: "$1.70", perDay: "$0.24", vsMonthly: "save $101.61" },
] as const;

const planFits = [
  {
    title: "1 Month - $15.82: after the trial, before a commitment",
    body: "Buy this when you've used the trial and want a paid month before deciding anything longer. It's also the right plan for a single event, a short visit, or a household testing whether IPTV replaces cable at all. You're paying $0.53 a day for the privilege of walking away at day 30.",
  },
  {
    title: "3 Months - $38.30: one season, one semester",
    body: "The 3-month plan covers a full sports season, a college semester, a work contract, or a summer abroad. You cut the monthly cost to $12.77 and keep the exit close: $9.16 cheaper than three monthly purchases.",
  },
  {
    title: "6 Months - $59.15: nightly viewers who dislike paying a year upfront",
    body: "This is the plan for a household that watches most evenings. It gets the $9.86/month rate without locking a whole year of cash into something it just discovered. $59.15 is the point where the savings get real ($35.77 against monthly) while the risk stays small.",
  },
  {
    title: "12 Months - $88.23: the long game, if the house is happy",
    body: "An IPTV subscription for 12 months at $88.23 drops you to $7.35 a month and $0.24 a day, with two connections included. It fits a household that's already run the trial, checked peak-hour sports, and knows the channels it needs are there.",
  },
] as const;

const cheapestPitfalls = [
  "It fails during a knockout match, when everyone else is streaming too.",
  "Support is a messaging account that stops replying after activation.",
  "It includes one connection, so the second TV is dark.",
  "The renewal price is higher than the introductory one, if there's a renewal at all.",
  "There's no trial, so the cheap month was the test, and it cost a full month.",
] as const;

const lifetimePoints = [
  { lead: "$0.24 a day.", rest: "A 12-month plan already reaches the per-day floor where lifetime pricing pretends to live." },
  { lead: "You re-decide once a year, not never.", rest: "If the service degrades, you stop paying. A lifetime buyer has no such lever." },
  { lead: "No auto-renewal on either side.", rest: "Nothing renews, nothing is charged, nothing needs cancelling." },
  { lead: "The honest test:", rest: "divide a lifetime price by our 12-month rate. If it equals two or three years of fixed terms, you're paying in advance for years you probably won't use." },
] as const;

const prose = "text-base sm:text-[15px] leading-7 text-muted-foreground";
const th = "px-5 py-3 font-semibold";
const td = "px-5 py-3.5";

export default async function IPTVSubscription() {
  const { breadcrumbSchema, pricingPageFaqs } = await getPricingPageData();
  const pricingFaqSchema = generateFAQPageSchema(
    pricingPageFaqs.map(({ question, answer }) => ({ question, answer }))
  );
  const pricingItemListSchema = {
    '@type': 'ItemList' as const,
    'name': 'TryIPTV IPTV Subscription Plans',
    'numberOfItems': plans.length,
    'itemListElement': plans.map((plan, index) => ({
      '@type': 'ListItem' as const,
      'position': index + 1,
      'item': {
        '@type': 'Product' as const,
        'name': `TryIPTV ${plan.name} IPTV Subscription`,
        'description': `TryIPTV ${plan.name} IPTV subscription: ${T.channels} live channels, ${T.vod} movies and shows, ${T.connections} simultaneous connections, no auto-renewal.`,
        'brand': { '@id': `${SITE_URL}/#organization` },
        'offers': {
          '@type': 'Offer' as const,
          'price': plan.price.toFixed(2),
          'priceCurrency': 'USD',
          'availability': 'https://schema.org/InStock',
          'url': `${SITE_URL}/pricing`,
          'seller': { '@id': `${SITE_URL}/#organization` },
        },
      },
    })),
  };

  return (
    <>
      <PageSchema
        path="/pricing"
        name="IPTV Subscription Plans & Pricing 2026 | TryIPTV"
        nodes={[breadcrumbSchema, pricingFaqSchema, pricingItemListSchema as any]}
        keep={["FAQPage"]}
      />

      {/* Hero + plans */}
      <Section className="relative overflow-hidden border-b border-white/[0.07] pt-6 pb-6 sm:pt-12 sm:pb-14">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
        <Container className="relative">
          <Breadcrumb items={[{ label: "Pricing" }]} align="center" />
          <SectionHeader
            as="h1"
            className="max-sm:mb-0"
            eyebrow="Most Popular IPTV Subscription Plans"
            title={`Choose Your IPTV Plan, From ${FACT_TEXT.lowestMonthly}/Month`}
            subtitle={`${FACT_TEXT.lowestMonthly} a month on the 12-month plan ($${T.plans[3].price.toFixed(2)} paid once), or ${FACT_TEXT.fromPrice} for 1 month. Every plan has ${T.connections} simultaneous connections and no automatic renewal.`}
          />
          <div className="mt-5 flex flex-wrap justify-center gap-2 text-xs font-semibold sm:mt-6 sm:text-sm">
            {/* Phones show the first 3 facts so the plan cards start near the top of the screen. */}
            {quickFacts.map((fact, i) => (
              <div
                key={fact}
                className={`inline-flex items-center gap-1.5 rounded-full border border-white/[0.09] bg-card px-3 py-1 text-muted-foreground ${i >= 3 ? "max-sm:hidden" : ""}`}
              >
                <Check className="h-3.5 w-3.5 text-primary" /> {fact}
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="pricing-plans" className="scroll-mt-2 bg-[#050706] pt-6 pb-10 sm:py-14">
        <Container className="flex flex-col">
          {/* Answer-first block for "how much does an IPTV subscription cost" queries; keep it 40-60 words.
              On phones it follows the cards so the plans come first; it stays in the HTML in both cases. */}
          <div className="mx-auto mb-8 max-w-3xl text-center max-sm:order-2 max-sm:mt-8 max-sm:mb-0">
            <h2 className="font-headline text-xl font-bold text-foreground sm:text-2xl">How much does an IPTV subscription cost?</h2>
            <p className="mt-2 text-base leading-7 text-muted-foreground">
              TryIPTV plans cost {FACT_TEXT.priceList}, which is{" "}
              {T.plans.map((p) => formatUsd(p.monthlyEquivalent)).join(", ").replace(/, ([^,]*)$/, " and $1")} a month. Every plan
              includes {T.channels} live channels, {T.vod} movies and shows and {T.connections} simultaneous connections, with no
              automatic renewal.
            </p>
          </div>
          <div className="grid grid-cols-1 items-stretch gap-5 max-sm:order-1 sm:grid-cols-2 lg:gap-6 xl:grid-cols-4">
            {plans.map((plan, index) => {
              const savingsText = planSavingsExact[plan.id];
              const isLowestMonthly = plan.id === "12-months";

              return (
                <article
                  key={plan.id}
                  className={`relative flex h-full flex-col overflow-hidden rounded-[18px] border bg-[#07080a] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] sm:p-7 ${
                    isLowestMonthly
                      ? "order-first border-primary/40 bg-[linear-gradient(180deg,rgba(0,240,120,0.05),rgba(7,8,10,0)_42%),#07080a] sm:order-none"
                      : "border-white/[0.08]"
                  }`}
                >
                  <div className="flex-1">
                    {/* The badge takes the plan-number slot so it can't overlap it or push the heading down. */}
                    {isLowestMonthly ? (
                      <p className="w-fit whitespace-nowrap rounded-md border border-primary/30 bg-primary/10 px-2 font-mono text-[11px] font-bold uppercase leading-[18px] tracking-wider text-primary">
                        Best Value
                      </p>
                    ) : (
                      <p className="text-[11px] font-mono font-semibold uppercase tracking-[0.08em] text-muted-foreground/80">
                        {String(index + 1).padStart(2, "0")} / Plan
                      </p>
                    )}
                    <h3 className="pt-2 font-headline text-xl font-bold tracking-tight text-foreground">
                      {plan.name}
                    </h3>

                    <div className="pt-4">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-headline text-[40px] font-bold leading-none tracking-tight text-foreground sm:text-[44px]">
                          {formatUsd(plan.price)}
                        </span>
                        <span className="text-xs font-medium text-muted-foreground">one-time</span>
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground">
                        <span className="font-medium text-foreground/90">
                          {formatUsd(plan.price_monthly)}/month equivalent
                        </span>
                      </p>
                      {savingsText && (
                        <p className="mt-2 inline-block rounded bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                          {savingsText}
                        </p>
                      )}
                      <p className="mt-3 min-h-10 text-base sm:text-xs leading-5 text-muted-foreground">
                        {planDescriptions[plan.id]}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6">
                    <Button
                      asChild
                      className="h-12 min-h-[48px] w-full rounded-xl text-[15px] font-semibold"
                      variant={isLowestMonthly ? "default" : "outline"}
                    >
                      <a href={plan.checkoutUrl} target="_blank" rel="noopener noreferrer">
                        Choose {plan.name}
                        <span className="sr-only"> plan (opens WhatsApp in a new tab)</span>
                      </a>
                    </Button>
                  </div>

                  <ul className="mt-6 space-y-2.5 border-t border-white/[0.07] pt-6 text-base sm:text-sm text-muted-foreground">
                    {planCardFeatures.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>

          <p className="mx-auto mt-6 max-w-[60ch] text-center text-base sm:text-sm leading-6 text-muted-foreground max-sm:order-1">
            Choosing a plan opens WhatsApp, where support sends payment instructions. Credentials typically arrive within <span className="whitespace-nowrap">{T.activationTime}</span> {T.activationHours.split(";")[0]}, after payment confirmation.
            {COMPANY.support.hours ? ` Support answers ${COMPANY.support.hours}.` : ""}
            {COMPANY.support.outOfHours ? ` ${COMPANY.support.outOfHours}` : ""} No WhatsApp? Email{" "}
            <span
              dangerouslySetInnerHTML={{
                __html: `<!--email_off--><a href="mailto:${COMPANY.support.email}?subject=Plan%20order" class="${link}">${COMPANY.support.email}</a><!--/email_off-->`,
              }}
            />{" "}
            with the plan you want and support replies with payment instructions. See{" "}
            <Link href="/how-it-works" className={link}>how buying and activation work</Link>.
          </p>
          <p className="mx-auto mt-2 max-w-[60ch] text-center text-base sm:text-sm leading-6 text-muted-foreground max-sm:order-1">
            Catalog counts are approximate and can change as content availability changes. You can check the available selection during the{" "}
            <Link href="/iptv-free-trial" className={link}>free trial</Link>.
          </p>
          <p className="mx-auto mt-2 max-w-[60ch] text-center text-base sm:text-sm leading-6 text-muted-foreground max-sm:order-1">
            TryIPTV is run by {COMPANY.legalName} ({COMPANY.location}, operating since {COMPANY.foundingYear}). TryIPTV sells its own
            subscriptions and issues the logins itself. <Link href="/about" className={link}>About TryIPTV</Link>.
          </p>
        </Container>
      </Section>

      {/* How it works */}
      <Section variant="alt" className="border-t border-white/[0.06] bg-[#070a08] py-10 sm:py-14">
        <Container>
          <SectionHeader
            eyebrow="Order Process"
            title="How Does TryIPTV Work?"
            subtitle={`Order a plan on WhatsApp, pay once, and start watching. Most customers receive their login within ${T.activationTime} of payment confirmation, then enter it in a compatible IPTV player.`}
          />

          <ol className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {orderSteps.map((s) => (
              <li key={s.step} className="rounded-xl border border-white/[0.08] bg-card p-5">
                <span className="font-mono text-sm font-bold text-primary">{s.step}</span>
                <h3 className="mt-2 font-headline text-lg font-extrabold text-foreground">{s.title}</h3>
                <p className="mt-2 text-base sm:text-sm leading-6 text-muted-foreground">{s.desc}</p>
              </li>
            ))}
          </ol>

          <p className="mt-6 text-center text-base sm:text-sm text-muted-foreground">
            Need installation help? Read the{" "}
            <Link href="/setup" className={link}>
              Universal IPTV Setup Guide
            </Link>
            . Wondering how many devices can watch at once? See{" "}
            <Link href="/guides/iptv-connections" className={link}>
              how IPTV connections work
            </Link>
            .
          </p>
        </Container>
      </Section>

      {/* Stream smarter */}
      <Section className="border-t border-white/[0.06] py-10 sm:py-14">
        <Container>
          <SectionHeader
            eyebrow="Plans Compared"
            title="What do all TryIPTV plans include?"
            subtitle={`TryIPTV plans start at ${FACT_TEXT.fromPrice} for one month and drop to ${FACT_TEXT.lowestMonthly} a month on the annual term. Every plan includes ${T.channels} live channels, ${T.vod} movies and series, the TV guide, ${T.connections} simultaneous connections and support on WhatsApp and email.`}
          />

          <ul className="mx-auto mb-10 flex max-w-4xl flex-wrap justify-center gap-2 text-sm font-semibold">
            {highlights.map((h) => (
              <li key={h} className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.09] bg-card px-3 py-1 text-muted-foreground">
                <Check className="h-3.5 w-3.5 text-primary" aria-hidden /> {h}
              </li>
            ))}
          </ul>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            <div className="rounded-xl border border-white/[0.08] bg-card p-6">
              <h3 className="font-headline text-lg font-extrabold text-foreground">What you get</h3>
              <ul className="mt-4 space-y-2.5 text-base sm:text-sm leading-6 text-muted-foreground">
                {whatYouGet.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-primary/25 bg-[#0b100d] p-6">
              <h3 className="font-headline text-lg font-extrabold text-foreground">Risk-free to try</h3>
              <p className="mt-3 text-base sm:text-sm leading-6 text-muted-foreground">
                Test TryIPTV first with a free {FACT_TEXT.trialHours}-hour trial before you buy a plan: $0, no credit card, no auto-renew.
                After you buy, a refund is only possible if we can&apos;t provide a working subscription.
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <Button asChild>
                  <Link href="/iptv-free-trial">
                    <CirclePlay className="mr-2 h-4 w-4" aria-hidden /> Start Free Trial
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/refund-policy">See refund policy</Link>
                </Button>
              </div>
            </div>

            <div className="rounded-xl border border-white/[0.08] bg-card p-6">
              <h3 className="font-headline text-lg font-extrabold text-foreground">Paying by cryptocurrency?</h3>
              <p className="mt-3 text-base sm:text-sm leading-6 text-muted-foreground">
                Follow the payment instructions support sends on WhatsApp exactly, and use the network and wallet address given for your
                order: a payment sent on the wrong network can be delayed or lost. If anything is unclear, ask in the same chat before you
                pay.
              </p>
            </div>
          </div>

          {/* Plan Comparison Table */}
          <div className="mt-10 rounded-xl border border-white/[0.08] bg-card">
            <div className="border-b border-white/[0.07] px-5 py-4 sm:px-6">
              <h2 className="font-headline text-lg font-extrabold text-foreground">Plan Duration &amp; Price Breakdown</h2>
              <p className="mt-1 text-base sm:text-sm leading-6 text-muted-foreground">
                Every plan includes the same 2 simultaneous connections and features. Only the term, upfront total, and monthly equivalent change.
              </p>
            </div>
            <div tabIndex={0} role="region" aria-label="Plan prices table" className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <caption className="sr-only">TryIPTV plan prices, durations, and best use cases</caption>
                <thead className="border-b border-white/[0.07] text-xs uppercase tracking-wide text-muted-foreground">
                  <tr>
                    <th className="px-5 py-3 font-semibold sm:px-6">Plan</th>
                    <th className="px-5 py-3 font-semibold">Total Price</th>
                    <th className="px-5 py-3 font-semibold">Monthly Equivalent</th>
                    <th className="px-5 py-3 font-semibold">Savings vs 1-Month</th>
                    <th className="px-5 py-3 font-semibold">Connections</th>
                    <th className="px-5 py-3 font-semibold">Best For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06] text-muted-foreground">
                  {plans.map((plan) => (
                    <tr key={`comparison-${plan.id}`} className="transition-colors hover:bg-white/[0.02]">
                      <th scope="row" className="whitespace-nowrap px-5 py-3.5 font-semibold text-foreground sm:px-6">
                        {plan.name}
                      </th>
                      <td className="whitespace-nowrap px-5 py-3.5 text-foreground font-medium">
                        {formatUsd(plan.price)}
                      </td>
                      <td className="whitespace-nowrap px-5 py-3.5">
                        {formatUsd(plan.price_monthly)}/month
                      </td>
                      <td className="whitespace-nowrap px-5 py-3.5 text-primary font-medium">
                        {planSavingsExact[plan.id]?.split(" vs ")[0] ?? "—"}
                      </td>
                      <td className="whitespace-nowrap px-5 py-3.5">2 simultaneous</td>
                      <td className="px-5 py-3.5">{planBestFor[plan.id]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="border-t border-white/[0.07] px-5 py-4 text-base sm:text-xs leading-5 text-muted-foreground sm:px-6">
              <strong className="text-foreground">What does 2 connections mean?</strong> Up to two devices can stream at the same time in your household. You can configure your credentials on multiple devices, but playback is limited to two simultaneous streams. New to IPTV? Read <Link href="/guides/what-is-iptv" className={link}>what IPTV is</Link> and{" "}
              <Link href="/guides/how-does-iptv-work" className={link}>how IPTV delivery works</Link>, or{" "}
              <Link href="/help/iptv-buffering" className={link}>how to fix IPTV buffering</Link>.
            </p>
          </div>
        </Container>
      </Section>

      {/* Cost vs cable and streaming */}
      <Section variant="alt" className="border-t border-white/[0.06] bg-[#070a08] py-10 sm:py-14">
        <Container>
          <SectionHeader
            title="Is IPTV cheaper than cable TV or a streaming stack?"
            subtitle="Streaming figures are published US list prices for ad-free tiers, checked October 21, 2026; sources are under the table. Cable figures are our estimates: an advertised rate, and a typical bill once the fees are added."
          />

          <div className="rounded-xl border border-white/[0.08] bg-card">
            <div tabIndex={0} role="region" aria-label="IPTV, cable and streaming cost comparison table" className="overflow-x-auto">
              <table className="w-full min-w-[920px] text-left text-sm">
                <caption className="sr-only">Monthly and yearly cost of TryIPTV compared with cable TV and streaming services</caption>
                <thead className="border-b border-white/[0.07] text-xs uppercase tracking-wide text-muted-foreground">
                  <tr>
                    <th className={`${th} sm:px-6`}>Option</th>
                    <th className={th}>Per month</th>
                    <th className={th}>Per year</th>
                    <th className={th}>Auto-renews?</th>
                    <th className={th}>What you&apos;re paying for</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06] text-muted-foreground">
                  {costComparisonRows.map((row) => (
                    // Third-party rows are sourced competitor/cable figures, not TryIPTV prices: check:facts skips them.
                    <tr key={row.option} className="transition-colors hover:bg-white/[0.02]" data-facts-ignore={"isTryIptv" in row ? undefined : ""}>
                      <th
                        scope="row"
                        className={`whitespace-nowrap ${td} font-semibold sm:px-6 ${"isTryIptv" in row ? "text-primary" : "text-foreground"}`}
                      >
                        {row.option}
                      </th>
                      <td className={`whitespace-nowrap ${td} font-medium text-foreground`}>{row.perMonth}</td>
                      <td className={`whitespace-nowrap ${td}`}>{row.perYear}</td>
                      <td className={`${td} min-w-[150px]`}>{row.autoRenews}</td>
                      <td className={`${td} min-w-[280px]`}>{row.payingFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mx-auto mt-8 max-w-3xl">
            <p className={prose} data-facts-ignore="">
              Run the annual line: the 12-month plan at $88.23 sits an estimated $1,472–$1,952 below a cable bill with fees and $793.41 below the three-app stack.
            </p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">Sources (US list prices, checked October 21, 2026):</p>
            <ul className="mt-1.5 list-disc space-y-1 pl-5 text-sm leading-6 text-muted-foreground" data-facts-ignore="">
              {costSources.map((s) => (
                <li key={s.href}>
                  {s.label}:{" "}
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className={link}>
                    {s.source}
                  </a>
                </li>
              ))}
            </ul>
            <p className={`mt-3 ${prose}`}>
              For setup, reliability and channel differences beyond price, see the{" "}
              <Link href="/guides/iptv-vs-cable" className={link}>full IPTV vs cable TV comparison</Link>.
            </p>
            <h3 className="mt-6 font-headline text-lg font-extrabold text-foreground">Honest caveats</h3>
            <ul className={`mt-3 space-y-2.5 ${prose}`}>
              {costCaveats.map((caveat) => (
                <li key={caveat} className="flex items-start gap-2.5">
                  <Check className="mt-1.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                  <span>{caveat}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Plan math */}
      <Section className="border-t border-white/[0.06] py-10 sm:py-14">
        <Container>
          <SectionHeader
            title="How much does an IPTV subscription cost per week and per day?"
            subtitle="The monthly equivalent is the useful number, but it hides how small the daily cost gets. Here's the arithmetic, nothing rounded up."
          />

          <div className="rounded-xl border border-white/[0.08] bg-card">
            <div tabIndex={0} role="region" aria-label="Plan cost per month, week and day table" className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <caption className="sr-only">TryIPTV plan cost per month, per week and per day</caption>
                <thead className="border-b border-white/[0.07] text-xs uppercase tracking-wide text-muted-foreground">
                  <tr>
                    <th className={`${th} sm:px-6`}>Plan</th>
                    <th className={th}>You pay once</th>
                    <th className={th}>Per month</th>
                    <th className={th}>Per week</th>
                    <th className={th}>Per day</th>
                    <th className={th}>vs. buying monthly</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06] text-muted-foreground">
                  {planMathRows.map((row) => (
                    <tr key={row.plan} className="transition-colors hover:bg-white/[0.02]">
                      <th scope="row" className={`whitespace-nowrap ${td} font-semibold text-foreground sm:px-6`}>
                        {row.plan}
                      </th>
                      <td className={`whitespace-nowrap ${td} font-medium text-foreground`}>{row.once}</td>
                      <td className={`whitespace-nowrap ${td}`}>{row.perMonth}</td>
                      <td className={`whitespace-nowrap ${td}`}>{row.perWeek}</td>
                      <td className={`whitespace-nowrap ${td}`}>{row.perDay}</td>
                      <td className={`whitespace-nowrap ${td} font-medium text-primary`}>{row.vsMonthly}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mx-auto mt-8 max-w-3xl space-y-4">
            <p className={prose}>
              Two connections on the 12-month plan works out to roughly 12 cents a day per screen when both are streaming at once.
            </p>
            <p className={prose}>
              Paying $88.23 upfront only makes sense after you&apos;ve confirmed the service works in your house. That&apos;s what the trial
              is for. If you haven&apos;t tested it, buy one month, not twelve.
            </p>
          </div>
        </Container>
      </Section>

      {/* Which plan fits whom */}
      <Section variant="alt" className="border-t border-white/[0.06] bg-[#070a08] py-10 sm:py-14">
        <Container>
          <SectionHeader title="Which IPTV subscription plan should I choose?" />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {planFits.map((fit) => (
              <div key={fit.title} className="rounded-xl border border-white/[0.08] bg-card p-6">
                <h3 className="font-headline text-lg font-extrabold text-foreground">{fit.title}</h3>
                <p className={`mt-3 ${prose}`}>{fit.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Fair price in 2026 */}
      <Section className="border-t border-white/[0.06] py-10 sm:py-14">
        <Container>
          <SectionHeader title="What is a fair IPTV subscription price in 2026?" />

          <div className="mx-auto max-w-3xl space-y-4">
            <p className={prose}>
              Search for IPTV subscription pricing and you get a wall of comparison pages quoting a plan, a channel count and a discount,
              usually in that order. Ignore the ads and look at where the market actually sits.
            </p>
            <p className={prose} data-facts-ignore="">
              Our estimate, not a market survey: in the US in 2026, monthly IPTV plans commonly cost about $10–$25 and annual plans
              about $60–$120. Prices far below that often mean a single connection or a resold trial, so compare connections, refund
              terms and support before you pay.
            </p>
            <p className={prose}>
              At $15.82 for a month and $88.23 for a year, TryIPTV sits mid-band on both. That&apos;s deliberate. We&apos;re not the cheapest
              IPTV subscription you&apos;ll find, and the reason is boring: live sports at peak hours, the panel that issues your
              credentials, payment processing and a human answering WhatsApp all cost money every month, whether you watch or not.
            </p>

            <h3 className="pt-4 font-headline text-lg font-extrabold text-foreground">
              Why the cheapest IPTV subscription is rarely the cheapest to own
            </h3>
            <ul className={`space-y-2.5 ${prose}`}>
              {cheapestPitfalls.map((pitfall) => (
                <li key={pitfall} className="flex items-start gap-2.5">
                  <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                  <span>{pitfall}</span>
                </li>
              ))}
            </ul>
            <p className={`pt-2 ${prose}`}>
              Cheap is fine as a category. Cheap with no trial, no written refund rule and no way to reach a person is a lottery ticket.
            </p>
          </div>
        </Container>
      </Section>

      {/* Lifetime subscriptions */}
      <Section variant="alt" className="border-t border-white/[0.06] bg-[#070a08] py-10 sm:py-14">
        <Container>
          <SectionHeader title="Is a lifetime IPTV subscription worth it?" />

          <div className="mx-auto max-w-3xl space-y-4">
            <p className={prose}>
              A lifetime IPTV subscription is a promise nobody can price honestly. Live TV delivery means continuous bandwidth, a reseller
              panel, payment processing and support: costs that arrive every month, forever. A one-time lifetime fee only works for the
              seller if the average buyer leaves early, the service changes hands, or the servers disappear.
            </p>
            <p className={prose}>
              We don&apos;t sell one. The longest term we sell is 12 months at $88.23, and the practical difference is smaller than it looks:
            </p>
            <ul className={`space-y-2.5 ${prose}`}>
              {lifetimePoints.map((point) => (
                <li key={point.lead} className="flex items-start gap-2.5">
                  <Check className="mt-1.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                  <span>
                    <strong className="text-foreground">{point.lead}</strong> {point.rest}
                  </span>
                </li>
              ))}
            </ul>
            <p className={`pt-2 ${prose}`}>
              If your real question is can I stop thinking about this for a while, the 12-month term is the answer. It&apos;s paid once, it
              expires, and it costs $88.23.
            </p>
          </div>
        </Container>
      </Section>

      {/* Pricing FAQ */}
      <Section id="faq" className="scroll-mt-2 border-t border-white/[0.06] bg-[#070a08] py-10 sm:py-14">
        <Container>
          <SectionHeader
            eyebrow="Pricing &amp; Billing Questions"
            title="Frequently Asked Questions"
            subtitle="Straight answers about plan prices, renewals, connections, delivery times and refunds."
          />

          <div className="mx-auto max-w-[880px] overflow-hidden rounded-[18px] border border-white/[0.08] bg-[#07080a]">
            {pricingPageFaqs.map((faq, index) => (
              <details
                key={index}
                className="group border-b border-white/[0.07] px-6 last:border-b-0 sm:px-8"
              >
                <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-[16px] font-semibold leading-snug text-foreground/90 [&::-webkit-details-marker]:hidden">
                  <h3 className="text-[16px] font-semibold leading-snug">{faq.question}</h3>
                  <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <div className="pb-5 pr-4 text-base sm:text-[15px] leading-relaxed text-muted-foreground sm:pr-8">
                  <p>
                    {faq.answer}
                    {faq.link && (
                      <>
                        {" "}
                        <Link href={faq.link.href} className="font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
                          {faq.link.label}
                        </Link>
                        .
                      </>
                    )}
                  </p>
                </div>
              </details>
            ))}
          </div>

          <p className="mt-8 text-center text-base sm:text-sm text-muted-foreground">
            Questions?{" "}
            <Link href="/contact-us" className={link}>
              Contact us
            </Link>
            , or see{" "}
            <Link href="/faq" className={link}>
              all IPTV FAQs
            </Link>{" "}
            and the{" "}
            <Link href="/terms-conditions" className={link}>
              Terms &amp; Conditions
            </Link>
            .
          </p>
        </Container>
      </Section>

      {/* Everything you need */}
      <Section className="border-t border-white/[0.06] py-10 sm:py-14">
        <Container>
          <SectionHeader
            eyebrow="Why TryIPTV"
            title="Everything You Need to Stream"
            subtitle="Built for everyday viewing: simple setup on the devices you already own, clear picture where your connection allows it, and a flat one-time price."
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {streamFeatures.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-xl border border-white/[0.08] bg-card p-5">
                <Icon className="h-5 w-5 text-primary" aria-hidden />
                <h3 className="mt-3 font-headline text-base font-extrabold text-foreground">{title}</h3>
                <p className="mt-1 text-base sm:text-sm leading-6 text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="#pricing-plans">
                Compare Plans <ArrowRight aria-hidden />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/iptv-free-trial">
                <CirclePlay aria-hidden /> Start Free Trial
              </Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
