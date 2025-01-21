import { useContext, useEffect, useRef } from "react";
import { Search } from "@navikt/ds-react";
import KBD from "@/web/KBD";
import { useShortcut } from "../hooks";
import { SearchContext, useSearchResult } from "../providers";

export const SearchForm = () => {
  const { open, setOpen, query, setQuery, os } = useContext(SearchContext);
  const { update, reset, isValidating, error } = useSearchResult();
  const inputRef = useRef<HTMLInputElement>(null);

  useShortcut(open, setOpen, inputRef);

  useEffect(() => {
    setTimeout(() => open && inputRef.current?.focus());
  }, [open]);

  const handleSearchStart = (value: string) => {
    setQuery(value);
    value === "" ? reset() : update(value);
  };

  if (isValidating || error) {
    return null;
  }

  return (
    <form role="search" onSubmit={(e) => e.preventDefault()} className="w-full">
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
        onKeyDown={(e) => {
          /* Avoids sideeffects when clearing Search */
          if (e.key === "Escape") {
            if (e.currentTarget.value) {
              e.stopPropagation();
            }
          }
        }}
        ref={inputRef}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        id="aksel-search-input"
        clearButton={false}
        placeholder="Søk på artikler, f.eks. Button"
      />
    </form>
  );
};
