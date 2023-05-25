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
const prefix_a = "--a-";
const prefix_ac = "--ac-";

let allowedTokenNames = [];

const packageVersion = packageJson.version;

export const messages = stylelint.utils.ruleMessages(ruleName, {
  propNotExist: (node: any) =>
    `property "${node.prop}" has a name that seems like it intends to override a design token by ` +
    `using one of the following prefixes [${controlledPrefixes}]. ` +
    `However, that token doesn't seem to exist in the design system. ` +
    `\n\nVersion: ${packageVersion}`,
  propOverrideGlobal: (node: any) =>
    `property "${node.prop}" tries to override a global level token, this is highly discouraged. ` +
    `It is better to override a component level token ('--ac-') or create a custom token instead. ` +
    `\n\nVersion: ${packageVersion}`,
  valueRefComponent: (node: any, invalidValues: string) =>
    `property "${node.prop}" has offending value "${invalidValues}". ` +
    `The value references a component level token. It is better to either reference a global level token ('--a-') or ` +
    `create a custom token instead. ` +
    `\n\nVersion: ${packageVersion}`,
  valueNotExist: (node: any, invalidValues: string) =>
    `property "${node.prop}" has offending value "${invalidValues}", ` +
    `and the value seems like it intends to reference a design token by ` +
    `using one of the following prefixes [${controlledPrefixes}]. ` +
    `However, that token doesn't seem to exist in the design system. ` +
    `\n\nVersion: ${packageVersion}`,
});

const addTokens = (tokenJSONFile: string, allowedTokenNames: string[]) => {
  const jsonFileBuffer = readFileSync(`${__dirname}/../../${tokenJSONFile}`);
  const fileString = jsonFileBuffer.toString();
  const flattened = flattenObject(JSON.parse(fileString));
  flattened.forEach((token) => allowedTokenNames.push(token));
};

const tokenExists = (controlledPrefixes: string[], inputToken: string) => {
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

const checkDeclValue = (
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
      node.value.startsWith(prefix_ac)
    ) {
      if (tokenExists(controlledPrefixes, node.value)) {
        stylelint.utils.report({
          message: messages.valueRefComponent(rootNode, node.value),
          node: rootNode,
          result: postcssResult,
          ruleName,
          word: node.value,
        });
      }
      if (!tokenExists(controlledPrefixes, node.value))
        stylelint.utils.report({
          message: messages.valueNotExist(rootNode, node.value),
          node: rootNode,
          result: postcssResult,
          ruleName,
          word: node.value,
        });
    } else if (
      node.type === "word" &&
      isCustomProperty(node.value) &&
      node.value.startsWith(prefix_a)
    ) {
      if (!tokenExists(controlledPrefixes, node.value)) {
        stylelint.utils.report({
          message: messages.valueNotExist(rootNode, node.value),
          node: rootNode,
          result: postcssResult,
          ruleName,
          word: node.value,
        });
      }
    }
  });

  if (invalidValues.length > 0) return invalidValues;
};

const checkDeclProp = (
  controlledPrefixes: string[],
  prop: string,
  postcssResult: stylelint.PostcssResult,
  rootNode: PostCSSNode
) => {
  if (isCustomProperty(prop)) {
    if (controlledPrefixes.some((prefix) => prop.startsWith(prefix))) {
      if (prop.startsWith(prefix_a) && tokenExists(controlledPrefixes, prop)) {
        stylelint.utils.report({
          message: messages.propOverrideGlobal(rootNode),
          node: rootNode,
          result: postcssResult,
          ruleName,
          word: prop,
        });
        if (!tokenExists(controlledPrefixes, prop)) {
          stylelint.utils.report({
            message: messages.propNotExist(rootNode),
            node: rootNode,
            result: postcssResult,
            ruleName,
            word: prop,
          });
        }
      } else if (
        controlledPrefixes.some((prefix) => prop.startsWith(prefix)) &&
        !tokenExists(controlledPrefixes, prop)
      ) {
        stylelint.utils.report({
          message: messages.propNotExist(rootNode),
          node: rootNode,
          result: postcssResult,
          ruleName,
          word: prop,
        });
      }
    }
  }
};

const ruleFunction: stylelint.Rule = () => {
  return (postcssRoot, postcssResult) => {
    postcssRoot.walkDecls((node) => {
      const prop = node.prop;
      const value = node.value;

      checkDeclValue(controlledPrefixes, value, postcssResult, node);
      checkDeclProp(controlledPrefixes, prop, postcssResult, node);
    });
  };
};

ruleFunction.ruleName = ruleName;
ruleFunction.messages = {};
ruleFunction.meta = {
  url: "https://github.com/navikt/aksel/blob/main/%40navikt/aksel-stylelint/README.md#aksel-design-token-exists",
};

export default ruleFunction;
