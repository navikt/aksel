import { useRouter } from "next/router";
import { getArticleList } from "@/layout/god-praksis-page/initial-load/get-article-list";
import { GpArticleT } from "@/layout/god-praksis-page/types";
import useGpQuery from "@/layout/god-praksis-page/useGpQuery";

function useInitialState(articles): {
  initialData: GpArticleT[];
} {
  const { innholdstypeQuery, undertemaQuery } = useGpQuery();
  const { isReady } = useRouter();

  const initialData = isReady
    ? getArticleList(articles, innholdstypeQuery, undertemaQuery).map(
        (x) => x.article
      )
    : [];

  return {
    initialData,
  };
}

export default useInitialState;
