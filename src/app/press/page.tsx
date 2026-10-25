import type { Metadata } from "next";
import Image from "next/image";
import { blurProps } from "@/lib/image-blur";
import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { PageSchema } from "@/components/shared/Schema";
import { Confirm } from "@/components/shared/Confirm";
import { AUTHORS } from "@/lib/site-data/authors";
import { generateBreadcrumbSchema } from "@/lib/schema";
import { PRODUCT_TRUTHS, FACT_TEXT, siteConfig, generateMetadata as generatePageMetadata } from "@/lib/site-config";
import { BRAND } from "@/lib/site-data/brand";
import { COMPANY } from "@/lib/site-data/company";
import { publicBrandSocialLinks } from "@/lib/site-data/socials";

const title = "TryIPTV Press Kit: Fact Sheet, Logos & Media Contact";
const description =
  "TryIPTV press kit: company boilerplate, key facts, plans and pricing, official logos, real setup screenshots and the media contact for press enquiries.";
const canonical = "/press";

export function generateMetadata(): Metadata {
  // Title tag and og:title only; the H1 and Article headline keep the longer wording.
  const metaTitle = "Press Kit: Fact Sheet, Logos & Media Contact";
  return { ...generatePageMetadata({ title: metaTitle, description, canonical }), title: { absolute: `${metaTitle} | TryIPTV` } };
}

const link = "font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary";
const h2 = "font-headline text-xl font-bold text-foreground sm:text-2xl";

// Real screenshots taken on devices (no stock or AI images). Credentials are not visible.
const screenshots = [
  { src: "/images/firestick/settings-home.jpeg", alt: "Fire TV Settings home screen", caption: "Fire TV: Settings, first step of the Firestick setup guide" },
  { src: "/images/firestick/install-unknown-apps-downloader-on.jpeg", alt: "Fire TV Install unknown apps screen with Downloader turned on", caption: "Fire TV: allowing Downloader to install apps" },
  { src: "/images/tivimate/xtream-codes-login.jpeg", alt: "TiviMate Xtream Codes login screen", caption: "TiviMate: Xtream Codes login" },
  { src: "/images/tivimate/epg-tv-guide.webp", alt: "TiviMate TV guide (EPG) grid", caption: "TiviMate: TV guide (EPG) loaded" },
];

const logos = [
  { file: BRAND.logos.primary, label: "Primary logo with wordmark", size: "1024 × 1024 PNG" },
  { file: BRAND.logos.symbol, label: "Symbol only", size: "1024 × 1024 PNG" },
  { file: BRAND.logos.icon, label: "App icon", size: "512 × 512 PNG" },
];

