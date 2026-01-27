"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import { debounce } from "@navikt/ds-react";
import {
  type GlobalSearchActionReturnT,
  GlobalSearchResultContext,
  useGlobalSearch,
} from "@/app/_ui/global-search/GlobalSearch.context";
import {
  fuseGlobalSearch,
  preloadSearchIndex,
} from "@/app/_ui/global-search/server/GlobalSearch.actions";
import { useParamState } from "@/app/_ui/global-search/useParamState";
import { umamiTrack } from "@/app/_ui/umami/Umami.track";

function GlobalSearchResultProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { openSearch, open } = useGlobalSearch();
  const shouldInitialOpenRef = useRef<boolean>(true);

  const [searchResult, setSearchResults] =
    useState<GlobalSearchActionReturnT | null>(null);

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

  const clearDebounce = useCallback(() => {
    debouncedSearch.clear();
  }, [debouncedSearch]);

  useEffect(() => {
    if (!open) {
      debouncedSearch.clear();
    }
  }, [open, debouncedSearch]);

  useEffect(() => {
    return () => debouncedSearch.clear();
  }, [debouncedSearch]);

  useEffect(() => {
    if (!paramValue) {
      shouldInitialOpenRef.current = false;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSearchResults(null);
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

  /**
   * Preload the searchindex cache, so that the first search is faster.
   *
   */
  useEffect(() => {
    void preloadSearchIndex();
  }, []);

  const contextValue = useMemo(
    () => ({
      queryResults: searchResult,
      updateQuery: debouncedSearch,
      resetSearch,
      clearDebounce,
    }),
    [searchResult, debouncedSearch, resetSearch, clearDebounce],
  );

  return (
    <GlobalSearchResultContext.Provider value={contextValue}>
      {children}
    </GlobalSearchResultContext.Provider>
  );
}

function maybeEnableComicSans(query: string) {
  if (query.includes("comic")) {
    document.body.style.fontFamily = "Comic Sans MS, cursive, sans-serif";
  }
}

export { GlobalSearchResultProvider };
