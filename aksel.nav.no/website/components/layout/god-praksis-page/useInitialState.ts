import { getArticleList } from "@/layout/god-praksis-page/initial-load/get-article-list";
import {
  GpArticleT,
  GpGroupedArticlesT,
} from "@/layout/god-praksis-page/types";
import useGpQuery from "@/layout/god-praksis-page/useGpQuery";

/**
 * Creates initial list of articles based on url-queries
 * To make sure queries are in sync, we wait for `isReady` to be true from next/router
 * This takes a few render-cycles
 * @param articles: GpGroupedArticlesT
 * @returns GpArticleT[]
 */
function useInitialState(articles: GpGroupedArticlesT): {
  initialData: GpArticleT[];
} {
  const { innholdstypeQuery, undertemaQuery, isReady } = useGpQuery();

  const initialData = isReady
    ? getArticleList(articles, innholdstypeQuery, undertemaQuery).map((x) => ({
        ...x.article,
        currentUndertema: x.undertema,
      }))
    : [];

  return {
    initialData,
  };
}

export default useInitialState;
