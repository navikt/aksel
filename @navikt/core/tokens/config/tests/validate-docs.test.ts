import { describe, expect, test } from "vitest";
import DsTokens from "../../dist/tokens-cjs.js";
import docs from "../../docs.json";
import kebabCase from "../kebabCase.js";

const flatten = Object.values(docs).flat();

const notFound: string[] = [];
const removed: string[] = [];
const wrongValues: string[] = [];

describe("Validate tokens dokumentation", () => {
  flatten.forEach((x) => {
    test(`${x.name} should be documented`, () => {
      expect(
        Object.keys(DsTokens).find(
          (y) => `--${kebabCase(y)}`.replace("--az-", "--a-z-") === x.name,
        ),
      ).toBeDefined();
    });
  });

  Object.entries(DsTokens).forEach(([key, val]) => {
    const formatedKey = `--${kebabCase(key)}`.replace("--az-", "--a-z-");
    test(`${formatedKey} should exist in docs and have correct value`, () => {
      const tokenInDoc = flatten.find((x) => x.name === formatedKey);
      expect(tokenInDoc).toBeDefined();
      expect(tokenInDoc?.value).toEqual(val);
    });
  });
});

flatten.forEach((x) => {
  !Object.keys(DsTokens).find(
    (y) => `--${kebabCase(y)}`.replace("--az-", "--a-z-") === x.name,
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
  console.info(notFound);
  console.groupEnd();

  console.group("Documented tokens not in package:");
  console.info(removed);
  console.groupEnd();

  console.group("Tokens with wrong documentation:");
  console.info(wrongValues);
  console.groupEnd();
  console.info("\n");
}
