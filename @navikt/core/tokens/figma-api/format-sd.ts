const formatToStyledDictionary = (colors: { [key: string]: string }) =>
  Object.entries(colors).reduce(
    (old, [key, val]) =>
      val.startsWith("rgba")
        ? { ...old, [key]: { value: val } }
        : { ...old, [key]: { value: `{${val}.value}` } },
    {}
  );

export default formatToStyledDictionary;
