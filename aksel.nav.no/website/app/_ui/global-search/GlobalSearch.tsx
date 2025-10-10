"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
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

function GlobalSearch() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [open, setOpen] = useState<boolean>(false);

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
      openSearch: () => setOpen(true),
      inputRef,
    }),
    [open],
  );

  return (
    <GlobalSearchContext.Provider value={contextValue}>
      <GlobalSearchButton />
      <Suspense>
        <GlobalSearchResultProvider>
          <GlobalSearchDialog>
            <GlobalSearchForm />
            <div className={styles.searchResults}>
              <GlobalSearchEmptyState />
              <GlobalSearchEmptySearchState />
              <GlobalSearchResultsView />
            </div>
          </GlobalSearchDialog>
        </GlobalSearchResultProvider>
      </Suspense>
    </GlobalSearchContext.Provider>
  );
}

export { GlobalSearch };
