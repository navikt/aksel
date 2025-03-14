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

function GlobalSearch() {
  return <div>SEARCH{/* Global search component */}</div>;
}

export { GlobalSearch };
