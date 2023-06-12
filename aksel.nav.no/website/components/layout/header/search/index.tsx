import { Search } from "./Search";
import {
  SearchProvider,
  SearchResultProvider,
  SearchLoggingProvider,
  SearchNavigationProvider,
} from "./providers";

export const GlobalSearch = () => (
  <SearchProvider>
    <SearchLoggingProvider>
      <SearchResultProvider>
        <SearchNavigationProvider>
          <Search />
        </SearchNavigationProvider>
      </SearchResultProvider>
    </SearchLoggingProvider>
  </SearchProvider>
);
