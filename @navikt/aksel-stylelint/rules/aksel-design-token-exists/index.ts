import stylelint from "stylelint";
import valueParser from "postcss-value-parser";
import { readFileSync } from "node:fs";

import { flattenObject, isCustomProperty } from "./utils";
import { Node as PostCSSNode } from "postcss";

const ruleName = "@navikt/aksel-design-token-exists";

const tokenDefinitionsFile = "./index.css";
const overrideableTokenDefinitionsJSONFile = "./tokens.json";
const controlledPrefixes = [/^--ac-.+/, /^--a-.+/];

let allowedTokenNames = [];

const packageJson = JSON.parse(
  readFileSync(`${__dirname}/../../../package.json`).toString()
);
const packageVersion = packageJson.version;

const errorMessage = (
  type: "prop" | "value",
  node,
  controlledPrefixes: RegExp[],
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

const isValidToken = (
  tokenDefinitionsFile: string,
  overrideableTokenDefinitionsJSONFile: string,
  controlledPrefixes: RegExp[],
  inputToken: string
) => {
  // "singleton" if statement (attempt at caching file parsing)
  if (!allowedTokenNames.length) {
    const cssFileBuffer = readFileSync(
      `${__dirname}/../../${tokenDefinitionsFile}`
    );
    const cssFileString = cssFileBuffer.toString();

    valueParser(cssFileString).walk((node) => {
      if (
        node.type === "word" &&
        isCustomProperty(node.value) &&
        controlledPrefixes.some((prefix) => node.value.match(prefix) !== null)
      ) {
        allowedTokenNames.push(node.value);
      }
    });

    const jsonFileBuffer = readFileSync(
      `${__dirname}/../../${overrideableTokenDefinitionsJSONFile}`
    );
    const fileString = jsonFileBuffer.toString();

    const flattened = flattenObject(JSON.parse(fileString));
    flattened.forEach((token) => allowedTokenNames.push(token));
  }

  return allowedTokenNames.some((element) => element === inputToken);
};

const getInvalidPropName = (
  tokenDefinitionsFile: string,
  overrideableTokenDefinitionsJSONFile: string,
  controlledPrefixes: RegExp[],
  prop: string
) => {
  const invalidValues: string[] = [];

  if (
    isCustomProperty(prop) &&
    controlledPrefixes.some((prefix) => prop.match(prefix) !== null) &&
    !isValidToken(
      tokenDefinitionsFile,
      overrideableTokenDefinitionsJSONFile,
      controlledPrefixes,
      prop
    )
  ) {
    invalidValues.push(prop);
  }

  if (invalidValues.length > 0) return invalidValues;
};

const checkInvalidVariableNames = (
  tokenDefinitionsFile: string,
  overrideableTokenDefinitionsJSONFile: string,
  controlledPrefixes: RegExp[],
  value: string,
  postcssResult: stylelint.PostcssResult,
  rootNode: PostCSSNode
): string[] => {
  const invalidValues: string[] = [];

  valueParser(value).walk((node) => {
    if (
      node.type === "word" &&
      isCustomProperty(node.value) &&
      controlledPrefixes.some((prefix) => node.value.match(prefix) !== null) &&
      !isValidToken(
        tokenDefinitionsFile,
        overrideableTokenDefinitionsJSONFile,
        controlledPrefixes,
        node.value
      )
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

      const invalidPropNames = getInvalidPropName(
        tokenDefinitionsFile,
        overrideableTokenDefinitionsJSONFile,
        controlledPrefixes,
        prop
      );

      checkInvalidVariableNames(
        tokenDefinitionsFile,
        overrideableTokenDefinitionsJSONFile,
        controlledPrefixes,
        value,
        postcssResult,
        node
      );

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
  url: "https://github.com/navikt/aksel/@navikt/aksel-stylelint/README.md#aksel-design-token-exists",
};

export default ruleFunction;
