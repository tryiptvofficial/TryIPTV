import { AUTHORS, getAuthorForPath, getReviewerForPath, personId } from '@/lib/site-data/authors';
import { COMPANY } from '@/lib/site-data/company';
import { BRAND } from '@/lib/site-data/brand';
import type {
  Product,
  WebSite,
  Organization,
  FAQPage,
  BreadcrumbList,
  Article,
  HowTo,
  Service,
  Brand,
  Offer,
  AggregateOffer,
  WithContext,
} from 'schema-dts';
import { PRODUCT_TRUTHS, siteConfig } from '@/lib/site-config';
import { publicBrandSocialLinks } from '@/lib/site-data/socials';

export const organizationId = `${siteConfig.url}/#organization`;
const websiteId = `${siteConfig.url}/#website`;
const organizationReference = {
  '@id': organizationId,
} as const;

// Reusable parts of schemas
const defaultPublisher = organizationReference;

export function generateWebSiteSchema(): WithContext<WebSite> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': websiteId,
    'url': `${siteConfig.url}/`,
    // Same name and alternateName as the Organization (Google: site names and Organization docs).
    'name': BRAND.name,
    'alternateName': [...BRAND.alternateNames],
    'publisher': organizationReference,
    'inLanguage': 'en-US',
  };
}

/** Customer-support ContactPoint, with hours once confirmed (company.ts `support.hoursSpec`). */
export function supportContactPoint() {
  const h = COMPANY.support.hoursSpec;
  return {
    '@type': 'ContactPoint' as const,
    contactType: 'customer support',
    // The hours (with ET) go in the name: OpeningHoursSpecification has no time-zone property.
    name: COMPANY.support.hours ? `WhatsApp and email support (${COMPANY.support.hours})` : 'WhatsApp and email support',
    email: COMPANY.support.email,
    url: COMPANY.support.whatsappUrl,
    ...(COMPANY.support.languages ? { availableLanguage: COMPANY.support.languages } : {}),
    ...(h
      ? {
          hoursAvailable: {
            '@type': 'OpeningHoursSpecification' as const,
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            opens: h.opens,
            closes: h.closes,
          },
        }
      : {}),
  };
}

/** Press ContactPoint, once a monitored press inbox is confirmed (company.ts `support.pressEmail`). */
export function pressContactPoint() {
  return COMPANY.support.pressEmail
    ? [{ '@type': 'ContactPoint' as const, contactType: 'press', email: COMPANY.support.pressEmail }]
    : [];
}

/** Owner-confirmed organisation facts (company.ts). Each is added only once confirmed; never guessed. */
export function organizationFacts() {
  return {
    ...(COMPANY.legalName ? { legalName: COMPANY.legalName } : {}),
    ...(COMPANY.foundingYear ? { foundingDate: COMPANY.foundingYear } : {}),
    ...(COMPANY.vatOrTaxId ? { vatID: COMPANY.vatOrTaxId } : {}),
    ...(COMPANY.registrationNumber
      ? { identifier: { '@type': 'PropertyValue' as const, propertyID: COMPANY.registry ?? 'Company registration number', value: COMPANY.registrationNumber } }
      : {}),
    ...(COMPANY.team.length
      ? {
          founder: COMPANY.team
            .filter((m) => /founder/i.test(m.role))
            .map((m) => {
              // Link the founder to their profile (same @id as Article reviewedBy/author and the ProfilePage).
              const profile = AUTHORS.find((a) => a.name === m.name);
              return {
                '@type': 'Person' as const,
                name: profile?.name ?? m.name,
                jobTitle: profile?.role ?? m.role,
                ...(profile ? { '@id': personId(siteConfig.url, profile.slug), url: `${siteConfig.url}/authors/${profile.slug}` } : {}),
                worksFor: { '@id': organizationId },
              };
            }),
        }
      : {}),
    ...(COMPANY.address
      ? { address: { '@type': 'PostalAddress' as const, streetAddress: COMPANY.address.street, addressLocality: COMPANY.address.locality, postalCode: COMPANY.address.postalCode, addressCountry: COMPANY.address.country } }
      : COMPANY.area
        ? { address: { '@type': 'PostalAddress' as const, addressRegion: COMPANY.area.region, addressCountry: COMPANY.area.country } }
        : {}),
  };
}

