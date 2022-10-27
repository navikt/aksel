import { writeFileSync } from "fs";
import { resolve } from "path";
import formatToStyleDictionary from "./format-sd";
import globalColorRefs, { ColorT } from "./global-color-ref";
import parseName from "./parse-name";

type FigmaColorsT = {
  [key: string]: string;
};

const parseColors = async (figmaColors: FigmaColorsT) => {
  /* Parse name and color into correct format */
  const colors: ColorT[] = Object.entries(figmaColors)
    .map(([key, value]) => ({
      name: parseName(key.replace(/\s/g, "")),
      color: value,
    }))
    .sort((a, b) => a.name.localeCompare(b.name))
    .reverse();

  /* Make semantic colors reference global colors */
  const colorsWithRef = globalColorRefs(colors).reduce(
    (old, color) => ({ [color.name]: color.color, ...old }),
    {}
  );

  const styleDictionaryFormat = formatToStyleDictionary(colorsWithRef, "color");

  writeFileSync(
    resolve("./src/colors.json"),
    JSON.stringify(styleDictionaryFormat, null, 2)
  );
};

export default parseColors;
