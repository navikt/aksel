import ArticleBento from "./ArticleBento";
import ArticleGrid from "./ArticleGrid";

function ArticleList({ results }) {
  if (!results || results.length === 0) {
    return null;
  }

  const popular = results.slice(0, 3);
  const latest = results.slice(3);

  return (
    <>
      <ArticleBento name="Populære" results={popular} />
      <ArticleGrid name="Siste" results={latest} />
    </>
  );
}

export default ArticleList;
