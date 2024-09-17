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

const config = {
  light: lightModeTokens,
  dark: darkModeTokens,
  scale: scaleTokens,
};

const initializeStyleDictionary = (mode: ColorThemeMode | "scale") => {
  return new StyleDictionary({
    tokens: config[mode](),
    platforms: {
      [`figma-${mode}`]: {
        transformGroup: "css",
        files: [
          {
            format: "custom-format",
          },
        ],
      },
    },
  });
};

export const getSDTokens = async (mode: ColorThemeMode | "scale") => {
  const tokensList: FigmaPreparedToken[] = [];
  const SD = initializeStyleDictionary(mode);

  await SD.hasInitialized;

  SD.registerFormat({
    name: "custom-format",
    format: async ({ dictionary }) => {
      const preparedTokens = dictionary.allTokens.map((token) => {
        const reference = getReferences(token.original, dictionary.tokens);
        return reference.length > 0
          ? prepareToken({ ...token, alias: reference[0].name }, dictionary)
          : prepareToken(token, dictionary);
      });
      tokensList.push(...preparedTokens);
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
