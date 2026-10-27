import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { PageSchema } from "@/components/shared/Schema";
import { ConfirmedStatements } from "@/components/shared/ConfirmedStatements";
import { generateBreadcrumbSchema } from "@/lib/schema";
import { siteConfig, generateMetadata as generatePageMetadata } from "@/lib/site-config";
import { LICENSING, LICENSING_CONFIRMED, SHOW_CONFIRM_MARKERS } from "@/lib/site-data/company";

const title = "Content Licensing: How TryIPTV Distributes Channels";
const description = "How TryIPTV is licensed to distribute its live channels and on-demand titles, which territories are covered, and how rights holders can report content.";
const canonical = "/content-licensing";
const link = "font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary";

export function generateMetadata(): Metadata {
  return {
    ...generatePageMetadata({ title, description, canonical }),
    title: { absolute: title },
    // Stays out of search until the owner has confirmed at least one statement.
    ...(LICENSING_CONFIRMED ? {} : { robots: { index: false, follow: true } }),
  };
}

export default function Page() {
  // Production shows this page only once something on it is confirmed (see company.ts).
  if (!LICENSING_CONFIRMED && !SHOW_CONFIRM_MARKERS) notFound();
  const baseUrl = siteConfig.url;
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", item: `${baseUrl}/` },
    { name: "Content Licensing", item: `${baseUrl}${canonical}` },
  ]);

  return (
    <>
      <PageSchema path="/content-licensing" name={title} description={description} nodes={[breadcrumbSchema]} />
      <Section className="relative overflow-hidden border-b border-white/[0.07] pt-12 pb-14 sm:pt-16 sm:pb-20">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
        <Container className="relative text-center">
          <Breadcrumb items={[{ label: "Content Licensing" }]} align="center" />
          <SectionHeader as="h1" eyebrow="Content Rights" title="Content Licensing" subtitle="The confirmed basis on which TryIPTV distributes its channels and on-demand titles." />
        </Container>
      </Section>
      <Section className="py-12 sm:py-16">
        <Container className="max-w-3xl">
          <div className="space-y-8 text-base leading-7 text-muted-foreground">
            <p>
              This page states, in plain terms, the basis on which TryIPTV distributes the channels and
              on-demand titles in its service. Each statement below has been confirmed by the people who
              run TryIPTV. If a statement is not listed, we do not make that claim.
            </p>
            <ConfirmedStatements items={LICENSING} />
            <p>
              Rights holders who believe content is being made available without authorisation can send a
              notice to our <Link href="/dmca-report" className={link}>copyright (DMCA) page</Link>. General
              background on when IPTV is legal is in our{" "}
              <Link href="/guides/what-is-iptv#is-iptv-legal" className={link}>What is IPTV guide</Link>.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
