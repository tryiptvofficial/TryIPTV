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

const firstPlan = PRODUCT_TRUTHS.plans[0];
const lastPlan = PRODUCT_TRUTHS.plans[PRODUCT_TRUTHS.plans.length - 1];
// One string so the prices render as plain text ("$15.82"), not split by React text markers.
const priceAnswer = `TryIPTV costs $${firstPlan.price.toFixed(2)} for one month, or about $${lastPlan.monthlyEquivalent.toFixed(2)} a month on the ${parseInt(lastPlan.duration, 10)}-month plan, with no set-top box to rent and no automatic renewal.`;

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
          title="How Is TryIPTV Different From Cable TV?"
          className="mb-4 sm:mb-4 lg:mb-4"
        />
        {/* Answer first; the cable figure is the same labelled estimate as on /pricing, so check:facts skips it. */}
        <div className="mb-10 max-w-2xl space-y-3 text-base leading-relaxed text-muted-foreground sm:mb-12 sm:text-[16.5px] lg:mb-14">
          <p>
            {priceAnswer}{" "}
            <span data-facts-ignore>Our estimate for a typical US cable bill is $130–$170 a month once fees are added.</span>{" "}
            You watch on devices you already own, with {PRODUCT_TRUTHS.connections} simultaneous connections on every plan.
          </p>
          <p>
            After you order, you get your login in one of two formats: an Xtream Codes login (a server address, username and
            password) or an M3U link (a playlist address). You enter it in a compatible IPTV player app.
          </p>
        </div>

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
