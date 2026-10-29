import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { INDEXABLE_ROUTES, SITE_ROUTES } from '../src/lib/site-routes.ts';
import { createContentQualityRegistry, canPublish, evaluateReleaseStatus, evaluateClaimEvidence, summarizeEvidence, validateEditorial } from '../src/lib/content-quality/registry.ts';
import { PRODUCT_TRUTHS } from '../src/lib/site-config.ts';
import { plans } from '../src/lib/site-data/pricing.ts';
import { pricingPageFaqs } from '../src/lib/site-data/pricing-page-faq.ts';

const root = process.cwd();
const paths = INDEXABLE_ROUTES.map(({ path }) => path);
const CONTENT_QUALITY_REGISTRY = createContentQualityRegistry(SITE_ROUTES);
const approved = new Set(SITE_ROUTES.map(({ path }) => path));
const indexable = new Set(paths);
const results = new Map();
const incoming = new Map(paths.map((path) => [path, new Set()]));
const outgoing = new Map(paths.map((path) => [path, new Set()]));
const broken = [];
const redirects = [];
const selfLinks = [];
const duplicateLinks = [];
const unexpected = [];
const canonicalOwners = new Map();
const productConflicts = [];
for (const truth of PRODUCT_TRUTHS.plans) {
  const plan = plans.find((item) => item.name === truth.duration);
  if (!plan || plan.price !== truth.price || plan.price_monthly !== truth.monthlyEquivalent) productConflicts.push(`${truth.duration}: PRODUCT_TRUTHS and pricing data differ`);
}
const paymentFaq = pricingPageFaqs.find((item) => item.question.toLowerCase().includes('payment'));
if (!paymentFaq || !paymentFaq.answer.trim()) {
  productConflicts.push('Pricing FAQ missing payment guidance');
} else {
  const answer = paymentFaq.answer.toLowerCase();
  if (!answer.includes('checkout') && !answer.includes('payment')) {
    productConflicts.push('Pricing FAQ payment guidance lacks checkout or payment explanation');
  }
}
const decode = (value) => value.replaceAll('&amp;', '&').replaceAll('&quot;', '"');

async function exists(path) { try { await readFile(path); return true; } catch { return false; } }
async function list(dir) {
  try { return await readdir(dir, { withFileTypes: true }); } catch { return []; }
}
async function files(dir) {
  const result = [];
  for (const item of await list(dir)) {
    const path = join(dir, item.name);
    if (item.isDirectory()) result.push(...await files(path));
    else result.push(path);
  }
  return result;
}
function routeFile(path) { return join(root, 'src/app', path === '/' ? 'page.tsx' : `${path.slice(1)}/page.tsx`); }
function htmlFile(path) { return join(root, '.next/server/app', path === '/' ? 'index.html' : `${path.slice(1)}.html`); }
function first(html, pattern) { return html.match(pattern)?.[1] ?? null; }
function links(html) { return [...html.matchAll(/<a\b[^>]*\bhref=["']([^"']+)["'][^>]*>/gi)].map((match) => decode(match[1])); }
function localPath(href) {
  try {
    const url = new URL(href, 'https://www.tryiptv.com');
    if (url.hostname !== 'www.tryiptv.com') return null;
    return url.pathname.replace(/\/$/, '') || '/';
  } catch { return null; }
}

const appPages = (await files(join(root, 'src/app'))).filter((file) => file.endsWith('/page.tsx'));
const nextConfig = await readFile(join(root, 'next.config.js'), 'utf8');
const redirectSources = new Set([...nextConfig.matchAll(/source:\s*['"]([^'"]+)['"]\s*,/g)].map((match) => match[1]));
const routeOf = (file) => file.slice(join(root, 'src/app').length).replace(/\/page\.tsx$/, '') || '/';
const sourceRoutes = new Set(appPages.filter((file) => !file.includes('/[')).map(routeOf));
// [[...x]] matches zero or more segments, [...x] one or more, [x] exactly one.
const dynamicRoutes = appPages.filter((file) => file.includes('/[')).map((file) => new RegExp(`^${routeOf(file)
  .replace(/\/\[\[\.\.\.[^\]]+\]\]/g, '(?:/.+)?')
  .replace(/\/\[\.\.\.[^\]]+\]/g, '/.+')
  .replace(/\/\[[^\]]+\]/g, '/[^/]+')}$`));
