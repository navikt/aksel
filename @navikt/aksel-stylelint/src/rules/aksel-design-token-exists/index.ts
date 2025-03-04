import { readFileSync } from "node:fs";
import valueParser from "postcss-value-parser";
import stylelint from "stylelint";
import { isCustomProperty, tokenExists } from "../../utils";

const packageJson = JSON.parse(
  readFileSync(`${__dirname}/../../../package.json`).toString(),
);

const ruleName = "aksel/design-token-exists";

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

const ruleFunction: stylelint.Rule = () => {
  return (postcssRoot, postcssResult) => {
    postcssRoot.walkDecls((node) => {
      const prop = node.prop;
      const value = node.value;

      /**
       * Walk through the value and check if the value is a custom property
       * and if it is a custom property, check if it is a valid token from Aksel
       */
      valueParser(value).walk((parserNode) => {
        if (
          parserNode.type === "word" &&
          isCustomProperty(parserNode.value) &&
          controlledPrefixes.some((prefix) =>
            parserNode.value.startsWith(prefix),
          ) &&
          !tokenExists(controlledPrefixes, parserNode.value)
        ) {
          stylelint.utils.report({
            message: messages.valueNotExist(node, parserNode.value),
            node,
            result: postcssResult,
            ruleName,
            word: node.value,
          });
        }
      });

      /**
       * Check if the property is a custom property and if it is a custom property,
       * And if it is a custom property, check if it is a valid token from Aksel
       */
      if (
        isCustomProperty(prop) &&
        controlledPrefixes.some((prefix) => prop.startsWith(prefix)) &&
        !tokenExists(controlledPrefixes, prop)
      ) {
        stylelint.utils.report({
          message: messages.propNotExist(node),
          node,
          result: postcssResult,
          ruleName,
          word: prop,
        });
      }
    });
  };
};

ruleFunction.ruleName = ruleName;
ruleFunction.messages = {};
ruleFunction.meta = {
  url: `https://github.com/navikt/aksel/blob/main/%40navikt/aksel-stylelint/README.md#${ruleName}`,
};

export default ruleFunction;
