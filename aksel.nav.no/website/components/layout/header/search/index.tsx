import { SearchLogT, useDebounce, logSearch } from "@/utils";
import { Search as SearchIcon } from "@navikt/ds-icons";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Detail,
  Loader,
  Search,
} from "@navikt/ds-react";
import { ChangeLogIconOutline } from "components/assets";
import { options, SearchResults } from "lib/types/search";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactModal from "react-modal";
import { Group, GroupComponent } from "./Group";
import styles from "../header.module.css";

/**
 * https://www.figma.com/file/71Sm1h6VV23lbBbQ3CJJ9t/Aksel-v2?node-id=1861%3A186079&t=ARKgZcA6B7ysmG3V-0
 * TODO:
 * - Oppdatere url-query basert på query + filter: ?search=abcd&filter=god_praksis
 * - Oppdatere søkefelt og filter basert på url.

 */
export const GlobalSearch = () => {
  const [results, setResults] = useState<SearchResults>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeTags, setTags] = useState<Array<keyof typeof options>>([]);
  const [os, setOs] = useState<"mac" | "windows">("windows");
  const inputRef = useRef(null);

  const session = useRef<{ retires: number; queries: string[] }>({
    retires: 0,
    queries: [],
  });
  const firstSearch = useRef<boolean>(true);
  const prevSearch = useRef<string>("");

  const router = useRouter();

  const [query, setQuery] = useState("");
  const debouncedSearchTerm = useDebounce(query);

  useEffect(() => {
    ReactModal.setAppElement("#__next");
    navigator.userAgent?.indexOf("Mac OS X") !== -1
      ? setOs("mac")
      : setOs("windows");
  }, []);

  const logSearchAttempt = useCallback(
    (hits: number, type: SearchLogT["type"]) => {
      const data: SearchLogT = {
        type,
        searchedFromUrl: router.asPath,
        hits: hits ?? 0,
        retries: session.current.retires,
        retriedQueries: session.current.queries,
        query: debouncedSearchTerm,
        filter: activeTags,
      };

      logSearch(data);
    },
    [router.asPath, debouncedSearchTerm, activeTags]
  );

  const logSuccessSearchAttempt = useCallback(
    (index: number, url: string) => {
      const data: SearchLogT = {
        type: "suksess",
        searchedFromUrl: router.asPath,
        hits: results?.totalHits ?? 0,
        retries: session.current.retires,
        retriedQueries: session.current.queries,
        query: debouncedSearchTerm,
        filter: activeTags,

        index,
        url,
        accuracy: (100 - index / results?.totalHits).toFixed(0),
        topResult: index <= results?.topResults?.length,
      };
      logSearch(data);
    },
    [
      router.asPath,
      results?.totalHits,
      results?.topResults,
      debouncedSearchTerm,
      activeTags,
    ]
  );

  useEffect(() => {
    if (debouncedSearchTerm && open) {
      setLoading(true);
      fetch(
        `/api/search/v1?q=${encodeURIComponent(debouncedSearchTerm)}${
          activeTags.length > 0 ? `&doc=${activeTags.join(",")}` : ""
        }`
      )
        .then((x) => x.json())
        .then((res) => {
          console.log(res);
          setResults(res);
          logSearchAttempt(res?.hits?.totalHits ?? 0, "standard");
          setLoading(false);
        })
        .catch(() => {
          setResults(null);
          setLoading(false);
        });
      window.scrollTo(0, 0);
    } else {
      setLoading(false);
      setResults(null);
    }
  }, [debouncedSearchTerm, activeTags, open, logSearchAttempt]);

  useEffect(() => {
    if (debouncedSearchTerm && open && !firstSearch.current) {
      session.current = {
        queries: [...session.current.queries, prevSearch.current],
        retires: session.current.retires + 1,
      };
      prevSearch.current = debouncedSearchTerm;
    } else if (debouncedSearchTerm && open) {
      firstSearch.current = false;
      prevSearch.current = debouncedSearchTerm;
    }
  }, [debouncedSearchTerm, activeTags, open]);

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (
        event.key === "b" &&
        (event.metaKey || event.ctrlKey) &&
        !event.shiftKey
      ) {
        event.preventDefault();
        if (open) {
          inputRef.current?.focus();
        } else {
          setOpen(true);
        }
      }
    };

    document.addEventListener("keydown", listener);

    return () => document.removeEventListener("keydown", listener);
  }, [open]);

  const handleClose = useCallback(() => {
    if (session.current.retires > 0 || prevSearch.current !== "") {
      logSearchAttempt(results?.totalHits, "feilet");
    }

    setOpen(false);
    setQuery("");
    setTags([]);
    session.current = { queries: [], retires: 0 };
    firstSearch.current = true;
  }, [logSearchAttempt, results?.totalHits]);

  useEffect(() => {
    router.events.on("beforeHistoryChange", handleClose);
    router.events.on("hashChangeComplete", handleClose);

    return () => {
      router.events.off("beforeHistoryChange", handleClose);
      router.events.off("hashChangeComplete", handleClose);
    };
  }, [handleClose, router.events]);

  const handleQueryChange = (v: string) => {
    setQuery(v);
    v !== debouncedSearchTerm && setLoading(!!v);
  };

  const noHits = (key: string) => {
    return !Object.hasOwn(results?.groupedHits ?? {}, key);
  };

  const noHitsAndQuery = (key: string) => {
    return debouncedSearchTerm.length > 0 && !activeTags.find((x) => x === key);
  };

  return (
    <div className="z-[1050] mr-4 ml-auto flex justify-center lg:mr-0 lg:ml-0">
      <Button
        variant="primary"
        className="hover:bg-deepblue-700 bg-deepblue-600 focus-visible:shadow-focus-gap h-11 focus:shadow-none"
        aria-keyshortcuts="Control+b"
        icon={
          <SearchIcon
            className="pointer-events-none -mt-[1px] shrink-0 text-xl"
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
          <button
            className="focus-visible:shadow-focus hover:bg-surface-neutral-subtle-hover absolute top-8 right-4 flex items-center justify-center rounded py-3 px-2 text-lg focus:outline-none"
            onClick={() => handleClose()}
          >
            Lukk søk <KBD>ESC</KBD>
          </button>
          <div className="search-grid-filter mt-8">
            <CheckboxGroup legend="Filter" onChange={setTags}>
              {Object.entries(options)
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
                      results?.hits[key] > 0 ? `(${results?.hits[key]})` : ""
                    }`}
                  </Checkbox>
                ))}
            </CheckboxGroup>
          </div>
          <div className="search-grid-input w-full">
            <form role="search" onSubmit={(e) => e.preventDefault()}>
              <Search
                label={
                  <span className="flex items-center">
                    Søk i hele Aksel{" "}
                    {os === "mac" ? <KBD>CMD + B</KBD> : <KBD>CTRL + B</KBD>}
                  </span>
                }
                variant="simple"
                value={query}
                hideLabel={false}
                onChange={(v) => handleQueryChange(v)}
                onClear={() => setQuery("")}
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
            aria-busy={loading}
            role="status"
          >
            {loading && (
              <div className="flex w-full justify-center p-4">
                <Loader size="xlarge" variant="neutral" />
              </div>
            )}
            {results && query && !loading && (
              <div id="aksel-search-results" aria-label="Søkeresultater">
                <p className="text-xl font-semibold">
                  {`${results?.totalHits} treff på "${query}"${
                    activeTags.length > 0
                      ? ` i ${activeTags
                          .map((x) => options[x].display.toLowerCase())
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
                      results?.topResults.length > 0
                        ? results?.topResults.length + 1
                        : 1
                    }
                    logSuccess={logSuccessSearchAttempt}
                    groups={results?.groupedHits}
                    query={debouncedSearchTerm}
                  />
                </div>
              </div>
            )}
          </div>
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

function KBD({ children }: { children: React.ReactNode }) {
  return (
    <Detail
      as="kbd"
      className="bg-surface-neutral-subtle-hover ml-2 hidden rounded px-2 font-sans font-semibold uppercase md:inline-block"
    >
      {children}
    </Detail>
  );
}
