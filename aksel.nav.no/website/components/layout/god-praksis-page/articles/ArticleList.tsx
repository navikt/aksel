import { useMemo } from "react";
import useSWRInfinite from "swr/infinite";
import { Button } from "@navikt/ds-react";
import ErrorBoundary from "@/error-boundary";
import { getArticleList } from "@/layout/god-praksis-page/initial-load/get-article-list";
import {
  GpArticleListT,
  GpGroupedArticlesT,
} from "@/layout/god-praksis-page/types";
import useGpQuery from "@/layout/god-praksis-page/useGpQuery";
import ArticleGrid from "./ArticleGrid";

const INITIAL_PAGE = 3;

const getKey = ({
  input: { pageIndex, previousPageData },
  innholdstypeQuery,
  undertemaQuery,
  temaQuery,
}: {
  input: { pageIndex: number; previousPageData: any[] };
  innholdstypeQuery: string | null;
  undertemaQuery: string | null;
  temaQuery: string | null;
}) => {
  if (previousPageData && previousPageData.length < 3) {
    return null;
  }

  console.count("Sent query");

  /* TODO: Implement this in API */
  return `/api/gp-articles?page=${pageIndex}${
    temaQuery ? `&tema=${temaQuery}` : ""
  }${innholdstypeQuery ? `&innholdstype=${innholdstypeQuery}` : ""}${
    undertemaQuery ? `&undertema=${undertemaQuery}` : ""
  }`;
};

type ArticleListT = {
  articles: GpGroupedArticlesT;
};

/**
 * TODO:
 * - Handle errors
 */
function ArticleList({ articles }: ArticleListT) {
  const { innholdstypeQuery, undertemaQuery, temaQuery } = useGpQuery();

  /* TODO: Getting flash from data-change since queries are memos */
  const initialData = useMemo(
    () =>
      getArticleList(articles, innholdstypeQuery, undertemaQuery).map(
        (x) => x.article
      ),
    [articles, innholdstypeQuery, undertemaQuery]
  );
  console.log({ initialData });

  const {
    data = [],
    size,
    setSize,
    isValidating,
  } = useSWRInfinite<GpArticleListT["articles"]>(
    (pageIndex, previousPageData) =>
      initialData.length < 9
        ? null
        : getKey({
            input: { pageIndex: pageIndex + INITIAL_PAGE, previousPageData },
            innholdstypeQuery,
            undertemaQuery,
            temaQuery,
          }),
    (query) => fetch(query).then((res) => res.json()),
    {
      revalidateFirstPage: false,
      initialSize: 1,
    }
  );

  const atEndOfLazy = data && data[data.length - 1]?.length < 3;

  const lazyData =
    atEndOfLazy || data.length === 1 || size > data.length
      ? data
      : data.toSpliced(-1);

  const concatArticles = [].concat(initialData, ...lazyData);

  console.log(data);
  return (
    <>
      <ArticleGrid name="Siste" articles={concatArticles} />
      {!atEndOfLazy && initialData.length === 9 && (
        <Button
          variant="tertiary-neutral"
          onClick={() => setSize(size + 1)}
          className="mx-auto"
          loading={isValidating}
        >
          Last flere artikler
        </Button>
      )}
    </>
  );
}

export default function Component(props: ArticleListT) {
  return (
    <ErrorBoundary boundaryName="GpArticleList">
      <ArticleList {...props} />
    </ErrorBoundary>
  );
}
