import { Node, DOCUMENT } from "figma-api";
import paintToRgba from "./paint-to-rgba";

interface StyleId {
  id: string;
  styleType: "TEXT" | "FILL";
}

const styleFieldNames = {
  TEXT: ["text"],
  FILL: ["fill", "fills", "stroke", "strokes"],
};

const findNodeWithStyle = (node: Node<any>, styleId: StyleId): Node<any> => {
  if (
    "styles" in node &&
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
      if (node) {
        return node?.style;
      } else {
        return undefined;
      }
  }
};

const styleTypeName = {
  FILL: "colors",
  TEXT: "textStyles",
};

const getFileStyles = (file, fileStyles) =>
  fileStyles.reduce(
    (styles, { node_id: id, style_type: styleType, name }) => ({
      ...styles,
      [styleTypeName[styleType]]: {
        ...styles[styleTypeName[styleType]],
        [name]: findStyleValue(file.document, { id, styleType }),
      },
    }),
    {}
  );

export default getFileStyles;
