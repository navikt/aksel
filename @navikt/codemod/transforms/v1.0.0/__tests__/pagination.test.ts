export {};

jest.autoMockOff();
const defineTest = require("jscodeshift/dist/testUtils").defineTest;

const tests = ["size", "import", "idempotent"];

for (const test of tests) {
  defineTest(__dirname, "pagination", null, `pagination/${test}`);
}
