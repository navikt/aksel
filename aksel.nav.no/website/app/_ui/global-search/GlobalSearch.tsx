"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Dialog } from "@navikt/ds-react";
import { GlobalSearchResultProvider } from "@/app/_ui/global-search/GlobalSearch.provider";
import { GlobalSearchButton } from "./GlobalSearch.button";
import { GlobalSearchContext } from "./GlobalSearch.context";
import { GlobalSearchDialog } from "./GlobalSearch.dialog";
import { GlobalSearchForm } from "./GlobalSearch.form";
import styles from "./GlobalSearch.module.css";
import {
  GlobalSearchEmptySearchState,
  GlobalSearchEmptyState,
  GlobalSearchResultsView,
} from "./GlobalSearch.results";
import { readQueryParam, writeQueryParam } from "./GlobalSearch.url";

function useIsMac() {
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMac(/Mac|iPhone|iPad|iPod/i.test(navigator.userAgent));
  }, []);

  return isMac;
}

function GlobalSearch() {
  const isMac = useIsMac();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  /* Deep links: read `?query=` once on load, then local state owns the query. */
  useEffect(() => {
    const initialQuery = readQueryParam();
    if (initialQuery) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setQuery(initialQuery);
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (
        (event.key === "k" || event.key === "b") &&
        (event.metaKey || event.ctrlKey) &&
        !event.shiftKey
      ) {
        event.preventDefault();
        if (open) {
          inputRef.current?.select();
        } else {
          setOpen(true);
        }
      }
    };

    document.addEventListener("keydown", listener);

    return () => document.removeEventListener("keydown", listener);
  }, [open]);

  const contextValue = useMemo(
    () => ({
      open,
      closeSearch: () => setOpen(false),
      query,
      setQuery,
      inputRef,
    }),
    [open, query],
  );

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        /* Only on user close. On link navigation, a replaceState here would cancel the navigation. */
        if (!nextOpen) {
          writeQueryParam("");
        }
      }}
      /* Avoids flashing empty-state when closing-animation runs */
      onOpenChangeComplete={(isOpen) => {
        if (!isOpen) {
          setQuery("");
        }
      }}
      aria-labelledby="aksel-search-heading"
    >
      <GlobalSearchContext.Provider value={contextValue}>
        <GlobalSearchButton isMac={isMac} />
        <GlobalSearchResultProvider>
          <GlobalSearchDialog isMac={isMac}>
            <GlobalSearchForm />
            <div className={styles.searchResults}>
              <GlobalSearchEmptyState />
              <GlobalSearchEmptySearchState />
              <GlobalSearchResultsView />
            </div>
          </GlobalSearchDialog>
        </GlobalSearchResultProvider>
      </GlobalSearchContext.Provider>
    </Dialog>
  );
}

export { GlobalSearch };
