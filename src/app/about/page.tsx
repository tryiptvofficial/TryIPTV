import type { Metadata } from "next";
import { EmailOff } from "@/components/shared/EmailOff";
import Link from "next/link";
import type React from "react";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { PageSchema } from "@/components/shared/Schema";
import { siteConfig, generateMetadata as generatePageMetadata } from "@/lib/site-config";
import { formatLegalDate } from "@/lib/site-data/page-modifications";
import { AUTHORS } from "@/lib/site-data/authors";
import { plans } from "@/lib/site-data/pricing";
import { COMPANY, LICENSING_CONFIRMED, SHOW_CONFIRM_MARKERS } from "@/lib/site-data/company";
import { Confirm } from "@/components/shared/Confirm";
import { BRAND } from "@/lib/site-data/brand";
import { PRODUCT_TRUTHS } from "@/lib/site-config";

const LAST_UPDATED = "2026-10-21";

// Company facts live in src/lib/site-data/company.ts. An unconfirmed fact is not rendered in
// production; Preview/dev builds show a [CONFIRM] marker in its place (see <Confirm>).
const OPERATOR = { name: COMPANY.legalName, location: COMPANY.location, since: COMPANY.foundingYear };
const PAYMENT_METHODS = COMPANY.paymentMethods;
const SUPPORT_HOURS = COMPANY.support.hours;
const LANGUAGES = COMPANY.support.languages;

const title = "About TryIPTV: Who Runs It, Plans & Support";
const description =
  "Learn who runs TryIPTV, how the IPTV service works, what plans and the 24-hour free trial include, and how to reach support or request a refund.";
const canonical = "/about";
const whatsappUrl = COMPANY.support.whatsappUrl;

export function generateMetadata(): Metadata {
  return { ...generatePageMetadata({ title, description, canonical }), title: { absolute: title } };
}

const link = "font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:text-primary/80";
const h2 = "font-headline text-xl font-bold text-foreground sm:text-2xl";

const runBy = [
  OPERATOR.name && `operated by ${OPERATOR.name}`,
  OPERATOR.location && `based in ${OPERATOR.location}`,
  OPERATOR.since && `running since ${OPERATOR.since}`,
].filter(Boolean);

// Company Information table: confirmed facts only (an unconfirmed row is simply left out).
const companyRows: [string, React.ReactNode][] = [
  ["Brand", BRAND.name],
  ["Website", siteConfig.url.replace("https://", "")],
  ...(COMPANY.legalName ? [["Operated by", COMPANY.legalName] as [string, React.ReactNode]] : []),
  ...(COMPANY.location ? [["Location", COMPANY.location] as [string, React.ReactNode]] : []),
  ...(COMPANY.registrationNumber
    ? [["Company registration number", COMPANY.registry ? `${COMPANY.registrationNumber} (${COMPANY.registry})` : COMPANY.registrationNumber] as [string, React.ReactNode]]
    : []),
  ...(COMPANY.foundingYear ? [["Operating since", COMPANY.foundingYear] as [string, React.ReactNode]] : []),
  ["Customer support", `${COMPANY.support.email} · WhatsApp ${COMPANY.support.whatsappDisplay}`],
  ["Copyright notices", COMPANY.support.dmcaEmail],
];

// FAQ answers are rendered visibly and reused verbatim (as plain text) in the FAQPage schema.
const faqs: { question: string; answer: React.ReactNode; text: string }[] = [
  ...(OPERATOR.name
    ? [{
        question: "Who runs TryIPTV?",
        answer: <>TryIPTV is {runBy.join(", ")}. You can reach us at {siteConfig.links.email}.</>,
        text: `TryIPTV is ${runBy.join(", ")}. You can reach us at ${siteConfig.links.email}.`,
      }]
    : []),
  {
    question: "How do I pay?",
    answer: <>Choose a plan and you&apos;ll be taken to WhatsApp, where support sends payment instructions.{PAYMENT_METHODS ? ` Accepted payment methods: ${PAYMENT_METHODS}.` : ""} All plans are one-time payments.</>,
    text: `Choose a plan and you'll be taken to WhatsApp, where support sends payment instructions.${PAYMENT_METHODS ? ` Accepted payment methods: ${PAYMENT_METHODS}.` : ""} All plans are one-time payments.`,
  },
  {
    question: "Do plans renew automatically?",
    answer: "No. Every plan is paid once for a fixed term and does not renew automatically. When it ends, access stops unless you buy another term.",
    text: "No. Every plan is paid once for a fixed term and does not renew automatically. When it ends, access stops unless you buy another term.",
  },
  {
    question: "Can I get a refund?",
    answer: <>Only if we can&apos;t provide a working subscription, for example if your account isn&apos;t delivered or the service doesn&apos;t start at all. Once your account is activated and delivered, all sales are final. See our <Link href="/refund-policy" className={link}>refund policy</Link>.</>,
    text: "Only if we can't provide a working subscription, for example if your account isn't delivered or the service doesn't start at all. Once your account is activated and delivered, all sales are final. See our refund policy.",
  },
  {
    question: "How do I contact support?",
    answer: <>Email {siteConfig.links.email} or use the <Link href="/contact-us" className={link}>contact page</Link>.{SUPPORT_HOURS ? ` WhatsApp and email support hours: ${SUPPORT_HOURS}.` : ""}</>,
    text: `Email ${siteConfig.links.email} or use the contact page.${SUPPORT_HOURS ? ` WhatsApp and email support hours: ${SUPPORT_HOURS}.` : ""}`,
  },
];

