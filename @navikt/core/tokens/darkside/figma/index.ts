import fs from "fs";
import { version } from "../../package.json";
import {
  getTokensForCollection,
  isGlobalColor,
  isRadiusToken,
  isSemanticColor,
  isSpacingToken,
} from "./create-tokens";
import { FigmaTokenConfig } from "./types";

buildFigmaConfig();

/**
 * Builds a configuration JSON that can be used by Figma-plugins to
 * generate 'variables' in a Figma-file based on our tokens.
 */
async function buildFigmaConfig() {
  try {
    const lightTokens = await getTokensForCollection("light");
    const darkTokens = await getTokensForCollection("dark");
    const scaleTokens = await getTokensForCollection("scale");

    const preparedConfig: FigmaTokenConfig = {
      version,
      date: new Date().toISOString(),
      globalLight: {
        name: "Global colors light",
        hideFromPublishing: true,
        token: lightTokens.filter((token) => isGlobalColor(token)),
      },
      globalDark: {
        name: "Global colors dark",
        hideFromPublishing: true,
        token: darkTokens.filter((token) => isGlobalColor(token)),
      },
      semanticColors: {
        name: "Semantic colors",
        hideFromPublishing: false,
        token: lightTokens.filter((token) => isSemanticColor(token)),
      },
      radius: {
        name: "Radius",
        hideFromPublishing: false,
        token: scaleTokens.filter((token) => isRadiusToken(token)),
      },
      spacing: {
        name: "Spacing",
        hideFromPublishing: false,
        token: scaleTokens.filter((token) => isSpacingToken(token)),
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
