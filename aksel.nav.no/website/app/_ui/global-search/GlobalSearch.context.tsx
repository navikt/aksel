"use client";

import { createContext, useContext } from "react";
import type { GlobalSearchResultT } from "@/app/_ui/global-search/server/GlobalSearch.config";

type GlobalSearchContextType = {
  open: boolean;
  closeSearch: () => void;
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
};

const GlobalSearchContext = createContext<GlobalSearchContextType | null>(null);

function useGlobalSearch() {
  const context = useContext(GlobalSearchContext);
  if (!context) {
    throw new Error(
      "useGlobalSearch must be used within a GlobalSearchProvider",
    );
  }

  return context;
}

type SearchResultContextType = {
  queryResults: GlobalSearchResultT | null;
  updateQuery: (query: string) => void;
  resetSearch: () => void;
  clearDebounce: () => void;
};

const GlobalSearchResultContext = createContext<SearchResultContextType | null>(
  null,
);

function useGlobalSearchResults() {
  const context = useContext(GlobalSearchResultContext);
  if (!context) {
    throw new Error(
      "useGlobalSearchResults must be used within a GlobalSearchResultsProvider",
    );
  }

  return context;
}

export {
  GlobalSearchContext,
  useGlobalSearch,
  GlobalSearchResultContext,
  useGlobalSearchResults,
};
