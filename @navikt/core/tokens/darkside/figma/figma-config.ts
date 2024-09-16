import fs from "fs";
import { TokenTypes } from "../util";
import { FigmaTokenConfig } from "./figma-types";
import { getSDTokens } from "./sd-parser";

/**
 * Builds a configuration JSON that can be used by Figma-plugins to
 * generate 'variables' in a Figma-file based on our tokens.
 */
export async function buildFigmaConfig() {
  const lightTokens = await getSDTokens("light");
  const darkTokens = await getSDTokens("dark");
  const scaleTokens = await getSDTokens("scale");

  const preparedConfig: FigmaTokenConfig = {
    globalLight: {
      collection: "Global colors light",
      hideFromPublishing: true,
      token: lightTokens.filter(
        (token) => token.type === TokenTypes.GLOBAL_COLOR,
      ),
    },
    globalDark: {
      collection: "Global colors dark",
      hideFromPublishing: true,
      token: darkTokens.filter(
        (token) => token.type === TokenTypes.GLOBAL_COLOR,
      ),
    },
    semanticColors: {
      collection: "Semantic colors",
      hideFromPublishing: false,
      token: lightTokens.filter((token) => token.type === TokenTypes.COLOR),
    },
    radius: {
      collection: "Radius",
      hideFromPublishing: false,
      token: scaleTokens.filter(
        (token) => token.type === TokenTypes.GLOBAL_RADIUS,
      ),
    },
    spacing: {
      collection: "Spacing",
      hideFromPublishing: false,
      token: scaleTokens.filter(
        (token) => token.type === TokenTypes.GLOBAL_SPACING,
      ),
    },
  };

  fs.writeFileSync(
    "./figma-config.json",
    JSON.stringify(preparedConfig, null, 2),
  );
}
