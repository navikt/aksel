"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { XMarkIcon } from "@navikt/aksel-icons";
import { Button, Search } from "@navikt/ds-react";
import styles from "./GlobalSearch.module.css";
import { useGlobalSearch } from "./GlobalSearch.provider";

const GlobalSearchForm = () => {
  const searchParams = useSearchParams();
  const initialQuery = useRef(searchParams?.get("query") ?? "");
  const { inputRef, closeSearch, updateQuery, resetSearch } = useGlobalSearch();

  useEffect(() => {
    if (!inputRef.current) {
      return;
    }
    if (initialQuery.current) {
      /* Defer to ensure defaultValue is applied */
      queueMicrotask(() => inputRef.current?.select());
    } else {
      inputRef.current.focus();
    }
  }, [inputRef]);

  return (
    <div className={styles.searchForm}>
      <form role="search" onSubmit={(e) => e.preventDefault()}>
        <Search
          ref={inputRef}
          label="Globalt søk"
          aria-autocomplete="both"
          variant="simple"
          defaultValue={searchParams?.get("query")?.toString()}
          onChange={updateQuery}
          onClear={resetSearch}
          onKeyDown={(e) => {
            /* Avoids sideeffects when clearing Search */
            if (e.key === "Escape") {
              if (e.currentTarget.value) {
                e.stopPropagation();
              }
            }
          }}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck={false}
          id="aksel-search-input"
          clearButton={false}
          placeholder="Søk gjennom hele Aksel..."
        />
      </form>
      <Button
        variant="tertiary-neutral"
        onClick={closeSearch}
        icon={<XMarkIcon title="Lukk" />}
      />
    </div>
  );
};

export { GlobalSearchForm };
