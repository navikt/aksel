import { searchOptions } from "@/types";
import { Checkbox, CheckboxGroup, Chips, Search } from "@navikt/ds-react";
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
    <form
      role="search"
      onSubmit={(e) => e.preventDefault()}
      className="grid w-full gap-3"
    >
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
      <Chips>
        {Object.entries(searchOptions)
          .filter((x) => !x[1].hidden)
          .filter(
            ([key]) =>
              !(noHitsAndQuery(key) && noHits(key) && results?.hits[key] === 0)
          )
          .map(([key, val]) => (
            <Chips.Toggle
              selected={tags.includes(key as keyof typeof searchOptions)}
              onClick={() => {
                const newTags = (tags as string[]).includes(key)
                  ? tags.filter((y) => y !== key)
                  : [...tags, key];
                setTags(newTags as Array<keyof typeof searchOptions>);
                update(query, newTags);
              }}
            >
              {val.display}
            </Chips.Toggle>
          ))}
      </Chips>
    </form>
  );
};
