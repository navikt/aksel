"use client";

import { useMemo, useState, useTransition } from "react";
import { XMarkIcon } from "@navikt/aksel-icons";
import { Button, Heading, Label, Search, debounce } from "@navikt/ds-react";
import { ChangeLogIconOutline } from "@/assets/Icons";
import { SearchHitT, globalSearchConfig } from "./GlobalSearch.config";
import { GlobalSearchHitCollection } from "./GlobalSearch.hit";
import styles from "./GlobalSearch.module.css";
import { useGlobalSearch } from "./GlobalSearch.provider";
import { fuseGlobalSearch } from "./GlobalSearch.utils";

type ActionReturnT = Awaited<ReturnType<typeof fuseGlobalSearch>>;

const GlobalSearchResults = (props: { mostRecentArticles: SearchHitT[] }) => {
  const { mostRecentArticles } = props;

  const { inputRef, closeSearch } = useGlobalSearch();
  const [localQuery, setLocalQuery] = useState<string>("");
  const [searchResult, setSearchResults] = useState<ActionReturnT | null>(null);
  const [, startTransition] = useTransition();

  const handleSearch = useMemo(
    () =>
      debounce((query: string) => {
        startTransition(async () => {
          if (!query || query.length < 2) {
            return setSearchResults(null);
          }

          const newResults = await fuseGlobalSearch(query);
          setSearchResults(newResults);
        });
        window.umami && umami.track("sok");
      }),
    [],
  );

  const showMostRecent = !searchResult?.result;
  const showEmptyState =
    !searchResult?.result?.totalHits && searchResult?.query;

  const showQueryResults =
    searchResult?.result && searchResult?.result?.totalHits > 0;

  return (
    <div>
      <div className={styles.searchForm}>
        <form role="search" onSubmit={(e) => e.preventDefault()}>
          <Search
            ref={inputRef}
            label="Søk i hele Aksel"
            aria-autocomplete="both"
            variant="simple"
            onChange={(value) => {
              setLocalQuery(value);
              handleSearch(value);
            }}
            onClear={() => {
              setLocalQuery("");
              setSearchResults(null);
            }}
            onKeyDown={(e) => {
              /* Avoids sideeffects when clearing Search */
              if (e.key === "Escape") {
                if (e.currentTarget.value) {
                  e.stopPropagation();
                }
              }
            }}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            id="aksel-search-input"
            clearButton={false}
            placeholder="Søk på artikler, f.eks. Button"
          />
        </form>
        <Button
          variant="tertiary-neutral"
          onClick={closeSearch}
          icon={<XMarkIcon title="Lukk" />}
        />
      </div>

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
            <span className="break-all">&quot;{localQuery}&quot;</span>
          </Heading>
        )}
        {showQueryResults && (
          <section aria-label="Søkeresultater">
            <Label as="p" className="sr-only" aria-live="polite">
              {`${searchResult?.result?.totalHits} treff på "${searchResult?.query}"`}
            </Label>
            <div className="pb-4">
              {searchResult?.result.topResults.length > 0 && (
                <GlobalSearchHitCollection
                  heading={
                    <span className="flex items-center gap-2">
                      Beste treff
                      <ChangeLogIconOutline className="shrink-0" />
                    </span>
                  }
                  hits={searchResult?.result.topResults}
                />
              )}
              <>
                {Object.entries(searchResult?.result.groupedHits)
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
