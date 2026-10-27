import type { Metadata } from "next";
import { existsSync } from "node:fs";
import path from "node:path";
import Link from "next/link";
import { ArrowRight, Check, Film, LayoutList, MessageCircle, MonitorSmartphone, MonitorPlay, Tv } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { PageSchema } from "@/components/shared/Schema";
import { getIptvFreeTrialPageData } from "@/lib/data/iptv-free-trial-page";
import { SITE_URL, generateMetadata as generatePageMetadata } from "@/lib/site-config";
import { GuideScreenshot } from "@/components/guide";
import { PRODUCT_TRUTHS, FACT_TEXT } from "@/lib/site-config";
import { COMPANY } from "@/lib/site-data/company";

const freeTrialWhatsAppUrl =
  "https://wa.me/212694833293?text=Hello%20TryIPTV%2C%20I%20would%20like%20to%20start%20my%20free%20IPTV%20trial.";

const trialLengthRows = [
  ["24 hours", "Player setup, channel list, one full prime-time evening, support response time", "A second weekend of sport", "TryIPTV: 24 hours, no credit card"],
  ["48 hours", "The above plus a second evening or a second device", "Anything a 24-hour trial missed", "Offered by some providers"],
  ["72 hours", "The above plus a full weekend of live sport", "Whether the service lasts past month two", 'Advertised by some providers as a "3 day" trial'],
] as const;

// Placeholders until the original screenshots are added to /public; each renders only once its file exists.
const proofScreens = [
  {
    // TODO: replace with original screenshot of the trial account in the panel, no customer data visible
    src: "/images/iptv-free-trial/panel-trial-account.webp",
    alt: "Reseller panel showing an active 24-hour IPTV trial account with its expiry date and connection limit",
    caption: "The trial account as it appears in our panel: 24-hour expiry, 2 connections, full channel list.",
  },
  {
    // TODO: replace with original screenshot of the player with EPG loaded, no customer data visible
    src: "/images/iptv-free-trial/player-epg-loaded.webp",
    alt: "IPTV player on a TV showing the channel list and a loaded EPG guide during a free trial",
    caption: "The same login in a player, with the EPG loaded and the channel groups we were asked for.",
  },
].filter((screen) => existsSync(path.join(process.cwd(), "public", screen.src)));

const preSendChecklist = [
  "I open the account in the panel and confirm the expiry is set to 24 hours, not 24 hours from activation plus a buffer.",
  "I check that the connection limit reads 2, so the trial matches what a paid plan gives you.",
  "I load the login in one player myself and confirm the channel list and the EPG actually populate.",
  "I check that the channel groups you asked for on WhatsApp are present before I reply.",
  "I confirm the credentials are Xtream Codes and M3U, so they work in your own player and not only in ours.",
  "I note the time I sent them, so support knows exactly when your 24 hours end.",
] as const;

const link = "font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary";
const T = PRODUCT_TRUTHS;
const usd = (n: number) => `$${Number.isInteger(n) ? n : n.toFixed(2)}`;

export function generateMetadata(): Metadata {
  const title = "IPTV Free Trial: 24 Hours, No Credit Card";
  const description =
    "Start a 24-hour TryIPTV free trial on WhatsApp: $0, no credit card, no auto-renew. Login arrives in 5–15 minutes. See what to test and what plans cost.";

  return {
    ...generatePageMetadata({
      title,
      description,
      canonical: "/iptv-free-trial",
      // Static 1200x630 share image built from the trial facts (no card, $0, 5–15 min login).
      image: `${SITE_URL}/images/free-trial/iptv-free-trial-24-hours-no-credit-card.jpg`,
    }),
    title: { absolute: `${title} | TryIPTV` },
  };
}

const included = [
  {
    icon: Tv,
    title: `${T.channels} live channels`,
    text: "Use the trial to open the channels your household actually watches, from news and sports to movies, kids' TV and channels in your language.",
  },
  {
    icon: Film,
    title: `${T.vod} movies and shows`,
    text: "Browse the on-demand library and check play, pause, seeking and audio tracks in your own player.",
  },
  {
    icon: MonitorPlay,
    title: "HD and 4K where available",
    text: "Put a stream on your biggest screen and judge the picture yourself, on your own internet connection.",
  },
  {
    icon: LayoutList,
    title: "TV guide (EPG)",
    text: "The programme guide loads in your player, so you can check that listings match what is actually playing.",
  },
  {
    icon: MonitorSmartphone,
    title: "Works on your devices",
    text: "Smart TVs, Firestick, Android TV, Apple TV, phones, tablets and computers. Test the exact screens your household uses.",
  },
  {
    icon: MessageCircle,
    title: "Support on WhatsApp",
    text: "Trial users get support too. If setup stalls during your test, send a message in the same WhatsApp chat.",
  },
] as const;

