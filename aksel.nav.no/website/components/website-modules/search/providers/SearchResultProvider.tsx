import { createContext, useContext, useMemo } from "react";
import { allArticleDocuments } from "@/sanity/config";
import { SearchHitT, SearchResultsT } from "@/types";
import { useSearch } from "../hooks";
import { formatRawResults } from "../utils";
import { SearchContext } from "./SearchProvider";

type SearchResultContextType = {
  results: SearchResultsT | null;
  update: (value: string, tags: string[]) => void;
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
  const { tags } = useContext(SearchContext);

  const mostResent: Omit<SearchHitT, "score" | "anchor">[] | null =
    useMemo(() => {
      if (!context.rawData) {
        return null;
      }

      return formatRawResults(
        context.rawData
          .filter((x) =>
            (tags.length > 0 ? tags : allArticleDocuments).includes(x._type),
          )
          .slice(0, 20),
      );
    }, [context.rawData, tags]);

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
