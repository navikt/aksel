"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { SearchPageT } from "./GlobalSearch.types";

type SearchContextType = {
  open: boolean;
  setOpen: (v: boolean) => void;
  query: string;
  setQuery: (v: string) => void;
  data: any;
};

const SearchContext = createContext<SearchContextType | null>(null);

function GlobalSearchProvider({
  children,
  data,
}: {
  children: React.ReactNode;
  data: SearchPageT[];
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (
        (event.key === "k" || event.key === "b") &&
        (event.metaKey || event.ctrlKey) &&
        !event.shiftKey
      ) {
        event.preventDefault();
        if (open) {
          inputRef.current?.focus();
        } else {
          setOpen(true);
        }
      }
    };

    document.addEventListener("keydown", listener);

    return () => document.removeEventListener("keydown", listener);
  }, [inputRef, open, setOpen]);

  return (
    <SearchContext.Provider
      value={{
        open,
        setOpen,
        query,
        setQuery,
        data,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

function useGlobalSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error(
      "useGlobalSearch must be used within a GlobalSearchProvider",
    );
  }

  return context;
}

export { GlobalSearchProvider, useGlobalSearch };
