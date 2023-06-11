import { searchOptions } from "@/types";
import { logSearch } from "@/utils";
import { MagnifyingGlassIcon } from "@navikt/aksel-icons";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Search,
  Skeleton,
} from "@navikt/ds-react";
import { ChangeLogIconOutline } from "components/assets";
import { KBD } from "components/website-modules/KBD";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import ReactModal from "react-modal";
import styles from "../header.module.css";
import { Group, GroupComponent } from "./Group";
import { useSearch } from "./useSearch";
import { useShortcut } from "./useShortcut";

export const GlobalSearch = () => {
  const [open, setOpen] = useState(false);
  const [activeTags, setTags] = useState<Array<keyof typeof searchOptions>>([]);
  const [os, setOs] = useState<"mac" | "windows">("windows");
  const inputRef = useRef(null);

  const [query, setQuery] = useState("");
  const router = useRouter();
  useShortcut(open, setOpen, inputRef);

  const { results, update, reset, error, isValidating } = useSearch();

  const deboucedQuery = useDebounce(query);

  useEffect(() => {
    ReactModal.setAppElement("#__next");
    navigator.userAgent?.indexOf("Mac OS X") !== -1
      ? setOs("mac")
      : setOs("windows");
  }, []);

  const handleSearchStart = (value: string) => {
    setQuery(value);
    value === "" ? reset() : update(value, activeTags);
  };

  const handleClose = useCallback(() => {
    setOpen(false);
    reset();
    setQuery("");
    setTags([]);
  }, [reset]);

  const logSuccessSearchAttempt = useCallback(
    (index: number, url: string) => {
      const data = {
        type: "suksess",
        searchedFromUrl: router.asPath,
        query,
        filter: activeTags,
        index,
        url,
        accuracy: (100 - index / results?.totalHits).toFixed(0),
        topResult: index <= results?.topResults?.length,
      };
      logSearch(data);
    },
    [router.asPath, query, activeTags, results]
  );

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const handler = () => {
      timeout && clearTimeout(timeout);
      setTimeout(() => handleClose(), 100);
    };
    router.events.on("beforeHistoryChange", handler);
    router.events.on("hashChangeComplete", handler);

    return () => {
      router.events.off("beforeHistoryChange", handler);
      router.events.off("hashChangeComplete", handler);
    };
  }, [handleClose, router.events]);

  const noHits = (key: string) => {
    return !Object.hasOwn(results?.groupedHits ?? {}, key);
  };

  const noHitsAndQuery = (key: string) => {
    return query.length > 0 && !activeTags.find((x) => x === key);
  };

  const ErrorMessage = () => (
    <p className="search-grid-results" aria-live="assertive">
      Noe gikk galt! Last siden på nytt eller ta kontakt med Aksel.
    </p>
  );

  return (
    <div className="z-[1050] ml-auto mr-4 flex justify-center lg:ml-0 lg:mr-0">
      <Button
        variant="primary"
        className="hover:bg-deepblue-700 bg-deepblue-600 focus-visible:shadow-focus-gap h-11 focus:shadow-none"
        aria-keyshortcuts="Control+b"
        icon={
          <MagnifyingGlassIcon
            className="pointer-events-none -mt-[1px] shrink-0 text-2xl"
            aria-label="Åpne meny"
            aria-hidden
          />
        }
        iconPosition="left"
        onClick={() => setOpen(true)}
      >
        Søk
      </Button>
      <ReactModal
        isOpen={open}
        onRequestClose={() => handleClose()}
        aria={{ modal: true }}
        contentLabel="Søk"
        className="bg-surface-default absolute inset-0 block w-screen overflow-x-auto px-4 md:px-6"
        overlayClassName={styles.modalOverlaySearch}
      >
        <div className="search-grid-wrapper relative mx-auto max-w-4xl gap-4 gap-x-8 py-24">
          <Button
            className="group absolute right-4 top-8"
            variant="tertiary-neutral"
            icon={<KBD>ESC</KBD>}
            onClick={() => handleClose()}
            iconPosition="right"
          >
            Lukk søk
          </Button>
          {error && <ErrorMessage />}

          {isValidating && (
            <>
              <div className="search-grid-filter mt-16">
                <div className="grid gap-4">
                  {Object.keys(searchOptions).map((x) => (
                    <span key={x} className="flex items-center gap-4">
                      <Skeleton
                        height="2rem"
                        width="2rem"
                        variant="rectangle"
                      />
                      <Skeleton height="2rem" width="80%" variant="text" />
                    </span>
                  ))}
                </div>
              </div>
              <div className="search-grid-input w-full ">
                <div className="grid gap-2">
                  <Skeleton width="10rem" variant="text" />
                  <Skeleton height="3rem" variant="rounded" />
                </div>
              </div>
            </>
          )}

          {!isValidating && !error && (
            <>
              <div className="search-grid-filter mt-8">
                <CheckboxGroup
                  legend="Filter"
                  onChange={(v) => {
                    setTags(v);
                    update(query, v);
                  }}
                >
                  {Object.entries(searchOptions)
                    .filter((x) => !x[1].hidden)
                    .map(([key, val]) => (
                      <Checkbox
                        disabled={
                          noHitsAndQuery(key) &&
                          noHits(key) &&
                          results?.hits[key] === 0
                        }
                        key={key}
                        value={key}
                        className="whitespace-nowrap"
                      >
                        {`${val.display} ${
                          results?.hits[key] > 0
                            ? `(${results?.hits[key]})`
                            : ""
                        }`}
                      </Checkbox>
                    ))}
                </CheckboxGroup>
              </div>
              <div className="search-grid-input w-full">
                <form role="search" onSubmit={(e) => e.preventDefault()}>
                  <Search
                    label={
                      <span className="flex items-center gap-2">
                        <span>Søk i hele Aksel</span>
                        {os === "mac" ? (
                          <KBD>CMD + B</KBD>
                        ) : (
                          <KBD>CTRL + B</KBD>
                        )}
                      </span>
                    }
                    aria-autocomplete="both"
                    variant="simple"
                    value={query}
                    hideLabel={false}
                    onChange={(v) => handleSearchStart(v)}
                    onClear={() => {
                      setQuery("");
                      reset();
                    }}
                    ref={inputRef}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    autoFocus
                    id="aksel-search-input"
                    clearButton={false}
                  />
                </form>
              </div>
              <div
                className="search-grid-results mt-8 w-full max-w-3xl"
                role={query && deboucedQuery === query ? "status" : undefined}
              >
                {results && (
                  <div id="aksel-search-results" aria-label="Søkeresultater">
                    <p className="text-xl font-semibold">
                      {`${results?.totalHits} treff på "${query}"${
                        activeTags.length > 0
                          ? ` i ${activeTags
                              .map((x) =>
                                searchOptions[x].display.toLowerCase()
                              )
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
            </>
          )}
        </div>
        <style jsx>{`
          .search-grid-wrapper {
            display: grid;
            grid-template-columns: 12rem auto;
            grid-template-areas:
              "input input"
              "results results";
          }

          .search-grid-wrapper .search-grid-filter {
            display: none;
          }

          .search-grid-wrapper .search-grid-input {
            grid-area: input;
          }

          .search-grid-wrapper .search-grid-results {
            grid-area: results;
          }

          @media (min-width: 768px) {
            .search-grid-wrapper {
              display: grid;
              grid-template-columns: 12rem auto;
              grid-template-areas:
                "empty input"
                "filter results";
            }

            .search-grid-wrapper .search-grid-filter {
              display: block;
              grid-area: filter;
            }
          }
        `}</style>
      </ReactModal>
    </div>
  );
};

function useDebounce(value: any) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeOut = setTimeout(() => setDebouncedValue(value), 1000);

    return () => clearTimeout(timeOut);
  }, [value]);

  return debouncedValue;
}
