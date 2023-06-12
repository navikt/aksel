import { SearchHitT, SearchResultsT } from "@/types";
import { createContext, useCallback, useContext, useEffect } from "react";
import { useSearch } from "../hooks";
import { SearchContext } from "./SearchProvider";
import { useRouter } from "next/router";
import { logSearch } from "@/utils";

type SearchResultContextType = {
  results: SearchResultsT;
  update: (value: string, tags: string[]) => void;
  error: any;
  isValidating: boolean;
  reset: () => void;
  close: () => void;
  logSuccess: (index: number, url: string) => void;
  mostResent: Omit<SearchHitT, "score" | "anchor">[];
};

export const SearchResultContext = createContext<SearchResultContextType>({
  results: null,
  update: () => null,
  error: false,
  isValidating: false,
  reset: () => null,
  close: () => null,
  logSuccess: () => null,
  mostResent: [],
});

export const SearchResultProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const context = useSearch();
  const { setOpen, query, setQuery, tags, setTags, deboucedQuery } =
    useContext(SearchContext);

  const handleClose = useCallback(() => {
    setOpen(false);
    context.reset();
    setQuery("");
    setTags([]);
  }, [context, setOpen, setQuery, setTags]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const handler = () => {
      timeout && clearTimeout(timeout);
      setTimeout(() => handleClose(), 100);
    };
    router.events.on("beforeHistoryChange", handler);
    router.events.on("hashChangeComplete", handler);

    return () => {
      router.events.off("beforeHistoryChange", handler);
      router.events.off("hashChangeComplete", handler);
    };
  }, [handleClose, router.events]);

  useEffect(() => {
    logSearch({
      type: "standard",
      searchedFromUrl: router.asPath,
      query: deboucedQuery,
      filter: tags,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deboucedQuery]);

  const logSuccess = useCallback(
    (index: number, url: string) => {
      const data = {
        type: "suksess",
        searchedFromUrl: router.asPath,
        query,
        filter: tags,
        index,
        url,
        accuracy: (100 - index / context?.results?.totalHits).toFixed(0),
        topResult: index <= context?.results?.topResults?.length,
      };
      logSearch(data);
    },
    [
      router.asPath,
      query,
      tags,
      context?.results?.totalHits,
      context?.results?.topResults?.length,
    ]
  );

  return (
    <SearchResultContext.Provider
      value={{ ...context, close: handleClose, logSuccess }}
    >
      {children}
    </SearchResultContext.Provider>
  );
};
