import StyleDictionary from "style-dictionary";
import { Dictionary, TransformedToken } from "style-dictionary/types";
import { createPropertyFormatter, getReferences } from "style-dictionary/utils";
import tinycolor2 from "tinycolor2";
import {
  darkModeTokens,
  lightModeTokens,
  scaleTokens,
} from "../create-configuration";
import { TokenTypes } from "../util";
import { FigmaToken } from "./types";

const config = {
  light: lightModeTokens(),
  dark: darkModeTokens(),
  scale: scaleTokens(),
};

const createStyleDictionaryForCollection = (
  collection: keyof typeof config,
) => {
  return new StyleDictionary({
    tokens: config[collection],
    platforms: {
      [`figma-${collection}`]: {
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

export const getTokensListForCollection = async (
  collection: keyof typeof config,
) => {
  const tokensList: FigmaToken[] = [];
  const SD = createStyleDictionaryForCollection(collection);

  await SD.hasInitialized;

  /**
   * By adding aliases to the tokens, we can use the name as a lookup to
   * reference the original tokem in Figma with a 'VariableAlias'.
   * @see https://www.figma.com/plugin-docs/api/VariableAlias/
   */
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
): FigmaToken {
  const formatter = createPropertyFormatter({
    dictionary,
    format: "css",
  });

  const cssVariable = formatter(token);

  return {
    name: token.name,
    /* We can assume this since each config is typed with 'StyleDictionaryToken'  */
    type: token.type as TokenTypes,
    value: prepareValueForFigma(token.value, token.type as TokenTypes),
    alias: token.alias,
    comment: token.comment,
    group: token.group,
    code: {
      web: `var(${cssVariable.trim().split(": ")[0]})`,
    },
  };
}

function prepareValueForFigma(value: string, type: TokenTypes) {
  switch (true) {
    case type === "color" || type === "global-color": {
      const color = tinycolor2(value).toRgb();
      /* Figma requires rgb to be between 0 and 1*/
      return {
        r: color.r / 255,
        g: color.g / 255,
        b: color.b / 255,
        a: color.a * 1,
      };
    }
    case type === "global-radius": {
      return parseInt(value.replace("px", ""), 10);
    }
    case type === "global-spacing": {
      /* We have to convert rem -> px value */
      return parseFloat(value.replace("rem", "")) * 16;
    }
    default:
      return value;
  }
}
