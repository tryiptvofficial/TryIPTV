import { unstable_cache as cache } from 'next/cache';
import { pricingPageFaqs } from "@/lib/site-data/pricing-page-faq";
import { generateBreadcrumbSchema } from "@/lib/schema";
import type { BreadcrumbList } from 'schema-dts';
import { siteConfig } from '../site-config';

// Breadcrumb and FAQ data for the pricing page. The FAQ is visible text only (no FAQPage markup).
export const getPricingPageData = cache(
  async () => {
    const baseUrl = siteConfig.url;

    const breadcrumbSchema: BreadcrumbList = generateBreadcrumbSchema([
        { name: "Home", item: `${baseUrl}/` },
        { name: "Pricing", item: `${baseUrl}/pricing` }
    ]);
    
    return { 
      breadcrumbSchema,
      pricingPageFaqs,
    };
  },
  // Bump the version when the static data above changes: the data cache outlives rebuilds.
  ['pricing-page-data-v8'], // Unique cache key
  {
    revalidate: 3600, // Revalidate every hour
    tags: ['pages', 'pricing-page'], // Tag for on-demand revalidation
  }
);
