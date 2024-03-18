/**
 * This is hardcoded just for the case `--a-text-width-max` at the moment.
 */
export const getMaxWidth = (tokens: { [key: string]: string | number }) => {
  return { text: tokens["text-width-max"] };
};
