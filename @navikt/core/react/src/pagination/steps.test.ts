import { getSteps } from "./Pagination";

test("getSteps", () => {
  expect(getSteps({ current: 0, count: 7 })).toEqual([0, 1, 2, 3, 4, 5, 6]);

  expect(getSteps({ current: 0, count: 8 })).toEqual([0, 1, 2, 3, 4, 7]);
  expect(getSteps({ current: 4, count: 8 })).toEqual([0, 3, 4, 5, 6, 7]);

  expect(getSteps({ current: 0, count: 9 })).toEqual([0, 1, 2, 3, 4, 8]);
  expect(getSteps({ current: 4, count: 9 })).toEqual([0, 3, 4, 5, 8]);
  expect(getSteps({ current: 5, count: 9 })).toEqual([0, 4, 5, 6, 7, 8]);
});
