import type { Metadata } from "next";
import Link from "next/link";
import type React from "react";
import { Check, Clock, MessageCircle, MonitorPlay, Wifi } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { PageSchema } from "@/components/shared/Schema";
import { generateBreadcrumbSchema } from "@/lib/schema";
import { SITE_URL, PRODUCT_TRUTHS, FACT_TEXT, generateMetadata as generatePageMetadata } from "@/lib/site-config";
import { COMPANY } from "@/lib/site-data/company";
import { getLastModified } from "@/lib/site-routes";

/**
 * How it works — the buying path: message support, optional trial, pay, receive the login, renew.
 * Player installation steps live on /setup; this page links there instead of repeating them.
 * Canonical: https://www.tryiptv.com/how-it-works
 * Source of truth: src/lib/site-routes.ts
 */

const whatsAppUrl =
  "https://wa.me/212694833293?text=Hello%20TryIPTV%2C%20I%20would%20like%20help%20choosing%20a%20plan.";

const usd = (n: number) => `$${n.toFixed(2)}`;
const link = "font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary";
const T = PRODUCT_TRUTHS;
const pay = COMPANY.paymentMethods ?? "the methods support lists when you order";
const months = T.plans.map((p) => parseInt(p.duration, 10));
/** "1, 3, 6 or 12" */
const durations = `${months.slice(0, -1).join(", ")} or ${months[months.length - 1]}`;

const description = `How to buy IPTV from TryIPTV: message us on WhatsApp, try the ${FACT_TEXT.trialHours}-hour free trial, pay once and get your login in ${T.activationTime}. Nothing auto-renews.`;

export function generateMetadata(): Metadata {
  const title = "How to Buy IPTV: TryIPTV Step by Step";

  return {
    ...generatePageMetadata({ title, description, canonical: "/how-it-works" }),
    title: { absolute: `${title} | TryIPTV` },
  };
}

const overview = [
  {
    step: "01",
    title: "Find your fit",
    text: `Compare the ${durations}-month plans. A standard plan includes ${T.connections} simultaneous connections.`,
  },
  {
    step: "02",
    title: "Talk to a real person",
    text: "Message support on WhatsApp. Check your device, request the free trial and confirm the plan terms before you pay.",
  },
  {
    step: "03",
    title: "Set up your screen",
    text: "Enter the login support sends into a compatible IPTV player on your device. Keep your login private.",
  },
] as const;

const requirements = [
  {
    icon: Wifi,
    title: "A stable connection",
    text: "Around 25 Mbps for one HD stream and 50 Mbps for 4K where the source allows it. Test the speed on the device you will actually watch on.",
    href: "/guides/iptv-internet-speed",
    cta: "Check how much speed you need",
  },
  {
    icon: MonitorPlay,
    title: "A compatible player",
    text: "A third-party IPTV player app for your device. Some players charge for a premium version, so check the price in the app store before you buy it.",
    href: "/players",
    cta: "Compare IPTV players",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    text: "Support runs on WhatsApp. It is how you request the trial, confirm a plan, get payment instructions and get help with activation.",
    href: "/contact-us",
    cta: "Other ways to contact support",
  },
  {
    icon: Clock,
    title: "A few minutes",
    text: "Setup is usually quick once you have your login. Support can walk you through the player you choose.",
    href: "/setup",
    cta: "Read the setup guide",
  },
] as const;

