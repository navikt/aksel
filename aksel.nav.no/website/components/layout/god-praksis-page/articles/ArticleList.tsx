import ArticleGrid from "./ArticleGrid";

const markRandomAsNew = (articles) => {
  return [...articles].map((a) => ({ ...a, isNew: Math.random() > 0.5 }));
};

function ArticleList({ articles }) {
  if (!articles || articles.length === 0) {
    return null;
  }

  const latest = markRandomAsNew(articles);

  return (
    <>
      {/* <ArticleBento name="Populære" articles={latest} /> */}
      <ArticleGrid name="Siste" articles={latest} />
    </>
  );
}

export default ArticleList;
