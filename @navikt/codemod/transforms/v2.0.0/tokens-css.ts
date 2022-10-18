/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);

  // TODO: Map over all old -> new for file
  const rgx = new RegExp(/(--navds-[a-z-0-9\s]+)/gm);
  console.log(file.source.replace(rgx, "--a-test"));

  // Regex var:

  return root.toSource(options.printOptions);
}
