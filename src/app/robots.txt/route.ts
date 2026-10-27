import { SITE_URL } from '@/lib/site-config';

/**
 * robots.txt for https://www.tryiptv.com, served as plain text so it can carry a Content-Signal line
 * (MetadataRoute.Robots has no field for it).
 *
 * Policy (2026-10-23 audit): search and answer engines may crawl and cite; crawlers whose only job is
 * collecting model-training data are blocked. Google-Extended stays allowed on purpose: it also feeds
 * Gemini's grounded answers, so blocking it could cost Gemini citations (it does not affect Google Search
 * or AI Overviews). Blocking ClaudeBot does not affect Claude-SearchBot; blocking GPTBot does not affect
 * OAI-SearchBot or ChatGPT-User; Applebot-Extended does not affect Applebot (Siri/Spotlight).
 *
 * Robots.txt controls crawling only; noindex pages are handled by <meta robots> / X-Robots-Tag.
 */
const searchAndAnswerAgents = [
  '*',
  'Googlebot',
  'Googlebot-Image',
  'Bingbot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Applebot',
];
const trainingOnlyAgents = ['GPTBot', 'ClaudeBot', 'CCBot', 'Bytespider', 'Applebot-Extended', 'Meta-ExternalAgent'];
const aiDiscoveryFiles = ['/llms.txt', '/llms-full.txt', '/ai.txt'];
const disallow = ['/api/', '/admin/', '/staging/'];

const group = (agents: string[], lines: string[]) =>
  [...agents.map((a) => `User-agent: ${a}`), ...lines].join('\n');

export function GET() {
  const body = [
    group(searchAndAnswerAgents, [
      // Draft standard (contentsignals.org): allowed for search and AI answers, not for training.
      'Content-Signal: search=yes, ai-input=yes, ai-train=no',
      'Allow: /',
      // More specific than Disallow: /api/, so the OG image endpoint stays crawlable.
      'Allow: /api/og',
      ...disallow.map((p) => `Disallow: ${p}`),
    ]),
    // A crawler reads only the group that names it, so each group repeats its Content-Signal.
    group(['Google-Extended'], [
      'Content-Signal: search=yes, ai-input=yes, ai-train=no',
      'Allow: /',
      'Allow: /api/og',
      ...disallow.map((p) => `Disallow: ${p}`),
    ]),
    group(trainingOnlyAgents, ['Content-Signal: ai-train=no', ...aiDiscoveryFiles.map((p) => `Allow: ${p}`), 'Disallow: /']),
    `Sitemap: ${SITE_URL}/sitemap.xml`,
  ].join('\n\n');

  return new Response(`${body}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
  });
}
