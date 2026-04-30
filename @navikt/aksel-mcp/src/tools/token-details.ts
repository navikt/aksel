import { z } from "zod";
import { tokens } from "../resources/design-tokens.js";
import type { McpTool } from "../types.js";

const tokenNames = Array.from(
  new Set(tokens.map((token: any) => token.name)),
).sort();

const tokenNameSchema = z.enum(tokenNames as [string, ...string[]], {
  invalid_type_error: "tokenName must be a string",
  required_error: "tokenName is required",
});

const tokenDetailsInputSchema = {
  tokenName: tokenNameSchema.describe(
    "The exact name of the token to fetch details for (e.g., 'bg-neutral-moderate', 'shadow-dialog')",
  ),
};

const tokenDetailsTool: McpTool<typeof tokenDetailsInputSchema> = {
  name: "aksel_token_details",
  description:
    "Fetch complete details for a specific Aksel design token by name. Returns all metadata including value, rawValue, CSS/SCSS/LESS/JS accessors, semantic information, and usage guidelines.",
  inputSchema: tokenDetailsInputSchema,
  async callback({ tokenName }) {
    const token = tokens.find((t: any) => t.name === tokenName);

    if (!token) {
      // Provide helpful suggestions for similar token names
      const similarTokens = tokens
        .filter((t: any) => t.name.includes(tokenName.toLowerCase()))
        .slice(0, 5)
        .map((t: any) => t.name);

      if (similarTokens.length > 0) {
        return JSON.stringify(
          {
            error: `Token '${tokenName}' not found`,
            suggestion: "Did you mean one of these?",
            similarTokens,
          },
          null,
          2,
        );
      }

      return JSON.stringify(
        {
          error: `Token '${tokenName}' not found`,
          hint: "Use the aksel-tokens://list resource to browse available tokens",
        },
        null,
        2,
      );
    }

    return JSON.stringify(token, null, 2);
  },
};

export { tokenDetailsTool };
