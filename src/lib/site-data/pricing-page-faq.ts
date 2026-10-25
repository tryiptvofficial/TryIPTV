import { FACT_TEXT, PRODUCT_TRUTHS } from "../site-config.ts";
import { COMPANY } from "./company.ts";

const T = PRODUCT_TRUTHS;

// Question order follows the owner-supplied page (2026-10-20); answers come from PRODUCT_TRUTHS and COMPANY.
export const pricingPageFaqs: { question: string; answer: string; link?: { href: string; label: string } }[] = [
  {
    question: "How much does an IPTV subscription cost?",
    answer: `TryIPTV plans cost ${FACT_TEXT.priceList}. The longer the term, the lower the monthly equivalent: from ${FACT_TEXT.fromPrice} a month on the 1-month plan down to ${FACT_TEXT.lowestMonthly} a month on the 12-month plan.`,
  },
  {
    question: "Does the price go up when my plan renews?",
    answer:
      "Plans do not renew automatically, so you are never charged again without asking. When your term ends, access stops; if you want to continue, you buy a new term at the price shown on this page at that time.",
  },
  {
    question: "How many devices does each plan cover?",
    answer: `Every paid plan includes ${T.connections} simultaneous connections. You can set up your login on as many compatible devices as you like, but only ${T.connections} can stream at the same time. For more screens at once, buy an additional subscription.`,
  },
  {
    question: "How fast do I receive my login?",
    answer: `Your login details are typically delivered on WhatsApp within ${T.activationTime} after payment is confirmed.`,
  },
  {
    question: "Can I get English-only channels?",
    answer:
      "Most IPTV players, including TiviMate and IPTV Smarters, let you hide the channel groups you don't need, so you can keep only the categories and languages you watch. Use the free trial to check that the English channels you want are there before you buy.",
  },
  {
    question: "Why does some EPG show \"No Information\"?",
    answer:
      "That usually means the player has not loaded the TV guide yet, the guide needs refreshing, or that particular channel has no schedule data.",
    link: { href: "/help/epg-not-working", label: "Follow the EPG troubleshooting guide" },
  },
  {
    question: "Do you offer refunds?",
    answer: `Only in limited cases. ${T.refund.summary} ${T.refund.exclusions} The refund policy page explains how to make a request.`,
    link: { href: "/refund-policy", label: "Read the refund policy" },
  },
  {
    question: "What payment methods are available?",
    answer: COMPANY.paymentMethods
      ? `You can pay by ${COMPANY.paymentMethods}. Support sends the payment instructions on WhatsApp when you order. Every order is a one-time purchase with no automatic renewal.`
      : "Current payment instructions are provided when ordering. All orders are one-time purchases with no automatic renewals or recurring charges.",
  },
  {
    question: "Which plan has the lowest monthly equivalent?",
    answer: `The 12-month plan, at ${FACT_TEXT.lowestMonthly} a month ($88.23 paid upfront), compared with ${FACT_TEXT.fromPrice} a month on the 1-month plan.`,
  },
  {
    question: "Can I test TryIPTV before buying?",
    answer: `Yes. You can request a ${FACT_TEXT.trialHours}-hour free trial with no credit card required to check channels, playback, and device compatibility before choosing a paid plan.`,
    link: { href: "/iptv-free-trial", label: "Start the free trial" },
  },
];
