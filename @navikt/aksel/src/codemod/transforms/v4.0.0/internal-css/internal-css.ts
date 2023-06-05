const cssConversions = {
  ".navdsi-dropdown": ".navds-dropdown",
  ".navdsi-header": ".navds-internalheader",
  ".navdsi-timeline": ".navds-timeline",
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
