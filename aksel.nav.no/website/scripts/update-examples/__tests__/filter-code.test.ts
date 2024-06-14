import { expect, test } from "vitest";
import { filterCode } from "../parts/filter-code";
import {
  codeAfter,
  codeAfterExpansionCardIcon,
  codeBefore,
  codeBeforeExpansionCardIcon,
  codeBeforeWithoutExportDefaultDsExample,
} from "./mockdata";

test("filterCode should remove unwanted code", async () => {
  const codeResult = await filterCode(codeBefore, "");

  expect(codeResult).toEqual(codeAfter);
});

test("filterCode should remove unwanted code again", async () => {
  const codeResult = await filterCode(codeBeforeExpansionCardIcon, "");

  expect(codeResult).toEqual(codeAfterExpansionCardIcon);
});

test("filterCode should reject if missing some specific substrings", async () => {
  await expect(
    filterCode(codeBeforeWithoutExportDefaultDsExample, ""),
  ).rejects.toThrow();
});

test("filterCode should throw on an empty string as input (resulting in empty string output)", async () => {
  await expect(filterCode("", "")).rejects.toThrow();
});
