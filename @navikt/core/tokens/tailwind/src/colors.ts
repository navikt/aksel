const replaceKey = (s: string) =>
  s.replace("global-color-", "").replace("semantic-color-", "");

const Colors = (tokens: { [key: string]: string | number }) =>
  Object.entries(tokens).reduce((old, [key, value]) => {
    return key.startsWith("global-color") || key.startsWith("semantic-color")
      ? { ...old, [replaceKey(key)]: value }
      : { ...old };
  }, {});

export default Colors;
