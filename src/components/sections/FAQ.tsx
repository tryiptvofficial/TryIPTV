"use client";

import {
  ArrowUpRight,
  BookOpen,
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
      `${(COMPANY.summary ?? "TryIPTV is an IPTV subscription service.").replace(/^TryIPTV is /, "TryIPTV (also written Try IPTV, at TryIPTV.com) is ")} TryIPTV is not a player app itself. <a href="/about" class="text-primary hover:underline">Read more about TryIPTV</a>.`,
  },
  {
    question: "What is IPTV?",
    answer:
      'IPTV (Internet Protocol Television) delivers live TV channels and on-demand video over your internet connection instead of a cable or satellite signal. You watch it through a compatible IPTV player app on your own device. <a href="/guides/what-is-iptv" class="text-primary hover:underline">Read the full IPTV guide</a>.',
  },
  {
    question: "What do I need to watch IPTV?",
    answer:
      'You need three things: a compatible device such as a Fire TV Stick or smart TV, a stable internet connection (about 25 Mbps for HD), and an IPTV player app such as TiviMate or IPTV Smarters. TryIPTV is not a player app itself; support sends your login after you order. <a href="/guides/how-does-iptv-work" class="text-primary hover:underline">See how IPTV works step by step</a>.',
  },
  {
    question: "Does TryIPTV offer a free trial?",
    answer:
      '<strong class="font-semibold text-foreground">Yes.</strong> TryIPTV offers a 24-hour free trial at $0. <a href="/iptv-free-trial" class="text-primary hover:underline">Request trial access</a>.',
  },
  {
    question: "Which devices can I use?",
    answer:
      'TryIPTV works on <a href="/devices/firestick-iptv" class="text-primary hover:underline">Fire TV Stick</a>, <a href="/devices/android-tv-iptv" class="text-primary hover:underline">Android TV</a>, <a href="/devices/samsung-tv-iptv" class="text-primary hover:underline">Samsung</a> and <a href="/devices/lg-tv-iptv" class="text-primary hover:underline">LG</a> smart TVs, <a href="/devices/apple-tv-iptv" class="text-primary hover:underline">Apple TV</a>, <a href="/devices/chromecast-iptv" class="text-primary hover:underline">Chromecast with Google TV</a> and <a href="/devices/mag-box-iptv" class="text-primary hover:underline">MAG boxes</a>, through a compatible IPTV player app. It also works on <a href="/devices/windows-iptv" class="text-primary hover:underline">Windows</a>, <a href="/devices/mac-iptv" class="text-primary hover:underline">Mac</a>, and <a href="/devices/iphone-iptv" class="text-primary hover:underline">iPhone and iPad</a>. <a href="/devices/roku-iptv" class="text-primary hover:underline">Roku</a> works through AirPlay or screen mirroring. Each link opens a setup guide, or <a href="/devices" class="text-primary hover:underline">browse all device guides</a>.',
  },
  {
    question: "How do I set up TryIPTV?",
    answer:
      'Setup takes three steps:<ol class="my-2 list-decimal space-y-1 pl-5"><li>Install a compatible IPTV player such as <a href="/players/tivimate" class="text-primary hover:underline">TiviMate</a> or <a href="/players/iptv-smarters" class="text-primary hover:underline">IPTV Smarters</a>.</li><li>Enter the Xtream Codes login or M3U playlist URL that support sends after confirmation.</li><li>Wait for the channel list to load.</li></ol><a href="/setup" class="text-primary hover:underline">View the setup guide</a>, or see the <a href="/help/iptv-login-not-working" class="text-primary hover:underline">IPTV login not working fix</a> if the player rejects your details.',
  },
  {
    question: "How many simultaneous connections are included?",
    answer:
      `Every TryIPTV plan, and the free trial, includes ${PRODUCT_TRUTHS.connections} simultaneous connections, meaning up to two devices can stream at the same time.`,
  },
  {
    question: "Do TryIPTV subscriptions renew automatically?",
    answer:
      '<strong class="font-semibold text-foreground">No.</strong> Plans are paid once for the selected duration and do not automatically renew. <a href="/pricing" class="text-primary hover:underline">Compare plans</a>.',
  },  {
    question: "Is IPTV legal?",
    answer:
      'IPTV as a technology is legal. Whether a particular service is legal depends on whether it holds the rights to what it streams and on the law where you live.<br /><br />Eurojust, the EU agency for criminal justice cooperation, says IPTV services are not illegal in themselves when the provider holds the correct licences for the content (<a href="https://www.eurojust.europa.eu/sites/default/files/assets/eurojust-iptv-flyer.pdf" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">Eurojust IPTV factsheet (EU, PDF), checked October 2026</a>). This is general information, not legal advice. <a href="/disclaimer" class="text-primary hover:underline">Read the disclaimer</a>.',
  },
  {
    question: "Can I get a refund?",
    answer:
      '<strong class="font-semibold text-foreground">Yes, but only if</strong> TryIPTV cannot provide a working subscription. Once your account is activated and the details are delivered, sales are final. <a href="/refund-policy" class="text-primary hover:underline">Read the refund policy</a>.',
  },
  {
    question: "Is TryIPTV legit and safe to pay?",
    answer: `TryIPTV is an IPTV subscription service operated by ${COMPANY.legalName ?? "its operating company"}${COMPANY.location ? `, based in ${COMPANY.location}` : ""}${COMPANY.foundingYear ? `, since ${COMPANY.foundingYear}` : ""}. If TryIPTV cannot provide a working subscription, the <a href="/refund-policy" class="text-primary hover:underline">refund policy</a> applies. <a href="/about" class="text-primary hover:underline">Read more about TryIPTV</a>.`,
  },
  {
    question: "How do I pay?",
    answer: `${
      COMPANY.paymentMethods
        ? `Each plan is a one-time payment by ${COMPANY.paymentMethods}. Support sends the payment instructions on WhatsApp or by email when you order.`
        : "Each plan is a one-time payment. Support sends the payment instructions when you order."
    } <a href="/pricing" class="text-primary hover:underline">See plans and prices</a>.`,
  },
  {
    question: "How quickly do I get my login?",
    answer: `Login details are usually provided within ${PRODUCT_TRUTHS.activationTime} after confirmation, ${PRODUCT_TRUTHS.activationHours.replace(";", ".").replace(" requests", " Requests")}. <a href="/setup" class="text-primary hover:underline">See what to do next</a>.`,
  },
  {
    question: "Which plan should I choose?",
    answer: `Choose ${PRODUCT_TRUTHS.plans[3].duration} ($${PRODUCT_TRUTHS.plans[3].price.toFixed(2)}, about $${PRODUCT_TRUTHS.plans[3].monthlyEquivalent.toFixed(2)} a month) for the lowest monthly cost, or ${PRODUCT_TRUTHS.plans[0].duration} ($${PRODUCT_TRUTHS.plans[0].price.toFixed(2)}) for short-term use. ${PRODUCT_TRUTHS.plans[1].duration} ($${PRODUCT_TRUTHS.plans[1].price.toFixed(2)}) and ${PRODUCT_TRUTHS.plans[2].duration} ($${PRODUCT_TRUTHS.plans[2].price.toFixed(2)}) sit in between. Not sure yet? Start with the free 24-hour trial. Every plan is a one-time payment with ${PRODUCT_TRUTHS.connections} connections. <a href="/pricing" class="text-primary hover:underline">Compare all plans</a>.`,
  },
  {
    question: "Can I watch live sports and PPV events?",
    answer:
      '<strong class="font-semibold text-foreground">Yes.</strong> Every TryIPTV plan includes live sports channels and Pay-Per-View (PPV) events. Event availability can change, so check the channels you care about before a big match. <a href="/pricing" class="text-primary hover:underline">See what every plan includes</a>.',
  },
  {
    question: "Is IPTV cheaper than cable?",
    // Cable figures are the TryIPTV estimates shown on /pricing; check:facts skips them.
    answer: `<strong class="font-semibold text-foreground">Usually, yes.</strong> TryIPTV costs $${PRODUCT_TRUTHS.plans[0].price.toFixed(2)} for one month, or about $${PRODUCT_TRUTHS.plans[3].monthlyEquivalent.toFixed(2)} a month on the 12-month plan, with no box to rent. <span data-facts-ignore>Our estimate for a typical US cable bill is $100–$120 a month advertised and $130–$170 with fees.</span> Channel line-ups differ, so test yours during the free trial. <a href="/pricing" class="text-primary hover:underline">See the full cost comparison</a>.`,
  },
  {
    question: "What internet speed do I need for IPTV?",
    // 25/50 Mbps are TryIPTV's headroom recommendations; the Netflix minimums (3 and 15 Mbps) are the cited outside reference.
    answer: 'About 25 Mbps of stable internet is comfortable for one HD stream, and about 50 Mbps for 4K. Two devices streaming at once need more, and wired Ethernet is steadier than Wi-Fi at busy times.<br /><br />These are our own recommendations, with room for live TV and other devices on your network. For comparison, Netflix lists 3 Mbps or higher for HD (720p) and 15 Mbps or higher for 4K (<a href="https://help.netflix.com/en/node/306" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">Netflix Help Center, checked October 2026</a>). <a href="/guides/iptv-internet-speed" class="text-primary hover:underline">See the IPTV internet speed guide</a> for every quality level.',
  },
  {
    question: "How do I fix IPTV buffering?",
    answer: 'To fix IPTV buffering, connect your device by Ethernet or 5 GHz Wi-Fi, restart the player app and your router, then try a different channel. If only one channel buffers while others play normally, message support with the channel name so they can check that feed.<br /><br />Buffering usually means video data is not reaching your player fast or steadily enough, often because of weak Wi-Fi, a busy home network or a slow device. <a href="/help/iptv-buffering" class="text-primary hover:underline">Follow the IPTV buffering fix guide</a>.',
  },
  {
    question: "What if a channel stops working?",
    answer: `Message support on WhatsApp or at support@tryiptv.com with the channel name and the device you use.${
      COMPANY.support.responseTime
        ? ` Support replies ${COMPANY.support.responseTime.replace(/^Typically/, "typically")}${COMPANY.support.hours ? ` (${COMPANY.support.hours})` : ""}.`
        : ""
    } If TryIPTV cannot provide a working subscription, the <a href="/refund-policy" class="text-primary hover:underline">refund policy</a> applies. <a href="/help/iptv-not-working" class="text-primary hover:underline">See the IPTV not working guide</a>, or the <a href="/help/m3u-not-loading" class="text-primary hover:underline">M3U playlist not loading fix</a> if the whole channel list fails.`,
  },
  {
    question: "Do I need a VPN for IPTV?",
    answer: '<strong class="font-semibold text-foreground">No,</strong> a VPN is not required to use TryIPTV. Some people use one for privacy or if their internet provider slows down streaming. Using a VPN is permitted under the <a href="/terms-conditions" class="text-primary hover:underline">Terms</a>, but it can lower your speed. <a href="/faq" class="text-primary hover:underline">Read the full answer in the IPTV FAQ</a>.',
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
              <p className="mb-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:mb-8 sm:text-[16.5px]">
                TryIPTV plans are one-time payments in USD with no automatic renewal, and support sends your Xtream Codes or M3U login on
                WhatsApp or by email. The answers below cover legality, refunds, payment, delivery, devices and setup. See{" "}
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

          {/* Right Column: Numbered Accordion */}
          <div className="lg:col-span-7">
            <Accordion
              type="multiple"
              defaultValue={["item-0"]}
              className="border-t border-white/[0.07]"
            >
              {homepageFaqs.map((faq, i) => (
                <AccordionItem
                  key={faq.question}
                  value={`item-${i}`}
                  className="border-b border-white/[0.07] [&>[role=region][data-state=closed]]:hidden"
                >
                  <AccordionTrigger className="gap-3.5 py-3 sm:py-3.5 text-left hover:no-underline group">
                    <span className="flex items-start gap-3.5 sm:gap-5">
                      {/* The number is CSS-generated so it stays out of the heading text. */}
                      <span
                        aria-hidden
                        data-n={String(i + 1).padStart(2, "0")}
                        className="mt-0.5 font-mono text-xs sm:text-sm font-semibold text-muted-foreground/60 tabular-nums group-data-[state=open]:text-primary transition-colors shrink-0 before:content-[attr(data-n)]"
                      />
                      <span className="font-headline text-[15.5px] sm:text-[16.5px] font-semibold text-foreground/90 transition-colors group-hover:text-foreground group-data-[state=open]:text-foreground leading-snug">
                        {faq.question}
                      </span>
                    </span>
                  </AccordionTrigger>
                  {/* forceMount keeps closed answers in the HTML (hidden until opened) so they are crawlable. */}
                  <AccordionContent forceMount className="pr-3 pb-4.5 pl-7 sm:pl-10 text-base sm:text-[15px] leading-relaxed text-muted-foreground/95 [&_a]:underline [&_a]:decoration-primary/40 [&_a]:underline-offset-4 [&_a:hover]:decoration-primary">
                    {/* A div, not a span: some answers contain a list. */}
                    <div
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
          </div>
        </div>
      </Container>
    </Section>
  );
}
