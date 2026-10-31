import Link from "next/link";
import { Container } from "../shared/Container";
import { Section } from "../shared/Section";
import { SectionHeader } from "../shared/SectionHeader";
import { PRODUCT_TRUTHS } from "@/lib/site-config";
import { COMPANY } from "@/lib/site-data/company";

const firstPlan = PRODUCT_TRUTHS.plans[0];
const lastPlan = PRODUCT_TRUTHS.plans[PRODUCT_TRUTHS.plans.length - 1];
// One string so the prices render as plain text ("$15.82"), not split by React text markers.

// Cable figures are the labelled estimates also used on /pricing (about 140 channels, $130–$170 a month with fees);
// check:facts skips cells marked as estimates.
const comparisonRows = [
  {
    label: "Monthly cost",
    cable: "$130–$170 with fees (our estimate)",
    estimate: true,
    tryIptv: `$${firstPlan.price.toFixed(2)} for 1 month, or about $${lastPlan.monthlyEquivalent.toFixed(2)} a month on the ${parseInt(lastPlan.duration, 10)}-month plan`,
  },
  { label: "Live channels", cable: "About 140 in a typical package (our estimate)", estimate: true, tryIptv: `${PRODUCT_TRUTHS.channels}` },
  { label: "Equipment", cable: "Usually a set-top box at home, often rented", estimate: false, tryIptv: "Devices you already own, with a compatible IPTV player app" },
  { label: "Simultaneous connections", cable: "Varies by provider", estimate: false, tryIptv: `${PRODUCT_TRUTHS.connections} on every plan` },
  { label: "Renewal", cable: "Usually renews automatically", estimate: false, tryIptv: "One-time payment, no automatic renewal" },
  {
    label: "Support",
    cable: "Varies by provider",
    estimate: false,
    tryIptv: `WhatsApp and email${COMPANY.support.hours ? `, ${COMPANY.support.hours}` : ""}`,
  },
];

export function WhyChooseTryIPTV() {
  return (
    <Section id="why-tryiptv" variant="alt">
      <Container>
        <SectionHeader quiet
          align="left"
          eyebrow="Stream more, pay less"
          title="How Is TryIPTV Different From Cable TV?"
          className="mb-4 sm:mb-4 lg:mb-4"
        />
        {/* Answer-first: TryIPTV's differentiators lead; cable estimate follows. Cable figure is the same labelled estimate as on /pricing, so check:facts skips it. */}
        <div className="mb-10 max-w-2xl space-y-3 text-base leading-relaxed text-muted-foreground sm:mb-12 sm:text-lg lg:mb-14">
          <p>
            TryIPTV delivers live TV over your internet connection rather than a cable line — no set-top box to rent, no automatic renewal, and {PRODUCT_TRUTHS.connections} simultaneous connections on every plan.{" "}
            <span data-facts-ignore>Our estimate for a typical US cable bill is $130–$170 a month once fees are added.</span>
          </p>
          <p>
            After you order, you get your login in one of two formats. An{" "}
            <Link href="/guides/what-are-xtream-codes" className="font-medium text-foreground underline underline-offset-4 hover:text-primary">
              Xtream Codes login
            </Link>{" "}
            is a server address, username and password. An M3U link is a single playlist address. You enter either one in a compatible IPTV player app.
          </p>
        </div>

        {/* Focusable and labelled so keyboard users can scroll it if a narrow phone still needs to. */}
        <div
          className="overflow-x-auto rounded-2xl border border-white/[0.07] bg-card"
          tabIndex={0}
          role="region"
          aria-label="Cable TV and TryIPTV comparison table"
        >
          {/* Phones: 15px text, with hyphenation so long words fit three columns. */}
          <table className="w-full text-left text-[15px] max-sm:hyphens-auto sm:text-sm">
            <caption className="sr-only">Traditional cable TV compared with a TryIPTV subscription</caption>
            <thead className="border-b border-white/[0.07] text-sm text-muted-foreground">
              <tr>
                <th scope="col" className="px-2 py-3 sm:px-5 font-semibold"><span className="sr-only">Feature</span></th>
                <th scope="col" className="px-2 py-3 sm:px-5 font-semibold">Traditional cable</th>
                <th scope="col" className="px-2 py-3 sm:px-5 font-semibold text-primary">TryIPTV</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06] text-muted-foreground">
              {comparisonRows.map((row) => (
                <tr key={row.label}>
                  <th scope="row" className="px-2 py-3 sm:px-5 align-top font-semibold text-foreground">{row.label}</th>
                  <td className="px-2 py-3 sm:px-5 align-top">
                    {row.estimate ? <span data-facts-ignore>{row.cable}</span> : row.cable}
                  </td>
                  <td className="px-2 py-3 sm:px-5 align-top font-medium text-foreground">{row.tryIptv}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
