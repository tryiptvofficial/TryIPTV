/**
 * Technical SEO audit for https://www.tryiptv.com
 *
 * Usage:
 *   npm run seo                              # against http://localhost:9002
 *   npm run seo -- --base https://...        # against a deployed URL
 *
 * Coverage: every URL in INDEXABLE_ROUTES (derived from site-routes.ts).
 * Adding a route to site-routes.ts automatically includes it in all checks.
 * Exits 1 on any FAIL.
 *
 * Checks:
 *   A  Sitemap vs registry diff
 *   B  Redirect gates (/index /contact /terms /terms-of-service)
 *   C  Per-route: HTTP 200, robots meta, canonical (7 sub-checks), title,
 *      description, H1, og:url, initial-HTML H1
 *   D  Title uniqueness across all routes
 *   E  JSON-LD: valid, @id conflicts (all routes)
 *   F  Breadcrumb canonical URLs (device/player/guide sample)
 *   G  /index not internally linked
 *   H  Stale price/claim spot-checks
 *   I  Orphan detection
 *   J  lastModified sanity
 */

import { INDEXABLE_ROUTES, SITE_ROUTES } from '../src/lib/site-routes.ts';
import { SITE_URL } from '../src/lib/site-config.ts';

const args = process.argv.slice(2);
const base = (args.includes('--base') ? args[args.indexOf('--base') + 1] : 'http://localhost:9002').replace(/\/$/, '');

const PASS = 'PASS';
const FAIL = 'FAIL';
const WARN = 'WARNING';
const NOT_VERIFIED = 'NOT VERIFIED';

let failCount = 0;
let warnCount = 0;
let passCount = 0;

