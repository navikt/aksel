import { searchOptions } from "@/types";
import { createContext, useEffect, useRef, useState } from "react";
import { useDebounce, useShortcut } from "../hooks";

type SearchContextType = {
  os: "mac" | "windows";
  open: boolean;
  setOpen: (v) => void;
  tags: Array<keyof typeof searchOptions>;
  setTags: (v: Array<keyof typeof searchOptions>) => void;
  query: string;
  setQuery: (v: string) => void;
  deboucedQuery: string;
};

export const SearchContext = createContext<SearchContextType>({
  os: "windows",
  open: false,
  setOpen: () => null,
  tags: [],
  setTags: () => null,
  query: "",
  setQuery: () => null,
  deboucedQuery: "",
});

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [tags, setTags] = useState<SearchContextType["tags"]>([]);
  const [os, setOs] = useState<SearchContextType["os"]>("windows");
  const inputRef = useRef(null);

  const [query, setQuery] = useState("");

  useShortcut(open, setOpen, inputRef);

  const deboucedQuery = useDebounce(query);

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
        tags,
        setTags,
        query,
        setQuery,
        deboucedQuery,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
