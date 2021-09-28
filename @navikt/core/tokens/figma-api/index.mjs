import { writeFile, readFile } from "fs";
import { getColors } from "./colors.mjs";
import { createNewPr } from "./create-pr.mjs";

const main = async () => {
  if (!process.env.FIGMA_TOKEN) {
    throw new Error("Need to add FIGMA_TOKEN in .env");
  }
  let createPr = false;

  const colors = await getColors();

  const oldColors = await readFile("./src/colors.json", "utf-8", (e, data) => {
    if (e) {
      createPr = true;
      return {};
    }
    return data;
  });

  if (oldColors !== JSON.stringify(colors)) {
    createPr = true;
  }

  await writeFile(
    "./src/colors.json",
    JSON.stringify(colors, null, 2),
    {
      encoding: "utf8",
    },
    (e) => {
      if (e) throw e;
      console.log("Oppdaterte colors.json");
    }
  );

  createPr && createNewPr(JSON.stringify(colors, null, 2));
};

try {
  main();
} catch (e) {
  console.error(e.message);
}
