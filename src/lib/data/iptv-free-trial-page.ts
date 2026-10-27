import { unstable_cache as cache } from 'next/cache';
import { generateBreadcrumbSchema, generateServiceSchema } from '@/lib/schema';
import type { BreadcrumbList, Service } from 'schema-dts';
import { FACT_TEXT, PRODUCT_TRUTHS, siteConfig } from '@/lib/site-config';

const T = PRODUCT_TRUTHS;

// Question order follows the owner-supplied page (2026-10-20); answers come from PRODUCT_TRUTHS.
export const trialFaqs = [
  {
    question: "How long does the free trial last?",
    answer: `The TryIPTV free trial lasts ${FACT_TEXT.trialHours} consecutive hours, counted from the moment your login details are activated. When the time is up, access stops on its own.`,
  },
  {
    question: "Do I need a credit card for the IPTV free trial?",
    answer:
      "No. The TryIPTV free trial is issued without collecting any credit card, PayPal, or other payment details. You request it on WhatsApp, receive login details, and get 24 hours of access for $0. When the trial ends it simply stops; nothing is charged and it never turns into a paid plan.",
  },
  {
    question: "How fast do trial credentials arrive?",
    answer: `Trial login details usually arrive on WhatsApp within ${T.activationTime} after your request is confirmed. It is usually quick but not always instant; if nothing has arrived after that, reply in the same WhatsApp chat.`,
  },
  {
    question: "What devices can I use during the trial?",
    answer:
      "You can test on supported smart TVs, streaming media players, and personal computers, including Firestick, Android TV, Samsung TV, LG TV, Apple TV, iPhone and iPad, Windows, Mac, MAG, and Chromecast with Google TV. Roku works through AirPlay or screen mirroring from another device.",
  },
  {
    question: "Is the free trial the same as a paid plan?",
    answer: `The trial is for judging streams, picture quality, and TV guide data on your own setup before you pay. It includes the same ${T.connections} simultaneous connections as a paid plan, so you can test two screens at once.`,
  },
  {
    question: "What happens when the 24 hours end?",
    answer:
      "Your trial login expires and streaming stops. The trial does not renew or turn into a paid subscription, and you do not need to cancel anything. If you want to keep watching, you choose an IPTV plan; if not, you owe nothing.",
  },
  {
    question: "How much does IPTV cost after the trial?",
    answer: `TryIPTV plans cost ${FACT_TEXT.priceList}. Every plan includes ${T.connections} simultaneous connections and none of them renews automatically.`,
  },
  {
    question: "Can I get another free trial?",
    answer:
      "No. The free trial is limited to one per household or user, as set out in the Terms & Conditions. After your trial, you can continue with an IPTV plan, starting with 1 month if you want a short commitment.",
  },
  {
    question: "Can I use TiviMate?",
    answer:
      "Yes. If you use TiviMate on an Android TV or Fire TV device, enter the server URL, username, and password provided with your trial using the Xtream Codes login option.",
  },
  {
    question: "Can I use IPTV Smarters?",
    answer:
      "Yes. IPTV Smarters is compatible. Select \"Login with Xtream Codes API\" and enter the trial server address, username, and password issued for your test.",
  },
  {
    question: "Can I test specific channels before paying?",
    answer:
      "Yes. Use the trial to check that the specific channels and content you care about are available and play correctly on your setup.",
  },
];

export const getIptvFreeTrialPageData = cache(
  async () => {
    const baseUrl = siteConfig.url;
    const pageUrl = `${baseUrl}/iptv-free-trial`;

    const breadcrumbSchema: BreadcrumbList = generateBreadcrumbSchema([
      { name: "Home", item: `${baseUrl}/` },
      { name: "IPTV Free Trial", item: pageUrl },
    ]);

    const serviceSchema: Service = generateServiceSchema({
      serviceType: "Free IPTV Trial",
      providerName: "TryIPTV",
      name: `TryIPTV ${FACT_TEXT.trialHours}-Hour IPTV Free Trial`,
      description: `TryIPTV offers a ${FACT_TEXT.trialHours}-hour IPTV free trial for $0, with no credit card and no auto-renewal. Login details for a compatible IPTV player usually arrive on WhatsApp within ${PRODUCT_TRUTHS.activationTime} during support hours.`,
      image: `${baseUrl}/images/free-trial/iptv-free-trial-24-hours-no-credit-card.jpg`,
      url: `${baseUrl}/iptv-free-trial`,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        url: `${baseUrl}/iptv-free-trial`,
        availability: "https://schema.org/InStock",
      },
    });

    return {
      breadcrumbSchema,
      serviceSchema,
      trialFaqs,
    };
  },
  // Bump the version when the static data above changes: the data cache outlives rebuilds.
  ['iptv-free-trial-page-data-v9'],
  {
    revalidate: 3600,
    tags: ['pages', 'iptv-free-trial-page'],
  }
);
