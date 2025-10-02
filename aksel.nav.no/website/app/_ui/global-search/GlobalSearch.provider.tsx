"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
  const [open, setOpen] = useState(false);

  const isComicSans = useRef<boolean>(false);

  const [searchResult, setSearchResults] = useState<ActionReturnT | null>(null);
  const [, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

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

  const openSearch = () => {
    setOpen(true);
    searchResult?.query
      ? /* When re-opening search for user so they can start new search instantly */
        inputRef.current?.select()
      : inputRef.current?.focus();
  };

  const closeSearch = () => setOpen(false);

  // Debounced URL + tracking updater; actual results come from effect reacting to URL.
  const debouncedSearch = useMemo(
    () =>
      debounce((query: string) => {
        if (!isComicSans.current && query.includes("comic")) {
          isComicSans.current = true;
          document.body.style.fontFamily = "Comic Sans MS, cursive, sans-serif";
        }

        umamiTrack("sok", {});

        const params = new URLSearchParams(searchParams ?? undefined);
        if (query) {
          params.set("query", query);
        } else {
          params.delete("query");
        }

        replace(`${pathname}?${params.toString()}`);
      }),
    [pathname, replace, searchParams],
  );

  // When the query param changes, fetch new results.
  useEffect(() => {
    const query = searchParams?.get("query") ?? "";
    if (!query) {
      setSearchResults(null);
      return;
    }
    startTransition(async () => {
      const newResults = await fuseGlobalSearch(query);
      setSearchResults(newResults);
    });
  }, [searchParams]);

  const resetSearch = useCallback(() => {
    debouncedSearch.clear();
    const params = new URLSearchParams(searchParams ?? undefined);
    params.delete("query");
    replace(`${pathname}?${params.toString()}`);
  }, [debouncedSearch, pathname, replace, searchParams]);

  return (
    <SearchContext.Provider
      value={{
        open,
        closeSearch,
        openSearch,
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
