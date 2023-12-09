import cl from "clsx";
import { useRouter } from "next/router";
import useSWRInfinite from "swr/infinite";
import { ChevronDownCircleIcon } from "@navikt/aksel-icons";
import { Button } from "@navikt/ds-react";
import ErrorBoundary from "@/error-boundary";
import { getArticleList } from "@/layout/god-praksis-page/initial-load/get-article-list";
import {
  GpArticleListT,
  GpGroupedArticlesT,
} from "@/layout/god-praksis-page/types";
import useGpQuery from "@/layout/god-praksis-page/useGpQuery";
import ArticleGrid from "./ArticleGrid";
import styles from "./articles.module.css";

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
  const router = useRouter();

  /* TODO: Getting flash from data-change since queries are memos */
  const initialData = router.isReady
    ? getArticleList(articles, innholdstypeQuery, undertemaQuery).map(
        (x) => x.article
      )
    : [];

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
      initialSize: 0,
    }
  );

  const atEndOfLazy = data && data[data.length - 1]?.length < 3;

  return (
    <div>
      <ArticleGrid
        initialData={initialData}
        data={[].concat(...data)}
        loaded={router.isReady}
      />
      {!atEndOfLazy && initialData.length === 9 && router.isReady && (
        <div className={cl("pt-8 flex justify-center", styles.articleGrid)}>
          <Button
            variant="tertiary-neutral"
            onClick={() => setSize(size + 1)}
            disabled={isValidating}
            icon={<ChevronDownCircleIcon aria-hidden />}
          >
            Last flere artikler
          </Button>
        </div>
      )}
    </div>
  );
}

export default function Component(props: ArticleListT) {
  return (
    <ErrorBoundary boundaryName="GpArticleList">
      <ArticleList {...props} />
    </ErrorBoundary>
  );
}
