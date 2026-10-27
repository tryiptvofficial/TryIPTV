import { createHash } from 'node:crypto';

/**
 * Short hash of static content, for unstable_cache key parts. The data cache outlives rebuilds and
 * keys only on the function's arguments and source text, so data imported from outside the cached
 * function must be part of the key: when the content changes, the hash (and so the key) changes too.
 */
export function contentHash(value: unknown): string {
  return createHash('sha256').update(JSON.stringify(value)).digest('hex').slice(0, 12);
}
