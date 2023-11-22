export function filterCode(code: string) {
  if (!code.includes("export default withDsExample")) {
    throw new Error(
      "filterCode expects some specific substrings in code. Please check the code."
    );
  }

  const _code = code
    .substring(0, code.indexOf("export default withDsExample"))
    .split("\n")
    .filter((x) => !x.includes("examples/withDsExample"))
    .join("\n");

  if (code === "") {
    throw new Error(
      "filterCode returned empty string, this is 99.99% likely to be an error."
    );
  }

  return _code.trim();
}
