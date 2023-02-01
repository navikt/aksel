import { useDebounce } from "@/utils";
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
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactModal from "react-modal";
import { Group, GroupComponent } from "./Group";
import { SearchHit, options } from "lib/types/search";

/**
 * https://www.figma.com/file/71Sm1h6VV23lbBbQ3CJJ9t/Aksel-v2?node-id=1861%3A186079&t=ARKgZcA6B7ysmG3V-0
 * TODO:
 * - Oppdatere url-query basert på query + filter: ?search=abcd&filter=god_praksis
 * - Oppdatere søkefelt og filter basert på url.
 * - Fremheving av de beste treffene
 * - Optimalisere data sendt til client
 * - Søkeindeksering av ikoner: Må lazy-loades. Mye av logikk kan hentes fra sanity-modules/icon-search
 * - - Kan vi unngå lazyloading hvis Api sender med SVG i result-body? Risk for XSS da?
 *
 * uu
 * - Bør keyboard-shortcuts prefikses med en gjemt "shortcut"/"hurtigtast"-tekst?
 *
 *
 * Logging
 * - SuggestionBox med logging av querystring ved klikk
 * - Logge alle søk
 * - Logge index for valgt søk med aplitude, eg 20/26
 */
export const GlobalSearch = () => {
  const [results, setResults] = useState<{
    filteredResults: SearchHit[];
    hits: Record<keyof typeof options, number>;
  }>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeTags, setTags] = useState<Array<keyof typeof options>>([]);
  const inputRef = useRef(null);
  const [os, setOs] = useState<"mac" | "windows">("windows");

  const router = useRouter();

  const [query, setQuery] = useState("");
  const debouncedSearchTerm = useDebounce(query);

  useEffect(() => {
    ReactModal.setAppElement("#__next");
    navigator.userAgent?.indexOf("Mac OS X") !== -1
      ? setOs("mac")
      : setOs("windows");
  }, []);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setLoading(true);
      fetch(
        `/api/search/v1?q=${encodeURIComponent(debouncedSearchTerm)}${
          activeTags.length > 0 ? `&doc=${activeTags.join(",")}` : ""
        }`
      )
        .then((x) => x.json())
        .then((res) => {
          setResults(res);
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
  }, [debouncedSearchTerm, activeTags]);

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
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
    setOpen(false);
    setQuery("");
    setTags([]);
  }, []);

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

    // TODO: Søk på samme query fører ikke til state-update og blir stuck i loading
    setLoading(!!v);
  };

  const groups: { [key: string]: SearchHit[] } =
    results?.filteredResults?.reduce((prev, cur) => {
      if (cur.item._type in prev) {
        return { ...prev, [cur.item._type]: [...prev[cur.item._type], cur] };
      } else {
        return { ...prev, [cur.item._type]: [cur] };
      }
    }, {});

  const noHits = (key: string) => {
    return !Object.hasOwn(groups ?? {}, key);
  };

  const noHitsAndQuery = (key: string) => {
    return debouncedSearchTerm.length > 0 && !activeTags.find((x) => x === key);
  };

  const topResults = results?.filteredResults
    .slice(0, 3)
    .filter((x) => x.score < 0.1);

  return (
    <div className="z-[1050] mr-0 flex justify-center">
      <Button
        variant="primary"
        className="hover:bg-deepblue-600  bg-deepblue-500 ml-4"
        icon={
          <SearchIcon
            className="pointer-events-none -mt-[1px] shrink-0 text-xl"
            aria-label="Åpne meny"
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
        overlayClassName="header-modal__overlay-search"
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
              {Object.entries(options).map(([key, val]) => (
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
                    {os === "mac" ? <KBD>CMD + K</KBD> : <KBD>CTRL + K</KBD>}
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
                placeholder="Search"
                autoFocus
                id="aksel-search-input"
                clearButton={false}
              />
            </form>
          </div>
          <div
            className="search-grid-results mt-8 w-full max-w-3xl"
            aria-busy={loading}
          >
            {loading && (
              <div className="flex w-full justify-center p-4">
                <Loader size="xlarge" variant="neutral" />
              </div>
            )}
            {results && query && !loading && (
              <div id="aksel-search-results" aria-label="Søkeresultater">
                <p
                  className="text-xl font-semibold"
                  /* aria-live="polite" */
                  role="status"
                >
                  {`${results?.filteredResults?.length} treff på "${query}"${
                    activeTags.length > 0
                      ? ` i ${activeTags
                          .map((x) => options[x].display.toLowerCase())
                          .join(", ")}`
                      : ""
                  }`}
                </p>
                <div className="mt-4 pb-16 md:block">
                  {topResults.length > 0 &&
                    results?.filteredResults.length > 8 && (
                      <GroupComponent
                        heading={
                          <span className="flex items-center gap-2">
                            Beste treff
                            <ChangeLogIconOutline className="shrink-0" />
                          </span>
                        }
                        hits={topResults}
                        query={query}
                      />
                    )}
                  <Group groups={groups} query={debouncedSearchTerm} />
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
      className="bg-surface-neutral-subtle-hover ml-2 rounded px-2 font-sans font-semibold uppercase"
    >
      {children}
    </Detail>
  );
}
