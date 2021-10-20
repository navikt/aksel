import dotenv from "dotenv";
import { CANVAS, DOCUMENT, FRAME, Paint } from "figma-api";
import { writeFileSync } from "fs";
import { resolve } from "path";
import { getSyncDocument } from "./fetch";
import formatToStyledDictionary from "./format-sd";
import globalColorRefs, { ColorT } from "./global-color-ref";
import parseColor from "./paint-to-rgba";
import parseName from "./parse-name";

dotenv.config();

const colors = async () => {
  const file = await getSyncDocument();

  const document: DOCUMENT = file.document;

  const colorPage = document.children.find(
    (c) => c.name === "Colors"
  ) as CANVAS;

  if (!colorPage) {
    throw new Error("Could not find color-page in document");
  }

  const colorFrames: FRAME[] = colorPage.children.filter(
    (x) => x.type === "FRAME"
  ) as FRAME[];

  const colorInstances: { fill: Paint; style: string }[] = colorFrames
    /* All children nodes in frame (ex global and sematic frame) */
    .reduce((old, frame) => [...old, ...frame.children], [])
    /* Only get nodes that is a color instance */
    .filter((x) => x.type === "INSTANCE")
    /* Get each nodes content (ex [text, frame]) */
    .reduce((old, instance) => [...old, ...instance?.children], [])
    /* We only care about the colored frame */
    .filter((x) => x.name !== "text")
    /* Fills -> Paint, style -> node used as ref to local style */
    .map((x) => ({ fill: x.fills?.[0], style: x?.styles?.fills }));

  const colors: ColorT[] = colorInstances.map((c) => ({
    name: parseName(file.styles[c.style]?.name),
    color: parseColor(c.fill),
  }));

  const colorsWithRef = globalColorRefs(colors).reduce(
    (old, color) => ({ [color.name]: color.color, ...old }),
    {}
  );

  const styledDictionaryFormat = formatToStyledDictionary(colorsWithRef);

  writeFileSync(
    resolve("./src/colors.json"),
    JSON.stringify(styledDictionaryFormat, null, 2)
  );
};

try {
  colors();
} catch (e) {
  console.log(e);
}