const quickFacts = [
  ["Cost", "$0"],
  ["Trial duration", "24 consecutive hours from activation"],
  ["Payment details required", "None (no credit card or billing information requested)"],
  ["Typical activation time", `${T.activationTime} after request confirmation, ${T.activationHours}`],
  ["Access formats", "Xtream Codes (Server URL, Username, Password) and M3U playlist URL"],
  [
    "Supported devices",
    <>
      Firestick, Android TV, Chromecast with Google TV, Smart TVs (Samsung, LG), Apple TV, iPhone and iPad, Windows, Mac, MAG, and Roku{" "}
      <Link href="/devices/roku-iptv" className={link}>
        via AirPlay or screen mirroring
      </Link>
    </>,
  ],
  ["Simultaneous connections", `${T.connections}, the same as paid plans`],
  ["After the trial", "Access expires automatically. The trial does not automatically renew or convert into a paid subscription."],
  [
    "Trials per household",
    <>
      One trial per household or user (
      <Link href="/terms-conditions" className={link}>
        Terms &amp; Conditions
      </Link>
      )
    </>,
  ],
] as const;

const steps = [
  {
    step: "STEP 1",
    title: "Tap Start My Free Trial",
    desc: "The button opens WhatsApp with a ready-made message. Add the device and IPTV player app you plan to use, then send it. The trial costs $0 and stays $0.",
  },
  {
    step: "STEP 2",
    title: "Receive your login on WhatsApp",
    desc: `Your login details arrive in the same chat, usually within ${T.activationTime}: an Xtream Codes login (server URL, username, password) or an M3U playlist URL. No credit card, no bank details, no payment method of any kind.`,
  },
  {
    step: "STEP 3",
    title: "Sign in and start watching",
    desc: "Enter the details in your IPTV player and let the channels and guide load. Your 24 hours begin when the login is activated.",
  },
] as const;

const testingTips = [
  {
    title: "Run a peak-hour test",
    text: "Stream live TV between 7 and 11 pm, when your neighbourhood's network is busiest. It is the most revealing hour of the trial.",
  },
  {
    title: "Open your must-have channels",
    text: "News, sports, movies, kids' programming, channels in your language. Confirm each one plays cleanly before you pay.",
  },
  {
    title: "Try every screen and the guide",
    text: "Sign in on each device, check the EPG matches what is on air, and put a 4K stream on your biggest TV (about 25 Mbps handles one HD stream, 50 Mbps handles 4K).",
  },
] as const;

const testingChecklist = [
  ["Important channels", "Confirm that your preferred local, national, and international channels are available and load and play as expected."],
  ["Live sports and events", "Observe stream stability and video smoothness during live broadcasts."],
  ["Picture quality", "Check resolution and visual clarity across available SD, HD, and 4K streams on your primary screen."],
  ["Channel switching", "Observe channel startup time and transition stability when changing channels."],
  ["On-demand content (VOD)", "Test playback controls, including play, pause, seeking, and audio track selection where supported."],
  ["TV guide (EPG)", "Verify that programme schedule data loads correctly in your IPTV player."],
  ["Player compatibility", "Confirm that your chosen IPTV player works correctly with your trial."],
  ["Home network performance", "Compare playback over Wi-Fi versus an Ethernet cable if you encounter buffering."],
] as const;

const planComparisonRows = [
  ["Cost", "$0", `From ${FACT_TEXT.fromPrice} (1 Month) to $88.23 (12 Months)`],
  ["Duration", "24 consecutive hours", "1, 3, 6, or 12 months, paid once"],
  ["Payment", "None", COMPANY.paymentMethods ? `Paid once by ${COMPANY.paymentMethods}` : "One-time payment; instructions provided when ordering"],
  ["Simultaneous connections", `${T.connections}, the same as paid plans`, `${T.connections} simultaneous connections included on all plans`],
  ["Automatic renewal", "No", "No (plans do not auto-renew)"],
  ["Access format", "Xtream Codes / M3U", "Xtream Codes / M3U"],
  ["When access ends", "Service stops automatically", "Access expires at the end of the paid period"],
] as const;

