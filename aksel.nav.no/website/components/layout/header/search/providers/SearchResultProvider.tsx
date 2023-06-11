import { SearchResultsT } from "@/types";
import { createContext, useCallback, useContext, useEffect } from "react";
import { useSearch } from "../hooks";
import { SearchContext } from "./SearchProvider";
import { useRouter } from "next/router";

type SearchResultContextType = {
  results: SearchResultsT;
  update: (value: string, tags: string[]) => void;
  error: any;
  isValidating: boolean;
  reset: () => void;
  close: () => void;
};

export const SearchResultContext = createContext<SearchResultContextType>({
  results: null,
  update: () => null,
  error: false,
  isValidating: false,
  reset: () => null,
  close: () => null,
});

export const SearchResultProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const context = useSearch();
  const { setOpen, setQuery, setTags } = useContext(SearchContext);

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

  return (
    <SearchResultContext.Provider value={{ ...context, close: handleClose }}>
      {children}
    </SearchResultContext.Provider>
  );
};
