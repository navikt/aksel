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
    // eslint-disable-next-line no-useless-concat
    const rgx = new RegExp(`${key}`, "gm");
    src = src.replace(rgx, `${value}`);
  });

  return src;
}