const journey = [
  {
    label: "Step 1 · Reach out",
    title: "Say hello on WhatsApp",
    text: "Message support with the device and player you plan to use. Ask anything you want answered first; messaging support does not commit you to a plan.",
  },
  {
    label: "Step 2 · Test the service",
    title: `Request the ${FACT_TEXT.trialHours}-hour free trial`,
    text: `The trial is $0, needs no credit card and includes ${T.connections} simultaneous connections, like a paid plan. Test the channels and on-demand titles you actually watch, on your own screen and network. One trial per household.`,
  },
  {
    label: "Step 3 · Choose and pay",
    title: "Pick a plan and pay support",
    text: `Choose a ${durations}-month plan, paid once (prices below). Support sends payment instructions on WhatsApp. You can pay by ${pay}.`,
  },
  {
    label: "Step 4 · Activate",
    title: "Receive your login and set up",
    text: `After payment is confirmed, support sends your login on WhatsApp, usually within ${T.activationTime}: an Xtream Codes login (server URL, username, password) or an M3U playlist link. Enter it in your player and the channels load.`,
  },
  {
    label: "Step 5 · Ongoing",
    title: "Watch, then renew when you choose",
    text: `Watch live TV and on-demand titles for the whole term. Nothing renews automatically. ${T.expiry.summary} ${T.expiry.nextStep}`,
  },
] as const;

const faqs: { question: string; answer: React.ReactNode }[] = [
  {
    question: "How does TryIPTV work?",
    answer: (
      <>
        TryIPTV gives you a login for {T.channels} live channels and {T.vod} movies and shows, which you enter in an IPTV player app on
        your own device. IPTV delivers TV over the internet instead of cable or satellite. Read{" "}
        <Link href="/guides/what-is-iptv" className={link}>
          what IPTV is
        </Link>{" "}
        and{" "}
        <Link href="/guides/how-does-iptv-work" className={link}>
          how IPTV works
        </Link>
        .
      </>
    ),
  },
  {
    question: "Is TryIPTV a good IPTV service for live TV?",
    answer: `It has ${T.channels} live channels, and the ${FACT_TEXT.trialHours}-hour free trial lets you test them on your own screen before you pay. The trial includes HD and 4K where available, PPV events and catch-up TV with the TV guide. Test your must-have channels during a busy evening.`,
  },
  {
    question: "How much do TryIPTV plans cost?",
    answer: (
      <>
        TryIPTV plans cost {FACT_TEXT.priceList}. The 12-month plan is the cheapest per month at {FACT_TEXT.lowestMonthly}. See the{" "}
        <Link href="/pricing" className={link}>
          pricing page
        </Link>
        .
      </>
    ),
  },
  {
    question: "Can I request a trial before choosing a plan?",
    answer: (
      <>
        Yes. The free trial lasts {FACT_TEXT.trialHours} hours, costs $0 and needs no credit card. Request it on WhatsApp. One trial per
        household.{" "}
        <Link href="/iptv-free-trial" className={link}>
          Start the free trial
        </Link>
        .
      </>
    ),
  },
  {
    question: "Which devices can I use with TryIPTV?",
    answer: (
      <>
        Amazon Firestick and Fire TV, Android TV and Google TV, Samsung and LG smart TVs, Apple TV, iPhone and iPad, Windows and Mac
        computers, Chromecast with Google TV and MAG boxes. Roku works through AirPlay or screen mirroring.{" "}
        <Link href="/devices" className={link}>
          Browse the device setup guides
        </Link>
        .
      </>
    ),
  },
  {
    question: "How many screens can stream at the same time?",
    answer: `A standard plan includes ${T.connections} simultaneous connections, so ${T.connections} screens can watch different channels at once. ${T.extraConnections}`,
  },
  {
    question: "Is a player app included in the plan?",
    answer: (
      <>
        No. TryIPTV provides the login; the player is a separate third-party app that you install on your device. Many players are free,
        and some charge for a premium version.{" "}
        <Link href="/players" className={link}>
          Compare IPTV players
        </Link>
        .
      </>
    ),
  },
  {
    question: "Is every TryIPTV stream available in 4K?",
    answer:
      "No. 4K is available where a channel or title is produced in 4K; many streams are HD or Full HD. For 4K you also need a 4K screen, a 4K-capable device and about 50 Mbps of stable internet.",
  },
  {
    question: "How long does it take to get my login after paying?",
    answer: `Your login usually arrives on WhatsApp within ${T.activationTime} after payment is confirmed. Support is open ${COMPANY.support.hours}; a message sent outside those hours is answered when support reopens.`,
  },
  {
    question: "What if my login does not arrive or does not work?",
    answer: (
      <>
        If nothing has arrived {T.activationTime} after payment is confirmed, reply in the same WhatsApp chat. If the login arrives but
        will not connect, check the server URL, username and password for typing errors, then follow the{" "}
        <Link href="/help/iptv-login-not-working" className={link}>
          login troubleshooting guide
        </Link>
        .
      </>
    ),
  },
  {
    question: "Do TryIPTV plans renew automatically?",
    answer: (
      <>
        No. Nothing renews automatically, so you are never charged without asking. {T.expiry.summary} To renew, tap a plan on the{" "}
        <Link href="/pricing" className={link}>
          pricing page
        </Link>{" "}
        to open WhatsApp and say you are renewing. Refunds are given only if TryIPTV cannot provide a working subscription; read the{" "}
        <Link href="/refund-policy" className={link}>
          refund policy
        </Link>
        .
      </>
    ),
  },
  {
    question: "What should I check before using an IPTV service?",
    answer: (
      <>
        Look for clear published prices, a written refund policy and terms, a working way to contact support and a free trial. Read
        TryIPTV&apos;s{" "}
        <Link href="/pricing" className={link}>
          pricing page
        </Link>
        ,{" "}
        <Link href="/refund-policy" className={link}>
          refund policy
        </Link>{" "}
        and{" "}
        <Link href="/terms-conditions" className={link}>
          terms
        </Link>{" "}
        before you pay.
      </>
    ),
  },
  {
    question: "Does TryIPTV work in the USA, the UK and other countries?",
    answer: `TryIPTV serves the ${T.markets}. The subscription ${T.travel}, so it also keeps working when you travel.`,
  },
];

