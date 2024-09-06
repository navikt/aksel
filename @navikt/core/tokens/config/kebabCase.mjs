import { default as lodashKebabCase } from "lodash.kebabcase";

export function kebabCase(string) {
  return lodashKebabCase(string).replace(/(^|-)(\d+)-(x[ls])/g, "$1$2$3");
}