const trustStats = [
  ["$0", "Trial checkout, no card collected"],
  [`${FACT_TEXT.trialHours} h`, "Trial length, no auto-renew"],
  [T.activationTime.replace(" minutes", " min"), "Typical login delivery"],
  [String(T.connections), "Connections on every paid plan"],
] as const;

const deviceGuides = [
  { name: "Amazon Firestick & Fire TV", href: "/devices/firestick-iptv", note: "Setup guide for Amazon Fire TV Stick and Fire TV devices." },
  { name: "Android TV & Google TV", href: "/devices/android-tv-iptv", note: "Setup guide for Android TV and Google TV streaming devices and smart TVs." },
  { name: "Samsung Smart TV", href: "/devices/samsung-tv-iptv", note: "Configuration instructions for compatible players on Samsung smart TVs." },
  { name: "LG Smart TV", href: "/devices/lg-tv-iptv", note: "Setup guide for supported IPTV players on LG smart TVs." },
  { name: "Apple TV", href: "/devices/apple-tv-iptv", note: "Setup steps for compatible media players on Apple TV (tvOS)." },
  { name: "iPhone & iPad", href: "/devices/iphone-iptv", note: "App Store player setup for iPhone and iPad, with AirPlay to your TV." },
  { name: "Windows PC", href: "/devices/windows-iptv", note: "Setup guide for IPTV player software on Windows computers." },
  { name: "Apple Mac", href: "/devices/mac-iptv", note: "Configuration instructions for compatible players on macOS." },
  { name: "Google Chromecast", href: "/devices/chromecast-iptv", note: "Player apps on Chromecast with Google TV, or casting to older Chromecast models." },
  { name: "Roku", href: "/devices/roku-iptv", note: "Streaming to Roku through AirPlay 2 or screen mirroring from another device." },
  { name: "MAG Box", href: "/devices/mag-box-iptv", note: "Portal URL and MAC address setup for Infomir MAG set-top boxes." },
] as const;

const playerGuides = [
  { name: "TiviMate Setup Guide", href: "/players/tivimate", note: "Guide for configuring playlists and EPG in TiviMate for Android TV and Firestick." },
  { name: "IPTV Smarters Pro Setup Guide", href: "/players/iptv-smarters", note: "Setup walkthrough for Xtream Codes on IPTV Smarters across supported platforms." },
  { name: "View All Player Guides", href: "/players", note: "Compare and configure all supported third-party IPTV players." },
] as const;

const troubleshootingLinks = [
  { issue: "Buffering or stuttering", label: "IPTV Buffering Guide", href: "/help/iptv-buffering" },
  { issue: "Login details not working", label: "IPTV Login Troubleshooting Guide", href: "/help/iptv-login-not-working" },
  { issue: "M3U playlist not loading", label: "M3U Troubleshooting Guide", href: "/help/m3u-not-loading" },
  { issue: "EPG programme guide missing", label: "EPG Troubleshooting Guide", href: "/help/epg-not-working" },
  { issue: "Streams not playing", label: "IPTV Not Working Guide", href: "/help/iptv-not-working" },
] as const;

function TrialButtons({ uppercase = false }: { uppercase?: boolean }) {
  return (
    <div className="flex flex-col justify-center gap-3 sm:flex-row">
      <Button asChild size="lg">
        <a href={freeTrialWhatsAppUrl} target="_blank" rel="noopener noreferrer">
          <SiWhatsapp aria-hidden="true" className="mr-2 h-4 w-4" /> {uppercase ? "START MY FREE TRIAL" : "Start My Free Trial"}
          <span className="sr-only"> (opens WhatsApp in a new tab)</span>
        </a>
      </Button>
      <Button asChild size="lg" variant="outline">
        <Link href="/pricing">See plans and pricing</Link>
      </Button>
    </div>
  );
}

