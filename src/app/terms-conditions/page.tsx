import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { PageSchema } from "@/components/shared/Schema";
import { Confirm } from "@/components/shared/Confirm";
import { generateBreadcrumbSchema } from "@/lib/schema";
import { PRODUCT_TRUTHS, FACT_TEXT, siteConfig, generateMetadata as generatePageMetadata } from "@/lib/site-config";
import { PAGE_LAST_MODIFIED, formatLegalDate } from "@/lib/site-data/page-modifications";
import { COMPANY } from "@/lib/site-data/company";

export function generateMetadata(): Metadata {
  return {
    ...generatePageMetadata({
      title: "Terms & Conditions: Subscriptions, Payments & Use",
      description: "Read the TryIPTV terms on subscriptions, device connections, one-time payments, and acceptable use. Review them before you start a trial or place an order.",
      canonical: "/terms-conditions",
    }),
  };
}

const h2 = "font-headline text-xl sm:text-2xl font-bold text-foreground";
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

export default function TermsPage() {
  const baseUrl = siteConfig.url;
  const n = PRODUCT_TRUTHS.connections;

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", item: `${baseUrl}/` },
    { name: "Terms & Conditions", item: `${baseUrl}/terms-conditions` },
  ]);

  return (
    <>
      <PageSchema path="/terms-conditions" name="Terms & Conditions: Subscriptions, Payments & Use" type="WebPage" nodes={[breadcrumbSchema]} />

      <Section className="relative overflow-hidden border-b border-white/[0.07] pt-12 pb-14 sm:pt-16 sm:pb-20">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
        <Container className="relative text-center">
          <Breadcrumb items={[{ label: "Terms & Conditions" }]} align="center" />
          <SectionHeader
            as="h1"
            eyebrow="TryIPTV"
            title="Terms & Conditions"
            subtitle="Your Rights & Responsibilities as a Subscriber"
          />
        </Container>
      </Section>

      <Section className="py-12 sm:py-16">
        <Container className="max-w-4xl">
          <div className="space-y-10 text-base leading-relaxed text-muted-foreground">
            <div className="space-y-3">
              <p className="text-xs font-semibold text-primary">Last updated: {formatLegalDate(PAGE_LAST_MODIFIED["/terms-conditions"])}</p>
              <p>
                Welcome to TryIPTV. We provide an online video streaming service that allows users to browse and enjoy a variety of live and
                on-demand programs. By accessing or using our services, you agree to the following Terms and Conditions. Please read them
                carefully.
              </p>
              <p>
                For information on how we handle your data, please review our <Link href="/privacy-policy" className={link}>Privacy Policy</Link>.
              </p>
            </div>

            <section className="space-y-3">
              <h2 className={h2}>1. Changes to the Terms &amp; Conditions</h2>
              <p>
                We reserve the right to modify these Terms and Conditions, including our Privacy Policy, at any time and at our sole discretion.
                Any modifications will become effective immediately upon posting.
              </p>
              <p>
                By continuing to use our Service, you accept these updates. If you disagree with any changes, you should discontinue using the
                platform.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className={h2}>2. Minimum Age Requirement</h2>
              <p>
                To use TryIPTV services, you must be 18 years old or older. By signing up, you confirm that you meet this age requirement.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className={h2}>3. Usage &amp; Service Terms</h2>
              <p>You agree to use our Service legally and responsibly. Unauthorized activities include but are not limited to:</p>
              <Bullets
                items={[
                  "Re-streaming, redistributing, broadcasting, or transmitting content without permission",
                  "Using bots, scripts, or automation to access or interact with our platform",
                  "Circumventing security measures or attempting unauthorized access",
                  `Each subscription is for the number of devices you purchased (${n} simultaneous connections on every plan). Do not use it on more devices at the same time; sharing the same account is not allowed and will lead to suspension without refund.`,
                ]}
              />
              <p>Violating these terms may result in immediate suspension or termination of your access.</p>
            </section>

            <section className="space-y-3">
              <h2 className={h2}>4. Third-Party Purchases</h2>
              <p>
                Any transactions or purchases made through third-party vendors found on our platform, including &quot;click-to-purchase&quot;
                links, are solely between you and the vendor. TryIPTV is not responsible for third-party transactions.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className={h2}>5. Streaming Quality &amp; Performance</h2>
              <p>The quality of your streaming experience depends on multiple factors, including:</p>
              <CheckList
                items={[
                  "Your internet speed and stability",
                  "The capabilities of your device",
                  "The number of devices connected to the same network",
                  "Your geographic location",
                ]}
              />
              <p>
                While we strive to provide high-quality streams, TryIPTV cannot guarantee uninterrupted service due to these external factors.
                Sharing a subscription may lead to account suspension or a device ban.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className={h2}>6. Subscription Payments &amp; Refund Policy</h2>
              <p>
                All subscriptions are one-time purchases. Please review your subscription details before confirming payment. Refunds and
                cancellations are only issued as set out in our <Link href="/refund-policy" className={link}>Refund Policy</Link> or where
                required by law. {PRODUCT_TRUTHS.refund.summary}
              </p>
            </section>

            <section className="space-y-3">
              <h2 className={h2}>7. VPN &amp; Proxy Usage</h2>
              <p>
                Using a VPN or proxy server is permitted when connecting to TryIPTV. However, misuse of VPN services to bypass geographical
                restrictions or violate terms may result in restricted access or account termination.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className={h2}>8. Accuracy of Information</h2>
              <p>
                All information provided to TryIPTV must be accurate, complete, and up to date. You are responsible for keeping your account
                credentials secure. TryIPTV will never request your password. Any unauthorized activity on your account is your responsibility.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className={h2}>9. Device Compatibility</h2>
              <p>
                To access our services, you must use devices that meet our system and compatibility requirements. TryIPTV does not guarantee
                functionality on all devices. Before subscribing, check our <Link href="/devices" className={link}>device setup guides</Link> for
                supported devices.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className={h2}>10. Internet Service &amp; Data Usage</h2>
              <p>
                Users are responsible for any internet or data costs associated with accessing TryIPTV. Your network provider may charge fees
                for high data usage.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className={h2}>11. Subscription Sharing Policy</h2>
              <p>
                Subscriptions cannot be shared between multiple users. Each plan allows {n} simultaneous connections. Purchasing additional
                subscriptions allows streaming on more devices simultaneously.
              </p>
              <p>Violation of this policy may lead to account suspension.</p>
            </section>

            <section className="space-y-3">
              <h2 className={h2}>12. Purchase &amp; Payment Details</h2>
              <p>
                Purchases must follow the ordering procedures outlined on TryIPTV. Pricing, payment methods, and delivery details are subject to
                change without prior notice.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className={h2}>13. Service Downtime &amp; Suspension</h2>
              <p>At times, access to TryIPTV may be temporarily unavailable due to:</p>
              <Bullets items={["System maintenance", "Unexpected server outages", "Network disruptions beyond our control"]} />
              <p>
                Additionally, TryIPTV reserves the right to suspend or terminate access if a user violates these Terms and Conditions, engages
                in fraudulent activities, or misuses the service.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className={h2}>14. Legal Compliance &amp; Termination</h2>
              <p>TryIPTV reserves the right to restrict, suspend, or terminate your access to the service without prior notice if:</p>
              <CheckList
                items={[
                  "You breach these Terms & Conditions",
                  "You violate any applicable law, rule, or regulation",
                  "You attempt unauthorized access or disrupt service operations",
                ]}
              />
              <p>By using TryIPTV, you acknowledge that legal action may be taken in cases of serious violations.</p>
            </section>

            <section className="space-y-3">
              <h2 className={h2}>15. Copyright &amp; Intellectual Property</h2>
              <p>
                The TryIPTV logo, brand name, graphics, and scripts are trademarks and property of TryIPTV. These assets cannot be copied,
                downloaded, or used without prior written permission.
              </p>
              <p>Unauthorized use of TryIPTV trademarks may lead to legal action.</p>
            </section>

            <section className="space-y-3">
              <h2 className={h2}>16. Plans, Free Trial &amp; Activation</h2>
              <Bullets
                items={[
                  `Plans: ${FACT_TEXT.priceList}. All plans are paid once, with no recurring charges or automatic renewals.`,
                  ...(COMPANY.paymentMethods ? [`Payment methods: ${COMPANY.paymentMethods}. For cryptocurrency payments, you are responsible for submitting the correct network and wallet details.`] : []),
                  `Activation: login details are typically delivered within ${PRODUCT_TRUTHS.activationTime} after payment is confirmed, ${PRODUCT_TRUTHS.activationHours}.`,
                  `Free trial: ${FACT_TEXT.trialHours} hours, $0, no credit card required; one trial per household or user.`,
                ]}
              />
            </section>

            <section className="space-y-3">
              <h2 className={h2}>17. Who Provides the Service &amp; Contact</h2>
              {COMPANY.legalName && <p>The service is provided by {COMPANY.legalName}{COMPANY.location ? `, ${COMPANY.location}` : ""}{COMPANY.registrationNumber ? ` (company registration number ${COMPANY.registrationNumber})` : ""}.</p>}
              {COMPANY.governingLaw && <p>{COMPANY.governingLaw}</p>}
              <Confirm value={COMPANY.legalName} question="Legal name (and registered address) of the entity that provides the service and enters this agreement." />
              <Confirm value={COMPANY.governingLaw} question="Which country's or state's law governs these terms, and where are disputes resolved?" />
              <p>
                Questions about these terms:{" "}
                <span
                  dangerouslySetInnerHTML={{
                    __html: `<!--email_off--><a href="mailto:${COMPANY.support.email}" class="${link}">${COMPANY.support.email}</a><!--/email_off-->`,
                  }}
                />
                .
              </p>
            </section>
          </div>
        </Container>
      </Section>
    </>
  );
}
