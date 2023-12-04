const FILTER_STRING = "// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE";

export function filterCode(code: string) {
  if (!code.includes(FILTER_STRING)) {
    throw new Error(
      `filterCode expects substring "${FILTER_STRING}" in example code.`
    );
  }

  const _code = code
    .substring(0, code.indexOf(FILTER_STRING))
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
