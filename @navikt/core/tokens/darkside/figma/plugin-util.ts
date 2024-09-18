import lodash from "lodash";
import tinycolor from "tinycolor2";
import { FigmaPreparedToken, FigmaTokenConfig } from "./figma-types";

export type ResolvedFigmaCollection = Record<
  keyof FigmaTokenConfig,
  {
    collection: VariableCollection;
    variables: Variable[];
    config: FigmaTokenConfig[keyof FigmaTokenConfig];
  }
>;

export type ResolvedFigmaCollectionValue =
  ResolvedFigmaCollection[keyof ResolvedFigmaCollection];

export async function createOrFindVariable(
  token: FigmaPreparedToken,
  { collection, variables, config }: ResolvedFigmaCollectionValue,
) {
  let existingVariable = variables.find(
    (variable) => variable.name === extractTokenName(token),
  );

  if (!existingVariable) {
    console.info("Creating new variable: ", token.name);
    existingVariable = figma.variables.createVariable(
      extractTokenName(token),
      collection,
      getFigmaDataType(token),
    );

    /**
     * We have to make sure new variables are added to config so that
     * semantic colors can reference them correctly.
     */
    variables.push(existingVariable);
  }

  existingVariable.hiddenFromPublishing = config.hideFromPublishing;
  existingVariable.setVariableCodeSyntax("WEB", token.code.web);

  return existingVariable;
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

export const SEMANTIC_FIGMA_MODES = ["lightmode", "darkmode"] as const;

export async function resolveAliasId(
  token: FigmaPreparedToken,
  mode: (typeof SEMANTIC_FIGMA_MODES)[number],
  configuration: ResolvedFigmaCollection,
) {
  const alias = token.alias;

  if (!alias) {
    return null;
  }

  const configToReference =
    mode === "lightmode"
      ? configuration["globalLight"]
      : configuration["globalDark"];

  const aliasToken = configToReference.config.token.find(
    (t) => t.name === alias,
  );

  if (!aliasToken) {
    return null;
  }

  const existingVariable = configToReference.variables.find(
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

export async function createOrFindCollection(
  config: ResolvedFigmaCollectionValue["config"],
) {
  const existingCollections =
    await figma.variables.getLocalVariableCollectionsAsync();

  let existingCollection = existingCollections.find(
    (collection) => collection.name === config.collection,
  );

  if (!existingCollection) {
    existingCollection = figma.variables.createVariableCollection(
      config.collection,
    );
  }

  existingCollection.hiddenFromPublishing;

  console.info("Creating new collection: ", config.collection);
  return existingCollection;
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
