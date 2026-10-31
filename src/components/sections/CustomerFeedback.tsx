import Image from "next/image";
import { Container } from "../shared/Container";
import { SectionHeader } from "../shared/SectionHeader";
import { Section } from "../shared/Section";
import { MessageSquareCheck } from "lucide-react";
import { COMPANY } from "@/lib/site-data/company";

import feedback1 from "../../../public/images/feedback/customer-feedback-1.jpg";
import feedback2 from "../../../public/images/feedback/customer-feedback-2.jpg";
import feedback3 from "../../../public/images/feedback/customer-feedback-3.jpg";
import feedback4 from "../../../public/images/feedback/customer-feedback-4.jpg";
import feedback5 from "../../../public/images/feedback/customer-feedback-5.jpg";

export const customerFeedbackItems = [
  {
    id: "feedback-1",
    src: feedback1,
    alt: "WhatsApp support chat recommending a player app for Xtream Codes login details",
    title: "IPTV Smarters Pro Setup",
    highlight: "Xtream Codes API • Setup Completed",
  },
  {
    id: "feedback-2",
    src: feedback2,
    alt: "WhatsApp support chat about adding an account in a TV player app",
    title: "Smart TV OTT Player",
    highlight: "Live TV Setup • Support Assisted",
  },
  {
    id: "feedback-3",
    src: feedback3,
    alt: "WhatsApp support chat in which login details are sent, with the details hidden",
    title: "M3U & Xtream Delivery",
    highlight: "M3U & Xtream Delivery",
  },
  {
    id: "feedback-4",
    src: feedback4,
    alt: "WhatsApp support chat about activating the Smart IPTV app with a device MAC address",
    title: "12-Month Smart IPTV Activation",
    highlight: "Annual Subscription • MAC Address Loaded",
  },
  {
    id: "feedback-5",
    src: feedback5,
    alt: "WhatsApp support chat about whether a VPN is needed",
    title: "Streaming Setup Feedback",
    highlight: "Stream Setup Feedback",
  },
];

export function CustomerFeedback() {
  return (
    <Section id="customer-feedback">
      <Container>
        <SectionHeader quiet
          align="left"
          title="How Does TryIPTV Support Work?"
          subtitle={
            <>
              TryIPTV support works on WhatsApp and by email at{" "}
              {/* email_off keeps Cloudflare from replacing the address with a /cdn-cgi link crawlers can't read. */}
              <span dangerouslySetInnerHTML={{ __html: `<!--email_off-->${COMPANY.support.email}<!--/email_off-->` }} />
              {`.${COMPANY.support.hours ? ` It is open ${COMPANY.support.hours}${COMPANY.support.hoursUk ? ` (${COMPANY.support.hoursUk})` : ""}.` : ""}${COMPANY.support.responseTime ? ` Response time: ${COMPANY.support.responseTime.charAt(0).toLowerCase()}${COMPANY.support.responseTime.slice(1)}.` : ""}`}
              <br />
              <br />
              Support handles setup, billing and playback questions. The screenshots in this section are example support conversations with personal details hidden.
            </>
          }
          eyebrow="Customer support"
        />

        {/* Visitor-controlled row instead of an auto-scrolling marquee: each screenshot appears once and can be read at the visitor's pace. */}
        <div
          role="region"
          aria-label="Customer WhatsApp conversation screenshots"
          tabIndex={0}
          className="-mx-5 snap-x snap-mandatory overflow-x-auto scroll-px-5 pb-4 sm:-mx-6 sm:scroll-px-6 lg:-mx-8 lg:scroll-px-8"
        >
          <ul className="flex w-max items-stretch gap-4 px-5 sm:px-6 lg:px-8">
            {customerFeedbackItems.map((item) => (
              <li key={item.id} className="flex snap-start">
                <figure className="flex w-[240px] flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-card sm:w-[260px]">
                  <div className="relative aspect-[525/1024] w-full bg-[#0a0d0b]">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      placeholder="blur"
                      className="h-full w-full object-cover"
                      sizes="260px"
                      loading="lazy"
                    />
                  </div>
                  <figcaption className="flex-1 border-t border-white/[0.07] px-4 py-3">
                    <span className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                      <MessageSquareCheck className="size-4 shrink-0 text-primary" aria-hidden="true" />
                      {item.title}
                    </span>
                    <span className="mt-1 block text-xs text-muted-foreground">{item.highlight}</span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
