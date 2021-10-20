import dotenv from "dotenv";
import Colors from "./colors";
import Spacing from "./spacing";

dotenv.config();

const main = async () => {
  await Colors();
  await Spacing();
};

try {
  main();
} catch (e) {
  console.error(e.message);
}
