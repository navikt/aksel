"use client";

import { useMemo, useState, useTransition } from "react";
import { Heading, Label, Search, debounce } from "@navikt/ds-react";
import { ChangeLogIconOutline } from "@/assets/Icons";
import {
  GlobalSearchHitCollection,
  GlobalSearchHitCollectionMapper,
} from "./GlobalSearch.hit";
import { SearchHitT } from "./GlobalSearch.types";
import { updateSearch } from "./GlobalSearch.utils";

type ActionReturnT = Awaited<ReturnType<typeof updateSearch>>;

const GlobalSearchResults = (props: { mostRecentArticles: SearchHitT[] }) => {
  const { mostRecentArticles } = props;

  const [localQuery, setLocalQuery] = useState<string>("");
  const [searchResult, setSearchResults] = useState<ActionReturnT | null>(null);
  const [isPending, startTransition] = useTransition();

  console.info(isPending);

  const handleSearch = useMemo(
    () =>
      debounce((query: string) => {
        startTransition(async () => {
          if (!query || query.length < 2) {
            return setSearchResults(null);
          }

          const newResults = await updateSearch(query);
          setSearchResults(newResults);
        });
        window.umami && umami.track("sok");
      }),
    [],
  );

  return (
    <div>
      <form
        role="search"
        onSubmit={(e) => e.preventDefault()}
        className="w-full"
      >
        <Search
          label={
            <span className="flex items-center gap-2">
              <span>Søk i hele Aksel</span>
            </span>
          }
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
          /* ref={inputRef} */
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          id="aksel-search-input"
          clearButton={false}
          placeholder="Søk på artikler, f.eks. Button"
        />
      </form>
      <div className="flex h-full flex-col overflow-y-auto">
        {!searchResult?.result && mostRecentArticles && (
          <section aria-label="Nyeste artikler">
            <GlobalSearchHitCollection
              startIndex={0}
              heading={
                <span className="flex items-center gap-2">
                  Nyeste artikler
                  <ChangeLogIconOutline className="shrink-0" aria-hidden />
                </span>
              }
              simple
              hits={mostRecentArticles}
            />
          </section>
        )}
        {!searchResult?.result.totalHits && localQuery && (
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
        {searchResult?.result && searchResult?.result?.totalHits > 0 && (
          <section aria-label="Søkeresultater">
            <Label as="p" className="sr-only" aria-live="polite">
              {`${searchResult?.result?.totalHits} treff på "${searchResult?.query}"`}
            </Label>
            <div className="pb-4">
              {searchResult?.result.topResults.length > 0 && (
                <GlobalSearchHitCollection
                  startIndex={1}
                  heading={
                    <span className="flex items-center gap-2">
                      Beste treff
                      <ChangeLogIconOutline className="shrink-0" />
                    </span>
                  }
                  hits={searchResult?.result.topResults}
                />
              )}
              <GlobalSearchHitCollectionMapper
                startIndex={
                  searchResult?.result.topResults.length > 0
                    ? searchResult?.result.topResults.length + 1
                    : 1
                }
                groups={searchResult?.result.groupedHits}
              />
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export { GlobalSearchResults };
