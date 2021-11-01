import dotenv from "dotenv";
import { DOCUMENT } from "figma-api";
import parseColors from "./colors";
import { getSyncDocument } from "./fetch";
import getFileStyles from "./file-styles";
import Spacing from "./spacing";
import { fetchFile, fetchFileStyles } from "./temp";

dotenv.config();

const main = async () => {
  await Promise.all([fetchFile(), fetchFileStyles()])
    .then(([file, styles]) => {
      const parsedStyles = getFileStyles(file, styles);

      parsedStyles.colors && parseColors(parsedStyles.colors);
    })
    .catch((e) => {
      console.log("Failed fetching styles and file from figma");
      throw e;
    });

  /* await Colors(document, styles); */
  /* await Spacing(document); */
};

try {
  main();
} catch (e) {
  console.error(e.message);
}
