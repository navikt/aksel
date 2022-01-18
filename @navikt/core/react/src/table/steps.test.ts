const getSteps = ({ current, stepCount }) =>
  new Array(stepCount)
    .fill(null)
    .map((_, i) => i)
    .filter((n) => {
      if (n === stepCount - 1 || n === 0) {
        return true;
      }
      if (n >= current - 1 && n <= current + 1) {
        return true;
      }
      if (current <= 2 && n === 2) {
        return true;
      }
      if (current >= stepCount - 3 && n === stepCount - 3) {
        return true;
      }
      return false;
    });

test("wat", () => {
  expect(getSteps({ current: 0, stepCount: 1 })).toEqual([0]);
  expect(getSteps({ current: 0, stepCount: 2 })).toEqual([0, 1]);
  expect(getSteps({ current: 0, stepCount: 4 })).toEqual([0, 1, 2, 3]);

  expect(getSteps({ current: 0, stepCount: 5 })).toEqual([0, 1, 2, 4]);
  expect(getSteps({ current: 1, stepCount: 5 })).toEqual([0, 1, 2, 4]);
  expect(getSteps({ current: 2, stepCount: 5 })).toEqual([0, 1, 2, 3, 4]);
  expect(getSteps({ current: 3, stepCount: 5 })).toEqual([0, 2, 3, 4]);
  expect(getSteps({ current: 4, stepCount: 5 })).toEqual([0, 2, 3, 4]);

  expect(getSteps({ current: 0, stepCount: 6 })).toEqual([0, 1, 2, 5]);
  expect(getSteps({ current: 1, stepCount: 6 })).toEqual([0, 1, 2, 5]);
  expect(getSteps({ current: 2, stepCount: 6 })).toEqual([0, 1, 2, 3, 5]);
  expect(getSteps({ current: 3, stepCount: 6 })).toEqual([0, 2, 3, 4, 5]);
  expect(getSteps({ current: 4, stepCount: 6 })).toEqual([0, 3, 4, 5]);
  expect(getSteps({ current: 5, stepCount: 6 })).toEqual([0, 3, 4, 5]);

  expect(getSteps({ current: 3, stepCount: 7 })).toEqual([0, 2, 3, 4, 6]);
});
