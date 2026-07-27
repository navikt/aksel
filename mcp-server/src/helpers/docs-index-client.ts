import { fetchWithTimeout } from "./fetch.js";
import { createNodeCache, oneHourSeconds } from "./node-cache.js";

type DocsIndexEntry = {
  name: string;
  path: string;
  category: string;
  subcategory: string;
};

type DocsIndex = {
  generatedAt: string;
  total: number;
  entries: DocsIndexEntry[];
};

const docsIndexUrl = "https://aksel.nav.no/api/llm/docs";
const docsIndexCacheKey = "docs-index";
const { cacheGet, cacheSet } = createNodeCache("docs_index", oneHourSeconds);

async function getDocsIndex(): Promise<DocsIndex> {
  const cachedContent = cacheGet(docsIndexCacheKey);

  if (cachedContent) {
    return JSON.parse(cachedContent) as DocsIndex;
  }

  const response = await fetchWithTimeout(docsIndexUrl);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  const index = (await response.json()) as DocsIndex;
  cacheSet(docsIndexCacheKey, JSON.stringify(index));

  return index;
}

export { getDocsIndex };
