"use server";

import { getSearchIndex } from "./GlobalSearch.index";

/* Per server process. Only the first call does work, later calls return immediately. */
let preloaded = false;

async function preloadSearchIndex() {
  if (preloaded) {
    console.info("preloded ");
    return;
  }
  preloaded = true;

  try {
    await getSearchIndex();
  } catch (error) {
    preloaded = false;
    console.error("Search index preload failed", error);
  }
}

export { preloadSearchIndex };