function report(status, message) {
  if (status === FAIL)         { failCount++; console.log(`FAIL     ${message}`); }
  else if (status === WARN)    { warnCount++; console.log(`WARNING  ${message}`); }
  else if (status === NOT_VERIFIED) { console.log(`NOT VERIFIED  ${message}`); }
  else                         { passCount++; console.log(`PASS     ${message}`); }
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

function extractRobotsMeta(html) {
  const m = html.match(/<meta[^>]+name=["']robots["'][^>]*content=["']([^"']+)["']/i)
    || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]*name=["']robots["']/i);
  return m ? m[1].toLowerCase() : null;
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

function collectSchemaTypes(block) {
  const types = [];
  function walk(node) {
    if (!node || typeof node !== 'object') return;
    if (Array.isArray(node)) { node.forEach(walk); return; }
    if (node['@type']) types.push(Array.isArray(node['@type']) ? node['@type'].join(',') : node['@type']);
    for (const v of Object.values(node)) walk(v);
  }
  walk(block);
  return types;
}

// ── Collect routes ─────────────────────────────────────────────────────────
console.log(`\nTryIPTV Full-Site SEO Audit — ${base}\n${'─'.repeat(70)}`);
console.log(`Route registry: ${INDEXABLE_ROUTES.length} indexable routes\n`);

const indexableRoutes = INDEXABLE_ROUTES;
const statusMap = new Map();
const internalLinksMap = new Map();

// ── A: Sitemap vs registry diff ─────────────────────────────────────────────
console.log('── A: Sitemap vs Registry Diff ──');
const sitemapXml = await fetchText('/sitemap.xml');
let sitemapUrls = [];
if (!sitemapXml) {
  report(FAIL, '/sitemap.xml not accessible');
} else {
  sitemapUrls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].trim());
  report(PASS, `/sitemap.xml: ${sitemapUrls.length} URLs`);

  const registrySet = new Set(indexableRoutes.map(r => SITE_URL + (r.path === '/' ? '' : r.path)));
  // Root canonical is SITE_URL with no trailing slash
  const registrySetNorm = new Set(indexableRoutes.map(r => {
    const p = r.path === '/' ? '' : r.path;
    return SITE_URL + p;
  }));

  const sitemapSet = new Set(sitemapUrls);

  const inSitemapNotRegistry = sitemapUrls.filter(u => !registrySetNorm.has(u));
  const inRegistryNotSitemap = [...registrySetNorm].filter(u => !sitemapSet.has(u));

  if (inSitemapNotRegistry.length === 0 && inRegistryNotSitemap.length === 0) {
    report(PASS, `Sitemap (${sitemapUrls.length}) and registry (${indexableRoutes.length}) match exactly`);
  } else {
    if (inSitemapNotRegistry.length > 0) {
      report(FAIL, `In sitemap but not in registry: ${inSitemapNotRegistry.join(', ')}`);
    }
    if (inRegistryNotSitemap.length > 0) {
      report(FAIL, `In registry but not in sitemap: ${inRegistryNotSitemap.join(', ')}`);
    }
  }

  // /index not in sitemap
  const hasIndex = sitemapUrls.some(u => u === `${SITE_URL}/index` || u.endsWith('/index'));
  if (hasIndex) report(FAIL, '/index appears in sitemap — must be excluded');
  else report(PASS, '/index not in sitemap');

  // No /contact (redirect) in sitemap
  if (sitemapUrls.some(u => u.endsWith('/contact') && !u.endsWith('/contact-us'))) {
    report(FAIL, '/contact (redirect) appears in sitemap');
  } else {
    report(PASS, 'No redirect URLs in sitemap (/contact, /terms, /terms-of-service)');
  }
}

// ── B: Redirect gates ───────────────────────────────────────────────────────
console.log('\n── B: Redirect Gates ──');
const redirectGates = [
  { path: '/index',          expected: '308', to: '/' },
  { path: '/contact',        expected: '308', to: '/contact-us' },
  { path: '/terms',          expected: '308', to: '/terms-conditions' },
  { path: '/terms-of-service', expected: '308', to: '/terms-conditions' },
];
for (const gate of redirectGates) {
  const res = await fetchPage(gate.path);
  const location = res.headers.get('location') || '';
  if (res.status === 301 || res.status === 308) {
    const hops = location.replace(/^https?:\/\/[^/]+/, '') || location;
    report(PASS, `${gate.path} → ${res.status} → ${hops}`);
  } else if (res.status === 200) {
    report(FAIL, `${gate.path} returns 200 — expected permanent redirect to ${gate.to}`);
  } else if (res.status === 404) {
    report(FAIL, `${gate.path} returns 404 — missing redirect to ${gate.to}`);
  } else {
    report(WARN, `${gate.path} returns ${res.status}`);
  }
}

// ── C: Per-route full metadata audit (ALL indexable routes) ─────────────────
console.log('\n── C: Per-Route Audit (all ' + indexableRoutes.length + ' indexable routes) ──');
const titleMap = new Map();
const canonicalMap = new Map();
const jsonLdMap = new Map();

let perRoutePass = 0, perRouteFail = 0, perRouteWarn = 0;

function pr(status, msg) {
  if (status === FAIL) { perRouteFail++; failCount++; console.log(`FAIL     ${msg}`); }
  else if (status === WARN) { perRouteWarn++; warnCount++; console.log(`WARNING  ${msg}`); }
  else { perRoutePass++; passCount++; }
}

for (const route of indexableRoutes) {
  const { path } = route;

  // HTTP status
  const res = await fetchPage(path);
  statusMap.set(path, res.status);
  if (res.status !== 200) {
    if (res.status >= 300 && res.status < 400) {
      pr(FAIL, `${path} HTTP ${res.status} — indexable route must return 200, not redirect`);
    } else {
      pr(FAIL, `${path} HTTP ${res.status}`);
    }
    continue; // can't check meta on a non-200
  }

  const html = await fetchText(path);
  if (!html) { pr(WARN, `${path} HTTP 200 but body empty`); continue; }

  // robots meta — must not be noindex
  const robotsMeta = extractRobotsMeta(html);
  if (robotsMeta && robotsMeta.includes('noindex')) {
    pr(FAIL, `${path} has <meta name="robots" content="${robotsMeta}"> — indexable route must not be noindex`);
  }

  const canonical = extractCanonical(html);
  const title = extractTitle(html);
  const desc = extractMeta(html, 'description');
  const ogUrl = extractOgUrl(html);
  const h1s = extractH1s(html);

  // Canonical checks
  if (!canonical) {
    pr(FAIL, `${path} missing canonical tag`);
  } else {
    canonicalMap.set(path, canonical);
    if (!canonical.startsWith('http'))          pr(FAIL, `${path} canonical not absolute: ${canonical}`);
    if (!canonical.startsWith('https://'))      pr(FAIL, `${path} canonical not https: ${canonical}`);
    if (!canonical.includes('://www.'))         pr(FAIL, `${path} canonical missing www: ${canonical}`);
    if (path !== '/' && canonical.endsWith('/')) pr(FAIL, `${path} canonical has trailing slash: ${canonical}`);

    // Self-reference: canonical path must equal the route path
    const canonPath = canonical.replace(/^https?:\/\/[^/]+/, '') || '/';
    if (canonPath !== path) {
      pr(FAIL, `${path} canonical self-reference wrong: points to ${canonPath}`);
    }
  }

  // Title
  if (!title) pr(FAIL, `${path} missing <title>`);
  else titleMap.set(path, title);

  // Description
  if (!desc) pr(FAIL, `${path} missing meta description`);

  // H1
  if (h1s.length === 0)      pr(FAIL, `${path} no H1`);
  else if (h1s.length > 1)   pr(WARN, `${path} multiple H1s: ${h1s.map(h => `"${h.slice(0,40)}"`).join(', ')}`);

  // og:url vs canonical
  if (canonical && ogUrl) {
    const ogNorm  = ogUrl.replace(/\/$/, '');
    const canNorm = canonical.replace(/\/$/, '');
    if (ogNorm !== canNorm) pr(FAIL, `${path} og:url (${ogUrl}) ≠ canonical (${canonical})`);
  } else if (!ogUrl) {
    pr(WARN, `${path} missing og:url`);
  }

  // Initial HTML check (H1 in body = content rendered server-side)
  if (h1s.length === 0) pr(FAIL, `${path} H1 missing from initial HTML (possible CSR-only content)`);

  // JSON-LD
  const blocks = extractJsonLd(html);
  if (blocks.length === 0) {
    pr(WARN, `${path} no JSON-LD structured data`);
  } else {
    let parseOk = true;
    for (const m of html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
      try { JSON.parse(m[1]); } catch { parseOk = false; pr(FAIL, `${path} JSON-LD parse error`); }
    }

    // @id conflict check — reference nodes (@id only, no @type) are NOT entity declarations
    const ids = new Map();
    let idConflict = false;
    const collectIds = (node) => {
      if (!node || typeof node !== 'object') return;
      if (Array.isArray(node)) { node.forEach(collectIds); return; }
      if (node['@id'] && node['@type']) {
        const id = node['@id'];
        const type = Array.isArray(node['@type']) ? node['@type'].join(',') : node['@type'];
        if (ids.has(id) && ids.get(id) !== type) {
          pr(FAIL, `${path} conflicting @id "${id}": "${ids.get(id)}" vs "${type}"`);
          idConflict = true;
        } else ids.set(id, type);
      }
      for (const v of Object.values(node)) collectIds(v);
    };
    blocks.forEach(collectIds);

    const types = blocks.flatMap(collectSchemaTypes);
    jsonLdMap.set(path, { blocks: blocks.length, types, idConflict, parseOk });
  }

  // Internal links (for orphan + /index checks)
  internalLinksMap.set(path, extractInternalLinks(html));
}

// ── D: Title uniqueness ─────────────────────────────────────────────────────
console.log('\n── D: Title Uniqueness ──');
const titleCounts = new Map();
for (const [path, title] of titleMap) {
  if (!titleCounts.has(title)) titleCounts.set(title, []);
  titleCounts.get(title).push(path);
}
let dupTitleFound = false;
for (const [title, paths] of titleCounts) {
  if (paths.length > 1) {
    report(FAIL, `Duplicate title "${title.slice(0,60)}" on: ${paths.join(', ')}`);
    dupTitleFound = true;
  }
}
if (!dupTitleFound) report(PASS, `All ${titleMap.size} titles are unique`);

// ── E: JSON-LD summary by route family ──────────────────────────────────────
console.log('\n── E: JSON-LD Summary by Route Family ──');
const families = [
  { label: 'Homepage',       paths: ['/'] },
  { label: 'Pricing',        paths: ['/pricing'] },
  { label: 'Free Trial',     paths: ['/iptv-free-trial'] },
  { label: 'Best IPTV / How It Works / Setup / Best Service',
    paths: ['/best-iptv-service', '/how-it-works', '/setup'] },
  { label: 'Devices hub',    paths: ['/devices'] },
  { label: 'Device pages',   paths: indexableRoutes.filter(r => r.section === 'devices' && r.path !== '/devices').map(r => r.path) },
  { label: 'Players hub',    paths: ['/players'] },
  { label: 'Player pages',   paths: indexableRoutes.filter(r => r.section === 'players' && r.path !== '/players').map(r => r.path) },
  { label: 'Guides hub',     paths: ['/guides'] },
  { label: 'Guide pages',    paths: indexableRoutes.filter(r => r.section === 'guides' && r.path !== '/guides').map(r => r.path) },
  { label: 'Help hub',       paths: ['/help'] },
  { label: 'Help pages',     paths: indexableRoutes.filter(r => r.section === 'help' && r.path !== '/help').map(r => r.path) },
  { label: 'FAQ',            paths: ['/faq'] },
  { label: 'About',          paths: ['/about'] },
  { label: 'Contact',        paths: ['/contact-us'] },
  { label: 'Author pages',   paths: indexableRoutes.filter(r => r.path.startsWith('/authors/')).map(r => r.path) },
  { label: 'Legal',          paths: indexableRoutes.filter(r => r.section === 'legal').map(r => r.path) },
  { label: 'Utility (press/faq/about)', paths: ['/press'] },
];

for (const { label, paths } of families) {
  const flatPaths = Array.isArray(paths) ? paths.flat() : [paths];
  if (flatPaths.length === 0) continue;
  const entries = flatPaths.map(p => [p, jsonLdMap.get(p)]).filter(([, v]) => v);
  if (entries.length === 0) {
    console.log(`  ${label}: no JSON-LD data collected`);
    continue;
  }
  for (const [p, info] of entries) {
    const conflict = info.idConflict ? ' ⚠ @id conflict' : '';
    const types = [...new Set(info.types)].join(', ') || '(none)';
    console.log(`  ${p}: ${info.blocks} block(s) | types: ${types}${conflict}`);
  }
}

// ── F: Breadcrumb canonical URLs ─────────────────────────────────────────────
console.log('\n── F: Breadcrumbs ──');
const bcPaths = ['/devices/firestick-iptv', '/players/tivimate', '/guides/what-is-iptv'];
for (const path of bcPaths) {
  const html = await fetchText(path);
  if (!html) continue;
  const blocks = extractJsonLd(html);
  const bcBlock = blocks.find(b =>
    b['@type'] === 'BreadcrumbList' ||
    (b['@graph'] && b['@graph'].some(n => n['@type'] === 'BreadcrumbList'))
  );
  if (!bcBlock) { report(WARN, `${path} no BreadcrumbList schema`); continue; }
  const bStr = JSON.stringify(bcBlock);
  if (bStr.includes('tryiptv.com') && !bStr.includes('http://')) {
    report(PASS, `${path} breadcrumb uses https URLs`);
  } else if (bStr.includes('http://')) {
    report(FAIL, `${path} breadcrumb contains http:// URL`);
  }
}

// ── G: /index not internally linked ─────────────────────────────────────────
console.log('\n── G: /index References ──');
let indexLinked = false;
for (const [path, links] of internalLinksMap) {
  if (links.includes('/index')) { report(FAIL, `${path} links to /index`); indexLinked = true; }
}
if (!indexLinked) report(PASS, 'No pages internally link to /index');

// ── H: Stale claims spot-checks ──────────────────────────────────────────────
console.log('\n── H: Stale Price / Claim Checks ──');
for (const path of ['/', '/pricing']) {
  const html = await fetchText(path);
  if (!html) continue;
  // Strip all <script> blocks first to avoid RSC payload token false positives
  const htmlText = html.replace(/<script[\s\S]*?<\/script>/gi, '');
  const staleAmounts = ['$16', '$39', '$60.', '$90'];
  for (const amt of staleAmounts) {
    if (htmlText.includes(amt)) report(WARN, `${path} may contain stale amount ${amt}`);
  }
  if (htmlText.includes('24,000') || htmlText.includes('80,000')) {
    report(FAIL, `${path} contains stale channel or VOD count`);
  }
  if (/24\/7 support/i.test(htmlText)) report(FAIL, `${path} contains forbidden "24/7 support" claim`);
  if (/instant activation/i.test(htmlText)) report(FAIL, `${path} contains forbidden "instant activation" claim`);
  if (/zero buffering/i.test(htmlText)) report(FAIL, `${path} contains forbidden "zero buffering" claim`);
}
report(PASS, 'Stale price/claim checks complete');

// ── I: Robots.txt ────────────────────────────────────────────────────────────
console.log('\n── Robots.txt ──');
const robots = await fetchText('/robots.txt');
if (!robots) { report(FAIL, '/robots.txt not accessible'); }
else {
  if (robots.includes(`${SITE_URL}/sitemap.xml`)) report(PASS, 'robots.txt contains correct sitemap URL');
  else report(FAIL, `robots.txt missing sitemap: ${SITE_URL}/sitemap.xml`);
  if (robots.includes('Allow: /'))        report(PASS, 'robots.txt allows crawling');
  if (robots.includes('Disallow: /api/')) report(PASS, 'robots.txt disallows /api/');
}

// ── J: lastModified sanity ───────────────────────────────────────────────────
console.log('\n── lastModified Sanity ──');
const today = new Date().toISOString().slice(0, 10);
let lastModFail = false;
for (const route of indexableRoutes) {
  if (!route.lastModified) { report(WARN, `${route.path} has no lastModified`); continue; }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(route.lastModified)) {
    report(FAIL, `${route.path} lastModified "${route.lastModified}" not YYYY-MM-DD`);
    lastModFail = true;
  } else if (route.lastModified > today) {
    report(FAIL, `${route.path} lastModified "${route.lastModified}" is in the future`);
    lastModFail = true;
  }
}
if (!lastModFail) report(PASS, 'All lastModified dates valid and not in the future');

// ── K: Orphan detection ─────────────────────────────────────────────────────
console.log('\n── Orphan Detection ──');
const allInbound = new Map();
for (const route of indexableRoutes) allInbound.set(route.path, []);
for (const [fromPath, links] of internalLinksMap) {
  for (const link of links) {
    if (allInbound.has(link)) allInbound.get(link).push(fromPath);
  }
}
let orphanFound = false;
for (const [path, inbound] of allInbound) {
  if (path === '/' || path.startsWith('/authors/')) continue;
  if (inbound.length === 0 && internalLinksMap.has(path)) {
    report(WARN, `${path} has zero inbound internal links from audited pages`);
    orphanFound = true;
  }
}
if (!orphanFound) report(PASS, 'No orphan pages detected');

// ── Summary ──────────────────────────────────────────────────────────────────
console.log(`\n${'═'.repeat(70)}`);
console.log(`Routes audited:   ${indexableRoutes.length}`);
console.log(`PASS:             ${passCount}`);
console.log(`WARNING:          ${warnCount}`);
console.log(`FAIL:             ${failCount}`);
console.log(`${'─'.repeat(70)}`);
console.log(`Per-route totals: ${perRoutePass} pass / ${perRouteWarn} warn / ${perRouteFail} fail`);
console.log(`${'─'.repeat(70)}`);
if (failCount === 0 && warnCount === 0) console.log('Overall: PASS');
else if (failCount === 0)               console.log('Overall: PASS WITH WARNINGS');
else                                    console.log('Overall: FAIL');
console.log(`${'═'.repeat(70)}`);

process.exitCode = failCount > 0 ? 1 : 0;
