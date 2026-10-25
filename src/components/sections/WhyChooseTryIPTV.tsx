import Link from "next/link";
import { CheckIcon, X } from "lucide-react";
import { Container } from "../shared/Container";
import { Section } from "../shared/Section";
import { SectionHeader } from "../shared/SectionHeader";
import { PRODUCT_TRUTHS } from "@/lib/site-config";
import { COMPANY } from "@/lib/site-data/company";

// Cable points rest on the sourced cable estimates on /pricing (about 140 channels, $100–$170 a month with fees).
const cableDrawbacks = [
  "Usually tied to a set-top box at home",
  "Fewer channels in a typical package",
  "Usually more expensive once fees are added",
];

const tryIptvIncluded = [
  `Support on WhatsApp and email${COMPANY.support.hours ? `, ${COMPANY.support.hours}` : ""}`,
  "HD and 4K streams where available",
  `${PRODUCT_TRUTHS.connections} simultaneous connections on every plan`,
  "Works on Fire TV, Android TV, Apple TV and more, through a compatible IPTV player",
  "One-time payment, with no automatic renewal",
];

export function WhyChooseTryIPTV() {
  return (
    <Section id="why-tryiptv" variant="alt">
      <Container>
        <SectionHeader
          align="left"
          eyebrow="Stream More. Pay Less"
          title="What Makes Our IPTV Subscription Stand Out"
          subtitle="Comparing IPTV with cable? TryIPTV works on the devices you already use: you get an Xtream Codes login or an M3U link for a compatible IPTV player."
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-5">
          <div className="rounded-2xl border border-white/[0.07] bg-card p-6">
            <h3 className="font-headline text-lg font-bold tracking-tight text-foreground">Traditional Cable</h3>
            <ul className="mt-4 space-y-2.5 text-base text-muted-foreground sm:text-sm">
              {cableDrawbacks.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <X className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden />
                  <span><span className="sr-only">Drawback: </span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-primary/40 bg-card p-6">
            <h3 className="font-headline text-lg font-bold tracking-tight text-foreground">TryIPTV</h3>
            <ul className="mt-4 space-y-2.5 text-base text-muted-foreground sm:text-sm">
              {tryIptvIncluded.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                  <span><span className="sr-only">Included: </span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-6 text-base text-muted-foreground sm:text-sm">
          <Link href="/guides/iptv-vs-cable" className="font-semibold text-primary hover:underline">
            Compare IPTV and cable TV in detail
          </Link>
          , or see the{" "}
          <Link href="/pricing" className="font-semibold text-primary hover:underline">
            cost comparison on the pricing page
          </Link>
          .
        </p>
      </Container>
    </Section>
  );
}
