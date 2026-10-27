import { INDEXABLE_ROUTES, SITE_ROUTES } from '../src/lib/site-routes.ts';
import { SITE_URL } from '../src/lib/site-config.ts';
import { submitIndexNowUrls, validateIndexNowUrls } from './indexnow-client.mjs';

/**
 * Submit changed canonical URLs to IndexNow (Bing, Yandex, Seznam, Naver, Yep, ...).
 *
 * Bing's 2026 guidelines ask for "streaming" submissions of changed URLs rather than repeated
 * full-sitemap batches, and indexnow.org warns that resubmitting unchanged URLs may return 422.
 * So the script needs an explicit scope:
 *
 *   npm run indexnow -- --since 2026-10-19      URLs whose lastModified (site-routes.ts) is on/after the date
 *   npm run indexnow -- --paths /pricing,/faq   specific canonical paths
 *   npm run indexnow -- --all                   every indexable URL (e.g. first submission only)
 *   add --dry-run to any of the above to print the list without sending it
 */
const args = process.argv.slice(2);
const valueOf = (flag) => {
  const i = args.indexOf(flag);
  return i >= 0 ? args[i + 1] : undefined;
};
const toUrl = (path) => (path === '/' ? SITE_URL : `${SITE_URL}${path}`);

const since = valueOf('--since');
const pathsArg = valueOf('--paths');
let routes;
if (since) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(since)) throw new Error('--since expects YYYY-MM-DD');
  routes = INDEXABLE_ROUTES.filter((route) => route.lastModified && route.lastModified >= since);
} else if (pathsArg) {
  const wanted = new Set(pathsArg.split(',').map((p) => p.trim()).filter(Boolean));
  routes = INDEXABLE_ROUTES.filter((route) => wanted.has(route.path));
  const unknown = [...wanted].filter((p) => !routes.some((route) => route.path === p));
  if (unknown.length) throw new Error(`Not approved indexable paths: ${unknown.join(', ')}`);
} else if (args.includes('--all')) {
  routes = INDEXABLE_ROUTES;
} else {
  console.error('Choose a scope: --since YYYY-MM-DD, --paths /a,/b or --all (see the header of scripts/indexnow.mjs).');
  process.exit(2);
}

const excluded = SITE_ROUTES.filter(({ indexable }) => !indexable);
console.log(`Approved indexable routes: ${INDEXABLE_ROUTES.length}`);
console.log(`Excluded noindex routes: ${excluded.map(({ path }) => path).join(', ') || 'none'}`);
if (routes.length === 0) {
  console.log('No URLs in scope; nothing to submit.');
  process.exit(0);
}

const urls = validateIndexNowUrls(routes.map(({ path }) => toUrl(path)));
console.log(`URLs in scope (${urls.length}):\n  ${urls.join('\n  ')}`);

if (args.includes('--dry-run')) {
  console.log('Dry run: no IndexNow request sent.');
} else {
  try {
    const result = await submitIndexNowUrls(urls);
    console.log(`URLs submitted: ${result.count}`);
    console.log(`HTTP status: ${result.status}`);
    console.log(result.message);
    if (!result.success) process.exitCode = 1;
  } catch (error) {
    console.error(`IndexNow submission failed: ${error instanceof Error ? error.message : String(error)}`);
    process.exitCode = 1;
  }
}
