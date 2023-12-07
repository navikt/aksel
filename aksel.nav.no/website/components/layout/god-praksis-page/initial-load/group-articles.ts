import { GpArticleListT } from "../types";

type GroupArticlesInputT = {
  innholdstyper: {
    title: string;
    articles: GpArticleListT["articles"];
  }[];

  undertema: {
    title: string;
    articles: GpArticleListT["articles"];
  }[];
};

type GroupArticlesOutT = {
  innholdstype: string | null;
  undertema: string | null;
  article: GpArticleListT["articles"][number];
}[];

/**
 * De-duplicates re-occuring articles and maps the to the matching innholdstype and undertema
 * This reduces amount for data sent to user on load.
 */
export function groupArticles({
  innholdstyper = [],
  undertema = [],
}: GroupArticlesInputT): GroupArticlesOutT {
  const articleMap = new Map<
    string,
    {
      innholdstype: string | null;
      undertema: string | null;
      article: GpArticleListT["articles"][number];
    }
  >();

  innholdstyper.forEach((innholdstype) => {
    innholdstype.articles.forEach((article) => {
      articleMap.set(article._id, {
        article,
        innholdstype: innholdstype.title,
        undertema: null,
      });
    });
  });

  undertema.forEach((tema) => {
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

  /* console.log([...articleMap.values()]); */

  return [...articleMap.values()];
}
