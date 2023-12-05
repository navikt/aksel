import ArticleBento from "./ArticleBento";
import ArticleGrid from "./ArticleGrid";

const markRandomAsNew = (articles) => {
  return [...articles].map((a) => ({ ...a, isNew: Math.random() > 0.5 }));
};

function ArticleList({ results }) {
  if (!results || results.length === 0) {
    return null;
  }

  const popular = results.slice(0, 3);
  const latest = markRandomAsNew(results.slice(3));

  return (
    <>
      <ArticleBento name="Populære" results={popular} />
      <ArticleGrid name="Siste" results={latest} />
    </>
  );
}

export default ArticleList;
