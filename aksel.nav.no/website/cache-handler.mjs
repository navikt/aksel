import { CacheHandler } from "@neshca/cache-handler";
import createLruHandler from "@neshca/cache-handler/local-lru";

CacheHandler.onCreation(async () => {
  const handler = createLruHandler();
  return {
    handlers: [handler],
  };
});

export default CacheHandler;
