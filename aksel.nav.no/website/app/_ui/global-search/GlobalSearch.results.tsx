"use client";

import { Heading, Label } from "@navikt/ds-react";
import { ChangeLogIconOutline } from "@/assets/Icons";
import { SearchHitT, globalSearchConfig } from "./GlobalSearch.config";
import { GlobalSearchHitCollection } from "./GlobalSearch.hit";
import styles from "./GlobalSearch.module.css";
import { useGlobalSearch } from "./GlobalSearch.provider";
import { fuseGlobalSearch } from "./GlobalSearch.utils";

type ActionReturnT = Awaited<ReturnType<typeof fuseGlobalSearch>>;

const GlobalSearchResults = (props: { mostRecentArticles: SearchHitT[] }) => {
  const { mostRecentArticles } = props;

  const { queryResults } = useGlobalSearch();

  const showMostRecent = !queryResults?.result;
  const showEmptyState =
    !queryResults?.result?.totalHits && queryResults?.query;

  const showQueryResults =
    queryResults?.result && queryResults?.result?.totalHits > 0;

  return (
    <div>
      <div className={styles.searchResults}>
        {showMostRecent && (
          <section aria-label="Nyeste artikler" data-layout="simple">
            <GlobalSearchHitCollection
              heading={
                <span className="flex items-center gap-2">
                  Nyeste artikler
                  <ChangeLogIconOutline className="shrink-0" aria-hidden />
                </span>
              }
              hits={mostRecentArticles}
            />
          </section>
        )}
        {showEmptyState && (
          <Heading
            size="medium"
            as="p"
            className="mx-auto w-fit px-6 py-24"
            aria-live="polite"
            aria-atomic
          >
            <span className="text-text-subtle">Ingen treff på </span>
            <span className="break-all">&quot;{queryResults.query}&quot;</span>
          </Heading>
        )}
        {showQueryResults && (
          <section aria-label="Søkeresultater">
            <Label as="p" className="sr-only" aria-live="polite">
              {`${queryResults?.result?.totalHits} treff på "${queryResults?.query}"`}
            </Label>
            <div className="pb-4">
              {queryResults?.result.topResults.length > 0 && (
                <GlobalSearchHitCollection
                  heading={
                    <span className="flex items-center gap-2">
                      Beste treff
                      <ChangeLogIconOutline className="shrink-0" />
                    </span>
                  }
                  hits={queryResults?.result.topResults}
                />
              )}
              <>
                {Object.entries(queryResults?.result.groupedHits)
                  .sort(
                    (a, b) =>
                      globalSearchConfig[a[0]].index -
                      globalSearchConfig[b[0]].index,
                  )
                  .map(([key, val]) => {
                    return (
                      <GlobalSearchHitCollection
                        key={key}
                        heading={`${globalSearchConfig[key].display} (${val.length})`}
                        tag={
                          key as keyof ActionReturnT["result"]["groupedHits"]
                        }
                        hits={val}
                      />
                    );
                  })}
              </>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export { GlobalSearchResults };
