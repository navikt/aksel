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
  updateSearch: (query: string) => void;
  resetSearch: () => void;
};

const SearchContext = createContext<SearchContextType | null>(null);

function GlobalSearchProvider({ children }: { children: React.ReactNode }) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { setParam, clearParam, paramValue } = useParamState("query");

  const [open, setOpen] = useState<boolean>(false);
  const shouldInitialOpenRef = useRef<boolean>(true);

  const [searchResult, setSearchResults] = useState<ActionReturnT | null>(null);
  const [, startTransition] = useTransition();

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

  const debouncedSearch = useMemo(
    () =>
      debounce((query: string) => {
        if (query.includes("comic")) {
          document.body.style.fontFamily = "Comic Sans MS, cursive, sans-serif";
        }

        umamiTrack("sok", {});
        setParam(query);
      }),
    [setParam],
  );

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

      if (shouldInitialOpenRef.current) {
        setOpen(true);
        shouldInitialOpenRef.current = false;
      }
    });
  }, [paramValue]);

  const resetSearch = useCallback(() => {
    debouncedSearch.clear();
    clearParam();
  }, [clearParam, debouncedSearch]);

  return (
    <SearchContext.Provider
      value={{
        open,
        closeSearch: () => setOpen(false),
        openSearch: () => setOpen(true),
        inputRef,
        queryResults: searchResult,
        updateSearch: debouncedSearch,
        resetSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
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
