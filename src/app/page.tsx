import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { WhyChooseTryIPTV } from "@/components/sections/WhyChooseTryIPTV";
import { HomePricing } from "@/components/sections/HomePricing";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Devices } from "@/components/sections/Devices";
import { CustomerFeedback } from "@/components/sections/CustomerFeedback";
import { CTA } from "@/components/sections/CTA";

const FAQ = dynamic(() => import("@/components/sections/FAQ").then((mod) => mod.FAQ));
import { PageSchema } from "@/components/shared/Schema";
import { generateMetadata as generatePageMetadata } from "@/lib/site-config";
import { getLastModified } from "@/lib/site-routes";

const title = "Best IPTV Service 2026 | 24-Hour Free Trial | TryIPTV";
const description =
  "Stream 25,000+ live channels and 120,000+ movies & TV shows on 2 connections. IPTV plans have no auto-renewal. Start with a 24-hour free trial.";
const ogDescription =
  "Stream 25,000+ live channels and 120,000+ movies & TV shows with TryIPTV. Get 2 connections, no auto-renewal, and a 24-hour free trial.";
const twitterDescription =
  "25,000+ live channels, 120,000+ movies & TV shows, 2 connections, no auto-renewal, and a 24-hour free trial.";

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
        nodes={[]}
        dateModified={getLastModified("/")}
        primaryImage={{ url: "https://www.tryiptv.com/images/best-iptv-service-og.jpg", width: 1024, height: 536 }}
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
    </>
  );
}
