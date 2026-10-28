import type { Metadata } from "next";
import { TopicClusterLinks } from "@/components/shared/TopicClusterLinks";
import { GuideByline } from "@/components/shared/GuideByline";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { Container } from "@/components/shared/Container";
import { PageSchema } from "@/components/shared/Schema";
import { Section } from "@/components/shared/Section";
import { Button } from "@/components/ui/button";
import { FaqList } from "@/components/sections/FAQ";
import { ArticleSummary } from "@/components/guide";
import { generateArticleSchema, generateBreadcrumbSchema } from "@/lib/schema";
import { PRODUCT_TRUTHS, SITE_URL, generateMetadata as generatePageMetadata } from "@/lib/site-config";
import { getLastModified } from "@/lib/site-routes";

const title = "What Is IPTV? A Beginner's Guide to Internet TV";
const description =
  "Learn what IPTV is, how it works, the devices and apps it runs on, and what you need to get started: internet speed, an app, and a subscription.";
const canonical = "/guides/what-is-iptv";
const modifiedDate = getLastModified("/guides/what-is-iptv");

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

const articleSchema = generateArticleSchema({
  headline: title,
  description,
  dateModified: modifiedDate,
  url: `${SITE_URL}${canonical}`,
});

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", item: `${SITE_URL}/` },
  { name: "Guides", item: `${SITE_URL}/guides` },
  { name: "What Is IPTV?", item: `${SITE_URL}${canonical}` },
]);

const comparisonRows = [
  {
    label: "Delivery",
    iptv: "Streams video over an internet connection.",
    traditional: "Uses cable, satellite, or broadcast infrastructure.",
  },
  {
    label: "Equipment",
    iptv: "Usually needs a compatible device and IPTV player app.",
    traditional: "Often needs provider-issued boxes or fixed wiring.",
  },
  {
    label: "Access",
    iptv: "Can work through M3U playlists or Xtream Codes credentials.",
    traditional: "Typically tied to the provider's own receiver and account system.",
  },
  {
    label: "Reliability factors",
    iptv: "Depends heavily on internet speed, Wi-Fi quality, device performance, and stream source.",
    traditional: "Depends more on the provider's physical signal and installed hardware.",
  },
];

const devices = [
  {
    label: "Smart TVs",
    items: [
      { name: "Android TV", href: "/devices/android-tv-iptv" },
      { name: "Samsung Smart TV (Tizen)", href: "/devices/samsung-tv-iptv" },
      { name: "LG Smart TV (webOS)", href: "/devices/lg-tv-iptv" },
    ],
  },
  {
    label: "TV boxes",
    items: [
      { name: "Apple TV", href: "/devices/apple-tv-iptv" },
      { name: "Android boxes", href: "/devices/android-tv-iptv" },
      { name: "Amazon Fire TV Stick", href: "/devices/firestick-iptv" },
    ],
  },
  {
    label: "Phones, tablets, and computers",
    items: [
      { name: "iPhone and iPad", href: "/devices/iphone-iptv" },
      { name: "Windows", href: "/devices/windows-iptv" },
      { name: "Mac", href: "/devices/mac-iptv" },
    ],
  },
];

const concepts = [
  {
    title: "M3U playlist",
    href: "/guides/what-is-m3u",
    text: "An M3U playlist is a URL or file that tells a compatible player where streams are located.",
  },
  {
    title: "Xtream Codes",
    href: "/guides/what-are-xtream-codes",
    text: "Xtream Codes credentials usually include a server URL, username, and password for supported apps.",
  },
  {
    title: "EPG",
    href: "/guides/what-is-epg",
    text: "An electronic programme guide adds channel schedules, show titles, and timing data where supported.",
  },
];

const legalityRows = [
  { label: "IPTV technology and apps", us: "Legal", uk: "Legal" },
  { label: "Watching a licensed IPTV service", us: "Legal", uk: "Legal" },
  {
    label: "Watching unlicensed streams",
    us: "The law mainly targets operators; viewer liability is less settled",
    uk: "Unlawful (GOV.UK 2018; EU Court of Justice C-527/15)",
  },
  {
    label: "Selling or running an unlicensed service",
    us: "Federal crime under 18 U.S.C. § 2319C, for services primarily designed to stream without authorization",
    uk: "Can be a criminal offence under copyright law",
  },
];

