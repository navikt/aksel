import ArticleBento from "./ArticleBento";
import ArticleGrid from "./ArticleGrid";

function ArticleList() {
  return (
    <>
      <ArticleBento name="Populære" />
      <ArticleGrid name="Siste" />
    </>
  );
}

export default ArticleList;
