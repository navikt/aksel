import lodash from "lodash";
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
          ? prepareToken(
              { ...token, alias: extractTokenName(reference[0]) },
              dictionary,
            )
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
    name: extractTokenName(token),
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
      return remToPxValue(value);
    }
    case type === "global-spacing": {
      return remToPxValue(value);
    }
    default:
      return value;
  }
}

/**
 * Figma does not support relative units, so we need to convert rem to px.
 */
function remToPxValue(value: string) {
  return parseFloat(value.replace("rem", "")) * 16;
}

/**
 * Allows us to extract the token name from the token object and create the correct grouping for Figma.
 */
function extractTokenName(token: TransformedToken) {
  /**
   * Remove the "a-" prefix from the token name.
   */
  let name = lodash.startCase(token.name.slice(2));

  /**
   * TODO:
   * - Find a better way to handle "custom" renames for some tokens
   */
  if (token.name.startsWith("a-border-radius")) {
    name = name.replace("Border", "").trim();
  }

  /**
   * By adding "/", we can create subgroups in Figma.
   */
  if (token.group) {
    let grouping = "";
    token.group.split(".").forEach((group) => {
      grouping += lodash.startCase(group) + "/".trim();
    });
    return grouping + name;
  }
  return name;
}
