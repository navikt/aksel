"use server";

import type { FuseResult, FuseResultMatch } from "fuse.js";
import Fuse from "fuse.js";
import { client } from "@/app/_sanity/client";
import {
  GLOBAL_SEARCH_QUERY_ALL,
  GLOBAL_SEARCH_QUERY_RECENT,
} from "@/app/_sanity/queries";
import data from "../../public/searchindex.json";
import {
  GroupedSearchHitsT,
  SearchHitT,
  SearchPageT,
} from "./GlobalSearch.types";

function omit<T extends object, K extends keyof T>(
  obj: T,
  props: K[],
): Omit<T, K> {
  const filteredEntries = Object.entries(obj).filter(
    ([key]) => !props.includes(key as K),
  );

  return Object.fromEntries(filteredEntries) as Omit<T, K>;
}

function formatRawResults(res: SearchPageT[]): SearchHitT[] {
  return res.map((x) => ({
    item: omit(x, ["intro", "ingress"]),
    description: x?.intro || x.ingress || "",
  }));
}

function formatFuseResults(res: FuseResult<SearchPageT>[]): SearchHitT[] {
  return res.map((x) => ({
    ...x,
    item: omit(x.item, ["intro", "ingress"]),
    anchor: x.matches?.[0] ? resolveAnchor(x.matches[0], x.item) : undefined,
    description: x?.item.intro || x.item.ingress || "",
  }));
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

async function getRecentArticles(): Promise<SearchHitT[]> {
  return formatRawResults((data as SearchPageT[]).slice(0, 20));
}

function fuseGlobalSearch(
  articles: SearchPageT[],
  query: string,
): ReturnType<typeof createSearchResult> {
  const fuse = new Fuse(articles, {
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

  const result = fuse
    .search(query)
    .filter((x) => x.score !== undefined && x.score < 0.3);

  return createSearchResult(formatFuseResults(result));
}

function createSearchResult(result: SearchHitT[]) {
  const groupedHits: GroupedSearchHitsT = result?.reduce((prev, cur) => {
    const type = cur.item._type;
    if (!prev[type]) {
      prev[type] = [];
    }
    prev[type].push(cur);
    return prev;
  }, {} as GroupedSearchHitsT);

  const topResults =
    result?.length > 4
      ? result.filter((x) => x.score !== undefined && x.score < 0.1).slice(0, 4)
      : [];

  const countHitsByType = (type: string) =>
    result.filter((x) => x.item._type === type).length;

  const response = {
    groupedHits,
    topResults,
    totalHits: result?.length ?? 0,
    hits: {
      komponent_artikkel: countHitsByType("komponent_artikkel"),
      aksel_artikkel: countHitsByType("aksel_artikkel"),
      ds_artikkel: countHitsByType("ds_artikkel"),
      aksel_blogg: countHitsByType("aksel_blogg"),
      templates_artikkel: countHitsByType("templates_artikkel"),
      aksel_prinsipp: countHitsByType("aksel_prinsipp"),
      aksel_standalone: countHitsByType("aksel_standalone"),
    },
  };

  return response;
}

async function updateSearch(query: string) {
  return { result: fuseGlobalSearch(data as SearchPageT[], query), query };
}

export {
  formatRawResults,
  getArticles,
  getRecentArticles,
  updateSearch,
  fuseGlobalSearch,
};
