import { z } from "zod";
import pkg from "../../package.json" with { type: "json" };
import { minMatchCharLength, searchDocs } from "../helpers/fuse-search.js";
import {
  getAvailableVersions,
  searchMigrations,
} from "../helpers/search-migrations.js";
import { searchTokens } from "../helpers/search-tokens.js";
import type { McpTool } from "../types.js";

const CODEMOD_RUN_COMMAND = "npx @navikt/aksel codemod <name>";

const findDocsInputSchema = {
  kind: z
    .enum(["docs", "migrations", "tokens"])
    .optional()
    .default("docs")
    .describe(
      "What to search. 'docs' (default) = documentation pages (components, patterns, guides). 'migrations' = codemods for upgrading between major versions (use for any migration/upgrade/codemod/breaking-change question). 'tokens' = browse design tokens, then call aksel_get_token_details for full metadata.",
    ),
  query: z
    .string()
    .trim()
    .optional()
    .describe(
      "Keywords describing what you want. For kind='docs' prefer one or two words; component names work best (e.g. 'button', 'knapp', 'textfield', 'tailwind') and at least 3 characters are required. For kind='migrations' pass a version ('v8', '8', '7->8') or codemod keyword; omit to list all. For kind='tokens' pass a name/category keyword; omit to browse.",
    ),
  limit: z.number().int().min(1).max(20).optional().default(8),
};

function looksLikeToken(query: string) {
  const normalized = query.toLowerCase();
  return (
    /\b(token|color|colour|farge|farger)\b/.test(normalized) ||
    /\b(bg|text|border|surface)-/.test(normalized) ||
    /\b(shadow|skygge)-/.test(normalized) ||
    /\b(space|spacing|avstand)-/.test(normalized)
  );
}

function looksLikeMigration(query: string) {
  const normalized = query.toLowerCase();
  return (
    /\b(migration|migrate|migrering|codemod|upgrade|oppgrader|breaking)\b/.test(
      normalized,
    ) || /\bv\d+\b/.test(normalized)
  );
}

const findDocsTool: McpTool<typeof findDocsInputSchema> = {
  name: "aksel_find_docs",
  description:
    "Search Aksel documentation pages, design tokens, or version migrations. Accepts multi-word and Norwegian/English queries. Call this before aksel_get_doc / aksel_get_component_info. Use the 'kind' param to switch what you search: kind='migrations' lists codemods for version upgrades (v6→v7, v7→v8, etc.), and kind='tokens' browses design tokens (then call aksel_get_token_details for full metadata). If a docs query returns no results, retry with a single keyword (e.g. a component name) before falling back.",
  inputSchema: findDocsInputSchema,
  async callback({ kind, query, limit }) {
    if (kind === "migrations") {
      const results = searchMigrations(query);

      if (results.length === 0) {
        return JSON.stringify({
          kind,
          message: query
            ? `No migrations found for query: "${query}"`
            : "No migrations available.",
          availableVersions: getAvailableVersions(),
          hint: "Pass a version like 'v8' or '7->8', or omit query to list all codemods.",
        });
      }

      return JSON.stringify({
        kind,
        cliVersion: pkg.version,
        runCommand: CODEMOD_RUN_COMMAND,
        results,
      });
    }

    if (kind === "tokens") {
      const results = searchTokens(query, limit);

      if (results.length === 0) {
        return JSON.stringify({
          kind,
          message: `No tokens found for query: "${query}"`,
          hint: "Try a broader keyword (e.g. 'danger', 'neutral', 'shadow', 'space'), or omit query to browse. Call aksel_get_token_details for a specific token.",
        });
      }

      return JSON.stringify({
        kind,
        results,
        hint: "Call aksel_get_token_details with a token name for full metadata.",
      });
    }

    if (!query || query.length < minMatchCharLength) {
      if (query && looksLikeMigration(query)) {
        return JSON.stringify({
          kind: "docs",
          message: `query must be at least ${minMatchCharLength} characters for kind='docs'.`,
          hint: "This looks like a version migration. Retry with kind='migrations'.",
        });
      }

      if (query && looksLikeToken(query)) {
        return JSON.stringify({
          kind: "docs",
          message: `query must be at least ${minMatchCharLength} characters for kind='docs'.`,
          hint: "This looks like a design token. Retry with kind='tokens', or call aksel_get_token_details for a specific token.",
        });
      }

      return JSON.stringify({
        kind: "docs",
        message: `query must be at least ${minMatchCharLength} characters for kind='docs'.`,
        hint: "Provide a keyword such as a component name or category.",
      });
    }

    const searchResults = await searchDocs(query, limit);

    if (!searchResults) {
      return JSON.stringify({
        kind: "docs",
        message: `Failed to search docs for query: "${query}"`,
        hint: "Try again later.",
      });
    }

    if (searchResults.length === 0) {
      if (looksLikeToken(query)) {
        return JSON.stringify({
          kind: "docs",
          message: `No documentation pages found for query: "${query}"`,
          hint: "This looks like a design token. Retry with kind='tokens', or call aksel_get_token_details for a specific token.",
        });
      }

      if (looksLikeMigration(query)) {
        return JSON.stringify({
          kind: "docs",
          message: `No documentation pages found for query: "${query}"`,
          hint: "This looks like a version migration. Retry with kind='migrations'.",
        });
      }

      return JSON.stringify({
        kind: "docs",
        message: `No documentation pages found for query: "${query}"`,
        hint: "Try a broader keyword such as a component name or category.",
      });
    }

    return JSON.stringify({
      kind: "docs",
      query,
      results: searchResults,
    });
  },
};

export { findDocsTool };
