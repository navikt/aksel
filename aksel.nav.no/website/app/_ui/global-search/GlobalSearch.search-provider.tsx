"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import { debounce } from "@navikt/ds-react";
import { useGlobalSearch } from "@/app/_ui/global-search/GlobalSearch.provider";
import { useParamState } from "@/app/_ui/global-search/useParamState";
import { umamiTrack } from "@/app/_ui/umami/Umami.track";
import { fuseGlobalSearch } from "./GlobalSearch.actions";

type ActionReturnT = Awaited<ReturnType<typeof fuseGlobalSearch>>;

type SearchResultContextType = {
  queryResults: ActionReturnT | null;
  updateQuery: (query: string) => void;
  resetSearch: () => void;
};

const SearchResultContext = createContext<SearchResultContextType | null>(null);

function GlobalSearchResultProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { openSearch } = useGlobalSearch();
  const shouldInitialOpenRef = useRef<boolean>(true);

  const [searchResult, setSearchResults] = useState<ActionReturnT | null>(null);

  const [, startTransition] = useTransition();
  const { setParam, clearParam, paramValue } = useParamState("query");

  const debouncedSearch = useMemo(
    () =>
      debounce((query: string) => {
        maybeEnableComicSans(query);

        umamiTrack("sok", {});
        setParam(query);
      }, 200),
    [setParam],
  );

  const resetSearch = useCallback(() => {
    debouncedSearch.clear();
    clearParam();
  }, [clearParam, debouncedSearch]);

  useEffect(() => {
    if (!paramValue) {
      setSearchResults(null);
      shouldInitialOpenRef.current = false;

      return;
    }

    startTransition(async () => {
      const newResults = await fuseGlobalSearch(paramValue);

      setSearchResults(newResults);

      /*
       * We use a ref to ensure the dialog only auto-opens after results are in to avoid CLS.
       */
      if (shouldInitialOpenRef.current) {
        openSearch();
        shouldInitialOpenRef.current = false;
      }
    });
  }, [paramValue, openSearch]);

  const contextValue = useMemo(
    () => ({
      queryResults: searchResult,
      updateQuery: debouncedSearch,
      resetSearch,
    }),
    [searchResult, debouncedSearch, resetSearch],
  );

  return (
    <SearchResultContext.Provider value={contextValue}>
      {children}
    </SearchResultContext.Provider>
  );
}

function maybeEnableComicSans(query: string) {
  if (query.includes("comic")) {
    document.body.style.fontFamily = "Comic Sans MS, cursive, sans-serif";
  }
}

function useGlobalSearchResults() {
  const context = useContext(SearchResultContext);
  if (!context) {
    throw new Error(
      "useGlobalSearchResults must be used within a GlobalSearchResultsProvider",
    );
  }

  return context;
}

export { GlobalSearchResultProvider, useGlobalSearchResults };
