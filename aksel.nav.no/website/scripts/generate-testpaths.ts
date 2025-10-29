import fs from "node:fs";
import { sitemapPages } from "../sanity/interface/interface";

const token = process.env.SANITY_READ_NO_DRAFTS;

if (!token) {
  console.error("Missing SANITY_READ_NO_DRAFTS");
  process.exit(1);
}

/**
 * Generate a list of urls for e2e tests
 */
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
