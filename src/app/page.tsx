import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { WhyChooseTryIPTV } from "@/components/sections/WhyChooseTryIPTV";
import { HomePricing } from "@/components/sections/HomePricing";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Devices } from "@/components/sections/Devices";
import { CustomerFeedback } from "@/components/sections/CustomerFeedback";
import { CTA } from "@/components/sections/CTA";

import { FAQ } from "@/components/sections/FAQ";
import { MobileBuyBar } from "@/components/shared/MobileBuyBar";
import { PageSchema } from "@/components/shared/Schema";
import { generateMetadata as generatePageMetadata, PRODUCT_TRUTHS, SITE_URL } from "@/lib/site-config";
import { getLastModified } from "@/lib/site-routes";

const T = PRODUCT_TRUTHS;

const title = "Best IPTV Service 2026 | 24-Hour Free Trial | TryIPTV";
const description =
  "Stream 25,000+ live channels and 120,000+ movies & TV shows with TryIPTV. 2 connections, no auto-renewal, 24-hour free trial — no credit card required.";
const ogDescription = description;

const serviceSchema = {
  '@type': 'Service',
  'name': 'TryIPTV IPTV Subscription',
  'serviceType': 'IPTV Streaming Service',
  'description': `Stream ${T.channels} live channels and ${T.vod} movies & TV shows. TryIPTV offers ${T.connections} simultaneous connections, no auto-renewal, and a 24-hour free trial.`,
  'url': `${SITE_URL}/`,
  'provider': { '@id': `${SITE_URL}/#organization` },
  'areaServed': [
    { '@type': 'Country', 'name': 'United States' },
    { '@type': 'Country', 'name': 'United Kingdom' },
  ],
  'offers': {
    '@type': 'Offer',
    'name': '24-Hour Free IPTV Trial',
    'price': '0',
    'priceCurrency': 'USD',
    'description': 'Try TryIPTV free for 24 hours — no credit card required.',
    'url': `${SITE_URL}/iptv-free-trial`,
  },
  'termsOfService': `${SITE_URL}/terms-conditions`,
};

const twitterDescription = ogDescription;

export function generateMetadata(): Metadata {
  const baseMetadata = generatePageMetadata({
    title,
    description,
    canonical: "/",
    image: "https://www.tryiptv.com/images/best-iptv-service-og.jpg",
  });

  return {
    ...baseMetadata,
    title: { absolute: title },
    openGraph: {
      ...baseMetadata.openGraph,
      description: ogDescription,
      images: [
        {
          url: "https://www.tryiptv.com/images/best-iptv-service-og.jpg",
          // 1.91:1 share crop of the hero, 61 KB: WhatsApp skips link previews for images over ~300 KB,
          // and the 711 KB hero PNG was too large.
          width: 1024,
          height: 536,
          alt: "Couple watching TV with TryIPTV streaming service",
        },
      ],
    },
    twitter: {
      ...baseMetadata.twitter,
      description: twitterDescription,
      images: ["https://www.tryiptv.com/images/best-iptv-service-og.jpg"],
    },
  };
}

export default function Home() {
  return (
    <>
      <PageSchema
        path="/"
        name={title}
        description={description}
        nodes={[serviceSchema as any]}
        dateModified={getLastModified("/")}
        primaryImage={{ url: "https://www.tryiptv.com/images/best-iptv-service.png", width: 1024, height: 682, caption: "Couple watching TV with TryIPTV streaming service" }}
      />
      <Hero />
      <HomePricing />
      <WhyChooseTryIPTV />
      <HowItWorks />
      <Devices />
      <CustomerFeedback />
      {/* Follows a section on the same background, so skip the duplicated top padding. */}
      <CTA className="pt-0 sm:pt-0 md:pt-0 lg:pt-0" />
      <FAQ />
      <MobileBuyBar />
    </>
  );
}
