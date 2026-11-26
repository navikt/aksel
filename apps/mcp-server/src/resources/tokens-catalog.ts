import {
  type TokenDocT,
  tokens as dsTokens,
} from "@navikt/ds-tokens/token_docs";
import type { McpResource } from "../types.js";

const URI = "aksel-tokens://catalog";
const MIME_TYPE = "application/json";

type ThemedBaseCategory = {
  category: "backgroundColor" | "textColor" | "borderColor";
  categoryTitle: "Bakgrunnsfarger" | "Tekstfarger" | "Kantlinjefarger";
};

type ThemedBaseToken = {
  name: string;
  value: string;
  cssValue: string;
  resolvesTo: string;
  defaultRole: "accent";
  comment: string;
  type: "themed-role";
  category: ThemedBaseCategory["category"];
  categoryTitle: ThemedBaseCategory["categoryTitle"];
  role: "themed-role";
  modifier: string;
};

type CatalogToken = TokenDocT | ThemedBaseToken;

type TokenSummary = {
  name: string;
  comment?: string;
  category: string;
  type: string;
};

const themedBaseCategories: Record<
  "bg" | "text" | "border",
  ThemedBaseCategory
> = {
  bg: { category: "backgroundColor", categoryTitle: "Bakgrunnsfarger" },
  text: { category: "textColor", categoryTitle: "Tekstfarger" },
  border: { category: "borderColor", categoryTitle: "Kantlinjefarger" },
};

/**
 * Dynamic CSS-only base tokens emitted per `[data-color="<role>"]` by
 * `@navikt/ds-tokens` (`semantic-themed-base.tokens.ts`), which are not
 * included in `@navikt/ds-tokens/token_docs` or JS/SCSS/LESS exports.
 */
const themedBaseSpecs: ReadonlyArray<{
  prefix: "bg" | "text" | "border";
  modifier: string;
  resolvesSuffix?: string;
}> = [
  { prefix: "bg", modifier: "soft" },
  { prefix: "bg", modifier: "softA" },
  { prefix: "bg", modifier: "moderate" },
  { prefix: "bg", modifier: "moderateA" },
  { prefix: "bg", modifier: "moderate-hover" },
  { prefix: "bg", modifier: "moderate-hoverA" },
  { prefix: "bg", modifier: "moderate-pressed" },
  { prefix: "bg", modifier: "moderate-pressedA" },
  { prefix: "bg", modifier: "strong" },
  { prefix: "bg", modifier: "strong-hover" },
  { prefix: "bg", modifier: "strong-pressed" },
  { prefix: "text", modifier: "default", resolvesSuffix: "" },
  { prefix: "text", modifier: "subtle" },
  { prefix: "text", modifier: "decoration" },
  { prefix: "text", modifier: "contrast" },
  { prefix: "border", modifier: "default", resolvesSuffix: "" },
  { prefix: "border", modifier: "subtle" },
  { prefix: "border", modifier: "subtleA" },
  { prefix: "border", modifier: "strong" },
];

const themedBaseTokens: ThemedBaseToken[] = themedBaseSpecs.map(
  ({ prefix, modifier, resolvesSuffix }) => {
    const name = `${prefix}-${modifier}`;
    const suffix =
      resolvesSuffix === undefined ? `-${modifier}` : resolvesSuffix;
    const resolvesTo = `var(--ax-${prefix}-<color>${suffix})`;
    const exampleNeutral = `${prefix}-neutral${suffix}`;
    const exampleAccent = `${prefix}-accent${suffix}`;
    const { category, categoryTitle } = themedBaseCategories[prefix];

    return {
      name,
      value: `var(--ax-${name})`,
      cssValue: `var(--ax-${name})`,
      resolvesTo,
      defaultRole: "accent",
      comment: `Dynamic CSS-only base token scoped by data-color (defaults to 'accent' on :root). Resolves to ${resolvesTo}. Not exported in JS/SCSS/LESS; use explicit role tokens (e.g. ${exampleNeutral}, ${exampleAccent}) for static usage.`,
      type: "themed-role",
      category,
      categoryTitle,
      role: "themed-role",
      modifier,
    };
  },
);

const tokens: CatalogToken[] = [...dsTokens, ...themedBaseTokens];

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
export type { CatalogToken, ThemedBaseToken, TokenSummary };
