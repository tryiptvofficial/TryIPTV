import type { Metadata } from "next";
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
      title: "DMCA Notice & Copyright Policy",
      description: "Read the TryIPTV DMCA and copyright policy: what a valid infringement notice must include, how takedown requests are handled, and where to send yours.",
      canonical: "/dmca-report",
    }),
    title: { absolute: "DMCA Notice & Copyright Policy | TryIPTV" },
  };
}

const h2 = "font-headline text-xl sm:text-2xl font-bold text-foreground scroll-mt-0";
const h3 = "font-headline text-lg font-semibold text-foreground";
const link = "text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary";
const callout = "rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 text-base sm:text-sm";

const nav = [
  { id: "copyright-policy", label: "Copyright Protection Policy" },
  { id: "file-complaint", label: "How to File a DMCA Complaint" },
  { id: "response-process", label: "DMCA Review Process" },
  { id: "false-claims", label: "False Claims Warning" },
  { id: "counter-notice", label: "Counter-Notification" },
  { id: "contact", label: "Submit a Notice" },
];

const noticeParts: { title: string; items: string[] }[] = [
  {
    title: "Your Contact Details",
    items: ["Your full legal name", "Email address", "Phone number", "Physical mailing address"],
  },
  {
    title: "Description of the Copyrighted Work",
    items: [
      "Identify the copyrighted work you believe has been infringed",
      "Describe the material clearly enough for us to understand your claim",
    ],
  },
  {
    title: "Location of the Alleged Infringing Material",
    items: [
      "Provide the exact location or description of where the material appears on our service",
      "Include URLs, channel names, content titles, or any relevant identifying details",
    ],
  },
  {
    title: "Required Legal Statements",
    items: [
      "A statement that you have a good faith belief the use is not authorized by the copyright owner, its agent, or the law",
      "A statement that the information in your notice is accurate",
      "A statement made under penalty of perjury, where applicable",
      "Your physical or electronic signature",
    ],
  },
];

const reviewSteps = [
  { title: "Submit Notice", text: "Send your DMCA complaint with all required details." },
  { title: "We Review", text: "Our team checks the notice for completeness and validity." },
  { title: "Action Taken", text: "Valid complaints are investigated and addressed within 24 hours." },
];

