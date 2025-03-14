import { createContext, useEffect, useRef, useState } from "react";
import { useShortcut } from "../hooks";

type SearchContextType = {
  os: "mac" | "windows";
  open: boolean;
  setOpen: (v) => void;
  query: string;
  setQuery: (v: string) => void;
};

export const SearchContext = createContext<SearchContextType>({
  os: "windows",
  open: false,
  setOpen: () => null,
  query: "",
  setQuery: () => null,
});

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [os, setOs] = useState<SearchContextType["os"]>("windows");
  const inputRef = useRef(null);

  const [query, setQuery] = useState("");

  useShortcut(open, setOpen, inputRef);

  useEffect(() => {
    navigator.userAgent?.indexOf("Mac OS X") !== -1
      ? setOs("mac")
      : setOs("windows");
  }, []);

  return (
    <SearchContext.Provider
      value={{
        os,
        open,
        setOpen,
        query,
        setQuery,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
