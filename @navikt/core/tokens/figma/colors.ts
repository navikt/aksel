import { writeFileSync } from "fs";
import { resolve } from "path";
import deepen from "./deepen";
import formatToStyledDictionary from "./format-sd";
import globalColorRefs, { ColorT } from "./global-color-ref";
import parseName from "./parse-name";

type FigmaColorsT = {
  [key: string]: string;
};

const parseColors = async (figmaColors: FigmaColorsT) => {
  /* Parse name and color into correct format */
  // TODO: Better sorting
  const colors: ColorT[] = Object.entries(figmaColors)
    .map(([key, value]) => ({
      name: parseName(key),
      color: value,
    }))
    .sort((a, b) => a.name.localeCompare(b.name))
    .reverse();

  /* Make semantic colors reference global colors */
  const colorsWithRef = globalColorRefs(colors).reduce(
    (old, color) => ({ [color.name]: color.color, ...old }),
    {}
  );

  const styledDictionaryFormat = deepen(
    formatToStyledDictionary(colorsWithRef, "color")
  );

  writeFileSync(
    resolve("./src/colors.json"),
    JSON.stringify(styledDictionaryFormat, null, 2)
  );
};

export default parseColors;
