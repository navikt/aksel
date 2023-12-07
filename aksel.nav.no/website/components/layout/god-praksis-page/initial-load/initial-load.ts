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
  articles: GpArticleListT["articles"];
}[];

/*
type GroupArticlesOutT = {
  innholdstype: "teori";
  undertema: null;
  articles: 6;
}[];

type GroupArticlesOutT = {
  innholdstype: retningslinje;
  undertema: "testing";
  articles: 5;
}[];

type GroupArticlesOutT = {
  innholdstype: null;
  undertema: "Etterlevelse";
  articles: 6;
}[];


*/

export function groupArticles({
  innholdstyper,
  undertema,
}: GroupArticlesInputT): GroupArticlesOutT {
  const output: GroupArticlesOutT = [];

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

  return output;
}
