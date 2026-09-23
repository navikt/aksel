"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { Events } from "@navikt/analytics-types";
import { debounce } from "@navikt/ds-react";
import {
  type GlobalSearchActionReturnT,
  GlobalSearchResultContext,
  useGlobalSearch,
} from "@/app/_ui/global-search/GlobalSearch.context";
import { useParamState } from "@/app/_ui/global-search/useParamState";
import { umamiTrack } from "@/app/_ui/umami/Umami.track";

function GlobalSearchResultProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { open } = useGlobalSearch();

  const [searchResult, setSearchResults] =
    useState<GlobalSearchActionReturnT | null>(null);

  const [, startTransition] = useTransition();
  const { setParam, clearParam, paramValue } = useParamState("query");

  const debouncedSearch = useMemo(
    () =>
      debounce((query: string) => {
        maybeEnableComicSans(query);

        umamiTrack(Events.SOK, { tekst: "global søk" });
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
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSearchResults(null);
      return;
    }

    const controller = new AbortController();

    startTransition(async () => {
      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(paramValue)}`,
          { signal: controller.signal },
        );
        if (!res.ok) {
          return;
        }

        const newResults: GlobalSearchActionReturnT = await res.json();
        setSearchResults(newResults);
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("Global search failed", error);
        }
      }
    });

    return () => controller.abort();
  }, [paramValue]);

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
