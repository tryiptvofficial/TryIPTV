import { SITE_URL } from "@/lib/site-config";

interface SchemaProps {
  schema: any;
  id: string;
  /** Opt this block back in to types that are dropped by default, e.g. ["FAQPage"]. */
  keep?: string[];
}

/**
 * Types dropped by default. Valid Schema.org vocabulary is not the same as Google rich-result eligibility:
 * - FAQPage: valid Schema.org, but Google no longer offers FAQ rich results, so no Google Search feature is expected.
 * - HowTo: valid Schema.org; Google retired the HowTo rich result.
 * - Product: valid Schema.org, but Google's product snippets and merchant listings target single-product pages
 *   and on-page purchase. A subscription ordered off-page is neither, so it is not marked up as Product.
 * These types are dropped site-wide, at the top level and inside `@graph`, unless the page passes them in `keep`.
 * Pages that still opt in to FAQPage: /faq and /about. Marked-up FAQs must match the visible questions and answers.
 */
const DROPPED_BY_DEFAULT = ['FAQPage', 'HowTo', 'Product'];

const SITE = SITE_URL;
const WEBSITE_ID = `${SITE}/#website`;
const ORGANIZATION_ID = `${SITE}/#organization`;
const PAGE_TYPES = ['WebPage', 'AboutPage', 'ContactPage', 'CollectionPage', 'ProfilePage', 'ItemPage'];
/** Fragment used for a node's @id when it has none, e.g. https://www.tryiptv.com/pricing#breadcrumb. */
const ID_FRAGMENT: Record<string, string> = {
  BreadcrumbList: 'breadcrumb',
  FAQPage: 'faq',
  Article: 'article',
  Product: 'product',
  Service: 'service',
  ItemList: 'itemlist',
};
/** Which node the WebPage's mainEntity points at, in order of preference. */
const MAIN_ENTITY_ORDER = ['Article', 'Product', 'Service', 'ItemList', 'FAQPage'];

interface PageSchemaProps {
  /** Page path, e.g. "/pricing" or "/". Optional for articles: taken from the Article's page @id. */
  path?: string;
  /** WebPage name. Optional for articles: taken from the Article headline. */
  name?: string;
  description?: string;
  /** WebPage subtype for this page. */
  type?: 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage' | 'ProfilePage';
  /** The page's own schema objects (Article, BreadcrumbList, Product, FAQPage, Service, ItemList...). */
  nodes: any[];
  keep?: string[];
  /** WebPage dateModified for pages without an Article (YYYY-MM-DD from site-routes.ts). */
  dateModified?: string;
  /** WebPage primaryImageOfPage URL (e.g. the page's share image). */
  primaryImage?: string;
}

const typeOf = (node: any): string => (Array.isArray(node?.['@type']) ? node['@type'][0] : node?.['@type']) ?? '';

/**
 * One connected @graph per page: a WebPage (or subtype) node `{url}#webpage` that is part of the WebSite and
 * points at the breadcrumb and the page's main entity, plus the page's own nodes, each with a stable @id.
 * The Organization and WebSite nodes come from the root layout and are referenced here by @id.
 * Types in DROPPED_BY_DEFAULT are removed first (unless kept), so no reference points at a missing node.
 */
