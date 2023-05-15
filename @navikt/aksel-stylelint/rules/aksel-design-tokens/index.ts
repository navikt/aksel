import stylelint from "stylelint";
import valueParser from "postcss-value-parser";
import { isCustomProperty } from "./utils";

import { readFileSync } from "node:fs";

const ruleName = "@navikt/aksel-design-tokens";

let allowedTokenNames = [];

const errorMessage = (
  type: "prop" | "value",
  node,
  controlledPrefixes,
  invalidValues?: string[]
) => {
  if (type === "value") {
    return (
      `property "${node.prop}" has offending value(s) "${invalidValues}", ` +
      `and the value seems like it intends to reference a design token by ` +
      `using one of the following prefixes [${controlledPrefixes}]. ` +
      `However, that token doesn't seem to exist in the design system.`
    );
  }
  return (
    `property "${node.prop}" has a name that seems like it intends to override a design token by ` +
    `using one of the following prefixes [${controlledPrefixes}]. ` +
    `However, that token doesn't seem to exist in the design system.`
  );
};

const isValidToken = (
  tokenDefinitionsFile: string,
  controlledPrefixes,
  inputToken: string
) => {
  if (!allowedTokenNames.length) {
    const fileBuffer = readFileSync(tokenDefinitionsFile);
    const fileString = fileBuffer.toString();

    valueParser(fileString).walk((node) => {
      if (
        node.type === "word" &&
        isCustomProperty(node.value) &&
        controlledPrefixes.some((prefix) => node.value.match(prefix) !== null)
      ) {
        allowedTokenNames.push(node.value);
      }
    });
  }

  return allowedTokenNames.some((element) => element === inputToken);
};

const getInvalidPropName = (
  tokenDefinitionsFile: string,
  controlledPrefixes,
  prop: string
) => {
  const invalidValues: string[] = [];

  if (
    isCustomProperty(prop) &&
    controlledPrefixes.some((prefix) => prop.match(prefix) !== null) &&
    !isValidToken(tokenDefinitionsFile, controlledPrefixes, prop)
  ) {
    invalidValues.push(prop);
  }

  if (invalidValues.length > 0) return invalidValues;
};

const getInvalidVariableNames = (
  tokenDefinitionsFile: string,
  controlledPrefixes,
  value
): string[] => {
  const invalidValues: string[] = [];

  valueParser(value).walk((node) => {
    if (
      node.type === "word" &&
      isCustomProperty(node.value) &&
      controlledPrefixes.some((prefix) => node.value.match(prefix) !== null) &&
      !isValidToken(tokenDefinitionsFile, controlledPrefixes, node.value)
    ) {
      invalidValues.push(node.value);
    }
  });

  if (invalidValues.length > 0) return invalidValues;
};

type PrimaryOptions = {
  controlledPrefixes?: (string | RegExp)[];
  tokenDefinitionsFile: string;
};

const ruleFunction: stylelint.Rule<PrimaryOptions, object> = (
  primaryOption,
  _secondaryOptionObject
) => {
  return (postcssRoot, postcssResult) => {
    const { controlledPrefixes = [], tokenDefinitionsFile } = primaryOption;

    postcssRoot.walkDecls((node) => {
      const prop = node.prop;
      const value = node.value;

      const invalidPropNames = getInvalidPropName(
        tokenDefinitionsFile,
        controlledPrefixes,
        prop
      );

      const invalidCustomProperties = getInvalidVariableNames(
        tokenDefinitionsFile,
        controlledPrefixes,
        value
      );

      if (invalidCustomProperties) {
        stylelint.utils.report({
          message: errorMessage(
            "value",
            node,
            controlledPrefixes,
            invalidCustomProperties
          ),
          node,
          result: postcssResult,
          ruleName,
          // start: node.source.start,
          // end: { column: node.source.end.column + node.prop.length, line: node.source.end.line}
        });
      }

      if (invalidPropNames) {
        stylelint.utils.report({
          message: errorMessage("prop", node, controlledPrefixes),
          node,
          result: postcssResult,
          ruleName,
          // start: node.source.start,
          // end: { column: node.source.end.column + node.prop.length, line: node.source.end.line}
        });
      }
    });
  };
};

ruleFunction.ruleName = ruleName;
ruleFunction.messages = {};

export default ruleFunction;
