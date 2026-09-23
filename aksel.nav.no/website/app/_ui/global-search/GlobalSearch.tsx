"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { Events } from "@navikt/analytics-types";
import { Dialog, debounce } from "@navikt/ds-react";
import type { GlobalSearchResultT } from "@/app/_ui/global-search/server/GlobalSearch.config";
import { umamiTrack } from "@/app/_ui/umami/Umami.track";
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
import { preloadSearchIndex } from "./server/GlobalSearch.actions";

function GlobalSearch() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [queryResults, setQueryResults] = useState<GlobalSearchResultT | null>(
    null,
  );
  const [, startTransition] = useTransition();

  /* Lazy state keeps one debounce instance for the component lifetime. */
  const [debouncedUpdateQuery] = useState(() =>
    debounce((value: string) => {
      maybeEnableComicSans(value);

      umamiTrack(Events.SOK, { tekst: "global søk" });
      const normalized = value.trim();
      setQuery(normalized);
      writeQueryParam(normalized);
    }, 200),
  );

  /* Deep links: read `?query=` once on load, then local state owns the query. */
  useEffect(() => {
    const initialQuery = readQueryParam();
    if (initialQuery) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setQuery(initialQuery);
      setOpen(true);
    }
  }, []);

  useEffect(() => () => debouncedUpdateQuery.clear(), [debouncedUpdateQuery]);

  useEffect(() => {
    if (!query) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setQueryResults(null);
      return;
    }

    const controller = new AbortController();

    startTransition(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
          signal: controller.signal,
        });
        if (!res.ok) {
          return;
        }

        const newResults: GlobalSearchResultT | null = await res.json();
        setQueryResults(newResults);
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("Global search failed", error);
        }
      }
    });

    return () => controller.abort();
  }, [query]);

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
          void preloadSearchIndex();
          setOpen(true);
        }
      }
    };

    document.addEventListener("keydown", listener);

    return () => document.removeEventListener("keydown", listener);
  }, [open]);

  const closeSearch = () => {
    debouncedUpdateQuery.clear();
    setOpen(false);
  };

  const resetSearch = () => {
    debouncedUpdateQuery.clear();
    setQuery("");
    writeQueryParam("");
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          closeSearch();
          /* Only on user close. On link navigation, a replaceState here would cancel the navigation. */
          writeQueryParam("");
          return;
        }
        setOpen(true);
      }}
      /* Avoids flashing empty-state when closing-animation runs */
      onOpenChangeComplete={(isOpen) => {
        if (!isOpen) {
          setQuery("");
        }
      }}
    >
      <GlobalSearchContext.Provider
        value={{
          open,
          closeSearch,
          query,
          queryResults,
          updateQuery: debouncedUpdateQuery,
          resetSearch,
          inputRef,
        }}
      >
        <GlobalSearchButton />
        <GlobalSearchDialog>
          <GlobalSearchForm />
          <div className={styles.searchResults}>
            <GlobalSearchEmptyState />
            <GlobalSearchEmptySearchState />
            <GlobalSearchResultsView />
          </div>
        </GlobalSearchDialog>
      </GlobalSearchContext.Provider>
    </Dialog>
  );
}

function maybeEnableComicSans(query: string) {
  if (query.includes("comic")) {
    document.body.style.fontFamily = "Comic Sans MS, cursive, sans-serif";
  }
}

export { GlobalSearch };
