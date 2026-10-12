import NodeCache from "node-cache";
import { recordCacheHit, recordCacheMiss } from "./metrics.js";

const oneHourSeconds = 60 * 60;
const defaultMaxKeys = 500;

function createNodeCache<T extends string>(
  cacheName: string,
  ttlSeconds = oneHourSeconds,
  maxKeys = defaultMaxKeys,
) {
  const cache = new NodeCache({
    stdTTL: ttlSeconds,
    checkperiod: ttlSeconds,
    useClones: false,
    maxKeys,
  });

  function cacheGet(key: NodeCache.Key) {
    const value = cache.get<T>(key);

    if (value === undefined) {
      recordCacheMiss(cacheName);
    } else {
      recordCacheHit(cacheName);
    }

    return value;
  }

  /* Returns false instead of throwing when the cache is full, so a full cache only disables caching. */
  function cacheSet(key: NodeCache.Key, value: T) {
    try {
      return cache.set<T>(key, value);
    } catch {
      return false;
    }
  }

  return {
    cacheGet,
    cacheSet,
  };
}

export { createNodeCache, oneHourSeconds };
