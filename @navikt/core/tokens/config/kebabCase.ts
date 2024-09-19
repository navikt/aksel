import _ from "lodash";

export function kebabCase(string) {
  return _.kebabCase(string).replace(/(^|-)(\d+)-(x[ls])/g, "$1$2$3");
}
