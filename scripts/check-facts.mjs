import { readFileSync } from 'node:fs';
import { PRODUCT_TRUTHS } from '../src/lib/site-config.ts';
import { INDEXABLE_ROUTES } from '../src/lib/site-routes.ts';

/**
 * Checks every indexable page (rendered HTML, including JSON-LD) and the AI context files
 * against PRODUCT_TRUTHS, so a price, channel count, connection limit, trial length,
 * delivery time or refund window can't drift on one page. Bing's guidance notes that answer
 * engines may decline to cite facts that conflict across pages.
 *
 *   npm run check:facts                         against http://localhost:9002 (npm run dev / start)
 *   npm run check:facts -- --base https://…     against a preview deployment
 *
 * Exits 1 when it finds a contradiction.
 */
const args = process.argv.slice(2);
const base = (args.includes('--base') ? args[args.indexOf('--base') + 1] : 'http://localhost:9002').replace(/\/$/, '');

const T = PRODUCT_TRUTHS;
const prices = T.plans.map((p) => p.price);
const oneMonth = prices[0];
// Every dollar amount the site may legitimately show: $0 trial, plan prices, monthly equivalents,
// and the "vs buying 1-month plans" totals and savings.
const allowedDollars = new Set([
  0,
  ...prices,
  ...T.plans.map((p) => p.monthlyEquivalent),
  ...T.plans.flatMap((p) => {
    const months = Math.round(p.price / p.monthlyEquivalent);
    // Rounded to cents: 3 × 15.82 − 38.30 is 9.1599… in floating point.
    return [months * oneMonth, months * oneMonth - p.price].map((n) => Math.round(n * 100) / 100);
  }),
  // Per-day and per-week equivalents of each plan (30-day or 365/12-day months; 52/12 weeks per month).
  ...T.plans.flatMap((p) => {
    const months = Math.round(p.price / p.monthlyEquivalent);
    return [p.price / (months * 30), p.price / ((months * 365) / 12), p.price / ((months * 52) / 12)].map((n) => Math.round(n * 100) / 100);
  }),
]);
const num = (s) => Number(String(s).replace(/[^\d.]/g, ''));
const words = { one: 1, two: 2, three: 3, four: 4, five: 5 };
const trialHours = parseInt(T.trialDuration, 10);
const [actMin, actMax] = T.activationTime.match(/\d+/g).map(Number);

const RULES = [
  {
    name: 'channel count',
    re: /(\d[\d,]*)\+\s*(?:live\s+)?(?:tv\s+)?channels/gi,
    ok: (m) => num(m[1]) === num(T.channels),
  },
  {
    name: 'movies/VOD count',
    re: /(\d[\d,]*)\+\s*(?:movies|vod|on-demand titles)/gi,
    ok: (m) => num(m[1]) === num(T.vod),
  },
  {
    name: 'simultaneous connections',
    re: /\b(\d+|one|two|three|four|five)\s+simultaneous\s+(?:device\s+|stream\s+)?connections?/gi,
    ok: (m) => (words[m[1].toLowerCase()] ?? Number(m[1])) === T.connections,
  },
  {
    name: 'trial length',
    re: /\b(\d+)[-\s]?(?:hour|hr)s?\s+(?:free\s+)?(?:iptv\s+)?(?:trial|test)/gi,
    ok: (m) => Number(m[1]) === trialHours,
  },
  {
    name: 'credential delivery time',
    re: /within\s+(\d+)\s*[–-]\s*(\d+)\s+minutes/gi,
    ok: (m) => Number(m[1]) === actMin && Number(m[2]) === actMax,
  },
  {
    name: 'refund window',
    re: /\b(\d+)[-\s]day\s+(?:refund|technical resolution|money[-\s]back)|within\s+(\d+)\s+days\s+of\s+purchase/gi,
    // windowDays is null when the policy has no refund window: then any stated window is a contradiction.
    ok: (m) => T.refund.windowDays != null && Number(m[1] ?? m[2]) === T.refund.windowDays,
  },
  {
    name: 'unconditional refund wording',
    re: /money[-\s]back guarantee|guaranteed refund|no[-\s]questions[-\s]asked/gi,
    // allowed only when the sentence denies it ("is not an unconditional … money-back guarantee")
    ok: (m, text) => /\bnot\b[^.]{0,40}$/i.test(text.slice(Math.max(0, m.index - 60), m.index)),
  },
  {
    name: 'dollar amount',
    // Commas only as thousands separators: "$1,200" is 1200, while "$15.82, $12.77" stays two prices.
    re: /\$((?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d{2})?)(?!\d)/g,
    ok: (m) => allowedDollars.has(num(m[1])),
  },
];

const toText = (html) =>
  html
    // Elements marked data-facts-ignore hold sourced third-party figures (cable bills, other services'
    // prices, other providers' trial lengths), not TryIPTV claims. Only leaf blocks are marked, so the
    // lazy match to the first closing tag of the same name is exact.
    .replace(/<(tr|p|li|ul|span)\b[^>]*\bdata-facts-ignore\b[^>]*>[\s\S]*?<\/\1>/gi, ' ')
    // keep JSON-LD (its claims count too) but drop other scripts and styles
    .replace(/<script(?![^>]*ld\+json)[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    // block boundaries stop a match running from one element into the next (stat label → value)
    .replace(/<\/?(?:div|p|li|td|th|dt|dd|h[1-6]|section|article|tr|ul|ol)\b[^>]*>/gi, ' | ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\\u0026/g, '&')
    .replace(/\s+/g, ' ');

const sources = [
  ...INDEXABLE_ROUTES.map((r) => ({ label: r.path, load: () => fetch(base + r.path).then((res) => res.text()).then(toText) })),
  ...['llms.txt', 'llms-full.txt', 'ai.txt'].map((f) => ({ label: `public/${f}`, load: async () => readFileSync(new URL(`../public/${f}`, import.meta.url), 'utf8') })),
];

let problems = 0;
for (const { label, load } of sources) {
  let text;
  try {
    text = await load();
  } catch (error) {
    console.error(`${label}: could not load (${error.message}). Is the server running at ${base}?`);
    process.exit(2);
  }
  for (const rule of RULES) {
    for (const m of text.matchAll(rule.re)) {
      if (rule.ok(m, text)) continue;
      problems++;
      const at = m.index ?? 0;
      console.log(`${label}  [${rule.name}]  "${m[0]}"  …${text.slice(Math.max(0, at - 60), at + 60).trim()}…`);
    }
  }
}

console.log(problems ? `\n${problems} contradiction(s) with PRODUCT_TRUTHS.` : `No contradictions with PRODUCT_TRUTHS across ${sources.length} sources.`);
process.exitCode = problems ? 1 : 0;
