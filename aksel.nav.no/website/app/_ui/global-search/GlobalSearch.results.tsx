"use client";

import { useState, useTransition } from "react";
import { Search } from "@navikt/ds-react";
import { SearchHitT } from "./GlobalSearch.types";
import { updateSearch } from "./GlobalSearch.utils";

const GlobalSearchResults = (props: { mostRecentArticles: SearchHitT[] }) => {
  const [results, setResults] = useState<SearchHitT[]>([]);
  const [isPending, startTransition] = useTransition();

  const { mostRecentArticles } = props;

  const handleSearch = (query: string) => {
    startTransition(async () => {
      if (!query || query.length < 2) {
        return setResults([]);
      }
      /* TODO: add debounce */
      const newResults = await updateSearch(query);
      setResults(newResults);
    });
  };

  return (
    <div>
      <div>
        State
        <div>
          Length
          {results.length}
        </div>
        {isPending && "LOADING"}
      </div>
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
          onChange={handleSearch}
          /* value={query} */
          /* onChange={(v) => handleSearchStart(v)}
          onClear={() => {
            setQuery("");
            reset();
          }} */
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
        {mostRecentArticles && (
          <section aria-label="Nyeste artikler">
            {mostRecentArticles.map((item) => (
              <div key={item.item.heading}>{item.item.heading}</div>
            ))}
            {/* <Collection
            startIndex={0}
            heading={
              <span className="flex items-center gap-2">
                Nyeste artikler
                <ChangeLogIconOutline className="shrink-0" aria-hidden />
              </span>
            }
            simple
            hits={mostResent}
          /> */}
          </section>
        )}
        {/* {!results && mostResent && (
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
      )} */}
        {/* {!results?.totalHits && query && (
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
      )} */}
      </div>
    </div>
  );
};

export { GlobalSearchResults };
