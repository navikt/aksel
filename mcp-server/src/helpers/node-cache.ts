import NodeCache from "node-cache";

const oneHourSeconds = 60 * 60;

function createNodeCache(ttlSeconds = oneHourSeconds) {
  return new NodeCache({
    stdTTL: ttlSeconds,
    checkperiod: ttlSeconds,
    useClones: false,
  });
}

export { createNodeCache, oneHourSeconds };
