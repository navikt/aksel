//@ts-expect-error - No types available for (yet) this package, but it has the data we need
import { tokens } from "@navikt/ds-tokens/token_docs";
import type { McpResource } from "../types.js";

const URI = "aksel-tokens://list";
const MIME_TYPE = "application/json";

// Create lightweight summary for browsing (just name, comment, category, type)
const tokenSummary = tokens.map((token: any) => ({
  name: token.name,
  comment: token.comment,
  category: token.category,
  type: token.type,
}));

const designTokensResource: McpResource = {
  name: "Aksel Design Tokens List",
  uri: URI,
  description:
    "Lightweight list of all Aksel design tokens with names, descriptions, and categories. Use this to browse available tokens, then use the aksel_token_details tool to fetch full details for specific tokens.",
  mimeType: MIME_TYPE,
  async callback() {
    return {
      contents: [
        {
          uri: URI,
          mimeType: MIME_TYPE,
          text: JSON.stringify(tokenSummary, null, 2),
        },
      ],
    };
  },
};

export { designTokensResource, tokens };