export default async function IptvFreeTrialPage() {
  const { breadcrumbSchema, serviceSchema, trialFaqs } = await getIptvFreeTrialPageData();
  const bestValue = T.plans[T.plans.length - 1].duration;

  return (
    <>
      <PageSchema
        path="/iptv-free-trial"
        name="IPTV Free Trial: 24 Hours Free, No Credit Card Needed"
        nodes={[serviceSchema, breadcrumbSchema]}
      />

      {/* Hero */}
      <Section className="relative overflow-hidden border-b border-white/[0.07] pt-12 pb-14 sm:pt-16 sm:pb-20">
        <Container className="relative">
          <div className="mx-auto max-w-4xl text-center">
            <Breadcrumb items={[{ label: "IPTV Free Trial" }]} align="center" />
            <p className="eyebrow mb-3">24 hours · $0 · No card</p>
            <h1 className="font-headline text-3xl font-extrabold leading-[1.08] text-foreground sm:text-5xl lg:text-6xl">
              IPTV Free Trial: 24 Hours Free, No Credit Card Needed
            </h1>
            <p className="mx-auto mt-5 max-w-[60ch] text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              TryIPTV offers a {FACT_TEXT.trialHours}-hour IPTV free trial for $0, with no credit card and no auto-renewal. Tap Start
              My Free Trial to message support on WhatsApp, and your Xtream Codes or M3U login usually arrives within{" "}
              {T.activationTime}. One trial per household; when the {FACT_TEXT.trialHours} hours end, access simply stops.
            </p>
            <div className="mt-7">
              <TrialButtons />
            </div>
            <ul className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs font-semibold text-muted-foreground">
              {["No credit card", "No auto-renew", "One trial per household"].map((t) => (
                <li key={t} className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-primary" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* What's Included */}
      <Section className="border-b border-white/[0.06] bg-[#070a08] py-10 sm:py-14">
        <Container>
          <div className="mx-auto max-w-4xl">
            <SectionHeader
              eyebrow="What's Included"
              title="What Do You Get With the IPTV Free Trial?"
              subtitle={`The TryIPTV free trial gives you ${FACT_TEXT.trialHours} hours to test the ${T.channels} live channels, the ${T.vod}-title on-demand library, HD and 4K streams where available, and the TV guide, for $0 and without a card. It includes ${T.connections} simultaneous connections, the same as a paid plan.`}
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {included.map(({ icon: Icon, title, text }) => (
                <div key={title} className="rounded-lg border border-white/[0.09] bg-card p-5">
                  <Icon className="h-5 w-5 text-primary" aria-hidden />
                  <h3 className="mt-3 font-headline text-lg font-extrabold text-foreground">{title}</h3>
                  <p className="mt-2 text-base sm:text-sm leading-6 text-muted-foreground">{text}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 overflow-hidden rounded-lg border border-white/[0.09] bg-card">
              <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Free trial details table">
                <table className="w-full text-left text-[15px] sm:text-sm">
                  <caption className="sr-only">TryIPTV free trial details and specifications</caption>
                  <tbody className="divide-y divide-white/[0.06]">
                    {quickFacts.map(([label, value]) => (
                      <tr key={label} className="transition-colors hover:bg-white/[0.02]">
                        <th scope="row" className="w-1/3 px-5 py-3.5 font-semibold text-foreground">
                          {label}
                        </th>
                        <td className="px-5 py-3.5 text-muted-foreground">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* How It Works */}
      <Section className="border-b border-white/[0.06] py-10 sm:py-14">
        <Container>
          <div className="mx-auto max-w-4xl">
            <SectionHeader
              eyebrow="How It Works"
              title="How Do I Get My IPTV Free Trial?"
              subtitle={`Getting the TryIPTV free trial takes three steps and has no payment step at all: tap Start My Free Trial to message us on WhatsApp, receive your login details there (usually within ${T.activationTime}), then sign in on your IPTV player. Your ${FACT_TEXT.trialHours} hours begin at activation.`}
            />
            <p className="mb-6 text-base leading-7 text-muted-foreground">
              New to this kind of TV? Start with{" "}
              <Link href="/guides/what-is-iptv" className={link}>
                what IPTV is and how it works
              </Link>
              .
            </p>

            <ol className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {steps.map((s) => (
                <li key={s.step} className="rounded-lg border border-white/[0.09] bg-card p-5">
                  <span className="font-mono text-xs font-bold text-primary">{s.step}</span>
                  <h3 className="mt-2 font-headline text-lg font-extrabold text-foreground">{s.title}</h3>
                  <p className="mt-2 text-base sm:text-sm leading-6 text-muted-foreground">{s.desc}</p>
                </li>
              ))}
            </ol>

            <GuideScreenshot
              src="/images/free-trial/how-to-get-iptv-free-trial-3-steps.webp"
              alt="TryIPTV free trial in 3 steps: message on WhatsApp, get your login in 5–15 minutes, watch for 24 hours"
              caption="The free trial in 3 steps: request on WhatsApp, get your login, watch for 24 hours."
              width={1280}
              height={740}
              sizes="(max-width: 896px) calc(100vw - 2rem), 896px"
              /* Phones already see the same three steps as cards just above; the graphic's
                 small print only reads well from tablet width, and display:none skips the download. */
              className="mt-8 hidden md:block"
            />

            <p className="mt-6 rounded-lg border border-white/[0.08] bg-card/60 p-4 text-base sm:text-sm leading-6 text-muted-foreground">
              Login details are usually quick, but not always instant. Trials are sent during support hours,{" "}
              {COMPANY.support.hours}; a request sent outside them is answered when support reopens. If nothing has arrived{" "}
              {T.activationTime} after your request, reply in the same WhatsApp chat, then follow the{" "}
              <Link href="/setup" className={link}>
                setup guide
              </Link>{" "}
              for your device. The full path from trial to paid plan is on{" "}
              <Link href="/how-it-works" className={link}>
                how TryIPTV works
              </Link>
              . TryIPTV is run by {COMPANY.legalName} ({COMPANY.location}, operating since{" "}
              {COMPANY.foundingYear}), which sells its own subscriptions and issues the logins itself.
            </p>
          </div>
        </Container>
      </Section>

      {/* Make The Most Of It */}
      <Section variant="alt" className="border-b border-white/[0.06] bg-[#070a08] py-10 sm:py-14">
        <Container>
          <div className="mx-auto max-w-4xl">
            <SectionHeader
              eyebrow="Make The Most Of It"
              title="How Should I Test IPTV During the 24 Hours?"
              subtitle="Test IPTV the way your household actually watches TV: on your own devices, over your own internet connection, during the busy evening hours. Check your must-have channels, live sports, picture quality, channel switching, on-demand playback and the TV guide."
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {testingTips.map((t) => (
                <div key={t.title} className="rounded-lg border border-white/[0.09] bg-card p-5">
                  <h3 className="font-headline text-lg font-extrabold text-foreground">{t.title}</h3>
                  <p className="mt-2 text-base sm:text-sm leading-6 text-muted-foreground">{t.text}</p>
                </div>
              ))}
            </div>

            <h3 className="mt-10 mb-4 font-headline text-xl font-extrabold text-foreground">Full Trial Testing Checklist</h3>
            <div className="overflow-hidden rounded-lg border border-white/[0.09] bg-card">
              <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Trial testing checklist table">
                <table className="w-full min-w-[32rem] text-left text-[15px] sm:text-sm">
                  <caption className="sr-only">Trial testing priorities and checklist</caption>
                  <thead className="border-b border-white/[0.09] bg-white/[0.02] text-xs font-extrabold uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th scope="col" className="w-1/3 px-5 py-3 text-primary">What to Test</th>
                      <th scope="col" className="px-5 py-3">What to Check</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.06]">
                    {testingChecklist.map(([item, check]) => (
                      <tr key={item} className="transition-colors hover:bg-white/[0.02]">
                        <th scope="row" className="px-5 py-3.5 font-semibold text-foreground align-top">
                          {item}
                        </th>
                        <td className="px-5 py-3.5 text-muted-foreground">{check}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <p className="mt-6 text-base leading-7 text-muted-foreground">
              Want the deeper walkthrough? Read{" "}
              <Link href="/guides/iptv-internet-speed" className={link}>
                how much internet speed IPTV needs
              </Link>{" "}
              and the{" "}
              <Link href="/help/iptv-buffering" className={link}>
                buffering guide
              </Link>{" "}
              if streams stutter during your test.
            </p>
          </div>
        </Container>
      </Section>

      {/* Trial length */}
      <Section className="border-b border-white/[0.06] py-10 sm:py-14">
        <Container>
          <div className="mx-auto max-w-4xl">
            <SectionHeader
              title="24 hours, 48 hours or 72 hours: how long an IPTV free trial should be"
              subtitle={`Most IPTV free trials are advertised as 24h, 48h or 72h. Ours is a 24-hour IPTV test of the full service, with the same ${T.connections} connections as a paid plan.`}
            />

            <ul className="mb-6 space-y-2 text-base leading-7 text-muted-foreground">
              {[
                "One evening answers what decides a purchase: your player takes the login, your channels are there, streams hold at peak time and support replies.",
                "A 48-hour trial adds a second evening.",
                "A 72-hour IPTV trial, sometimes sold as a 3-day IPTV free trial, adds a weekend of live sport.",
              ].map((point, i) => (
                // Points 2-3 describe other providers' 48h/72h trials, not TryIPTV's: check:facts skips them.
                <li key={point} className="flex items-start gap-2.5" data-facts-ignore={i > 0 ? "" : undefined}>
                  <Check className="mt-1.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="overflow-hidden rounded-lg border border-white/[0.09] bg-card">
              <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Free trial length comparison table">
                <table className="w-full min-w-[640px] text-left text-[15px] sm:text-sm">
                  <caption className="sr-only">What a 24-hour, 48-hour and 72-hour IPTV free trial lets you test</caption>
                  <thead className="border-b border-white/[0.09] bg-white/[0.02] text-xs font-extrabold uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th scope="col" className="px-5 py-3 text-primary">Trial length</th>
                      <th scope="col" className="px-5 py-3">What it lets you test</th>
                      <th scope="col" className="px-5 py-3">What it does not tell you</th>
                      <th scope="col" className="px-5 py-3">Typical offer</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.06]">
                    {trialLengthRows.map(([length, tests, misses, offer]) => (
                      <tr key={length} className="transition-colors hover:bg-white/[0.02]">
                        <th scope="row" className="whitespace-nowrap px-5 py-3.5 font-semibold text-foreground align-top">
                          {length}
                        </th>
                        <td className="px-5 py-3.5 text-muted-foreground align-top">{tests}</td>
                        <td className="px-5 py-3.5 text-muted-foreground align-top">{misses}</td>
                        <td className="px-5 py-3.5 text-muted-foreground align-top">{offer}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <p className="mt-6 text-base leading-7 text-muted-foreground">
              If you only watch live sport at weekends, request the trial on a Thursday or Friday so the 24 hours land on the days you
              watch.
            </p>
            <p className="mt-3 text-base leading-7 text-muted-foreground">
              Need longer than 24 hours to decide? The <Link href="/pricing" className={link}>1-month plan</Link> is{" "}
              {FACT_TEXT.fromPrice} and does not renew. Read the <Link href="/refund-policy" className={link}>refund policy</Link>{" "}
              first: refunds apply only when TryIPTV cannot provide a working subscription.
            </p>
          </div>
        </Container>
      </Section>

      {/* After The Trial */}
      <Section className="border-b border-white/[0.06] py-10 sm:py-14">
        <Container>
          <div className="mx-auto max-w-4xl">
            <SectionHeader
              eyebrow="After The Trial"
              title="What Do IPTV Plans Cost After Your Free Trial?"
              subtitle={`If the trial convinces you, TryIPTV plans cost ${FACT_TEXT.priceList}. Every plan includes ${T.connections} simultaneous connections, there is no contract, and nothing renews automatically.`}
            />

            <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {T.plans.map((p) => {
                const best = p.duration === bestValue;
                return (
                  <li
                    key={p.duration}
                    className={`relative rounded-lg border bg-card p-5 ${best ? "border-primary/50" : "border-white/[0.09]"}`}
                  >
                    {best && (
                      <span className="absolute -top-2.5 left-4 rounded-full bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground">
                        Best value
                      </span>
                    )}
                    <p className="text-sm font-semibold text-muted-foreground">{p.duration}</p>
                    <p className="mt-1 font-headline text-3xl font-extrabold text-foreground">{usd(p.price)}</p>
                    <p className="mt-1 text-base sm:text-sm text-muted-foreground">
                      {p.monthlyEquivalent === p.price ? "One-time payment, no contract" : `About ${usd(p.monthlyEquivalent)} per month`}
                    </p>
                  </li>
                );
              })}
            </ul>

            <p className="mt-6 text-base leading-7 text-muted-foreground">
              Every plan includes the service you tested: {T.channels} live channels, {T.vod} movies and shows, HD and 4K where available,
              the TV guide, and {T.connections} simultaneous connections.
              {COMPANY.paymentMethods ? ` Payment is by ${COMPANY.paymentMethods},` : ""} and your login details are typically delivered
              within {T.activationTime} after payment is confirmed. Compare every option on the{" "}
              <Link href="/pricing" className={link}>
                pricing page
              </Link>
              , or read{" "}
              <Link href="/guides/iptv-vs-cable" className={link}>
                IPTV vs cable
              </Link>{" "}
              for the cost comparison.
            </p>

            <h3 className="mt-10 mb-4 font-headline text-xl font-extrabold text-foreground">Free Trial vs. Paid Subscription</h3>
            <div className="overflow-hidden rounded-lg border border-white/[0.09] bg-card">
              <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Free trial vs paid plan table">
                <table className="w-full text-left text-[15px] sm:text-sm">
                  <caption className="sr-only">Comparison between free trial and paid subscription plans</caption>
                  <thead className="border-b border-white/[0.09] bg-white/[0.02] text-xs font-extrabold uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th scope="col" className="px-5 py-3">Feature</th>
                      <th scope="col" className="px-5 py-3 text-primary">24-Hour Free Trial</th>
                      <th scope="col" className="px-5 py-3">Paid Subscription Plans</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.06]">
                    {planComparisonRows.map(([feature, trial, paid]) => (
                      <tr key={feature} className="transition-colors hover:bg-white/[0.02]">
                        <th scope="row" className="px-5 py-3.5 font-semibold text-foreground">
                          {feature}
                        </th>
                        <td className="px-5 py-3.5 text-muted-foreground">{trial}</td>
                        <td className="px-5 py-3.5 text-muted-foreground">{paid}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Why TryIPTV */}
      <Section variant="alt" className="border-b border-white/[0.06] bg-[#070a08] py-10 sm:py-14">
        <Container>
          <div className="mx-auto max-w-4xl">
            <SectionHeader
              eyebrow="Why TryIPTV"
              title="Why Trust TryIPTV for Your Free Trial?"
              subtitle="Because the trial is real: you can start it today, and because we never collect a payment method for the trial, we could not auto-charge you even if we wanted to. When the 24 hours end, the next move is entirely yours."
            />
            <p className="text-base leading-7 text-muted-foreground">
              If you buy a plan later, our{" "}
              <Link href="/refund-policy" className={link}>
                refund policy
              </Link>{" "}
              explains in plain language when a refund is possible: {T.refund.summary.charAt(0).toLowerCase() + T.refund.summary.slice(1)}
            </p>

            <ul className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {trustStats.map(([value, label]) => (
                <li key={label} className="rounded-lg border border-white/[0.09] bg-card p-5 text-center">
                  <span className="block font-headline text-3xl font-extrabold text-primary">{value}</span>
                  <span className="mt-1 block text-base sm:text-sm text-muted-foreground">{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Device and Player Setup Guides */}
      <Section className="border-b border-white/[0.06] py-10 sm:py-14">
        <Container>
          <div className="mx-auto max-w-4xl">
            <SectionHeader
              eyebrow="Setup Guides"
              title="Device and Player Setup Guides"
              subtitle="Set up your player before you request the trial, so all 24 hours go to testing. Follow the guide for your device or player app."
            />

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <h3 className="mb-4 font-headline text-lg font-extrabold text-foreground">Device Setup Guides</h3>
                <div className="space-y-3">
                  {deviceGuides.map((d) => (
                    <Link
                      key={d.name}
                      href={d.href}
                      className="group block rounded-lg border border-white/[0.09] bg-card p-4 transition-colors hover:border-primary/40"
                    >
                      <p className="font-headline text-base sm:text-sm font-bold text-foreground group-hover:text-primary">
                        {d.name} <ArrowRight className="ml-1 inline h-3.5 w-3.5" />
                      </p>
                      <p className="mt-1 text-base sm:text-xs leading-5 text-muted-foreground">{d.note}</p>
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-4 font-headline text-lg font-extrabold text-foreground">Player Setup Guides</h3>
                <div className="space-y-3">
                  {playerGuides.map((p) => (
                    <Link
                      key={p.name}
                      href={p.href}
                      className="group block rounded-lg border border-white/[0.09] bg-card p-4 transition-colors hover:border-primary/40"
                    >
                      <p className="font-headline text-base sm:text-sm font-bold text-foreground group-hover:text-primary">
                        {p.name} <ArrowRight className="ml-1 inline h-3.5 w-3.5" />
                      </p>
                      <p className="mt-1 text-base sm:text-xs leading-5 text-muted-foreground">{p.note}</p>
                    </Link>
                  ))}
                </div>

                <h3 className="mt-8 mb-4 font-headline text-lg font-extrabold text-foreground">Trouble During Your Trial?</h3>
                <div className="space-y-3">
                  {troubleshootingLinks.map((t) => (
                    <div key={t.issue} className="rounded-lg border border-white/[0.09] bg-card p-4">
                      {/* Touch: block-level flex link so tap-target's padding/margin pair cancels exactly. */}
                      <p className="text-xs font-semibold text-muted-foreground pointer-coarse:mb-[5px]">{t.issue}</p>
                      <Link
                        href={t.href}
                        className="tap-target inline-flex pointer-fine:mt-1 pointer-coarse:flex pointer-coarse:w-fit items-center gap-1 text-sm font-bold text-primary hover:underline"
                      >
                        {t.label} <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* What we test before you pay */}
      <Section className="border-b border-white/[0.06] py-10 sm:py-14">
        <Container>
          <div className="mx-auto max-w-4xl">
            <SectionHeader
              title="What we test before you pay"
              subtitle="Every trial request goes through the same check on our side before we send credentials. These are the two screens we look at, and the list we run through. It takes a few minutes and it is the reason most trials work on the first login."
            />

            {proofScreens.length > 0 && (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {proofScreens.map((screen) => (
                  <GuideScreenshot
                    key={screen.src}
                    src={screen.src}
                    alt={screen.alt}
                    caption={screen.caption}
                    // TODO: set the screenshots' intrinsic dimensions once the files are added.
                    width={1600}
                    height={900}
                    sizes="(max-width: 768px) calc(100vw - 2rem), 440px"
                    className="my-0"
                  />
                ))}
              </div>
            )}

            <h3 className="mt-8 mb-4 font-headline text-xl font-extrabold text-foreground">The checklist we run before sending credentials</h3>
            <ul className="space-y-2.5 text-base sm:text-sm leading-6 text-muted-foreground">
              {preSendChecklist.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-base leading-7 text-muted-foreground">
              If something fails this list, you hear it from us before you hear it from your TV. That is the whole point of a trial.
            </p>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section variant="alt" className="border-b border-white/[0.06] bg-[#070a08] py-10 sm:py-14">
        <Container>
          <div className="mx-auto max-w-4xl">
            <SectionHeader
              eyebrow="Questions & Answers"
              title="IPTV Free Trial FAQ"
              subtitle="Quick, self-contained answers to the questions people ask most often before starting an IPTV free trial."
            />

            <div className="overflow-hidden rounded-lg border border-white/[0.08] bg-[#07080a]">
              {trialFaqs.map((faq) => (
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
              Need help with a specific issue?{" "}
              <Link href="/contact-us" className={link}>
                Contact support
              </Link>
              .
            </p>
          </div>
        </Container>
      </Section>

      {/* Final CTA */}
      <Section className="py-10 sm:py-14">
        <Container>
          <div className="mx-auto max-w-4xl overflow-hidden rounded-lg border border-primary/25 bg-[#0b100d] p-7 text-center sm:p-9">
            <h2 className="font-headline text-2xl font-extrabold text-foreground sm:text-3xl">Start Your Free IPTV Trial Tonight</h2>
            <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-muted-foreground">
              {FACT_TEXT.trialHours} hours to test TryIPTV on the devices you own. No credit card, no auto-renew, no catch. If the service
              earns your {FACT_TEXT.fromPrice}, keep it. If not, walk away owing nothing.
            </p>
            <p className="mx-auto mt-3 max-w-xl text-base sm:text-sm leading-6 text-muted-foreground">
              Request the free trial on WhatsApp: TryIPTV sends your login details in the same chat, usually within {T.activationTime},
              and no credit card is needed.
            </p>
            <div className="mt-6">
              <TrialButtons uppercase />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
