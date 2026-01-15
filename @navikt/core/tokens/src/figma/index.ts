import fs from "node:fs";
import { version } from "../../package.json";
import {
  getTokensForCollection,
  isGlobalColor,
  isRadiusToken,
  isSemanticColor,
  isSpaceToken,
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

      colors: {
        light: {
          name: "light",
          global: {
            name: "Global colors light",
            hideFromPublishing: true,
            tokens: lightTokens.filter(isGlobalColor),
          },
          semantic: {
            name: "Semantic colors",
            hideFromPublishing: false,
            tokens: lightTokens.filter(isSemanticColor),
          },
        },
        dark: {
          name: "dark",
          global: {
            name: "Global colors dark",
            hideFromPublishing: true,
            tokens: darkTokens.filter(isGlobalColor),
          },
          semantic: {
            name: "Semantic colors",
            hideFromPublishing: false,
            tokens: darkTokens.filter(isSemanticColor),
          },
        },
      },
      radius: {
        name: "Radius",
        hideFromPublishing: false,
        tokens: scaleTokens.filter(isRadiusToken),
      },
      space: {
        name: "Space",
        hideFromPublishing: false,
        tokens: scaleTokens.filter(isSpaceToken),
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
