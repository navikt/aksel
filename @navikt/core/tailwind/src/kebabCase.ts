const _ = require("lodash");

const kebabCase = (string) =>
  _.kebabCase(string).replace(/(^|-)(\d+)-(x[ls])/g, "$1$2$3");

export default kebabCase;
