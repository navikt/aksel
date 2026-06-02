import NodeCache from "node-cache";
import { recordCacheHit, recordCacheMiss } from "./metrics.js";

const oneHourSeconds = 60 * 60;

function createNodeCache<T extends string>(
  cacheName: string,
  ttlSeconds = oneHourSeconds,
) {
  const cache = new NodeCache({
    stdTTL: ttlSeconds,
    checkperiod: ttlSeconds,
    useClones: false,
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

  function cacheSet(key: NodeCache.Key, value: T) {
    return cache.set<T>(key, value);
  }

  return {
    cacheGet,
    cacheSet,
  };
}

export { createNodeCache, oneHourSeconds };
