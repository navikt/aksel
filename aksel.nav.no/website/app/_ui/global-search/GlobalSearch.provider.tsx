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
  GlobalSearchResultContext,
  useGlobalSearch,
} from "@/app/_ui/global-search/GlobalSearch.context";
import type { GlobalSearchResultT } from "@/app/_ui/global-search/server/GlobalSearch.config";
import { umamiTrack } from "@/app/_ui/umami/Umami.track";
import { writeQueryParam } from "./GlobalSearch.url";

function GlobalSearchResultProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { open, query, setQuery } = useGlobalSearch();

  const [searchResult, setSearchResults] = useState<GlobalSearchResultT | null>(
    null,
  );

  const [, startTransition] = useTransition();

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        maybeEnableComicSans(value);

        umamiTrack(Events.SOK, { tekst: "global søk" });
        const normalized = value.trim();
        setQuery(normalized);
        writeQueryParam(normalized);
      }, 200),
    [setQuery],
  );

  const resetSearch = useCallback(() => {
    debouncedSearch.clear();
    setQuery("");
    writeQueryParam("");
  }, [setQuery, debouncedSearch]);

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
    if (!query) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSearchResults(null);
      return;
    }

    const controller = new AbortController();

    startTransition(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
          signal: controller.signal,
        });
        if (!res.ok) {
          return;
        }

        const newResults: GlobalSearchResultT | null = await res.json();
        setSearchResults(newResults);
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("Global search failed", error);
        }
      }
    });

    return () => controller.abort();
  }, [query]);

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
