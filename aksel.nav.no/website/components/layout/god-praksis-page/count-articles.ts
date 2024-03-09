import { ParsedGPArticle } from "@/layout/god-praksis-page/interface";

export function countArticlesByUndertema(articles: ParsedGPArticle[]) {
  return articles.reduce((acc, article) => {
    const { undertema } = article;

    const innholdstype = article.innholdstype ?? "_";

    if (!acc[undertema]) {
      acc[undertema] = {};
    }
    if (!acc[undertema][innholdstype]) {
      acc[undertema][innholdstype] = 0;
    }
    acc[undertema][innholdstype]++;
    return acc;
  }, {});
}

export function countArticlesByInnholdstype(articles: ParsedGPArticle[]) {
  const count = articles.reduce((acc, article) => {
    const { innholdstype } = article;
    if (!innholdstype) {
      return acc;
    }

    const undertema = article.undertema ?? "_";

    if (!acc[innholdstype]) {
      acc[innholdstype] = {};
    }
    if (!acc[innholdstype][undertema]) {
      acc[innholdstype][undertema] = 0;
    }
    acc[innholdstype][undertema]++;
    return acc;
  }, {});
  return Object.keys(count).length === 0 ? null : count;
}

function initializeCounts(
  articles: ParsedGPArticle[],
  type: string,
): Record<string, number> {
  const counts: Record<string, number> = {};

  for (const article of articles) {
    const key = article[type];
    counts[key] = 0;
  }

  return counts;
}

export function getArticleCounts(
  articles: ParsedGPArticle[],
  filterUndertema?: string,
  filterInnholdstype?: string,
): {
  undertemaCounts: Record<string, number>;
  innholdstypeCounts: Record<string, number>;
} {
  /* const counts = initializeCounts(articles); */
  const undertemaCounts: Record<string, number> = initializeCounts(
    articles,
    "undertema",
  );
  const innholdstypeCounts: Record<string, number> = initializeCounts(
    articles,
    "innholdstype",
  );

  for (const article of articles) {
    if (!filterUndertema || article.undertema === filterUndertema) {
      innholdstypeCounts[article.innholdstype] =
        (innholdstypeCounts[article.innholdstype] || 0) + 1;
    }
    if (!filterInnholdstype || article.innholdstype === filterInnholdstype) {
      undertemaCounts[article.undertema] =
        (undertemaCounts[article.undertema] || 0) + 1;
    }
  }

  return { undertemaCounts, innholdstypeCounts };
}