export default function PressPage() {
  const base = siteConfig.url;
  const mediaEmail = COMPANY.support.pressEmail ?? COMPANY.support.email;
  const mediaPerson = COMPANY.team.find((m) => m.name === COMPANY.support.mediaContact);
  const mediaProfile = AUTHORS.find((a) => a.name === COMPANY.support.mediaContact);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", item: `${base}/` },
    { name: "Press", item: `${base}${canonical}` },
  ]);

  const facts: [string, React.ReactNode][] = [
    ["Name", <>{BRAND.name} (one word; the logo wordmark reads &ldquo;{BRAND.alternateName}&rdquo;)</>],
    ["Tagline", BRAND.tagline],
    ["Website", <a key="w" href={base} className={link}>www.tryiptv.com</a>],
    ["What it is", "An IPTV service: live TV and on-demand video, watched on the customer's own devices through compatible IPTV player apps. TryIPTV does not make the player apps."],
    ["Catalogue", `${PRODUCT_TRUTHS.channels} live channels and ${PRODUCT_TRUTHS.vod} movies and TV shows`],
    ["Plans", `${FACT_TEXT.priceList}; paid once, no automatic renewal`],
    ["Connections", `${PRODUCT_TRUTHS.connections} simultaneous streams on every plan`],
    ["Free trial", `${FACT_TEXT.trialHours} hours, $0, no credit card`],
    ["Login formats", "Xtream Codes and M3U playlist"],
    ["Supported devices", "Fire TV, Android TV and Google TV, Samsung and LG smart TVs, Apple TV, iPhone and iPad, Windows, Mac, MAG boxes; Roku via AirPlay or screen mirroring"],
    ["Support", `WhatsApp ${COMPANY.support.whatsappDisplay} and ${COMPANY.support.email}`],
    ["Founded", COMPANY.foundingYear ?? <Confirm key="f" value={null} question="Year TryIPTV started (company.ts foundingYear)." />],
    ["Operator", COMPANY.legalName ?? <Confirm key="o" value={null} question="Legal name of the operator (company.ts legalName)." />],
    ["Based in", COMPANY.location ?? <Confirm key="l" value={null} question="Location to publish (company.ts location)." />],
  ];

  return (
    <>
      <PageSchema path="/press" name={title} description={description} nodes={[breadcrumbSchema]} />
      <Section className="relative overflow-hidden border-b border-white/[0.07] pt-12 pb-14 sm:pt-16 sm:pb-20">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
        <Container className="relative text-center">
          <Breadcrumb items={[{ label: "Press" }]} align="center" />
          <SectionHeader
            as="h1"
            eyebrow="Press Kit"
            title="TryIPTV Press Kit and Fact Sheet"
            subtitle="Company facts, official logos, real product screenshots and a media contact, in one place."
          />
        </Container>
      </Section>

      <Section className="py-12 sm:py-16">
        <Container className="max-w-3xl">
          <div className="space-y-12 text-base leading-7 text-muted-foreground">
            <section className="space-y-3">
              <h2 className={h2}>About TryIPTV</h2>
              <p>{BRAND.description}</p>
              <p className="text-sm">
                This boilerplate may be quoted as-is. Please write the name as <strong className="text-foreground">{BRAND.name}</strong>{" "}
                and link to <a href={base} className={link}>www.tryiptv.com</a>.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className={h2}>Key facts</h2>
              <div className="overflow-hidden rounded-xl border border-white/[0.07] bg-card">
                <table className="w-full text-left text-sm">
                  <caption className="sr-only">TryIPTV key facts</caption>
                  <tbody className="divide-y divide-white/[0.06]">
                    {facts.map(([k, v]) => (
                      <tr key={k}>
                        <th scope="row" className="w-1/3 px-5 py-3 align-top font-semibold text-foreground">{k}</th>
                        <td className="px-5 py-3">{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm">
                Full details: <Link href="/pricing" className={link}>plans and pricing</Link>,{" "}
                <Link href="/iptv-free-trial" className={link}>free trial terms</Link>,{" "}
                <Link href="/refund-policy" className={link}>refund policy</Link> and{" "}
                <Link href="/about" className={link}>about TryIPTV</Link>.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className={h2}>Logos and colours</h2>
              <p>Use the logos unaltered on a dark background. Do not recolour, stretch or add effects.</p>
              <ul className="grid gap-4 sm:grid-cols-3">
                {logos.map((l) => (
                  <li key={l.file} className="rounded-xl border border-white/[0.07] bg-card p-4">
                    <Image src={l.file} alt={`${BRAND.name} ${l.label.toLowerCase()}`} width={160} height={160} className="mx-auto h-24 w-24 rounded-lg" />
                    <p className="mt-3 text-sm font-semibold text-foreground">{l.label}</p>
                    <p className="text-xs">{l.size}</p>
                    <a href={l.file} download className={`${link} text-sm`}>Download</a>
                  </li>
                ))}
              </ul>
              <p className="text-sm">
                Colours: primary green <code>{BRAND.colors.primary}</code>, background <code>{BRAND.colors.background}</code>.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className={h2}>Product screenshots</h2>
              <p>Real screenshots from our Firestick and TiviMate setup guides. Login details are not shown.</p>
              <ul className="grid gap-5 sm:grid-cols-2">
                {screenshots.map((s) => (
                  <li key={s.src}>
                    <a href={s.src} download className="block overflow-hidden rounded-lg border border-white/[0.07]">
                      <Image src={s.src} alt={s.alt} width={640} height={360} className="h-auto w-full" sizes="(min-width: 640px) 352px, 100vw" {...blurProps(s.src)} />
                    </a>
                    <p className="mt-2 text-sm">{s.caption}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className={h2}>Media contact</h2>
              <p>
                For press and media enquiries, contact{" "}
                <span
                  dangerouslySetInnerHTML={{
                    __html: `<!--email_off--><a href="mailto:${mediaEmail}" class="${link}">${mediaEmail}</a><!--/email_off-->`,
                  }}
                />
                .
              </p>
              {mediaPerson && (
                <p>
                  Media contact:{" "}
                  {mediaProfile ? (
                    <Link href={`/authors/${mediaProfile.slug}`} className={link}>{mediaPerson.name}</Link>
                  ) : (
                    mediaPerson.name
                  )}
                  , {mediaPerson.role} at TryIPTV.
                </p>
              )}
              <Confirm value={COMPANY.support.pressEmail} question="A real, monitored press inbox (e.g. press@tryiptv.com) and the name of a media contact who can be quoted." />
              {publicBrandSocialLinks.length > 0 && (
                <p>
                  Official profiles:{" "}
                  {publicBrandSocialLinks.map((s, i) => (
                    <span key={s}>{i ? ", " : ""}<a href={s} className={link} target="_blank" rel="noopener noreferrer">{new URL(s).hostname.replace("www.", "")}</a></span>
                  ))}
                  .
                </p>
              )}
            </section>
          </div>
        </Container>
      </Section>
    </>
  );
}
