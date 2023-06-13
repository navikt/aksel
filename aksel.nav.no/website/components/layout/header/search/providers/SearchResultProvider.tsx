import { allArticleDocuments } from "@/sanity/config";
import { SearchHitT, SearchResultsT } from "@/types";
import { createContext, useContext, useMemo } from "react";
import { useSearch } from "../hooks";
import { formatRawResults } from "../utils";
import { SearchContext } from "./SearchProvider";

type SearchResultContextType = {
  results: SearchResultsT;
  update: (value: string, tags: string[]) => void;
  error: any;
  isValidating: boolean;
  reset: () => void;
  mostResent: Omit<SearchHitT, "score" | "anchor" | "matches">[];
};

export const SearchResultContext = createContext<SearchResultContextType>({
  results: null,
  update: () => null,
  error: false,
  isValidating: false,
  reset: () => null,
  mostResent: [],
});

export const SearchResultProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const context = useSearch();
  const { tags } = useContext(SearchContext);

  const mostResent: Omit<SearchHitT, "score" | "anchor">[] = useMemo(() => {
    if (!context.rawData) {
      return null;
    }

    return formatRawResults(
      context.rawData
        .filter((x) =>
          (tags.length > 0 ? tags : allArticleDocuments).includes(x._type)
        )
        .slice(0, 20)
    );
  }, [context.rawData, tags]);

  return (
    <SearchResultContext.Provider value={{ ...context, mostResent }}>
      {children}
    </SearchResultContext.Provider>
  );
};
