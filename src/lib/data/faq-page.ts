import { unstable_cache as cache } from 'next/cache';
import { faqs } from "@/lib/site-data/faq";
import { generateBreadcrumbSchema, generateFAQPageSchema } from '@/lib/schema';
import type { BreadcrumbList, FAQPage } from 'schema-dts';
import { siteConfig } from '@/lib/site-config';

// This function fetches and processes all data required for the FAQ page in a single, cached operation.
export const getFaqPageData = cache(
  async () => {
    const baseUrl = siteConfig.url;

    const faqSchema: FAQPage = generateFAQPageSchema(faqs);

    const breadcrumbSchema: BreadcrumbList = generateBreadcrumbSchema([
        { name: "Home", item: `${baseUrl}/` },
        { name: "FAQ", item: `${baseUrl}/faq` }
    ]);

    return { 
      faqSchema,
      breadcrumbSchema
    };
  },
  ['faq-page-data-v8'], // Unique cache key
  {
    revalidate: 3600, // Revalidate every hour
    tags: ['pages', 'faq-page'], // Tag for on-demand revalidation
  }
);
