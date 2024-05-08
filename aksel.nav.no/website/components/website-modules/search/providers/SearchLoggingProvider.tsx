import { createContext, useCallback } from "react";
import { AmplitudeEvents, amplitude } from "@/logging";
import { useSearch } from "../hooks";

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

  const logSuccess = useCallback(
    (index: number, url: string, tag?: string) => {
      if (!context?.results) {
        return;
      }
      const data = {
        type: "suksess",
        searchedFromUrl: window.location.pathname,
        tag,
        index,
        url,
        accuracy: (100 - index / context?.results?.totalHits).toFixed(0),
        topResult: index <= context?.results?.topResults?.length,
      };
      amplitude.track(AmplitudeEvents.søk, data);
    },
    [context?.results],
  );

  return (
    <SearchLoggingContext.Provider value={{ logSuccess }}>
      {children}
    </SearchLoggingContext.Provider>
  );
};
