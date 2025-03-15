"use server";

import type { FuseResult, FuseResultMatch } from "fuse.js";
import Fuse from "fuse.js";
import omit from "lodash/omit";
import { client } from "@/app/_sanity/client";
import {
  GLOBAL_SEARCH_QUERY_ALL,
  GLOBAL_SEARCH_QUERY_RECENT,
} from "@/app/_sanity/queries";
import data from "../../../public/searchindex.json";
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
 * TODO:
 * - We probably want to always fetch from sanity, and configure caching for it locally
 */
async function getArticles(): Promise<{
  mostRecentArticles: SearchPageT[];
  allArticles: SearchPageT[];
}> {
  const _data = data as SearchPageT[];
  if (_data) {
    return { mostRecentArticles: _data.slice(0, 20), allArticles: _data };
  }

  const [mostRecentArticles, allArticles] = await Promise.all([
    client.fetch<SearchPageT[]>(
      GLOBAL_SEARCH_QUERY_RECENT,
      {},
      {
        cache: "force-cache",
        next: { revalidate: 3600 },
      },
    ),
    client.fetch<SearchPageT[]>(
      GLOBAL_SEARCH_QUERY_ALL,
      {},
      {
        cache: "force-cache",
        next: { revalidate: 3600 },
      },
    ),
  ]);

  return { mostRecentArticles, allArticles };
}

async function fuseGlobalSearch(query: string) {
  if (!query || query.length < 2) {
    return null;
  }

  const fuse = new Fuse(data as SearchPageT[], {
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
      groupedHits,
    },
    query,
  };
}

export { fuseGlobalSearch, getArticles };
