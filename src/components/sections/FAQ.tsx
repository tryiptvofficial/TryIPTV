import {
  ArrowUpRight,
  BookOpen,
  ChevronDown,
  Mail,
  MessagesSquare,
} from "lucide-react";
import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Container } from "../shared/Container";
import { Section } from "../shared/Section";
import { SectionHeader } from "../shared/SectionHeader";
import { cn } from "@/lib/utils";
import { COMPANY } from "@/lib/site-data/company";
import { PRODUCT_TRUTHS } from "@/lib/site-config";

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqListProps {
  items: FaqItem[];
  className?: string;
}

const CONTACTS = [
  {
    icon: MessagesSquare,
    label: "Customer Support",
    detail: "WhatsApp & email assistance",
    href: "/contact-us",
    isExternal: false,
  },
  {
    icon: Mail,
    label: "support@tryiptv.com",
    detail: "Billing & playlist inquiries",
    href: "mailto:support@tryiptv.com",
    isExternal: true,
  },
  {
    icon: BookOpen,
    label: "Universal Setup Guides",
    detail: "Step-by-step device tutorials",
    href: "/setup",
    isExternal: false,
  },
];

const homepageFaqs: FaqItem[] = [
  {
    question: "What is TryIPTV?",
    answer:
      `${(COMPANY.summary ?? "TryIPTV is an IPTV subscription service.").replace(/^TryIPTV is /, "TryIPTV (also written Try IPTV, at TryIPTV.com) is ")}<br /><br />TryIPTV is not a player app itself. Read more <a href="/about" class="text-primary hover:underline">about TryIPTV and its operator</a>.`,
  },
  {
    question: "Does TryIPTV offer a free trial?",
    answer:
      '<strong class="font-semibold text-foreground">Yes.</strong> TryIPTV offers a 24-hour free trial at $0. <a href="/iptv-free-trial" class="text-primary hover:underline">Request trial access</a>.',
  },
  {
    question: "Which devices can I use?",
    answer:
      'TryIPTV works on most smart TVs, streaming devices, phones and computers. Supported devices include <a href="/devices/firestick-iptv" class="text-primary hover:underline">Fire TV Stick</a>, <a href="/devices/android-tv-iptv" class="text-primary hover:underline">Android TV</a>, <a href="/devices/samsung-tv-iptv" class="text-primary hover:underline">Samsung</a> and <a href="/devices/lg-tv-iptv" class="text-primary hover:underline">LG</a> smart TVs, <a href="/devices/apple-tv-iptv" class="text-primary hover:underline">Apple TV</a>, <a href="/devices/chromecast-iptv" class="text-primary hover:underline">Chromecast with Google TV</a> and <a href="/devices/mag-box-iptv" class="text-primary hover:underline">MAG boxes</a> (IPTV set-top boxes). Each one needs a compatible IPTV player app.<br /><br />TryIPTV also works on <a href="/devices/windows-iptv" class="text-primary hover:underline">Windows</a>, <a href="/devices/mac-iptv" class="text-primary hover:underline">Mac</a>, <a href="/devices/iphone-iptv" class="text-primary hover:underline">iPhone and iPad</a>. <a href="/devices/roku-iptv" class="text-primary hover:underline">Roku</a> works through AirPlay (Apple\'s screen-casting feature) or screen mirroring. Each device name links to its setup guide, or <a href="/devices" class="text-primary hover:underline">browse all device guides</a>.',
  },
  {
    question: "Is TryIPTV easy for beginners?",
    answer: `<strong class="font-semibold text-foreground">Yes.</strong> Setup takes three steps: install a compatible IPTV player app, enter the login support sends you, and wait for the channel list to load. No technical skills are needed.<br /><br />If you get stuck, <a href="/contact-us" class="text-primary hover:underline">message support</a> on WhatsApp or by email. Read the <a href="/setup" class="text-primary hover:underline">universal IPTV setup guide</a>.`,
  },
  {
    question: "How many simultaneous connections are included?",
    answer:
      `Every TryIPTV plan, and the free trial, includes ${PRODUCT_TRUTHS.connections} simultaneous connections. That means two devices, such as two TVs in different rooms, can stream at the same time.`,
  },
  {
    question: "Do TryIPTV subscriptions renew automatically?",
    answer:
      `<strong class="font-semibold text-foreground">No, there is nothing to cancel.</strong> ${PRODUCT_TRUTHS.expiry.summary} Plans are paid once for the selected duration (1, 3, 6 or 12 months) and do not automatically renew. Nothing is charged again unless you buy another plan. <a href="/pricing" class="text-primary hover:underline">Compare plans</a> on the pricing page.`,
  },  {
    question: "Is IPTV legal?",
    answer:
      '<strong class="font-semibold text-foreground">Yes,</strong> IPTV as a technology is legal.<br /><br />Whether a particular service is legal depends on whether it holds the rights to what it streams and on the law where you live. The EU justice agency Eurojust says IPTV services are not illegal in themselves when the provider has the correct content licences. Source: <a href="https://www.eurojust.europa.eu/sites/default/files/assets/eurojust-iptv-flyer.pdf" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">Eurojust IPTV factsheet (EU, PDF), checked October 2026</a>. This is general information, not legal advice. <a href="/disclaimer" class="text-primary hover:underline">Read the TryIPTV disclaimer</a>.',
  },
  {
    question: "Can I get a refund?",
    answer:
      '<strong class="font-semibold text-foreground">TryIPTV refunds a purchase only if</strong> it cannot provide a working subscription. Once your account is activated and the login details are delivered, the sale is final. <a href="/refund-policy" class="text-primary hover:underline">Read the refund policy</a>.',
  },
  {
    question: "Is TryIPTV legit?",
    answer: `TryIPTV support answers on WhatsApp and by email${COMPANY.support.hours ? `, ${COMPANY.support.hours}` : ""}.<br /><br />If TryIPTV cannot provide a working subscription, the <a href="/refund-policy" class="text-primary hover:underline">refund policy</a> applies. To contact us or see the company details, visit the <a href="/about" class="text-primary hover:underline">about page</a>.`,
  },
  {
    question: "How do I pay?",
    answer: `${
      COMPANY.paymentMethods
        ? `Each plan is a one-time payment by ${COMPANY.paymentMethods}. Support sends the payment instructions on WhatsApp or by email when you order.`
        : "Each plan is a one-time payment. Support sends the payment instructions when you order."
    } <a href="/pricing" class="text-primary hover:underline">See plans and prices</a>, or read the <a href="/privacy-policy" class="text-primary hover:underline">Privacy Policy</a>.`,
  },
  {
    question: "How quickly do I get my login?",
    answer: `Login details are usually provided within ${PRODUCT_TRUTHS.activationTime} after confirmation, during support hours.${COMPANY.support.hours ? ` Support is open ${COMPANY.support.hours}${COMPANY.support.hoursUk ? ` (${COMPANY.support.hoursUk})` : ""}.` : ""}<br /><br />${PRODUCT_TRUTHS.activationHours.split("; ")[1].replace(/^r/, "R")}. Read the <a href="/setup" class="text-primary hover:underline">universal IPTV setup guide</a>, or use the <a href="/help/epg-not-working" class="text-primary hover:underline">TV guide (EPG) not working fix</a> if the guide stays empty.`,
  },
  {
    question: "How much does TryIPTV cost?",
    answer: `TryIPTV costs $${PRODUCT_TRUTHS.plans[0].price.toFixed(2)} for one month, or about $${PRODUCT_TRUTHS.plans[3].monthlyEquivalent.toFixed(2)} a month on the 12-month plan ($${PRODUCT_TRUTHS.plans[3].price.toFixed(2)} paid once). Every plan includes ${PRODUCT_TRUTHS.connections} simultaneous connections and does not renew automatically. <a href="/pricing" class="text-primary hover:underline">Compare all plan prices</a>.`,
  },
  {
    question: "Which plan should I choose?",
    // Short lead names the plan for each common situation; the second paragraph holds the rest.
    answer: `The ${PRODUCT_TRUTHS.plans[3].duration} plan ($${PRODUCT_TRUTHS.plans[3].price.toFixed(2)}, about $${PRODUCT_TRUTHS.plans[3].monthlyEquivalent.toFixed(2)} a month) costs the least per month for year-round viewing. The ${PRODUCT_TRUTHS.plans[0].duration} plan ($${PRODUCT_TRUTHS.plans[0].price.toFixed(2)}) suits short-term use, such as one season or one event.<br /><br />The ${PRODUCT_TRUTHS.plans[1].duration} ($${PRODUCT_TRUTHS.plans[1].price.toFixed(2)}) and ${PRODUCT_TRUTHS.plans[2].duration} ($${PRODUCT_TRUTHS.plans[2].price.toFixed(2)}) plans sit in between. Every plan includes ${PRODUCT_TRUTHS.connections} simultaneous connections, so two TVs in different rooms work on any plan, and every plan is a one-time payment. Not sure yet? Start with the free 24-hour trial. <a href="/pricing" class="text-primary hover:underline">Compare all plans</a>.`,
  },
  {
    question: "Can I watch live sports and PPV events?",
    answer:
      '<strong class="font-semibold text-foreground">Yes.</strong> Every TryIPTV plan includes live sports channels and Pay-Per-View (PPV) events. Event availability can change, so check the channels you care about before a big match. <a href="/pricing" class="text-primary hover:underline">See what every plan includes</a>.',
  },
  {
    question: "Is IPTV cheaper than cable?",
    // Cable figures are the TryIPTV estimates shown on /pricing; check:facts skips them.
    answer: `<strong class="font-semibold text-foreground">Usually, yes.</strong> TryIPTV costs $${PRODUCT_TRUTHS.plans[0].price.toFixed(2)} for one month, or about $${PRODUCT_TRUTHS.plans[3].monthlyEquivalent.toFixed(2)} a month on the 12-month plan, with no box to rent. <span data-facts-ignore>Cable providers typically advertise about $100–$120 a month before fees, and a typical US bill is $130–$170 with fees (our estimates).</span><br /><br />Channel line-ups differ, so test yours during the free trial. <a href="/pricing" class="text-primary hover:underline">See the full cost comparison</a>.`,
  },
];

