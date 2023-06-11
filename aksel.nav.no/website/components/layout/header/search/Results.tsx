import { searchOptions } from "@/types";
import { logSearch } from "@/utils";
import { ChangeLogIconOutline } from "components/assets";
import { useRouter } from "next/router";
import { useCallback, useContext } from "react";
import { Group, GroupComponent } from "./Group";
import { SearchContext, SearchResultContext } from "./providers";

export const Results = () => {
  const { tags, query, deboucedQuery } = useContext(SearchContext);
  const { results, isValidating, error } = useContext(SearchResultContext);
  const router = useRouter();

  const logSuccessSearchAttempt = useCallback(
    (index: number, url: string) => {
      const data = {
        type: "suksess",
        searchedFromUrl: router.asPath,
        query,
        filter: tags,
        index,
        url,
        accuracy: (100 - index / results?.totalHits).toFixed(0),
        topResult: index <= results?.topResults?.length,
      };
      logSearch(data);
    },
    [router.asPath, query, tags, results]
  );

  if (isValidating || error) {
    return null;
  }

  return (
    <div
      className="mt-8 w-full max-w-3xl [grid-area:results]"
      role={query && deboucedQuery === query ? "status" : undefined}
    >
      {results && (
        <div id="aksel-search-results" aria-label="Søkeresultater">
          <p className="text-xl font-semibold">
            {`${results?.totalHits} treff på "${query}"${
              tags.length > 0
                ? ` i ${tags
                    .map((x) => searchOptions[x].display.toLowerCase())
                    .join(", ")}`
                : ""
            }`}
          </p>
          <div className="mt-4 pb-16 md:block">
            {results?.topResults.length > 0 && (
              <GroupComponent
                startIndex={1}
                heading={
                  <span className="flex items-center gap-2">
                    Beste treff
                    <ChangeLogIconOutline className="shrink-0" />
                  </span>
                }
                logSuccess={logSuccessSearchAttempt}
                hits={results?.topResults}
                query={query}
              />
            )}
            <Group
              startIndex={
                results.topResults.length > 0
                  ? results.topResults.length + 1
                  : 1
              }
              logSuccess={logSuccessSearchAttempt}
              groups={results.groupedHits}
              query={query}
            />
          </div>
        </div>
      )}
    </div>
  );
};
