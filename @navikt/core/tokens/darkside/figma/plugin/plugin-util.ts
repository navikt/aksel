import { FigmaToken, FigmaTokenConfig } from "../types";

export type ScopedFigmaTokenConfig = Omit<FigmaTokenConfig, "version" | "date">;

export type ResolvedFigmaCollection = Record<
  keyof ScopedFigmaTokenConfig,
  {
    collection: VariableCollection;
    variables: Variable[];
    config: ScopedFigmaTokenConfig[keyof ScopedFigmaTokenConfig];
  }
>;

export type ResolvedFigmaCollectionValue =
  ResolvedFigmaCollection[keyof ResolvedFigmaCollection];

export async function createOrFindVariable(
  token: FigmaToken,
  { collection, variables, config }: ResolvedFigmaCollectionValue,
) {
  let existingVariable = variables.find(
    (variable) => variable.name === token.name,
  );

  if (!existingVariable) {
    console.info("Creating new variable: ", token.name);
    existingVariable = figma.variables.createVariable(
      token.name,
      collection,
      token.figmaType.type,
    );

    /**
     * We have to make sure new variables are added to config so that
     * semantic colors can reference them correctly.
     */
    variables.push(existingVariable);
  }

  existingVariable.hiddenFromPublishing = config.hideFromPublishing;
  existingVariable.setVariableCodeSyntax("WEB", token.code.web);
  existingVariable.scopes = token.figmaType.scopes;
  existingVariable.description = token.comment ?? "";

  return existingVariable;
}

export const SEMANTIC_FIGMA_MODES = ["lightmode", "darkmode"] as const;

export async function resolveAliasId(
  token: FigmaToken,
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
    (variable) => variable.name === aliasToken.name,
  );

  if (!existingVariable) {
    return null;
  }

  return existingVariable.id;
}

export async function createOrFindCollection(
  config: ResolvedFigmaCollectionValue["config"],
) {
  const existingCollections =
    await figma.variables.getLocalVariableCollectionsAsync();

  let existingCollection = existingCollections.find(
    (collection) => collection.name === config.name,
  );

  if (!existingCollection) {
    existingCollection = figma.variables.createVariableCollection(config.name);
  }

  existingCollection.hiddenFromPublishing;

  console.info("Creating new collection: ", config.name);
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

export function getLastNumber(name: string): number {
  const matches = name.match(/\d+/g);
  return matches ? parseInt(matches[matches.length - 1], 10) : 0;
}
