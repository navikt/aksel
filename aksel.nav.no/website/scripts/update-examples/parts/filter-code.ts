export function filterCode(code: string) {
  const _code = code
    .substring(0, code.indexOf("export default withDsExample"))
    .split("\n")
    .filter((x) => !x.includes("examples/withDsExample"))
    .join("\n");

  return _code.trim();
}
