jest.autoMockOff();
const defineTest = require("jscodeshift/dist/testUtils").defineTest;
const fixtures = ["test"];
for (const fixture of fixtures) {
  defineTest(__dirname, "v1-chat", null, `v1-chat/${fixture}`);
}
//# sourceMappingURL=v1-chat.js.map
