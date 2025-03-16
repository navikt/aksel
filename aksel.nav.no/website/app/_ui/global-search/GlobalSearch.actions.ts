"use server";

import type { FuseResult, FuseResultMatch } from "fuse.js";
import Fuse from "fuse.js";
import omit from "lodash/omit";
import NodeCache from "node-cache";
import { client } from "@/app/_sanity/client";
import { GLOBAL_SEARCH_QUERY_ALL } from "@/app/_sanity/queries";
import {
  SearchHitT,
  SearchPageT,
  globalSearchConfig,
} from "./GlobalSearch.config";

function formatFuseResults(
  rawResults: FuseResult<SearchPageT>[] | SearchPageT[],
): SearchHitT[] {
  return rawResults.map((result) => {
    const item = result.item;

    return {
      ...result,
      item: omit(item, ["intro", "ingress"]),
      anchor: result.matches?.[0]
        ? resolveAnchor(result.matches[0], item)
        : undefined,
      description: item?.intro || item?.ingress || "",
    };
  });
}

function resolveAnchor(match: FuseResultMatch, item: SearchPageT) {
  if (match.key?.includes("lvl")) {
    return item[match.key.split(".")[0]][match.refIndex].id;
  }
  if (match.key === "content.text") {
    return item[match.key.split(".")[0]][match.refIndex].id;
  }
  return null;
}

/**
 * We use node-cache here since nextjs built in cache only supports 2mb,
 * while we need to cache ~ 3+ mb of data.
 */
const searchCache = new NodeCache();
const CACHE_KEY = "globalSearchArticles";

async function getArticles(): Promise<SearchPageT[]> {
  const cachedData = searchCache.get<SearchPageT[]>(CACHE_KEY);

  if (cachedData) {
    console.info("Using cached search index");
    return cachedData;
  }

  /* const _data = data as SearchPageT[];
  if (_data) {
    return _data;
  } */

  const allArticles = await client.fetch<SearchPageT[]>(
    GLOBAL_SEARCH_QUERY_ALL,
    {},
    { useCdn: false },
  );

  if (!allArticles) {
    console.error("Failed to fetch search index");
    return [];
  }

  // Cache the data for 1 hour
  searchCache.set(CACHE_KEY, allArticles, 60 * 60);

  console.info("Using remote search index");

  return allArticles;
}

async function preloadGlobalSearch() {
  void getArticles();
}

async function fuseGlobalSearch(query: string) {
  const localData = await getArticles();
  if (!query || query.length < 2) {
    return null;
  }

  const fuse = new Fuse(localData as SearchPageT[], {
    keys: [
      { name: "heading", weight: 100 },
      { name: "lvl2.text", weight: 50 },
      { name: "lvl3.text", weight: 40 },
      { name: "lvl4.text", weight: 30 },
      { name: "ingress", weight: 30 },
      { name: "intro", weight: 30 },
      { name: "tema", weight: 70 },
      { name: "content.text", weight: 20 },
    ],
    includeScore: true,
    shouldSort: true,
    minMatchCharLength: 2,
    includeMatches: true,
    threshold: 0.3,
  });

  const fuseResults = fuse
    .search(query)
    .filter((x) => x.score !== undefined && x.score < 0.3);

  const formatedResults = formatFuseResults(fuseResults);

  const groupedHits: Partial<
    Record<keyof typeof globalSearchConfig, SearchHitT[]>
  > = formatedResults?.reduce((prev, cur) => {
    const type = cur.item._type;
    if (!prev[type]) {
      prev[type] = [];
    }

    // Limit the number of hits per type to 20
    if (prev[type].length >= 20) {
      return prev;
    }

    prev[type].push(cur);
    return prev;
  }, {});

  const topResults =
    formatedResults?.length > 4
      ? formatedResults
          .filter((x) => x.score !== undefined && x.score < 0.1)
          .slice(0, 4)
      : [];

  return {
    result: {
      totalHits: Object.values(groupedHits).reduce(
        (acc, val) => acc + val.length,
        0,
      ),
      topResults,
      groupedHits: Object.entries(groupedHits).sort(
        (a, b) =>
          globalSearchConfig[a[0]].index - globalSearchConfig[b[0]].index,
      ),
    },
    query,
  };
}

export { fuseGlobalSearch, preloadGlobalSearch };
