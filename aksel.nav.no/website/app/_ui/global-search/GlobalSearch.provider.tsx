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
import { useParamState } from "@/app/_ui/global-search/useParamState";
import { umamiTrack } from "@/app/_ui/umami/Umami.track";
import { fuseGlobalSearch } from "./GlobalSearch.actions";

type ActionReturnT = Awaited<ReturnType<typeof fuseGlobalSearch>>;

type SearchContextType = {
  open: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
  queryResults: ActionReturnT | null;
  updateQuery: (query: string) => void;
  resetSearch: () => void;
};

const SearchContext = createContext<SearchContextType | null>(null);

function GlobalSearchProvider({ children }: { children: React.ReactNode }) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const shouldInitialOpenRef = useRef<boolean>(true);

  const [open, setOpen] = useState<boolean>(false);
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
    const listener = (event: KeyboardEvent) => {
      if (
        (event.key === "k" || event.key === "b") &&
        (event.metaKey || event.ctrlKey) &&
        !event.shiftKey
      ) {
        event.preventDefault();
        if (open) {
          inputRef.current?.select();
        } else {
          setOpen(true);
        }
      }
    };

    document.addEventListener("keydown", listener);

    return () => document.removeEventListener("keydown", listener);
  }, [open]);

  // When the query param changes, fetch new results.
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
        setOpen(true);
        shouldInitialOpenRef.current = false;
      }
    });
  }, [paramValue]);

  const contextValue = useMemo(
    () => ({
      open,
      closeSearch: () => setOpen(false),
      openSearch: () => setOpen(true),
      inputRef,
      queryResults: searchResult,
      updateQuery: debouncedSearch,
      resetSearch,
    }),
    [open, searchResult, debouncedSearch, resetSearch],
  );

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
}

function maybeEnableComicSans(query: string) {
  if (query.includes("comic")) {
    document.body.style.fontFamily = "Comic Sans MS, cursive, sans-serif";
  }
}

function useGlobalSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error(
      "useGlobalSearch must be used within a GlobalSearchProvider",
    );
  }

  return context;
}

export { GlobalSearchProvider, useGlobalSearch };
