import Fuse from "fuse.js";
import { type TokenDocT, tokens } from "@navikt/ds-tokens/token_docs";

let tokenSearchIndex: Fuse<TokenDocT> | undefined;

function getTokenSearchIndex() {
  if (!tokenSearchIndex) {
    tokenSearchIndex = new Fuse(tokens, {
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

  return tokenSearchIndex;
}

function searchTokens(query: string): TokenDocT[] {
  return query
    ? getTokenSearchIndex()
        .search(query)
        .map((t) => t.item)
    : tokens;
}

export { searchTokens };
