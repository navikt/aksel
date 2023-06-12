import { allArticleDocuments } from "@/sanity/config";
import { SearchHitT, SearchResultsT } from "@/types";
import { useRouter } from "next/router";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { useSearch } from "../hooks";
import { formatRawResults } from "../utils";
import { SearchContext } from "./SearchProvider";

type SearchResultContextType = {
  results: SearchResultsT;
  update: (value: string, tags: string[]) => void;
  error: any;
  isValidating: boolean;
  reset: () => void;
  close: () => void;
  mostResent: Omit<SearchHitT, "score" | "anchor">[];
};

export const SearchResultContext = createContext<SearchResultContextType>({
  results: null,
  update: () => null,
  error: false,
  isValidating: false,
  reset: () => null,
  close: () => null,
  mostResent: [],
});

export const SearchResultProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const context = useSearch();
  const { setOpen, setQuery, tags, setTags } = useContext(SearchContext);

  const mostResent: Omit<SearchHitT, "score" | "anchor">[] = useMemo(() => {
    if (!context.rawData) {
      return null;
    }

    return formatRawResults(
      context.rawData
        .filter((x) =>
          (tags.length > 0 ? tags : allArticleDocuments).includes(x._type)
        )
        .slice(0, 20)
    );
  }, [context.rawData, tags]);

  const handleClose = useCallback(() => {
    setOpen(false);
    context.reset();
    setQuery("");
    setTags([]);
  }, [context, setOpen, setQuery, setTags]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const handler = () => {
      timeout && clearTimeout(timeout);
      setTimeout(() => handleClose(), 100);
    };
    router.events.on("beforeHistoryChange", handler);
    router.events.on("hashChangeComplete", handler);

    return () => {
      router.events.off("beforeHistoryChange", handler);
      router.events.off("hashChangeComplete", handler);
    };
  }, [handleClose, router.events]);

  return (
    <SearchResultContext.Provider
      value={{ ...context, mostResent, close: handleClose }}
    >
      {children}
    </SearchResultContext.Provider>
  );
};
