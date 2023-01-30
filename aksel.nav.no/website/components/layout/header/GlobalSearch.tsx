import { urlFor } from "@/lib";
import { useDebounce } from "@/utils";
import { Search as SearchIcon } from "@navikt/ds-icons";
import {
  Checkbox,
  CheckboxGroup,
  Detail,
  Heading,
  Label,
  Loader,
  Search,
} from "@navikt/ds-react";
import cl from "classnames";
import Fuse from "fuse.js";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import ReactModal from "react-modal";
import { allArticleDocuments } from "../../../sanity/config";

const options: {
  [K in typeof allArticleDocuments[number]]: { display: string; index: number };
} = {
  komponent_artikkel: { display: "Komponenter", index: 0 },
  aksel_artikkel: { display: "God praksis", index: 1 },
  ds_artikkel: { display: "Grunnleggende ", index: 2 },
  aksel_blogg: { display: "Blogg", index: 3 },
  aksel_prinsipp: { display: "Prinsipper", index: 4 },
};

type SearchHit = {
  item: {
    content: string;
    heading: string;
    ingress?: string;
    intro?: string;
    publishedAt?: string;
    slug: string;
    status?: { bilde: any; tag: string };
    tema?: string[];
    updateInfo?: { lastVerified: string };
    _createdAt: string;
    _id: string;
    _type: string;
    _updatedAt: string;
  };
  score: number;
  matches: Fuse.FuseResultMatch[];
};

type GroupedHits = { [key: string]: SearchHit[] };

/**
 * https://www.figma.com/file/71Sm1h6VV23lbBbQ3CJJ9t/Aksel-v2?node-id=1861%3A186079&t=ARKgZcA6B7ysmG3V-0
 * TODO:
 * - Implementere filter basert på kategori
 * - Keyboard-navigering på arrowUp/Down. Kanskje left/right for å hoppe til filter <-> søketreff?
 * - Oppdatere url-query basert på query + filter: ?search=abcd&filter=god_praksis
 * - Oppdatere søkefelt og filter basert på url.
 * - Søkeindeksering av ikoner: Må lazy-loades. Mye av logikk kan hentes fra sanity-modules/icon-search
 * - - Kan vi unngå lazyloading hvis Api sender med SVG i result-body? Risk for XSS da?
 *
 * uu
 * - Bruke riktig form-semantikk og attributter for søkefelt + filter
 * - Sette opp riktig semantikk for søkegruppering/treff
 * - Skal søkefelt ha role="combobox" + aria-controls?
 *
 *
 * Logging
 * - SuggestionBox med logging av querystring ved klikk
 * - Logge alle søk
 * - Logge index for valgt søk med aplitude, eg 20/26
 */