const faqs = [
  {
    question: "What internet speed do I need?",
    answer:
      "A download speed of at least 10 Mbps with low, stable latency works for standard streams (SD and 720p). For Full HD, plan on about 25 Mbps, and about 50 Mbps for 4K. Each extra screen streaming at the same time needs its own share.",
  },
  {
    question: "Is IPTV legal?",
    answer:
      "IPTV is just a delivery technology and is legal in itself. Whether a particular service is legal depends on whether the provider holds the proper rights to the content it streams, so choose a reputable provider. This is general information, not legal advice.",
  },
  {
    question: "Which app should I use?",
    answer:
      "It depends on your device. Smart IPTV and Set IPTV are popular on Samsung and LG TVs, TiviMate is a favourite on Android TV and Firestick, and IPTV Smarters works well across Android, iOS, Windows, and Mac.",
  },
  {
    question: "What does IPTV stand for?",
    answer:
      "IPTV stands for Internet Protocol Television. It means TV channels and on-demand video are delivered as data over an internet connection, instead of through a cable line, satellite dish, or antenna, and played in an app on a TV, streaming stick, phone, or computer.",
  },
  {
    question: "Do you have to pay for IPTV?",
    answer:
      "Usually, yes. Licensed IPTV services charge a subscription because they pay for the rights to their channels. IPTV player apps are often free or cheap, but they contain no channels.",
  },
  {
    question: "Can I watch IPTV for free?",
    answer:
      "Some broadcasters offer free, legal streams of their own channels, but free lists of premium channels are almost always unlicensed and can be unsafe or illegal to use. A free trial from a paid service is the safer way to test on your own device, without installing unknown apps or lists.",
  },
  {
    question: "Is IPTV the same as Netflix or YouTube TV?",
    answer:
      "Not exactly. Netflix is an on-demand streaming service, and YouTube TV is a live TV streaming service with its own app. IPTV usually means a service that supplies live channels as a playlist or Xtream Codes login that you open in a separate IPTV player app.",
  },
  {
    question: "How does IPTV connect to a TV?",
    answer:
      "IPTV reaches a TV through an app. Install an IPTV player on a smart TV, or on a Firestick, Android TV box, Apple TV, or MAG box plugged into the TV, then enter the login details from your service. Phones can also send IPTV to a TV with AirPlay or casting.",
  },
  {
    question: "Do I need a VPN for IPTV?",
    answer:
      "No, a VPN is not required to use IPTV. A VPN can help you test whether your internet provider slows video traffic, but it adds overhead and can reduce speed. If streams buffer, check your connection and player settings first using the IPTV buffering guide.",
  },
];

const stackedLabel =
  "text-muted-foreground before:font-semibold before:text-foreground/80 before:content-[attr(data-label)] sm:before:content-none";

