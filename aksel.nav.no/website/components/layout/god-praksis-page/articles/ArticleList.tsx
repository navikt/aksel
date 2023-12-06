import ErrorBoundary from "@/error-boundary";
import { GpArticleViews } from "@/layout/god-praksis-page/types";
import ArticleGrid from "./ArticleGrid";

const markRandomAsNew = (articles) => {
  return [...articles].map((a) => ({ ...a, isNew: Math.random() > 0.5 }));
};

function ArticleList({ views }: GpArticleViews) {
  return (
    <>
      {/* <ArticleBento name="Populære" articles={latest} /> */}

      {views.map((view) => (
        <ArticleGrid
          key={view.title}
          name={view.title}
          articles={markRandomAsNew(view.articles)}
        />
      ))}
    </>
  );
}

export default function Component(props: GpArticleViews) {
  return (
    <ErrorBoundary boundaryName="Accordion">
      <ArticleList {...props} />
    </ErrorBoundary>
  );
}
