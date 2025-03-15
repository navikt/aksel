"use server";

import { client } from "@/app/_sanity/client";
import {
  GLOBAL_SEARCH_QUERY_ALL,
  GLOBAL_SEARCH_QUERY_RECENT,
} from "@/app/_sanity/queries";
import data from "../../public/searchindex.json";
import { SearchHitT, SearchPageT } from "./GlobalSearch.types";

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

async function updateSearch(query: string) {
  console.info("Searching from server", query);

  return [];
}

export { formatRawResults, getArticles, getRecentArticles, updateSearch };
