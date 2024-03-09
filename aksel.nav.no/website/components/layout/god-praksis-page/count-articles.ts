import { ParsedGPArticle } from "@/layout/god-praksis-page/interface";

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