/**
 * Reusable single-column FaqList preserved for guide & device pages.
 */
export function FaqList({ items, className }: FaqListProps) {
  return (
    <Accordion
      type="single"
      collapsible
      className={cn(
        "mx-auto max-w-[880px] overflow-hidden rounded-[18px] border border-white/[0.08] bg-[#07080a] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]",
        className
      )}
    >
      {items.map((faq, i) => (
        <AccordionItem
          key={i}
          value={`item-${i}`}
          className="border-b border-white/[0.07] px-6 sm:px-8 last:border-b-0 [&>[role=region][data-state=closed]]:hidden"
        >
          <AccordionTrigger className="min-h-[68px] py-5 sm:py-6 text-left text-[16px] font-semibold leading-snug text-foreground/90 hover:no-underline hover:text-foreground transition-colors sm:text-[17px]">
            {faq.question}
          </AccordionTrigger>
          {/* forceMount keeps closed answers in the server HTML (hidden until opened): crawlers that
              don't run JavaScript (ChatGPT, Claude, Perplexity) otherwise see questions with no answers. */}
          <AccordionContent forceMount className={`pb-6 sm:pb-8 pr-4 sm:pr-8 text-base leading-relaxed text-muted-foreground [&_a]:underline [&_a]:decoration-primary/40 [&_a]:underline-offset-4 [&_a:hover]:decoration-primary`}>
            <span
              dangerouslySetInnerHTML={{
                __html: faq.answer.includes("support@tryiptv.com")
                  ? faq.answer.replace(
                      "support@tryiptv.com",
                      "<!--email_off-->support@tryiptv.com<!--/email_off-->"
                    )
                  : faq.answer,
              }}
            />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

/**
 * Modern two-column FAQ for homepage: sticky support card on the left
 * and numbered accordion list on the right.
 */
export function FAQ() {
  return (
    <Section id="faq" className="border-t border-white/[0.07]">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: Heading & Support Channels */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <SectionHeader
                align="left"
                eyebrow="Support, clarified"
                title="Frequently Asked Questions"
                className="mb-4 sm:mb-4 lg:mb-4"
              />
              <p className="mb-6 max-w-[60ch] text-base leading-relaxed text-muted-foreground sm:mb-8 sm:text-[16.5px]">
                This FAQ covers legality, refunds, payment, delivery, devices and setup. See{" "}
                <Link href="/faq" className="font-semibold text-primary hover:underline">all IPTV FAQs</Link>{" "}
                or{" "}
                <Link href="/help" className="font-semibold text-primary hover:underline">troubleshooting guides</Link>{" "}
                for the full answers. New to IPTV? Start with the{" "}
                <Link href="/guides" className="font-semibold text-primary hover:underline">IPTV guides</Link>, including{" "}
                <Link href="/guides/iptv-internet-speed" className="font-semibold text-primary hover:underline">how much internet speed you need</Link>,{" "}
                <Link href="/guides/what-is-epg" className="font-semibold text-primary hover:underline">what an EPG is</Link> and{" "}
                <Link href="/guides/what-is-m3u" className="font-semibold text-primary hover:underline">what an M3U playlist is</Link>.
              </p>

              <div className="rounded-2xl border border-white/[0.07] bg-card p-1.5">
                <ul className="divide-y divide-white/[0.06]">
                  {CONTACTS.map(({ icon: Icon, label, detail, href, isExternal }) => {
                    const Component = isExternal ? "a" : Link;
                    const isEmail = href.startsWith("mailto:");
                    return (
                      <li key={label}>
                        {/* email_off around the mailto card stops Cloudflare rewriting it into a /cdn-cgi link. */}
                        {isEmail && <span hidden dangerouslySetInnerHTML={{ __html: "<!--email_off-->" }} />}
                        <Component
                          href={href}
                          className="group/contact flex items-center gap-3.5 rounded-xl p-3.5 sm:p-4 outline-hidden transition-colors hover:bg-white/[0.04] focus-visible:ring-2 focus-visible:ring-primary/50"
                        >
                          <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-white/[0.07] bg-white/[0.025] transition-colors group-hover/contact:border-primary/40 group-hover/contact:bg-primary/10">
                            <Icon aria-hidden className="size-4.5 text-primary" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-semibold text-foreground/90 transition-colors group-hover/contact:text-foreground">
                              {label}
                            </span>
                            <span className="block text-xs text-muted-foreground/85">
                              {detail}
                            </span>
                          </span>
                          <ArrowUpRight
                            aria-hidden
                            className="size-3.5 shrink-0 text-muted-foreground transition-transform group-hover/contact:-translate-y-0.5 group-hover/contact:translate-x-0.5 group-hover/contact:text-primary motion-reduce:transition-none"
                          />
                        </Component>
                        {isEmail && <span hidden dangerouslySetInnerHTML={{ __html: "<!--/email_off-->" }} />}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: numbered questions. Native <details> needs no JavaScript, so this section
              ships no client code; closed answers stay in the HTML, so they are crawlable. */}
          <div className="lg:col-span-7">
            <div className="border-t border-white/[0.07]">
              {homepageFaqs.map((faq, i) => (
                <details key={faq.question} open={i === 0} className="group border-b border-white/[0.07]">
                  {/* Questions stay h3s, as in the old accordion; a heading inside <summary> is valid HTML. */}
                  <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3.5 py-3 text-left sm:py-3.5 [&::-webkit-details-marker]:hidden">
                    <h3 className="flex items-start gap-3.5 sm:gap-5">
                      {/* The number is CSS-generated so it stays out of the question text. */}
                      <span
                        aria-hidden
                        data-n={String(i + 1).padStart(2, "0")}
                        className="mt-0.5 shrink-0 font-mono text-xs font-semibold tabular-nums text-muted-foreground/60 transition-colors before:content-[attr(data-n)] group-open:text-primary sm:text-sm"
                      />
                      <span className="font-headline text-[15.5px] font-semibold leading-snug text-foreground/90 transition-colors group-hover:text-foreground group-open:text-foreground sm:text-[16.5px]">
                        {faq.question}
                      </span>
                    </h3>
                    <ChevronDown aria-hidden className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none" />
                  </summary>
                  {/* A div, not a span: some answers contain a list. */}
                  <div
                    className="pr-3 pb-4.5 pl-7 text-base leading-relaxed text-muted-foreground/95 sm:pl-10 sm:text-[15px] [&_a]:underline [&_a]:decoration-primary/40 [&_a]:underline-offset-4 [&_a:hover]:decoration-primary"
                    dangerouslySetInnerHTML={{
                      __html: faq.answer.includes("support@tryiptv.com")
                        ? faq.answer.replace(
                            "support@tryiptv.com",
                            "<!--email_off-->support@tryiptv.com<!--/email_off-->"
                          )
                        : faq.answer,
                    }}
                  />
                </details>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
