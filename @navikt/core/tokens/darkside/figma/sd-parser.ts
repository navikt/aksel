import StyleDictionary from "style-dictionary";
import { Dictionary, TransformedToken } from "style-dictionary/types";
import { createPropertyFormatter, getReferences } from "style-dictionary/utils";
import {
  completeGlobalLightScale,
  getGlobalColorScale,
} from "../tokens/global";
import { radiusTokenConfig } from "../tokens/radius";
import { spacingTokenConfig } from "../tokens/spacing";
import {
  tokenConfigForRole,
  tokenConfigForUniqueTokens,
} from "../tokens/token-configs";
import {
  FigmaPreparedToken,
  FigmaTokenTypes,
  colorThemeModes,
  globalColorRoles,
  tokensWithPrefix,
} from "../tokens/util";

export const getTokensByColorRoles = async (): Promise<{
  globalLightTokens: FigmaPreparedToken[];
  globalDarkTokens: FigmaPreparedToken[];
  semanticTokens: FigmaPreparedToken[];
}> => {
  const globalLightTokens: FigmaPreparedToken[] = [];
  const globalDarkTokens: FigmaPreparedToken[] = [];
  const semanticTokens: FigmaPreparedToken[] = [];

  for (const role of globalColorRoles) {
    for (const theme of colorThemeModes) {
      const SD = new StyleDictionary({
        tokens: tokensWithPrefix({
          ...tokenConfigForRole(role),
          ...getGlobalColorScale(role, theme),
        }),
        platforms: {
          [`${role}-${theme}`]: {
            transformGroup: "css",
            files: [
              {
                format: "custom-mode",
              },
            ],
          },
        },
      });

      await SD.hasInitialized;

      SD.registerFormat({
        name: `custom-mode`,
        format: ({ dictionary }) => {
          for (const token of dictionary.allTokens) {
            if (token?.type?.includes("global")) {
              if (theme === "light") {
                globalLightTokens.push(
                  prepareToken(token, "color", dictionary),
                );
              } else {
                globalDarkTokens.push(prepareToken(token, "color", dictionary));
              }
            } else if (!semanticTokens.find((t) => t.name === token.name)) {
              const reference = getReferences(
                token.original,
                dictionary.tokens,
              );

              semanticTokens.push(
                prepareToken(
                  { ...token, alias: reference[0].name },
                  "color",
                  dictionary,
                ),
              );
            }
          }
        },
      });

      await SD.buildAllPlatforms();
    }
  }

  return {
    globalLightTokens,
    globalDarkTokens,
    semanticTokens,
  };
};

export const getUniqueColorTokens = async (): Promise<{
  uniqueSemanticTokens: FigmaPreparedToken[];
}> => {
  const uniqueSemanticTokens: FigmaPreparedToken[] = [];

  const SD = new StyleDictionary({
    tokens: tokensWithPrefix({
      ...tokenConfigForUniqueTokens(),
      ...completeGlobalLightScale(),
    }),
    platforms: {
      uniqueSemanticTokens: {
        transformGroup: "css",
        files: [
          {
            format: "custom-mode",
          },
        ],
      },
    },
  });

  await SD.hasInitialized;

  SD.registerFormat({
    name: `custom-mode`,
    format: ({ dictionary }) => {
      for (const token of dictionary.allTokens) {
        if (token?.type?.includes("global")) {
          continue;
        } else if (!uniqueSemanticTokens.find((t) => t.name === token.name)) {
          const reference = getReferences(token.original, dictionary.tokens);

          uniqueSemanticTokens.push(
            prepareToken(
              { ...token, alias: reference[0].name },
              "color",
              dictionary,
            ),
          );
        }
      }
    },
  });

  await SD.buildAllPlatforms();

  return {
    uniqueSemanticTokens,
  };
};

export const getSpacingTokens = async (): Promise<{
  spacingTokens: FigmaPreparedToken[];
}> => {
  const spacingTokens: FigmaPreparedToken[] = [];

  const SD = new StyleDictionary({
    tokens: tokensWithPrefix(spacingTokenConfig),
    platforms: {
      spacing: {
        transformGroup: "css",
        files: [
          {
            format: "custom-mode",
          },
        ],
      },
    },
  });

  await SD.hasInitialized;

  SD.registerFormat({
    name: `custom-mode`,
    format: ({ dictionary }) => {
      for (const token of dictionary.allTokens) {
        spacingTokens.push(prepareToken(token, "spacing", dictionary));
      }
    },
  });

  await SD.buildAllPlatforms();

  return {
    spacingTokens,
  };
};

export const getRadiusTokens = async (): Promise<{
  radiusTokens: FigmaPreparedToken[];
}> => {
  const radiusTokens: FigmaPreparedToken[] = [];

  const SD = new StyleDictionary({
    tokens: tokensWithPrefix(radiusTokenConfig),
    platforms: {
      radius: {
        transformGroup: "css",
        files: [
          {
            format: "custom-mode",
          },
        ],
      },
    },
  });

  await SD.hasInitialized;

  SD.registerFormat({
    name: `custom-mode`,
    format: ({ dictionary }) => {
      for (const token of dictionary.allTokens) {
        radiusTokens.push(prepareToken(token, "radius", dictionary));
      }
    },
  });

  await SD.buildAllPlatforms();

  return {
    radiusTokens,
  };
};

function prepareToken(
  token: TransformedToken,
  type: FigmaTokenTypes,
  dictionary: Dictionary,
): FigmaPreparedToken {
  return {
    name: token.name,
    type,
    value: token.value,
    alias: token.alias,
    comment: token.comment,
    group: token.group,
    code: {
      web: formatTokenToWeb(token, dictionary),
    },
  };
}

export function formatTokenToWeb(
  token: TransformedToken,
  dictionary: Dictionary,
) {
  const formatter = createPropertyFormatter({
    dictionary,
    format: "css",
  });

  const outToken = formatter(token);
  return `var(${outToken.trim().split(": ")[0]})`;
}
