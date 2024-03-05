import { createContext, useCallback, useContext } from "react";
import { AmplitudeEvents, amplitude } from "@/logging";
import { useSearch } from "../hooks";
import { SearchContext } from "./SearchProvider";

type SearchLoggingContextType = {
  logSuccess: (index: number, url: string, tag?: string) => void;
};

export const SearchLoggingContext = createContext<SearchLoggingContextType>({
  logSuccess: () => null,
});

export const SearchLoggingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const context = useSearch();
  const { query, tags } = useContext(SearchContext);

  const logSuccess = useCallback(
    (index: number, url: string, tag?: string) => {
      if (!context?.results) {
        return;
      }
      const data = {
        type: "suksess",
        searchedFromUrl: window.location.pathname,
        query,
        filter: tags,
        tag,
        index,
        url,
        accuracy: (100 - index / context?.results?.totalHits).toFixed(0),
        topResult: index <= context?.results?.topResults?.length,
      };
      amplitude.track(AmplitudeEvents.søk, data);
    },
    [query, tags, context?.results],
  );

  return (
    <SearchLoggingContext.Provider value={{ logSuccess }}>
      {children}
    </SearchLoggingContext.Provider>
  );
};
