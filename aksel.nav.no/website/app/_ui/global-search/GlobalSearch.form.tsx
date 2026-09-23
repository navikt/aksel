"use client";

import { XMarkIcon } from "@navikt/aksel-icons";
import { Button, Dialog, Search } from "@navikt/ds-react";
import {
  GLOBAL_SEARCH_LISTBOX_ID,
  getOptionId,
  useGlobalSearch,
} from "@/app/_ui/global-search/GlobalSearch.context";
import { trackSearchHitNavigation } from "./GlobalSearch.hit";
import styles from "./GlobalSearch.module.css";

const GlobalSearchForm = () => {
  const {
    inputRef,
    query,
    updateQuery,
    resetSearch,
    flatHits,
    activeIndex,
    setActiveIndex,
  } = useGlobalSearch();

  const expanded = flatHits.length > 0;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing || flatHits.length === 0) {
      return;
    }

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActiveIndex((activeIndex + 1) % flatHits.length, "keyboard");
        break;
      case "ArrowUp":
        event.preventDefault();
        setActiveIndex(
          (activeIndex - 1 + flatHits.length) % flatHits.length,
          "keyboard",
        );
        break;
      case "Enter": {
        const activeHit = flatHits[activeIndex];
        if (!activeHit) {
          return;
        }
        event.preventDefault();

        if (event.metaKey || event.ctrlKey) {
          trackSearchHitNavigation(activeHit.hit.heading, activeHit.href);
          window.open(activeHit.href, "_blank", "noopener");
          return;
        }
        /* Reuses the link's own click handling: tracking, client navigation and closing search. */
        document.getElementById(getOptionId(activeIndex))?.click();
        break;
      }
    }
  };

  return (
    <div className={styles.searchForm}>
      <search>
        <form onSubmit={(e) => e.preventDefault()}>
          <Search
            ref={inputRef}
            label="Globalt søk"
            role="combobox"
            aria-expanded={expanded}
            aria-controls={expanded ? GLOBAL_SEARCH_LISTBOX_ID : undefined}
            aria-activedescendant={
              activeIndex >= 0 ? getOptionId(activeIndex) : undefined
            }
            aria-autocomplete="list"
            variant="simple"
            defaultValue={query}
            onChange={updateQuery}
            onClear={resetSearch}
            onKeyDown={handleKeyDown}
            onKeyUp={(event) => {
              /* Prevents screen readers from moving their own cursor. */
              if (event.key === "ArrowUp" || event.key === "ArrowDown") {
                event.preventDefault();
              }
            }}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck={false}
            enterKeyHint="go"
            id="aksel-search-input"
            clearButton={false}
            placeholder="Søk gjennom hele Aksel..."
          />
        </form>
      </search>
      <Dialog.CloseTrigger>
        <Button variant="tertiary-neutral" icon={<XMarkIcon title="Lukk" />} />
      </Dialog.CloseTrigger>
    </div>
  );
};

export { GlobalSearchForm };