const hasRoute = (path) => sourceRoutes.has(path) || dynamicRoutes.some((pattern) => pattern.test(path));
const configuredNoindex = new Set(SITE_ROUTES.filter((route) => !route.indexable).map((route) => route.path));
for (const path of sourceRoutes) if (!approved.has(path) && path !== '/thank-you') unexpected.push(path);
const missingRoutes = paths.filter((path) => !hasRoute(path));
const missingSitemap = [...sourceRoutes].filter((path) => path !== '/thank-you' && !indexable.has(path) && !configuredNoindex.has(path));
const duplicates = paths.filter((path, i) => paths.indexOf(path) !== i);

for (const path of paths) {
  const file = htmlFile(path);
  if (!await exists(file)) { results.set(path, { technical: 'NOT VERIFIED', reasons: ['Built HTML unavailable; run npm run build first.'] }); continue; }
  const html = await readFile(file, 'utf8');
  const reasons = [];
  const title = first(html, /<title>([^<]*)<\/title>/i);
  const description = first(html, /<meta\s+name="description"\s+content="([^"]*)"/i) ?? first(html, /<meta\s+content="([^"]*)"\s+name="description"/i);
  const canonical = first(html, /<link\s+rel="canonical"\s+href="([^"]*)"/i) ?? first(html, /<link\s+href="([^"]*)"\s+rel="canonical"/i);
  const robots = first(html, /<meta\s+name="robots"\s+content="([^"]*)"/i) ?? '';
  const h1Count = [...html.matchAll(/<h1(?:\s|>)/gi)].length;
  const expectedCanonical = `https://www.tryiptv.com${path === '/' ? '' : path}`;
  if (!title?.trim()) reasons.push('Missing title');
  if (!description?.trim()) reasons.push('Missing meta description');
  if (canonical !== expectedCanonical) reasons.push(`Canonical mismatch: ${canonical ?? 'missing'}`);
  if (/noindex/i.test(robots)) reasons.push('Noindex robots directive');
  if (h1Count !== 1) reasons.push(`Expected one H1, found ${h1Count}`);
  const schemas = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
  if (!schemas.length) reasons.push('Structured data absent (review applicability)');
  for (const schema of schemas) {
    try { JSON.parse(schema[1]); } catch { reasons.push('Structured data is not valid JSON'); }
  }
  if (canonical) canonicalOwners.set(canonical, [...canonicalOwners.get(canonical) ?? [], path]);
  const seen = new Set();
  for (const href of links(html)) {
    const target = localPath(href);
    if (!target || target.startsWith('/api/') || /\.[a-z0-9]+$/i.test(target)) continue;
    if (seen.has(target)) duplicateLinks.push(`${path} → ${target}`);
    seen.add(target);
    outgoing.get(path).add(target);
    if (target === path) selfLinks.push(path);
    // A page's link to itself (breadcrumb, in-page CTA) does not make it reachable.
    if (incoming.has(target)) { if (target !== path) incoming.get(target).add(path); }
    else if (redirectSources.has(target)) redirects.push(`${path} → ${target}`);
    else if (!approved.has(target) && target !== '/thank-you') broken.push(`${path} → ${target}`);
  }
  results.set(path, { technical: reasons.filter((reason) => reason !== 'Structured data absent (review applicability)').length ? 'FAIL' : reasons.length ? 'WARNING' : 'PASS', reasons });
}

const depth = new Map([['/', 0]]);
let frontier = ['/'];
while (frontier.length) {
  const next = [];
  for (const source of frontier) for (const target of outgoing.get(source) ?? []) {
    if (indexable.has(target) && !depth.has(target)) { depth.set(target, depth.get(source) + 1); next.push(target); }
  }
  frontier = next;
}

