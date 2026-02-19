import valueParser from "postcss-value-parser";
import stylelint from "stylelint";
import {
  getPackageVersion,
  isCustomProperty,
  tokenExists,
} from "../../utils.js";

const ruleName = "aksel/design-token-exists";
const prefix = "--ax-";
const packageVersion = getPackageVersion();

export const messages = stylelint.utils.ruleMessages(ruleName, {
  propNotExist: (node: any) =>
    `"${node.prop}" does not exist in the design system. \n\n` +
    `Property "${node.prop}" seems like it intends to override a design token by ` +
    `using the prefix "${prefix}". However, that token doesn't seem to exist in the design system. ` +
    `\n\nVersion: ${packageVersion}`,
  valueNotExist: (node: any, invalidValues: string) =>
    `"${invalidValues}" does not exist in the design system. \n\n` +
    `Property "${node.prop}" has offending value "${invalidValues}", ` +
    `and the value seems like it intends to reference a design token by ` +
    `using the prefix "${prefix}". However, that token doesn't seem to exist in the design system. ` +
    `\n\nVersion: ${packageVersion}`,
});

const checkDeclValue = (
  value: string,
  postcssResult: stylelint.PostcssResult,
  rootNode: stylelint.Problem["node"],
) => {
  valueParser(value).walk((node) => {
    if (
      node.type === "word" &&
      isCustomProperty(node.value) &&
      node.value.startsWith(prefix) &&
      !tokenExists([prefix], node.value)
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
  prop: string,
  postcssResult: stylelint.PostcssResult,
  rootNode: stylelint.Problem["node"],
) => {
  if (
    isCustomProperty(prop) &&
    prop.startsWith(prefix) &&
    !tokenExists([prefix], prop)
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
      checkDeclValue(node.value, postcssResult, node);
      checkDeclProp(node.prop, postcssResult, node);
    });
  };
};

ruleFunction.ruleName = ruleName;
ruleFunction.messages = {};
ruleFunction.meta = {
  url: `https://github.com/navikt/aksel/blob/main/%40navikt/aksel-stylelint/README.md#${ruleName}`,
};

export default ruleFunction;
