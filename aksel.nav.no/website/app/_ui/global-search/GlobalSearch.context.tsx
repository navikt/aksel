"use client";

import { createContext, useContext } from "react";
import type { GlobalSearchResultT } from "@/app/_ui/global-search/server/GlobalSearch.config";

type GlobalSearchContextType = {
  open: boolean;
  closeSearch: () => void;
  query: string;
  queryResults: GlobalSearchResultT | null;
  updateQuery: (query: string) => void;
  resetSearch: () => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
};

const GlobalSearchContext = createContext<GlobalSearchContextType | null>(null);

function useGlobalSearch() {
  const context = useContext(GlobalSearchContext);
  if (!context) {
    throw new Error("useGlobalSearch must be used within GlobalSearch");
  }

  return context;
}

export { GlobalSearchContext, useGlobalSearch };
