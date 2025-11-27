import lodash from "lodash";
import StyleDictionary from "style-dictionary";
import { type Dictionary, type TransformedToken } from "style-dictionary/types";
import { createPropertyFormatter, getReferences } from "style-dictionary/utils";
import { transformCSS } from "../style-dictionary.formats";
import { darkModeTokens, lightModeTokens, scaleTokens } from "../tokens.config";
import {
  type SemanticTokenGroups,
  type StyleDictionaryToken,
  type TokenTypes,
} from "../tokens.util";
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
        transforms: ["name/alpha-suffix"],
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
  SD.registerTransform(transformCSS);

  const dictionary = await SD.getPlatformTokens(collection);

  return dictionary.allTokens
    .filter((token) => !token.figmaIgnore)
    .map((token) => {
      const reference = getReferences(token.original, dictionary.tokens);
      /*
       * Currently only supports 1 level of references.
       */
      return reference.length > 0
        ? prepareToken(
            {
              ...(token as TransformedTokenWithScopes),
              alias: createTokenName(reference[0]),
            },
            dictionary,
          )
        : prepareToken(token as TransformedTokenWithScopes, dictionary);
    });
};

type TransformedTokenWithScopes = TransformedToken & {
  scopes: StyleDictionaryToken<TokenTypes>["scopes"];
};

function prepareToken(
  token: TransformedTokenWithScopes,
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
      WEB: `var(${cssVariable.trim().split(": ")[0]})`,
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
  if (isRadiusToken(token) || isSpaceToken(token)) {
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
function figmaSettings(token: TransformedTokenWithScopes): {
  figmaType: VariableResolvedDataType;
  scopes: VariableScope[];
} {
  let setting: ReturnType<typeof figmaSettings> | undefined;

  if (isGlobalColor(token)) {
    setting = createFigmaSettings("COLOR", ["ALL_FILLS", "STROKE_COLOR"]);
  } else if (isTokenOfSemanticColorGroup(token, "background")) {
    setting = createFigmaSettings("COLOR", ["FRAME_FILL", "SHAPE_FILL"]);
  } else if (isTokenOfSemanticColorGroup(token, "border")) {
    setting = createFigmaSettings("COLOR", ["STROKE_COLOR"]);
  } else if (isTokenOfSemanticColorGroup(token, "text")) {
    setting = createFigmaSettings("COLOR", ["SHAPE_FILL", "TEXT_FILL"]);
  } else if (isRadiusToken(token)) {
    setting = createFigmaSettings("FLOAT", ["CORNER_RADIUS"]);
  } else if (isSpaceToken(token)) {
    setting = createFigmaSettings("FLOAT", ["GAP"]);
  }

  if (!setting) {
    console.warn(`No fitting type or scope found for token: ${token.name}`);
    return createFigmaSettings("STRING", []);
  }

  token.scopes && setting.scopes.push(...token.scopes);

  return setting;
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

  if (isSpaceToken(token)) {
    return "Space " + name;
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
  groupType: SemanticTokenGroups,
): boolean {
  const group = token.group as StyleDictionaryToken<TokenTypes>["group"];
  if (!isSemanticColor(token)) {
    return false;
  }
  return group?.includes(groupType) ?? false;
}

export function isGlobalColor(token: TransformedToken | FigmaToken): boolean {
  const type = token.type as TokenTypes;
  return type === "global-color";
}

export function isSemanticColor(token: TransformedToken | FigmaToken): boolean {
  const type = token.type as TokenTypes;
  return type === "color";
}

export function isRadiusToken(token: TransformedToken | FigmaToken): boolean {
  const type = token.type as TokenTypes;
  return type === "global-radius";
}

export function isSpaceToken(token: TransformedToken | FigmaToken): boolean {
  const type = token.type as TokenTypes;
  return type === "global-space";
}
