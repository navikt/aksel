const commentCheck = require("./comment-check");
const importCheck = require("./import-check");

module.exports = {
  rules: { "comment-check": commentCheck, "import-check": importCheck },
};
