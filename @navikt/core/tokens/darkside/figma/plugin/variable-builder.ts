import _config from "../../../figma-config.json";
import { FigmaToken, FigmaTokenConfig } from "../figma-config.types";
import {
  ResolvedFigmaCollection,
  SEMANTIC_FIGMA_MODES,
  ScopedFigmaTokenConfig,
} from "./plugin-util";

export class VariableBuilder {
  private config: FigmaTokenConfig;
  private meta: Pick<FigmaTokenConfig, "version" | "timestamp">;
  private resolvedCollections: ResolvedFigmaCollection | null;
  private figmaCollections?: VariableCollection[];

  constructor() {
    this.config = _config as FigmaTokenConfig;
    this.meta = this.getMeta();
    this.resolvedCollections = null;
  }

  async build() {
    if (process.env.NODE_ENV === "production") {
      this.config = await fetch(
        "https://cdn.nav.no/designsystem/@navikt/tokens/figma-config.json",
      )
        .then((res) => res.json())
        .catch((err) => {
          console.error(err);
          throw new Error("Error fetching config from CDN 😱");
        });
      this.meta = this.getMeta();
    }

    this.figmaCollections =
      await figma.variables.getLocalVariableCollectionsAsync();

    this.buildCollections();
  }

  private buildCollections() {
    const scopedConfig: ScopedFigmaTokenConfig = {
      globalLight: this.config.globalLight,
      globalDark: this.config.globalDark,
      semanticColors: this.config.semanticColors,
      radius: this.config.radius,
      spacing: this.config.spacing,
    };

    const resolvedCollections: ResolvedFigmaCollection =
      {} as ResolvedFigmaCollection;

    for (const [key, config] of Object.entries(scopedConfig)) {
      const collection = this.getCollection(config.name);
      const variables = this.getVariables(collection);

      resolvedCollections[key as keyof ScopedFigmaTokenConfig] = {
        collection,
        variables,
        config,
      };
    }

    this.resolvedCollections = resolvedCollections;
  }

  private updateGlobalColorCollection(
    collectionName: keyof ResolvedFigmaCollection,
  ) {
    const { collection, config } = this.getResolvedCollection(collectionName);

    const sorted = this.sortTokensByGlobalScale(config.tokens);
    for (const token of sorted) {
      const variable = this.getVariable(token, collectionName);

      if (typeof token.value !== "string") {
        throw new Error(`Token value is not a string: ${token}`);
      }

      this.updateVariable(variable, token, {
        modeId: collection.defaultModeId,
        value: figma.util.rgba(token.value),
        hiddenFromPublishing: collection.hiddenFromPublishing,
      });
    }

    console.info("Updated collection: ", config.name);
  }

  private updateGlobalScalingCollection(
    collectionName: keyof ResolvedFigmaCollection,
  ) {
    const { collection, config } = this.getResolvedCollection(collectionName);

    const sorted = this.sortTokensByPx(config.tokens);

    for (const token of sorted) {
      const variable = this.getVariable(token, collectionName);

      this.updateVariable(variable, token, {
        modeId: collection.defaultModeId,
        value: token.value,
        hiddenFromPublishing: collection.hiddenFromPublishing,
      });
    }

    console.info("Updated collection: ", config.name);
  }

  updateSemanticColorCollection(collectionName: keyof ResolvedFigmaCollection) {
    const { collection, config } = this.getResolvedCollection(collectionName);

    const modes: {
      name: (typeof SEMANTIC_FIGMA_MODES)[number];
      modeId: string;
    }[] = SEMANTIC_FIGMA_MODES.map((mode) => {
      const foundMode = collection.modes.find((m) => m.name === mode);

      if (!foundMode) {
        return {
          modeId: collection.addMode(mode),
          name: mode as (typeof SEMANTIC_FIGMA_MODES)[number],
        };
      }
      return foundMode as {
        name: (typeof SEMANTIC_FIGMA_MODES)[number];
        modeId: string;
      };
    });

    /**
     * Removed default "value"-mode if it exists
     */
    collection.modes.forEach((mode) => {
      if (!modes.find((m) => m.name === mode.name)) {
        collection.removeMode(mode.modeId);
      }
    });

    for (const token of config.tokens) {
      const variable = this.getVariable(token, collectionName);

      for (const mode of modes) {
        const aliasId = this.resolveAliasId(token, mode.name);

        if (typeof token.value !== "string") {
          throw new Error(`Token value is not a string: ${token}`);
        }

        this.updateVariable(variable, token, {
          modeId: mode.modeId,
          value: aliasId
            ? {
                type: "VARIABLE_ALIAS",
                id: aliasId,
              }
            : figma.util.rgba(token.value),
          hiddenFromPublishing: collection.hiddenFromPublishing,
        });
      }
    }
    console.info("Updated collection: ", config.name);
  }

