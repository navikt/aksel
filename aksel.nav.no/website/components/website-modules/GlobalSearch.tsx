import { useDebounce } from "@/utils";
import { Heading, Label, Link, Search } from "@navikt/ds-react";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import Fuse from "fuse.js";
import cl from "classnames";
import { allArticleDocuments } from "../../sanity/config";

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

export const GlobalSearch = () => {
  const [results, setResults] = useState<SearchHit[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tag, setTag] = useState<Array<keyof typeof options>>([]);

  const [query, setQuery] = useState("");
  const debouncedSearchTerm = useDebounce(query);

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetch(
        `/api/search/v1?q=${encodeURIComponent(debouncedSearchTerm)}${
          tag && `&doc=${tag.join(",")}`
        }`
      )
        .then((x) => x.json())
        .then(setResults);
    } else {
      setResults([]);
    }
  }, [debouncedSearchTerm, tag]);

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
          onChange={setQuery}
          onClear={() => setQuery("")}
        />
      </div>
      <div className="mt-8">
        {results && query && (
          <>
            <Heading level="2" size="small">
              {`${results.length} treff på "${query}"`}
            </Heading>
            <Group groups={groups} query={debouncedSearchTerm} />
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
            <div key={key}>
              <div className="bg-border-alt-3 mt-4 rounded p-2">
                <Label
                  className="text-text-on-alt-3"
                  as="h2"
                >{`${options[key].display} (${val.length})`}</Label>
              </div>
              <div>
                {val.map((x) => (
                  <Hit key={x.item._id} hit={x} query={query} />
                ))}
              </div>
            </div>
          );
        })}
    </>
  );
}

function Hit({ hit, query }: { hit: SearchHit; query: string }) {
  const hightlight = hit.matches[0].indices
    .map((y) => hit.matches[0].value.slice(y[0], y[1] + 1))
    .filter((x) => x.includes(query));

  const getHightlight = (q: string) => {
    if (hit.matches[0].key === "heading") {
      return <span>{hit?.item.intro ?? hit.item.ingress}</span>;
    }

    const value = hit.matches[0].value;
    const idx = value.indexOf(q);
    const clampBefore = Math.max(idx - 20, 0) === 0;
    const clampAfter = Math.min(idx + 20, value.length) === value.length;
    const slice = value.slice(
      Math.max(idx - 20, 0),
      Math.min(idx + 20, value.length)
    );
    let str = "";
    !clampBefore && (str += "...");
    str += slice;
    !clampAfter && (str += "...");

    const parts = str.split(new RegExp(`(${query})`, "gi"));
    return (
      <span>
        {parts.map((part, i) => (
          <span
            key={i}
            className={cl({
              "bg-lightblue-400 font-semibold":
                part.toLowerCase() === query.toLowerCase(),
            })}
          >
            {part}
          </span>
        ))}
      </span>
    );
    /* return str.split(query).map(x => <span key={x}></span>); */
  };

  return (
    <div>
      <NextLink href={hit.item.slug} passHref>
        <Link className="mt-6">{hit.item.heading}</Link>
      </NextLink>
      {hightlight.length > 0 && <div>{getHightlight(query)}</div>}
    </div>
  );
}
