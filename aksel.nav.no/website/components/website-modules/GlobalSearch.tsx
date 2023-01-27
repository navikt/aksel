import { useDebounce } from "@/utils";
import { Heading, Label, Loader, Search } from "@navikt/ds-react";
import NextLink from "next/link";
import React, { useEffect, useState } from "react";
import Fuse from "fuse.js";
import cl from "classnames";
import { allArticleDocuments } from "../../sanity/config";
import Image from "next/image";
import { urlFor } from "@/lib";

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
 * - Escape: lukker søk, cmd/ctrl + k åpner søk
 * - Oppdatere url-query basert på query + filter: ?search=abcd&filter=god_praksis
 * - Oppdatere søkefelt og filter basert på url.
 * - Søkeindeksering av ikoner: Må lazy-loades. Mye av logikk kan hentes fra sanity-modules/icon-search
 * - - Kan vi unngå lazyloading hvis Api sender med SVG i result-body? Risk for XSS da?
 * - Wrappe søket i en fullside-modal.
 * - Åpne søk via en knapp i Header?
 * - - Usikker på hvilken komponent som skal "eie" søket, men tror Header
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tag, setTag] = useState<Array<keyof typeof options>>([]);

  const [query, setQuery] = useState("");
  const debouncedSearchTerm = useDebounce(query);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setLoading(true);
      fetch(
        `/api/search/v1?q=${encodeURIComponent(debouncedSearchTerm)}${
          tag && `&doc=${tag.join(",")}`
        }`
      )
        .then((x) => x.json())
        .then((res) => {
          setResults(res);
          setLoading(false);
        });
    } else {
      setLoading(false);
      setResults(null);
    }
  }, [debouncedSearchTerm, tag]);

  const handleQueryChange = (v: string) => {
    setQuery(v);
    v && setLoading(true);
  };

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
    <div>
      <div>
        <Search
          label="søk"
          variant="simple"
          value={query}
          onChange={(v) => handleQueryChange(v)}
          onClear={() => setQuery("")}
          autoComplete="off"
        />
      </div>
      <div className="mt-8 max-w-3xl">
        {loading && (
          <div className="flex w-full justify-center p-4">
            <Loader size="2xlarge" />
          </div>
        )}
        {results && query && (
          <>
            {results && !loading && (
              <>
                <Heading level="2" size="small">
                  {`${results.length} treff på "${query}"`}
                </Heading>
                <Group groups={groups} query={debouncedSearchTerm} />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

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
            <div key={key} className="first-of-type:mt-8">
              <div className="bg-bg-subtle  mt-4 rounded p-2">
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
    <li className="focus-within:shadow-focus hover:bg-surface-hover group relative flex cursor-pointer items-center justify-between gap-4 rounded px-2">
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
