import { CacheHandler } from "@fortedigital/nextjs-cache-handler";
import createLruHandler from "@fortedigital/nextjs-cache-handler/local-lru";

CacheHandler.onCreation(async () => {
  const handler = createLruHandler();
  return {
    handlers: [handler],
  };
});

export default CacheHandler;
