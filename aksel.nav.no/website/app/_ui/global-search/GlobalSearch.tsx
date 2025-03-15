"use server";

import { GlobalSearchButton } from "./GlobalSearch.button";
import { GlobalSearchDialog } from "./GlobalSearch.dialog";

/* import { Search } from "./parts/SearchToggle";
import {
  SearchNavigationProvider,
  SearchProvider,
  SearchResultProvider,
} from "./providers";

const GlobalSearch = () => (
  <SearchProvider>
    <SearchResultProvider>
      <SearchNavigationProvider>
        <Search />
      </SearchNavigationProvider>
    </SearchResultProvider>
  </SearchProvider>
);

export default GlobalSearch; */
import { GlobalSearchProvider } from "./GlobalSearch.provider";
import { GlobalSearchResults } from "./GlobalSearch.results";
import { getRecentArticles } from "./GlobalSearch.utils";

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
        <GlobalSearchResults mostRecentArticles={recentArticles} />
      </GlobalSearchDialog>
    </GlobalSearchProvider>
  );
}

export { GlobalSearch };
