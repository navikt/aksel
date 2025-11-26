import _config from "../../../figma-config.json";
import { FigmaConfigEntry, FigmaTokenConfig } from "../figma-config.types";
import { FigmaPluginInterface } from "./FigmaPluginInterface";

type ScopedFigmaTokenConfig = Omit<FigmaTokenConfig, "version" | "timestamp">;

export class AkselVariablesInterface {
  private Figma: FigmaPluginInterface;
  private config: FigmaTokenConfig;
  private meta: Pick<FigmaTokenConfig, "version" | "timestamp">;
  private remoteConfigURL =
    "https://cdn.nav.no/designsystem/@navikt/tokens/figma-config.json";

  constructor() {
    const config = _config as FigmaTokenConfig;
    this.config = config;
    this.meta = { timestamp: config.timestamp, version: config.version };
    this.Figma = new FigmaPluginInterface();
  }

  /**
   * Because of "dynamic-page" loading in Figma,
   * we need to initialize the plugin trough async methods.
   * This method should be called before any other methods.
   */
  async init(): Promise<void> {
    await this.Figma.init();
  }

  async useRemoteConfig(): Promise<void> {
    const newConfig = await fetch(this.remoteConfigURL)
      .then((res) => res.json())
      .catch((err) => {
        console.error(err);
        throw new Error("Error fetching config from CDN 😱");
      });
    this.meta = { timestamp: newConfig.timestamp, version: newConfig.version };

    this.config = newConfig;
  }

  updateVariables(): void {
    this.updateGlobalColorCollection(this.config.colors.light.global);
    this.updateGlobalColorCollection(this.config.colors.dark.global);
    this.updateSemanticColorCollection(this.config.colors);
    this.updateScaleCollection(this.config.radius);
    this.updateScaleCollection(this.config.space);
    console.info("Variables updated!");
  }

  private updateGlobalColorCollection(
    globalColorTheme: FigmaConfigEntry,
  ): void {
    const collection =
      this.Figma.getCollection(globalColorTheme.name) ??
      this.Figma.createCollection(globalColorTheme.name);

    /**
     * Correctly sorts the token-scale for global colors
     * 000 - 100 - 200... etc.
     */
    const getLastNumber = (name: string) => {
      const matches = name.match(/\d+/g);
      return matches ? parseInt(matches[matches.length - 1], 10) : 0;
    };
    const sortedTokens = globalColorTheme.tokens.sort(
      (a, b) => getLastNumber(a.name) - getLastNumber(b.name),
    );

    for (const token of sortedTokens) {
      /* Color values can only be defined by strings */
      if (typeof token.value !== "string") {
        throw new Error(`Token value is not a string: ${token}`);
      }

      const variable =
        this.Figma.getVariable(token.name, collection.id) ??
        this.Figma.createVariable(token.name, collection, token.figmaType);

      this.Figma.setVariableValue(
        variable,
        figma.util.rgba(token.value),
        collection.defaultModeId,
      );

      this.Figma.setVariableMetadata(variable, {
        codeSyntax: token.code,
        description: token.comment ?? "",
        /* We always hide global colors from publishing in figma */
        hiddenFromPublishing: true,
        scopes: token.scopes,
      });
    }

    console.info("Updated collection:", collection.name);
  }

  private updateScaleCollection(
    globalScale:
      | ScopedFigmaTokenConfig["radius"]
      | ScopedFigmaTokenConfig["space"],
  ): void {
    const collection =
      this.Figma.getCollection(globalScale.name) ??
      this.Figma.createCollection(globalScale.name);

    const sortedTokens = globalScale.tokens.sort((a, b) => {
      if (typeof a.value === "number" && typeof b.value === "number") {
        return a.value - b.value;
      }
      return 0;
    });

    for (const token of sortedTokens) {
      const variable =
        this.Figma.getVariable(token.name, collection.id) ??
        this.Figma.createVariable(token.name, collection, token.figmaType);

      this.Figma.setVariableValue(
        variable,
        token.value,
        collection.defaultModeId,
      );

      this.Figma.setVariableMetadata(variable, {
        codeSyntax: token.code,
        description: token.comment ?? "",
        hiddenFromPublishing: collection.hiddenFromPublishing,
        scopes: token.scopes,
      });
    }

    console.info("Updated collection:", collection.name);
  }

  private updateSemanticColorCollection(
    colorsConfig: ScopedFigmaTokenConfig["colors"],
  ): void {
    const semanticCollectionName = colorsConfig.light.semantic.name;

    const collection =
      this.Figma.getCollection(semanticCollectionName) ??
      this.Figma.createCollection(semanticCollectionName);

    for (const colorEntry of Object.values(colorsConfig)) {
      const modeName = colorEntry.name;

      const globalCollection = this.Figma.getCollection(
        colorsConfig[modeName].global.name,
      );

      if (!globalCollection) {
        throw new Error(
          `Global collection not found for: ${colorsConfig[modeName].global.name}`,
        );
      }

      const mode =
        this.Figma.getModeWithName(modeName, collection) ??
        this.Figma.createMode(modeName, collection);

      for (const token of colorsConfig[modeName].semantic.tokens) {
        const variable =
          this.Figma.getVariable(token.name, collection.id) ??
          this.Figma.createVariable(token.name, collection, token.figmaType);

        if (!token.alias) {
          if (typeof token.value !== "string") {
            throw new Error(
              `Semantic tokens without alias requires value to be string: ${token}`,
            );
          }

          this.Figma.setVariableValue(
            variable,
            figma.util.rgba(token.value),
            mode.modeId,
          );
          continue;
        }

        const globalVariable = this.Figma.getVariable(
          token.alias,
          globalCollection.id,
        );

        if (!globalVariable) {
          throw new Error(
            `Global variable not found for alias: ${token.alias}`,
          );
        }

        this.Figma.setVariableValue(
          variable,
          this.Figma.createVariableAlias(globalVariable),
          mode.modeId,
        );

        this.Figma.setVariableMetadata(variable, {
          codeSyntax: token.code,
          description: token.comment ?? "",
          hiddenFromPublishing: collection.hiddenFromPublishing,
          scopes: token.scopes,
        });
      }

      /* Make sure to remove "default" modes if they exist */
      this.Figma.removeNonMatchingModes(
        Object.values(colorsConfig).map((colorConfig) => colorConfig.name),
        collection,
      );
    }

    console.info("Updated collection:", collection.name);
  }

  /**
   * Deletes all local collections in the Figma file.
   * @important Use with caution! If the current variables are not published in figma,
   * they will be lost forever!
   */
  resetVariables(): void {
    this.Figma.resetVariables();
  }

  exitWithMessage(message: string): void {
    this.Figma.exit(message);
  }

  exit(): void {
    this.Figma.exit(
      `Finished updating variables for version ${this.meta.version}, last updated at ${this.meta.timestamp}`,
    );
  }
}
