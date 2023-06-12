import { allArticleDocuments } from "@/sanity/config";
import { SearchResultsT } from "@/types";
import { useMemo, useState } from "react";
import useSWRImmutable from "swr/immutable";
import { createSearchResult, formatResults, fuseSearch } from "../utils";
import { debounce } from "@navikt/ds-react";
import { logSearch } from "@/utils";

export const useSearch = () => {
  const [fuseResults, setFuseResults] = useState<SearchResultsT>(null);

  const { data, error, isValidating } = useSWRImmutable(
    `/searchindex.json`,
    (query) => fetch(query).then((res) => res.json())
  );

  const updateResults = useMemo(
    () =>
      debounce((value: string, tags: string[]) => {
        if (!value) {
          return;
        }

        const rawResults = fuseSearch(data, value);

        const tagVersion = tags;
        const formatedResults = formatResults(
          rawResults.filter((x) =>
            (tagVersion.length > 0 ? tagVersion : allArticleDocuments).includes(
              x.item._type
            )
          )
        );

        setFuseResults(createSearchResult(formatedResults, rawResults));
        logSearch({
          type: "standard",
          searchedFromUrl: window.location.pathname,
          query: value,
          filter: tags,
        });
      }),
    [data]
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
