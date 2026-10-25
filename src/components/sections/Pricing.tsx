import { Button } from "@/components/ui/button";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { plans } from "@/lib/site-data/pricing";
import { Container } from "../shared/Container";
import { SectionHeader } from "../shared/SectionHeader";
import Link from "next/link";
import { Section } from "../shared/Section";

interface PricingProps {
  showHeader?: boolean;
  title?: string;
  subtitle?: string;
  eyebrow?: string;
  className?: string;
}

export function Pricing({
  showHeader = true,
  title = "Compare IPTV Plans & Select Your Duration",
  subtitle = "All plans are one-time subscriptions with no hidden fees and no automatic renewals. Every package includes access to the available live TV channels, VOD, and 2 simultaneous connections.",
  eyebrow = "IPTV Plans",
  className,
}: PricingProps = {}) {
  return (
    <Section id="pricing-plans" className={cn("bg-[#050706]", className)}>
      <Container>
        {showHeader && (
          <SectionHeader
            title={title}
            subtitle={subtitle}
            eyebrow={eyebrow}
          />
        )}
        <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {plans.map((plan, i) => (
            <Card
              key={plan.name}
              className={cn(
                "relative flex h-full flex-col justify-between overflow-hidden rounded-[18px] border border-white/[0.08] bg-[#07080a] p-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] transition-all duration-200 hover:border-white/[0.16] hover:bg-[#090b0d] motion-safe:hover:-translate-y-0.5",
                plan.isPopular && "border-primary/40 bg-[linear-gradient(180deg,rgba(0,240,120,0.05),rgba(7,8,10,0)_42%),#07080a] hover:border-primary/60"
              )}
            >
              {plan.isPopular && (
                <div className="absolute right-4 top-4 rounded-md border border-primary/25 bg-primary/[0.08] px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-primary">
                  Best Value
                </div>
              )}
              <CardHeader className="p-6 pb-5 sm:p-7 sm:pb-5">
                <p className="text-[11px] font-mono font-semibold uppercase tracking-[0.08em] text-muted-foreground/80">
                  {String(i + 1).padStart(2, '0')} / Plan
                </p>
                <CardTitle className="pt-2 font-headline text-xl font-bold tracking-tight text-foreground">
                  {plan.name}
                </CardTitle>
                <div className="pt-3">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-headline text-[40px] sm:text-[44px] font-bold tracking-tight text-foreground leading-none">
                      ${plan.price.toFixed(2)}
                    </span>
                    <span className="text-xs font-medium text-muted-foreground">one-time</span>
                  </div>
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    <span className="text-foreground/90 font-medium">
                      equivalent to ${plan.price_monthly.toFixed(2)}/month
                    </span>
                    {plan.savings && (
                      <span className="ml-1.5 inline-block rounded bg-primary/10 px-1.5 py-0.2 text-[10px] font-semibold text-primary">
                        {plan.savings}
                      </span>
                    )}
                  </p>
                </div>
              </CardHeader>
              <CardFooter className="px-6 pb-6 pt-4 sm:px-7 sm:pb-7">
                <Button
                  asChild
                  className="w-full h-12 min-h-[48px] rounded-xl text-[15px] font-semibold"
                  variant={plan.isPopular ? "default" : "outline"}
                >
                  <Link href={plan.checkoutUrl}>Choose {plan.name}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="mt-6 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 text-center text-xs text-muted-foreground sm:text-sm">
          Every plan includes the same core service features: access to 25,000+ live channels worldwide, 120,000+ movies and TV shows, Smart EPG, and 2 simultaneous device connections. Only duration and savings differ.
        </div>
      </Container>
    </Section>
  );
}
