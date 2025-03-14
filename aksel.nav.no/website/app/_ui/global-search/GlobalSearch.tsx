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
import { SearchPageT } from "./GlobalSearch.types";


async function GlobalSearch() {

  const {default: data} = await import("../../public/searchindex.json", {with: {type: 'json' }});

  if (!data) {
    console.error("Failed loading global search");
    return null;
  }

  return (
    <GlobalSearchProvider data={data as SearchPageT[]}>
      <GlobalSearchButton />
      <GlobalSearchDialog >
        <GlobalSearchResults data={data as SearchPageT[]}/>
      </GlobalSearchDialog>
    </GlobalSearchProvider>
  );
}

export { GlobalSearch };
