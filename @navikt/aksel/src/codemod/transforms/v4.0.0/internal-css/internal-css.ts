const cssConversions = {
  ".navdsi-dropdown": ".navds-dropdown",
  ".navdsi-header": ".navds-internalheader",
  ".navdsi-timeline": ".navds-timeline",
  "--ac-header-bg": "--ac-internalheader-bg",
  "--ac-header-divider": "--ac-internalheader-divider",
  "--ac-header-text": "--ac-internalheader-text",
  "--ac-header-hover-bg": "--ac-internalheader-hover-bg",
  "--ac-header-active-bg": "--ac-internalheader-active-bg",
};
/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file) {
  let src = file.source;

  Object.entries(cssConversions).forEach(([key, value]) => {
    src = src.replaceAll(key, value);
  });

  return src;
}
