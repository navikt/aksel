import stylelint from "stylelint";
import valueParser from "postcss-value-parser";
import { readFileSync } from "node:fs";
import { Node as PostCSSNode } from "postcss";

import { isCustomProperty, tokenExists } from "../../utils";

const packageJson = JSON.parse(
  readFileSync(`${__dirname}/../../../package.json`).toString()
);

const ruleName = "aksel-design-token-exists";

const prefix_a = "--a-";
const prefix_ac = "--ac-";
export const controlledPrefixes = [prefix_a, prefix_ac];

const packageVersion = packageJson.version;

export const messages = stylelint.utils.ruleMessages(ruleName, {
  propNotExist: (node: any) =>
    `("${node.prop}") does not exist in the design system.\n\n` +
    `Property "${node.prop}" has a name that seems like it intends to override a design token by ` +
    `using one of the following prefixes [${controlledPrefixes}]. ` +
    `However, that token doesn"t seem to exist in the design system. ` +
    `\n\nVersion: ${packageVersion}`,
  valueNotExist: (node: any, invalidValues: string) =>
    `("${invalidValues}") does not exist in the design system.\n\n` +
    `Property "${node.prop}" has offending value "${invalidValues}", ` +
    `and the value seems like it intends to reference a design token by ` +
    `using one of the following prefixes [${controlledPrefixes}]. ` +
    `However, that token doesn't seem to exist in the design system. ` +
    `\n\nVersion: ${packageVersion}`,
});

const checkDeclValue = (
  controlledPrefixes: string[],
  value: string,
  postcssResult: stylelint.PostcssResult,
  rootNode: PostCSSNode
) => {
  valueParser(value).walk((node) => {
    if (
      node.type === "word" &&
      isCustomProperty(node.value) &&
      controlledPrefixes.some((prefix) => node.value.startsWith(prefix)) &&
      !tokenExists(controlledPrefixes, node.value)
    ) {
      stylelint.utils.report({
        message: messages.valueNotExist(rootNode, node.value),
        node: rootNode,
        result: postcssResult,
        ruleName,
        word: node.value,
      });
    }
  });
};

const checkDeclProp = (
  controlledPrefixes: string[],
  prop: string,
  postcssResult: stylelint.PostcssResult,
  rootNode: PostCSSNode
) => {
  if (
    isCustomProperty(prop) &&
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
};

const ruleFunction: stylelint.Rule = () => {
  return (postcssRoot, postcssResult) => {
    postcssRoot.walkDecls((node) => {
      checkDeclValue(controlledPrefixes, node.value, postcssResult, node);
      checkDeclProp(controlledPrefixes, node.prop, postcssResult, node);
    });
  };
};

ruleFunction.ruleName = ruleName;
ruleFunction.messages = {};
ruleFunction.meta = {
  url: `https://github.com/navikt/aksel/blob/main/%40navikt/aksel-stylelint/README.md#${ruleName}`,
};

export default ruleFunction;
