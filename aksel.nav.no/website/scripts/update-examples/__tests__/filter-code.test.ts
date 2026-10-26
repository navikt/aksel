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

test("filterCode should remove lint suppression comment lines", async () => {
  const code = `const Example = () => {
  // oxlint-disable-next-line react-hooks/exhaustive-deps
  // oxlint-disable no-console
  // eslint-disable-next-line aksel-local/comment-check
  const a = 1;
  /* oxlint-disable-next-line no-console */
  const b = "oxlint-disable is only mentioned in this string";
  return (
    <div>
      {/* oxlint-disable-next-line jsx-a11y/no-autofocus */}
      <input autoFocus />
      {/** eslint-disable-next-line jsx-a11y/no-autofocus */}
      <span>{a + b}</span>
    </div>
  );
};
// oxlint-enable no-console

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
`;

  const codeResult = await filterCode(code, "");

  expect(codeResult).toEqual(`const Example = () => {
  const a = 1;
  const b = "oxlint-disable is only mentioned in this string";
  return (
    <div>
      <input autoFocus />
      <span>{a + b}</span>
    </div>
  );
};`);
});

test("filterCode should throw on an empty string as input (resulting in empty string output)", async () => {
  await expect(filterCode("", "")).rejects.toThrow();
});
