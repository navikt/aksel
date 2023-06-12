import { allArticleDocuments } from "@/sanity/config";
import { SearchHitT, SearchResultsT } from "@/types";
import { useCallback, useMemo, useState } from "react";
import useSWRImmutable from "swr/immutable";
import {
  formatResults,
  fuseSearch,
  createSearchResult,
  formatRawResults,
} from "../utils";

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

  const mostResent: Omit<SearchHitT, "score" | "anchor">[] = useMemo(() => {
    if (!data) {
      return null;
    }

    return formatRawResults(data.slice(0, 5));
  }, [data]);

  return {
    results: fuseResults,
    update: updateResults,
    error,
    isValidating,
    reset: () => setFuseResults(null),
    mostResent,
  };
};
