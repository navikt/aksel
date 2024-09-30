import _config from "../../../figma-config.json";
import { FigmaConfigEntry, FigmaTokenConfig } from "../figma-config.types";
import { FigmaVariablePluginInterface } from "./FigmaVariableInterface";

type ScopedFigmaTokenConfig = Omit<FigmaTokenConfig, "version" | "timestamp">;

export class AkselVariablesInterface extends FigmaVariablePluginInterface {
  private config: FigmaTokenConfig;
  private meta: Pick<FigmaTokenConfig, "version" | "timestamp">;
  private remoteConfigURL =
    "https://cdn.nav.no/designsystem/@navikt/tokens/figma-config.json";

  constructor() {
    super();
    const config = _config as FigmaTokenConfig;
    this.config = config;
    this.meta = { timestamp: config.timestamp, version: config.version };
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
    this.updateScaleCollection(this.config.spacing);
  }

  private updateGlobalColorCollection(entry: FigmaConfigEntry): void {
    let collection = super.getCollection(entry.name);

    if (!collection) {
      collection = super.createCollection(entry.name);
    }

    /**
     * Correctly sorts the token-scale for global colors
     * 000 - 100 - 200... etc.
     */
    const sortedTokens = entry.tokens.sort((a, b) => {
      const getLastNumber = (name: string) => {
        const matches = name.match(/\d+/g);
        return matches ? parseInt(matches[matches.length - 1], 10) : 0;
      };
      return getLastNumber(a.name) - getLastNumber(b.name);
    });

    for (const token of sortedTokens) {
      /* Color values can only be defined by strings */
      if (typeof token.value !== "string") {
        throw new Error(`Token value is not a string: ${token}`);
      }

      let variable = super.getVariable(token.name, collection.id);

      if (!variable) {
        variable = super.createVariable(
          token.name,
          collection,
          token.figmaType,
        );
      }

      super.setVariableValue(
        variable,
        figma.util.rgba(token.value),
        collection.defaultModeId,
      );

      super.setVariableMetadata(variable, {
        codeSyntax: { WEB: token.code.web },
        description: token.comment ?? "",
        hiddenFromPublishing: collection.hiddenFromPublishing,
        scopes: token.scopes,
      });
    }

    console.info("Updated collection: ", collection.name);
  }

  private updateScaleCollection(
    entry: ScopedFigmaTokenConfig["radius"] | ScopedFigmaTokenConfig["spacing"],
  ): void {
    let collection = super.getCollection(entry.name);

    if (!collection) {
      collection = super.createCollection(entry.name);
    }

    const sortedTokens = entry.tokens.sort((a, b) => {
      if (typeof a.value === "number" && typeof b.value === "number") {
        return a.value - b.value;
      }
      return 0;
    });

    for (const token of sortedTokens) {
      let variable = super.getVariable(token.name, collection.id);

      if (!variable) {
        variable = super.createVariable(
          token.name,
          collection,
          token.figmaType,
        );
      }

      super.setVariableValue(variable, token.value, collection.defaultModeId);

      super.setVariableMetadata(variable, {
        codeSyntax: { WEB: token.code.web },
        description: token.comment ?? "",
        hiddenFromPublishing: collection.hiddenFromPublishing,
        scopes: token.scopes,
      });
    }

    console.info("Updated collection: ", collection.name);
  }

  private updateSemanticColorCollection(
    entry: ScopedFigmaTokenConfig["colors"],
  ): void {
    let collection = super.getCollection(entry.light.name);

    if (!collection) {
      collection = super.createCollection(entry.light.name);
    }

    for (const modeName of Object.values(entry).map((x) => x.name)) {
      const globalCollection = super.getCollection(entry[modeName].global.name);

      if (!globalCollection) {
        throw new Error(
          `Global collection not found for: ${entry[modeName].global.name}`,
        );
      }

      let mode = super.getModeWithName(modeName, collection);

      if (!mode) {
        mode = super.createMode(modeName, collection);
      }

      for (const token of entry[modeName].semantic.tokens) {
        let variable = super.getVariable(token.name, collection.id);

        if (!variable) {
          variable = super.createVariable(
            token.name,
            collection,
            token.figmaType,
          );
        }

        if (!token.alias) {
          if (typeof token.value !== "string") {
            throw new Error(
              `Semantic tokens without alias requires value to be string: ${token}`,
            );
          }

          super.setVariableValue(
            variable,
            figma.util.rgba(token.value),
            mode.modeId,
          );
          continue;
        }

        const globalVariable = super.getVariable(
          token.alias,
          globalCollection.id,
        );

        if (!globalVariable) {
          throw new Error(
            `Global variable not found for alias: ${token.alias}`,
          );
        }

        super.setVariableValue(
          variable,
          super.createVariableAlias(globalVariable),
          mode.modeId,
        );

        super.setVariableMetadata(variable, {
          codeSyntax: { WEB: token.code.web },
          description: token.comment ?? "",
          hiddenFromPublishing: collection.hiddenFromPublishing,
          scopes: token.scopes,
        });
      }

      /* Make sure to remove "default" modes if they exist */
      super.removeNonMatchingModes(
        Object.values(entry).map((x) => x.name),
        collection,
      );
    }

    console.info("Updated collection: ", collection.name);
  }

  exitWithMessage(message: string): void {
    super.exit(message);
  }

  exit(): void {
    super.exit(
      `Finished updating variables for version${this.meta.version}, last updated at ${this.meta.timestamp}`,
    );
  }
}
