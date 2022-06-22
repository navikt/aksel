export {};

jest.autoMockOff();
const defineTest = require("jscodeshift/dist/testUtils").defineTest;

const tests = ["props", "idempotent", "complete"];

for (const test of tests) {
  defineTest(__dirname, "tabs", null, `tabs/${test}`);
}
