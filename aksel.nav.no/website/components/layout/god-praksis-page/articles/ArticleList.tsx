import cl from "clsx";
import { useRouter } from "next/router";
import useSWRInfinite from "swr/infinite";
import { ChevronDownCircleIcon } from "@navikt/aksel-icons";
import { Button } from "@navikt/ds-react";
import ErrorBoundary from "@/error-boundary";
import { GpArticleT } from "@/layout/god-praksis-page/types";
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
  initialArticles: GpArticleT[];
};

/**
 * TODO:
 * - Handle errors
 */
function ArticleList({ initialArticles }: ArticleListT) {
  const router = useRouter();
  const { innholdstypeQuery, undertemaQuery, temaQuery } = useGpQuery();

  const {
    data = [],
    size,
    setSize,
    isValidating,
  } = useSWRInfinite<GpArticleT[]>(
    (pageIndex, previousPageData) =>
      initialArticles.length < 9
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
        initialData={initialArticles}
        data={[].concat(...data)}
        loaded={router.isReady}
      />
      {!atEndOfLazy && initialArticles.length === 9 && router.isReady && (
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