export const GlobalSearch = () => {
  const [results, setResults] = useState<SearchHit[]>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tag, setTag] = useState<Array<keyof typeof options>>([]);
  const inputRef = useRef(null);

  const router = useRouter();

  const [query, setQuery] = useState("");
  const debouncedSearchTerm = useDebounce(query);

  useEffect(() => {
    ReactModal.setAppElement("#__next");
  }, []);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setLoading(true);
      fetch(
        `/api/search/v1?q=${encodeURIComponent(debouncedSearchTerm)}${
          tag.length > 0 ? `&doc=${tag.join(",")}` : ""
        }`
      )
        .then((x) => x.json())
        .then((res) => {
          setResults(res);
          setLoading(false);
        });
      scrollToTop();
    } else {
      setLoading(false);
      setResults(null);
    }
  }, [debouncedSearchTerm, tag]);

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((x) => !x);
      }
    };

    document.addEventListener("keydown", listener);

    return () => document.removeEventListener("keydown", listener);
  }, []);

  useEffect(() => {
    const handler = () => setOpen(false);

    router.events.on("beforeHistoryChange", handler);
    router.events.on("hashChangeComplete", handler);

    return () => {
      router.events.off("beforeHistoryChange", handler);
      router.events.off("hashChangeComplete", handler);
    };
  }, [router.events]);

  useEffect(() => {
    !open && setQuery("");
  }, [open]);

  const handleQueryChange = (v: string) => {
    setQuery(v);
    setLoading(!!v);
  };

  function scrollToTop() {
    const overflowEl = document.getElementById(`aksel-search-results`);
    overflowEl?.scrollTo({ top: 0, behavior: "smooth" });
  }

  const groups: { [key: string]: SearchHit[] } = results?.reduce(
    (prev, cur) => {
      if (cur.item._type in prev) {
        return { ...prev, [cur.item._type]: [...prev[cur.item._type], cur] };
      } else {
        return { ...prev, [cur.item._type]: [cur] };
      }
    },
    {}
  );

  return (
    <div className="z-[1050] mr-0 flex h-full justify-center">
      <button
        aria-haspopup="false"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="focus-visible:shadow-focus hover:bg-surface-neutral-subtle-hover ml-2 flex aspect-square items-center justify-center rounded px-2 py-2 focus:outline-none"
      >
        <SearchIcon
          className="pointer-events-none text-xl"
          aria-label="Åpne meny"
        />
      </button>
      <ReactModal
        isOpen={open}
        onRequestClose={() => setOpen(false)}
        aria={{ modal: true }}
        contentLabel="Søk"
        className="bg-surface-default absolute inset-0 block w-screen overflow-x-auto px-4 md:px-6"
        overlayClassName="header-modal__overlay-search"
      >
        <div className="search-grid-wrapper relative mx-auto max-w-4xl gap-4 gap-x-8 py-24">
          <button
            className="focus-visible:shadow-focus hover:bg-surface-neutral-subtle-hover absolute top-8 right-4 flex items-center justify-center rounded py-3 px-2 text-lg focus:outline-none"
            onClick={() => setOpen(false)}
          >
            Lukk søk <KBD>ESC</KBD>
          </button>
          <div className="search-grid-filter mt-8">
            <CheckboxGroup legend="Filter" onChange={setTag}>
              {Object.entries(options).map(([key, val]) => (
                <Checkbox key={key} value={key} className="whitespace-nowrap">
                  {val.display}
                </Checkbox>
              ))}
            </CheckboxGroup>
          </div>
          <div className="search-grid-input w-full">
            <Search
              label={
                <span className="flex items-center">
                  Søk i hele Aksel <KBD>CMD + K</KBD>
                </span>
              }
              variant="simple"
              value={query}
              hideLabel={false}
              onChange={(v) => handleQueryChange(v)}
              onClear={() => setQuery("")}
              ref={inputRef}
              autoComplete="off"
              role="combobox"
              aria-controls="aksel-search-results"
              aria-expanded={results?.length > 0}
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              placeholder="Search"
              autoFocus
              id="aksel-search-input"
            />
          </div>
          <div className="search-grid-results mt-8 w-full max-w-3xl">
            {loading && (
              <div className="flex w-full justify-center p-4">
                <Loader size="xlarge" variant="neutral" />
              </div>
            )}
            {results && query && !loading && (
              <div
                id="aksel-search-results"
                role="listbox"
                aria-label="Søkeresultater"
              >
                <Heading level="2" size="small">
                  {`${results?.length} treff på "${query}"${
                    tag.length > 0
                      ? ` i ${tag
                          .map((x) => options[x].display.toLowerCase())
                          .join(", ")}`
                      : ""
                  }`}
                </Heading>
                <div className="mt-4 pb-16">
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
              "empty input"
              "filter results";
          }

          .search-grid-wrapper .search-grid-filter {
            grid-area: filter;
          }

          .search-grid-wrapper .search-grid-input {
            grid-area: input;
          }

          .search-grid-wrapper .search-grid-results {
            grid-area: results;
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

function Group({ groups, query }: { groups: GroupedHits; query: string }) {
  if (Object.keys(groups).length === 0) {
    // TODO: Empty-state?
    return null;
  }

  return (
    <>
      {Object.entries(groups)
        .sort((a, b) => options[a[0]].index - options[b[0]].index)
        .map(([key, val]) => {
          return (
            <div key={key} className="group">
              <div className="sticky z-10 mt-4 rounded bg-gray-100 p-2 group-first-of-type:mt-0">
                <Label
                  className="text-text-default"
                  as="h2"
                >{`${options[key].display} (${val.length})`}</Label>
              </div>
              <ul className="mt-2">
                {val.map((x) => (
                  <React.Fragment key={x.item._id}>
                    <Hit key={x.item._id} hit={x} query={query} />
                    <hr className="border-border-subtle last-of-type:hidden" />
                  </React.Fragment>
                ))}
              </ul>
            </div>
          );
        })}
    </>
  );
}

function Hit({ hit, query }: { hit: SearchHit; query: string }) {
  const hightlightDesc = hit.matches[0].indices
    .map((y) => hit.matches[0].value.slice(y[0], y[1] + 1))
    .filter((x) => x.toLowerCase().includes(query.toLowerCase()));

  const getHightlight = (q: string) => {
    if (hit.matches[0].key === "heading") {
      return <span>{hit?.item.intro ?? hit.item.ingress}</span>;
    }

    const value = hit.matches[0].value;
    const idx = value.toLowerCase().indexOf(q.toLowerCase());
    const clampBefore = Math.max(idx - 20, 0) === 0;
    const clampAfter = Math.min(idx + 20, value.length) === value.length;
    const slice = value.slice(
      Math.max(idx - 50, 0),
      Math.min(idx + 50, value.length)
    );
    let str = "";
    !clampBefore && (str += "...");
    str += slice;
    !clampAfter && (str += "...");

    return highlightStr(str, query);
  };

  /* TODO: Heading utenfor eller innenfor a-tag? */
  return (
    <li
      className={cl(
        "focus-within:shadow-focus hover:bg-surface-hover group relative flex cursor-pointer scroll-mt-12 items-center justify-between gap-4 rounded px-2"
      )}
    >
      <div className="px-2 py-6">
        <Heading level="3" size="small">
          <NextLink href={hit.item.slug} passHref>
            <a className="after:absolute after:inset-0 focus:outline-none group-hover:underline">
              <span>{highlightStr(hit.item.heading, query)}</span>
            </a>
          </NextLink>
        </Heading>
        {/* TODO: aria-hidden vs after-element med inset-0? Høre med uu */}
        <span className="font-regular text-text-subtle text-lg" aria-hidden>
          {hightlightDesc.length > 0 ? (
            <div>{getHightlight(query)}</div>
          ) : (
            <div>{hit.item?.ingress ?? hit.item?.intro}</div>
          )}
        </span>
      </div>
      <div className="hidden aspect-square w-24 sm:block">
        {hit.item?.status?.bilde && (
          <Image
            src={urlFor(hit.item.status.bilde).auto("format").url()}
            decoding="sync"
            width="96px"
            height="96px"
            layout="fixed"
            objectFit="contain"
            alt={hit.item?.heading + " thumbnail"}
            aria-hidden
          />
        )}
      </div>
    </li>
  );
}

function splitStr(str: string, query: string) {
  return str.split(new RegExp(`(${query})`, "gi"));
}

function highlightStr(str: string, query: string) {
  return (
    <span>
      {splitStr(str, query).map((part, i) => (
        <span
          key={i}
          className={cl({
            "text-text-default bg-teal-300/40":
              part.toLowerCase() === query.toLowerCase(),
          })}
        >
          {part}
        </span>
      ))}
    </span>
  );
}
