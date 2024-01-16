import Reducer from "./reducer";

/**
 * @note This is made just for the case `--a-text-width-max` at the moment
 */
export const getMaxWidth = (tokens: { [key: string]: string | number }) => {
  const widths = Reducer(tokens, ["text-width"]);

  return Object.keys(widths).reduce((cur, key) => {
    return Object.assign(cur, { [`--a-text-width-${key}`]: widths[key] });
  }, {});
};
