import { Search } from "./Search";
import {
  SearchProvider,
  SearchResultProvider,
  SearchLoggingProvider,
  SearchNavigationProvider,
} from "./providers";

const GlobalSearch = () => (
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

export default GlobalSearch;
