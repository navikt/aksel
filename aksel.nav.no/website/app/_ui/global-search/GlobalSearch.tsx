import { GlobalSearchButton } from "./GlobalSearch.button";
import { GlobalSearchDialog } from "./GlobalSearch.dialog";
import { GlobalSearchForm } from "./GlobalSearch.form";
import styles from "./GlobalSearch.module.css";
import { GlobalSearchProvider } from "./GlobalSearch.provider";
import {
  GlobalSearchEmptySearchState,
  GlobalSearchEmptyState,
  GlobalSearchPreload,
  GlobalSearchResultsView,
} from "./GlobalSearch.results";

async function GlobalSearch() {
  return (
    <GlobalSearchProvider>
      <GlobalSearchPreload />
      <GlobalSearchButton />
      <GlobalSearchDialog>
        <GlobalSearchForm />
        <div className={styles.searchResults}>
          <GlobalSearchEmptyState />
          <GlobalSearchEmptySearchState />
          <GlobalSearchResultsView />
        </div>
      </GlobalSearchDialog>
    </GlobalSearchProvider>
  );
}

export { GlobalSearch };
