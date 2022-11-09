import cssTokens from "./update-css-tokens/update-css-tokens";
import jsTokens from "./update-js-tokens/update-js-tokens";
import lessTokens from "./update-less-tokens/update-less-tokens";
import sassTokens from "./update-sass-tokens/update-sass-tokens";
import tailwindTokens from "./update-tailwind-tokens/update-tailwind-tokens";

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  file.source = cssTokens(file, api);
  file.source = jsTokens(file, api);
  file.source = lessTokens(file, api);
  file.source = sassTokens(file, api);
  file.source = tailwindTokens(file, api);

  return file.source;
}
