// oxlint-disable-next-line typescript/no-require-imports
const commentCheck = require("./comment-check");
// oxlint-disable-next-line typescript/no-require-imports
const importCheck = require("./import-check");
// oxlint-disable-next-line typescript/no-require-imports
const argsCheck = require("./args-check");

module.exports = {
  rules: {
    "args-check": argsCheck,
    "comment-check": commentCheck,
    "import-check": importCheck,
  },
};
