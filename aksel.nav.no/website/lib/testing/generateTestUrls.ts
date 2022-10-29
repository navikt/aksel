import dotenv from "dotenv";
import fs from "fs";
import { getAllPages } from "../sanity/santiy";

dotenv.config();

const generateUrls = async () => {
  const pages = await getAllPages(process.env.SANITY_WRITE_KEY);

  const formated = pages.map((x) => `/${x}`);

  console.log(`Pages ${formated.length}`);
  if (formated.length < 70) {
    throw new Error(
      "generateUrls found less than 70 pages. Did fetching remote pages fail?"
    );
  }

  fs.writeFile(
    "./e2e/test-urls.json",
    JSON.stringify(pages.map((x) => `/${x}`)),
    (err) => {
      if (err) {
        console.error(err);
        return;
      }
    }
  );
};

generateUrls();
