const packageJson = require("../package.json");

/* Make package-version accessible for github-workflow */
console.log(packageJson.version);
