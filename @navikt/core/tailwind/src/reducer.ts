const replaceKey = (s: string, keys: string[]) => {
  let key = s;
  keys.forEach((k) => {
    key = key.replace(`${k}-`, "");
  });
  return key;
};

/* Cherry-picks object keys we want */
const Reducer = (
  tokens: { [key: string]: string | number },
  replace: string[]
) =>
  Object.entries(tokens).reduce((old, [key, value]) => {
    return replace.find((v) => key.startsWith(v))
      ? { ...old, [replaceKey(key, replace)]: value }
      : { ...old };
  }, {});

export default Reducer;
