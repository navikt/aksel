const docs = require("../docs.json");
const DsTokens = require("../dist/tokens-cjs.js");
const kebabCase = require("./kebabCase.js");

const flatten = Object.values(docs).reduce((old, val) => [...old, ...val], []);

const notFound = [];
const removed = [];
const wrongValues = [];

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
