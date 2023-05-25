import Reducer from "./reducer";

export const getBreakpoints = (tokens: { [key: string]: string | number }) => {
  const breakpoints = Reducer(tokens, ["breakpoint"]);

  return Object.keys(breakpoints)
    .filter((key) => !key.includes("xs") && !key.includes("-down"))
    .reduce((cur, key) => {
      return Object.assign(cur, { [key]: breakpoints[key] });
    }, {});
};
