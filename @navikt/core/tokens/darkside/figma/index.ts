import fs from "fs";
import { version } from "../../package.json";
import {
  getTokensForCollection,
  isGlobalColor,
  isRadiusToken,
  isSemanticColor,
  isSpacingToken,
} from "./create-tokens";
import { FigmaTokenConfig } from "./figma-config.types";

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
      timestamp: new Date().toLocaleString("no-NO", {
        timeZone: "Europe/Oslo",
      }),
      globalLight: {
        name: "Global colors light",
        hideFromPublishing: true,
        token: lightTokens.filter(isGlobalColor),
      },
      globalDark: {
        name: "Global colors dark",
        hideFromPublishing: true,
        token: darkTokens.filter(isGlobalColor),
      },
      semanticColors: {
        name: "Semantic colors",
        hideFromPublishing: false,
        token: lightTokens.filter(isSemanticColor),
      },
      radius: {
        name: "Radius",
        hideFromPublishing: false,
        token: scaleTokens.filter(isRadiusToken),
      },
      spacing: {
        name: "Spacing",
        hideFromPublishing: false,
        token: scaleTokens.filter(isSpacingToken),
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
