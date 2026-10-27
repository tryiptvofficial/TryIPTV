import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { PageSchema } from "@/components/shared/Schema";
import { generateBreadcrumbSchema } from "@/lib/schema";
import { siteConfig, generateMetadata as generatePageMetadata } from "@/lib/site-config";
import { PAGE_LAST_MODIFIED, formatLegalDate } from "@/lib/site-data/page-modifications";
import { COMPANY } from "@/lib/site-data/company";

export function generateMetadata(): Metadata {
  return {
    ...generatePageMetadata({
      title: "Privacy Policy: How We Collect & Protect Data",
      description: "Read how TryIPTV collects, uses, and protects your contact details and support messages, why payments run through external providers, and how to reach us.",
      canonical: "/privacy-policy",
    }),
    title: { absolute: "Privacy Policy: How We Collect & Protect Data | TryIPTV" },
  };
}

const h2 = "font-headline text-xl sm:text-2xl font-bold text-foreground";
const h3 = "font-headline text-lg font-semibold text-foreground";
const link = "text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary";

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2">
          <Check className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Bullets({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="list-disc space-y-1.5 pl-5">
      {items.map((item, i) => <li key={i}>{item}</li>)}
    </ul>
  );
}

export default function PrivacyPolicyPage() {
  const baseUrl = siteConfig.url;
  const email = COMPANY.support.email;

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", item: `${baseUrl}/` },
    { name: "Privacy Policy", item: `${baseUrl}/privacy-policy` },
  ]);

  const emailLink = (
    <span
      dangerouslySetInnerHTML={{
        __html: `<!--email_off--><a href="mailto:${email}" class="${link}">${email}</a><!--/email_off-->`,
      }}
    />
  );

  return (
    <>
      <PageSchema path="/privacy-policy" name="Privacy Policy: How TryIPTV Collects & Protects Data" type="WebPage" nodes={[breadcrumbSchema]} />

      <Section className="relative overflow-hidden border-b border-white/[0.07] pt-12 pb-14 sm:pt-16 sm:pb-20">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
        <Container className="relative text-center">
          <Breadcrumb items={[{ label: "Privacy Policy" }]} align="center" />
          <SectionHeader
            as="h1"
            eyebrow="TryIPTV"
            title="Privacy Policy: Protecting Your Data & Security"
            subtitle="Your Data, Handled with Care"
          />
        </Container>
      </Section>

      <Section className="py-12 sm:py-16">
        <Container className="max-w-4xl">
          <div className="space-y-10 text-base leading-relaxed text-muted-foreground">
            <div className="space-y-3">
              <p className="text-xs font-semibold text-primary">Last updated: {formatLegalDate(PAGE_LAST_MODIFIED["/privacy-policy"])}</p>
              <p>
                Welcome to TryIPTV&apos;s Privacy Policy, where we prioritize the protection of your personal data. This policy outlines how we
                collect, use, store, and protect your information when you access our IPTV streaming services.
              </p>
              {COMPANY.legalName && (
                <p>
                  TryIPTV is operated by {COMPANY.legalName}{COMPANY.location ? ` (${COMPANY.location})` : ""}, which is responsible for the
                  personal data described in this policy.
                </p>
              )}
              <p>
                By using TryIPTV, you agree to our privacy practices as outlined below. If you have any concerns, feel free to contact us. For
                more details, visit our <Link href="/terms-conditions" className={link}>Terms and Conditions</Link>.
              </p>
            </div>

            <section className="space-y-4">
              <h2 className={h2}>1. What Data We Collect</h2>
              <p>To enhance your IPTV experience, we collect various types of data.</p>
              <h3 className={h3}>Personal Data</h3>
              <p>When using our Service, you may provide:</p>
              <Bullets
                items={[
                  "Email Address (for customer support & updates)",
                  "Phone Number (for quick customer support)",
                  "First & Last Name (for account security)",
                  "Cookies & Tracking Data (for performance monitoring)",
                ]}
              />
              <h3 className={h3}>Usage Data</h3>
              <p>Additionally, we track:</p>
              <Bullets
                items={[
                  "Your IP Address & Location Data",
                  "Device Information & Browser Type",
                  "Time Spent on Pages & Click Patterns",
                  "User Preferences for Better Streaming",
                ]}
              />
              <h3 className={h3}>Cookies & Tracking Technologies</h3>
              <p>To improve performance, we use cookies, beacons, and tracking scripts to:</p>
              <CheckList
                items={["Optimize your streaming experience", "Provide personalized content", "Enhance security and fraud detection"]}
              />
              <p>You can disable cookies in your browser settings, but some features may be affected.</p>
            </section>

            <section className="space-y-4">
              <h2 className={h2}>2. Why We Collect Your Data</h2>
              <p>We use your information to:</p>
              <CheckList
                items={[
                  "Ensure smooth IPTV streaming",
                  "Improve platform performance",
                  "Enhance security against cyber threats",
                  "Provide timely customer support",
                  "Comply with legal obligations",
                ]}
              />
              <p>We do not sell or share your personal data with third-party advertisers.</p>
            </section>

            <section className="space-y-3">
              <h2 className={h2}>3. How We Store & Transfer Data</h2>
              <p>
                Your personal data is stored securely on encrypted servers, which may be located outside your country, including in the United
                Kingdom. Our strict security protocols ensure that your data remains protected.
              </p>
              <p>
                For more details about GDPR compliance, visit{" "}
                <a href="https://gdpr.eu/" target="_blank" rel="noopener noreferrer" className={link}>GDPR.eu</a>.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className={h2}>4. Data Sharing & Legal Requirements</h2>
              <p>We may disclose your personal data only when necessary, such as:</p>
              <Bullets
                items={[
                  "To comply with legal requests",
                  "To protect TryIPTV against fraud or security threats",
                  "To provide necessary support services",
                ]}
              />
              <p>The service providers we use to run the website and support are:</p>
              <Bullets
                items={[
                  <><strong className="text-foreground">Vercel</strong> (website hosting) and <strong className="text-foreground">Cloudflare</strong> (content delivery and protection, including Turnstile spam checks on forms)</>,
                  <><strong className="text-foreground">Resend</strong> (delivers contact-form messages to our support inbox)</>,
                  <><strong className="text-foreground">WhatsApp</strong> (Meta) for support and order conversations you start there</>,
                  <><strong className="text-foreground">Google Analytics</strong> (aggregate website traffic; sets first-party cookies such as <code>_ga</code>)</>,
                  <><strong className="text-foreground">Sentry</strong> (website error reports, with user-identifying data collection turned off)</>,
                  "Payment providers, who process payments under their own privacy policies; we do not see or store card or bank details",
                ]}
              />
              <p>Your privacy is our priority. Any data shared will be done securely and in compliance with privacy laws.</p>
            </section>

            <section className="space-y-3">
              <h2 className={h2}>5. Security Measures to Protect Your Data</h2>
              <p>
                We implement high-level encryption, firewalls, and monitoring systems to protect your personal information. However, while we
                take every precaution, no method of data transmission is 100% secure.
              </p>
              <p>To enhance your security, we recommend:</p>
              <CheckList items={["Using strong passwords", "Enabling two-factor authentication", "Avoiding public Wi-Fi for IPTV access"]} />
              <p>
                For security best practices, visit{" "}
                <a href="https://www.cisa.gov/" target="_blank" rel="noopener noreferrer" className={link}>
                  Cybersecurity &amp; Infrastructure Security Agency (CISA)
                </a>
                .
              </p>
            </section>

            <section className="space-y-3">
              <h2 className={h2}>6. Third-Party Links & Services</h2>
              <p>
                While using TryIPTV, you may come across links to third-party websites. These external sites have their own privacy policies,
                which we encourage you to review separately.
              </p>
              <p>We are not responsible for the data practices of these third-party platforms.</p>
            </section>

            <section className="space-y-3">
              <h2 className={h2}>7. Children&apos;s Privacy Protection</h2>
              <p>
                TryIPTV is not intended for individuals under 18. We do not knowingly collect personal data from minors. If you believe a child
                has provided us with their information, contact us immediately.
              </p>
              <p>Contact: {emailLink} or our <Link href="/contact-us" className={link}>contact page</Link>.</p>
            </section>

            <section className="space-y-3">
              <h2 className={h2}>8. Updates to This Privacy Policy</h2>
              <p>We may update this Privacy Policy periodically. Any changes will be:</p>
              <CheckList items={["Published on this page", "Communicated via email to registered users", "Announced on our website homepage"]} />
              <p>We recommend checking this page frequently to stay informed.</p>
            </section>

            <section className="space-y-3">
              <h2 className={h2}>9. Contact Us for Privacy Concerns</h2>
              <p>If you have any questions regarding this Privacy Policy, reach out to us:</p>
              <p>Email: {emailLink}</p>
            </section>
          </div>
        </Container>
      </Section>
    </>
  );
}
