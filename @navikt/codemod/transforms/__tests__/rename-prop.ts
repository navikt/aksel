export {};

jest.autoMockOff();
const defineTest = require("jscodeshift/dist/testUtils").defineTest;

const tests = [
  {
    fixture: "rename",
    options: {
      component: "SpeechBubble",
      from: "illustration",
      to: "avatar",
    },
  },
];

for (const test of tests) {
  defineTest(
    __dirname,
    "rename-prop",
    test.options,
    `rename-prop/${test.fixture}`
  );
}
