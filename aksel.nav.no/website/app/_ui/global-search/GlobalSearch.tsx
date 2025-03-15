"use server";

import { GlobalSearchButton } from "./GlobalSearch.button";
import { GlobalSearchDialog } from "./GlobalSearch.dialog";
import { GlobalSearchForm } from "./GlobalSearch.form";
import { GlobalSearchProvider } from "./GlobalSearch.provider";
import { GlobalSearchResults } from "./GlobalSearch.results";
import { getRecentArticles } from "./GlobalSearch.utils";

/**
 * TODO:
 * - Reset search on all closes
 * - Suspense main loading
 */
async function GlobalSearch() {
  const recentArticles = await getRecentArticles();

  if (recentArticles.length === 0) {
    console.error("Failed loading global search");
    return null;
  }

  return (
    <GlobalSearchProvider>
      <GlobalSearchButton />
      <GlobalSearchDialog>
        <GlobalSearchForm />
        <GlobalSearchResults mostRecentArticles={recentArticles} />
      </GlobalSearchDialog>
    </GlobalSearchProvider>
  );
}

export { GlobalSearch };
