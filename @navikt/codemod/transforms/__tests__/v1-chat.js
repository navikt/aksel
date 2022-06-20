jest.autoMockOff();
const defineTest = require("jscodeshift/dist/testUtils").defineTest;
const tests = [
  {
    fixture: "props",
  },
];
for (const test of tests) {
  defineTest(__dirname, "rename-prop", null, `rename-prop/${test.fixture}`);
}