for (const entry of CONTENT_QUALITY_REGISTRY) {
  const path = entry.url;
  const technical = results.get(path) ?? { technical: 'NOT VERIFIED', reasons: ['Route not audited'] };
  const gates = validateEditorial(entry);
  console.log(`\n${'-'.repeat(50)}\n${path}\n${'-'.repeat(50)}`);
  if (entry.kind === 'legal') console.log('Editorial gates: legal page; human policy review required');
  else for (const [name, result] of Object.entries(gates)) console.log(`${name.padEnd(26)} ${result}`);
  console.log(`${'Technical SEO'.padEnd(26)} ${technical.technical}`);
  const incomingCount = incoming.get(path)?.size ?? 0;
  console.log(`${'Internal Links'.padEnd(26)} ${incomingCount ? 'PASS' : 'WARNING'} (${incomingCount} incoming, ${outgoing.get(path)?.size ?? 0} outgoing; depth ${depth.get(path) ?? 'NOT VERIFIED'})`);
  const release = evaluateReleaseStatus(entry, technical.technical);
  if (entry.acceptedRisks?.length) {
    console.log('\nAccepted Risks:');
    for (const risk of entry.acceptedRisks) {
      console.log(`- "${risk.claim}"`);
    }
  }
  console.log(`\nQuality Status:            ${release.qualityStatus}`);
  console.log(`Release Status:            ${release.releaseStatus}`);
  if (path === '/iptv-free-trial') {
    const evidence = summarizeEvidence(entry);
    console.log('Evidence:');
    console.log(`- ${evidence.externalResearchSources} external research sources recorded`);
    console.log(`- ${evidence.verifiedFirstHandTests} verified first-hand tests`);
    console.log(`- ${evidence.verifiedScreenshots} verified screenshots`);
    console.log(`- ${evidence.documentedOperationalRecords} documented operational records`);
    console.log('Claim evidence:');
    for (const claim of entry.claimEvidence ?? []) console.log(`- ${evaluateClaimEvidence(claim, entry.evidenceLog ?? [])}: ${claim.claim} (${claim.evidenceIds.length} linked records)`);
  }
  for (const reason of technical.reasons) console.log(`- ${reason}`);
  if (!incomingCount) console.log('- No incoming link found in rendered indexable pages');
}
const duplicateCanonicals = [...canonicalOwners].filter(([, owners]) => owners.length > 1).map(([url, owners]) => `${url}: ${owners.join(', ')}`);
const ownership = new Map();
for (const entry of CONTENT_QUALITY_REGISTRY) {
  const job = entry.uniqueUrlJob?.trim().toLowerCase();
  if (job) ownership.set(job, [...ownership.get(job) ?? [], entry.url]);
}
const overlaps = [...ownership].filter(([, owners]) => owners.length > 1).map(([job, owners]) => `${job}: ${owners.join(', ')}`);
console.log('\nINVENTORY AND GRAPH');
for (const [label, items] of Object.entries({
  'Sitemap URLs missing route': missingRoutes,
  'Indexable routes missing sitemap': missingSitemap,
  'Duplicate sitemap entries': duplicates,
  'Unexpected routes': unexpected,
  'Orphan pages': paths.filter((path) => path !== '/' && !incoming.get(path)?.size),
  'Broken internal targets (route inventory)': [...new Set(broken)],
  'Redirecting internal targets': [...new Set(redirects)],
  'Self links': [...new Set(selfLinks)],
  'Duplicate links': [...new Set(duplicateLinks)],
  'Duplicate canonical targets': duplicateCanonicals,
  'Possible documented URL-job overlap': overlaps,
  'Product truth data conflicts': productConflicts,
  'Click depth > 3': paths.filter((path) => (depth.get(path) ?? 0) > 3),
})) console.log(`${label}: ${items.length ? `${items.length} found${items.length <= 12 ? `: ${items.join('; ')}` : ` (first 12: ${items.slice(0, 12).join('; ')})`}` : 'NONE FOUND'}`);
console.log('HTTP status and live redirects: NOT VERIFIED (offline audit)');
console.log('Contextual link classification: NOT VERIFIED (rendered markup does not establish editorial context)');
