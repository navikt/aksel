import { Search } from "./parts/SearchToggle";
import {
  SearchLoggingProvider,
  SearchNavigationProvider,
  SearchProvider,
  SearchResultProvider,
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
