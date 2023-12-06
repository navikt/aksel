import ErrorBoundary from "@/error-boundary";
import { GpArticleListT } from "@/layout/god-praksis-page/types";
import ArticleGrid from "./ArticleGrid";

const markRandomAsNew = (articles: GpArticleListT["articles"]) => {
  return [...articles].map((a) => ({ ...a, isNew: Math.random() > 0.5 }));
};

function ArticleList({ articles }: GpArticleListT) {
  /* const [page, setPage] = useState(1);
  const [allArticles, setAllArticles] = useState<
    Record<number, GpArticleListT["articles"]>
  >({ 1: articles });

  const { data, error, isValidating } = useSWRImmutable(
    `/api/gp-articles?page=${page}`,
    (query) =>
      fetch(query)
        .then((res) => res.json())
        .then((res) => {
          setAllArticles((x) => ({ ...x, [page + 1]: res.articles }));
          return res;
        })
  );

  console.log(data);

  if (isValidating) {
    return <div>loading</div>;
  } */

  return (
    <>
      <ArticleGrid name="Siste" articles={markRandomAsNew(articles)} />
      {/* <ArticleGrid name="Siste" articles={markRandomAsNew(allArticles[page])} /> */}
      {/* <Pagination
        page={page}
        onPageChange={(x) => setPage(x)}
        count={9}
        boundaryCount={1}
        siblingCount={1}
        size="small"
      /> */}
    </>
  );
}

export default function Component(props: GpArticleListT) {
  return (
    <ErrorBoundary boundaryName="Accordion">
      <ArticleList {...props} />
    </ErrorBoundary>
  );
}
