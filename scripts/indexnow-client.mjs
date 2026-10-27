import { SITE_URL } from '../src/lib/site-config.ts';
import { INDEXABLE_ROUTES } from '../src/lib/site-routes.ts';

const KEY = '862125f68a97425bb202a1bf050065be';
const ENDPOINT = 'https://api.indexnow.org/IndexNow';
const HOST = new URL(SITE_URL).hostname;
const approvedPaths = new Set(INDEXABLE_ROUTES.map(({ path }) => path));

const statusMessages = {
  200: 'URLs submitted successfully.',
  202: 'URLs accepted; IndexNow may still need to verify the key.',
  400: 'Malformed IndexNow request.',
  403: 'IndexNow key verification failed or the key does not match.',
  422: 'IndexNow rejected the URL, host, or key schema (or the URLs were resubmitted without changes).',
  429: 'IndexNow rate limit reached; try again later.',
};

export function validateIndexNowUrls(urls) {
  if (!Array.isArray(urls) || urls.length === 0) {
    throw new Error('Provide at least one approved URL for IndexNow.');
  }

  return [...new Set(urls.map((value) => {
    const url = new URL(value);
    if (url.origin !== SITE_URL || url.username || url.password || url.search || url.hash ||
        !approvedPaths.has(url.pathname)) {
      throw new Error(`URL is not an approved canonical ${SITE_URL} URL: ${value}`);
    }
    return url.href;
  }))];
}

export async function submitIndexNowUrls(urls) {
  const urlList = validateIndexNowUrls(urls);
  const send = () => fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: `${SITE_URL}/${KEY}.txt`,
      urlList,
    }),
  });

  let response = await send();
  // indexnow.org: on 429 honour Retry-After before trying again (one retry, capped at 10 minutes).
  if (response.status === 429) {
    const waitSeconds = Math.min(Number(response.headers.get('retry-after')) || 300, 600);
    console.log(`IndexNow returned 429; retrying once in ${waitSeconds}s.`);
    await new Promise((resolve) => setTimeout(resolve, waitSeconds * 1000));
    response = await send();
  }

  return {
    count: urlList.length,
    status: response.status,
    success: response.status === 200 || response.status === 202,
    message: statusMessages[response.status] ?? `Unexpected IndexNow response: HTTP ${response.status}.`,
  };
}
