import { useContext } from "react";
import { Heading, Label } from "@navikt/ds-react";
import { ChangeLogIconOutline } from "@/assets/Icons";
import { SearchContext, useSearchResult } from "../providers";
import { Collection, CollectionMapper } from "./HitCollection";

export const Results = () => {
  const { query } = useContext(SearchContext);
  const { results, isValidating, error, mostResent } = useSearchResult();

  if (isValidating || error) {
    return null;
  }

  return (
    <div className="flex h-full flex-col overflow-y-auto">
      {!results && mostResent && (
        <section aria-label="Nyeste artikler">
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
        </section>
      )}
      {!results?.totalHits && query && (
        <Heading
          size="medium"
          as="p"
          className="mx-auto w-fit px-6 py-24"
          aria-live="polite"
          aria-atomic
        >
          <span className="text-text-subtle">Ingen treff på </span>
          <span className="break-all">&quot;{query}&quot;</span>
        </Heading>
      )}
      {results && results?.totalHits > 0 && (
        <section aria-label="Søkeresultater">
          <Label as="p" className="sr-only" aria-live="polite">
            {`${results?.totalHits} treff på "${results.query}"`}
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
        </section>
      )}
    </div>
  );
};
