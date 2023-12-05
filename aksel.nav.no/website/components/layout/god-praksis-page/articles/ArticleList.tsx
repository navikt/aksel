import ArticleBento from "./ArticleBento";
import ArticleGrid from "./ArticleGrid";

function ArticleList({ results }) {
  console.log("### ", { results });

  // TODO: filter results into two lists (popular and latest)
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
