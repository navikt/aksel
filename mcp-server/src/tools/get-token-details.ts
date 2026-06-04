import { z } from "zod";
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
      "The token name to fetch details for (e.g., 'bg-neutral-moderate', 'shadow-dialog'). Use the aksel-tokens://catalog resource to browse available tokens.",
    ),
};

const getTokenDetailsTool: McpTool<typeof getTokenDetailsInputSchema> = {
  name: "aksel_get_token_details",
  description:
    "Fetch complete details for a specific Aksel design token by name. Returns all metadata including value, rawValue, CSS/SCSS/LESS/JS accessors, semantic information, and usage guidelines.",
  inputSchema: getTokenDetailsInputSchema,
  async callback({ tokenName }) {
    const token = tokens.find((t) => t.name === tokenName);

    if (!token) {
      const similarTokens = tokens
        .filter((t) => t.name.toLowerCase().includes(tokenName.toLowerCase()))
        .slice(0, 5)
        .map((t) => t.name);

      if (similarTokens.length > 0) {
        return JSON.stringify({
          error: `Token '${tokenName}' not found`,
          suggestion: "Did you mean one of these?",
          similarTokens,
        });
      }

      return JSON.stringify({
        error: `Token '${tokenName}' not found`,
        hint: "Use the aksel-tokens://catalog resource to browse available tokens",
      });
    }

    return JSON.stringify(token);
  },
};

export { getTokenDetailsTool };
