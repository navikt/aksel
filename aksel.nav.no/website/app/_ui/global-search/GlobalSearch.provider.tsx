"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

type SearchContextType = {
  open: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
};

const SearchContext = createContext<SearchContextType | null>(null);

function GlobalSearchProvider({ children }: { children: React.ReactNode }) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (
        (event.key === "k" || event.key === "b") &&
        (event.metaKey || event.ctrlKey) &&
        !event.shiftKey
      ) {
        event.preventDefault();
        if (open) {
          inputRef.current?.select();
        } else {
          setOpen(true);
        }
      }
    };

    document.addEventListener("keydown", listener);

    return () => document.removeEventListener("keydown", listener);
  }, [inputRef, open, setOpen]);

  /* When re-opening search for user so they can start new search instantly */
  const openSearch = () => {
    setOpen(true);
    inputRef.current?.select();
  };

  const closeSearch = () => setOpen(false);

  return (
    <SearchContext.Provider
      value={{
        open,
        closeSearch,
        openSearch,
        inputRef,
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
