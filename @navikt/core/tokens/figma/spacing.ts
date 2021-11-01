import { CANVAS, DOCUMENT, FRAME, RECTANGLE } from "figma-api";
import formatToStyledDictionary from "./format-sd";
import { writeFileSync } from "fs";
import { resolve } from "path";

const Spacing = async (document: DOCUMENT) => {
  console.log("Updating spacing-tokens");

  const spacingPage = document.children.find(
    (c) => c.name === "Spacing"
  ) as CANVAS;

  if (!spacingPage) {
    throw new Error("Could not find spacing-page in document");
  }

  const spacingFrame = spacingPage.children.find(
    (x) => x.name === "spacing"
  ) as FRAME;

  if (!spacingFrame) {
    throw new Error("Could not find spacing-frame in document");
  }

  const spaces = spacingFrame.children
    .filter((x) => x.type === "RECTANGLE" && x.name.startsWith("spacing-"))
    .reduce(
      (old, space) => ({
        ...old,
        [`navds-${space.name}`]: `${
          (space as RECTANGLE).absoluteBoundingBox.width / 16
        }rem`,
      }),
      {}
    );

  const styledDictionaryFormat = formatToStyledDictionary(spaces, "spacing");

  writeFileSync(
    resolve("./src/spacing.json"),
    JSON.stringify(styledDictionaryFormat, null, 2)
  );

  console.log("Finished updating spacing-tokens\n");
};

export default Spacing;
