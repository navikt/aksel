import useSWRInfinite from "swr/infinite";
import { Button } from "@navikt/ds-react";
import ErrorBoundary from "@/error-boundary";
import { GpArticleListT } from "@/layout/god-praksis-page/types";
import ArticleGrid from "./ArticleGrid";

/* const markRandomAsNew = (articles: GpArticleListT["articles"]) => {
  return [...articles].map((a) => ({ ...a, isNew: Math.random() > 0.5 }));
}; */

const getKey = (pageIndex, previousPageData) => {
  if (previousPageData && previousPageData.length < 3) {
    return null;
  }
  return `/api/gp-articles?page=${pageIndex}`;
};

function ArticleList({ articles }: GpArticleListT) {
  const { data, size, setSize, isValidating } = useSWRInfinite<
    GpArticleListT["articles"]
  >(getKey, (query) => fetch(query).then((res) => res.json()), {
    fallbackData: [articles],
    revalidateFirstPage: false,
    initialSize: 4,
  });

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

export default function Component(props: GpArticleListT) {
  return (
    <ErrorBoundary boundaryName="GpArticleList">
      <ArticleList {...props} />
    </ErrorBoundary>
  );
}
