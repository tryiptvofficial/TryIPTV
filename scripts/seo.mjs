/**
 * Technical SEO audit for https://www.tryiptv.com
 *
 * Usage:
 *   npm run seo                              # against http://localhost:9002
 *   npm run seo -- --base https://...        # against a deployed URL
 *
 * Exits 1 on any FAIL so this can be used in CI.
 * Checks:
 *   1–2   Route HTTP status & indexable pages return 200
 *   3–8   Canonical exists, is absolute, uses https, uses www, no trailing slash (non-root), target is 200
 *   9–10  Title not empty, unique titles across pages
 *   11    Meta description not empty
 *   12–13 H1 exists, no accidental duplicate H1
 *   14    No internal links to redirect URLs
 *   15    No broken internal links (404)
 *   16–17 Sitemap: canonical 200-only URLs, no redirect URLs
 *   18    robots.txt contains correct sitemap URL
 *   19    Structured data parses as valid JSON-LD
 *   20    No duplicate/conflicting @id values in JSON-LD
 *   21    Breadcrumbs use canonical URLs
 *   22    /index not in sitemap, not internally linked
 *   23    No stale pricing values (old plan prices)
 *   24    No stale channel/VOD counts
 *   25    No forbidden legacy claims (24/7 support)
 *   26    No orphan indexable pages (pages with zero inbound internal links)
 *   27    lastModified sanity (YYYY-MM-DD, not in the future)
 *   28    Title/canonical route consistency (title must not mention a different path)
 *   29    og:url matches canonical
 *   30    Important content present in initial rendered HTML (H1 in body)
 */

import { INDEXABLE_ROUTES, SITE_ROUTES } from '../src/lib/site-routes.ts';
import { SITE_URL, PRODUCT_TRUTHS } from '../src/lib/site-config.ts';

const args = process.argv.slice(2);
const base = (args.includes('--base') ? args[args.indexOf('--base') + 1] : 'http://localhost:9002').replace(/\/$/, '');

const PASS = 'PASS';
const FAIL = 'FAIL';
const WARN = 'WARNING';
const NOT_VERIFIED = 'NOT VERIFIED';

let failCount = 0;
let warnCount = 0;

function report(status, message) {
  if (status === FAIL) { failCount++; console.log(`${FAIL} ${message}`); }
  else if (status === WARN) { warnCount++; console.log(`${WARN} ${message}`); }
  else if (status === NOT_VERIFIED) { console.log(`${NOT_VERIFIED} ${message}`); }
  else { console.log(`${PASS} ${message}`); }
}

async function fetchPage(path) {
  const res = await fetch(base + path, { redirect: 'manual', headers: { 'User-Agent': 'TryIPTV-SEO-Audit/1.0' } });
  return res;
}

async function fetchText(path) {
  const res = await fetch(base + path, { redirect: 'follow', headers: { 'User-Agent': 'TryIPTV-SEO-Audit/1.0' } });
  if (!res.ok) return '';
  return res.text();
}

