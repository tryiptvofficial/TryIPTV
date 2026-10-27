import { Button } from "@/components/ui/button";
import { Container } from "../shared/Container";
import Link from "next/link";
import { ArrowRight, Check, CircleCheck } from "lucide-react";
import { Section } from "../shared/Section";
import type React from "react";

import { cn } from "@/lib/utils";
import { PRODUCT_TRUTHS, FACT_TEXT } from "@/lib/site-config";

interface CTAProps {
  title?: string;
  subtitle?: string;
  eyebrow?: string;
  buttonText?: string;
  buttonHref?: string;
  className?: string;
  badgeIcon?: React.ReactNode;
  showTrustPills?: boolean;
}

export function CTA({
  title = "Start Your 24-Hour IPTV Free Trial",
  subtitle = `The TryIPTV free trial gives you ${FACT_TEXT.trialHours} hours of access for $0, with no credit card. Use it to check the channel lineup and picture quality (HD and 4K where available). You can also test player setup on your own device and network before you choose a paid plan.`,
  eyebrow = "Not Sure TryIPTV Is Right for You?",
  buttonText = "Start Free Trial",
  buttonHref = "/iptv-free-trial",
  className,
  badgeIcon = <CircleCheck className="h-4 w-4" />,
  showTrustPills,
}: CTAProps = {}) {
  const isExternal = buttonHref.startsWith("http");
  const LinkComp = isExternal ? "a" : Link;
  const externalProps = isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {};
  const shouldShowPills = showTrustPills ?? buttonHref.includes("trial");

  return (
    <Section className={cn(className)}>
      <Container>
        <div className="gap-10 rounded-2xl border border-primary/30 bg-[linear-gradient(135deg,rgba(0,240,120,0.06),transparent_60%)] p-6 sm:p-10 lg:flex lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            {eyebrow && (
              <p className="mb-2.5 flex items-center justify-start gap-2 font-mono text-xs font-bold uppercase tracking-wider text-primary">
                {badgeIcon}
                {eyebrow}
              </p>
            )}
            <h2 className="font-headline text-[26px] font-bold leading-tight tracking-tight text-foreground sm:text-3xl lg:text-[34px]">
              {/* Keep hyphenated words like "24-Hour" on one line. */}
              {title.split(/(\S+-\S+)/).map((part, i) =>
                i % 2 ? <span key={i} className="whitespace-nowrap">{part}</span> : part
              )}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              {subtitle}
            </p>

            {shouldShowPills && (
              <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-foreground/90">
                {["24-Hour Trial ($0)", "No Credit Card Required", "5–15 Min Activation"].map((fact) => (
                  <li key={fact} className="flex items-center gap-2">
                    <Check className="size-4 text-primary" aria-hidden />
                    {fact}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-8 lg:mt-0 lg:shrink-0">
            <Button asChild>
              <LinkComp href={buttonHref} {...externalProps}>
                {buttonText} <ArrowRight aria-hidden />
              </LinkComp>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
