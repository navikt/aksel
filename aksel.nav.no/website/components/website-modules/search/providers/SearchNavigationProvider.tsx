import { createContext, useCallback, useContext, useEffect } from "react";
import { SearchContext } from "./SearchProvider";
import { SearchResultContext } from "./SearchResultProvider";
import { useRouter } from "next/router";

type SearchNavigationProviderT = { close: () => void };

export const SearchNavigationContext = createContext<SearchNavigationProviderT>(
  {
    close: () => null,
  }
);

export const SearchNavigationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const { setOpen, setQuery, setTags } = useContext(SearchContext);
  const { reset } = useContext(SearchResultContext);

  const close = useCallback(() => {
    setOpen(false);
    reset();
    setQuery("");
    setTags([]);
  }, [reset, setOpen, setQuery, setTags]);

  /* Add a small delay to get a precieved smoother navigation */
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const handler = () => {
      timeout && clearTimeout(timeout);

      setTimeout(() => close(), 100);
    };
    router.events.on("beforeHistoryChange", handler);
    router.events.on("hashChangeComplete", handler);

    return () => {
      router.events.off("beforeHistoryChange", handler);
      router.events.off("hashChangeComplete", handler);
    };
  }, [close, router.events]);

  return (
    <SearchNavigationContext.Provider value={{ close }}>
      {children}
    </SearchNavigationContext.Provider>
  );
};
