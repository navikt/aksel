export function filterCode(code: string) {
  const _code = code
    .substring(0, code.indexOf("export const args ="))
    .split("\n")
    .filter((x) => !x.includes("examples/withDsExample"));

  const storyIndex = _code.findIndex((x) => x === "/* Storybook story */");

  if (storyIndex === -1) {
    return _code
      .join("\n")
      .replace(/^\s*export default withDsExample\(Example[\s\S]*?;\s*/gm, "")
      .trim();
  }

  return _code
    .filter((_, idx) => idx < storyIndex || idx > storyIndex + 3)
    .join("\n")
    .replace(/^\s*export default withDsExample\(Example[\s\S]*?;\s*/gm, "")
    .trim();
}
