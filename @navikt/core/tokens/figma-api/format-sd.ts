const formatToStyledDictionary = (
  colors: { [key: string]: string },
  type: "color" | "spacing"
) => {
  switch (type) {
    case "color": {
      return Object.entries(colors).reduce(
        (old, [key, val]) =>
          val.startsWith("rgba")
            ? { ...old, [key]: { value: val } }
            : { ...old, [key]: { value: `{${val}.value}` } },
        {}
      );
    }
    case "spacing": {
      return Object.entries(colors).reduce(
        (old, [key, val]) => ({ ...old, [key]: { value: val } }),
        {}
      );
    }
    default:
      return {};
  }
};

export default formatToStyledDictionary;