function CtaButtons() {
  return (
    <div className="flex flex-col justify-center gap-3 sm:flex-row">
      <Button asChild size="lg">
        <Link href="/pricing">Find my plan</Link>
      </Button>
      <Button asChild size="lg" variant="outline">
        <a href={whatsAppUrl} target="_blank" rel="noopener noreferrer">
          <SiWhatsapp aria-hidden="true" className="mr-2 h-4 w-4" /> Chat on WhatsApp
          <span className="sr-only"> (opens WhatsApp in a new tab)</span>
        </a>
      </Button>
    </div>
  );
}

export default function HowItWorksPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", item: `${SITE_URL}/` },
    { name: "How It Works", item: `${SITE_URL}/how-it-works` },
  ]);

  return (
    <>
      <PageSchema
        path="/how-it-works"
        name="How to Buy IPTV From TryIPTV"
        description={description}
        dateModified={getLastModified("/how-it-works")}
        nodes={[breadcrumbSchema]}
      />

      {/* Hero */}
      <Section className="relative overflow-hidden border-b border-white/[0.07] pt-12 pb-14 sm:pt-16 sm:pb-20">
        <Container className="relative">
          <div className="mx-auto max-w-4xl text-center">
            <Breadcrumb items={[{ label: "How It Works" }]} align="center" />
            <p className="eyebrow mb-3">How it works</p>
            <h1 className="font-headline text-3xl font-extrabold leading-[1.08] text-foreground sm:text-5xl lg:text-6xl">
              How to Buy IPTV From TryIPTV
            </h1>
            <p className="mx-auto mt-5 max-w-[60ch] text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              To buy IPTV from TryIPTV, pick a plan, message support on WhatsApp, test the {FACT_TEXT.trialHours}-hour free trial if you want one, then set up a
              player with the login support sends after payment. Payment is arranged with support, not on this website.
            </p>
            <p className="mx-auto mt-3 max-w-[60ch] text-base leading-7 text-muted-foreground">
              For the full picture, start on the{" "}
              <Link href="/" className={link}>
                TryIPTV homepage
              </Link>
              .
            </p>
            <div className="mt-7">
              <CtaButtons />
            </div>
          </div>
        </Container>
      </Section>

      {/* Overview */}
      <Section className="border-b border-white/[0.06] bg-[#070a08] py-10 sm:py-14">
        <Container>
          <div className="mx-auto max-w-4xl">
            <SectionHeader
              eyebrow="Less figuring it out, more pressing play"
              title="How Does TryIPTV Work?"
              subtitle={`TryIPTV works in five steps: message support on WhatsApp, test the ${FACT_TEXT.trialHours}-hour free trial if you want one, pay support for a ${durations}-month plan, enter the login support sends in an IPTV player app, and renew only when you choose. The three cards sum it up; the full path is below.`}
            />
            <ol className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {overview.map((s) => (
                <li key={s.step} className="rounded-lg border border-white/[0.09] bg-card p-5">
                  <span className="font-mono text-xs font-bold text-primary">STEP {s.step}</span>
                  <h3 className="mt-2 font-headline text-lg font-extrabold text-foreground">{s.title}</h3>
                  <p className="mt-2 text-base sm:text-sm leading-6 text-muted-foreground">{s.text}</p>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-center text-base sm:text-sm text-muted-foreground">
              <a href={whatsAppUrl} target="_blank" rel="noopener noreferrer" className={link}>
                Get personal setup help on WhatsApp
              </a>
            </p>
          </div>
        </Container>
      </Section>

      {/* Before you start */}
      <Section className="border-b border-white/[0.06] py-10 sm:py-14">
        <Container>
          <div className="mx-auto max-w-4xl">
            <SectionHeader
              eyebrow="Before you start"
              title="What Do You Need Before Pressing Play?"
              subtitle="TryIPTV is a service, not an app you download from us. You need four things, and support can check each one with you."
            />
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {requirements.map(({ icon: Icon, title, text, href, cta }) => (
                <li key={title} className="rounded-lg border border-white/[0.09] bg-card p-5">
                  <Icon className="h-5 w-5 text-primary" aria-hidden />
                  <h3 className="mt-3 font-headline text-lg font-extrabold text-foreground">{title}</h3>
                  <p className="mt-2 text-base sm:text-sm leading-6 text-muted-foreground">{text}</p>
                  <Link href={href} className={`mt-3 inline-block text-sm ${link}`}>
                    {cta}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-center text-base sm:text-sm text-muted-foreground">
              Not sure you have everything?{" "}
              <a href={whatsAppUrl} target="_blank" rel="noopener noreferrer" className={link}>
                Tell support your device
              </a>
              .
            </p>
          </div>
        </Container>
      </Section>

      {/* Your first days */}
      <Section variant="alt" className="border-b border-white/[0.06] bg-[#070a08] py-10 sm:py-14">
        <Container>
          <div className="mx-auto max-w-4xl">
            <SectionHeader
              eyebrow="Your first days"
              title="From First Message to First Stream"
              subtitle="There is no account to create and no payment taken on this website. Every step runs through a real person on WhatsApp."
            />
            <ol className="space-y-4">
              {journey.map((s) => (
                <li key={s.label} className="rounded-lg border border-white/[0.09] bg-card p-5">
                  <span className="font-mono text-xs font-bold text-primary">{s.label}</span>
                  <h3 className="mt-2 font-headline text-lg font-extrabold text-foreground">{s.title}</h3>
                  <p className="mt-2 text-base sm:text-sm leading-6 text-muted-foreground">{s.text}</p>
                </li>
              ))}
            </ol>

            <h3 className="mt-10 mb-4 font-headline text-xl font-extrabold text-foreground">TryIPTV Plan Prices</h3>
            <div className="overflow-hidden rounded-lg border border-white/[0.09] bg-card">
              <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="TryIPTV plan prices table">
                <table className="w-full text-left text-[15px] sm:text-sm">
                  <caption className="sr-only">TryIPTV plan prices, paid once, with the cost per month</caption>
                  <thead className="border-b border-white/[0.09] bg-white/[0.02] text-xs font-extrabold uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th scope="col" className="px-5 py-3 text-primary">Plan</th>
                      <th scope="col" className="px-5 py-3">Price, paid once</th>
                      <th scope="col" className="px-5 py-3">Per month</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.06]">
                    {T.plans.map((p) => (
                      <tr key={p.duration} className="transition-colors hover:bg-white/[0.02]">
                        <th scope="row" className="px-5 py-3.5 font-semibold text-foreground">
                          {p.duration}
                        </th>
                        <td className="px-5 py-3.5 text-muted-foreground">{usd(p.price)}</td>
                        <td className="px-5 py-3.5 text-muted-foreground">{usd(p.monthlyEquivalent)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="mt-3 text-base sm:text-sm leading-6 text-muted-foreground">
              Every standard plan includes {T.connections} simultaneous connections. {T.extraConnections}
            </p>
            <p className="mt-6 rounded-lg border border-white/[0.08] bg-card/60 p-4 text-base sm:text-sm leading-6 text-muted-foreground">
              Activation is not automatic: it depends on confirmed payment and on support hours. Support is open {COMPANY.support.hours} (
              {COMPANY.support.hoursUk}). A message sent outside those hours is answered when support reopens. For the player steps, follow
              the{" "}
              <Link href="/setup" className={link}>
                IPTV setup guide
              </Link>
              .
            </p>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section className="border-b border-white/[0.06] py-10 sm:py-14">
        <Container>
          <div className="mx-auto max-w-4xl">
            <SectionHeader
              eyebrow="Good questions, straight answers"
              title="Questions About Starting a TryIPTV Subscription"
              subtitle="Know what to expect before you choose your IPTV plan."
            />
            <div className="overflow-hidden rounded-lg border border-white/[0.08] bg-[#07080a]">
              {faqs.map((faq) => (
                <details key={faq.question} className="group border-b border-white/[0.07] px-5 last:border-b-0 sm:px-7">
                  <summary className="flex min-h-[60px] cursor-pointer list-none items-center justify-between gap-4 py-4 text-left text-base font-semibold text-foreground [&::-webkit-details-marker]:hidden">
                    <h3 className="text-base font-semibold">{faq.question}</h3>
                    <span aria-hidden="true" className="text-primary transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="pb-5 pr-6 text-base sm:text-sm leading-6 text-muted-foreground">{faq.answer}</p>
                </details>
              ))}
            </div>
            <p className="mt-6 text-center text-base sm:text-sm text-muted-foreground">
              More questions? Read the{" "}
              <Link href="/faq" className={link}>
                full FAQ
              </Link>{" "}
              or{" "}
              <a href={whatsAppUrl} target="_blank" rel="noopener noreferrer" className={link}>
                ask us anything on WhatsApp
              </a>
              .
            </p>
          </div>
        </Container>
      </Section>

      {/* Final CTA */}
      <Section className="py-10 sm:py-14">
        <Container>
          <div className="mx-auto max-w-4xl overflow-hidden rounded-lg border border-primary/25 bg-[#0b100d] p-7 text-center sm:p-9">
            <p className="eyebrow mb-3">Make room for something good</p>
            <h2 className="font-headline text-2xl font-extrabold text-foreground sm:text-3xl">Start Your TryIPTV Subscription</h2>
            <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-muted-foreground">
              Find your plan. Check your device. Let&apos;s get you ready.
            </p>
            <div className="mt-6">
              <CtaButtons />
            </div>
            <ul className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs font-semibold text-muted-foreground">
              {["No credit card for the trial", "No auto-renew", "Support on WhatsApp"].map((t) => (
                <li key={t} className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-primary" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>
    </>
  );
}
