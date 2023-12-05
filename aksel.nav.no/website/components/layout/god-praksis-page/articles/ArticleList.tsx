import ArticleBento from "./ArticleBento";
import ArticleGrid from "./ArticleGrid";

function ArticleList({ articles }) {
  if (!articles || articles.length === 0) {
    return null;
  }

  const popular = articles.slice(0, 3);
  const latest = articles.slice(3);

  return (
    <>
      <ArticleBento name="Populære" results={popular} />
      <ArticleGrid name="Siste" results={latest} />
    </>
  );
}

export default ArticleList;
