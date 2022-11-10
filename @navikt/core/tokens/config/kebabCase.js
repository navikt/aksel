const _ = require("lodash");

module.exports = (string) =>
  _.kebabCase(string).replace(/(^|-)(\d+)-(x[ls])/g, "$1$2$3");
