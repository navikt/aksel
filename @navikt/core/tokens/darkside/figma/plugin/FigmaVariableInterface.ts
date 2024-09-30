export class FigmaVariablePluginInterface {
  private collections: VariableCollection[];
  private variables: Variable[];

  constructor() {
    const collections = figma.variables.getLocalVariableCollections();
    const variables: Variable[] = [];

    for (const collection of collections) {
      for (const id of collection.variableIds) {
        const variable = figma.variables.getVariableById(id);
        variable && variables.push(variable);
      }
    }

    this.collections = collections;
    this.variables = variables;
  }

  /* -------------------------------------------------------------------------- */
  /*                             Collection handling                            */
  /* -------------------------------------------------------------------------- */
  private getVariablesForCollection(
    collection: VariableCollection,
  ): Variable[] {
    const variables: Variable[] = [];

    for (const variable of this.variables) {
      if (variable.variableCollectionId === collection.id) {
        variables.push(variable);
      }
    }
    return variables;
  }

  getCollection(name: string): VariableCollection | undefined {
    return this.collections.find((col) => col.name === name);
  }

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
  getVariable(name: string, collectionId: string): Variable | undefined {
    return this.variables.find(
      (figmaVariable) =>
        figmaVariable.name === name &&
        figmaVariable.variableCollectionId === collectionId,
    );
  }

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
    metadata.codeSyntax.WEB &&
      variable.setVariableCodeSyntax("WEB", metadata.codeSyntax.WEB);
    metadata.codeSyntax.ANDROID &&
      variable.setVariableCodeSyntax("ANDROID", metadata.codeSyntax.ANDROID);
    metadata.codeSyntax.iOS &&
      variable.setVariableCodeSyntax("iOS", metadata.codeSyntax.iOS);
    variable.scopes = metadata.scopes;
    variable.description = metadata.description ?? "";
    variable.hiddenFromPublishing = metadata.hiddenFromPublishing;
  }

  /* -------------------------------------------------------------------------- */
  /*                                Mode handling                               */
  /* -------------------------------------------------------------------------- */

  getModes(collection: VariableCollection) {
    return collection.modes;
  }

  getModeWithName<T extends string>(
    name: T,
    collection: VariableCollection,
  ):
    | {
        modeId: string;
        name: T;
      }
    | undefined {
    const foundMode = this.getModes(collection).find(
      (mode) => mode.name === name,
    );

    return foundMode ? { modeId: foundMode.modeId, name } : undefined;
  }

  createMode<T extends string>(
    name: T,
    collection: VariableCollection,
  ): {
    modeId: string;
    name: T;
  } {
    const existingMode = this.getModes(collection).find(
      (mode) => mode.name === name,
    );
    if (existingMode) {
      console.info("Mode already exists, skipping creation: ", name);
      return { modeId: existingMode.modeId, name };
    }
    return {
      modeId: collection.addMode(name),
      name,
    };
  }

  private removeMode(name: string, collection: VariableCollection) {
    const mode = this.getModes(collection).find((_mode) => _mode.name === name);
    if (mode) {
      collection.removeMode(mode.modeId);
      console.info("Removing mode: ", name);
    }
  }

  removeNonMatchingModes(
    modes: string[],
    collection: VariableCollection,
  ): {
    modeId: string;
    name: string;
  }[] {
    const existingModes = this.getModes(collection);

    for (const mode of existingModes) {
      if (!modes.find((m) => m === mode.name)) {
        collection.removeMode(mode.modeId);
      }
    }
    return this.getModes(collection);
  }

  /* -------------------------------------------------------------------------- */
  /*                                  Utilities                                 */
  /* -------------------------------------------------------------------------- */
  /**
   * Deletes all local collections in the Figma file.
   * @important Use with caution! If the current variables are not published in figma,
   * they will be lost forever!
   */
  reset() {
    this.collections.forEach((collection) => {
      console.info("Deleting collection: ", collection.name);
      collection.remove();
    });
  }

  exit(message?: string) {
    figma.closePlugin(message);
  }
}

/* const Test = new FigmaVariablePluginInterface();

Test.init();
console.log("DONE");
figma.closePlugin("DONE");
 */
