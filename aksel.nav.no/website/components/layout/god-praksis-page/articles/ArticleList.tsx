import ErrorBoundary from "@/error-boundary";
import { GpArticleListT } from "@/layout/god-praksis-page/types";
import ArticleGrid from "./ArticleGrid";

const markRandomAsNew = (articles) => {
  return [...articles].map((a) => ({ ...a, isNew: Math.random() > 0.5 }));
};

function ArticleList({ articles }: GpArticleListT) {
  /*   const router = useRouter();
  const innholdstype = decodeURIComponent(router.query.innholdstype); */

  return <ArticleGrid name="Siste" articles={markRandomAsNew(articles)} />;
}

export default function Component(props: GpArticleListT) {
  return (
    <ErrorBoundary boundaryName="Accordion">
      <ArticleList {...props} />
    </ErrorBoundary>
  );
}
