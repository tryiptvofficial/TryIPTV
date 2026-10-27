import type { Metadata } from "next";
import Link from "next/link";
import {
  CheckCircle2,
  Home,
  MessageCircle,
  ShieldAlert,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { SectionHeader } from "@/components/shared/SectionHeader";

const whatsappUrl =
  "https://wa.me/212694833293?text=Hello%20TryIPTV%2C%20I%20have%20completed%20my%20payment%20and%20would%20like%20to%20activate%20my%20IPTV%20subscription.";

const nextSteps = [
  {
    title: "Payment completed",
    description: "Your order payment has been submitted.",
  },
  {
    title: "Contact us",
    description:
      "Send us a WhatsApp message so we can identify and verify your order.",
  },
  {
    title: "Receive your access",
    description:
      "After verification, we will send your IPTV access details and setup information.",
  },
];

export const metadata: Metadata = {
  title: {
    absolute: "Order Received | TryIPTV",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouPage() {
  return (
    <>
      <Section className="relative overflow-hidden border-b border-white/[0.07] pt-12 pb-14 sm:pt-16 sm:pb-20">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full border border-primary/25 bg-primary/[0.08] text-primary shadow-[0_0_42px_rgba(0,240,120,0.12)]">
              <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
            </div>
            <SectionHeader
              as="h1"
              eyebrow="Order Received"
              title="Thank You for Your Order"
              subtitle="Your payment has been submitted successfully. Contact us on WhatsApp so we can verify your order and send your IPTV access details."
              className="mb-0"
            />
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Contact Us on WhatsApp
                  <span className="sr-only"> (opens WhatsApp in a new tab)</span>
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full sm:w-auto"
              >
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Return to Home
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_0.82fr] lg:gap-8">
            <div>
              <p className="eyebrow mb-3">Next Steps</p>
              <div className="grid grid-cols-1 border-y border-white/[0.09] md:grid-cols-3 md:divide-x md:divide-white/[0.09]">
                {nextSteps.map((step, index) => (
                  <article
                    key={step.title}
                    className="relative border-b border-white/[0.09] px-6 py-7 last:border-b-0 md:border-b-0"
                  >
                    <div className="mb-5 flex items-center justify-between">
                      <span className="text-xs font-extrabold text-muted-foreground">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="grid h-10 w-10 place-items-center rounded-md border border-primary/20 bg-primary/[0.06] text-primary">
                        <Send className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </div>
                    <h2 className="font-headline text-xl font-extrabold leading-7 text-foreground">
                      {step.title}
                    </h2>
                    <p className="mt-3 text-base sm:text-sm leading-6 text-muted-foreground">
                      {step.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <p className="eyebrow mb-1">Order Information</p>
                  <CardTitle
                    as="h2"
                    className="font-headline text-2xl font-extrabold"
                  >
                    What should I send on WhatsApp?
                  </CardTitle>
                  <CardDescription>
                    Please send the name or email used for your order and, if
                    available, your payment confirmation.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-3 rounded-lg border border-white/[0.08] bg-[#101512] p-4 text-base sm:text-sm leading-6 text-muted-foreground">
                    <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <p>
                      Never send passwords, private keys, seed phrases, or full
                      payment credentials.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="rounded-lg border border-white/[0.09] bg-[#070a08] p-5 text-base sm:text-sm leading-6 text-muted-foreground">
                Already contacted us? You can close this page. We&apos;ll
                continue with you on WhatsApp.
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
