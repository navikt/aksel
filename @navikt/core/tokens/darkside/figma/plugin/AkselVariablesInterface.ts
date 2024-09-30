import _config from "../../../figma-config.json";
import { FigmaTokenConfig } from "../figma-config.types";
import { FigmaVariablePluginInterface } from "./FigmaVariableInterface";
import { ScopedFigmaTokenConfig } from "./plugin-util";

export class AkselVariablesInterface extends FigmaVariablePluginInterface {
  private config: FigmaTokenConfig;
  private meta: Pick<FigmaTokenConfig, "version" | "timestamp">;
  private remoteConfigURL =
    "https://cdn.nav.no/designsystem/@navikt/tokens/figma-config.json";

  private semanticModes = ["light", "dark"];

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
    this.updateGlobalColorCollection(this.config.globalLight);
    this.updateGlobalColorCollection(this.config.globalDark);
    this.updateScaleCollection(this.config.radius);
    this.updateScaleCollection(this.config.spacing);
  }

  private updateGlobalColorCollection(
    entry:
      | ScopedFigmaTokenConfig["globalLight"]
      | ScopedFigmaTokenConfig["globalDark"],
  ): void {
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

      let variable = super.getVariable(token.name);

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
      let variable = super.getVariable(token.name);

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
    entry: ScopedFigmaTokenConfig["semanticColors"],
  ): void {
    let collection = super.getCollection(entry.name);

    if (!collection) {
      collection = super.createCollection(entry.name);
    }

    let modes = super.getModes(collection);

    for (const mode of this.semanticModes) {
      if (!modes.find((m) => m.name === mode)) {
        super.createMode(mode, collection);
      }
    }
    modes = super.getModes(collection);
    super.removeNonMatchingModes(this.semanticModes, collection);

    for (const token of entry.tokens) {
      /* Color values can only be defined by strings */
      if (typeof token.value !== "string") {
        throw new Error(`Token value is not a string: ${token}`);
      }

      let variable = super.getVariable(token.name);

      if (!variable) {
        variable = super.createVariable(
          token.name,
          collection,
          token.figmaType,
        );
      }

      for (const mode of modes) {
        /* TODO: implement this */
        /* figma.variables.createVariableAlias */
        /* const aliasId = super.resolveAliasId(token, mode.name); */

        super.setVariableValue(
          variable,
          /* "aliasId"
            ? {
                type: "VARIABLE_ALIAS",
                id: "aliasId",
              }
            : */ figma.util.rgba(token.value),
          mode.modeId,
        );
      }

      super.setVariableMetadata(variable, {
        codeSyntax: { WEB: token.code.web },
        description: token.comment ?? "",
        hiddenFromPublishing: collection.hiddenFromPublishing,
        scopes: token.scopes,
      });
    }

    console.info("Updated collection: ", collection.name);
  }

  exit(): void {
    super.exit(
      `Finished updating variables for version${this.meta.version}, last updated at ${this.meta.timestamp}`,
    );
  }
}