const base = siteConfig.url;
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": `${base}/about#webpage`,
      url: `${base}/about`,
      name: title,
      description,
      isPartOf: { "@id": `${base}/#website` },
      about: { "@id": `${base}/#organization` },
      breadcrumb: { "@id": `${base}/about#breadcrumb` },
    },
    // The OnlineBusiness node itself comes from the root layout on every page; AboutPage.about references its @id.
    {
      "@type": "BreadcrumbList",
      "@id": `${base}/about#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
        { "@type": "ListItem", position: 2, name: "About TryIPTV", item: `${base}/about` },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${base}/about#faq`,
      mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.text } })),
    },
  ],
};

export default function AboutPage() {
  return (
    <>
      <PageSchema path="/about" nodes={[schema]} />
      <EmailOff>

      <Section className="relative overflow-hidden border-b border-white/[0.07] pt-12 pb-14 sm:pt-16 sm:pb-20">
        <Container className="relative text-center">
          <Breadcrumb items={[{ label: "About TryIPTV" }]} align="center" />
          <SectionHeader
            as="h1"
            eyebrow="Company"
            title="About TryIPTV"
            subtitle="Who we are, how the service works, and how to reach us."
            className="mb-0 sm:mb-0 lg:mb-0"
          />
        </Container>
      </Section>

      <Section className="py-12 sm:py-16">
        <Container className="max-w-3xl">
          <div className="space-y-10 text-base leading-7 text-muted-foreground">
            <p className="text-xs font-semibold text-primary">Last updated: {formatLegalDate(LAST_UPDATED)}</p>

            <section className="space-y-3">
              <h2 className={h2}>Who we are</h2>
              <Confirm value={COMPANY.story} question="Company story: how and why TryIPTV started, in 2–4 sentences.">
                <p>{COMPANY.story}</p>
              </Confirm>
              <p>
                TryIPTV (TryIPTV.com) is an IPTV subscription service operated by {COMPANY.legalName ?? "TryIPTV"}
                {COMPANY.location ? `, based in ${COMPANY.location}` : ""}. You watch on your own devices through a compatible
                IPTV player app. Plans run for 1, 3, 6 or 12 months, with {PRODUCT_TRUTHS.connections} simultaneous
                connections and no automatic renewal, and you can test the service first with the{" "}
                <Link href="/iptv-free-trial" className={link}>TryIPTV 24-hour IPTV free trial</Link>.
                {SUPPORT_HOURS ? ` Support is available on WhatsApp and email, ${SUPPORT_HOURS}.` : ""}
              </p>
              <p>TryIPTV is not a player app. We don&apos;t make or sell the software you watch with. You bring a device and a player; we provide the subscription and the login details that player needs.</p>
            </section>

            <section className="space-y-3">
              <h2 className={h2}>Official brand</h2>
              <p>
                TryIPTV is the official brand name of the IPTV subscription service available at TryIPTV.com and operated by{" "}
                {COMPANY.legalName ?? "Simo Alaoui LLC"}.{" "}
                &ldquo;Try IPTV&rdquo; and &ldquo;TryIPTV&rdquo; may be used when referring to the same TryIPTV brand.
                The official website is{" "}
                <Link href="https://www.tryiptv.com" className={link}>https://www.tryiptv.com</Link>.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className={h2}>Company information</h2>
              <dl className="divide-y divide-white/[0.06] overflow-hidden rounded-xl border border-white/[0.07] bg-card text-sm">
                {companyRows.map(([label, value]) => (
                  <div key={label} className="grid grid-cols-1 gap-1 px-5 py-3 sm:grid-cols-[13rem_1fr] sm:gap-4">
                    <dt className="font-semibold text-foreground">{label}</dt>
                    <dd className="break-words">{value}</dd>
                  </div>
                ))}
              </dl>
              <div className="space-y-1">
                <div><Confirm value={COMPANY.registry} question="Which registry is company number 8683949 filed with (e.g. New York Department of State)?" /></div>
                <div><Confirm value={COMPANY.foundingYear} question="Year TryIPTV started operating." /></div>
              </div>
              <p>Writing about TryIPTV? The <Link href="/press" className={link}>press kit and fact sheet</Link> has logos, key facts and a media contact.</p>
            </section>

            <section className="space-y-3">
              <h2 className={h2}>Meet the team</h2>
              <Confirm value={COMPANY.team} question="Team members who agree to be named publicly (name, role, short bio).">
                <ul className="space-y-3">
                  {COMPANY.team.map((m) => (
                    <li key={m.name} className="rounded-xl border border-white/[0.07] bg-card px-5 py-4">
                      <p className="font-headline text-lg font-bold text-foreground">
                        {AUTHORS.some((a) => a.name === m.name) ? (
                          <Link href={`/authors/${AUTHORS.find((a) => a.name === m.name)!.slug}`} className={link}>{m.name}</Link>
                        ) : (
                          m.name
                        )}
                      </p>
                      <p className="text-sm font-semibold text-primary">{m.role}</p>
                      {m.bio && <p className="mt-2">{m.bio}</p>}
                    </li>
                  ))}
                </ul>
              </Confirm>
            </section>

            <section className="space-y-3">
              <h2 className={h2}>Support availability</h2>
              <ul className="list-disc space-y-1 pl-6">
                <li>
                  WhatsApp: <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={link}>{COMPANY.support.whatsappDisplay}</a>
                  {SUPPORT_HOURS ? `, ${SUPPORT_HOURS}` : ""}
                  {COMPANY.support.whatsappNote ? `. ${COMPANY.support.whatsappNote}` : ""}
                </li>
                <li>
                  Email: <a href={`mailto:${siteConfig.links.email}`} className={link}>{siteConfig.links.email}</a>
                  {SUPPORT_HOURS ? `, ${SUPPORT_HOURS}` : ""}
                </li>
                {LANGUAGES && <li>Languages: {LANGUAGES}</li>}
                {COMPANY.support.responseTime && <li>Response time: {COMPANY.support.responseTime}</li>}
              </ul>
              {(COMPANY.support.coverage || COMPANY.support.outOfHours) && (
                <p>{[COMPANY.support.coverage, COMPANY.support.outOfHours].filter(Boolean).join(" ")}</p>
              )}
              <Confirm value={SUPPORT_HOURS} question="Support hours (with time zone) for WhatsApp and email." />
            </section>

            <section className="space-y-3">
              <h2 className={h2}>What you get</h2>
              <p>Every paid plan includes the same service:</p>
              <ul className="list-disc space-y-1 pl-6">
                <li>Live TV channels and an on-demand (VOD) library of movies and series</li>
                <li>Access through Xtream Codes (server URL, username and password) or an M3U playlist URL</li>
                <li>TV guide (EPG) data where it is available for a channel</li>
                <li>2 simultaneous connections, so two devices can stream at the same time</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className={h2}>How it works</h2>
              <ol className="list-decimal space-y-2 pl-6">
                <li><strong className="text-foreground">Choose a plan or start the free trial.</strong> Pick an IPTV plan on our <Link href="/pricing" className={link}>pricing page</Link> or request the <Link href="/iptv-free-trial" className={link}>24-hour free trial</Link>.</li>
                <li><strong className="text-foreground">Receive your credentials.</strong> For paid plans, login details usually arrive about 5–15 minutes after payment is confirmed.</li>
                <li><strong className="text-foreground">Install a compatible player.</strong> Add an IPTV player app to your device and enter your Xtream Codes or M3U details. Our <Link href="/setup" className={link}>IPTV setup guide</Link> walks you through it.</li>
                <li><strong className="text-foreground">Start watching.</strong> Your channels, on-demand library and TV guide load in the player.</li>
              </ol>
              <p>Every step, from the first WhatsApp message to renewal, is on <Link href="/how-it-works" className={link}>how TryIPTV works</Link>.</p>
            </section>

            <section className="space-y-3">
              <h2 className={h2}>Plans, pricing and payment</h2>
              <p>All plans are paid once and do not renew automatically:</p>
              <div className="overflow-hidden rounded-xl border border-white/[0.07] bg-card">
                <table className="w-full text-left text-sm">
                  <caption className="sr-only">TryIPTV plans and prices</caption>
                  <thead className="border-b border-white/[0.07] text-xs uppercase tracking-wide">
                    <tr><th className="px-5 py-3 font-semibold">Plan</th><th className="px-5 py-3 font-semibold">Price</th></tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.06]">
                    {plans.map((plan) => (
                      <tr key={plan.id}>
                        <th scope="row" className="px-5 py-3 font-semibold text-foreground">{plan.name}</th>
                        <td className="px-5 py-3">${plan.price.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p>
                When you choose a plan, you&apos;re taken to WhatsApp, where support sends payment instructions.
                {PAYMENT_METHODS ? ` Accepted payment methods: ${PAYMENT_METHODS}.` : ""} When a plan ends, access simply stops; there is no recurring charge, and you buy a new term only if you want to continue. See the full comparison on our{" "}
                <Link href="/pricing" className={link}>plans and pricing page</Link>.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className={h2}>Free trial</h2>
              <p>The free trial gives you 24 hours of access for $0, with no credit card required. It lets you check channels, picture quality, the TV guide and player compatibility on your own device and internet connection before paying.</p>
              <p>The trial ends automatically after 24 hours and does not turn into a paid plan. Details and the request button are on the <Link href="/iptv-free-trial" className={link}>free trial page</Link>.</p>
            </section>

            <section className="space-y-3">
              <h2 className={h2}>Supported devices and apps</h2>
              <p>TryIPTV works on Amazon Fire TV, Android TV and Google TV, Samsung and LG smart TVs, Apple TV, Windows and Mac computers, Chromecast and MAG boxes. Roku works through AirPlay or screen mirroring from another device.</p>
              <p>Compatible player apps include TiviMate, IPTV Smarters, XCIPTV, Televizo, OTT Navigator and IPTV Extreme.</p>
              <p>
                For step-by-step instructions, see our <Link href="/devices" className={link}>device setup guides</Link>,{" "}
                <Link href="/players" className={link}>IPTV player guides</Link> and the <Link href="/setup" className={link}>universal setup guide</Link>.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className={h2}>Support</h2>
              <p>
                Contact us by email at <a href={`mailto:${siteConfig.links.email}`} className={link}>{siteConfig.links.email}</a> or through our{" "}
                <Link href="/contact-us" className={link}>contact page</Link>.{SUPPORT_HOURS ? ` WhatsApp and email support hours: ${SUPPORT_HOURS}.` : ""}
              </p>
              <p>Many common problems, such as buffering, login errors or a missing TV guide, have step-by-step fixes in our <Link href="/help" className={link}>IPTV troubleshooting guides</Link>. Questions about plans, devices or legality are answered in the <Link href="/faq" className={link}>IPTV FAQ</Link>.</p>
            </section>

            <section className="space-y-3">
              <h2 className={h2}>Refunds and policies</h2>
              <p>{PRODUCT_TRUTHS.refund.summary} {PRODUCT_TRUTHS.refund.exclusions} The exact conditions are in our <Link href="/refund-policy" className={link}>refund policy</Link>.</p>
              <p>
                Please also read our <Link href="/terms-conditions" className={link}>terms and conditions</Link>,{" "}
                <Link href="/privacy-policy" className={link}>privacy policy</Link> and <Link href="/disclaimer" className={link}>disclaimer</Link>.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className={h2}>Content and copyright</h2>
              {/* Content-source / licensing statement: only owner-confirmed wording, from company.ts. */}
              {(LICENSING_CONFIRMED || SHOW_CONFIRM_MARKERS) && (
                <p>
                  How TryIPTV is licensed to distribute its channels is explained on our{" "}
                  <Link href="/content-licensing" className={link}>content licensing page</Link>.
                </p>
              )}
              <p>
                If you believe content accessible through TryIPTV infringes your copyright, email{" "}
                <a href={`mailto:${COMPANY.support.dmcaEmail}`} className={link}>{COMPANY.support.dmcaEmail}</a> or use our{" "}
                <Link href="/dmca-report" className={link}>copyright (DMCA) report page</Link>.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className={h2}>Honest expectations</h2>
              <p>Streaming quality depends on more than the service. Your internet connection, your device and the player app you use all affect how smoothly channels load and play.</p>
              <p>A 24-hour trial is a good way to test your own setup, but it can&apos;t guarantee how any internet-delivered service will perform over the following months. If you&apos;re unsure, start with a shorter plan before choosing a longer one.</p>
            </section>

            <section className="space-y-5">
              <h2 className={h2}>Frequently asked questions</h2>
              {faqs.map((faq) => (
                <div key={faq.question} className="space-y-2">
                  <h3 className="font-headline text-lg font-bold text-foreground">{faq.question}</h3>
                  <p>{faq.answer}</p>
                </div>
              ))}
            </section>
          </div>
        </Container>
      </Section>
      </EmailOff>
    </>
  );
}
