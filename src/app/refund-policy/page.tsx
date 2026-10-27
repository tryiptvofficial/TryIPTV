import type { Metadata } from "next";
import Link from "next/link";
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
      title: "Refund Policy: Free Trial & Refund Eligibility",
      description: "Read the TryIPTV refund policy: test free for 24 hours first, see when a refund is possible (account not delivered or service won't start), and how to ask.",
      canonical: "/refund-policy",
    }),
    title: { absolute: "Refund Policy: Free Trial & Refund Eligibility | TryIPTV" },
  };
}

const h2 = "font-headline text-xl sm:text-2xl font-bold text-foreground";
const link = "text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary";

export default function RefundPolicyPage() {
  const baseUrl = siteConfig.url;
  const email = COMPANY.support.email;

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", item: `${baseUrl}/` },
    { name: "Refund Policy", item: `${baseUrl}/refund-policy` },
  ]);

  return (
    <>
      <PageSchema path="/refund-policy" name="Refund Policy: 24-Hour Free Trial & Refund Eligibility" type="WebPage" nodes={[breadcrumbSchema]} />

      <Section className="relative overflow-hidden border-b border-white/[0.07] pt-12 pb-14 sm:pt-16 sm:pb-20">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
        <Container className="relative text-center">
          <Breadcrumb items={[{ label: "Refund Policy" }]} align="center" />
          <SectionHeader as="h1" eyebrow="TryIPTV" title="Refund Policy" subtitle="When You're Eligible for a Refund" />
        </Container>
      </Section>

      <Section className="py-12 sm:py-16">
        <Container className="max-w-4xl">
          <div className="space-y-10 text-base leading-relaxed text-muted-foreground">
            <div className="space-y-3">
              <p className="text-xs font-semibold text-primary">Last updated: {formatLegalDate(PAGE_LAST_MODIFIED["/refund-policy"])}</p>
              <p>
                At TryIPTV, we work hard to provide you with the best IPTV experience. Please read our refund policy carefully before making a
                purchase.
              </p>
            </div>

            <section className="space-y-3">
              <h2 className={h2}>1. Free Trial</h2>
              <p>
                We offer a <Link href="/iptv-free-trial" className={link}>Free Trial</Link> so you can test our service before subscribing. This
                way, you can ensure compatibility with your device and internet connection.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className={h2}>2. Refunds</h2>
              <ul className="list-disc space-y-1.5 pl-5">
                <li>Once your subscription is activated and account details are delivered, all sales are final.</li>
                <li>
                  Refunds will only be issued if we are unable to provide you with a working subscription (e.g., your account is not delivered
                  or the service does not start at all).
                </li>
                <li>
                  We do not provide refunds due to internet issues, device or player incompatibility, or channel changes, as these are beyond our
                  control.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className={h2}>3. How to Request a Refund</h2>
              <p>If you believe you are eligible for a refund, please contact us at:</p>
              <p>
                <span
                  dangerouslySetInnerHTML={{
                    __html: `<!--email_off--><a href="mailto:${email}?subject=Refund%20request" class="${link} font-semibold">${email}</a><!--/email_off-->`,
                  }}
                />
                {" "}or on{" "}
                <a href={COMPANY.support.whatsappUrl} target="_blank" rel="noopener noreferrer" className={`${link} font-semibold`}>WhatsApp</a>
                {" "}({COMPANY.support.whatsappDisplay}). You can also use our <Link href="/contact-us" className={link}>contact page</Link>.
              </p>
              <p>Our team will review your request and get back to you within 24–48 hours.</p>
            </section>
          </div>
        </Container>
      </Section>
    </>
  );
}
