import { FaqList } from "@/components/sections/FAQ";
import type { Metadata } from "next";
import Link from "next/link";
import { Check, CirclePlay } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { getFaqPageData } from "@/lib/data/faq-page";
import { faqTopics, faqs } from "@/lib/site-data/faq";
import { PageSchema } from "@/components/shared/Schema";
import { FACT_TEXT, generateMetadata as generatePageMetadata } from "@/lib/site-config";

const link = "font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary";

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title: "IPTV FAQ: Every Question, Answered Honestly",
    description: `${faqs.length} straight answers about IPTV: costs, the free trial, devices, setup, channels, sports, quality, fixes and legality. Short answer first, then the detail.`,
    canonical: "/faq",
  });
}

export default async function FaqPage() {
  const { faqSchema, breadcrumbSchema } = await getFaqPageData();

  return (
    <>
      <PageSchema
        path="/faq"
        name="IPTV FAQ: Every Question, Answered Honestly"
        nodes={[faqSchema, breadcrumbSchema]}
        keep={["FAQPage"]}
      />

      <Section className="relative overflow-hidden border-b border-white/[0.07] pt-12 pb-14 sm:pt-16 sm:pb-20">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
        <Container className="relative text-center">
          <Breadcrumb items={[{ label: "FAQ" }]} align="center" />
          <SectionHeader as="h1" eyebrow="Frequently Asked Questions" title="IPTV FAQ: Every Question, Answered Honestly" />
          <p className="mx-auto -mt-2 max-w-[60ch] text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            This is the complete IPTV FAQ: the questions people actually search on Google and ask AI assistants, answered directly. Costs,
            legality, devices, setup, sports, quality and fixes. Every answer gives you the short version first, then the detail. New
            here?{" "}
            <Link href="/iptv-free-trial" className={link}>
              Test TryIPTV free for 24 hours
            </Link>{" "}
            with no credit card, or{" "}
            <Link href="/pricing" className={link}>
              see plans from {FACT_TEXT.fromPrice}
            </Link>
            . The{" "}
            <Link href="/how-it-works" className={link}>
              full buying path
            </Link>{" "}
            shows every step from first message to login.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/iptv-free-trial">
                <CirclePlay aria-hidden /> Start My Free Trial
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/pricing">See plans and pricing</Link>
            </Button>
          </div>
          <ul className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs font-semibold text-muted-foreground">
            {[`${faqs.length} answers, ${faqTopics.length} topics`, "Short answer first", "Prices in USD"].map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-primary" aria-hidden />
                {t}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section className="border-b border-white/[0.06] py-8 sm:py-10">
        <Container>
          <nav aria-labelledby="faq-topics" className="mx-auto max-w-[880px]">
            <h2 id="faq-topics" className="mb-3 text-center text-sm font-semibold text-foreground">
              Jump to a topic
            </h2>
            <ul className="flex flex-wrap justify-center gap-2">
              {faqTopics.map((t) => (
                <li key={t.id}>
                  <a
                    href={`#${t.id}`}
                    className="inline-flex items-center rounded-full border border-white/[0.09] bg-card px-3 py-1 pointer-coarse:min-h-11 text-sm font-semibold text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    {t.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </Section>

      {faqTopics.map((topic, i) => (
        <Section
          key={topic.id}
          id={topic.id}
          variant={i % 2 ? "alt" : "default"}
          className="scroll-mt-0 border-b border-white/[0.06] py-10 sm:py-14"
        >
          <Container>
            <SectionHeader eyebrow={topic.eyebrow} title={topic.title} />
            <FaqList items={topic.items} />
          </Container>
        </Section>
      ))}

      <Section className="py-10 sm:py-14">
        <Container>
          <div className="mx-auto max-w-3xl rounded-lg border border-primary/25 bg-[#0b100d] p-7 text-center sm:p-9">
            <h2 className="font-headline text-2xl font-extrabold text-foreground sm:text-3xl">Still Deciding?</h2>
            <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-muted-foreground">
              The fastest answer is the service itself:{" "}
              <Link href="/iptv-free-trial" className={link}>
                start the 24-hour free trial
              </Link>{" "}
              (no credit card) or{" "}
              <Link href="/pricing" className={link}>
                compare plans from {FACT_TEXT.fromPrice}
              </Link>
              .
            </p>
            <p className="mx-auto mt-3 max-w-xl text-base sm:text-sm leading-6 text-muted-foreground">
              Question not covered here? See the{" "}
              <Link href="/help" className={link}>
                Help Center
              </Link>{" "}
              or{" "}
              <Link href="/contact-us" className={link}>
                contact support
              </Link>
              .
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
