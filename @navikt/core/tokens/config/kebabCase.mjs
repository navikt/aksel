import { default as lodashKebabCase } from "lodash.camelcase";

export function kebabCase(value) {
  return lodashKebabCase(value).replace(/(^|-)(\d+)-(x[ls])/g, "$1$2$3");
}
