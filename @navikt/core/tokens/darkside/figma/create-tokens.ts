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
import { TokenTypes, tokenTypes } from "../util";
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
   * reference the original token in Figma with a 'VariableAlias'.
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
 * TODO:
 * - use this function to create a Figma config
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function extractFigmaDataType(token: FigmaToken): VariableResolvedDataType {
  if (token.type?.includes("color")) {
    return "COLOR";
  }
  if (token.type?.includes("radius") || token.type?.includes("spacing")) {
    return "FLOAT";
  }

  return "STRING";
}

/**
 * Allows us to extract the token name from the token object and create the correct grouping for Figma.
 */
function extractTokenName(token: TransformedToken) {
  if (!token.attributes?.item || typeof token.attributes.item !== "string") {
    throw new Error(`No item attribute found on token: ${token.name}`);
  }
  /**
   * Because of the `StyleDictionaryTokenConfig` type, we can assume that attributes.item will always exists.
   */
  let name = lodash.startCase(token.attributes.item);

  /**
   * By adding "/", we can create subgroups in Figma.
   */
  if (token.group) {
    let grouping = "";
    token.group.split(".").forEach((group: string) => {
      grouping += lodash.startCase(group) + "/".trim();
    });

    name = grouping + name;
  }

  /**
   * In the case we have a token "Text/Accent/Accent", we want to add a suffix to the name.
   */
  const nameKeys = new Set(name.split("/"));
  if (nameKeys.size !== name.split("/").length) {
    name += " Default";
  }

  /**
   * For pure value tokens, we want to add a prefix to the name to make it more readable in Figma.
   */
  if (token.type === tokenTypes["global-radius"]) {
    name = "Spacing " + name;
  } else if (token.type === tokenTypes["global-spacing"]) {
    name = "Spacing " + name;
  }

  return name;
}
