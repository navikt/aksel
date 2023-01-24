import { useDebounce } from "@/utils";
import { Chips, Heading, Search } from "@navikt/ds-react";
import { useEffect, useState } from "react";
import useSWR from "swr";

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
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState({ toggled: options[0].key, query: "" });

  const debouncedSearch = useDebounce(q);

  const {
    data: queryData,
    error: queryError,
    isValidating: queryValidating,
  } = useSWR(
    debouncedSearch !== ""
      ? `/api/search/v1?q=${encodeURIComponent(debouncedSearch)}&doc=${filter}`
      : null,
    (query) =>
      fetch(query).then((res) => {
        console.count("called");
        return res.json();
      }),
    { revalidateOnFocus: false }
  );

  const showQueryData = queryData && !queryValidating && q !== "";

  useEffect(() => {
    fetch(`/api/search/v1/initial?doc=${filter.toggled}`)
      .then((x) => x.json())
      .then(setNewest);
  }, [filter.toggled]);

  return (
    <div>
      <div>
        <Search
          label="søk"
          variant="simple"
          value={q}
          onChange={setQ}
          onClear={() => setQ("")}
        />
        <Chips className="mt-5">
          {options.map((x) => (
            <Chips.Toggle
              key={x.key}
              selected={filter.toggled === x.key}
              onClick={() => setFilter((y) => ({ ...y, toggled: x.key }))}
            >
              {x.display}
            </Chips.Toggle>
          ))}
        </Chips>
      </div>
      <div className="mt-8">
        {showQueryData && (
          <>
            <Heading level="2" size="small">
              Søkte artikler
            </Heading>
            <ul>
              {!queryError &&
                queryData &&
                queryData?.map((x, xi) => <li key={xi}>{x.heading}</li>)}
            </ul>
          </>
        )}
        {newest && (
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
