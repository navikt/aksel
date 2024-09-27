import _config from "../../../figma-config.json";
import type { FigmaTokenConfig } from "../figma-config.types";
import {
  type ResolvedFigmaCollection,
  type ResolvedFigmaCollectionValue,
  SEMANTIC_FIGMA_MODES,
  ScopedFigmaTokenConfig,
  createOrFindCollection,
  createOrFindVariable,
  getExistingVariables,
  getLastNumber,
  reset,
  resolveAliasId,
} from "./plugin-util";

main()
  .then((timestamp) =>
    figma.closePlugin(
      `Local variables updated! Last config update: ${timestamp}.`,
    ),
  )
  .catch((err) =>
    figma.closePlugin(`Error updating local variables: ${err.message}`),
  );

async function main() {
  let globalConfig: FigmaTokenConfig;

  if (process.env.NODE_ENV === "development") {
    globalConfig = _config as FigmaTokenConfig;
  } else {
    try {
      globalConfig = await fetch(
        "https://cdn.nav.no/designsystem/@navikt/tokens/figma-config.json",
      ).then((res) => res.json());
      console.info("Fetched config from CDN.");
    } catch (err) {
      throw new Error("Error fetching config from CDN 😱");
    }
  }

  await reset();

  const collections = {} as ResolvedFigmaCollection;

  const scopedConfig: ScopedFigmaTokenConfig = {
    globalLight: globalConfig.globalLight,
    globalDark: globalConfig.globalDark,
    semanticColors: globalConfig.semanticColors,
    radius: globalConfig.radius,
    spacing: globalConfig.spacing,
  };

  for (const [key, config] of Object.entries(scopedConfig)) {
    const collection = await createOrFindCollection(config);
    const variables = getExistingVariables(collection);

    collections[key as keyof ScopedFigmaTokenConfig] = {
      collection,
      variables,
      config,
    };
  }

  await updateGlobalColorCollection(collections.globalLight);
  await updateGlobalColorCollection(collections.globalDark);
  await updateGlobalScalingCollection(collections.radius);
  await updateGlobalScalingCollection(collections.spacing);
  await updateSemanticColorCollection(collections);

  return globalConfig.timestamp;
}

/* -------------------------------------------------------------------------- */
/*                                  Utilities                                 */
/* -------------------------------------------------------------------------- */
async function updateGlobalColorCollection(
  configuration: ResolvedFigmaCollectionValue,
) {
  const { collection, config } = configuration;

  /**
   * "000"-tokens ends up last in list, so we want to sort them manually by scale.
   */
  const sortedTokensByScale = config.tokens.sort(
    (a, b) => getLastNumber(a.name) - getLastNumber(b.name),
  );

  for (const token of sortedTokensByScale) {
    const variable = await createOrFindVariable(token, configuration);

    if (typeof token.value !== "string") {
      throw new Error(`Token value is not a string: ${token}`);
    }

    variable.setValueForMode(
      collection.defaultModeId,
      figma.util.rgba(token.value),
    );
  }

  console.info("Updated collection: ", config.name);
}

async function updateGlobalScalingCollection(
  configuration: ResolvedFigmaCollectionValue,
) {
  const { collection, config } = configuration;

  const sortedTokensByPx = config.tokens.sort((a, b) => {
    if (typeof a.value === "number" && typeof b.value === "number") {
      return a.value - b.value;
    }
    return 0;
  });

  for (const token of sortedTokensByPx) {
    const variable = await createOrFindVariable(token, configuration);

    variable.setValueForMode(collection.defaultModeId, token.value);
  }

  console.info("Updated collection: ", config.name);
}

async function updateSemanticColorCollection(
  configuration: ResolvedFigmaCollection,
) {
  const { collection, config } = configuration["semanticColors"];

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
    const variable = await createOrFindVariable(
      token,
      configuration["semanticColors"],
    );

    for (const mode of modes) {
      const aliasId = await resolveAliasId(token, mode.name, configuration);

      if (aliasId) {
        variable.setValueForMode(mode.modeId, {
          type: "VARIABLE_ALIAS",
          id: aliasId,
        });
        continue;
      }

      if (typeof token.value !== "string") {
        throw new Error(`Token value is not a string: ${token}`);
      }

      /* Some semantic values will be hardcoded to a custom value */
      variable.setValueForMode(mode.modeId, figma.util.rgba(token.value));
    }
  }
  console.info("Updated collection: ", config.name);
}
