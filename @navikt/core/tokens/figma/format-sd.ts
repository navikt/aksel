import deepen from "./deepen";

const formatToStyleDictionary = (
  colors: { [key: string]: string },
  type: "color" | "spacing"
) => {
  switch (type) {
    case "color": {
      return deepen(
        Object.entries(colors).reduce(
          (old, [key, val]) =>
            val.startsWith("rgba")
              ? { ...old, [key]: { value: val } }
              : { ...old, [key]: { value: `{${val}.value}` } },
          {}
        )
      );
    }
    case "spacing": {
      return deepen(
        Object.entries(colors).reduce(
          (old, [key, val]) => ({ ...old, [key]: { value: val } }),
          {}
        )
      );
    }
    default:
      return {};
  }
};

export default formatToStyleDictionary;
