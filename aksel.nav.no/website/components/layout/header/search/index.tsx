import { Search } from "./Search";
import { SearchProvider, SearchResultProvider } from "./providers";

export const GlobalSearch = () => {
  return (
    <SearchProvider>
      <SearchResultProvider>
        <Search />
      </SearchResultProvider>
    </SearchProvider>
  );
};
