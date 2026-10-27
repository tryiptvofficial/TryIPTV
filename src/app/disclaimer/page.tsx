import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { PageSchema } from "@/components/shared/Schema";
import { Button } from "@/components/ui/button";
import { generateBreadcrumbSchema } from "@/lib/schema";
import { siteConfig, generateMetadata as generatePageMetadata } from "@/lib/site-config";
import { PAGE_LAST_MODIFIED, formatLegalDate } from "@/lib/site-data/page-modifications";
import { COMPANY } from "@/lib/site-data/company";

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title: "Legal Disclaimer: IPTV Use, Trademarks & Copyright",
    description: "Read the TryIPTV legal disclaimer: IPTV as lawful technology, trademarks, user responsibility, copyright (DMCA) reports, and why this is not legal advice.",
    canonical: "/disclaimer",
  });
}

const h2 = "font-headline text-xl sm:text-2xl font-bold text-foreground scroll-mt-0";
const h3 = "font-headline text-lg font-semibold text-foreground";
const link = "text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary";
const callout = "rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 text-base sm:text-sm";

const nav = [
  { id: "general-notice", label: "General Disclaimer" },
  { id: "intellectual-property", label: "Intellectual Property" },
  { id: "user-responsibility", label: "User Responsibility" },
  { id: "dmca-concerns", label: "Copyright Concerns (DMCA)" },
  { id: "no-legal-advice", label: "No Legal Advice" },
  { id: "contact-us", label: "Contact Us" },
];

export default function DisclaimerPage() {
  const baseUrl = siteConfig.url;

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", item: `${baseUrl}/` },
    { name: "Disclaimer", item: `${baseUrl}/disclaimer` },
  ]);

  return (
    <>
      <PageSchema path="/disclaimer" name="Legal Disclaimer: IPTV Use, Trademarks & Copyright" type="WebPage" nodes={[breadcrumbSchema]} />

      <Section className="relative overflow-hidden border-b border-white/[0.07] pt-12 pb-14 sm:pt-16 sm:pb-20">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
        <Container className="relative text-center">
          <Breadcrumb items={[{ label: "Disclaimer" }]} align="center" />
          <SectionHeader
            as="h1"
            eyebrow="TryIPTV"
            title="Legal Disclaimer"
            subtitle="Important legal information regarding IPTV technology, intellectual property, user responsibility, DMCA concerns, and general website use."
          />
        </Container>
      </Section>

      <Section className="py-12 sm:py-16">
        <Container className="max-w-4xl">
          <div className="space-y-10 text-base leading-relaxed text-muted-foreground">
            <p className="text-xs font-semibold text-primary">Last updated: {formatLegalDate(PAGE_LAST_MODIFIED["/disclaimer"])}</p>

            <nav aria-labelledby="disclaimer-nav" className={callout}>
              <p id="disclaimer-nav" className="font-semibold text-foreground">Quick Navigation</p>
              <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
                {nav.map((n) => (
                  <li key={n.id}>
                    <a href={`#${n.id}`} className={`tap-target ${link}`}>{n.label}</a>
                  </li>
                ))}
              </ul>
            </nav>

            <section className="space-y-3">
              <h2 id="general-notice" className={h2}>General Disclaimer</h2>
              <p>
                IPTV (Internet Protocol Television) is a lawful technology used to deliver television content over IP networks, similar to other mainstream
                streaming services.
              </p>
              <p>
                We do not host, stream, or rebroadcast television channels, movies, or shows on our own servers. {COMPANY.businessModel}
              </p>
              <p className={callout}>
                <strong className="text-foreground">Important:</strong> Use of any IPTV service must always comply with the laws and regulations
                that apply in the user&apos;s own region or country.
              </p>
            </section>

            <section className="space-y-3">
              <h2 id="intellectual-property" className={h2}>Intellectual Property</h2>
              <p>
                All trademarks, logos, service marks, brand names, and other identifying marks displayed on this website are the property of
                their respective owners.
              </p>
              <p>
                Any reference to such marks is provided strictly for identification, compatibility, and descriptive purposes only and does not
                imply any affiliation, endorsement, sponsorship, or partnership with TryIPTV.
              </p>
            </section>

            <section className="space-y-3">
              <h2 id="user-responsibility" className={h2}>User Responsibility</h2>
              <p>
                It is the sole responsibility of the user to ensure that their use of any IPTV service complies with all applicable copyright,
                licensing, and broadcasting laws in their jurisdiction.
              </p>
              <h3 className={h3}>User Obligations</h3>
              <ul className="list-disc space-y-1.5 pl-5">
                <li>Verify whether IPTV usage is permitted under local law</li>
                <li>Ensure any content accessed is lawful in their region</li>
                <li>Use services in compliance with all applicable rules and regulations</li>
              </ul>
              <p className={callout}>
                <strong className="text-foreground">Notice:</strong> TryIPTV is not responsible for misuse of services, unauthorized access, or
                any legal violations committed by end users.
              </p>
            </section>

            <section className="space-y-3">
              <h2 id="dmca-concerns" className={h2}>Copyright Concerns (DMCA)</h2>
              <p>
                We respect the intellectual property rights of content owners. If you believe that any material accessible through third-party
                IPTV providers infringes your copyright, please submit a notice through our official{" "}
                <Link href="/dmca-report" className={link}>DMCA Report Page</Link>.
              </p>
              <p>We review all legitimate requests promptly and cooperate with rights holders where appropriate.</p>
              <p className={callout}>
                <strong className="text-foreground">DMCA Reporting:</strong> To speed up review, provide clear details about the copyrighted work
                and the allegedly infringing material.
              </p>
            </section>

            <section className="space-y-3">
              <h2 id="no-legal-advice" className={h2}>No Legal Advice</h2>
              <p>
                The information provided on this website is for general informational purposes only and does not constitute legal advice, legal
                opinion, or legal representation.
              </p>
              <p>
                For any legal concerns or questions regarding copyright, broadcasting, licensing, or IPTV use, you should consult a qualified legal
                professional in your jurisdiction.
              </p>
            </section>

            <section className="space-y-4">
              <h2 id="contact-us" className={h2}>Contact Us</h2>
              <p>For legal or general inquiries, please contact our team using the options below.</p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild>
                  <Link href="/contact-us">Contact Page</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/help">Help Center</Link>
                </Button>
              </div>
            </section>
          </div>
        </Container>
      </Section>
    </>
  );
}
