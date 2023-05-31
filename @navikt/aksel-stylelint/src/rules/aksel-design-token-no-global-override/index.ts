import stylelint from "stylelint";
import { readFileSync } from "node:fs";

import { Node as PostCSSNode } from "postcss";
import { isCustomProperty } from "../../utils";

const packageJson = JSON.parse(
  readFileSync(`${__dirname}/../../../package.json`).toString()
);

const ruleName = "aksel-design-token-no-global-override";

const prefix_a = "--a-";

const packageVersion = packageJson.version;

export const messages = stylelint.utils.ruleMessages(ruleName, {
  propOverrideGlobal: (node: any) =>
    `Overriding ("${node.prop}*") not allowed.\n\n` +
    `Property "${node.prop}" tries to override a global level token ("${prefix_a}"), this is highly discouraged. ` +
    `It is better to override a component level token ("--ac-") or create a custom token instead. ` +
    `Overriding global tokens should only be done when creating custom global themes.` +
    `\n\nVersion: ${packageVersion}`,
});

const checkDeclProp = (
  controlledPrefixes: string[],
  prop: string,
  postcssResult: stylelint.PostcssResult,
  rootNode: PostCSSNode
) => {
  if (
    isCustomProperty(prop) &&
    controlledPrefixes.some((prefix) => prop.startsWith(prefix))
  ) {
    if (prop.startsWith(prefix_a)) {
      stylelint.utils.report({
        message: messages.propOverrideGlobal(rootNode),
        node: rootNode,
        result: postcssResult,
        ruleName,
        word: prop,
      });
    }
  }
};

const ruleFunction: stylelint.Rule = () => {
  return (postcssRoot, postcssResult) => {
    postcssRoot.walkDecls((node) => {
      checkDeclProp([prefix_a], node.prop, postcssResult, node);
    });
  };
};

ruleFunction.ruleName = ruleName;
ruleFunction.messages = {};
ruleFunction.meta = {
  url: `https://github.com/navikt/aksel/blob/main/%40navikt/aksel-stylelint/README.md#${ruleName}`,
};

export default ruleFunction;
