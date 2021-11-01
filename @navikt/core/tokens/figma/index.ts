import dotenv from "dotenv";
import parseColors from "./colors";
import getFileStyles from "./file-styles";
import { fetchFile, fetchFileStyles } from "./fetch";

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

  /* await Spacing(document); */
};

try {
  main();
} catch (e) {
  console.error(e.message);
}
