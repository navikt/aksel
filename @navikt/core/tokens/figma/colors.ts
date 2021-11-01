import { CANVAS, DOCUMENT, FRAME, Paint } from "figma-api";
import { writeFileSync } from "fs";
import { resolve } from "path";
import { string } from "prop-types";
import formatToStyledDictionary from "./format-sd";
import globalColorRefs, { ColorT } from "./global-color-ref";
import parseColor from "./paint-to-rgba";
import parseName from "./parse-name";

type FigmaColorsT = {
  [key: string]: string;
};

const parseColors = async (figmaColors: FigmaColorsT) => {
  /* Parse name and color into correct format */
  const colors: ColorT[] = Object.entries(figmaColors).map(([key, value]) => ({
    name: parseName(key),
    color: value,
  }));

  /* Make semantic colors reference global colors */
  const colorsWithRef = globalColorRefs(colors).reduce(
    (old, color) => ({ [color.name]: color.color, ...old }),
    {}
  );

  const styledDictionaryFormat = formatToStyledDictionary(
    colorsWithRef,
    "color"
  );

  writeFileSync(
    resolve("./src/colors.json"),
    JSON.stringify(styledDictionaryFormat, null, 2)
  );

  console.log("Finished updating color-tokens\n");
};

export default parseColors;
