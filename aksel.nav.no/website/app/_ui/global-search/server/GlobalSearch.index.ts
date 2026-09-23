import Fuse, { type IFuseOptions } from "fuse.js";
import "server-only";
import type { SearchPageT } from "./GlobalSearch.config";
import { fetchArticles } from "./GlobalSearch.fetch";

const fuseOptions: IFuseOptions<SearchPageT> = {
  keys: [
    { name: "heading", weight: 100 },
    { name: "lvl2.text", weight: 50 },
    { name: "lvl3.text", weight: 30 },
    { name: "lvl4.text", weight: 20 },
    { name: "ingress", weight: 20 },
    { name: "intro", weight: 20 },
    { name: "tema", weight: 60 },
    { name: "content.text", weight: 10 },
    { name: "overrideString", weight: 999 },
  ],
  includeScore: true,
  shouldSort: true,
  minMatchCharLength: 3,
  ignoreLocation: true,
  includeMatches: true,
  threshold: 0.18,
  distance: 50,
  useTokenSearch: true,
};

/* Per-process cache. Rebuilt only when the cached article data changes. */
let searchIndex: { version: string; fuse: Fuse<SearchPageT> } | null = null;

async function getSearchIndex(): Promise<Fuse<SearchPageT>> {
  const { articles, version } = await fetchArticles();

  if (searchIndex?.version !== version) {
    searchIndex = { version, fuse: new Fuse(articles, fuseOptions) };
  }

  return searchIndex.fuse;
}

export { getSearchIndex };
