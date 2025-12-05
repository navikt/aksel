/**
 * Acts as a wrapper for interfacing with the Figma PluginAPI
 * @see https://www.figma.com/plugin-docs/api/api-reference/
 */
export class FigmaPluginInterface {
  private collections: VariableCollection[];
  private variables: Variable[];

  constructor() {
    this.collections = [];
    this.variables = [];
  }

  async init() {
    console.info("Initializing plugin...");
    const collections =
      await figma.variables.getLocalVariableCollectionsAsync();
    const variables: Variable[] = [];

    for (const collection of collections) {
      for (const id of collection.variableIds) {
        const variable = await figma.variables.getVariableByIdAsync(id);
        if (!variable) {
          throw new Error(
            `Variable with id ${id} not found in collection ${collection.name}`,
          );
        }
        variables.push(variable);
      }
    }

    this.collections = collections;
    this.variables = variables;
    console.info("Plugin initialized!");
  }

  /* -------------------------------------------------------------------------- */
  /*                             Collection handling                            */
  /* -------------------------------------------------------------------------- */
  getCollection(name: string): VariableCollection | undefined {
    return this.collections.find((col) => col.name === name);
  }

  /**
   * Creates a new collection if it doesn't already exist.
   * If it does exist, it will return the existing collection.
   */
  createCollection(name: string): VariableCollection {
    const existingCollection = this.getCollection(name);
    if (existingCollection) {
      console.info("Collection already exists, skipping creation: ", name);
      return existingCollection;
    }

    const collection = figma.variables.createVariableCollection(name);
    this.collections.push(collection);
    console.info("Creating new collection: ", name);

    return collection;
  }

  /* -------------------------------------------------------------------------- */
  /*                              Variable handling                             */
  /* -------------------------------------------------------------------------- */
  /**
   * Returns a variable if it exists in the specified collection.
   * Since variables can have the same name in different collections, the collectionId is required.
   */
  getVariable(name: string, collectionId: string): Variable | undefined {
    return this.variables.find(
      (figmaVariable) =>
        figmaVariable.name === name &&
        figmaVariable.variableCollectionId === collectionId,
    );
  }

  /**
   * Creates a new variable if it doesn't already exist.
   * If it does exist, it will return the existing variable.
   */
  createVariable(
    name: string,
    collection: VariableCollection,
    type: VariableResolvedDataType,
  ): Variable {
    const existingVariable = this.getVariable(name, collection.id);
    if (existingVariable) {
      console.info("Variable already exists, skipping creation: ", name);
      return existingVariable;
    }

    const variable = figma.variables.createVariable(name, collection, type);
    this.variables.push(variable);
    return variable;
  }

  createVariableAlias(variable: Variable) {
    return figma.variables.createVariableAlias(variable);
  }

  setVariableValue(
    variable: Variable,
    value: VariableValue,
    modeId: string,
  ): void {
    variable.setValueForMode(modeId, value);
  }

  setVariableMetadata(
    variable: Variable,
    metadata: Pick<
      Variable,
      "scopes" | "codeSyntax" | "hiddenFromPublishing" | "description"
    >,
  ): void {
    const platforms: CodeSyntaxPlatform[] = ["WEB", "ANDROID", "iOS"];
    platforms.forEach((platform: CodeSyntaxPlatform) => {
      if (metadata.codeSyntax?.[platform]) {
        variable.setVariableCodeSyntax(platform, metadata.codeSyntax[platform]);
      }
    });

    variable.scopes = metadata.scopes;
    variable.description = metadata.description ?? "";
    variable.hiddenFromPublishing = metadata.hiddenFromPublishing;
  }

  /* -------------------------------------------------------------------------- */
  /*                                Mode handling                               */
  /* -------------------------------------------------------------------------- */

  getModeWithName<T extends string>(
    name: T,
    collection: VariableCollection,
  ):
    | {
        modeId: string;
        name: T;
      }
    | undefined {
    const foundMode = collection.modes.find((mode) => mode.name === name);

    return foundMode ? { modeId: foundMode.modeId, name } : undefined;
  }

  /**
   * Creates a new mode if it doesn't already exist.
   * If it does exist, it will return the existing mode.
   */
  createMode<T extends string>(
    name: T,
    collection: VariableCollection,
  ): {
    modeId: string;
    name: T;
  } {
    const existingMode = collection.modes.find((mode) => mode.name === name);
    if (existingMode) {
      console.info("Mode already exists, skipping creation: ", name);
      return { modeId: existingMode.modeId, name };
    }

    return {
      modeId: collection.addMode(name),
      name,
    };
  }

  /**
   * Removes all modes that are not in the provided list.
   * Usefull for removing "default" modes, while preserving the custom modes.
   */
  removeNonMatchingModes(
    modes: string[],
    collection: VariableCollection,
  ): {
    modeId: string;
    name: string;
  }[] {
    const existingModes = collection.modes;

    for (const mode of existingModes) {
      if (!modes.find((m) => m === mode.name)) {
        collection.removeMode(mode.modeId);
      }
    }

    return collection.modes;
  }

  /* -------------------------------------------------------------------------- */
  /*                                  Utilities                                 */
  /* -------------------------------------------------------------------------- */
  /**
   * Resets all variables and collections in the document. Use with caution!
   */
  resetVariables() {
    this.collections.forEach((collection) => {
      console.info("Deleting collection: ", collection.name);
      collection.remove();
    });
    this.collections = [];
    this.variables = [];
  }

  exit(message?: string) {
    console.info("Exiting plugin...");
    figma.closePlugin(message);
  }
}