export default function DmcaReportPage() {
  const baseUrl = siteConfig.url;
  const email = COMPANY.support.dmcaEmail;

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", item: `${baseUrl}/` },
    { name: "DMCA Report", item: `${baseUrl}/dmca-report` },
  ]);

  return (
    <>
      <PageSchema path="/dmca-report" name="DMCA Notice & Copyright Policy: Report Infringement" type="WebPage" nodes={[breadcrumbSchema]} />

      <Section className="relative overflow-hidden border-b border-white/[0.07] pt-12 pb-14 sm:pt-16 sm:pb-20">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
        <Container className="relative text-center">
          <Breadcrumb items={[{ label: "DMCA Report" }]} align="center" />
          <SectionHeader
            as="h1"
            eyebrow="Copyright Compliance"
            title="DMCA Copyright Notice"
            subtitle="Digital Millennium Copyright Act compliance policy, complaint process, counter-notification details, and response commitment for TryIPTV."
          />
        </Container>
      </Section>

      <Section className="py-12 sm:py-16">
        <Container className="max-w-4xl">
          <div className="space-y-10 text-base leading-relaxed text-muted-foreground">
            <p className="text-xs font-semibold text-primary">Last Updated: {formatLegalDate(PAGE_LAST_MODIFIED["/dmca-report"])}</p>

            <nav aria-labelledby="dmca-nav" className={callout}>
              <p id="dmca-nav" className="font-semibold text-foreground">Quick Navigation</p>
              <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
                {nav.map((n) => (
                  <li key={n.id}>
                    <a href={`#${n.id}`} className={`tap-target ${link}`}>{n.label}</a>
                  </li>
                ))}
              </ul>
            </nav>

            <section className="space-y-3">
              <h2 id="copyright-policy" className={h2}>Copyright Protection Policy</h2>
              <p>
                TryIPTV respects intellectual property rights and complies with the Digital Millennium Copyright Act (DMCA). We take copyright
                infringement seriously and respond promptly to valid notices of alleged copyright violations.
              </p>
              <p>
                If you believe that content available through our service infringes your copyright, please notify us immediately so we can
                investigate and take appropriate action.
              </p>
              <p className={callout}>
                <strong className="text-foreground">Important:</strong> To help us review your request quickly, include clear and complete
                information in your notice.
              </p>
            </section>

            <section className="space-y-4">
              <h2 id="file-complaint" className={h2}>How to File a DMCA Complaint</h2>
              <p>To submit a valid DMCA takedown notice, please include the following:</p>
              <ol className="space-y-5">
                {noticeParts.map((part, i) => (
                  <li key={part.title}>
                    <h3 className={h3}>
                      <span className="mr-2 font-mono text-primary">{i + 1}</span>
                      {part.title}
                    </h3>
                    <ul className="mt-2 list-disc space-y-1.5 pl-5">
                      {part.items.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </li>
                ))}
              </ol>
            </section>

            <section className="space-y-4">
              <h2 id="response-process" className={h2}>DMCA Review Process</h2>
              <p>Once we receive your notice, we review it as quickly as possible and take appropriate action if the complaint is valid.</p>
              <ol className="grid gap-3 sm:grid-cols-3">
                {reviewSteps.map((step, i) => (
                  <li key={step.title} className="rounded-xl border border-white/[0.08] bg-[#07080a] p-4">
                    <span className="font-mono text-sm font-bold text-primary">{i + 1}</span>
                    <h3 className={`${h3} mt-1`}>{step.title}</h3>
                    <p className="mt-1 text-base sm:text-sm">{step.text}</p>
                  </li>
                ))}
              </ol>
              <p className={callout}>
                <strong className="text-foreground">Response Time Commitment:</strong> We process all DMCA requests within 24 hours of receipt.
                Valid complaints are investigated promptly, and appropriate action is taken in accordance with applicable copyright law.
                {COMPANY.dmcaTakedownTarget ? <> {COMPANY.dmcaTakedownTarget}</> : null}
              </p>
            </section>

            <section className="space-y-3">
              <h2 id="false-claims" className={h2}>False Claims Warning</h2>
              <p>
                Please note that under Section 512(f) of the DMCA, any person who knowingly materially misrepresents that material is infringing
                may be subject to liability.
              </p>
              <p className={callout}>
                <strong className="text-foreground">Warning:</strong> We recommend consulting legal counsel before submitting a DMCA complaint if
                you are unsure whether the material is infringing.
              </p>
            </section>

            <section className="space-y-3">
              <h2 id="counter-notice" className={h2}>Counter-Notification</h2>
              <p>If you believe content was removed in error, you may submit a counter-notification to the same contact email address.</p>
              <h3 className={h3}>Counter-Notice Must Include</h3>
              <ul className="list-disc space-y-1.5 pl-5">
                <li>Your name, address, phone number, and email address</li>
                <li>Identification of the material that was removed or disabled</li>
                <li>A statement under penalty of perjury that you have a good faith belief the material was removed in error</li>
                <li>A statement that you consent to the jurisdiction of the federal district court for the judicial district in which your address is located or, if your address is outside the United States, any judicial district in which TryIPTV may be found, and that you will accept service of process from the person who submitted the original notice or their agent</li>
                <li>Your physical or electronic signature</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 id="contact" className={h2}>Submit Your DMCA Notice</h2>
              {COMPANY.legalName && (
                <p>TryIPTV is operated by {COMPANY.legalName}{COMPANY.location ? `, ${COMPANY.location}` : ""}.</p>
              )}
              <p>Send your copyright infringement complaint to our designated contact email:</p>
              <div
                dangerouslySetInnerHTML={{
                  __html: `<!--email_off--><p><a href="mailto:${email}?subject=DMCA%20Notice" class="${link} text-lg font-semibold">${email}</a></p><!--/email_off-->`,
                }}
              />
              <p>For faster handling, please use <strong className="text-foreground">DMCA Notice</strong> in your subject line.</p>
            </section>
          </div>
        </Container>
      </Section>
    </>
  );
}
