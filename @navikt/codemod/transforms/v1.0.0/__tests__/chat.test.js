"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
jest.autoMockOff();
const defineTest = require("jscodeshift/dist/testUtils").defineTest;
const tests = ["props", "complete", "idempotent", "renamed"];
for (const test of tests) {
  defineTest(__dirname, "chat", null, `chat/${test}`);
}
