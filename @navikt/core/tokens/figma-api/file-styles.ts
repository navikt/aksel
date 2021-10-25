import { Node, DOCUMENT } from "figma-api";
import paintToRgba from "./paint-to-rgba";

interface StyleId {
  id: string;
  styleType: "TEXT" | "FILL";
  name: string;
}

const styleFieldNames = {
  TEXT: ["text"],
  FILL: ["fill", "fills", "stroke", "strokes"],
};

const findNodeWithStyle = (node: Node<any>, styleId: StyleId): Node<any> => {
  if (
    node.hasOwnProperty("styles") &&
    styleFieldNames[styleId.styleType]?.some(
      (name) => node.styles[name] === styleId.id
    )
  ) {
    return node;
  } else if (node.children) {
    for (const child of node.children) {
      const res = findNodeWithStyle(child, styleId);
      if (res) {
        return res;
      }
    }
  }
};

const findStyleValue = (document: DOCUMENT, styleId: StyleId) => {
  const node = findNodeWithStyle(document, styleId);
  if (styleId.id === "5249:11258") {
  }

  switch (styleId.styleType) {
    case "FILL":
      if (node) {
        if (
          node.styles.stroke === styleId.id ||
          node.styles.strokes === styleId.id
        ) {
          return paintToRgba(node.strokes[0]);
        } else {
          return paintToRgba(node.fills[0]);
        }
      } else {
        return undefined;
      }
    case "TEXT":
      return node.style;
  }
};

const styleTypeName = {
  FILL: "colors",
  TEXT: "textStyles",
};

const getFileStyles = (file) =>
  Object.entries<any>(file.styles).reduce(
    (styles, [id, { name, styleType }]) => ({
      ...styles,
      [styleTypeName[styleType]]: {
        ...styles[styleTypeName[styleType]],
        [name]: findStyleValue(file.document, { id, styleType, name }),
      },
    }),
    {}
  );

export default getFileStyles;
