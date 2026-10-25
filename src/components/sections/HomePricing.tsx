import { CheckIcon, ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/site-data/company";
import { Container } from "../shared/Container";
import { Section } from "../shared/Section";
import { SectionHeader } from "../shared/SectionHeader";
import { cn } from "@/lib/utils";
import { PRODUCT_TRUTHS } from "@/lib/site-config";

const PLANS = [
  {
    index: "01 / Plan",
    name: "1 Month",
    price: 15.82,
    suffix: "one-time",
    description: "Standard 1-month access",
    monthlyEquivalent: null,
    savings: null,
    cta: "Choose 1 Month",
    checkoutUrl: "https://wa.me/212694833293?text=I%20would%20like%20to%20order%20the%201%20Month%20IPTV%20plan.",
    featured: false,
    badge: null,
    features: [],
  },
  {
    index: "02 / Plan",
    name: "3 Months",
    price: 38.30,
    suffix: "one-time",
    description: null,
    monthlyEquivalent: "$12.77/mo",
    savings: "Save 19%",
    cta: "Choose 3 Months",
    checkoutUrl: "https://wa.me/212694833293?text=I%20would%20like%20to%20order%20the%203%20Months%20IPTV%20plan.",
    featured: false,
    badge: null,
    features: [],
  },
  {
    index: "03 / Plan",
    name: "6 Months",
    price: 59.15,
    suffix: "one-time",
    description: null,
    monthlyEquivalent: "$9.86/mo",
    savings: "Save 38%",
    cta: "Choose 6 Months",
    checkoutUrl: "https://wa.me/212694833293?text=I%20would%20like%20to%20order%20the%206%20Months%20IPTV%20plan.",
    featured: false,
    badge: null,
    features: [],
  },
  {
    index: "04 / Plan",
    name: "12 Months",
    price: 88.23,
    suffix: "one-time",
    description: null,
    monthlyEquivalent: "$7.35/mo",
    savings: "Save 54%",
    cta: "Choose 12 Months",
    checkoutUrl: "https://wa.me/212694833293?text=I%20would%20like%20to%20order%20the%2012%20Months%20IPTV%20plan.",
    featured: true,
    badge: "Best Value",
    features: [],
  },
] as const;

const INCLUDED_FEATURES = [
  "HD and 4K Streams Where Available",
  "25,000+ Live Channels Worldwide",
  "120,000+ On-Demand (VOD) Movies & TV Shows",
  "Pay-Per-View (PPV) Events Included",
  "Smart EPG (TV Guide) & Catch-Up TV",
  "Customer Support",
  "Multi-Device Compatibility",
] as const;

// Short lead for voice and snippets: the cheapest entry and the best monthly rate first, the middle plans after.
const [p1, p3, p6, p12] = PRODUCT_TRUTHS.plans;
const priceLead = `A TryIPTV subscription costs $${p1.price.toFixed(2)} for 1 month or $${p12.price.toFixed(2)} for 12 months (about $${p12.monthlyEquivalent.toFixed(2)} a month), paid once in USD with no automatic renewal. The 3-month plan is $${p3.price.toFixed(2)} and the 6-month plan is $${p6.price.toFixed(2)}.`;

// Price table rows come from the facts source; savings compare each plan's monthly cost with the 1-month price.
const firstMonthly = PRODUCT_TRUTHS.plans[0].monthlyEquivalent;
const PRICE_ROWS = PRODUCT_TRUTHS.plans.map((plan, i) => ({
  plan: plan.duration,
  price: `$${plan.price.toFixed(2)}`,
  perMonth: `$${plan.monthlyEquivalent.toFixed(2)}`,
  savings: i === 0 ? "—" : `${Math.round((1 - plan.monthlyEquivalent / firstMonthly) * 100)}%`,
}));

export function HomePricing() {
  return (
    <Section id="pricing">
      <Container>
        <SectionHeader
          eyebrow="IPTV Pricing"
          title="How Much Does a TryIPTV Subscription Cost?"
          subtitle={`${priceLead} Every plan includes ${PRODUCT_TRUTHS.channels} live channels, HD and 4K streams where available, ${PRODUCT_TRUTHS.connections} simultaneous connections, and login details usually within ${PRODUCT_TRUTHS.activationTime}.`}
        />

        {/* The price table comes first so the answer to "how much" sits right under the heading. */}
        <div className="mx-auto mb-8 max-w-3xl overflow-x-auto rounded-2xl border border-white/[0.07] bg-card">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">TryIPTV plan prices in USD, monthly cost and savings compared with the 1-month plan</caption>
            <thead className="border-b border-white/[0.07] text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th scope="col" className="px-5 py-3 font-semibold">Plan</th>
                <th scope="col" className="px-5 py-3 font-semibold">Price</th>
                <th scope="col" className="px-5 py-3 font-semibold">Per month</th>
                <th scope="col" className="px-5 py-3 font-semibold">Savings</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06] text-muted-foreground">
              {PRICE_ROWS.map((row) => (
                <tr key={row.plan}>
                  <th scope="row" className="whitespace-nowrap px-5 py-3 font-semibold text-foreground">{row.plan}</th>
                  <td className="whitespace-nowrap px-5 py-3 font-medium text-foreground">{row.price}</td>
                  <td className="whitespace-nowrap px-5 py-3">{row.perMonth}</td>
                  <td className="whitespace-nowrap px-5 py-3 font-medium text-primary">{row.savings}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mx-auto grid max-w-md grid-cols-1 gap-4 sm:max-w-none sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {PLANS.map((plan) => (
            <article
              key={plan.name}
              className={cn(
                "flex flex-col rounded-2xl border bg-card p-6 transition-colors duration-200",
                plan.featured
                  ? "border-primary/40 hover:border-primary/60"
                  : "border-white/[0.07] hover:border-white/[0.14]"
              )}
            >
              {/* The badge takes the plan-number slot so every card's content stays on the same baseline. */}
              {plan.featured ? (
                <p className="w-fit rounded-md border border-primary/30 bg-primary/10 px-2 font-mono text-[11px] font-bold uppercase leading-4 tracking-wider text-primary">
                  {plan.badge}
                </p>
              ) : (
                <p className="font-mono text-[11px] font-semibold uppercase leading-[18px] tracking-[0.08em] text-muted-foreground">
                  {plan.index}
                </p>
              )}

              <h3 className="mt-3 font-headline text-xl font-bold tracking-tight text-foreground">
                {plan.name.replace(/^(\d+) Months?$/, "$1-Month IPTV Plan")}
              </h3>

              <div className="mt-4 flex items-baseline gap-1.5">
                <span className="font-headline text-[44px] font-bold leading-none tracking-tight text-foreground tabular-nums">
                  ${plan.price.toFixed(2)}
                </span>
                <span className="text-sm font-medium text-muted-foreground">{plan.suffix}</span>
              </div>

              <p className="mt-3 flex min-h-6 flex-wrap items-center gap-x-2 gap-y-1 text-base sm:text-sm text-muted-foreground">
                {plan.monthlyEquivalent ? (
                  <>
                    <span className="font-medium text-foreground">{plan.monthlyEquivalent}</span>
                    {plan.savings && (
                      <span className="rounded bg-primary/10 px-1.5 text-xs font-semibold leading-5 text-primary">
                        {plan.savings}
                      </span>
                    )}
                  </>
                ) : (
                  plan.description
                )}
              </p>

              <div className="mt-auto pt-6">
                <Button asChild variant={plan.featured ? "default" : "outline"} className="w-full">
                  <a href={plan.checkoutUrl} target="_blank" rel="noopener noreferrer">
                    {plan.cta}
                    <span className="sr-only"> — {plan.name} plan (opens WhatsApp in a new tab)</span>
                  </a>
                </Button>
              </div>

              <ul className="mt-6 space-y-2.5 border-t border-white/[0.07] pt-6 text-base text-muted-foreground sm:text-sm">
                {INCLUDED_FEATURES.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <p className="mx-auto mt-6 max-w-3xl text-center text-base sm:text-sm leading-6 text-muted-foreground">
          Choosing a plan opens WhatsApp, where support sends payment instructions (no WhatsApp? email{" "}
          <span
            dangerouslySetInnerHTML={{
              __html: `<!--email_off--><a href="mailto:${COMPANY.support.email}?subject=Plan%20order" class="font-medium text-foreground underline underline-offset-4 hover:text-primary">${COMPANY.support.email}</a><!--/email_off-->`,
            }}
          />{" "}
          with the plan you want). Choose 1 month for short-term use, 3 months for a shorter commitment, 6 months for balanced value, or 12 months for the lowest monthly equivalent. See the{" "}
          <Link href="/refund-policy" className="font-medium text-foreground underline underline-offset-4 hover:text-primary">
            refund policy
          </Link>
          .
        </p>
        <p className="mx-auto mt-3 max-w-3xl text-center text-base sm:text-sm leading-6 text-muted-foreground">
          Catalog counts are approximate and can change as content availability changes. You can check the available selection during the{" "}
          <Link href="/iptv-free-trial" className="font-medium text-foreground underline underline-offset-4 hover:text-primary">
            free trial
          </Link>
          .
        </p>

        <div className="mt-6 flex flex-col items-center justify-center gap-x-8 gap-y-1 text-sm sm:flex-row">
          <p className="inline-flex min-h-11 flex-wrap items-center justify-center gap-x-1.5 text-muted-foreground">
            Want the full plan comparison?
            <Link href="/pricing" className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-primary hover:underline pointer-fine:min-h-0">
              Compare plan prices and savings <ArrowRight className="size-4" aria-hidden />
            </Link>
          </p>
          <Link href="/iptv-free-trial" className="inline-flex min-h-11 items-center gap-1.5 font-medium text-muted-foreground hover:text-foreground hover:underline">
            24-hour free trial available <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
