import { Search } from "./parts/SearchToggle";
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
