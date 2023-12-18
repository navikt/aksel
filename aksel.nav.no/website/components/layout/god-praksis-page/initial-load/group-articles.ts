import { GpArticleT } from "@/layout/god-praksis-page/queries";
import { GpGroupedArticlesInputT, GpGroupedArticlesT } from "../types";

/**
 * De-duplicates re-occuring articles and maps the to the matching innholdstype and undertema
 * This reduces amount for data sent to user on load.
 */
export function groupArticles({
  initialInnholdstype = [],
  initialUndertema = [],
}: GpGroupedArticlesInputT): GpGroupedArticlesT {
  const articleMap = new Map<
    string,
    {
      innholdstype: string | null;
      undertema: string | null;
      article: GpArticleT;
    }
  >();

  initialInnholdstype.forEach((innholdstype) => {
    innholdstype.articles.forEach((article) => {
      articleMap.set(article._id, {
        article,
        innholdstype: innholdstype.title,
        undertema: null,
      });
    });
  });

  initialUndertema.forEach((tema) => {
    tema.articles.forEach((article) => {
      const found = articleMap.get(article._id);
      found
        ? articleMap.set(article._id, { ...found, undertema: tema.title })
        : articleMap.set(article._id, {
            undertema: tema.title,
            article,
            innholdstype: null,
          });
    });
  });
  return [...articleMap.values()];
}
