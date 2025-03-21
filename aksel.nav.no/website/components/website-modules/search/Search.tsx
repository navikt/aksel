"use client";

import { Search } from "./parts/SearchToggle";
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

export default GlobalSearch;
