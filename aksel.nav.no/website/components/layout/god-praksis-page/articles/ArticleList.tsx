import { useGpPageContext } from "@/layout/god-praksis-page/context";
import ArticleGrid from "./ArticleGrid";

const markRandomAsNew = (articles) => {
  return [...articles].map((a) => ({ ...a, isNew: Math.random() > 0.5 }));
};

function ArticleList() {
  const ctx = useGpPageContext();

  return (
    <>
      {/* <ArticleBento name="Populære" articles={latest} /> */}

      {ctx.views.map((view) => (
        <ArticleGrid
          key={view.title}
          name={view.title}
          articles={markRandomAsNew(view.articles)}
        />
      ))}
    </>
  );
}

export default ArticleList;
