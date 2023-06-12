import { searchOptions } from "@/types";
import { ChangeLogIconOutline } from "components/assets";
import { useContext } from "react";
import { Collection, CollectionMapper } from "./HitCollection";
import { SearchContext, SearchResultContext } from "./providers";

export const Results = () => {
  const { tags, query, deboucedQuery } = useContext(SearchContext);
  const { results, isValidating, error } = useContext(SearchResultContext);

  if (isValidating || error) {
    return null;
  }

  return (
    <div
      className="mt-8 w-full max-w-3xl"
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
              <Collection
                startIndex={1}
                heading={
                  <span className="flex items-center gap-2">
                    Beste treff
                    <ChangeLogIconOutline className="shrink-0" />
                  </span>
                }
                hits={results?.topResults}
              />
            )}
            <CollectionMapper
              startIndex={
                results.topResults.length > 0
                  ? results.topResults.length + 1
                  : 1
              }
              groups={results.groupedHits}
            />
          </div>
        </div>
      )}
    </div>
  );
};
