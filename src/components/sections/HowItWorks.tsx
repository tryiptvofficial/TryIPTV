import Link from "next/link";
import type React from "react";
import { CheckCircle, Package, Tv } from "lucide-react";
import { Container } from "../shared/Container";
import { SectionHeader } from "../shared/SectionHeader";
import { Section } from "../shared/Section";
import { PRODUCT_TRUTHS, FACT_TEXT } from "@/lib/site-config";

interface Step {
  icon: typeof Package;
  title: string;
  description: React.ReactNode;
}

const steps: Step[] = [
    {
        icon: Package,
        title: "Choose a Plan or Start a Trial",
        description: <>Choose an IPTV plan or start the <Link href="/iptv-free-trial" className="font-semibold text-primary hover:underline">24-hour free trial</Link>. See the <Link href="/how-it-works" className="font-semibold text-primary hover:underline">full buying path</Link>, step by step.</>
    },
    {
        icon: CheckCircle,
        title: "Receive Your Login",
        description: `Credentials are typically delivered within ${PRODUCT_TRUTHS.activationTime} after confirmation, ${PRODUCT_TRUTHS.activationHours.split(";")[0]}. They come as an Xtream Codes login (server address, username and password) or an M3U playlist link.`
    },
    {
        icon: Tv,
        title: "Set Up Your Device",
        description: (
          <>
            Install a{" "}
            <Link href="/players" className="font-semibold text-primary hover:underline">
              compatible IPTV player
            </Link>
            , enter your Xtream Codes or M3U details, then follow the{" "}
            <Link href="/setup" className="font-semibold text-primary hover:underline">
              universal IPTV setup guide
            </Link>
            .
          </>
        )
    }
];

export function HowItWorks() {
  return (
    <Section id="how-it-works" variant="alt" className="border-b-0">
      <Container>
        <SectionHeader quiet
          align="left"
          title="How Do I Start With TryIPTV?"
          subtitle={`To start with TryIPTV, choose a plan or request the free ${FACT_TEXT.trialHours}-hour trial on WhatsApp. Support sends your Xtream Codes or M3U login details, usually within ${PRODUCT_TRUTHS.activationTime}.`}
          eyebrow="Setup process"
        />
        <ol role="list" className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-5">
          {steps.map((step, i) => (
            <li key={i} className="rounded-2xl border border-white/[0.07] bg-card p-6">
              <div className="flex items-center justify-between">
                <span className="grid size-10 place-items-center rounded-xl border border-white/[0.07] bg-white/[0.03] text-muted-foreground">
                  <step.icon className="size-5" aria-hidden />
                </span>
                <span aria-hidden className="font-mono text-xs tabular-nums text-muted-foreground">
                  0{i + 1}
                </span>
              </div>
              <h3 className="mt-5 font-headline text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-base sm:text-sm leading-6 text-muted-foreground">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
