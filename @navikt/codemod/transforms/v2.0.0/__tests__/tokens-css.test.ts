export {};

jest.autoMockOff();
const defineTest = require("jscodeshift/dist/testUtils").defineTest;

const tests = ["complete"];

for (const test of tests) {
  defineTest(__dirname, "tokens-css", null, `tokens-css/${test}`);
}
