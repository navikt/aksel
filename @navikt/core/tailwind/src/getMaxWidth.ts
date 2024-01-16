import Reducer from "./reducer";

/**
 * @note This is hardcoded just for the case `--a-text-width-max` at the moment
 */
export const getMaxWidth = (tokens: { [key: string]: string | number }) => {
  const width = Reducer(tokens, ["text-width-max"]);

  return { text: Object.values(width)[0] };
};
