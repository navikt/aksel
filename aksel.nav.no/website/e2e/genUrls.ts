import dotenv from "dotenv";
import fs from "fs";
import { getAllPages } from "../lib/sanity/santiy";

dotenv.config();

const token = process.env.SANITY_PRIVATE_NO_DRAFTS;

getAllPages(token)
  .then((pages) =>
    fs.writeFileSync(
      "./e2e/sitemap-urls.json",
      JSON.stringify(pages.map((x) => `/${x}`))
    )
  )
  .catch(console.error);
