import Fuse from "fuse.js";
import { tokens } from "@navikt/ds-tokens/token_docs";
import { TokenForDocumentationT } from "../../types/tokens";

function tokenIndex(_tokens: TokenForDocumentationT[]) {
  return new Fuse(_tokens, {
    threshold: 0.3,
    keys: [
      { name: "name", weight: 0.9 },
      { name: "group", weight: 0.3 },
      { name: "category", weight: 0.3 },
      { name: "comment", weight: 0.3 },
      { name: "type", weight: 0.3 },
      { name: "role", weight: 0.3 },
      { name: "modifier", weight: 0.3 },
    ],
    shouldSort: false,
    ignoreLocation: true,
  });
}

function searchTokens(query: string): TokenForDocumentationT[] {
  return query
    ? tokenIndex(tokens)
        .search(query)
        .map((t) => t.item)
    : tokens;
}

export { searchTokens };
