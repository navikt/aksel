import { ParsedGPArticle } from "@/layout/god-praksis-page/interface";

/**
 * To make sure that all keys are present in the counts object,
 * we initialize the counts object with all possible keys.
 */
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

/**
 * Count the number of articles for each undertema and innholdstype.
 * If filterUndertema or filterInnholdstype is provided, only count the articles that match the filter.
 *  The key in Record is the undertema or innholdstype name
 */
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
