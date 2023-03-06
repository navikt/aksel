const docs = require("../../docs.json");
const DsTokens = require("../../dist/tokens-cjs.js");
const kebabCase = require("../kebabCase.js");

const flatten = Object.values(docs).reduce((old, val) => [...old, ...val], []);

const notFound = [];
const removed = [];
const wrongValues = [];

describe("Validate tokens dokumentation", () => {
  flatten.forEach((x) => {
    it(`${x} should be documented`, () => {
      expect(
        Object.keys(DsTokens).find(
          (y) => `--${kebabCase(y)}`.replace("--az-", "--a-z-") === x.name
        )
      ).toBeDefined();
    });
  });

  Object.entries(DsTokens).forEach(([key, val]) => {
    const formatedKey = `--${kebabCase(key)}`.replace("--az-", "--a-z-");
    it(`${formatedKey} should exist in docs`, () => {
      const tokenInDoc = flatten.find((x) => x.name === formatedKey);
      expect(tokenInDoc).toBeDefined();
    });

    it(`${formatedKey} should have correct value ${val}`, () => {
      const formatedKey = `--${kebabCase(key)}`.replace("--az-", "--a-z-");

      const tokenInDoc = flatten.find((x) => x.name === formatedKey);
      expect(tokenInDoc?.value).toEqual(val);
    });
  });
});

flatten.forEach((x) => {
  !Object.keys(DsTokens).find(
    (y) => `--${kebabCase(y)}`.replace("--az-", "--a-z-") === x.name
  ) && removed.push(x.name);
});

Object.entries(DsTokens).forEach(([key, val]) => {
  const formatedKey = `--${kebabCase(key)}`.replace("--az-", "--a-z-");

  const tokenInDoc = flatten.find((x) => x.name === formatedKey);
  if (!tokenInDoc) {
    notFound.push(formatedKey);
    return;
  }
  if (tokenInDoc.value !== val) {
    wrongValues.push(`${tokenInDoc.name}: ${tokenInDoc.value}`);
  }
});

if (wrongValues.length || notFound.length || removed.length) {
  console.group("Not documented tokens:");
  console.log(notFound);
  console.groupEnd();

  console.group("Documented tokens not in package:");
  console.log(removed);
  console.groupEnd();

  console.group("Tokens with wrong documentation:");
  console.log(wrongValues);
  console.groupEnd();
  console.log("\n");
  throw new Error("Found errors when validation tokens.");
}