export function PageSchema({ path, name, description, type = 'WebPage', nodes, keep = [], dateModified, primaryImage }: PageSchemaProps) {
  const dropped = (t: string) => DROPPED_BY_DEFAULT.includes(t) && !keep.includes(t);
  const flat = nodes
    .filter(Boolean)
    .flatMap((n: any) => (Array.isArray(n['@graph']) ? n['@graph'] : [n]))
    .map(({ '@context': _context, ...n }: any) => n)
    .filter((n: any) => !dropped(typeOf(n)));

  const article = flat.find((n: any) => typeOf(n) === 'Article');
  const articleUrl: string | undefined = article?.mainEntityOfPage?.['@id'] ?? article?.url;
  const url = path ? (path === '/' ? `${SITE}/` : `${SITE}${path}`) : articleUrl;
  if (!url) return null;
  // Home is "https://www.tryiptv.com/", so its fragments read ".../#webpage"; other pages ".../pricing#webpage".
  const base = url;
  const pageId = `${base}#webpage`;

  // An existing page-type node (e.g. AboutPage, ProfilePage) becomes the WebPage node instead of adding a second one.
  const existingPage = flat.find((n: any) => PAGE_TYPES.includes(typeOf(n)));
  const others = flat.filter((n: any) => n !== existingPage);

  const withIds = others.map((n: any) => {
    const t = typeOf(n);
    const node = { ...n, '@id': n['@id'] ?? `${base}#${ID_FRAGMENT[t] ?? t.toLowerCase()}` };
    // reviewedBy moves to the WebPage (schema.org); the Article's page link is set below, once the page @id is known.
    if (t === 'Article') delete node.mainEntityOfPage;
    return node;
  });

  const breadcrumb = withIds.find((n: any) => typeOf(n) === 'BreadcrumbList');
  const main = MAIN_ENTITY_ORDER.map((t) => withIds.find((n: any) => typeOf(n) === t)).find(Boolean);
  const reviewedBy = article?.mainEntityOfPage?.reviewedBy;

  const webPage = {
    ...(existingPage ?? {}),
    '@type': existingPage ? existingPage['@type'] : type,
    '@id': existingPage?.['@id'] ?? pageId,
    url,
    name: existingPage?.name ?? name ?? article?.headline,
    ...((existingPage?.description ?? description ?? article?.description)
      ? { description: existingPage?.description ?? description ?? article?.description }
      : {}),
    isPartOf: { '@id': WEBSITE_ID },
    inLanguage: 'en-US',
    ...(['AboutPage', 'ContactPage'].includes(existingPage ? typeOf(existingPage) : type) || path === '/'
      ? { about: { '@id': ORGANIZATION_ID } }
      : {}),
    ...(breadcrumb ? { breadcrumb: { '@id': breadcrumb['@id'] } } : {}),
    // About, contact and profile pages are about the organization or a person, not their FAQ.
    ...(main && !existingPage?.mainEntity && !['AboutPage', 'ContactPage', 'ProfilePage'].includes(existingPage ? typeOf(existingPage) : type)
      ? { mainEntity: { '@id': main['@id'] } }
      : {}),
    ...(primaryImage ? { primaryImageOfPage: { '@type': 'ImageObject', url: primaryImage } } : {}),
    ...((article?.dateModified ?? dateModified) ? { dateModified: article?.dateModified ?? dateModified } : {}),
    ...(reviewedBy ? { reviewedBy } : {}),
  };
  // The Article's mainEntityOfPage must name the page node actually emitted.
  if (article) {
    const a = withIds.find((n: any) => typeOf(n) === 'Article');
    a.mainEntityOfPage = { '@id': webPage['@id'] };
    a.isPartOf = { '@id': webPage['@id'] };
  }

  const graph = { '@context': 'https://schema.org', '@graph': [webPage, ...withIds] };
  return (
    <script
      id="schema-page"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, '\\u003c') }}
    />
  );
}

export function Schema({ schema, id, keep = [] }: SchemaProps) {
  if (!schema) return null;
  const dropped = (type: unknown) => typeof type === 'string' && DROPPED_BY_DEFAULT.includes(type) && !keep.includes(type);

  let output = schema;
  if (Array.isArray(schema['@graph'])) {
    const graph = schema['@graph'].filter((node: any) => !dropped(node?.['@type']));
    if (graph.length === 0) return null;
    output = { ...schema, '@graph': graph };
  } else if (dropped(schema['@type'])) {
    return null;
  }

  return (
    <script
      id={`schema-${id}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(output).replace(/</g, '\\u003c') }}
    />
  );
}
