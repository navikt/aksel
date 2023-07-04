import { readFileSync } from "node:fs";
import valueParser from "postcss-value-parser";

export const isCustomProperty = (property) => {
  return property.startsWith("--");
};

export const matchesStringOrRegExp = (input, comparison) => {
  if (!Array.isArray(input)) {
    return testAgainstStringOrRegExpOrArray(input, comparison);
  }

  for (const inputItem of input) {
    const testResult = testAgainstStringOrRegExpOrArray(inputItem, comparison);

    if (testResult) {
      return testResult;
    }
  }

  return false;
};

export const testAgainstStringOrRegExpOrArray = (value, comparison) => {
  if (!Array.isArray(comparison)) {
    return testAgainstStringOrRegExp(value, comparison);
  }

  for (const comparisonItem of comparison) {
    const testResult = testAgainstStringOrRegExp(value, comparisonItem);

    if (testResult) {
      return testResult;
    }
  }

  return false;
};

export const testAgainstStringOrRegExp = (value, comparison) => {
  // If it's a RegExp, test directly
  if (comparison instanceof RegExp) {
    return comparison.test(value)
      ? { match: value, pattern: comparison }
      : false;
  }

  // Check if it's RegExp in a string
  const firstComparisonChar = comparison[0];
  const lastComparisonChar = comparison[comparison.length - 1];
  const secondToLastComparisonChar = comparison[comparison.length - 2];

  const comparisonIsRegex =
    firstComparisonChar === "/" &&
    (lastComparisonChar === "/" ||
      (secondToLastComparisonChar === "/" && lastComparisonChar === "i"));

  const hasCaseInsensitiveFlag =
    comparisonIsRegex && lastComparisonChar === "i";

  // If so, create a new RegExp from it
  if (comparisonIsRegex) {
    const valueMatches = hasCaseInsensitiveFlag
      ? new RegExp(comparison.slice(1, -2), "i").test(value)
      : new RegExp(comparison.slice(1, -1)).test(value);

    return valueMatches ? { match: value, pattern: comparison } : false;
  }

  // Otherwise, it's a string. Do a strict comparison
  return value === comparison ? { match: value, pattern: comparison } : false;
};

export const vendorUnprefixed = (prop) => {
  return prop.replace(/^-\w+-/, "");
};

export const flattenObject = (obj) => {
  const flattened = Object.keys(obj).reduce((acc, key) => {
    if (typeof obj[key] === "string") {
      acc.push(key);
    } else {
      acc.push(flattenObject(obj[key]));
    }
    return acc;
  }, []);
  return flattened.flat();
};

const tokenCSSFile = "./index.css";
const tokenJsonFile = "./tokens.json";

let allowedTokenNames = [];

export const addTokens = (
  tokenJSONFile: string,
  allowedTokenNames: string[]
) => {
  const jsonFileBuffer = readFileSync(`${__dirname}/${tokenJSONFile}`);
  const fileString = jsonFileBuffer.toString();
  const flattened = flattenObject(JSON.parse(fileString));
  flattened.forEach((token) => allowedTokenNames.push(token));
};

export const tokenExists = (
  controlledPrefixes: string[],
  inputToken: string
) => {
  // "singleton" if statement (attempt at caching file parsing)
  if (!allowedTokenNames.length) {
    const cssFileBuffer = readFileSync(`${__dirname}/${tokenCSSFile}`);
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
  }

  return allowedTokenNames.includes(inputToken);
};

const packageJson = JSON.parse(
  readFileSync(`${__dirname}/../package.json`).toString()
);

export const getPackageVersion = () => {
  return packageJson.version;
};
