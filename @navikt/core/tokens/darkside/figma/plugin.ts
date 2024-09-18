import _config from "../../figma-config.json";
import { FigmaTokenConfig } from "./figma-types";
import {
  type ResolvedFigmaCollection,
  type ResolvedFigmaCollectionValue,
  SEMANTIC_FIGMA_MODES,
  createOrFindCollection,
  createOrFindVariable,
  getExistingVariables,
  getFigmaValueFromToken,
  getLastNumber,
  resolveAliasId,
} from "./plugin-util";

const globalConfig: FigmaTokenConfig = _config;

/**
 * TODO:
 * - Add scope-support
 * - Add remote fetch of config from CDN i production
 * - Review naming of semantic colors
 * - Review naming og spacing and radius tokens
 * - Review SEMANTIC_FIGMA_MODES-naming
 * - Add tests?
 */
const main = async () => {
  /* await reset(); */

  const collections = await buildCollections();

  await updateGlobalColorCollection(collections.globalLight);
  await updateGlobalColorCollection(collections.globalDark);
  await updateGlobalScalingCollection(collections.radius);
  await updateGlobalScalingCollection(collections.spacing);
  await updateSemanticColorCollection(collections);
};

async function buildCollections() {
  const collections = {} as ResolvedFigmaCollection;

  for (const [key, config] of Object.entries(globalConfig)) {
    const collection = await createOrFindCollection(config);
    const variables = getExistingVariables(collection);

    collections[key as keyof FigmaTokenConfig] = {
      collection,
      variables,
      config,
    };
  }

  return collections;
}

async function updateGlobalColorCollection(
  configuration: ResolvedFigmaCollectionValue,
) {
  const { collection, config } = configuration;

  /**
   * "000"-tokens ends up last in list, so we need to sort them manually by scale.
   */
  const sortedTokensByScale = config.token.sort(
    (a, b) => getLastNumber(a.name) - getLastNumber(b.name),
  );

  for (const token of sortedTokensByScale) {
    const variable = await createOrFindVariable(token, configuration);

    variable.setValueForMode(
      collection.defaultModeId,
      getFigmaValueFromToken(token),
    );
  }

  console.info("Updated collection: ", config.collection);
}

async function updateGlobalScalingCollection(
  configuration: ResolvedFigmaCollectionValue,
) {
  const { collection, config } = configuration;

  const sortedTokensByPx = config.token.sort((a, b) => {
    const sizeA = getFigmaValueFromToken(a);
    const sizeB = getFigmaValueFromToken(b);

    if (typeof sizeA === "number" && typeof sizeB === "number") {
      return sizeA - sizeB;
    }
    return 0;
  });

  for (const token of sortedTokensByPx) {
    const variable = await createOrFindVariable(token, configuration);

    variable.setValueForMode(
      collection.defaultModeId,
      getFigmaValueFromToken(token),
    );
  }

  console.info("Updated collection: ", config.collection);
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

  collection.modes.forEach((mode) => {
    if (!modes.find((m) => m.name === mode.name)) {
      collection.removeMode(mode.modeId);
    }
  });

  for (const token of config.token) {
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

      /* Some semantic values will be hardcoded to a custom value */
      variable.setValueForMode(mode.modeId, getFigmaValueFromToken(token));
    }
  }
  console.info("Updated collection: ", config.collection);
}

main().then(() => figma.closePlugin("Local variables updated!"));
