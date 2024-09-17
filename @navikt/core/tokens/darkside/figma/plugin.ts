import _config from "../../figma-config.json";
import { FigmaTokenConfig } from "./figma-types";
import {
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
 * - Refactor initialization to avoid duplicate code
 */
const main = async () => {
  /*   await reset(); */

  await updateGlobalColorCollection(globalConfig.globalLight);
  await updateGlobalColorCollection(globalConfig.globalDark);
  await updateGlobalScalingCollection(globalConfig.radius);
  await updateGlobalScalingCollection(globalConfig.spacing);
  await updateSemanticColorCollection(globalConfig.semanticColors);
};

async function updateGlobalColorCollection(
  config: FigmaTokenConfig["globalLight"] | FigmaTokenConfig["globalDark"],
) {
  const collection = await createOrFindCollection(config.collection);
  const existingVariables = getExistingVariables(collection);

  collection.hiddenFromPublishing = config.hideFromPublishing;
  /**
   * "000"-tokens ends up last in list, so we need to sort them manually by scale.
   */
  const sortedTokensByScale = config.token.sort(
    (a, b) => getLastNumber(a.name) - getLastNumber(b.name),
  );

  for (const token of sortedTokensByScale) {
    const variable = await createOrFindVariable(
      token,
      collection,
      existingVariables,
    );

    variable.hiddenFromPublishing = config.hideFromPublishing;

    variable.setValueForMode(
      collection.defaultModeId,
      getFigmaValueFromToken(token),
    );

    variable.setVariableCodeSyntax("WEB", token.code.web);
  }
  console.info("Updated collection: ", config.collection);
}

async function updateGlobalScalingCollection(
  config: FigmaTokenConfig["radius"] | FigmaTokenConfig["spacing"],
) {
  const collection = await createOrFindCollection(config.collection);
  const existingVariables = getExistingVariables(collection);

  collection.hiddenFromPublishing = config.hideFromPublishing;

  const sortedTokensByPx = config.token.sort((a, b) => {
    const sizeA = getFigmaValueFromToken(a);
    const sizeB = getFigmaValueFromToken(b);

    if (typeof sizeA === "number" && typeof sizeB === "number") {
      return sizeA - sizeB;
    }
    return 0;
  });

  for (const token of sortedTokensByPx) {
    const variable = await createOrFindVariable(
      token,
      collection,
      existingVariables,
    );

    variable.hiddenFromPublishing = config.hideFromPublishing;

    variable.setValueForMode(
      collection.defaultModeId,
      getFigmaValueFromToken(token),
    );

    variable.setVariableCodeSyntax("WEB", token.code.web);
  }
  console.info("Updated collection: ", config.collection);
}

async function updateSemanticColorCollection(
  config: FigmaTokenConfig["semanticColors"],
) {
  const collection = await createOrFindCollection(config.collection);
  const existingVariables = getExistingVariables(collection);

  collection.hiddenFromPublishing = config.hideFromPublishing;

  const modes = ["lightmode", "darkmode"].map((mode) => {
    const foundMode = collection.modes.find((m) => m.name === mode);

    if (!foundMode) {
      return {
        modeId: collection.addMode(mode),
        name: mode,
      };
    }
    return foundMode;
  });

  collection.modes.forEach((mode) => {
    if (!modes.find((m) => m.name === mode.name)) {
      collection.removeMode(mode.modeId);
    }
  });

  for (const token of config.token) {
    const variable = await createOrFindVariable(
      token,
      collection,
      existingVariables,
    );

    variable.hiddenFromPublishing = config.hideFromPublishing;
    variable.setVariableCodeSyntax("WEB", token.code.web);

    for (const mode of modes) {
      const aliasId = await resolveAliasId(
        token,
        mode.name === "lightmode"
          ? globalConfig.globalLight
          : globalConfig.globalLight,
      );

      if (!aliasId) {
        variable.setValueForMode(mode.modeId, getFigmaValueFromToken(token));
        continue;
      }

      variable.setValueForMode(mode.modeId, {
        type: "VARIABLE_ALIAS",
        id: aliasId,
      });
    }
  }
  console.info("Updated collection: ", config.collection);
}
/* async function updateSemanticCollection() {} */

main().then(() =>
  setTimeout(() => figma.closePlugin("Local variables updated"), 10000),
);
