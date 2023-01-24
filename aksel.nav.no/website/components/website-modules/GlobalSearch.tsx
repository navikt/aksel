import { useDebounce } from "@/utils";
import { Chips, Heading, Label, Link, Search } from "@navikt/ds-react";
import NextLink from "next/link";
import { useEffect, useState } from "react";

const options = [
  { key: "alle", display: "Alle" },
  { key: "gp", display: "God praksis", type: "aksel_artikkel" },
  { key: "komponenter", display: "Komponenter", type: "komponent_artikkel" },
  { key: "prinsipper", display: "Prinsipper", type: "aksel_prinsipp" },
  { key: "grunnleggende", display: "Grunnleggende", type: "ds_artikkel" },
  { key: "blogg", display: "Blogg", type: "aksel_blogg" },
];

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
};

type GroupedHits = { [key: string]: SearchHit[] };

export const GlobalSearch = () => {
  const [newest, setNewest] = useState<SearchHit[]>([]);
  const [results, setResults] = useState<SearchHit[]>([]);
  const [tag, setTag] = useState(options[0].key);

  const [query, setQuery] = useState("");
  const debouncedSearchTerm = useDebounce(query);

  useEffect(() => {
    fetch(`/api/search/v1/initial?doc=${tag}`)
      .then((x) => x.json())
      .then(setNewest);
  }, [tag]);

  useEffect(() => {
    debouncedSearchTerm
      ? fetch(
          `/api/search/v1?q=${encodeURIComponent(
            debouncedSearchTerm
          )}&doc=${"alle"}`
        )
          .then((x) => x.json())
          .then(setResults)
      : setResults([]);
  }, [debouncedSearchTerm]);

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
        <Chips className="mt-5">
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
        </Chips>
      </div>
      <div className="mt-8">
        {results && query && (
          <>
            <Heading level="2" size="small">
              {`${results.length} treff på "${query}"`}
            </Heading>
            <Group groups={groups} tag={tag} />
          </>
        )}
        {newest && !(results && query) && (
          <>
            <Heading level="2" size="small">
              Nyeste artikler
            </Heading>
            <ul>
              {newest?.map((x, xi) => (
                <li key={xi}>{x.heading}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

function Group({ groups, tag }: { groups: GroupedHits; tag: string }) {
  if (Object.keys(groups).length === 0) {
    return null;
  }

  const hideGroup = (type: string) => {
    return options.find((x) => x.key === tag).type !== type && tag !== "alle";
  };

  return (
    <>
      {Object.entries(groups)
        .filter(([key]) => !hideGroup(key))
        .map(([key, val]) => {
          return (
            <div key={key}>
              <div className="bg-border-alt-3 mt-4 rounded p-2">
                <Label className="text-text-on-alt-3" as="h2">{`${
                  options.find((x) => x.type === key).display
                } (${val.length})`}</Label>
              </div>
              <div>
                {val.map((x) => (
                  <Hit key={x._id} hit={x} />
                ))}
              </div>
            </div>
          );
        })}
    </>
  );
}

function Hit({ hit }: { hit: SearchHit }) {
  return (
    <div>
      <NextLink href={hit.slug} passHref>
        <Link className="mt-6">{hit.heading}</Link>
      </NextLink>
    </div>
  );
}
