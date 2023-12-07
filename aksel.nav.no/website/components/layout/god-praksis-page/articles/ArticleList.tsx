import { useRouter } from "next/router";
import { useMemo } from "react";
import useSWRInfinite from "swr/infinite";
import { Button } from "@navikt/ds-react";
import ErrorBoundary from "@/error-boundary";
import { getArticleList } from "@/layout/god-praksis-page/initial-load/get-article-list";
import {
  GpArticleListT,
  GpGroupedArticlesT,
} from "@/layout/god-praksis-page/types";
import ArticleGrid from "./ArticleGrid";

/* const markRandomAsNew = (articles: GpArticleListT["articles"]) => {
  return [...articles].map((a) => ({ ...a, isNew: Math.random() > 0.5 }));
}; */

const getKey = ({
  input: { pageIndex, previousPageData },
  innholdstypeQuery,
  undertemaQuery,
}: {
  input: { pageIndex: number; previousPageData: any[] };
  innholdstypeQuery: string | null;
  undertemaQuery: string | null;
}) => {
  /* TODO: Disabled for testing of inital data-load */
  return null;
  if (previousPageData && previousPageData.length < 3) {
    return null;
  }

  /* TODO: Implement this in API */
  return `/api/gp-articles?page=${pageIndex}${
    innholdstypeQuery ? `&innholdstype=${innholdstypeQuery}` : ""
  }${undertemaQuery ? `&undertema=${undertemaQuery}` : ""}`;
};

type ArticleListT = {
  articles: GpGroupedArticlesT;
};

/**
 * TODO:
 * - Handle errors
 * - Skeleton while loading/validating
 */
function ArticleList({ articles }: ArticleListT) {
  const router = useRouter();

  const innholdstypeQuery = useMemo(() => {
    return (
      decodeURIComponent(router.query?.innholdstype?.toString?.() ?? "") ?? null
    );
  }, [router.query?.innholdstype]);

  const undertemaQuery = useMemo(() => {
    return (
      decodeURIComponent(router.query?.undertema?.toString?.() ?? "") ?? null
    );
  }, [router.query?.undertema]);

  const { data, size, setSize, isValidating } = useSWRInfinite<
    GpArticleListT["articles"]
  >(
    (pageIndex, previousPageData) =>
      getKey({
        input: { pageIndex, previousPageData },
        innholdstypeQuery,
        undertemaQuery,
      }),
    (query) => fetch(query).then((res) => res.json()),
    {
      fallbackData: [
        getArticleList(articles, innholdstypeQuery, undertemaQuery).map(
          (x) => x.article
        ),
      ],
      revalidateFirstPage: false,
      initialSize: 4,
    }
  );

  const atEnd = data && data[data.length - 1]?.length < 3;

  return (
    <>
      <ArticleGrid
        name="Siste"
        articles={[].concat(
          ...(atEnd || data.length === 1 || size > data.length
            ? data
            : data.toSpliced(-1))
        )}
      />
      {!atEnd && (
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
