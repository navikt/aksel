import { searchOptions } from "@/types";
import { ChangeLogIconOutline } from "components/assets";
import { useContext } from "react";
import { Collection, CollectionMapper } from "./HitCollection";
import { SearchContext, SearchResultContext } from "./providers";
import { Label } from "@navikt/ds-react";

export const Results = () => {
  const { tags, query, deboucedQuery } = useContext(SearchContext);
  const { results, isValidating, error, mostResent } =
    useContext(SearchResultContext);

  if (isValidating || error) {
    return null;
  }

  return (
    <div
      className="w-full overflow-y-scroll"
      role={query && deboucedQuery === query ? "status" : undefined}
    >
      {!results && mostResent && (
        <div
          className="pb-4"
          id="aksel-search-results"
          aria-label="Nyeste artikler"
        >
          <Collection
            startIndex={0}
            heading={
              <span className="flex items-center gap-2">
                Nyeste artikler
                <ChangeLogIconOutline className="shrink-0" />
              </span>
            }
            simple
            hits={mostResent}
          />
        </div>
      )}
      {results && (
        <div id="aksel-search-results" aria-label="Søkeresultater">
          <Label as="p" className="px-4 pt-3 md:px-6">
            {`${results?.totalHits} treff på "${query}"${
              tags.length > 0
                ? ` i ${tags
                    .map((x) => searchOptions[x].display.toLowerCase())
                    .join(", ")}`
                : ""
            }`}
          </Label>
          <div className="mt-3 pb-4">
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