export default function WhatIsIptvPage() {
  return (
    <>
      <PageSchema nodes={[articleSchema, breadcrumbSchema]} />

      <Section className="border-b border-white/[0.07] pt-10 pb-14 sm:pt-14 sm:pb-20">
        <Container>
          <Breadcrumb
            items={[
              { label: "Guides", href: "/guides" },
              { label: "What Is IPTV?" },
            ]}
            align="center"
          />
          <div className="mx-auto max-w-4xl text-center">
            <p className="eyebrow mb-3">IPTV Basics</p>
            <h1 className="font-headline text-3xl font-extrabold leading-[1.1] text-foreground sm:text-4xl lg:text-5xl">
              What Is IPTV? A Beginner&apos;s Guide
            </h1>
            <p className="mx-auto mt-5 max-w-[60ch] text-base leading-7 text-muted-foreground sm:text-lg">
              Learn what IPTV is, how it works, the devices and apps it runs on, and what you need to get
              started, including internet speed, an app, and a subscription.
            </p>
            <GuideByline path="/guides/what-is-iptv" />
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild>
                <Link href="/guides/how-does-iptv-work">
                  Learn how IPTV works <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/setup">See the setup path</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <article className="mx-auto max-w-4xl">
            <ArticleSummary title="The Direct Answer">
              <p>
                IPTV (Internet Protocol Television) is TV delivered as data packets over the internet rather than
                through a cable line, satellite dish, or antenna. A provider&apos;s service supplies the channel list
                and video streams; a compatible IPTV player app on your device receives and plays them.
              </p>
            </ArticleSummary>

            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p className="lead text-xl leading-8 text-foreground">
                IPTV (Internet Protocol Television) delivers multimedia content over the internet, giving
                you a wide range of live channels, on-demand video, and customization options. Instead of
                receiving a signal through a cable or satellite dish, your device streams TV directly over
                your internet connection.
              </p>

              <h2>How IPTV works</h2>
              <p>
                IPTV sends television content as data packets over the internet. When you open a channel,
                your IPTV app requests that stream from a server and plays it in real time. The same
                technology also powers video on demand (VOD), so you can watch movies and series whenever
                you want. For the full step-by-step picture, read{" "}
                <Link href="/guides/how-does-iptv-work" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
                  how IPTV works
                </Link>
                .
              </p>

              <h2>What devices and apps support IPTV</h2>
              <p>IPTV runs on a wide variety of hardware and platforms, including:</p>
            </div>

            <ul className="my-6 grid gap-4 sm:grid-cols-3">
              {devices.map((group) => (
                <li key={group.label} className="rounded-lg border border-white/[0.09] bg-card p-5">
                  <h3 className="font-headline text-lg font-extrabold text-foreground">{group.label}</h3>
                  <ul className="mt-3 space-y-1.5 text-base sm:text-sm">
                    {group.items.map((d) => (
                      <li key={d.name}>
                        <Link href={d.href} className="tap-target inline-flex items-center gap-1 text-primary hover:underline">
                          {d.name} <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>

            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p>
                Popular apps include <Link href="/players/iptv-smarters">IPTV Smarters</Link>, Smart IPTV,
                and Set IPTV, which support operating systems such as webOS (LG), Tizen (Samsung), and
                Android TV. On Android TV and Firestick, <Link href="/players/tivimate">TiviMate</Link> is
                another favourite. These player apps are made by other companies and contain no channels of
                their own: TryIPTV is the service, and the player is the app that opens your TryIPTV login.{" "}
                <Link href="/players">Compare IPTV players</Link>.
              </p>

              <h2>What you need to use IPTV</h2>
              <p>To get started with IPTV, you need three things:</p>
              <ol>
                <li>
                  <strong>An internet connection</strong>: a minimum of about 10 Mbps download speed with
                  low, stable latency for smooth standard-quality playback; about 25 Mbps for Full HD and
                  50 Mbps for 4K. You can check your connection at{" "}
                  <a href="https://www.speedtest.net/" target="_blank" rel="noopener noreferrer">speedtest.net</a>,
                  and read our <Link href="/guides/iptv-internet-speed">IPTV internet speed guide</Link>.
                </li>
                <li>
                  <strong>An IPTV application</strong>: both free and premium options are available
                  depending on your device.
                </li>
                <li>
                  <strong>An IPTV subscription</strong>: provided as an M3U link or Xtream Codes
                  credentials. TryIPTV supplies both, and you can test it first with a{" "}
                  {PRODUCT_TRUTHS.trialDuration.toLowerCase()} <Link href="/iptv-free-trial">free trial</Link>.
                </li>
              </ol>

              <h2>What is an M3U link?</h2>
              <p>
                An M3U link is a playlist file from your IPTV provider that contains all of your channels and
                VOD content. You simply paste it into your IPTV app, which then loads your entire lineup at
                once. Many apps also accept Xtream Codes credentials (server URL, username, and password) as
                an alternative, and the EPG adds the TV guide.
              </p>
            </div>

            <div className="my-8 grid gap-4 md:grid-cols-3">
              {concepts.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg border border-white/[0.09] bg-card p-5 transition-colors hover:border-primary/40"
                >
                  <h3 className="font-headline text-lg font-extrabold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-base sm:text-sm leading-6 text-muted-foreground">{item.text}</p>
                  <span className="mt-4 inline-flex items-center text-sm font-semibold text-primary">
                    Read guide <ArrowRight className="ml-1.5 h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>

            <div className="prose prose-lg max-w-none dark:prose-invert">
              <h2>How IPTV differs from cable or satellite</h2>
              <p>
                Traditional TV systems are built around dedicated delivery networks. Cable TV arrives
                through coaxial or fiber infrastructure, satellite TV arrives from a dish, and
                broadcast TV arrives over the air. IPTV uses the same general internet connection you
                use for websites, apps, and video calls. For an in-depth side-by-side breakdown of costs,
                equipment, contracts, and reliability tradeoffs, see our complete guide on{" "}
                <Link href="/guides/iptv-vs-cable" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
                  IPTV vs. cable TV
                </Link>
                .
              </p>
            </div>

            {/* A real <table> (so answer engines read rows and headers) laid out with the same grid as before. */}
            <table className="my-8 block w-full overflow-hidden rounded-lg border border-white/[0.09]">
              <caption className="sr-only">IPTV compared with cable or satellite TV</caption>
              {/* Column header only fits once rows go 3-up; stacked rows carry their own labels below. */}
              <thead className="hidden sm:block">
                <tr className="grid grid-cols-3 bg-card px-4 py-3 text-left text-sm font-bold text-foreground">
                  <th scope="col" className="text-left font-bold">Topic</th>
                  <th scope="col" className="text-left font-bold">IPTV</th>
                  <th scope="col" className="text-left font-bold">Cable or satellite</th>
                </tr>
              </thead>
              <tbody className="block">
                {comparisonRows.map((row) => (
                  <tr
                    key={row.label}
                    className="grid grid-cols-1 gap-2 border-t border-white/[0.09] px-4 py-4 text-base sm:text-sm leading-6 sm:grid-cols-3"
                  >
                    <th scope="row" className="text-left font-semibold text-foreground">{row.label}</th>
                    {/* Stacked (mobile) rows repeat the hidden column header via CSS-generated content,
                        so no extra text is added to the HTML; sm+ shows the real header instead. */}
                    <td data-label="IPTV: " className={stackedLabel}>{row.iptv}</td>
                    <td data-label="Cable or satellite: " className={stackedLabel}>{row.traditional}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="prose prose-lg max-w-none dark:prose-invert">
              <h2>What you can watch with IPTV</h2>
              <p>
                IPTV can include live channels, sports channels, movies, series, catch-up features,
                and programme guide data. The exact library depends on the service, plan, region,
                device, and player support. TryIPTV&apos;s current product configuration lists{" "}
                {PRODUCT_TRUTHS.channels} live channels and {PRODUCT_TRUTHS.vod} movies and series,
                with {PRODUCT_TRUTHS.connections} simultaneous connections on every plan.
              </p>

              <h2>Internet speed and buffering basics</h2>
              <p>
                IPTV quality depends on a stable connection, not just the number printed on a speed
                test. Wi-Fi congestion, distance from the router, old devices, app cache, stream
                quality, and local network traffic can all affect playback. For recommended bandwidth
                targets and multi-device planning, read our <Link href="/guides/iptv-internet-speed">IPTV internet speed guide</Link>,
                or consult our <Link href="/help/iptv-buffering">IPTV buffering troubleshooting checklist</Link> to resolve active freezing.
              </p>

              <h2>Is IPTV right for you?</h2>
              <p>
                IPTV is useful when you want internet-based TV access across flexible devices, but
                it works best when you are comfortable installing an app and entering service
                credentials. It is not identical to a cable box experience, and the best setup
                depends on your device, player, and internet connection.
              </p>

              <h2 id="is-iptv-legal">Is IPTV legal?</h2>
              <p>
                IPTV technology is legal: it is simply a way of delivering television over the internet,
                and major licensed services use it. Whether a particular IPTV service is legal depends on
                whether it has the rights to the channels and films it streams. Watching or selling
                unlicensed streams can break copyright law.
              </p>
              <h3>Is IPTV legal in the US?</h3>
              <p>
                Yes, IPTV itself is legal in the US. Under the Protecting Lawful Streaming Act of 2020{" "}
                (<a href="https://www.law.cornell.edu/uscode/text/18/2319C" target="_blank" rel="noopener noreferrer">18 U.S.C. § 2319C</a>),
                it is a federal crime to willfully, and for commercial advantage or private financial gain,
                offer a streaming service that is primarily designed or marketed to stream copyrighted
                works without authorization. The law mainly targets operators; whether viewers are liable
                is less settled.
              </p>
              <h3>Is IPTV legal in the UK?</h3>
              <p>
                Yes, IPTV and streaming devices are legal in the UK. The UK government states that
                streaming boxes become illegal to use once apps or add-ons give access to paid-for
                content for free{" "}
                (<a href="https://www.gov.uk/government/news/pressure-grows-on-producers-of-illegal-streaming-devices-and-thieves-of-paid-for-content" target="_blank" rel="noopener noreferrer">GOV.UK, October 2018</a>),
                and the EU Court of Justice ruled in 2017, while the UK was in the EU, that streaming
                unlicensed content is not lawful (<a href="https://curia.europa.eu/juris/liste.jsf?num=C-527/15" target="_blank" rel="noopener noreferrer">case C-527/15</a>).
              </p>
            </div>

            <table className="my-8 block w-full overflow-hidden rounded-lg border border-white/[0.09]">
              <caption className="sr-only">IPTV legality at a glance</caption>
              <thead className="hidden sm:block">
                <tr className="grid grid-cols-3 bg-card px-4 py-3 text-left text-sm font-bold text-foreground">
                  <th scope="col" className="text-left font-bold">Situation</th>
                  <th scope="col" className="text-left font-bold">United States</th>
                  <th scope="col" className="text-left font-bold">United Kingdom</th>
                </tr>
              </thead>
              <tbody className="block">
                {legalityRows.map((row) => (
                  <tr
                    key={row.label}
                    className="grid grid-cols-1 gap-2 border-t border-white/[0.09] px-4 py-4 text-base sm:text-sm leading-6 sm:grid-cols-3"
                  >
                    <th scope="row" className="text-left font-semibold text-foreground">{row.label}</th>
                    <td data-label="United States: " className={stackedLabel}>{row.us}</td>
                    <td data-label="United Kingdom: " className={stackedLabel}>{row.uk}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-sm leading-6 text-muted-foreground">
              This is general information, not legal advice. Laws differ by country and change over time.
            </p>

            <div className="mt-10 rounded-lg border border-primary/25 bg-[#0b100d] p-6 sm:p-8">
              <p className="eyebrow mb-3">Next steps</p>
              <h2 className="font-headline text-2xl font-extrabold text-foreground">
                Learn the setup path before choosing a plan
              </h2>
              <p className="mt-3 max-w-[60ch] text-base leading-6 text-muted-foreground">
                TryIPTV offers a {PRODUCT_TRUTHS.trialDuration.toLowerCase()} free trial with no card
                required. If you want to test compatibility first, start with the trial, then follow
                the setup guide for your device and player.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button asChild>
                  <Link href="/iptv-free-trial">Start the free trial</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/pricing">Compare pricing</Link>
                </Button>
              </div>
            </div>
          </article>
        </Container>
      </Section>

      <Section className="border-t border-white/[0.07] bg-black/20 pt-12 pb-16 sm:pt-14 sm:pb-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 text-center sm:text-left">
              <p className="eyebrow mb-2">Frequently Asked Questions</p>
              <h2 className="font-headline text-2xl font-bold text-foreground sm:text-3xl">
                Common Questions About IPTV
              </h2>
            </div>
            <FaqList items={faqs} />
          </div>
        </Container>
      </Section>
      <TopicClusterLinks path="/guides/what-is-iptv" />
    </>
  );
}