  /* DONE */
  private updateVariable(
    variable: Variable,
    token: FigmaToken,
    {
      modeId,
      value,
      hiddenFromPublishing,
    }: {
      value: VariableAlias | RGBA | string | number;
      modeId: string;
      hiddenFromPublishing: boolean;
    },
  ) {
    variable.setVariableCodeSyntax("WEB", token.code.web);
    variable.scopes = token.scopes;
    variable.description = token.comment ?? "";
    variable.hiddenFromPublishing = hiddenFromPublishing;
    variable.setValueForMode(modeId, value);
  }

  /**
   * Resolves or creates a collection inside a Figma file.
   * DONE
   */
  private getCollection(name: string): VariableCollection {
    let collection = this.getFigmaCollections().find(
      (_collection) => _collection.name === name,
    );

    if (!collection) {
      collection = figma.variables.createVariableCollection(name);
      console.info("Creating new collection: ", name);
    }

    return collection;
  }

  resolveAliasId(
    token: FigmaToken,
    mode: (typeof SEMANTIC_FIGMA_MODES)[number],
  ) {
    const alias = token.alias;

    if (!alias) {
      return null;
    }

    const configuration = this.getResolvedCollections();

    const configToReference =
      mode === "lightmode"
        ? configuration["globalLight"]
        : configuration["globalDark"];

    const aliasToken = configToReference.config.tokens.find(
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

  /**
   * Resolves all existing variables in a collection
   * DONE
   */
  private getVariables(collection: VariableCollection): Variable[] {
    const variables: Variable[] = [];

    for (const id of collection.variableIds) {
      const variable = figma.variables.getVariableById(id);
      variable && variables.push(variable);
    }
    return variables;
  }

  /* DONE */
  private getVariable(
    token: FigmaToken,
    collectionName: keyof ResolvedFigmaCollection,
  ) {
    const { collection, variables } =
      this.getResolvedCollection(collectionName);
    let existingVariable = variables.find(
      (variable) => variable.name === token.name,
    );

    if (!existingVariable) {
      console.info("Creating new variable: ", token.name);
      existingVariable = figma.variables.createVariable(
        token.name,
        collection,
        token.figmaType,
      );

      /**
       * We have to make sure new variables are added to config so that
       * semantic colors can reference them correctly.
       */
      this.addVariableToCollection(existingVariable, collectionName);
    }

    return existingVariable;
  }

  private addVariableToCollection(
    variable: Variable,
    collection: keyof ResolvedFigmaCollection,
  ) {
    const { variables } = this.getResolvedCollection(collection);
    variables.push(variable);
  }

  private getResolvedCollection(name: keyof ScopedFigmaTokenConfig) {
    return this.getResolvedCollections()[name];
  }

  private getResolvedCollections() {
    if (!this.resolvedCollections) {
      throw new Error("resolvedCollections not initialized");
    }
    return this.resolvedCollections;
  }

  private getMeta() {
    return {
      version: this.config.version,
      timestamp: this.config.timestamp,
    };
  }

  private getFigmaCollections() {
    if (!this.figmaCollections) {
      throw new Error("figmaCollections not initialized");
    }
    return this.figmaCollections;
  }

  private sortTokensByGlobalScale(tokens: FigmaToken[]): FigmaToken[] {
    const getLastNumber = (name: string) => {
      const matches = name.match(/\d+/g);
      return matches ? parseInt(matches[matches.length - 1], 10) : 0;
    };
    return tokens.sort((a, b) => getLastNumber(a.name) - getLastNumber(b.name));
  }

  private sortTokensByPx(tokens: FigmaToken[]): FigmaToken[] {
    return tokens.sort((a, b) => {
      if (typeof a.value === "number" && typeof b.value === "number") {
        return a.value - b.value;
      }
      return 0;
    });
  }

  /**
   * Deletes all local collections in the Figma file.
   * @important Use with caution! If the current variables are not published in figma,
   * they will be lost forever!
   */
  reset() {
    this.getFigmaCollections().forEach((collection) => {
      console.info("Deleting collection: ", collection.name);
      collection.remove();
    });
  }

  exitWithError(message: string) {
    figma.closePlugin(message);
  }

  exit() {
    figma.closePlugin(
      `Local variables updated! Last config update: ${this.meta.timestamp}, version: ${this.meta.version}.`,
    );
  }
}