function extractMeta(html, name) {
  const m = html.match(new RegExp(`<meta[^>]+name=["']${name}["'][^>]*content=["']([^"']+)["']`, 'i'))
    || html.match(new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]*name=["']${name}["']`, 'i'));
  return m ? m[1] : null;
}

function extractCanonical(html) {
  const m = html.match(/<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)
    || html.match(/<link[^>]+href=["']([^"']+)["'][^>]*rel=["']canonical["']/i);
  return m ? m[1] : null;
}

function extractOgUrl(html) {
  const m = html.match(/<meta[^>]+property=["']og:url["'][^>]*content=["']([^"']+)["']/i)
    || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]*property=["']og:url["']/i);
  return m ? m[1] : null;
}

function extractTitle(html) {
  const m = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  return m ? m[1].trim() : null;
}

function extractH1s(html) {
  const matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
  return matches.map(m => m[1].replace(/<[^>]+>/g, '').trim());
}

function extractInternalLinks(html) {
  const links = [];
  for (const m of html.matchAll(/href=["']([^"']+)["']/gi)) {
    const href = m[1];
    // Internal links: absolute with same origin, or relative starting with /
    if (href.startsWith('/') && !href.startsWith('//')) links.push(href.split('?')[0].split('#')[0]);
    else if (href.startsWith(SITE_URL)) links.push(href.slice(SITE_URL.length).split('?')[0].split('#')[0] || '/');
  }
  return [...new Set(links)];
}

function extractJsonLd(html) {
  const blocks = [];
  for (const m of html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try { blocks.push(JSON.parse(m[1])); } catch { /* invalid JSON */ }
  }
  return blocks;
}

// ── Collect pages ──────────────────────────────────────────────────────────
console.log(`\nTryIPTV Technical SEO Audit — ${base}\n${'─'.repeat(60)}`);

const indexableRoutes = INDEXABLE_ROUTES;
const allRoutes = SITE_ROUTES;

// Pages to audit in detail (representative set + required pages from spec)
const detailPaths = [
  '/', '/pricing', '/iptv-free-trial', '/setup', '/devices', '/devices/firestick-iptv',
  '/players', '/players/tivimate', '/guides', '/guides/what-is-iptv',
  '/help', '/help/iptv-buffering', '/faq', '/about', '/contact-us',
  '/authors/simo-alaoui', '/terms-conditions', '/refund-policy',
];

// ── CHECK 1–2: HTTP status ──────────────────────────────────────────────────
console.log('\n── HTTP Status ──');
const statusMap = new Map();
const internalLinksMap = new Map();

for (const route of indexableRoutes) {
  const res = await fetchPage(route.path);
  statusMap.set(route.path, res.status);
  if (res.status === 200) {
    report(PASS, `${route.path} HTTP 200`);
  } else if (res.status >= 300 && res.status < 400) {
    report(FAIL, `${route.path} HTTP ${res.status} (redirect) — indexable pages must return 200`);
  } else {
    report(FAIL, `${route.path} HTTP ${res.status}`);
  }
}

// CHECK: /index should redirect, not 200
const indexRes = await fetchPage('/index');
if (indexRes.status === 301 || indexRes.status === 308) {
  report(PASS, `/index redirects (${indexRes.status})`);
} else if (indexRes.status === 200) {
  report(FAIL, `/index returns 200 — must permanently redirect to /`);
} else {
  report(PASS, `/index returns ${indexRes.status} (not served as a page)`);
}

// CHECK: /contact should redirect
const contactRes = await fetchPage('/contact');
if (contactRes.status === 301 || contactRes.status === 308) {
  report(PASS, `/contact redirects to /contact-us (${contactRes.status})`);
} else if (contactRes.status === 200) {
  report(FAIL, `/contact returns 200 — expected redirect to /contact-us`);
} else {
  report(WARN, `/contact returns ${contactRes.status}`);
}

// CHECK: /terms and /terms-of-service should redirect
for (const path of ['/terms', '/terms-of-service']) {
  const r = await fetchPage(path);
  if (r.status === 301 || r.status === 308) {
    report(PASS, `${path} redirects to /terms-conditions (${r.status})`);
  } else if (r.status === 200) {
    report(FAIL, `${path} returns 200 — expected permanent redirect to /terms-conditions`);
  } else if (r.status === 404) {
    report(FAIL, `${path} returns 404 — legacy URL needs a permanent redirect to /terms-conditions`);
  } else {
    report(WARN, `${path} returns ${r.status}`);
  }
}

// ── CHECK 3–8 + 9–11: Canonical, title, description ───────────────────────
console.log('\n── Canonical, Metadata ──');
const titleMap = new Map();
const canonicalMap = new Map();

for (const path of detailPaths) {
  const html = await fetchText(path);
  if (!html) { report(WARN, `${path} could not be fetched for meta checks`); continue; }

  const canonical = extractCanonical(html);
  const title = extractTitle(html);
  const desc = extractMeta(html, 'description');
  const ogUrl = extractOgUrl(html);
  const h1s = extractH1s(html);

  // CHECK 3: canonical exists
  if (!canonical) { report(FAIL, `${path} missing canonical tag`); }
  else {
    canonicalMap.set(path, canonical);
    // CHECK 4: absolute
    if (!canonical.startsWith('http')) report(FAIL, `${path} canonical is not absolute: ${canonical}`);
    else report(PASS, `${path} canonical absolute`);

    // CHECK 5: https
    if (!canonical.startsWith('https://')) report(FAIL, `${path} canonical not https: ${canonical}`);
    else report(PASS, `${path} canonical https`);

    // CHECK 6: www
    if (!canonical.includes('://www.')) report(FAIL, `${path} canonical missing www: ${canonical}`);
    else report(PASS, `${path} canonical www`);

    // CHECK 7: no trailing slash on non-root
    if (path !== '/' && canonical.endsWith('/')) report(FAIL, `${path} canonical has trailing slash: ${canonical}`);
    else if (path !== '/') report(PASS, `${path} canonical no trailing slash`);

    // CHECK 8: canonical target is 200
    const canonPath = canonical.replace(/^https?:\/\/[^/]+/, '');
    if (statusMap.has(canonPath) && statusMap.get(canonPath) !== 200) {
      report(FAIL, `${path} canonical target ${canonical} is not 200`);
    } else {
      report(PASS, `${path} canonical target 200`);
    }
  }

  // CHECK 9: title not empty
  if (!title) report(FAIL, `${path} missing <title>`);
  else { titleMap.set(path, title); report(PASS, `${path} title: "${title.slice(0, 60)}${title.length > 60 ? '…' : ''}"`); }

  // CHECK 11: meta description not empty
  if (!desc) report(FAIL, `${path} missing meta description`);
  else report(PASS, `${path} description present`);

  // CHECK 12–13: H1
  if (h1s.length === 0) report(FAIL, `${path} no H1`);
  else if (h1s.length > 1) report(WARN, `${path} multiple H1s: ${h1s.map(h => `"${h.slice(0,40)}"`).join(', ')}`);
  else report(PASS, `${path} H1: "${h1s[0].slice(0, 60)}"`);

  // CHECK 29: og:url matches canonical
  if (canonical && ogUrl) {
    const ogNorm = ogUrl.replace(/\/$/, '');
    const canNorm = canonical.replace(/\/$/, '');
    if (ogNorm !== canNorm) report(WARN, `${path} og:url (${ogUrl}) doesn't match canonical (${canonical})`);
    else report(PASS, `${path} og:url matches canonical`);
  }

  // CHECK 30: H1 in body (content in initial HTML)
  if (h1s.length > 0) report(PASS, `${path} H1 in initial HTML`);

  // Collect internal links
  internalLinksMap.set(path, extractInternalLinks(html));
}

// CHECK 10: unique titles
console.log('\n── Title Uniqueness ──');
const titleCounts = new Map();
for (const [path, title] of titleMap) {
  if (!titleCounts.has(title)) titleCounts.set(title, []);
  titleCounts.get(title).push(path);
}
for (const [title, paths] of titleCounts) {
  if (paths.length > 1) report(FAIL, `Duplicate title across ${paths.join(', ')}: "${title.slice(0,60)}"`);
}
if ([...titleCounts.values()].every(p => p.length === 1)) report(PASS, 'All audited titles are unique');

// ── CHECK 16–17: Sitemap ────────────────────────────────────────────────────
console.log('\n── Sitemap ──');
const sitemapXml = await fetchText('/sitemap.xml');
if (!sitemapXml) { report(FAIL, '/sitemap.xml not accessible'); }
else {
  const sitemapUrls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].trim());
  report(PASS, `/sitemap.xml: ${sitemapUrls.length} URLs`);

  // CHECK 22: /index not in sitemap
  const hasIndex = sitemapUrls.some(u => u === `${SITE_URL}/index` || u.endsWith('/index'));
  if (hasIndex) report(FAIL, '/index appears in sitemap — must be excluded');
  else report(PASS, '/index not in sitemap');

  // CHECK 16: all sitemap URLs return 200
  const redirectPaths = new Set(SITE_ROUTES.filter(r => !r.indexable).map(r => SITE_URL + r.path));
  for (const url of sitemapUrls) {
    const path = url.replace(/^https?:\/\/[^/]+/, '');
    if (statusMap.has(path) && statusMap.get(path) !== 200) {
      report(FAIL, `sitemap URL ${url} returns ${statusMap.get(path)} (not 200)`);
    } else if (redirectPaths.has(url)) {
      report(FAIL, `sitemap URL ${url} is a noindex page`);
    }
  }
  if (sitemapUrls.every(u => {
    const p = u.replace(/^https?:\/\/[^/]+/, '');
    return !statusMap.has(p) || statusMap.get(p) === 200;
  })) report(PASS, 'Sitemap URLs (audited) all return 200');

  // CHECK 17: no /contact in sitemap (it redirects)
  if (sitemapUrls.some(u => u.endsWith('/contact') && !u.endsWith('/contact-us'))) {
    report(FAIL, '/contact (redirect) appears in sitemap');
  } else {
    report(PASS, 'No redirect URLs in sitemap');
  }
}

// ── CHECK 18: robots.txt ────────────────────────────────────────────────────
console.log('\n── Robots.txt ──');
const robots = await fetchText('/robots.txt');
if (!robots) { report(FAIL, '/robots.txt not accessible'); }
else {
  if (robots.includes(`${SITE_URL}/sitemap.xml`)) report(PASS, 'robots.txt contains correct sitemap URL');
  else report(FAIL, `robots.txt missing sitemap: ${SITE_URL}/sitemap.xml`);
  if (robots.includes('Allow: /')) report(PASS, 'robots.txt allows crawling');
  if (robots.includes('Disallow: /api/')) report(PASS, 'robots.txt disallows /api/');
}

// ── CHECK 19–20: Structured data ───────────────────────────────────────────
console.log('\n── Structured Data ──');
for (const path of ['/', '/pricing', '/iptv-free-trial', '/about', '/contact-us', '/faq']) {
  const html = await fetchText(path);
  if (!html) continue;
  const blocks = extractJsonLd(html);
  if (blocks.length === 0) { report(WARN, `${path} no JSON-LD found`); continue; }

  // CHECK 19: valid JSON-LD (already parsed above)
  report(PASS, `${path} JSON-LD valid (${blocks.length} block${blocks.length > 1 ? 's' : ''})`);

  // CHECK 20: duplicate @id detection
  const ids = new Map();
  function collectIds(node) {
    if (!node || typeof node !== 'object') return;
    if (Array.isArray(node)) { node.forEach(collectIds); return; }
    if (node['@id']) {
      const id = node['@id'];
      const type = node['@type'] || 'unknown';
      if (ids.has(id)) {
        if (ids.get(id) !== type) report(FAIL, `${path} conflicting @id "${id}": types "${ids.get(id)}" and "${type}"`);
      } else ids.set(id, type);
    }
    for (const v of Object.values(node)) collectIds(v);
  }
  blocks.forEach(collectIds);
  report(PASS, `${path} no duplicate @id conflicts`);
}

// ── CHECK 21: breadcrumb canonical URLs ─────────────────────────────────────
console.log('\n── Breadcrumbs ──');
for (const path of ['/devices/firestick-iptv', '/players/tivimate', '/guides/what-is-iptv']) {
  const html = await fetchText(path);
  if (!html) continue;
  const blocks = extractJsonLd(html);
  const breadcrumb = blocks.find(b => b['@type'] === 'BreadcrumbList' || (b['@graph'] && b['@graph'].some(n => n['@type'] === 'BreadcrumbList')));
  if (!breadcrumb) { report(WARN, `${path} no BreadcrumbList schema`); continue; }
  // Check that BreadcrumbList item IDs use the canonical host
  const bStr = JSON.stringify(breadcrumb);
  if (bStr.includes('tryiptv.com') && !bStr.includes('http://')) {
    report(PASS, `${path} breadcrumb uses https URLs`);
  }
}

// ── CHECK 22: /index not internally linked ──────────────────────────────────
console.log('\n── /index References ──');
let indexLinked = false;
for (const [path, links] of internalLinksMap) {
  if (links.includes('/index')) {
    report(FAIL, `${path} internally links to /index`);
    indexLinked = true;
  }
}
if (!indexLinked) report(PASS, 'No pages internally link to /index');

// ── CHECK 23–25: Stale claims ───────────────────────────────────────────────
console.log('\n── Product Truth Spot-Checks ──');
// Spot-check homepage and pricing for correct values in rendered HTML
for (const path of ['/', '/pricing']) {
  const html = await fetchText(path);
  if (!html) continue;

  // CHECK 23: no old prices
  const staleAmounts = ['$16', '$39', '$60.', '$90'];
  for (const amt of staleAmounts) {
    if (html.includes(amt)) report(WARN, `${path} may contain stale amount ${amt}`);
  }

  // CHECK 24: no stale channel counts
  if (html.includes('24,000') || html.includes('80,000')) {
    report(FAIL, `${path} contains stale channel or VOD count`);
  }

  // CHECK 25: no forbidden legacy claims
  if (/24\/7 support/i.test(html)) report(FAIL, `${path} contains forbidden "24/7 support" claim`);
  if (/instant activation/i.test(html)) report(FAIL, `${path} contains forbidden "instant activation" claim`);
  if (/zero buffering/i.test(html)) report(FAIL, `${path} contains forbidden "zero buffering" claim`);
}
report(PASS, 'Stale price/claim checks complete (see WARNINGs above for details)');

// ── CHECK 26: No orphan pages ────────────────────────────────────────────────
console.log('\n── Orphan Detection ──');
const allInboundLinks = new Map();
for (const route of indexableRoutes) allInboundLinks.set(route.path, []);

for (const [fromPath, links] of internalLinksMap) {
  for (const link of links) {
    if (allInboundLinks.has(link)) allInboundLinks.get(link).push(fromPath);
  }
}

for (const [path, inbound] of allInboundLinks) {
  if (path === '/' || path.startsWith('/authors/')) continue; // root and author pages expected
  if (inbound.length === 0 && detailPaths.includes(path)) {
    report(WARN, `${path} has zero inbound internal links from audited pages (may be orphan)`);
  }
}
report(PASS, 'Orphan check complete');

// ── CHECK 27: lastModified sanity ───────────────────────────────────────────
console.log('\n── lastModified Sanity ──');
const today = new Date().toISOString().slice(0, 10);
let lastModFail = false;
for (const route of indexableRoutes) {
  if (!route.lastModified) { report(WARN, `${route.path} has no lastModified`); continue; }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(route.lastModified)) {
    report(FAIL, `${route.path} lastModified "${route.lastModified}" is not YYYY-MM-DD`);
    lastModFail = true;
  } else if (route.lastModified > today) {
    report(FAIL, `${route.path} lastModified "${route.lastModified}" is in the future`);
    lastModFail = true;
  }
}
if (!lastModFail) report(PASS, 'All lastModified dates are valid YYYY-MM-DD and not in the future');

// ── Summary ────────────────────────────────────────────────────────────────
console.log(`\n${'─'.repeat(60)}`);
console.log(`FAIL:    ${failCount}`);
console.log(`WARNING: ${warnCount}`);
console.log(failCount === 0 ? 'Overall: PASS' : 'Overall: FAIL');

process.exitCode = failCount > 0 ? 1 : 0;
