"use server";

import { GlobalSearchButton } from "./GlobalSearch.button";
import { GlobalSearchDialog } from "./GlobalSearch.dialog";
import { GlobalSearchForm } from "./GlobalSearch.form";
import { GlobalSearchProvider } from "./GlobalSearch.provider";
import { GlobalSearchResults } from "./GlobalSearch.results";

/**
 * TODO:
 * - Reset search on all closes
 * - Suspense main loading
 */
async function GlobalSearch() {
  return (
    <GlobalSearchProvider>
      <GlobalSearchButton />
      <GlobalSearchDialog>
        <GlobalSearchForm />
        <GlobalSearchResults />
      </GlobalSearchDialog>
    </GlobalSearchProvider>
  );
}

export { GlobalSearch };
