const commentCheck = require("./comment-check");
const importCheck = require("./import-check");
const argsCheck = require("./args-check");

module.exports = {
  rules: {
    "args-check": argsCheck,
    "comment-check": commentCheck,
    "import-check": importCheck,
  },
};
