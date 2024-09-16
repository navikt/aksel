import fs from "fs";
import { FigmaTokenConfig } from "./figma-types";
import {
  getRadiusTokens,
  getSpacingTokens,
  getTokensByColorRoles,
  getUniqueColorTokens,
} from "./sd-parser";

/**
 * Builds a configuration JSON that can be used by Figma-plugins to
 * generate 'variables' in a Figma-file based on our tokens.
 */
export async function buildFigmaConfig() {
  const { globalLightTokens, globalDarkTokens, semanticTokens } =
    await getTokensByColorRoles();
  const { radiusTokens } = await getRadiusTokens();
  const { spacingTokens } = await getSpacingTokens();
  const { uniqueSemanticTokens } = await getUniqueColorTokens();

  const preparedConfig: FigmaTokenConfig = {
    globalLight: {
      collection: "Global colors light",
      hideFromPublishing: true,
      token: globalLightTokens,
    },
    globalDark: {
      collection: "Global colors dark",
      hideFromPublishing: true,
      token: globalDarkTokens,
    },
    semanticColors: {
      collection: "Semantic colors",
      hideFromPublishing: false,
      token: [...semanticTokens, ...uniqueSemanticTokens],
    },
    radius: {
      collection: "Radius",
      hideFromPublishing: false,
      token: radiusTokens,
    },
    spacing: {
      collection: "Spacing",
      hideFromPublishing: false,
      token: spacingTokens,
    },
  };

  fs.writeFileSync(
    "./figma-config.json",
    JSON.stringify(preparedConfig, null, 2),
  );
}
