import { searchOptions } from "@/types";
import { ChangeLogIconOutline } from "components/assets";
import { useContext } from "react";
import { Collection, CollectionMapper } from "./HitCollection";
import { SearchContext, SearchResultContext } from "./providers";
import { Heading, Label } from "@navikt/ds-react";

export const Results = () => {
  const { tags, query } = useContext(SearchContext);
  const { results, isValidating, error, mostResent } =
    useContext(SearchResultContext);

  if (isValidating || error) {
    return null;
  }

  return (
    <div className="flex h-full flex-col overflow-y-auto">
      {!results && mostResent && (
        <div id="aksel-search-results" aria-label="Nyeste artikler">
          <Collection
            startIndex={0}
            heading={
              <span className="flex items-center gap-2">
                Nyeste artikler
                <ChangeLogIconOutline className="shrink-0" aria-hidden />
              </span>
            }
            simple
            hits={mostResent}
          />
        </div>
      )}
      {!results?.totalHits && query && (
        <Heading
          size="medium"
          as="p"
          className="mx-auto w-fit px-6 py-24"
          aria-live="polite"
          aria-atomic
        >
          <span className="text-text-subtle">{`Ingen treff på "`}</span>
          <span className="break-all">{query}</span>
          <span className="text-text-subtle">"</span>
          {tags.length > 0 && (
            <span className="text-text-subtle">{` i ${tags
              .map((x) => searchOptions[x].display.toLowerCase())
              .join(", ")}`}</span>
          )}
        </Heading>
      )}
      {results?.totalHits > 0 && (
        <div id="aksel-search-results" aria-label="Søkeresultater">
          <Label as="p" className="sr-only" aria-live="polite">
            {`${results?.totalHits} treff på "${results.query}"${
              tags.length > 0
                ? ` i ${tags
                    .map((x) => searchOptions[x].display.toLowerCase())
                    .join(", ")}`
                : ""
            }`}
          </Label>
          <div className="pb-4">
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
