export {};

jest.autoMockOff();
const defineTest = require("jscodeshift/dist/testUtils").defineTest;

const tests = ["props", "complete"];

for (const test of tests) {
  defineTest(__dirname, "chat", null, `chat/${test}`);
}
