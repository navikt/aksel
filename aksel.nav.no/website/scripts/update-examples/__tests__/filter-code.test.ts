import { filterCode } from "../parts/filter-code";
import {
  codeAfter,
  codeAfterExpansionCardIcon,
  codeBefore,
  codeBeforeExpansionCardIcon,
} from "./mockdata";

test("filterCode should remove unwanted code", () => {
  const codeResult = filterCode(codeBefore);

  expect(codeResult).toEqual(codeAfter);
});

test("filterCode should remove unwanted code again", () => {
  const codeResult = filterCode(codeBeforeExpansionCardIcon);

  expect(codeResult).toEqual(codeAfterExpansionCardIcon);
});
