import { Search } from "./Search";
import {
  SearchProvider,
  SearchResultProvider,
  SearchLoggingProvider,
} from "./providers";

export const GlobalSearch = () => {
  return (
    <SearchProvider>
      <SearchLoggingProvider>
        <SearchResultProvider>
          <Search />
        </SearchResultProvider>
      </SearchLoggingProvider>
    </SearchProvider>
  );
};
