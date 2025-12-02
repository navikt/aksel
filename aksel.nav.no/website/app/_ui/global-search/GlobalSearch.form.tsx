"use client";

import { XMarkIcon } from "@navikt/aksel-icons";
import { Button, Dialog, Search } from "@navikt/ds-react";
import {
  useGlobalSearch,
  useGlobalSearchResults,
} from "@/app/_ui/global-search/GlobalSearch.context";
import { useParamState } from "@/app/_ui/global-search/useParamState";
import styles from "./GlobalSearch.module.css";

const GlobalSearchForm = () => {
  const { paramValue } = useParamState("query");
  const { inputRef } = useGlobalSearch();
  const { updateQuery, resetSearch } = useGlobalSearchResults();

  return (
    <div className={styles.searchForm}>
      <form role="search" onSubmit={(e) => e.preventDefault()}>
        <Search
          ref={inputRef}
          label="Globalt søk"
          aria-autocomplete="both"
          variant="simple"
          defaultValue={paramValue}
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
      <Dialog.CloseTrigger>
        <Button variant="tertiary-neutral" icon={<XMarkIcon title="Lukk" />} />
      </Dialog.CloseTrigger>
    </div>
  );
};

export { GlobalSearchForm };
