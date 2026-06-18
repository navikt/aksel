import { z } from "zod";
import { searchTokens } from "../helpers/search-tokens.js";
import { tokens } from "../resources/tokens-catalog.js";
import type { McpTool } from "../types.js";

const getTokenDetailsInputSchema = {
  tokenName: z
    .string({
      invalid_type_error: "tokenName must be a string",
      required_error: "tokenName is required",
    })
    .trim()
    .min(1, "tokenName is required")
    .describe(
      "Token name, e.g. 'bg-neutral-moderate', 'text-danger', 'shadow-dialog'. Tokens follow '<role>-<tone>-<emphasis>' patterns. To discover names, browse with aksel_find_docs using kind='tokens'.",
    ),
};

const getTokenDetailsTool: McpTool<typeof getTokenDetailsInputSchema> = {
  name: "aksel_get_token_details",
  description:
    "Look up an Aksel design token by name and get its value, accessors (CSS/SCSS/LESS/JS), semantics, and usage. THIS is the right tool for any token/color question — do not use aksel_find_docs (kind='docs') for tokens. Unknown or outdated names (e.g. v7 'text-action') return the closest existing tokens. To browse all tokens, call aksel_find_docs with kind='tokens'.",
  inputSchema: getTokenDetailsInputSchema,
  async callback({ tokenName }) {
    const token = tokens.find((t) => t.name === tokenName);

    if (!token) {
      const similarTokens = searchTokens(tokenName, 5).map((t) => t.name);

      if (similarTokens.length > 0) {
        return JSON.stringify({
          error: `Token '${tokenName}' not found`,
          suggestion: "Did you mean one of these?",
          similarTokens,
        });
      }

      return JSON.stringify({
        error: `Token '${tokenName}' not found`,
        hint: "Browse available tokens with aksel_find_docs using kind='tokens'.",
      });
    }

    return JSON.stringify(token);
  },
};

export { getTokenDetailsTool };
