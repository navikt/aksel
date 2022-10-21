// TODO: Hent utenfra
export const tokens = [
  ["--navds-global-color-red-100", "--a-red-100"],
  ["--navds-global-color-green-100", "--a-green-100"],
  ["--navds-global-color-blue-100", "--a-blue-100"],
  ["--navds-global-color-blue-200", "--a-blue-200"],
  ["--navds-global-color-blue-400", "--a-blue-400"],
  ["--navds-global-color-green-100", "--a-green-100"],
  ["--navds-global-color-green-500", "--a-green-500"],
  ["--navds-semantic-color-link", "--a-text-action"],
  ["--navds-global-color-gray-100", "--a-gray-100"],
  ["--navds-global-color-gray-400", "--a-gray-400"],
  ["--navds-global-color-gray-600", "--a-gray-600"],
  [
    "--navds-semantic-color-interaction-primary-hover-subtle",
    "--a-surface-action-subtle",
  ],
  ["--navds-semantic-color-canvas-background-inverted", "--a-surface-inverted"],
];

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  let src = file.source;

  tokens.forEach((tok) => {
    const rgx = new RegExp("(" + tok[0] + ")", "gm");
    src = src.replace(rgx, tok[1]);
  });

  return src;
}
