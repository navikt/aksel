import dotenv from "dotenv";
import { DOCUMENT } from "figma-api";
import Colors from "./colors";
import { getSyncDocument } from "./fetch";
import Spacing from "./spacing";

dotenv.config();

const main = async () => {
  const file = await getSyncDocument();
  const document: DOCUMENT = file?.document;
  const styles = file?.styles;
  if (!document || !styles)
    throw new Error("Could not fetch document or styles from Figma file");

  await Colors(document, styles);
  await Spacing(document);
};

try {
  main();
} catch (e) {
  console.error(e.message);
}
