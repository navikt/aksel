import dotenv from "dotenv";
import fs from "fs";
import { sitemapPages } from "../sanity/interface/interface";

dotenv.config();

const token = process.env.SANITY_READ_NO_DRAFTS;

sitemapPages(token)
  .then((pages) =>
    fs.writeFileSync(
      "./e2e/sitemap-urls.json",
      JSON.stringify(pages.map(({ path }) => `/${path}`)),
    ),
  )
  .catch((e) => {
    console.error("Failed generating urls for e2e tests");
    console.error(e);
  });
