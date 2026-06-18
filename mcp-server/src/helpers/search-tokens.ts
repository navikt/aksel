import Fuse, { type IFuseOptions } from "fuse.js";
import { tokens } from "../resources/tokens-catalog.js";

type TokenSummary = {
  name: string;
  comment?: string;
  category: string;
  type: string;
};

const tokenSummaries: TokenSummary[] = tokens.map((token) => ({
  name: token.name,
  comment: token.comment,
  category: token.category,
  type: token.type,
}));

const fuseKeys: NonNullable<IFuseOptions<TokenSummary>["keys"]> = [
  { name: "name", weight: 100 },
  { name: "category", weight: 40 },
  { name: "comment", weight: 20 },
];

const fuseOptions: IFuseOptions<TokenSummary> = {
  keys: fuseKeys,
  includeScore: true,
  shouldSort: true,
  minMatchCharLength: 2,
  ignoreLocation: true,
  threshold: 0.3,
  distance: 50,
  useTokenSearch: true,
  ignoreDiacritics: true,
};

const fuse = new Fuse(tokenSummaries, fuseOptions);

/**
 * Browses/filters the token catalog. With no query the first `limit` tokens are
 * returned; otherwise the query is fuzzy-matched against name/category/comment.
 */
function searchTokens(
  query: string | undefined,
  limit: number,
): TokenSummary[] {
  if (!query) {
    return tokenSummaries.slice(0, limit);
  }

  return fuse.search(query.trim(), { limit }).map(({ item }) => item);
}

export { searchTokens };
export type { TokenSummary };
