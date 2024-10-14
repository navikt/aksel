import _ from "lodash";

export function kebabCase(string: string) {
  return _.kebabCase(string).replace(/(^|-)(\d+)-(x[ls])/g, "$1$2$3");
}

export function kebabCaseForAlpha(string: string) {
  const resultString = _.kebabCase(string).replace(
    /(^|-)(\d+)-(x[ls])/g,
    "$1$2$3",
  );

  if (resultString.endsWith("-a")) {
    /* console.info(`${resultString} | ${resultString.replace(/-a$/, "A")}`); */
    return resultString.replace(/-a$/, "A");
  }

  return resultString;
}
