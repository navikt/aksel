const packageJson = require("../package.json");

/* Make package-version accessible for github-workflow */
console.info(packageJson.version);
