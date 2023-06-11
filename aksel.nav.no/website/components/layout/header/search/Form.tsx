import { searchOptions } from "@/types";
import { Checkbox, CheckboxGroup, Search } from "@navikt/ds-react";
import { KBD } from "components/website-modules/KBD";
import { useContext, useRef } from "react";
import { useShortcut } from "./hooks";
import { SearchContext, SearchResultContext } from "./providers";

export const SearchForm = () => {
  const { open, setOpen, tags, setTags, query, setQuery, os } =
    useContext(SearchContext);
  const { update, results, reset, isValidating, error } =
    useContext(SearchResultContext);
  const inputRef = useRef(null);

  useShortcut(open, setOpen, inputRef);

  const handleSearchStart = (value: string) => {
    setQuery(value);
    value === "" ? reset() : update(value, tags);
  };

  const noHits = (key: string) => {
    return !Object.hasOwn(results?.groupedHits ?? {}, key);
  };

  const noHitsAndQuery = (key: string) => {
    return query.length > 0 && !tags.find((x) => x === key);
  };

  if (isValidating || error) {
    return null;
  }

  return (
    <>
      <div className="mt-8 hidden [grid-area:filter] md:block">
        <CheckboxGroup
          legend="Filter"
          onChange={(v) => {
            setTags(v);
            update(query, v);
          }}
        >
          {Object.entries(searchOptions)
            .filter((x) => !x[1].hidden)
            .map(([key, val]) => (
              <Checkbox
                disabled={
                  noHitsAndQuery(key) && noHits(key) && results?.hits[key] === 0
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
      <div className="w-full [grid-area:input]">
        <form role="search" onSubmit={(e) => e.preventDefault()}>
          <Search
            label={
              <span className="flex items-center gap-2">
                <span>Søk i hele Aksel</span>
                {os === "mac" ? <KBD>CMD + B</KBD> : <KBD>CTRL + B</KBD>}
              </span>
            }
            aria-autocomplete="both"
            variant="simple"
            value={query}
            hideLabel={false}
            onChange={(v) => handleSearchStart(v)}
            onClear={() => {
              setQuery("");
              reset();
            }}
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
    </>
  );
};
