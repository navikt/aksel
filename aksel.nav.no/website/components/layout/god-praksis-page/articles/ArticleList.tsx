import ArticleBento from "./ArticleBento";
import ArticleGrid from "./ArticleGrid";

const markRandomAsNew = (articles) => {
  return [...articles].map((a) => ({ ...a, isNew: Math.random() > 0.5 }));
};

function ArticleList({ articles }) {
  if (!articles || articles.length === 0) {
    return null;
  }

  const popular = articles.slice(0, 3);
  const latest = markRandomAsNew(articles.slice(3));

  return (
    <>
      <ArticleBento name="Populære" articles={popular} />
      <ArticleGrid name="Siste" articles={latest} />
    </>
  );
}

export default ArticleList;
