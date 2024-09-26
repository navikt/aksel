import lodash from "lodash";
import StyleDictionary from "style-dictionary";
import { Dictionary, TransformedToken } from "style-dictionary/types";
import { createPropertyFormatter, getReferences } from "style-dictionary/utils";
import {
  darkModeTokens,
  lightModeTokens,
  scaleTokens,
} from "../create-configuration";
import {
  type TokenGroup,
  type TokenTypes,
  tokenGroupLookup,
  tokenTypes,
} from "../util";
import type { FigmaToken } from "./figma-config.types";

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
      [collection]: {
        transformGroup: "css",
        files: [],
      },
    },
  });
};

export const getTokensForCollection = async (
  collection: keyof typeof config,
) => {
  const SD = createStyleDictionaryForCollection(collection);

  await SD.hasInitialized;

  const dictionary = await SD.getPlatformTokens(collection);

  return dictionary.allTokens.map((token) => {
    const reference = getReferences(token.original, dictionary.tokens);
    /*
     * Currently only supports 1 level of references.
     */
    return reference.length > 0
      ? prepareToken(
          { ...token, alias: createTokenName(reference[0]) },
          dictionary,
        )
      : prepareToken(token, dictionary);
  });
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
    name: createTokenName(token),
    /* We can assume this since each config is typed with 'StyleDictionaryToken'  */
    type: token.type as TokenTypes,
    value: figmaValue(token),
    alias: token.alias,
    comment: token.comment,
    group: token.group,
    code: {
      web: `var(${cssVariable.trim().split(": ")[0]})`,
    },
    ...figmaSettings(token),
  };
}

/**
 * @see https://www.figma.com/plugin-docs/api/VariableValue
 *
 * We do not need to handle the 'color' type since we can use Figma built-in for this
 * @see https://www.figma.com/plugin-docs/api/properties/figma-util-rgba
 */
export function figmaValue(token: TransformedToken): string | number {
  if (isRadiusToken(token) || isSpacingToken(token)) {
    const float = parseFloat(token.value.replace("px", "").replace("rem", ""));

    /*
     * Figma does not support relative units, so we need to convert rem to px.
     */
    if (token.value.includes("rem")) {
      return float * 16;
    }
    return float;
  }

  return token.value;
}

/**
 * Scopes allows us to define where in Figma the token can be used.
 * @see https://www.figma.com/plugin-docs/api/VariableScope
 */
function figmaSettings(token: TransformedToken): {
  figmaType: VariableResolvedDataType;
  scopes: VariableScope[];
} {
  if (isGlobalColor(token)) {
    return createFigmaSettings("COLOR", ["ALL_FILLS", "STROKE_COLOR"]);
  }
  if (isBackgroundColor(token)) {
    return createFigmaSettings("COLOR", ["FRAME_FILL", "SHAPE_FILL"]);
  }
  if (isBorderColor(token)) {
    return createFigmaSettings("COLOR", ["STROKE_COLOR"]);
  }
  if (isContrastColor(token) || isTextColor(token)) {
    return createFigmaSettings("COLOR", ["SHAPE_FILL", "TEXT_FILL"]);
  }
  if (isRadiusToken(token)) {
    return createFigmaSettings("FLOAT", ["CORNER_RADIUS"]);
  }
  if (isSpacingToken(token)) {
    return createFigmaSettings("FLOAT", ["GAP"]);
  }

  console.warn(`No fitting type or scope found for token: ${token.name}`);
  return createFigmaSettings("STRING", []);
}

function createFigmaSettings(
  figmaType: VariableResolvedDataType,
  scopes: VariableScope[],
): {
  figmaType: VariableResolvedDataType;
  scopes: VariableScope[];
} {
  return { figmaType, scopes };
}

/**
 * Allows us to extract the token name from the token object and create the correct grouping for Figma.
 */
export function createTokenName(token: TransformedToken) {
  if (!token.attributes?.item || typeof token.attributes.item !== "string") {
    throw new Error(`No item attribute found on token: ${token.name}`);
  }
  /*
   * Because of the `StyleDictionaryTokenConfig`-type, we can assume that attributes.item will always exists.
   */
  let name = lodash.startCase(token.attributes.item);

  if (token.group) {
    name = createGroupName(token.group) + name;
  }

  /*
   * In the case we have a token "Text/Accent/Accent", we want to add a suffix to the name.
   */
  const nameKeys = new Set(name.split("/"));
  if (nameKeys.size !== name.split("/").length) {
    name += " Default";
  }

  /*
   * For pure value tokens, we want to add a prefix to the name to make it more readable in Figma.
   */
  if (isRadiusToken(token)) {
    return "Radius " + name;
  }

  if (isSpacingToken(token)) {
    return "Spacing " + name;
  }

  return name;
}

/**
 * By splitting the group by ".", we can create a more readable group name in Figma.
 * @param group "background.primary"
 * @returns "Background/Primary/"
 * @see https://help.figma.com/hc/en-us/articles/14506821864087-Overview-of-variables-collections-and-modes#h_01H9V3QSVH2T1EYNXP7RNXZ8MV
 */
function createGroupName(group: string): string {
  return (
    group
      .split(".")
      .map((g) => lodash.startCase(g))
      .join("/") + "/"
  );
}

function isTokenOfSemanticColorGroup(
  token: TransformedToken | FigmaToken,
  groupType: keyof typeof tokenGroupLookup,
): boolean {
  const group = token.group as TokenGroup | undefined;
  if (!isSemanticColor(token)) {
    return false;
  }
  return group?.includes(tokenGroupLookup[groupType]) ?? false;
}

function isBackgroundColor(token: TransformedToken | FigmaToken): boolean {
  return isTokenOfSemanticColorGroup(token, "background");
}

function isBorderColor(token: TransformedToken | FigmaToken): boolean {
  return isTokenOfSemanticColorGroup(token, "border");
}

function isContrastColor(token: TransformedToken | FigmaToken): boolean {
  return isTokenOfSemanticColorGroup(token, "contrast");
}

function isTextColor(token: TransformedToken | FigmaToken): boolean {
  return isTokenOfSemanticColorGroup(token, "text");
}

export function isGlobalColor(token: TransformedToken | FigmaToken): boolean {
  const type = token.type as TokenTypes;
  return type === tokenTypes["global-color"];
}

export function isSemanticColor(token: TransformedToken | FigmaToken): boolean {
  const type = token.type as TokenTypes;
  return type === tokenTypes["color"];
}

export function isRadiusToken(token: TransformedToken | FigmaToken): boolean {
  const type = token.type as TokenTypes;
  return type?.includes(tokenTypes["global-radius"]);
}

export function isSpacingToken(token: TransformedToken | FigmaToken): boolean {
  const type = token.type as TokenTypes;
  return type?.includes(tokenTypes["global-spacing"]);
}
