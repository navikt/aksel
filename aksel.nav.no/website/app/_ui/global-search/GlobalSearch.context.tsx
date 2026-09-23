"use client";

import { createContext, useContext } from "react";
import type {
  GlobalSearchResultT,
  SearchHitT,
} from "@/app/_ui/global-search/server/GlobalSearch.config";

const GLOBAL_SEARCH_LISTBOX_ID = "aksel-search-listbox";

type GlobalSearchFlatHitT = { hit: SearchHitT; href: string };

type GlobalSearchActiveSourceT = "keyboard" | "pointer";

type GlobalSearchContextType = {
  open: boolean;
  closeSearch: () => void;
  query: string;
  queryResults: GlobalSearchResultT | null;
  updateQuery: (query: string) => void;
  resetSearch: () => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  /* Hits in render order. Index is used for virtual focus. */
  flatHits: GlobalSearchFlatHitT[];
  /* Option with virtual focus, -1 when there are no hits. */
  activeIndex: number;
  /* Only keyboard-activated options are scrolled into view. */
  activeSource: GlobalSearchActiveSourceT;
  setActiveIndex: (index: number, source: GlobalSearchActiveSourceT) => void;
};

function getHitHref(hit: SearchHitT) {
  return hit.anchor ? `/${hit.slug}#${hit.anchor}` : `/${hit.slug}`;
}

function getOptionId(index: number) {
  return `aksel-search-option-${index}`;
}

/* Must match the order hits are rendered in `GlobalSearchResultsView`. */
function flattenHits(
  results: GlobalSearchResultT | null,
): GlobalSearchFlatHitT[] {
  if (!results?.result) {
    return [];
  }

  const hits = [
    ...results.result.topResults,
    ...results.result.groupedHits.flatMap((group) => group.hits),
  ];

  return hits.map((hit) => ({ hit, href: getHitHref(hit) }));
}

const GlobalSearchContext = createContext<GlobalSearchContextType | null>(null);

function useGlobalSearch() {
  const context = useContext(GlobalSearchContext);
  if (!context) {
    throw new Error("useGlobalSearch must be used within GlobalSearch");
  }

  return context;
}

export {
  GLOBAL_SEARCH_LISTBOX_ID,
  GlobalSearchContext,
  flattenHits,
  getHitHref,
  getOptionId,
  useGlobalSearch,
};
export type { GlobalSearchActiveSourceT, GlobalSearchFlatHitT };
