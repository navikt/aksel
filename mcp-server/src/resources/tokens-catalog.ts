import { tokens } from "@navikt/ds-tokens/token_docs";
import type { McpResource } from "../types.js";

const URI = "aksel-tokens://catalog";
const MIME_TYPE = "application/json";

type TokenSummary = {
  name: string;
  comment?: string;
  category: string;
  type: string;
};

const tokenSummary: TokenSummary[] = tokens.map((token) => ({
  name: token.name,
  comment: token.comment,
  category: token.category,
  type: token.type,
}));

const tokensCatalogResource: McpResource = {
  name: "Aksel Tokens Catalog",
  uri: URI,
  description:
    "Lightweight catalog of Aksel design tokens with names, descriptions, categories, and types. Use this to browse tokens, then call aksel_get_token_details for full token metadata.",
  mimeType: MIME_TYPE,
  async callback() {
    return {
      contents: [
        {
          uri: URI,
          mimeType: MIME_TYPE,
          text: JSON.stringify(tokenSummary),
        },
      ],
    };
  },
};

export { tokensCatalogResource, tokens, tokenSummary };
export type { TokenSummary };
