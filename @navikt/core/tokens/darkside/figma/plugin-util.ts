import lodash from "lodash";
import tinycolor from "tinycolor2";
import { FigmaPreparedToken, FigmaTokenConfig } from "./figma-types";

export async function createOrFindVariable(
  token: FigmaPreparedToken,
  collection: VariableCollection,
  variables: Variable[],
) {
  const existingVariable = variables.find(
    (variable) => variable.name === extractTokenName(token),
  );

  if (existingVariable) {
    return existingVariable;
  }

  console.info("Creating new variable: ", token.name);
  return figma.variables.createVariable(
    extractTokenName(token),
    collection,
    getFigmaDataType(token),
  );
}

export function getFigmaValueFromToken(token: FigmaPreparedToken) {
  if (token.type?.includes("color")) {
    return colorToFigmaRGB(token.value);
  }
  if (token.type?.includes("radius")) {
    return parseFloat(token.value.replace("px", ""));
  }
  if (token.type?.includes("spacing")) {
    return parseFloat(token.value.replace("rem", "")) * 16;
  }

  return token.value;
}

export async function resolveAliasId(
  token: FigmaPreparedToken,
  globalConfig:
    | FigmaTokenConfig["globalLight"]
    | FigmaTokenConfig["globalDark"],
) {
  const alias = token.alias;

  if (!alias) {
    return null;
  }

  const aliasToken = globalConfig.token.find((t) => t.name === alias);

  if (!aliasToken) {
    return null;
  }

  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  const collection = collections.find(
    (col) => col.name === globalConfig.collection,
  );

  if (!collection) {
    return null;
  }

  const variables = getExistingVariables(collection);

  const existingVariable = variables.find(
    (variable) => variable.name === extractTokenName(aliasToken),
  );

  if (!existingVariable) {
    return null;
  }

  return existingVariable.id;
}

export function getFigmaDataType(
  token: FigmaPreparedToken,
): VariableResolvedDataType {
  if (token.type?.includes("color")) {
    return "COLOR";
  }
  if (token.type?.includes("radius") || token.type?.includes("spacing")) {
    return "FLOAT";
  }

  return "STRING";
}

export async function createOrFindCollection(name: string) {
  const existingCollections =
    await figma.variables.getLocalVariableCollectionsAsync();
  const existingCollection = existingCollections.find(
    (collection) => collection.name === name,
  );

  if (existingCollection) {
    return existingCollection;
  }

  console.info("Creating new collection: ", name);
  return figma.variables.createVariableCollection(name);
}

export function getExistingVariables(collection: VariableCollection) {
  const variables: Variable[] = [];

  for (const id of collection.variableIds) {
    const variable = figma.variables.getVariableById(id);
    variable && variables.push(variable);
  }
  return variables;
}

export async function reset() {
  const localCollections =
    await figma.variables.getLocalVariableCollectionsAsync();

  localCollections.forEach((collection) => {
    console.info("Resetting: ", collection.name);
    collection.remove();
  });
}

export function extractTokenName(token: FigmaPreparedToken) {
  /**
   * Remove the "a-" prefix from the token name.
   */
  let name = lodash.startCase(token.name.slice(2));

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

function colorToFigmaRGB(colorString: string) {
  const color = tinycolor(colorString).toRgb();
  color.r = color.r / 255;
  color.g = color.g / 255;
  color.b = color.b / 255;

  return color;
}

export function getLastNumber(name: string): number {
  const matches = name.match(/\d+/g);
  return matches ? parseInt(matches[matches.length - 1], 10) : 0;
}
