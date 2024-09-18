import fs from "fs";
import { tokenTypes } from "../util";
import { getTokensListForCollection } from "./create-tokens";
import { FigmaTokenConfig } from "./types";

buildFigmaConfig();

/**
 * Builds a configuration JSON that can be used by Figma-plugins to
 * generate 'variables' in a Figma-file based on our tokens.
 */
async function buildFigmaConfig() {
  try {
    const lightTokens = await getTokensListForCollection("light");
    const darkTokens = await getTokensListForCollection("dark");
    const scaleTokens = await getTokensListForCollection("scale");

    const preparedConfig: FigmaTokenConfig = {
      globalLight: {
        name: "Global colors light",
        hideFromPublishing: true,
        token: lightTokens.filter(
          (token) => token.type === tokenTypes["global-color"],
        ),
      },
      globalDark: {
        name: "Global colors dark",
        hideFromPublishing: true,
        token: darkTokens.filter(
          (token) => token.type === tokenTypes["global-color"],
        ),
      },
      semanticColors: {
        name: "Semantic colors",
        hideFromPublishing: false,
        token: lightTokens.filter(
          (token) => token.type === tokenTypes["color"],
        ),
      },
      radius: {
        name: "Radius",
        hideFromPublishing: false,
        token: scaleTokens.filter(
          (token) => token.type === tokenTypes["global-radius"],
        ),
      },
      spacing: {
        name: "Spacing",
        hideFromPublishing: false,
        token: scaleTokens.filter(
          (token) => token.type === tokenTypes["global-spacing"],
        ),
      },
    };

    fs.writeFileSync(
      "./figma-config.json",
      JSON.stringify(preparedConfig, null, 2),
    );
  } catch (error) {
    console.error("Error building Figma config:", error);
  }
}
