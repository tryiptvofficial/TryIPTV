import { unstable_cache as cache } from 'next/cache';
import { pricingPageFaqs } from "@/lib/site-data/pricing-page-faq";
import { generateBreadcrumbSchema } from "@/lib/schema";
import type { BreadcrumbList } from 'schema-dts';
import { siteConfig } from '../site-config';
import { contentHash } from './content-hash';

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
  // The data cache outlives rebuilds, so the key carries a hash of the FAQ data: edits change it automatically.
  ['pricing-page-data', contentHash(pricingPageFaqs)],
  {
    revalidate: 3600, // Revalidate every hour
    tags: ['pages', 'pricing-page'], // Tag for on-demand revalidation
  }
);
