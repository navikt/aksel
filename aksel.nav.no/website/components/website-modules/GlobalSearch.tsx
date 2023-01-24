import { useThrottle } from "@/utils";
import { Chips, Heading, Search } from "@navikt/ds-react";
import { useEffect, useState } from "react";

const options = [
  { key: "alle", display: "Alle" },
  { key: "gp", display: "God praksis" },
  { key: "komponenter", display: "Komponenter" },
  { key: "prinsipper", display: "Prinsipper" },
  { key: "grunnleggende", display: "Grunnleggende" },
  { key: "blogg", display: "Blogg" },
];

export const GlobalSearch = () => {
  const [newest, setNewest] = useState([]);
  const [results, setResults] = useState([]);
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
            <ul>
              {results?.map((x, xi) => (
                <li key={xi}>{x.heading}</li>
              ))}
            </ul>
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
