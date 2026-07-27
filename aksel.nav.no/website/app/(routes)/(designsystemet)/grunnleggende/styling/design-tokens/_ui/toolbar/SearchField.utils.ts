import Fuse from "fuse.js";
import { type TokenDocT, tokens } from "@navikt/ds-tokens/token_docs";

function tokenIndex(_tokens: TokenDocT[]) {
  return new Fuse(_tokens, {
    threshold: 0.25,
    keys: [
      { name: "name", weight: 0.9 },
      { name: "group", weight: 0.3 },
      { name: "category", weight: 0.7 },
      { name: "categoryTitle", weight: 0.7 },
      { name: "comment", weight: 0.3 },
      { name: "type", weight: 0.7 },
      { name: "role", weight: 0.7 },
      { name: "modifier", weight: 0.7 },
    ],
    //shouldSort: false,
    ignoreLocation: true,
  });
}

function searchTokens(query: string): TokenDocT[] {
  return query
    ? tokenIndex(tokens)
        .search(query)
        .map((t) => t.item)
    : tokens;
}

export { searchTokens };
