import { allArticleDocuments } from "@/sanity/config";
import { SearchResultsT } from "@/types";
import { useCallback, useState } from "react";
import useSWRImmutable from "swr/immutable";
import { formatResults } from "./format-result";
import { fuseSearch } from "./fuse-search";
import { createSearchResult } from "./group-results";

export const useSearch = () => {
  const [fuseResults, setFuseResults] = useState<SearchResultsT>(null);

  const { data, error, isValidating } = useSWRImmutable(
    `/searchindex.json`,
    (query) => fetch(query).then((res) => res.json())
  );

  const updateResults = useCallback(
    (value: string, tags: string[]) => {
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
    },
    [data]
  );
  return {
    results: fuseResults,
    update: updateResults,
    error,
    isValidating,
    reset: () => setFuseResults(null),
  };
};
