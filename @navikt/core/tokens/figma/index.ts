import dotenv from "dotenv";
import parseColors from "./colors";
import getFileStyles from "./file-styles";
import { fetchFile, fetchFileStyles, fetchSyncDocument } from "./fetch";
/* import Spacing from "./spacing"; */

dotenv.config();

const main = async () => {
  await Promise.all([fetchFile(), fetchFileStyles(), fetchSyncDocument()])
    .then(([file, styles, document]) => {
      const parsedStyles = getFileStyles(file, styles);
      parsedStyles.colors && parseColors(parsedStyles.colors);

      // TODO: Get spacing by crawling like with colors
      /* Spacing(document); */
    })
    .catch((e) => {
      console.log("Failed fetching styles and file from figma");
      throw e;
    });
};

try {
  main();
} catch (e) {
  console.error(e.message);
}
