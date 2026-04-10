import { readFileSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import valueParser from "postcss-value-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const flattenObject = (
  obj: Record<string, string | Record<string, string>>,
) => {
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

const tokenCSSFile = "./global-tokens.css";
const tokenJsonFile = "./component-tokens.json";

const allowedTokenNames = [];

export const tokenExists = (
  controlledPrefixes: string[],
  inputToken: string,
) => {
  // "singleton" if statement (attempt at caching file parsing)
  if (!allowedTokenNames.length) {
    const cssFileBuffer = readFileSync(`${__dirname}/${tokenCSSFile}`);
    const cssFileString = cssFileBuffer.toString();
    valueParser(cssFileString).walk((node) => {
      if (
        node.type === "word" &&
        controlledPrefixes.some((prefix) => node.value.startsWith(prefix))
      ) {
        allowedTokenNames.push(node.value);
      }
    });

    const jsonFileBuffer = readFileSync(`${__dirname}/${tokenJsonFile}`);
    const flattened = flattenObject(JSON.parse(jsonFileBuffer.toString()));
    flattened.forEach((token) => {
      allowedTokenNames.push(token);
    });
  }

  return allowedTokenNames.includes(inputToken);
};

const packageJson = JSON.parse(
  readFileSync(`${__dirname}/../package.json`).toString(),
);

export const getPackageVersion = () => {
  return packageJson.version;
};