export function generateOrganizationSchema(): WithContext<Organization> {
  return {
    '@context': 'https://schema.org',
    // Most specific subtype (Google Organization doc): an online-only service.
    '@type': 'OnlineBusiness' as 'Organization',
    '@id': organizationId,
    'name': BRAND.name,
    'alternateName': [...BRAND.alternateNames],
    'url': `${siteConfig.url}/`,
    // Fuller than BRAND.description (also the default meta description): who it serves, who runs it, and which plan each price is for.
    'description': `TryIPTV is an IPTV subscription service for viewers in the USA and UK, operated by ${COMPANY.legalName} in New York. It delivers ${PRODUCT_TRUTHS.channels} live channels and ${PRODUCT_TRUTHS.vod} movies and TV shows to your own devices through compatible IPTV player apps. Plans cost about $${PRODUCT_TRUTHS.plans[3].monthlyEquivalent.toFixed(2)} a month on the 12-month plan, or $${PRODUCT_TRUTHS.plans[0].price.toFixed(2)} for 1 month, with ${PRODUCT_TRUTHS.connections} connections, no automatic renewal and a 24-hour free trial.`,
    // Separates this TryIPTV (tryiptv.com, Simo Alaoui LLC) from similarly named sites and from player apps.
    'disambiguatingDescription': `IPTV service at tryiptv.com, operated by ${COMPANY.legalName} (New York). Not an IPTV player app.`,
    'slogan': BRAND.tagline,
    'logo': {
      '@type': 'ImageObject',
      '@id': `${siteConfig.url}/#logo`,
      'url': `${siteConfig.url}${BRAND.logos.primary}`,
      'contentUrl': `${siteConfig.url}${BRAND.logos.primary}`,
      'width': 1024 as any,
      'height': 1024 as any,
    },
    'sameAs': [...publicBrandSocialLinks],
    'email': COMPANY.support.email,
    'contactPoint': [supportContactPoint(), ...pressContactPoint()],
    // Only the regions the site names ("USA, UK and more"); "and more" has no machine-readable form, so no other countries are listed.
    'areaServed': [
      { '@type': 'Country', 'name': 'United States' },
      { '@type': 'Country', 'name': 'United Kingdom' },
    ],
    'knowsAbout': ['IPTV subscriptions', 'IPTV player setup', 'M3U playlists', 'Xtream Codes', 'Electronic program guides (EPG)'],
    ...organizationFacts(),
  } as WithContext<Organization>;
}

interface ProductSchemaProps {
  name: string;
  description: string;
  image: string;
  price?: string;
  offers?: Offer | AggregateOffer;
  sku?: string;
  mpn?: string;
  brand?: Brand | typeof organizationReference;
}

export function generateProductSchema(props: ProductSchemaProps): WithContext<Product> {
    const { name, description, image, price, offers, sku, mpn, brand } = props;
    
    const offerDetails = offers || (price ? {
        '@type': 'Offer' as const,
        price: price,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock' as const,
        url: `${siteConfig.url}/pricing`,
    } : undefined);

    const schema: WithContext<Product> = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name,
        description,
        image,
        sku,
        mpn,
        brand,
        offers: offerDetails,
    };

    return schema;
}

export function generateFAQPageSchema(mainEntity: { question: string; answer: string }[]): WithContext<FAQPage> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: mainEntity.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        // Answers may hold inline links; the markup carries the visible text only.
        text: stripHtml(answer),
      },
    })),
  };
}

