import StyleDictionary from "style-dictionary";
import { Dictionary, TransformedToken } from "style-dictionary/types";
import { createPropertyFormatter, getReferences } from "style-dictionary/utils";
import {
  ColorThemeMode,
  darkModeTokens,
  lightModeTokens,
  scaleTokens,
} from "../util";
import { FigmaPreparedToken } from "./figma-types";

export const getSDTokens = async (mode: ColorThemeMode | "scale") => {
  const tokensList: FigmaPreparedToken[] = [];

  const config = {
    light: lightModeTokens,
    dark: darkModeTokens,
    scale: scaleTokens,
  };

  const SD = new StyleDictionary({
    tokens: config[mode](),
    platforms: {
      lightmode: {
        transformGroup: "css",
        files: [
          {
            format: "custom-format",
          },
        ],
      },
    },
  });

  await SD.hasInitialized;

  SD.registerFormat({
    name: "custom-format",
    format: async ({ dictionary }) => {
      for (const token of dictionary.allTokens) {
        if (!token.type) {
          throw new Error(`Token ${token.name} is missing type`);
        }
        const reference = getReferences(token.original, dictionary.tokens);

        if (reference.length > 0) {
          tokensList.push(
            prepareToken({ ...token, alias: reference[0].name }, dictionary),
          );
        } else {
          tokensList.push(prepareToken(token, dictionary));
        }
      }
    },
  });

  await SD.buildAllPlatforms();

  return tokensList;
};

function prepareToken(
  token: TransformedToken,
  dictionary: Dictionary,
): FigmaPreparedToken {
  return {
    name: token.name,
    type: token.type,
    value: token.value,
    alias: token.alias,
    comment: token.comment,
    group: token.group,
    code: {
      web: formatTokenToWeb(token, dictionary),
    },
  };
}

function formatTokenToWeb(token: TransformedToken, dictionary: Dictionary) {
  const formatter = createPropertyFormatter({
    dictionary,
    format: "css",
  });

  const outToken = formatter(token);
  return `var(${outToken.trim().split(": ")[0]})`;
}
