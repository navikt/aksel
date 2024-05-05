import { useMemo, useState } from "react";
import useSWRImmutable from "swr/immutable";
import { debounce } from "@navikt/ds-react";
import { AmplitudeEvents, amplitude } from "@/logging";
import { allArticleDocuments } from "@/sanity/config";
import { SearchResultsT } from "@/types";
import { createSearchResult, formatResults, fuseSearch } from "../utils";

export const useSearch = () => {
  const [fuseResults, setFuseResults] = useState<SearchResultsT | null>(null);

  const { data, error, isValidating } = useSWRImmutable(
    `/searchindex.json`,
    (query) => fetch(query).then((res) => res.json()),
  );

  const updateResults = useMemo(
    () =>
      debounce((value: string) => {
        if (!value) {
          return;
        }

        const rawResults = fuseSearch(data, value);

        const formatedResults = formatResults(
          rawResults.filter((x) => allArticleDocuments.includes(x.item._type)),
        );

        setFuseResults({
          ...createSearchResult(formatedResults, rawResults),
          query: value,
        });
        amplitude.track(AmplitudeEvents.søk, {
          type: "standard",
          searchedFromUrl: window.location.pathname,
          query: value,
        });
      }),
    [data],
  );

  return {
    results: fuseResults,
    update: updateResults,
    error,
    isValidating,
    reset: () => setFuseResults(null),
    rawData: data,
  };
};