/** The list of guides or pages a hub shows, in on-page order (CollectionPage mainEntity). */
export function generateItemListSchema(name: string, items: { name: string; path: string }[]) {
  return {
    '@type': 'ItemList' as const,
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem' as const,
      position: index + 1,
      name: item.name,
      url: `${siteConfig.url}${item.path}`,
    })),
  };
}

export function generateBreadcrumbSchema(itemListElement: { name: string; item: string }[]): WithContext<BreadcrumbList> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: itemListElement.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };
}

interface ArticleSchemaProps {
    headline: string;
    description: string;
    image?: string;
    dateModified: string;
    authorName?: string;
    publisherName?: string;
    url: string;
    /** Path of the page, used to look up a confirmed author (src/lib/site-data/authors.ts). */
    path?: string;
}

const personRef = (p: { slug: string; name: string }) => ({
    '@type': 'Person' as const,
    '@id': personId(siteConfig.url, p.slug),
    name: p.name,
    url: `${siteConfig.url}/authors/${p.slug}`,
});

function authorFor(path: string) {
    const person = getAuthorForPath(path);
    return person ? personRef(person) : organizationReference;
}

export function generateArticleSchema(props: ArticleSchemaProps): WithContext<Article> {
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: props.headline,
        description: props.description,
        // Recommended Article property. Without a page-specific image, use the site's own OG image
        // endpoint (1200x630 PNG, crawlable via robots.txt) rendered with this article's headline.
        // datePublished is intentionally omitted: no verified publication dates exist.
        image: props.image ?? `${siteConfig.url}${siteConfig.ogImage}?title=${encodeURIComponent(props.headline)}`,
        dateModified: props.dateModified,
        // A confirmed person if one is assigned to this page; otherwise the organisation (never invented people).
        author: authorFor(props.path ?? props.url.replace(siteConfig.url, "")),
        publisher: defaultPublisher,
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': props.url,
            // schema.org puts reviewedBy on WebPage (not Article): a confirmed reviewer, if one is assigned.
            ...(reviewerOf(props) ? { reviewedBy: personRef(reviewerOf(props)!) } : {}),
        },
    };
}

function reviewerOf(props: ArticleSchemaProps) {
    return getReviewerForPath(props.path ?? props.url.replace(siteConfig.url, ""));
}

interface HowToSchemaProps {
    name: string;
    description: string;
    image?: { url: string; width?: number; height?: number; };
    steps: { name: string; text: string; url: string; }[];
    totalTime?: string;
}

function stripHtml(html: string): string {
    return html
        .replace(/<[^>]+>/g, '')
        .replace(/&amp;/g, '&')
        .replace(/&apos;/g, "'")
        .replace(/&#x27;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .trim();
}

export function generateHowToSchema(props: HowToSchemaProps): WithContext<HowTo> {
    const { name, description, image, steps, totalTime } = props;
    return {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name,
        description,
        image: image ? {
            '@type': 'ImageObject',
            url: image.url,
            width: image.width ? `${image.width}px` : undefined,
            height: image.height ? `${image.height}px` : undefined,
        } : undefined,
        step: steps.map((step, index) => ({
            '@type': 'HowToStep',
            name: step.name,
            text: stripHtml(step.text),
            url: step.url,
            position: index + 1,
        })),
        totalTime: totalTime,
    };
}

interface ServiceSchemaProps {
    serviceType: string;
    providerName: string;
    areaServed?: string;
    name: string;
    description: string;
    offers?: Offer | AggregateOffer;
    /** Absolute URL of an image that represents the service. */
    image?: string;
    /** Absolute URL of the page that describes the service. */
    url?: string;
}

export function generateServiceSchema(props: ServiceSchemaProps): WithContext<Service> {
    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: props.serviceType,
        provider: organizationReference,
        ...(props.areaServed ? { areaServed: props.areaServed } : {}),
        name: props.name,
        description: props.description,
        ...(props.image ? { image: props.image } : {}),
        ...(props.url ? { url: props.url } : {}),
        offers: props.offers
    }
}
