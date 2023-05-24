import stylelint from "stylelint";
import valueParser from "postcss-value-parser";
import { readFileSync } from "node:fs";

import { flattenObject, isCustomProperty } from "./utils";
import { Node as PostCSSNode } from "postcss";

const packageJson = JSON.parse(
  readFileSync(`${__dirname}/../../../package.json`).toString()
);

const ruleName = "@navikt/aksel-design-token-exists";

const tokenCSSFile = "./index.css";
const tokenJsonFile = "./tokens.json";
const internalTokensJSONFile = "./internal-tokens.json";

export const controlledPrefixes = ["--ac-", "--a-"];

let allowedTokenNames = [];

const packageVersion = packageJson.version;

export const errorMessage = (
  type: "prop" | "value",
  node,
  controlledPrefixes: string[],
  invalidValues?: string
) => {
  if (type === "value") {
    return (
      `property "${node.prop}" has offending value "${invalidValues}", ` +
      `and the value seems like it intends to reference a design token by ` +
      `using one of the following prefixes [${controlledPrefixes}]. ` +
      `However, that token doesn't seem to exist in the design system. ` +
      `\n\nVersion: ${packageVersion}`
    );
  }
  return (
    `property "${node.prop}" has a name that seems like it intends to override a design token by ` +
    `using one of the following prefixes [${controlledPrefixes}]. ` +
    `However, that token doesn't seem to exist in the design system. ` +
    `\n\nVersion: ${packageVersion}`
  );
};

const addTokens = (tokenJSONFile: string, allowedTokenNames: string[]) => {
  const jsonFileBuffer = readFileSync(`${__dirname}/../../${tokenJSONFile}`);
  const fileString = jsonFileBuffer.toString();
  const flattened = flattenObject(JSON.parse(fileString));
  flattened.forEach((token) => allowedTokenNames.push(token));
};

const isValidToken = (controlledPrefixes: string[], inputToken: string) => {
  // "singleton" if statement (attempt at caching file parsing)
  if (!allowedTokenNames.length) {
    const cssFileBuffer = readFileSync(`${__dirname}/../../${tokenCSSFile}`);
    const cssFileString = cssFileBuffer.toString();

    valueParser(cssFileString).walk((node) => {
      if (
        node.type === "word" &&
        isCustomProperty(node.value) &&
        controlledPrefixes.some((prefix) => node.value.startsWith(prefix))
      ) {
        allowedTokenNames.push(node.value);
      }
    });

    addTokens(tokenJsonFile, allowedTokenNames);
    addTokens(internalTokensJSONFile, allowedTokenNames);
  }

  return allowedTokenNames.includes(inputToken);
};

const getInvalidPropName = (controlledPrefixes: string[], prop: string) => {
  const invalidValues: string[] = [];

  if (
    isCustomProperty(prop) &&
    controlledPrefixes.some((prefix) => prop.startsWith(prefix)) &&
    !isValidToken(controlledPrefixes, prop)
  ) {
    invalidValues.push(prop);
  }

  if (invalidValues.length > 0) return invalidValues;
};

const checkInvalidVariableNames = (
  controlledPrefixes: string[],
  value: string,
  postcssResult: stylelint.PostcssResult,
  rootNode: PostCSSNode
): string[] => {
  const invalidValues: string[] = [];

  valueParser(value).walk((node) => {
    if (
      node.type === "word" &&
      isCustomProperty(node.value) &&
      controlledPrefixes.some((prefix) => node.value.startsWith(prefix)) &&
      !isValidToken(controlledPrefixes, node.value)
    ) {
      stylelint.utils.report({
        message: errorMessage(
          "value",
          rootNode,
          controlledPrefixes,
          node.value
        ),
        node: rootNode,
        result: postcssResult,
        ruleName,
        word: node.value,
      });
    }
  });

  if (invalidValues.length > 0) return invalidValues;
};

const ruleFunction: stylelint.Rule = () => {
  return (postcssRoot, postcssResult) => {
    postcssRoot.walkDecls((node) => {
      const prop = node.prop;
      const value = node.value;

      const invalidPropNames = getInvalidPropName(controlledPrefixes, prop);

      checkInvalidVariableNames(controlledPrefixes, value, postcssResult, node);

      if (invalidPropNames) {
        stylelint.utils.report({
          message: errorMessage("prop", node, controlledPrefixes),
          node,
          result: postcssResult,
          ruleName,
        });
      }
    });
  };
};

ruleFunction.ruleName = ruleName;
ruleFunction.messages = {};
ruleFunction.meta = {
  url: "https://github.com/navikt/aksel/blob/main/%40navikt/aksel-stylelint/README.md#aksel-design-token-exists",
};

export default ruleFunction;
