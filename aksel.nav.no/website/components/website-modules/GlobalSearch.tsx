import { useDebounce } from "@/utils";
import { Heading, Label, Link, Search } from "@navikt/ds-react";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import Fuse from "fuse.js";
import cl from "classnames";

const options = {
  aksel_artikkel: { display: "God praksis" },
  komponent_artikkel: { display: "Komponenter" },
  aksel_prinsipp: { display: "Prinsipper" },
  ds_artikkel: { display: "Grunnleggende " },
  aksel_blogg: { display: "Blogg" },
};

type SearchHit = {
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
  _score: number;
  _type: string;
  _updatedAt: string;
  _matches: Fuse.FuseResultMatch[];
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
      if (cur._type in prev) {
        return { ...prev, [cur._type]: [...prev[cur._type], cur] };
      } else {
        return { ...prev, [cur._type]: [cur] };
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
        {/* <Chips className="mt-5">
          {options.map((x) => {
            const grp = Object.keys(groups).find((k) => k === x.type);
            const length = groups[grp]?.length ?? 0;
            if (
              length === 0 &&
              x.key !== "alle" &&
              query &&
              results.length > 0
            ) {
              return null;
            }
            return (
              <Chips.Toggle
                key={x.key}
                selected={tag === x.key}
                onClick={() => setTag(x.key)}
              >
                {`${x.display} ${length ? `(${length})` : ""}`}
              </Chips.Toggle>
            );
          })}
        </Chips> */}
      </div>
      <div className="mt-8">
        {results && query && (
          <>
            <Heading level="2" size="small">
              {`${results.length} treff på "${query}"`}
            </Heading>
            <Group groups={groups} tag="alle" query={debouncedSearchTerm} />
          </>
        )}
      </div>
    </div>
  );
};

function Group({
  groups,
  tag,
  query,
}: {
  groups: GroupedHits;
  tag: string;
  query: string;
}) {
  if (Object.keys(groups).length === 0) {
    return null;
  }

  /*const hideGroup = (type: string) => {
    return options.find((x) => x.key === tag).type !== type && tag !== "alle";
  };*/

  return (
    <>
      {Object.entries(groups)
        //.filter(([key]) => !hideGroup(key))
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
                  <Hit key={x._id} hit={x} query={query} />
                ))}
              </div>
            </div>
          );
        })}
    </>
  );
}

function Hit({ hit, query }: { hit: SearchHit; query: string }) {
  const hightlight = hit._matches[0].indices
    .map((y) => hit._matches[0].value.slice(y[0], y[1] + 1))
    .filter((x) => x.includes(query));

  const getHightlight = (q: string) => {
    if (hit._matches[0].key === "heading") {
      return <span>{hit?.intro ?? hit.ingress}</span>;
    }

    const value = hit._matches[0].value;
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
      <NextLink href={hit.slug} passHref>
        <Link className="mt-6">{hit.heading}</Link>
      </NextLink>
      {hightlight.length > 0 && <div>{getHightlight(query)}</div>}
    </div>
  );
}
