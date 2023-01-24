import { useThrottle } from "@/utils";
import { Chips, Heading, Label, Link, Search } from "@navikt/ds-react";
import { useEffect, useState } from "react";
import NextLink from "next/link";

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

export const GlobalSearch = () => {
  const [newest, setNewest] = useState<SearchHit[]>([]);
  const [results, setResults] = useState<SearchHit[]>([]);
  const [tag, setTag] = useState(options[0].key);

  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch(`/api/search/v1/initial?doc=${tag}`)
      .then((x) => x.json())
      .then(setNewest);
  }, [tag]);

  const throttledSearch = useThrottle(() => {
    fetch(`/api/search/v1?q=${encodeURIComponent(query)}&doc=${"alle"}`)
      .then((x) => x.json())
      .then(setResults);
  }, 400);

  useEffect(throttledSearch, [query, throttledSearch]);

  console.log(results);
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
          {options.map((x) => (
            <Chips.Toggle
              key={x.key}
              selected={tag === x.key}
              onClick={() => setTag(x.key)}
            >
              {x.display}
            </Chips.Toggle>
          ))}
        </Chips>
      </div>
      <div className="mt-8">
        {results && query && (
          <>
            <Heading level="2" size="small">
              {`${results.length} treff på "${query}"`}
            </Heading>
            <Group hits={results} />
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

function Group({ hits }: { hits: SearchHit[] }) {
  if (hits.length === 0) {
    return null;
  }

  const groups: { [key: string]: SearchHit[] } = hits.reduce((prev, cur) => {
    if (cur._type in prev) {
      return { ...prev, [cur._type]: [...prev[cur._type], cur] };
    } else {
      return { ...prev, [cur._type]: [cur] };
    }
  }, {});

  console.log(groups);

  return (
    <>
      {Object.entries(groups).map(([key, val]) => {
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
