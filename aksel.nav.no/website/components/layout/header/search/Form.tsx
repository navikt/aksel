import { searchOptions } from "@/types";
import { XMarkIcon } from "@navikt/aksel-icons";
import { Button, Chips, Search } from "@navikt/ds-react";
import { KBD } from "components/website-modules/KBD";
import { useContext, useRef } from "react";
import { useShortcut } from "./hooks";
import {
  SearchContext,
  SearchNavigationContext,
  SearchResultContext,
} from "./providers";

export const SearchForm = () => {
  const { open, setOpen, tags, setTags, query, setQuery, os } =
    useContext(SearchContext);
  const { update, results, reset, isValidating, error } =
    useContext(SearchResultContext);
  const { close } = useContext(SearchNavigationContext);
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

  const chipsToShow = Object.entries(searchOptions)
    .filter((x) => !x[1].hidden)
    .filter(
      ([key]) =>
        !(noHitsAndQuery(key) && noHits(key) && results?.hits[key] === 0)
    );

  return (
    <form
      role="search"
      onSubmit={(e) => e.preventDefault()}
      className="bg-surface-default grid w-full gap-2"
    >
      <div className="flex items-center gap-1 p-1">
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
          placeholder="Søk gjennom hele aksel"
          className="border-none pr-0 focus:shadow-none"
        />
        <div className="grid h-full w-12 place-content-center">
          <Button
            variant="tertiary-neutral"
            icon={<XMarkIcon title="Lukk søk" />}
            onClick={close}
            type="button"
            size="small"
          />
        </div>
      </div>
      {chipsToShow.length !== 0 && (
        <Chips className="px-4 pb-4 md:px-10">
          {chipsToShow.map(([key, val]) => (
            <Chips.Toggle
              key={key}
              variant="neutral"
              selected={tags.includes(key as keyof typeof searchOptions)}
              type="button"
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
      )}
    </form>
  );
};
