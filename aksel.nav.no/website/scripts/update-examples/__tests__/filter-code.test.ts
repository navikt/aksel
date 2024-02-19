import { expect, test } from "vitest";
import { filterCode } from "../parts/filter-code";
import {
  codeAfter,
  codeAfterExpansionCardIcon,
  codeBefore,
  codeBeforeExpansionCardIcon,
  codeBeforeWithoutExportDefaultDsExample,
} from "./mockdata";

test("filterCode should remove unwanted code", () => {
  const codeResult = filterCode(codeBefore);

  expect(codeResult).toEqual(codeAfter);
});

test("filterCode should remove unwanted code again", () => {
  const codeResult = filterCode(codeBeforeExpansionCardIcon);

  expect(codeResult).toEqual(codeAfterExpansionCardIcon);
});

test("filterCode expects to throw if missing some specific substrings", () => {
  expect(() => {
    filterCode(codeBeforeWithoutExportDefaultDsExample);
  }).toThrow();
});

test("filterCode should throw on an empty string as input (resulting in empty string output)", () => {
  expect(() => {
    filterCode("");
  }).toThrow();
});
