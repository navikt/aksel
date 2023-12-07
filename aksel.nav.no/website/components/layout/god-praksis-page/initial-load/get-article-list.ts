import { GpGroupedArticlesT } from "./group-articles";

export function getArticleList(
  articles: GpGroupedArticlesT,
  innholdstype: string | null,
  undertema: string | null
): GpGroupedArticlesT {
  return articles
    .filter(
      (article) =>
        (innholdstype ? article.innholdstype === innholdstype : true) &&
        (undertema ? article.undertema === undertema : true)
    )
    .sort(
      (a, b) =>
        new Date(b.article?.publishedAt || "1970-01-01").getTime() -
        new Date(a.article?.publishedAt || "1970-01-01").getTime()
    )
    .slice(0, 9);
}
