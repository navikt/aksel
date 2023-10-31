import { filterCode } from "../filter-code";
import { codeAfter, codeBefore } from "./mockdata";

test("filterCode should remove unwanted code", () => {
  const codeResult = filterCode(codeBefore);

  expect(codeResult).toEqual(codeAfter);
});
