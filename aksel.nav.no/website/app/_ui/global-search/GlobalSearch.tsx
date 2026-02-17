"use client";

import {
  Activity,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Dialog } from "@navikt/ds-react";
import { GlobalSearchResultProvider } from "@/app/_ui/global-search/GlobalSearch.provider";
import { useParamState } from "@/app/_ui/global-search/useParamState";
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

function GlobalSearch({ isMac }: { isMac: boolean }) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { clearParam, paramValue } = useParamState("query");
  const [open, setOpen] = useState<boolean>(!!paramValue);

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
      inputRef,
    }),
    [open],
  );

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) {
          clearParam();
        }
      }}
      aria-labelledby="aksel-search-heading"
    >
      <GlobalSearchContext.Provider value={contextValue}>
        <GlobalSearchButton isMac={isMac} />
        <Activity mode={open ? "visible" : "hidden"}>
          <Suspense>
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
          </Suspense>
        </Activity>
      </GlobalSearchContext.Provider>
    </Dialog>
  );
}

export { GlobalSearch };
