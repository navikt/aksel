import { createContext, useContext, useMemo } from "react";
import { SearchHitT, SearchResultsT } from "@/types";
import { useSearch } from "../hooks";
import { formatRawResults } from "../utils";

type SearchResultContextType = {
  results: SearchResultsT | null;
  update: (value: string) => void;
  error: any;
  isValidating: boolean;
  reset: () => void;
  mostResent: Omit<SearchHitT, "score" | "anchor" | "matches">[] | null;
};

export const SearchResultContext =
  createContext<SearchResultContextType | null>(null);

export const SearchResultProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const context = useSearch();

  const mostResent: Omit<SearchHitT, "score" | "anchor">[] | null =
    useMemo(() => {
      if (!context.rawData) {
        return null;
      }

      return formatRawResults(context.rawData.slice(0, 20));
    }, [context.rawData]);

  return (
    <SearchResultContext.Provider value={{ ...context, mostResent }}>
      {children}
    </SearchResultContext.Provider>
  );
};

export const useSearchResult = () => {
  const ctx = useContext(SearchResultContext);

  if (!ctx) {
    throw new Error(
      "useSearchResult must be used within a SearchResultProvider",
    );
  }
  return ctx;
};
